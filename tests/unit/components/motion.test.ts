import { describe, expect, it } from "vitest";
import { isEmail } from "@/components/cta/TerminalCta";
import { scrambleFrame } from "@/components/motion/ScrambleText";

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
