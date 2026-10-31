"use client";

/*
 * Composes the world: background and fog in the page's own color, one warm lamp,
 * a dim cool hemisphere, a procedural environment for the glass, the rig that
 * drives the frame, and the four stations. Used by the home canvas (scroll
 * driven) and by service page panels (one station at rest).
 */
import { AdaptiveDpr, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Vector3, type Group, type Object3D, type SpotLight } from "three";
import CameraRig from "@/components/three/CameraRig";
import {
  LIGHTS,
  STATION_VIEWS,
  TIERS,
  readPalette,
  type Palette,
} from "@/components/three/constants";
import { createFrameState, type FrameState } from "@/components/three/frame";
import { lowerQuality } from "@/components/three/hooks/useQuality";
import StationRig from "@/components/three/StationRig";
import Field from "@/components/three/stations/Field";
import GlassPane from "@/components/three/stations/GlassPane";
import LatticeSlab from "@/components/three/stations/LatticeSlab";
import Network from "@/components/three/stations/Network";
import { buildWorld } from "@/components/three/world";
import type { StationKey } from "@/content/types";
import { logger } from "@/lib/logger";
import { useSceneStore, type Quality } from "@/stores/scene.store";

type SceneProps = {
  quality: Exclude<Quality, "none">;
  /** Set on service page panels; the home page leaves it out and follows scroll. */
  station?: StationKey;
  /** Panels pause when scrolled out of view. */
  active?: boolean;
};

/** The one light: up-left of the slab, moving to the front for the close. */
function Lamp({ frameRef, palette }: { frameRef: RefObject<FrameState>; palette: Palette }) {
  const light = useRef<SpotLight>(null);
  const from = useMemo(() => new Vector3(...LIGHTS.spot.from), []);
  const to = useMemo(() => new Vector3(...LIGHTS.spot.to), []);
  useFrame(() => {
    light.current?.position.lerpVectors(from, to, frameRef.current.t[5]);
  });
  const { intensity, angle, penumbra, decay, distance } = LIGHTS.spot;
  return (
    <spotLight
      ref={light}
      color={palette.lamp}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
      decay={decay}
      distance={distance}
      position={LIGHTS.spot.from}
    />
  );
}

/** Reflections for the glass pane only; every other material ignores the environment. */
function GlassEnvironment({ palette }: { palette: Palette }) {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        form="rect"
        color={palette.lamp}
        intensity={1.5}
        position={LIGHTS.spot.from}
        scale={[3, 1.5, 1]}
        target={[0, 0, 0]}
      />
      <Lightformer
        form="rect"
        color={palette.fog2}
        intensity={0.6}
        position={[4, 0.5, 3]}
        scale={[2, 4, 1]}
        target={[0, 0, 0]}
      />
      <Lightformer
        form="ring"
        color={palette.fog2}
        intensity={0.3}
        position={[0, 2, -6]}
        scale={3}
        target={[0, 0, 0]}
      />
    </Environment>
  );
}

/** Two consecutive frame-rate declines step the tier down one level for the rest of the visit. */
function QualityMonitor({ quality, adaptiveDpr }: { quality: Quality; adaptiveDpr: boolean }) {
  const declines = useRef(0);
  const regress = useThree((state) => state.performance.regress);
  const setQuality = useSceneStore((state) => state.setQuality);
  return (
    <>
      {adaptiveDpr ? <AdaptiveDpr /> : null}
      <PerformanceMonitor
        onDecline={() => {
          regress();
          declines.current += 1;
          if (declines.current >= 2) {
            declines.current = 0;
            setQuality(lowerQuality(quality));
          }
        }}
        onIncline={() => {
          declines.current = 0;
        }}
      />
    </>
  );
}

/**
 * Compiles every station's shaders once, right after mount, so the first time the
 * pane, network, or field appears mid-scroll there is no compile hitch. Hidden
 * objects are shown only for the synchronous part of the call; each station sets
 * its own visibility again before the next frame renders.
 */
function ShaderWarmup() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    const hidden: Object3D[] = [];
    scene.traverse((object) => {
      if (!object.visible) {
        hidden.push(object);
        object.visible = true;
      }
    });
    // Without parallel compile support, compileAsync only logs a warning; compile synchronously instead.
    const pending = gl.extensions.has("KHR_parallel_shader_compile")
      ? gl.compileAsync(scene, camera)
      : Promise.resolve(gl.compile(scene, camera));
    for (const object of hidden) object.visible = false;
    pending.catch((error: unknown) =>
      logger.warn("Shader warm-up failed; shaders compile on first use", { error }),
    );
  }, [gl, scene, camera]);

  return null;
}

export default function Scene({ quality, station, active = true }: SceneProps) {
  const settings = TIERS[quality];
  const palette = useMemo(() => readPalette(), []);
  const mobile = useMemo(() => window.innerWidth < 768, []);
  const world = useMemo(() => buildWorld(settings.counts, mobile), [settings.counts, mobile]);
  const frameRef = useRef(createFrameState(station ? STATION_VIEWS[station].t : undefined));
  const background = station ? palette.ink2 : palette.ink;

  const turntable = useRef<Group>(null);
  const slab = useRef<Group>(null);
  useFrame(() => {
    if (turntable.current) turntable.current.rotation.y = frameRef.current.turntable;
    if (slab.current) slab.current.rotation.y = frameRef.current.slabRotation;
  });

  return (
    <>
      <color attach="background" args={[background]} />
      <fogExp2 attach="fog" args={[background, LIGHTS.fogDensity]} />
      <hemisphereLight args={[palette.ink3, palette.ink, LIGHTS.hemisphere.intensity]} />
      <Lamp frameRef={frameRef} palette={palette} />
      {settings.transmission ? <GlassEnvironment palette={palette} /> : null}
      {station ? (
        <StationRig frameRef={frameRef} station={station} active={active} />
      ) : (
        <CameraRig frameRef={frameRef} cameraMoves={settings.cameraMoves} />
      )}
      <QualityMonitor quality={quality} adaptiveDpr={settings.adaptiveDpr} />
      <ShaderWarmup />
      <group ref={turntable}>
        <group ref={slab}>
          <LatticeSlab world={world} frameRef={frameRef} palette={palette} />
          <GlassPane
            world={world}
            frameRef={frameRef}
            palette={palette}
            transmission={settings.transmission}
          />
        </group>
        <Network world={world} frameRef={frameRef} palette={palette} />
        <Field world={world} frameRef={frameRef} palette={palette} />
      </group>
    </>
  );
}
