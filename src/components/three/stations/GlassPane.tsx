"use client";

/*
 * Station 1 and 2. The slab thins into a glass pane (t1) and a 12 x 8 grid draws
 * across its face. The pane then shrinks to a 9:19.5 phone, turns 12 degrees, and
 * a second screen appears behind it at 60 percent opacity (t2). Everything
 * dissolves as the network arrives (t3).
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  ExtrudeGeometry,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Shape,
  type Group,
  type LineSegments,
  type Material,
  type Mesh,
} from "three";
import { GLASS_FALLBACK, PHONE, type Palette } from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import {
  createEdgeLineMaterial,
  type EdgeLineMaterial,
} from "@/components/three/materials/edgeLine.material";
import type { World } from "@/components/three/world";

type GlassPaneProps = {
  world: World;
  frameRef: RefObject<FrameState>;
  palette: Palette;
  transmission: boolean;
};

/** A unit rounded rectangle, extruded to unit depth and centered, scaled per frame. */
function createPaneGeometry(): ExtrudeGeometry {
  const radius = 0.045;
  const shape = new Shape();
  shape.moveTo(-0.5 + radius, -0.5);
  shape.lineTo(0.5 - radius, -0.5);
  shape.quadraticCurveTo(0.5, -0.5, 0.5, -0.5 + radius);
  shape.lineTo(0.5, 0.5 - radius);
  shape.quadraticCurveTo(0.5, 0.5, 0.5 - radius, 0.5);
  shape.lineTo(-0.5 + radius, 0.5);
  shape.quadraticCurveTo(-0.5, 0.5, -0.5, 0.5 - radius);
  shape.lineTo(-0.5, -0.5 + radius);
  shape.quadraticCurveTo(-0.5, -0.5, -0.5 + radius, -0.5);
  const geometry = new ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments: 6 });
  geometry.translate(0, 0, -0.5);
  return geometry;
}

export default function GlassPane({ world, frameRef, palette, transmission }: GlassPaneProps) {
  const groupRef = useRef<Group>(null);
  const paneRef = useRef<Mesh>(null);
  const backRef = useRef<Mesh>(null);
  const gridRef = useRef<LineSegments>(null);

  const geometry = useMemo(() => createPaneGeometry(), []);
  const glass = useMemo(
    () =>
      transmission
        ? new MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.15,
            metalness: 0,
            transmission: 0.9,
            thickness: 0.4,
            ior: 1.5,
            transparent: true,
          })
        : new MeshStandardMaterial({
            color: GLASS_FALLBACK.color,
            roughness: 0.3,
            metalness: 0.1,
            transparent: true,
            envMapIntensity: 0,
          }),
    [transmission],
  );
  const glassOpacity = transmission ? 1 : GLASS_FALLBACK.opacity;
  const backMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: palette.base,
        roughness: 0.6,
        metalness: 0.1,
        transparent: true,
        opacity: 0,
        envMapIntensity: 0,
      }),
    [palette],
  );
  const gridGeometry = useMemo(() => {
    const lines = new BufferGeometry();
    lines.setAttribute("position", new BufferAttribute(world.paneGrid.position, 3));
    lines.setAttribute("aT", new BufferAttribute(world.paneGrid.t, 1));
    lines.setAttribute("aOrder", new BufferAttribute(world.paneGrid.order, 1));
    lines.setAttribute("aSeed", new BufferAttribute(world.paneGrid.seed, 1));
    return lines;
  }, [world]);
  const gridMaterial = useMemo(() => createEdgeLineMaterial(palette), [palette]);

  useEffect(
    () => () => {
      geometry.dispose();
      glass.dispose();
      backMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
    },
    [geometry, glass, backMaterial, gridGeometry, gridMaterial],
  );

  useFrame(() => {
    const group = groupRef.current;
    const pane = paneRef.current;
    const back = backRef.current;
    const grid = gridRef.current;
    if (!group || !pane || !back || !grid) return;
    const [, t1, t2, t3] = frameRef.current.t;
    group.visible = t1 * (1 - t3) > 0.001;
    if (!group.visible) return;

    const width = MathUtils.lerp(world.slabWidth, PHONE.width, t2);
    const height = MathUtils.lerp(world.slabHeight, PHONE.height, t2);
    const depth = MathUtils.lerp(MathUtils.lerp(0.1, 0.006, t1), PHONE.depth, t2);
    const shrink = 1 - t3;
    pane.scale.set(width * shrink, height * shrink, Math.max(0.002, depth * shrink));
    (pane.material as Material).opacity = glassOpacity * Math.min(1, t1 * 1.5);
    group.rotation.y = MathUtils.degToRad(PHONE.tiltDegrees) * t2;

    back.visible = t2 > 0.001;
    back.scale.copy(pane.scale);
    back.position.set(0.3 * t2, -0.16 * t2, -0.38 * t2);
    (back.material as Material).opacity = 0.6 * t2 * shrink;

    const lines = grid.material as EdgeLineMaterial;
    lines.uniforms.uDraw.value = t1;
    lines.uniforms.uOpacity.value = 0.9 * (1 - t2 * 0.6);
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh ref={paneRef} geometry={geometry} material={glass}>
        {/* Above the pane in render order, or the pane's own transparency hides the grid. */}
        <lineSegments
          ref={gridRef}
          geometry={gridGeometry}
          material={gridMaterial}
          position-z={0.003}
          renderOrder={10}
        />
      </mesh>
      <mesh ref={backRef} geometry={geometry} material={backMaterial} visible={false} />
    </group>
  );
}
