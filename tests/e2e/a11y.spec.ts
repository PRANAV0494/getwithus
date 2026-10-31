import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./support/test";

const PAGES = ["/", "/contact", "/services/web-development", "/privacy", "/admin/login"];

for (const path of PAGES) {
  test(`axe finds no WCAG 2.2 AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map((violation) => ({
      rule: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target.join(" ")),
    }));
    expect(summary).toEqual([]);
  });
}
