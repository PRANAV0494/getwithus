"use client";

/*
 * Station 3: 48 instanced nodes and 70 edges. Nodes grow in as the screens
 * dissolve (t3), edges draw in, and lamp-colored pulses travel along each edge.
 * The leftmost and rightmost nodes brighten in turn: a message arriving, a reply
 * going out. Everything fades as the field spreads (t4).
 */
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  type InstancedMesh,
  type LineSegments,
} from "three";
import { NETWORK, type Palette } from "@/components/three/constants";
import type { FrameState } from "@/components/three/frame";
import { smoothstep } from "@/components/three/ease";
import {
  createEdgeLineMaterial,
  type EdgeLineMaterial,
} from "@/components/three/materials/edgeLine.material";
import type { World } from "@/components/three/world";

type NetworkProps = { world: World; frameRef: RefObject<FrameState>; palette: Palette };

// Scratch objects; frame callbacks run one at a time.
const dummy = new Object3D();
const tint = new Color();

export default function Network({ world, frameRef, palette }: NetworkProps) {
  const nodesRef = useRef<InstancedMesh>(null);
  const edgesRef = useRef<LineSegments>(null);
  const count = world.nodes.length;

  const sphere = useMemo(() => new SphereGeometry(NETWORK.nodeRadius, 14, 10), []);
  const nodeMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.1,
        envMapIntensity: 0,
      }),
    [],
  );
  const edgeGeometry = useMemo(() => {
    const lines = new BufferGeometry();
    lines.setAttribute("position", new BufferAttribute(world.edges.position, 3));
    lines.setAttribute("aT", new BufferAttribute(world.edges.t, 1));
    lines.setAttribute("aOrder", new BufferAttribute(world.edges.order, 1));
    lines.setAttribute("aSeed", new BufferAttribute(world.edges.seed, 1));
    return lines;
  }, [world]);
  const edgeMaterial = useMemo(() => createEdgeLineMaterial(palette), [palette]);

  useEffect(
    () => () => {
      sphere.dispose();
      nodeMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
    },
    [sphere, nodeMaterial, edgeGeometry, edgeMaterial],
  );

  // Every node needs a color before the first frame so the instance color buffer exists.
  useLayoutEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    for (let k = 0; k < count; k++) nodes.setColorAt(k, palette.base);
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
  }, [count, palette]);

  useFrame(() => {
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    if (!nodes || !edges) return;
    const frame = frameRef.current;
    const [, , , t3, t4] = frame.t;
    const scale = t3 * (1 - t4);
    nodes.visible = scale > 0.001;
    edges.visible = nodes.visible;
    if (!nodes.visible) return;

    for (let k = 0; k < count; k++) {
      const node = world.nodes[k];
      dummy.position.set(node.x, node.y, node.z);
      dummy.scale.setScalar(scale * (k === world.endA || k === world.endB ? 1.6 : 1));
      dummy.updateMatrix();
      nodes.setMatrixAt(k, dummy.matrix);
    }
    nodes.instanceMatrix.needsUpdate = true;

    const arrived = smoothstep(0.5, 1, t3);
    const wave = Math.sin(frame.time * 1.6);
    nodes.setColorAt(
      world.endA,
      tint.copy(palette.base).lerp(palette.lamp, Math.max(0, wave) * arrived),
    );
    nodes.setColorAt(
      world.endB,
      tint.copy(palette.base).lerp(palette.lamp, Math.max(0, -wave) * arrived),
    );
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;

    const lines = edges.material as EdgeLineMaterial;
    lines.uniforms.uDraw.value = t3;
    lines.uniforms.uPulse.value = arrived * (1 - t4);
    lines.uniforms.uOpacity.value = 1 - t4;
    lines.uniforms.uTime.value = frame.time;
  });

  return (
    <>
      <instancedMesh
        ref={nodesRef}
        args={[sphere, nodeMaterial, count]}
        frustumCulled={false}
        visible={false}
      />
      <lineSegments
        ref={edgesRef}
        geometry={edgeGeometry}
        material={edgeMaterial}
        visible={false}
      />
    </>
  );
}
