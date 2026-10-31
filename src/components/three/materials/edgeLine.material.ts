/*
 * Shared line shader for the grid drawn on the glass pane (station 1) and the
 * network edges (station 3). `uDraw` reveals segments in draw order; `uPulse`
 * sends a bright band along each edge once every 1.6 s, offset per edge.
 * Colors are written without an output transform, as in the tuned prototype.
 */
import { ShaderMaterial, UniformsLib, UniformsUtils, type Color } from "three";

const vertexShader = /* glsl */ `
  attribute float aT;
  attribute float aOrder;
  attribute float aSeed;
  varying float vT;
  varying float vOrder;
  varying float vSeed;
  #include <fog_pars_vertex>
  void main() {
    vT = aT;
    vOrder = aOrder;
    vSeed = aSeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uDraw;
  uniform float uPulse;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec3 uLamp;
  varying float vT;
  varying float vOrder;
  varying float vSeed;
  #include <fog_pars_fragment>
  void main() {
    if (vT * 0.7 + vOrder * 0.3 > uDraw) discard;
    float head = fract(uTime / 1.6 + vSeed);
    float pulse = smoothstep(0.09, 0.0, abs(vT - head)) * uPulse;
    gl_FragColor = vec4(mix(uColor, uLamp, pulse), uOpacity * (0.6 + 0.4 * pulse));
    #include <fog_fragment>
  }
`;

type EdgeLineUniforms = {
  uDraw: { value: number };
  uPulse: { value: number };
  uTime: { value: number };
  uOpacity: { value: number };
};

export type EdgeLineMaterial = ShaderMaterial & { uniforms: EdgeLineUniforms };

/** Creates the line material. Line color is fog-2 at 90 percent; pulses are lamp. */
export function createEdgeLineMaterial(colors: { fog2: Color; lamp: Color }): EdgeLineMaterial {
  const material = new ShaderMaterial({
    uniforms: UniformsUtils.merge([
      UniformsLib.fog,
      {
        uDraw: { value: 0 },
        uPulse: { value: 0 },
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uColor: { value: colors.fog2.clone().multiplyScalar(0.9) },
        uLamp: { value: colors.lamp.clone() },
      },
    ]),
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    fog: true,
  });
  return material as EdgeLineMaterial;
}
