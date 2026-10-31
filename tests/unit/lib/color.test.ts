import { describe, expect, it } from "vitest";
import { concepts } from "@/content/design-lab/concepts";
import { contrastLevel, contrastRatio, luminance } from "@/lib/color";

describe("contrastRatio", () => {
  it("matches the WCAG reference values", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#FFFFFF")).toBeCloseTo(4.48, 2);
    expect(contrastRatio("#000000", "#000000")).toBe(1);
  });

  it("does not depend on argument order", () => {
    expect(contrastRatio("#1E4FD8", "#FFFFFF")).toBe(contrastRatio("#FFFFFF", "#1E4FD8"));
  });

  it("rejects anything but #RRGGBB", () => {
    expect(() => luminance("blue")).toThrow();
  });
});

describe("contrastLevel", () => {
  it("applies the normal and large text thresholds", () => {
    expect(contrastLevel(7.1)).toBe("AAA");
    expect(contrastLevel(4.6)).toBe("AA");
    expect(contrastLevel(3.2)).toBe("Fail");
    expect(contrastLevel(3.2, true)).toBe("AA");
  });
});

describe("design-lab palettes", () => {
  it("keep every declared text pairing at WCAG AA or better", () => {
    for (const concept of concepts) {
      for (const pair of concept.contrast) {
        const ratio = contrastRatio(pair.fg, pair.bg);
        expect(
          contrastLevel(ratio, pair.large),
          `${concept.name}: ${pair.label} (${ratio.toFixed(2)})`,
        ).not.toBe("Fail");
      }
    }
  });
});
