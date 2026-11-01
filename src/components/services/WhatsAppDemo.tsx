"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import MotionScope from "@/components/motion/MotionScope";
import WhatsAppFrame from "@/components/services/WhatsAppFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Line = { wait: number; who: "customer" | "agent"; text: string; booking?: boolean };

/** The conversation, played in order. `wait` is the pause before it (agents type for that long). */
const SCRIPT: readonly Line[] = [
  { wait: 700, who: "customer", text: "Hi! Can I book a haircut this Saturday?" },
  {
    wait: 1500,
    who: "agent",
    text: "Hi, sure. Saturday has 11:00, 14:30 and 16:00 open. Which works for you?",
  },
  { wait: 1600, who: "customer", text: "14:30 please" },
  { wait: 1500, who: "agent", text: "Done. You’re booked.", booking: true },
  { wait: 1400, who: "customer", text: "Perfect, thanks" },
];

const BUBBLE = { type: "spring", stiffness: 520, damping: 30, mass: 0.7 } as const;

type Message = Line & { id: string; time: string };

const clock = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/** Resolves after `ms`, or rejects as soon as `signal` aborts; never leaves a timer behind. */
function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
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

function Bubble({ message, still }: { message: Message; still: boolean }) {
  const agent = message.who === "agent";
  return (
    <m.div
      initial={still ? false : { opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={BUBBLE}
      className={cn(
        "max-w-[82%] rounded-lg px-[11px] pt-2 pb-1.5 text-[0.9rem] leading-[1.4]",
        agent
          ? "self-end rounded-tr-[2px] bg-[#0f4a4f]"
          : "self-start rounded-tl-[2px] bg-[#1b232b]",
      )}
    >
      {message.text}
      {message.booking ? (
        <span className="bg-black/20 mt-2 block border border-[#5ee0f0]/35 px-2.5 py-2 text-[0.8125rem]">
          <b className="block text-[0.85rem] font-semibold">Sat, 14:30 &middot; Haircut</b>
          <span className="text-[#a8d8de]">with Priya &middot; reminder Friday 18:00</span>
        </span>
      ) : null}
      <span className="mt-0.5 block text-right text-[0.66rem] text-ink/50">
        {message.time}
        {agent ? <span className="text-[#5ee0f0]"> {"✓✓"}</span> : null}
      </span>
    </m.div>
  );
}

/**
 * An example WhatsApp booking, played on a loop inside the agentic automation
 * card: the customer asks, the agent types and answers, and a booking card
 * confirms it. It plays only while the demo is at least 30 percent in view, and
 * stops (every timer cleared) when it leaves or unmounts. Under reduced motion
 * the whole conversation shows at once. Loaded when near (WhatsAppDemoLazy).
 */
export default function WhatsAppDemo() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element || reduce) return;
    let controller: AbortController | null = null;

    const play = async (signal: AbortSignal) => {
      try {
        for (let loop = 0; ; loop++) {
          setMessages([]);
          setFading(false);
          for (const [index, line] of SCRIPT.entries()) {
            if (line.who === "agent") {
              await sleep(500, signal);
              setTyping(true);
              await sleep(line.wait, signal);
              setTyping(false);
            } else {
              await sleep(line.wait, signal);
            }
            setMessages((list) => [...list, { ...line, id: `${loop}-${index}`, time: clock() }]);
          }
          await sleep(3800, signal);
          setFading(true);
          await sleep(450, signal);
        }
      } catch {
        // Aborted: the demo left the screen or unmounted.
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !controller) {
          controller = new AbortController();
          void play(controller.signal);
        } else if (!entry.isIntersecting && controller) {
          controller.abort();
          controller = null;
          setTyping(false);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      controller?.abort();
    };
  }, [reduce]);

  const shown = reduce
    ? SCRIPT.map((line, index) => ({ ...line, id: `still-${index}`, time: clock() }))
    : messages;

  return (
    <MotionScope>
      <WhatsAppFrame ref={root} typing={typing} fading={fading}>
        <AnimatePresence initial={false}>
          {shown.map((message) => (
            <Bubble key={message.id} message={message} still={reduce} />
          ))}
          {typing ? (
            <m.div
              key="typing"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={BUBBLE}
              className="flex gap-1 self-end rounded-lg bg-[#0f4a4f] px-3 py-2.5"
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="typing-dot size-1.5 rounded-full bg-[#9fe8f2]"
                  style={{ animationDelay: `${dot * 0.15}s` }}
                />
              ))}
            </m.div>
          ) : null}
        </AnimatePresence>
      </WhatsAppFrame>
    </MotionScope>
  );
}
