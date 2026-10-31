import { describe, expect, it } from "vitest";
import { buildWorld } from "@/components/three/world";
import { mulberry32 } from "@/lib/random";

describe("mulberry32", () => {
  it("is deterministic per seed and stays in [0, 1)", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const value = a();
      expect(value).toBe(b());
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("buildWorld", () => {
  it("builds the full-tier counts from the spec", () => {
    const world = buildWorld(1, false);
    expect(world.cols * world.rows).toBe(24 * 14);
    expect(world.nodes).toHaveLength(48);
    expect(world.edges.position.length / 6).toBe(70);
    expect(world.field.count).toBe(2000);
    expect(world.paneGrid.position.length / 6).toBe(13 + 9);
  });

  it("scales counts per tier and for phones", () => {
    expect(buildWorld(0.7, false).field.count).toBe(1400);
    expect(buildWorld(1, true).field.count).toBe(700);
    expect(buildWorld(0.4, true).nodes).toHaveLength(19);
  });

  it("renders identically on every load", () => {
    const first = buildWorld(1, false);
    const second = buildWorld(1, false);
    expect(Array.from(first.cloudPositions)).toEqual(Array.from(second.cloudPositions));
    expect(Array.from(first.field.end)).toEqual(Array.from(second.field.end));
  });

  it("marks the leftmost and rightmost nodes as the message ends", () => {
    const world = buildWorld(1, false);
    const xs = world.nodes.map((node) => node.x);
    expect(world.nodes[world.endA].x).toBe(Math.min(...xs));
    expect(world.nodes[world.endB].x).toBe(Math.max(...xs));
  });
});
