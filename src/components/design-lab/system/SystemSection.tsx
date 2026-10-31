import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { container, navyTone } from "@/components/design-lab/system/tones";

export type Tone = "paper" | "white" | "navy" | "navy-deep";

const TONES: Record<Tone, string> = {
  paper: "bg-(--lab-bg)",
  white: "bg-[#FFFFFF]",
  navy: navyTone,
  "navy-deep": cn(navyTone, "[--lab-bg:#08112A]"),
};

/** A full-width band in one of the four section tones, with the system's padding and container. */
export default function SystemSection({
  id,
  labelledBy,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={TONES[tone]}>
      <div className={cn(container, "py-16 md:py-24", className)}>{children}</div>
    </section>
  );
}
