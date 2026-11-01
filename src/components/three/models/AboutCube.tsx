"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { useModelFrame, useModelPalette } from "@/components/three/models/context";

/** The four commitments in a word or two, orbiting the cube. */
const WORDS = ["Fixed price", "You own it", "Weekly demos", "No lock-in"];
const RADIUS = 2.4;

/** /about: the "g" cube, larger, with the four commitment words orbiting it on a tilted ring. */
export default function AboutCube() {
  const palette = useModelPalette();
  const cube = useRef<Group>(null);
  const ring = useRef<Group>(null);

  useModelFrame((_, time) => {
    if (cube.current) cube.current.rotation.y = -0.6 + time * 0.25;
    if (ring.current) ring.current.rotation.y = time * 0.3;
  });

  return (
    <group rotation={[0.25, 0, 0]}>
      <group ref={cube} rotation={[0, -0.6, 0]}>
        <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.18} smoothness={4}>
          <meshStandardMaterial color={palette.card} roughness={0.5} />
        </RoundedBox>
        {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle) => (
          <group key={angle} rotation={[0, angle, 0]}>
            <RoundedBox
              args={[0.86, 0.86, 0.14]}
              radius={0.12}
              smoothness={3}
              position={[0, 0, 0.9]}
            >
              <meshStandardMaterial color={palette.accent} roughness={0.35} />
            </RoundedBox>
          </group>
        ))}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.012, 8, 160]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.5} />
      </mesh>
      <group ref={ring}>
        {WORDS.map((word, index) => {
          const angle = (index / WORDS.length) * Math.PI * 2;
          return (
            <Html
              key={word}
              position={[Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS]}
              center
              zIndexRange={[20, 0]}
            >
              <span className="rounded-full border border-line bg-card px-3 py-1.5 text-[0.8125rem] font-semibold whitespace-nowrap text-ink shadow-soft">
                {word}
              </span>
            </Html>
          );
        })}
      </group>
    </group>
  );
}
