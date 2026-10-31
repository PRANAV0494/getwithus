import { expect, test } from "./support/test";

test.describe("home", () => {
  test("renders the hero and the service diagram", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("fig. 01 / what we build around your business")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "What we do" })).toBeAttached();
  });

  test("the services blueprint assembles one slab per card, with no 3D on the page", async ({
    page,
  }) => {
    await page.goto("/");
    const figure = page.locator("#service-blueprint");
    const slabs = figure.locator("[data-layer]");
    await expect(slabs).toHaveCount(4);
    await expect(slabs.first()).toHaveAttribute("data-state", "waiting");
    const cards = page.locator("#service-lines > li");

    await cards.nth(1).evaluate((card) => card.scrollIntoView({ block: "start" }));
    await expect(figure).toContainText("fig. 02 / App development");
    await expect(slabs.nth(0)).toHaveAttribute("data-state", "docked");
    await expect(slabs.nth(1)).toHaveAttribute("data-state", "docked");
    await expect(slabs.nth(3)).toHaveAttribute("data-state", "waiting");
    await expect(cards.nth(1)).toHaveAttribute("data-active", "");
    await expect(figure).not.toHaveAttribute("data-complete");

    await cards.nth(3).evaluate((card) => card.scrollIntoView({ block: "start" }));
    await expect(figure).toContainText("fig. 02 / Digital marketing");
    await expect(slabs.nth(3)).toHaveAttribute("data-state", "docked");
    await expect(figure).toHaveAttribute("data-complete", "");
    await expect(cards.nth(1)).not.toHaveAttribute("data-active");

    // Scrolling back takes the slabs apart again.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(slabs.first()).toHaveAttribute("data-state", "waiting");
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
