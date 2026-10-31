"use client";

/*
 * Station 0 and 5: a 24 x 14 lattice of small instanced cubes. It starts as a
 * loose seeded cloud and each cube lerps to its grid slot as the hero scrolls
 * (t0). The cubes thin and fade while the glass pane takes over (t1), then scale
 * back in at the close (t5) as the field points settle into the same slots.
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { BoxGeometry, MathUtils, MeshStandardMaterial, Object3D, type InstancedMesh } from "three";
import { SLAB, type Palette } from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import { smoothstep } from "@/components/three/ease";
import type { World } from "@/components/three/world";

type LatticeSlabProps = { world: World; frameRef: RefObject<FrameState>; palette: Palette };

// Scratch object for composing instance matrices; frame callbacks run one at a time.
const dummy = new Object3D();

export default function LatticeSlab({ world, frameRef, palette }: LatticeSlabProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new BoxGeometry(SLAB.cube, SLAB.cube, SLAB.cube), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: palette.base,
        roughness: 0.55,
        metalness: 0.1,
        envMapIntensity: 0,
      }),
    [palette],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const [t0, t1, , , , t5] = frameRef.current.t;
    // Fade with the pane's arrival, not after it, or the thinning cubes z-fight the glass.
    const presence = Math.max(1 - smoothstep(0.25, 0.7, t1), t5);
    mesh.visible = presence > 0.001;
    if (!mesh.visible) return;

    const depth = MathUtils.lerp(1, 0.06, t1) * (1 - t5) + t5;
    const { cloudPositions: cloud, gridPositions: grid } = world;
    for (let k = 0; k < world.cubes; k++) {
      const i = k * 3;
      dummy.position.set(
        MathUtils.lerp(cloud[i], grid[i], t0),
        MathUtils.lerp(cloud[i + 1], grid[i + 1], t0),
        MathUtils.lerp(cloud[i + 2], grid[i + 2], t0),
      );
      dummy.rotation.set((1 - t0) * (k % 7) * 0.5, (1 - t0) * (k % 5) * 0.4, 0);
      dummy.scale.set(presence, presence, presence * depth);
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, world.cubes]} frustumCulled={false} />
  );
}
