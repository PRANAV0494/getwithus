import { expect, test } from "./support/test";

/*
 * The home hero at phone and desktop widths. Playwright disables CSS animations
 * for the capture, and the circuit's SVG animations (its packets) are paused at
 * their start, so the shot is stable. Baselines are per platform; see
 * docs/handoff.md for how CI produces the Linux set.
 */
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];

for (const viewport of VIEWPORTS) {
  test(`home hero at ${viewport.width} px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      for (const svg of document.querySelectorAll("svg")) {
        svg.pauseAnimations();
        svg.setCurrentTime(0);
      }
    });
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page).toHaveScreenshot(`home-hero-${viewport.width}.png`);
  });
}
