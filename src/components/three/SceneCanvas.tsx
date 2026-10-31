"use client";

/*
 * The home page's 3D layer: fixed behind everything, never receives pointer
 * events, hidden from assistive technology. The canvas mounts after first paint
 * and idle; tier "none" shows the static slab outline instead.
 */
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useActiveStation } from "@/components/three/hooks/useActiveStation";
import { useSceneMount } from "@/components/three/hooks/useSceneMount";
import SceneErrorBoundary from "@/components/three/SceneErrorBoundary";
import SlabFallback from "@/components/three/SlabFallback";
import { clientFlags } from "@/config/client-flags";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Stage = dynamic(() => import("@/components/three/Stage"), { ssr: false });

const noop = () => () => undefined;

/** `?no3d=1` disables the scene for visual snapshots, in test builds only. */
function useNo3d(): boolean {
  return useSyncExternalStore(
    noop,
    () => clientFlags.testHooks && new URLSearchParams(window.location.search).get("no3d") === "1",
    () => false,
  );
}

export default function SceneCanvas() {
  useScrollProgress();
  useActiveStation();
  const { quality, ready } = useSceneMount(useNo3d());

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {quality === "none" ? (
        <SlabFallback className="absolute top-[22%] right-[6%] w-[46%] max-w-[620px]" />
      ) : null}
      {ready && quality && quality !== "none" ? (
        <SceneErrorBoundary>
          <Stage quality={quality} />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
