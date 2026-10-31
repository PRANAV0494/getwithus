"use client";

/*
 * The WebGL canvas. This module and everything it imports (three, fiber, drei,
 * the stations) form the 3D chunk, loaded with a dynamic import after first
 * paint, and only on the home and service pages.
 */
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, WebGLRenderer } from "three";
import { CAMERA, CAMERA_KEYFRAMES, LIGHTS, TIERS } from "@/components/three/constants";
import Scene from "@/components/three/Scene";
import { publicEnv } from "@/config/public-env";
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
      gl={(defaults) => {
        const renderer = new WebGLRenderer({
          ...defaults,
          antialias: quality !== "low",
          alpha: false,
          powerPreference: "high-performance",
        });
        // Shader diagnostics stay on in development. In production they would force a
        // synchronous status read per program and print driver notes (for example the
        // HLSL X4122 precision notes on Windows) as console warnings.
        renderer.debug.checkShaderErrors = publicEnv.nodeEnv !== "production";
        return renderer;
      }}
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
