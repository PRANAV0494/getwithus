import { describe, expect, it } from "vitest";
import { STATION_WINDOWS } from "@/components/three/constants";
import { smoothstep, stationT, writeStationTs } from "@/components/three/hooks/useStationT";

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
});

describe("stationT", () => {
  it("maps the web window: 0 before 0.15, 1 after 0.35, smooth in between", () => {
    const web = STATION_WINDOWS[1];
    expect(stationT(0.1, web)).toBe(0);
    expect(stationT(0.25, web)).toBeCloseTo(0.5);
    expect(stationT(0.4, web)).toBe(1);
  });

  it("is monotonic, so scrolling back plays the transition in reverse", () => {
    let previous = -1;
    for (let p = 0; p <= 1; p += 0.01) {
      const t = stationT(p, STATION_WINDOWS[3]);
      expect(t).toBeGreaterThanOrEqual(previous);
      previous = t;
    }
  });
});

describe("writeStationTs", () => {
  it("fills all six stations from one progress value", () => {
    const out = [0, 0, 0, 0, 0, 0];
    writeStationTs(0.65, out);
    expect(out.slice(0, 3)).toEqual([1, 1, 1]);
    expect(out[3]).toBeCloseTo(0.5);
    expect(out.slice(4)).toEqual([0, 0]);
  });

  it("covers progress 0 to 1 with contiguous windows", () => {
    for (let i = 1; i < STATION_WINDOWS.length; i++) {
      expect(STATION_WINDOWS[i][0]).toBe(STATION_WINDOWS[i - 1][1]);
    }
    expect(STATION_WINDOWS[0][0]).toBe(0);
    expect(STATION_WINDOWS.at(-1)?.[1]).toBe(1);
  });
});
