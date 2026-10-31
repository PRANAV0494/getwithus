/*
 * Point shader for the marketing field (station 4) and its return to the slab
 * (station 5). Each point moves from its network seed to the paraboloid by uT4,
 * then to its slab slot by uT5. Round sprites via gl_PointCoord, size attenuated
 * by depth, cool-to-warm tint per point.
 */
import { ShaderMaterial, UniformsLib, UniformsUtils, type Color } from "three";

const vertexShader = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aSize;
  attribute float aSeed;
  uniform float uT4;
  uniform float uT5;
  uniform float uTime;
  uniform float uDpr;
  uniform float uSlabRotation;
  varying float vSeed;
  varying float vAlpha;
  #include <fog_pars_vertex>
  void main() {
    vSeed = aSeed;
    // The slab may have drifted while it was a cloud; land the points on its rotated slots.
    float c = cos(uSlabRotation);
    float s = sin(uSlabRotation);
    vec3 slot = vec3(c * position.x + s * position.z, position.y, -s * position.x + c * position.z);
    vec3 p = mix(mix(aStart, aEnd, uT4), slot, uT5);
    p.y += sin(uTime * 0.6 + aSeed * 6.2831) * 0.04 * uT4 * (1.0 - uT5);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uDpr * (26.0 / -mvPosition.z);
    vAlpha = smoothstep(0.0, 0.2, uT4) * (1.0 - smoothstep(0.75, 1.0, uT5));
    #include <fog_vertex>
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uCool;
  uniform vec3 uWarm;
  varying float vSeed;
  varying float vAlpha;
  #include <fog_pars_fragment>
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(mix(uCool, uWarm, vSeed * 0.55), smoothstep(0.5, 0.2, d) * vAlpha);
    #include <fog_fragment>
  }
`;

type FieldPointsUniforms = {
  uT4: { value: number };
  uT5: { value: number };
  uTime: { value: number };
  uDpr: { value: number };
  uSlabRotation: { value: number };
};

export type FieldPointsMaterial = ShaderMaterial & { uniforms: FieldPointsUniforms };

/** Creates the field material. Cool tint is fog-2 at 70 percent; warm tint is lamp. */
export function createFieldPointsMaterial(colors: {
  fog2: Color;
  lamp: Color;
}): FieldPointsMaterial {
  const material = new ShaderMaterial({
    uniforms: UniformsUtils.merge([
      UniformsLib.fog,
      {
        uT4: { value: 0 },
        uT5: { value: 0 },
        uTime: { value: 0 },
        uDpr: { value: 1 },
        uSlabRotation: { value: 0 },
        uCool: { value: colors.fog2.clone().multiplyScalar(0.7) },
        uWarm: { value: colors.lamp.clone() },
      },
    ]),
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    fog: true,
  });
  return material as FieldPointsMaterial;
}
