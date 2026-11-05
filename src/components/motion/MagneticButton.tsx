"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onPointer } from "@/components/motion/pointer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/** How far beyond the button's half size the pull reaches, in pixels. */
const REACH = 46;
/** The furthest the button leans, in pixels: less than the gap to a neighbouring control. */
const MAX_LEAN = 8;

const clamp = (value: number) => Math.max(-MAX_LEAN, Math.min(MAX_LEAN, value));

/**
 * Wraps a primary button so it leans toward the pointer (x 0.28, y 0.38 of the
 * offset from its centre, at most 8 px) once the pointer is within half its size
 * plus 46 px, and springs back when it leaves; hovering adds the cyan glow
 * (globals.css). It does not lean while the pointer is on another control, so it
 * never slides over a neighbour (the header's theme toggle sits 10 px away).
 * Fine pointers only, and still under reduced motion.
 */
export default function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !fine || reduce) return;
    const release = () => {
      delete element.dataset.pull;
      element.style.transform = "";
    };
    const unsubscribe = onPointer((x, y) => {
      const rect = element.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2);
      const near = Math.hypot(dx, dy) < Math.max(rect.width, rect.height) / 2 + REACH;
      const other = near
        ? document
            .elementFromPoint(x, y)
            ?.closest("a, button, input, select, textarea, [role=button]")
        : null;
      if (near && !(other && !element.contains(other))) {
        element.dataset.pull = "";
        element.style.transform = `translate(${clamp(dx * 0.28).toFixed(1)}px, ${clamp(dy * 0.38).toFixed(1)}px)`;
      } else if ("pull" in element.dataset) {
        release();
      }
    });
    return () => {
      unsubscribe();
      release();
    };
  }, [fine, reduce]);

  return (
    <span ref={ref} className={cn("magnetic inline-flex", className)}>
      {children}
    </span>
  );
}
