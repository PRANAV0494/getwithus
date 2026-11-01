"use client";

import { m } from "motion/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import TerminalFrame from "@/components/cta/TerminalFrame";
import MagneticButton from "@/components/motion/MagneticButton";
import MotionScope from "@/components/motion/MotionScope";
import Button from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const NEEDS = [
  "Website",
  "Mobile app",
  "WhatsApp bot",
  "Calling agent",
  "Marketing",
  "Not sure yet",
];
const BUDGETS = ["Under $5k", "$5k-15k", "$15k+", "Let's talk"];

const CHAR_MS = 22;
const PAUSE_MS = 250;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** True for an address the terminal accepts: something@something.something, no spaces. */
export const isEmail = (value: string) => EMAIL.test(value.trim());

/** Resolves after `ms`, or rejects as soon as `signal` aborts; never leaves a timer behind. */
function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason);
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

type Tone = "plain" | "muted" | "ok" | "err";
type Item =
  | { kind: "line"; id: number; text: string; tone: Tone; prompt: boolean; typed: number }
  | { kind: "needs" | "budgets" | "email" | "restart"; id: number };
/** An item before it has an id: the union with id removed from each member. */
type NewItem = Item extends infer Member
  ? Member extends Item
    ? Omit<Member, "id">
    : never
  : never;

type BriefAction = (brief: {
  services: string[];
  budget: string;
  email: string;
}) => Promise<{ ok: boolean }>;

type TerminalCtaProps = {
  /** The server action that receives the brief. */
  action: BriefAction;
  /** How soon we reply; left out of the copy while unknown. */
  responseTime?: string;
};

const LINE_TONE: Record<Tone, string> = {
  plain: "text-fog",
  muted: "text-fog-3",
  ok: "text-ok",
  err: "text-err",
};

/**
 * A terminal that asks three questions: what you need (several chips), a rough
 * budget (one chip), and where to reply (an email). Each line types out at
 * 22 ms a character with a blinking caret, starting once the terminal is 35
 * percent in view. Chips are real buttons with aria-pressed; the live region
 * announces each line once it is complete. Under reduced motion lines appear
 * at once.
 */
