import { expect, test } from "./support/test";

test.describe("home", () => {
  test("renders the hero and the service diagram, with no 3D scene", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("fig. 01 / what we build around your business")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "What we do" })).toBeAttached();
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(1500);
    await expect(page.locator("canvas")).toHaveCount(0);
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

test("the phone menu returns focus to the Menu button when dismissed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("a service page mounts its station panel or the static fallback", async ({ page }) => {
  await page.goto("/services/web-development");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // The panel mounts after the page settles: a canvas, or the slab outline when WebGL is unavailable.
  await expect(page.locator("canvas, svg[data-fallback='slab']").first()).toBeAttached({
    timeout: 20_000,
  });
  // Give the scene a moment to compile and draw; console problems fail the test.
  await page.waitForTimeout(1500);
});
