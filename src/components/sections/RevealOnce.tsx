"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Module state survives client-side navigation, so the reveal plays once per page load.
let hasRevealed = false;

/** Fades its children in, 60 ms apart, on the first page load only. Off under reduced motion via CSS. */
export default function RevealOnce({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [play] = useState(() => !hasRevealed);

  useEffect(() => {
    hasRevealed = true;
  }, []);

  return (
    <div data-reveal={play ? "on" : "off"} className={cn(className)}>
      {children}
    </div>
  );
}
