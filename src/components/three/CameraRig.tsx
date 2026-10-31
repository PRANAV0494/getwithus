"use client";

/*
 * Drives the home scene. Each frame it damps scroll progress, derives every
 * station's transition value from that one damped number, and places the camera
 * on the Catmull-Rom path through the six keyframes. The render loop runs only
 * while something is still moving: it stops when the page is hidden or the
 * camera has settled at the last station, and wakes on scroll and visibility.
 */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { CatmullRomCurve3, MathUtils, Vector3, type PerspectiveCamera } from "three";
import {
  CAMERA_KEYFRAMES,
  DAMPING,
  LOOK_AT_ASPECT,
  SETTLE_EPSILON,
} from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import { writeStationTs } from "@/components/three/hooks/useStationT";
import { useSceneStore } from "@/stores/scene.store";

type CameraRigProps = { frameRef: RefObject<FrameState>; cameraMoves: boolean };

type Rig = {
  path: CatmullRomCurve3;
  lookPath: CatmullRomCurve3;
  progress: number;
  position: Vector3;
  lookAt: Vector3;
  target: Vector3;
  targetLookAt: Vector3;
};

function createRig(): Rig {
  const curve = (key: "position" | "lookAt") =>
    new CatmullRomCurve3(
      CAMERA_KEYFRAMES.map((keyframe) => new Vector3(...keyframe[key])),
      false,
      "centripetal",
    );
  const path = curve("position");
  const lookPath = curve("lookAt");
  return {
    path,
    lookPath,
    progress: 0,
    position: path.getPoint(0),
    lookAt: lookPath.getPoint(0),
    target: new Vector3(),
    targetLookAt: new Vector3(),
  };
}

export default function CameraRig({ frameRef, cameraMoves }: CameraRigProps) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const invalidate = useThree((state) => state.invalidate);
  const rigRef = useRef<Rig | null>(null);

  useEffect(() => {
    const unsubscribe = useSceneStore.subscribe(
      (state) => state.progress,
      () => invalidate(),
    );
    const onVisibility = () => {
      if (document.visibilityState === "visible") invalidate();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [invalidate]);

  useFrame((_, delta) => {
    rigRef.current ??= createRig();
    const rig = rigRef.current;
    const frame = frameRef.current;
    const dt = Math.min(0.05, delta);
    const { progress: target, reducedMotion } = useSceneStore.getState();

    rig.progress = MathUtils.damp(rig.progress, target, DAMPING.progress, dt);
    writeStationTs(rig.progress, frame.t);
    if (!reducedMotion) {
      frame.time += dt;
      frame.slabRotation += 0.02 * dt * (1 - frame.t[0]);
    }

    // Tier low and reduced motion keep the camera at the hero keyframe; stations still scrub.
    const along = cameraMoves && !reducedMotion ? rig.progress : 0;
    rig.path.getPoint(along, rig.target);
    rig.lookPath.getPoint(along, rig.targetLookAt);
    rig.targetLookAt.x *= Math.min(1, camera.aspect / LOOK_AT_ASPECT);
    const follow = 1 - Math.exp(-DAMPING.camera * dt);
    rig.position.lerp(rig.target, follow);
    rig.lookAt.lerp(rig.targetLookAt, follow);
    camera.position.copy(rig.position);
    camera.lookAt(rig.lookAt);

    const progressSettled = Math.abs(rig.progress - target) < SETTLE_EPSILON;
    const cameraSettled = rig.position.distanceToSquared(rig.target) < 1e-6;
    // Without time-driven motion (reduced motion) the scene can rest anywhere; otherwise only at the end.
    const settled = progressSettled && cameraSettled && (reducedMotion || target >= 0.999);
    if (!settled && document.visibilityState === "visible") invalidate();
  }, -1);

  return null;
}
