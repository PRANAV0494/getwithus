"use client";

import { useEffect, useRef } from "react";
import { onPointer } from "@/components/motion/pointer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A brighter cyan copy of the layout grid, inside a section, shown only in a
 * 260 px circle around the pointer (a radial mask on --mx and --my, updated
 * through the shared pointer listener). The section must be `relative isolate`;
 * the base grid is the page's GridBackdrop, which this lines up with. Fine
 * pointers only.
 */
export default function GridSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    const element = ref.current;
    if (!element || !fine) return;
    return onPointer((x, y) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${Math.round(x - rect.left)}px`);
      element.style.setProperty("--my", `${Math.round(y - rect.top)}px`);
    });
  }, [fine]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="grid-spotlight pointer-events-none absolute inset-0 -z-10"
    >
      <div className="mx-auto grid h-full max-w-[1200px] grid-cols-4 border-x border-accent/45 px-6 md:grid-cols-12 md:px-10">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="border-r border-accent/45 last:border-r-0 max-md:[&:nth-child(n+5)]:hidden"
          />
        ))}
      </div>
    </div>
  );
}