export default function TerminalCta({ action, responseTime }: TerminalCtaProps) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const run = useRef<AbortController | null>(null);
  const nextId = useRef(0);
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const [items, setItems] = useState<Item[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [stage, setStage] = useState<"idle" | "needs" | "budgets" | "email" | "sending" | "done">(
    "idle",
  );
  const [email, setEmail] = useState("");
  /** Each follow-up question is asked once per run, however fast the chips are clicked. */
  const asked = useRef({ budgets: false, email: false });

  const append = useCallback((item: NewItem) => {
    const id = nextId.current++;
    setItems((list) => [...list, { ...item, id } as Item]);
    return id;
  }, []);

  const type = useCallback(
    async (text: string, tone: Tone, prompt: boolean) => {
      const signal = run.current?.signal;
      if (!signal) return;
      const id = append({ kind: "line", text, tone, prompt, typed: reduce ? text.length : 0 });
      if (reduce) return;
      for (let typed = 1; typed <= text.length; typed++) {
        await wait(CHAR_MS, signal);
        setItems((list) =>
          list.map((item) => (item.id === id && item.kind === "line" ? { ...item, typed } : item)),
        );
      }
    },
    [append, reduce],
  );

  const start = useCallback(async () => {
    run.current?.abort();
    const controller = new AbortController();
    run.current = controller;
    asked.current = { budgets: false, email: false };
    setItems([]);
    setNeeds([]);
    setBudget(null);
    setEmail("");
    setStage("idle");
    try {
      await type(
        responseTime
          ? `# answer three questions, we reply within ${responseTime}`
          : "# answer three questions",
        "muted",
        false,
      );
      await type("what do you need?", "plain", true);
      append({ kind: "needs" });
      setStage("needs");
    } catch {
      // Restarted or unmounted.
    }
  }, [append, responseTime, type]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void start();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      run.current?.abort();
    };
  }, [start]);

  const advance = async (to: "budgets" | "email") => {
    const signal = run.current?.signal;
    if (!signal || asked.current[to]) return;
    asked.current[to] = true;
    try {
      if (!reduce) await wait(PAUSE_MS, signal);
      if (to === "budgets") {
        await type("rough budget?", "plain", true);
        append({ kind: "budgets" });
        setStage("budgets");
      } else {
        await type("where should we reply?", "plain", true);
        append({ kind: "email" });
        setStage("email");
        if (fine) window.requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
      }
    } catch {
      // Restarted or unmounted.
    }
  };

  const toggleNeed = (label: string) => {
    const adding = !needs.includes(label);
    setNeeds((list) => (adding ? [...list, label] : list.filter((value) => value !== label)));
    if (adding) void advance("budgets");
  };

  const pickBudget = (label: string) => {
    setBudget(label);
    void advance("email");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signal = run.current?.signal;
    if (!signal || stage !== "email") return;
    setItems((list) => list.filter((item) => !(item.kind === "line" && item.tone === "err")));
    const address = email.trim();
    try {
      if (!isEmail(address)) {
        await type("✗ enter an email address like name@company.com", "err", false);
        return;
      }
      setStage("sending");
      setItems((list) => list.filter((item) => item.kind !== "email"));
      await type("sending brief…", "muted", false);
      const result = await action({ services: needs, budget: budget ?? "", email: address });
      if (!reduce) await wait(500, signal);
      if (!result.ok) {
        await type("✗ the brief did not go through. Email us instead.", "err", false);
        append({ kind: "restart" });
        setStage("done");
        return;
      }
      await type(`✓ brief sent: ${needs.join(", ")} · ${budget ?? ""}`, "ok", false);
      await type(
        responseTime
          ? `✓ we'll reply to ${address} within ${responseTime}`
          : `✓ we'll reply to ${address}`,
        "ok",
        false,
      );
      append({ kind: "restart" });
      setStage("done");
    } catch {
      // Restarted or unmounted.
    }
  };

  const typingId = [...items]
    .reverse()
    .find((item) => item.kind === "line" && item.typed < item.text.length)?.id;
  const chipsLocked = stage === "sending" || stage === "done";

  return (
    <MotionScope>
      <TerminalFrame ref={root}>
        {items.map((item) => {
          if (item.kind === "line") {
            const done = item.typed >= item.text.length;
            return (
              <m.p
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("mb-3 whitespace-pre-wrap", LINE_TONE[item.tone])}
              >
                <span aria-hidden="true">
                  {item.prompt ? <span className="text-signal">&gt; </span> : null}
                  {item.text.slice(0, item.typed)}
                  {item.id === typingId ? <span className="caret" /> : null}
                </span>
                {done ? <span className="sr-only">{item.text}</span> : null}
              </m.p>
            );
          }
          if (item.kind === "needs" || item.kind === "budgets") {
            const multi = item.kind === "needs";
            const list = multi ? NEEDS : BUDGETS;
            return (
              <m.div
                key={item.id}
                role="group"
                aria-label={multi ? "What do you need?" : "Rough budget"}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 mb-[26px] flex flex-wrap gap-2.5"
              >
                {list.map((label) => {
                  const pressed = multi ? needs.includes(label) : budget === label;
                  return (
                    <m.button
                      key={label}
                      type="button"
                      aria-pressed={pressed}
                      disabled={chipsLocked}
                      onClick={() => (multi ? toggleNeed(label) : pickBudget(label))}
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      className={cn(
                        "border px-3.5 py-2 font-mono text-sm transition-colors duration-200 disabled:cursor-not-allowed",
                        pressed
                          ? "border-signal bg-signal text-ink"
                          : "border-line-strong text-fog-2 hover:border-fog-3 hover:text-fog",
                      )}
                    >
                      {pressed ? "✓ " : null}
                      {label}
                    </m.button>
                  );
                })}
              </m.div>
            );
          }
          if (item.kind === "email") {
            return (
              <m.form
                key={item.id}
                noValidate
                onSubmit={submit}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 flex flex-wrap items-center gap-2.5"
              >
                <span aria-hidden="true" className="text-signal">
                  $
                </span>
                <input
                  ref={input}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 min-w-[220px] flex-1 border-0 border-b border-line-strong bg-transparent px-1 font-mono text-[0.9375rem] text-fog placeholder:text-fog-3 focus:border-signal"
                />
                <MagneticButton>
                  <Button type="submit">Send brief</Button>
                </MagneticButton>
              </m.form>
            );
          }
          return (
            <p key={item.id} className="mb-3">
              <button
                type="button"
                onClick={() => void start()}
                className="font-mono text-sm text-signal underline underline-offset-4"
              >
                start again
              </button>
            </p>
          );
        })}
      </TerminalFrame>
    </MotionScope>
  );
}
