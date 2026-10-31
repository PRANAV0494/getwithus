/*
 * Geometry of figure 02 on the home page: an isometric drawing of four slabs,
 * one per service line, that assemble into a stack as the service cards pass.
 * World units: x runs to the right and back, z to the left and back, y is
 * height. Everything is in SVG user units of a 600 x 520 view box.
 */

export const VIEW = { width: 600, height: 520 } as const;

const ORIGIN = { x: 220, y: 270 } as const;
const COS = 0.866;
const SIN = 0.5;

/** Slab size, thickness, and the rise from one docked slab to the next. */
export const SLAB = { size: 200, thickness: 12, step: 22 } as const;

/** How far above its place each slab waits until its card arrives. */
export const LIFT = [46, 76, 106, 136] as const;

type Point = readonly [number, number];

const round = (value: number) => Math.round(value * 10) / 10;

/** Projects a world point to the view box. */
export function iso(x: number, y: number, z: number): Point {
  return [round(ORIGIN.x + (x - z) * COS), round(ORIGIN.y + (x + z) * SIN - y)];
}

const join = (points: readonly Point[]) => points.map(([x, y]) => `${x} ${y}`).join(" L ");

export const polygon = (points: readonly Point[]) => `M ${join(points)} Z`;
export const polyline = (points: readonly Point[]) => `M ${join(points)}`;

/** The SVG transform that lays a flat 200 x 200 drawing onto a top face at height y. */
export function faceTransform(y: number): string {
  return `matrix(${COS} ${SIN} ${-COS} ${SIN} ${ORIGIN.x} ${round(ORIGIN.y - y)})`;
}

/** The three visible faces of a box (top, right, front) as path data. */
export function boxFaces(
  x: number,
  z: number,
  width: number,
  depth: number,
  y: number,
  height: number,
) {
  const top = y + height;
  return {
    right: polygon([
      iso(x + width, top, z),
      iso(x + width, top, z + depth),
      iso(x + width, y, z + depth),
      iso(x + width, y, z),
    ]),
    front: polygon([
      iso(x, top, z + depth),
      iso(x + width, top, z + depth),
      iso(x + width, y, z + depth),
      iso(x, y, z + depth),
    ]),
    top: polygon([
      iso(x, top, z),
      iso(x + width, top, z),
      iso(x + width, top, z + depth),
      iso(x, top, z + depth),
    ]),
  };
}

/** Bottom and top of slab `index` once docked. */
export const slabBase = (index: number) => index * SLAB.step;
export const slabTop = (index: number) => slabBase(index) + SLAB.thickness;

/** The marketing slab's chart: bar footprints on its top face and their full heights. */
export const BARS = [
  { x: 44, z: 128, height: 22 },
  { x: 80, z: 100, height: 38 },
  { x: 116, z: 72, height: 56 },
  { x: 152, z: 44, height: 78 },
] as const;
export const BAR_SIZE = 20;

/** Bar heights for how far the marketing slab has docked: they rise in turn as it settles. */
export function barHeights(docked: number): number[] {
  const growth = Math.min(1, Math.max(0, (docked - 0.4) / 0.6));
  return BARS.map(
    (bar, index) => bar.height * Math.min(1, Math.max(0, growth * 1.3 - index * 0.1)),
  );
}

/** The trend line over the bars, ending in an arrowhead. */
export function trendPath(heights: readonly number[]): string {
  const top = slabTop(BARS.length - 1);
  const points = BARS.map((bar, index) =>
    iso(bar.x + BAR_SIZE / 2, top + heights[index] + 14, bar.z + BAR_SIZE / 2),
  );
  const [px, py] = points[points.length - 2];
  const [ex, ey] = points[points.length - 1];
  const angle = Math.atan2(ey - py, ex - px);
  const wing = (turn: number): Point => [
    round(ex - 9 * Math.cos(angle + turn)),
    round(ey - 9 * Math.sin(angle + turn)),
  ];
  return `${polyline(points)} ${polyline([wing(0.5), [ex, ey], wing(-0.5)])}`;
}
