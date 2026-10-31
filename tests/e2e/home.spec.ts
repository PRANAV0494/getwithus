import { expect, test } from "./support/test";

test.describe("home", () => {
  test("renders the hero and mounts the 3D scene or its fallback", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // The scene mounts after first paint and idle: a canvas, or the static slab when WebGL is unavailable.
    await expect(page.locator("canvas, svg[data-fallback='slab']").first()).toBeAttached({
      timeout: 20_000,
    });
    // Give the scene a moment to compile and draw; console problems fail the test.
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(1500);
  });

  test("header links navigate", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await header.getByRole("link", { name: "Process" }).click();
    await expect(page).toHaveURL(/\/process$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.getByRole("banner").getByRole("link", { name: "Start a project" }).click();
    await expect(page).toHaveURL(/\/start$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("the services mega menu opens and closes with the keyboard", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Services" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const webLink = page.getByRole("link", { name: /Web development/ }).first();
    await expect(webLink).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Enter");
    await expect(webLink).toBeVisible();
    await webLink.click();
    await expect(page).toHaveURL(/\/services\/web-development$/);
  });
});
