"use client";

import { useEffect } from "react";
import { useSceneStore, type Quality } from "@/stores/scene.store";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    // Release the probe context right away; browsers cap live contexts.
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return context !== null;
  } catch {
    return false;
  }
}

/** Picks the performance tier once, from device signals (spec section 5.4). */
function pickQuality(): Quality {
  if (!hasWebGL2()) return "none";
  const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || saveData || (mobile && cores < 6)) return "low";
  if (!mobile && cores >= 8 && window.devicePixelRatio <= 2) return "high";
  return "medium";
}

/** One tier lower; used when the performance monitor sees the frame rate drop. */
export function lowerQuality(quality: Quality): Quality {
  if (quality === "high") return "medium";
  if (quality === "medium") return "low";
  return quality;
}

/** The tier for this page load, chosen at mount and shared through the scene store. */
export function useQuality(disabled = false): Quality | null {
  const quality = useSceneStore((state) => state.quality);
  const setQuality = useSceneStore((state) => state.setQuality);

  useEffect(() => {
    if (disabled) setQuality("none");
    else if (quality === null) setQuality(pickQuality());
  }, [disabled, quality, setQuality]);

  return quality;
}
