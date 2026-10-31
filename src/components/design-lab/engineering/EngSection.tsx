import type { ReactNode } from "react";
import { container } from "@/components/design-lab/engineering/tones";
import { cn } from "@/lib/cn";

/**
 * A full-width band. "base" lets the layout grid show through; "raised" adds a
 * translucent panel colour and hairline edges, so the grid still reads faintly.
 */
export default function EngSection({
  id,
  labelledBy,
  tone = "base",
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  tone?: "base" | "raised";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tone === "raised" && "border-y border-(--lab-border) bg-(--lab-bg-alt)/80")}
    >
      <div className={cn(container, "py-16 md:py-24", className)}>{children}</div>
    </section>
  );
}
