"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/stores/scene.store";

/**
 * Writes home page scroll progress to the scene store, at most once per frame.
 * Progress reaches 1 when the "close" section is 60 percent of a viewport from
 * the top, so the last station plays before the solid process section covers the
 * canvas (build addendum 28.7).
 */
export function useScrollProgress(): void {
  const setProgress = useSceneStore((state) => state.setProgress);

  useEffect(() => {
    let end = 1;
    let frame = 0;

    const measure = () => {
      const close = document.querySelector<HTMLElement>('[data-station="close"]');
      const top = close
        ? close.getBoundingClientRect().top + window.scrollY
        : document.body.scrollHeight;
      end = Math.max(1, top - window.innerHeight * 0.6);
    };
    const write = () => {
      frame = 0;
      setProgress(Math.min(1, Math.max(0, window.scrollY / end)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    // Fonts and late layout change the section offsets after mount.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [setProgress]);
}
