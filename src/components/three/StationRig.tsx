"use client";

/*
 * Drives a service page panel: one station at rest, a fixed camera, and a slow
 * turn. It renders at most 30 frames per second, only while the panel is on
 * screen and the tab is visible, and renders a single still frame under reduced
 * motion.
 */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, type RefObject } from "react";
import { PANEL_FPS, STATION_VIEWS, TURNTABLE_SPEED } from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import type { StationKey } from "@/content/types";
import { useSceneStore } from "@/stores/scene.store";

type StationRigProps = { frameRef: RefObject<FrameState>; station: StationKey; active: boolean };

export default function StationRig({ frameRef, station, active }: StationRigProps) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const reducedMotion = useSceneStore((state) => state.reducedMotion);

  useLayoutEffect(() => {
    const view = STATION_VIEWS[station];
    camera.position.set(...view.position);
    camera.lookAt(...view.lookAt);
    invalidate();
  }, [camera, station, invalidate]);

  useEffect(() => {
    if (!active || reducedMotion) {
      invalidate();
      return;
    }
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") invalidate();
    }, 1000 / PANEL_FPS);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const dt = Math.min(0.1, delta);
    frameRef.current.time += dt;
    frameRef.current.turntable += TURNTABLE_SPEED * dt;
  }, -1);

  return null;
}
