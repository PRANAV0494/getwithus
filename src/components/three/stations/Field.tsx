"use client";

/*
 * Station 4 and 5: 2,000 points (700 on phones) seeded from the network's nodes.
 * They spread along a gentle paraboloid, densest at the center, as the camera
 * pulls back (t4), then fall into the slab's slots at the close (t5) while the
 * cubes scale back in. All motion happens in the vertex shader.
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { BufferAttribute, BufferGeometry, type Points } from "three";
import type { Palette } from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import {
  createFieldPointsMaterial,
  type FieldPointsMaterial,
} from "@/components/three/materials/fieldPoints.material";
import type { World } from "@/components/three/world";

type FieldProps = { world: World; frameRef: RefObject<FrameState>; palette: Palette };

export default function Field({ world, frameRef, palette }: FieldProps) {
  const pointsRef = useRef<Points>(null);

  const geometry = useMemo(() => {
    const field = new BufferGeometry();
    // `position` holds the slab slot; the shader mixes toward it at the close.
    field.setAttribute("position", new BufferAttribute(world.field.slab, 3));
    field.setAttribute("aStart", new BufferAttribute(world.field.start, 3));
    field.setAttribute("aEnd", new BufferAttribute(world.field.end, 3));
    field.setAttribute("aSize", new BufferAttribute(world.field.size, 1));
    field.setAttribute("aSeed", new BufferAttribute(world.field.seed, 1));
    return field;
  }, [world]);
  const material = useMemo(() => createFieldPointsMaterial(palette), [palette]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const frame = frameRef.current;
    const [, , , , t4, t5] = frame.t;
    points.visible = t4 > 0.001 && t5 < 0.999;
    if (!points.visible) return;
    const { uniforms } = points.material as FieldPointsMaterial;
    uniforms.uT4.value = t4;
    uniforms.uT5.value = t5;
    uniforms.uTime.value = frame.time;
    uniforms.uDpr.value = state.viewport.dpr;
    uniforms.uSlabRotation.value = frame.slabRotation;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      visible={false}
    />
  );
}
