"use client";

import { useEffect } from "react";
import { loadGsap } from "@/components/motion/gsap";

/**
 * Lenis smooth scroll for the marketing layout, mounted once. It loads with
 * GSAP at the first idle moment after the page loads (so neither is in any
 * page's initial JavaScript), runs from GSAP's ticker, and keeps ScrollTrigger
 * in step. Under reduced motion scrolling stays native.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let stop = () => {};

    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        loadGsap(),
      ]);
      if (cancelled) return;
      const lenis = new Lenis({
        autoRaf: false,
        // Let dialogs and menus scroll on their own.
        prevent: (node) => node.closest("[role='dialog'], [data-lenis-prevent]") !== null,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      stop = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
        : window.setTimeout(() => void start(), 300);
    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
      stop();
    };
  }, []);

  return null;
}
