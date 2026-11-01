"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onPointer } from "@/components/motion/pointer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/** How far beyond the button's half size the pull reaches, in pixels. */
const REACH = 46;

/**
 * Wraps a primary button so it leans toward the pointer (x 0.28, y 0.38 of the
 * offset from its centre) once the pointer is within half its size plus 46 px,
 * and springs back when it leaves; hovering adds the cyan glow (globals.css).
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
      if (Math.hypot(dx, dy) < Math.max(rect.width, rect.height) / 2 + REACH) {
        element.dataset.pull = "";
        element.style.transform = `translate(${(dx * 0.28).toFixed(1)}px, ${(dy * 0.38).toFixed(1)}px)`;
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
