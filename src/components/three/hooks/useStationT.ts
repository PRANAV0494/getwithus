import { STATION_WINDOWS } from "@/components/three/constants";

/** Hermite smoothstep, clamped to [0, 1]. Mirrors GLSL smoothstep. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** A station's eased transition value for a progress window: 0 before it, 1 after it. */
export function stationT(progress: number, window: readonly [number, number]): number {
  return smoothstep(window[0], window[1], progress);
}

/**
 * Writes all six station values for one progress into `out`, so every station is
 * computed from the same damped progress and the transitions scrub both ways.
 */
export function writeStationTs(progress: number, out: number[]): void {
  STATION_WINDOWS.forEach((window, index) => {
    out[index] = stationT(progress, window);
  });
}
