import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "signal" | "ok" | "err";

type BadgeProps = { tone?: Tone; className?: string; children: ReactNode };

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-fog-2",
  signal: "border-signal/40 text-signal",
  ok: "border-ok/40 text-ok",
  err: "border-err/40 text-err",
};

/** A small label. Always carries text, so color is never the only signal. */
export default function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag border bg-ink-2 px-2 py-0.5 type-small font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
