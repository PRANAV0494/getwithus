/*
 * Numbers for the service page panels, taken from the tuned browser prototype
 * (docs/prototype/home.html, build addendum section 28). Change them only after
 * measuring on a real screen.
 */
import { Color } from "three";
import type { StationKey } from "@/content/types";
import type { Quality } from "@/stores/scene.store";

type Vec3 = readonly [number, number, number];

export const CAMERA = { fov: 38, near: 0.1, far: 60 } as const;

export const SEED = 20261031;

/*
 * Lights. The prototype used three r128 legacy units: spot intensity 1.5 with
 * decay 1 and distance 40, hemisphere 1.3. Physically based lighting (the only
 * mode since r165) needs a factor of pi, and its inverse-distance falloff for
 * decay 1 is 1/d where legacy was (1 - d/40). The lamp is about 6.75 units from
 * the slab at both ends of its path, so the spot intensity carries that ratio.
 */
const LAMP_DISTANCE = 6.75;
export const LIGHTS = {
  spot: {
    intensity: 1.5 * Math.PI * (1 - LAMP_DISTANCE / 40) * LAMP_DISTANCE,
    angle: 0.55,
    penumbra: 0.6,
    decay: 1,
    distance: 40,
    from: [-3.5, 4.2, 4.0] as Vec3,
    to: [0.6, 1.6, 6.5] as Vec3,
  },
  hemisphere: { intensity: 1.3 * Math.PI },
  exposure: 1.15,
  fogDensity: 0.045,
} as const;

/** Geometry shared by the stations. */
export const SLAB = { cols: 24, rows: 14, cube: 0.1, spacing: 0.115 } as const;
export const PHONE = { width: 1.05, height: 2.275, depth: 0.07, tiltDegrees: 12 } as const;
export const NETWORK = {
  nodes: 48,
  edges: 70,
  radii: [2.6, 1.3, 0.9] as Vec3,
  nodeRadius: 0.07,
} as const;
export const FIELD = { desktop: 2000, mobile: 700, radius: 5.5 } as const;

/** Spec section 5.2: the matte base of cubes and nodes, a graphite between ink-2 and ink-3. */
const BASE_COLOR = "#2A3140";

/** Medium and low tiers draw the pane as thin tinted plastic instead of transmissive glass. */
export const GLASS_FALLBACK = { color: "#3A4356", opacity: 0.75 } as const;

type TierSettings = {
  dpr: number | [number, number];
  /** Share of full instance counts. */
  counts: number;
  transmission: boolean;
  adaptiveDpr: boolean;
};

/** Spec section 5.4 performance tiers. Tier "none" never mounts a canvas. */
export const TIERS: Record<Exclude<Quality, "none">, TierSettings> = {
  high: { dpr: [1, 1.75], counts: 1, transmission: true, adaptiveDpr: true },
  medium: {
    dpr: [1, 1.25],
    counts: 0.7,
    transmission: false,
    adaptiveDpr: false,
  },
  low: { dpr: 1, counts: 0.4, transmission: false, adaptiveDpr: false },
};

/**
 * Service page panels show one station at rest: fixed transition values, a fixed
 * camera, and a slow turn (0.15 rad/s). Each t has six slots, one per stage of
 * the original home sequence (hero, web, app, automation, marketing, close).
 */
export const STATION_VIEWS: Record<
  StationKey,
  { t: readonly number[]; position: Vec3; lookAt: Vec3 }
> = {
  custom: { t: [1, 0, 0, 0, 0, 0], position: [2.2, 1.4, 4.6], lookAt: [0, 0, 0] },
  web: { t: [1, 1, 0, 0, 0, 0], position: [2.2, 1.0, 4.6], lookAt: [0, 0, 0] },
  app: { t: [1, 1, 1, 0, 0, 0], position: [1.6, 0.6, 4.8], lookAt: [0.1, 0, 0] },
  automation: { t: [1, 1, 1, 1, 0, 0], position: [1.4, 1.4, 7.4], lookAt: [0, 0, 0] },
  marketing: { t: [1, 1, 1, 1, 1, 0], position: [0, 5.6, 13.5], lookAt: [0, 0.6, 0] },
};

export const TURNTABLE_SPEED = 0.15;
export const PANEL_FPS = 30;

export type Palette = {
  ink: Color;
  ink2: Color;
  ink3: Color;
  fog2: Color;
  lamp: Color;
  base: Color;
};

/**
 * Reads the brand tokens from CSS once at mount, so the scene and the page cannot
 * drift apart. Colors are created from sRGB hex and converted by ColorManagement.
 */
export function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    ink: new Color(token("--bg", "#0b0e13")),
    ink2: new Color(token("--card", "#121721")),
    ink3: new Color(token("--card-2", "#1a2130")),
    fog2: new Color(token("--body", "#9aa3b2")),
    lamp: new Color(token("--accent", "#2cd5e6")),
    base: new Color(BASE_COLOR),
  };
}
