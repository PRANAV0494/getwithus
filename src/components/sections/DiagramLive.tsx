"use client";

import { useEffect } from "react";

/**
 * Keeps figure 01's circuit running only when someone can see it: it pauses the
 * CSS and SVG animations while the figure is off screen (or hidden, as on
 * phones), while the tab is in the background, and under reduced motion.
 */
export default function DiagramLive({ figureId }: { figureId: string }) {
  useEffect(() => {
    const figure = document.getElementById(figureId);
    const svg = figure?.querySelector("svg");
    if (!figure || !svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const apply = () => {
      const paused = !onScreen || document.visibilityState !== "visible" || reduce.matches;
      figure.toggleAttribute("data-paused", paused);
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      apply();
    });

    observer.observe(figure);
    document.addEventListener("visibilitychange", apply);
    reduce.addEventListener("change", apply);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
      reduce.removeEventListener("change", apply);
    };
  }, [figureId]);

  return null;
}
