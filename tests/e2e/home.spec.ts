import { expect, test } from "./support/test";

test.describe("home", () => {
  test("renders the hero and the service diagram", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("fig. 01 / what we build around your business")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "What we do" })).toBeAttached();
  });

  test("the services stack follows the card nearest the reading line", async ({ page }) => {
    await page.goto("/");
    const stack = page.getByRole("img", { name: /Isometric stack of 5 service layers/ });
    const plates = stack.locator("[data-layer]");
    await expect(plates).toHaveCount(5);
    const cards = page.locator("#service-lines [data-service-card]");
    await expect(cards).toHaveCount(5);

    await cards.nth(2).evaluate((card) => {
      const rect = card.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top - window.innerHeight * 0.3);
    });
    await expect(cards.nth(2)).toHaveAttribute("data-active", "");
    await expect(plates.nth(2)).toHaveAttribute("data-state", "active");
    await expect(plates.nth(1)).toHaveAttribute("data-state", "done");
    await expect(plates.nth(3)).toHaveAttribute("data-state", "ghost");
    await expect(page.getByText("fig. 02 /")).toContainText("Agentic automation");

    // The WhatsApp demo in that card starts playing once it is in view.
    await expect(page.getByText("Hi! Can I book a haircut this Saturday?")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator("canvas")).toHaveCount(0);
  });

  test("the terminal takes a brief: chips, email check, and confirmation", async ({ page }) => {
    await page.goto("/");
    await page.locator("#closing-cta-title").scrollIntoViewIfNeeded();
    const website = page.getByRole("button", { name: "Website" });
    await expect(website).toBeVisible({ timeout: 10_000 });
    await website.click();
    await expect(website).toHaveAttribute("aria-pressed", "true");
    const budget = page.getByRole("button", { name: "$15k+" });
    await expect(budget).toBeVisible();
    await budget.click();
    const email = page.getByLabel("Email address");
    await expect(email).toBeVisible();

    await email.fill("not-an-email");
    await page.getByRole("button", { name: "Send brief" }).click();
    // Each finished line is in the DOM twice: typed (hidden from screen readers) and announced.
    await expect(
      page.getByText("enter an email address like name@company.com").first(),
    ).toBeVisible();

    await email.fill("name@company.com");
    await page.getByRole("button", { name: "Send brief" }).click();
    await expect(page.getByText("brief sent: Website · $15k+").first()).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByRole("button", { name: "start again" })).toBeVisible();
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
