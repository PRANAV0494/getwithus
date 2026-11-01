"use client";

/*
 * A service page's station, alone in a 4:3 panel: it turns slowly, does not
 * follow scroll, renders at 30 frames per second while on screen, and falls
 * back to the static slab outline when 3D is unavailable. On phones the panel
 * sits below the fold, so the scene loads only once the panel comes near.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSceneMount } from "@/components/three/hooks/useSceneMount";
import SceneErrorBoundary from "@/components/three/SceneErrorBoundary";
import SlabFallback from "@/components/three/SlabFallback";
import type { StationKey } from "@/content/types";
import { useTheme } from "@/hooks/useTheme";

const Stage = dynamic(() => import("@/components/three/Stage"), { ssr: false });

export default function StationObject({ station }: { station: StationKey }) {
  const panel = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [seen, setSeen] = useState(false);
  const { quality, ready } = useSceneMount();
  const theme = useTheme();

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-line bg-card"
    >
      {quality === "none" ? <SlabFallback className="w-3/4" /> : null}
      {ready && seen && quality && quality !== "none" ? (
        <div className="absolute inset-0">
          <SceneErrorBoundary>
            {/* A new canvas per theme: the stations read their colours from the page once. */}
            <Stage key={theme} quality={quality} station={station} active={onScreen} />
          </SceneErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
