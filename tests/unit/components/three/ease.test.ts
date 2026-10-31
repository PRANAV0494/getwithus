import { describe, expect, it } from "vitest";
import { smoothstep } from "@/components/three/ease";

describe("smoothstep", () => {
  it("clamps outside the edges", () => {
    expect(smoothstep(0.2, 0.4, -1)).toBe(0);
    expect(smoothstep(0.2, 0.4, 0.2)).toBe(0);
    expect(smoothstep(0.2, 0.4, 0.4)).toBe(1);
    expect(smoothstep(0.2, 0.4, 5)).toBe(1);
  });

  it("eases: half way is one half, and the curve is flat at both ends", () => {
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
    expect(smoothstep(0, 1, 0.1)).toBeLessThan(0.1);
    expect(smoothstep(0, 1, 0.9)).toBeGreaterThan(0.9);
  });

  it("is monotonic between the edges", () => {
    let previous = -1;
    for (let x = 0; x <= 1; x += 0.01) {
      const t = smoothstep(0.25, 0.7, x);
      expect(t).toBeGreaterThanOrEqual(previous);
      previous = t;
    }
  });
});
