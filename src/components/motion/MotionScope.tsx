"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/components/motion/features").then((module) => module.default);

/**
 * Motion for the components inside it, which use `m` (never `motion`). The
 * animation features load in their own chunk, and only the components that
 * animate with Motion (the chat demo and the terminal, both loaded when near)
 * carry this, so Motion is in no page's initial JavaScript.
 */
export default function MotionScope({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
