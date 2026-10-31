import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Station = "hero" | "web" | "app" | "automation" | "marketing" | "close";

type SectionProps = ComponentProps<"section"> & {
  /** Home page only: which 3D station this section belongs to. */
  station?: Station;
  /** Drop the default vertical padding (for full-height sections that center their copy). */
  flush?: boolean;
};

/** A page section with the standard vertical rhythm: 64 px on mobile, 96 px from 768 px. */
export default function Section({ station, flush = false, className, ...props }: SectionProps) {
  return (
    <section
      data-station={station}
      className={cn(!flush && "py-16 md:py-24", className)}
      {...props}
    />
  );
}
