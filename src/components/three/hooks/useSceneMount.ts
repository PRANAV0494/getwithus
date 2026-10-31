"use client";

import { useEffect, useState } from "react";
import { useQuality } from "@/components/three/hooks/useQuality";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSceneStore, type Quality } from "@/stores/scene.store";

/** How long the page settles after load before the scene starts, unless the visitor scrolls first. */
const SETTLE_MS = 2500;

/** Signals that the visitor is moving through the page, so the scene should be there. */
const INTENT_EVENTS = ["scroll", "wheel", "touchmove", "keydown"] as const;

/**
 * Resolves once the page has settled: the load event plus SETTLE_MS, or the
 * first scroll, whichever comes first, then the next idle period. Loading and
 * evaluating three and compiling shaders costs several hundred milliseconds of
 * main thread on a mid-range phone; doing it here keeps the first seconds free
 * for reading and tapping.
 */
function whenSettled(onReady: () => void): () => void {
  let idle: number | undefined;
  let timer: number | undefined;
  let started = false;

  const stopListening = () => {
    window.removeEventListener("load", arm);
    for (const name of INTENT_EVENTS) window.removeEventListener(name, start);
  };
  function start() {
    if (started) return;
    started = true;
    stopListening();
    window.clearTimeout(timer);
    // Safari has no requestIdleCallback; a short timeout stands in for it.
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(onReady, { timeout: 1200 });
    } else {
      timer = window.setTimeout(onReady, 200);
    }
  }
  function arm() {
    timer = window.setTimeout(start, SETTLE_MS);
  }

  for (const name of INTENT_EVENTS) window.addEventListener(name, start, { passive: true });
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });

  return () => {
    stopListening();
    window.clearTimeout(timer);
    if (idle !== undefined) window.cancelIdleCallback(idle);
  };
}

/**
 * Everything a canvas host needs before mounting: the quality tier (probed only
 * once ready), the reduced motion preference mirrored into the scene store, and
 * a flag that turns true once the page has settled (see whenSettled). There is
 * no spinner and no loading message; until then the page shows its own
 * background.
 */
export function useSceneMount(): { quality: Quality | null; ready: boolean } {
  const [ready, setReady] = useState(false);
  const quality = useQuality(ready);
  const reducedMotion = useReducedMotion();
  const setReducedMotion = useSceneStore((state) => state.setReducedMotion);

  useEffect(() => {
    setReducedMotion(reducedMotion);
  }, [reducedMotion, setReducedMotion]);

  useEffect(() => whenSettled(() => setReady(true)), []);

  return { quality, ready };
}
