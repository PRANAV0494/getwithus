"use client";

import { useEffect, useState } from "react";
import { useQuality } from "@/components/three/hooks/useQuality";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSceneStore, type Quality } from "@/stores/scene.store";

/**
 * Everything a canvas host needs before mounting: the quality tier, the reduced
 * motion preference mirrored into the scene store, and a flag that turns true
 * once the browser is idle after first paint. There is no spinner and no
 * loading message; until then the page shows its own background.
 */
export function useSceneMount(disabled = false): { quality: Quality | null; ready: boolean } {
  const quality = useQuality(disabled);
  const reducedMotion = useReducedMotion();
  const setReducedMotion = useSceneStore((state) => state.setReducedMotion);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReducedMotion(reducedMotion);
  }, [reducedMotion, setReducedMotion]);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return { quality, ready };
}
