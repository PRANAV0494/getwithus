import { describe, expect, it } from "vitest";
import {
  BARS,
  barHeights,
  boxFaces,
  iso,
  LIFT,
  slabTop,
  trendPath,
  VIEW,
} from "@/components/sections/blueprintGeometry";

describe("blueprint geometry", () => {
  it("projects isometrically: height moves straight up the screen", () => {
    const [x0, y0] = iso(100, 0, 100);
    const [x1, y1] = iso(100, 50, 100);
    expect(x1).toBe(x0);
    expect(y0 - y1).toBe(50);
  });

  it("keeps the whole drawing, waiting slabs included, inside the view box", () => {
    const corners = [0, 200].flatMap((x) => [0, 200].map((z) => [x, z] as const));
    LIFT.forEach((lift, index) => {
      for (const [x, z] of corners) {
        const [sx, sy] = iso(x, slabTop(index) + lift, z);
        expect(sx).toBeGreaterThanOrEqual(0);
        expect(sx).toBeLessThanOrEqual(VIEW.width);
        expect(sy).toBeGreaterThanOrEqual(0);
        expect(sy).toBeLessThanOrEqual(VIEW.height);
      }
    });
  });

  it("raises the bars only as the marketing slab settles, and fully once docked", () => {
    expect(barHeights(0)).toEqual([0, 0, 0, 0]);
    expect(barHeights(0.4)).toEqual([0, 0, 0, 0]);
    expect(barHeights(1)).toEqual(BARS.map((bar) => bar.height));
    const half = barHeights(0.7);
    expect(half[0]).toBeGreaterThan(half[3] / BARS[3].height);
  });

  it("draws closed faces and a trend line with an arrowhead", () => {
    const faces = boxFaces(0, 0, 20, 20, 0, 10);
    for (const d of Object.values(faces)) expect(d).toMatch(/^M .+ Z$/);
    expect(trendPath(barHeights(1)).match(/M /g)).toHaveLength(2);
  });
});
