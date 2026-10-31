"use client";

/*
 * The WebGL canvas. This module and everything it imports (three, fiber, drei,
 * the stations) form the 3D chunk, loaded with a dynamic import after first
 * paint, and only on the home and service pages.
 */
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { CAMERA, CAMERA_KEYFRAMES, LIGHTS, TIERS } from "@/components/three/constants";
import Scene from "@/components/three/Scene";
import type { StationKey } from "@/content/types";
import { useSceneStore, type Quality } from "@/stores/scene.store";

type StageProps = {
  quality: Exclude<Quality, "none">;
  station?: StationKey;
  active?: boolean;
};

export default function Stage({ quality, station, active }: StageProps) {
  const settings = TIERS[quality];
  const setCanvasReady = useSceneStore((state) => state.setCanvasReady);
  const setQuality = useSceneStore((state) => state.setQuality);
  const [x, y, z] = CAMERA_KEYFRAMES[0].position;

  return (
    <Canvas
      dpr={settings.dpr}
      frameloop="demand"
      gl={{ antialias: quality !== "low", alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: CAMERA.fov, near: CAMERA.near, far: CAMERA.far, position: [x, y, z] }}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = LIGHTS.exposure;
        gl.domElement.addEventListener("webglcontextlost", () => setQuality("none"), {
          once: true,
        });
        setCanvasReady(true);
      }}
    >
      <Scene quality={quality} station={station} active={active} />
    </Canvas>
  );
}
