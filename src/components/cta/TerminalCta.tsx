"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import TerminalFrame from "@/components/cta/TerminalFrame";
import MagneticButton from "@/components/motion/MagneticButton";
import { sleep } from "@/components/motion/sleep";
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

/** Line colours on the terminal's dark editor surface, in both themes. */
const LINE_TONE: Record<Tone, string> = {
  plain: "text-[#d6deeb]",
  muted: "text-[#8b9ab0]",
  ok: "text-[#3ee08a]",
  err: "text-[#ff8a80]",
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
        await sleep(CHAR_MS, signal);
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
      if (!reduce) await sleep(PAUSE_MS, signal);
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
      if (!reduce) await sleep(500, signal);
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
    <TerminalFrame ref={root}>
      {items.map((item) => {
        if (item.kind === "line") {
          const done = item.typed >= item.text.length;
          return (
            <p
              key={item.id}
              className={cn("chat-in mb-3 whitespace-pre-wrap", LINE_TONE[item.tone])}
            >
              <span aria-hidden="true">
                {item.prompt ? <span className="text-[#22d3ee]">&gt; </span> : null}
                {item.text.slice(0, item.typed)}
                {item.id === typingId ? <span className="code-caret ml-0.5" /> : null}
              </span>
              {done ? <span className="sr-only">{item.text}</span> : null}
            </p>
          );
        }
        if (item.kind === "needs" || item.kind === "budgets") {
          const multi = item.kind === "needs";
          const list = multi ? NEEDS : BUDGETS;
          return (
            <div
              key={item.id}
              role="group"
              aria-label={multi ? "What do you need?" : "Rough budget"}
              className="chat-in mt-1 mb-[26px] flex flex-wrap gap-2.5"
            >
              {list.map((label) => {
                const pressed = multi ? needs.includes(label) : budget === label;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={pressed}
                    disabled={chipsLocked}
                    onClick={() => (multi ? toggleNeed(label) : pickBudget(label))}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-sm transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.96] disabled:cursor-not-allowed",
                      pressed
                        ? "border-[#22d3ee] bg-[#22d3ee] text-[#06222a]"
                        : "border-white/20 text-[#c3cdd8] hover:border-white/40 hover:text-white",
                    )}
                  >
                    {pressed ? "✓ " : null}
                    {label}
                  </button>
                );
              })}
            </div>
          );
        }
        if (item.kind === "email") {
          return (
            <form
              key={item.id}
              noValidate
              onSubmit={submit}
              className="chat-in mt-1 flex flex-wrap items-center gap-2.5"
            >
              <span aria-hidden="true" className="text-[#22d3ee]">
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
                className="h-12 min-w-[200px] flex-1 border-0 border-b border-white/25 bg-transparent px-1 font-mono text-[0.9375rem] text-white placeholder:text-[#8b9ab0] focus:border-[#22d3ee]"
              />
              <MagneticButton>
                <Button type="submit">Send brief</Button>
              </MagneticButton>
            </form>
          );
        }
        return (
          <p key={item.id} className="mb-3">
            <button
              type="button"
              onClick={() => void start()}
              className="text-sm text-[#22d3ee] underline underline-offset-4"
            >
              start again
            </button>
          </p>
        );
      })}
    </TerminalFrame>
  );
}
