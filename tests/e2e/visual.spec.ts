import { expect, test } from "./support/test";

/*
 * The home hero at phone and desktop widths with the 3D layer off (`?no3d=1`,
 * honored only in builds made with NEXT_PUBLIC_TEST_HOOKS=1). Baselines are
 * per platform; see docs/handoff.md for how CI produces the Linux set.
 */
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];

for (const viewport of VIEWPORTS) {
  test(`home hero at ${viewport.width} px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/?no3d=1");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page).toHaveScreenshot(`home-hero-${viewport.width}.png`);
  });
}
