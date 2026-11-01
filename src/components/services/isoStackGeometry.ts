/*
 * Geometry of the services stack (figure 02), in SVG user units of a 560 x 580
 * view box: isometric plates with a half size of 80 and a thickness of 9,
 * stacked up from BASE, plus the fixed label positions on the right.
 */
export const VIEW = { width: 560, height: 580 } as const;

const HALF = 80;
const THICKNESS = 9;
const PLATE_WIDTH = Math.round(HALF * 1.732 * 100) / 100;
export const CENTER_X = 205;
export const BASE = 452;

const points = (list: readonly (readonly [number, number])[]) =>
  list.map(([x, y]) => `${x},${y}`).join(" ");

export const TOP_FACE = points([
  [0, -HALF],
  [PLATE_WIDTH, 0],
  [0, HALF],
  [-PLATE_WIDTH, 0],
]);
export const LEFT_FACE = points([
  [-PLATE_WIDTH, 0],
  [0, HALF],
  [0, HALF + THICKNESS],
  [-PLATE_WIDTH, THICKNESS],
]);
export const RIGHT_FACE = points([
  [0, HALF],
  [PLATE_WIDTH, 0],
  [PLATE_WIDTH, THICKNESS],
  [0, HALF + THICKNESS],
]);

/** Lays flat drawings onto a plate's top face. */
export const FACE_MATRIX = "matrix(0.866 0.5 -0.866 0.5 0 0)";

/** Label rows, bottom plate first: fixed and evenly spaced, so labels can never overlap. */
export const LABEL_Y = [500, 410, 320, 230, 140] as const;
export const LABEL_X = 432;

/** The gap between plates for an explode progress t (0 to 1): together at both ends, apart in the middle. */
export function plateGap(t: number): number {
  return 24 + 54 * Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
}

/** Where plate `index` sits for a gap; the active plate lifts an extra 20. */
export function plateY(index: number, gap: number, active: boolean): number {
  return BASE - index * gap - (active ? 20 : 0);
}

/** The leader from a plate's right corner, at height y, to its label row. */
export function leaderPoints(y: number, index: number): string {
  const row = LABEL_Y[index] ?? LABEL_Y[0];
  return `${CENTER_X + PLATE_WIDTH + 4},${y.toFixed(1)} 398,${row} 424,${row}`;
}
