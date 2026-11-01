import { describe, expect, it } from "vitest";
import { isEmail } from "@/components/cta/TerminalCta";
import { scrambleFrame } from "@/components/motion/ScrambleText";
import {
  BASE,
  LABEL_Y,
  leaderPoints,
  plateGap,
  plateY,
} from "@/components/services/isoStackGeometry";

describe("scrambleFrame", () => {
  it("never scrambles spaces, slashes, or the prompt mark", () => {
    for (const progress of [0, 0.3, 0.7]) {
      const frame = scrambleFrame("> 01 / services", progress, () => 0.5);
      expect(frame[0]).toBe(">");
      expect(frame[1]).toBe(" ");
      expect(frame.slice(4, 7)).toBe(" / ");
    }
  });

  it("reveals left to right and ends on the text, keeping its length", () => {
    const text = "service_03";
    expect(scrambleFrame(text, 0.5, () => 0)).toMatch(/^servi/);
    expect(scrambleFrame(text, 0.2, () => 0)).toHaveLength(text.length);
    expect(scrambleFrame(text, 1)).toBe(text);
  });
});

describe("isEmail", () => {
  it("accepts an address with a domain and rejects anything else", () => {
    expect(isEmail("name@company.com")).toBe(true);
    expect(isEmail("  name@company.co.uk ")).toBe(true);
    for (const value of ["", "name", "name@company", "name @company.com", "@company.com"]) {
      expect(isEmail(value)).toBe(false);
    }
  });
});

describe("services stack geometry", () => {
  it("is together at both ends of the section and spread apart in the middle", () => {
    expect(plateGap(0)).toBe(24);
    expect(plateGap(1)).toBeCloseTo(24);
    expect(plateGap(0.5)).toBeCloseTo(78);
    expect(plateGap(-1)).toBe(24);
  });

  it("stacks upward from the base and lifts the active plate by 20", () => {
    expect(plateY(0, 30, false)).toBe(BASE);
    expect(plateY(2, 30, false)).toBe(BASE - 60);
    expect(plateY(2, 30, true)).toBe(BASE - 80);
  });

  it("keeps labels on fixed rows far enough apart never to overlap", () => {
    for (let index = 1; index < LABEL_Y.length; index++) {
      expect(LABEL_Y[index - 1] - LABEL_Y[index]).toBeGreaterThanOrEqual(20);
    }
    expect(leaderPoints(300, 1).endsWith(`424,${LABEL_Y[1]}`)).toBe(true);
    expect(leaderPoints(120, 1).endsWith(`424,${LABEL_Y[1]}`)).toBe(true);
  });
});
