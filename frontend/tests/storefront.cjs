const { spawn } = require("child_process");
const { chromium } = require("playwright");
const assert = require("assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const cwd = path.resolve(__dirname, "..");
const screenshots = path.join(cwd, "test-results");
fs.mkdirSync(screenshots, { recursive: true });
const server = spawn(
  process.execPath,
  [
    cwd + "/node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3100",
  ],
  { cwd, stdio: ["ignore", "pipe", "pipe"] },
);
(async () => {
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (d) => {
      if (d.toString().includes("Ready")) resolve();
    });
    server.on("error", reject);
    server.on("exit", (code) => reject(new Error("Server exited " + code)));
  });
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:3100/home");
    await page
      .locator("img")
      .evaluateAll((images) =>
        Promise.all(images.map((img) => img.decode().catch(() => {}))),
      );
    await page.screenshot({
      path: path.join(screenshots, "home-desktop.png"),
      fullPage: true,
      animations: "disabled",
    });
    for (const width of [375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "home",
        "products",
        "products/black-tiger-prawns",
        "cart",
        "checkout",
        "login",
        "register",
        "our-story",
        "certifications",
        "sustainability",
        "account",
        "account/orders",
        "checkout/confirmation",
        "cook",
        "faq",
        "shipping",
        "contact",
      ]) {
        const response = await page.goto("http://127.0.0.1:3100/" + route);
        assert.equal(response.status(), 200, route);
        const sizes = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          width: innerWidth,
        }));
        assert.ok(
          sizes.scroll <= sizes.width + 1,
          `${route} overflow at ${width}: ${sizes.scroll}`,
        );
        if (
          width === 390 &&
          [
            "home",
            "products/black-tiger-prawns",
            "login",
            "faq",
            "shipping",
            "contact",
            "cook",
          ].includes(route)
        ) {
          await page
            .locator("img")
            .evaluateAll((images) =>
              Promise.all(images.map((img) => img.decode().catch(() => {}))),
            );
          await page.screenshot({
            path: path.join(
              screenshots,
              route.replaceAll("/", "-") + "-mobile.png",
            ),
            fullPage: true,
            animations: "disabled",
          });
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://127.0.0.1:3100/products");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    assert.ok(
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .isVisible(),
    );
    await page.getByRole("button", { name: "Close menu", exact: true }).click();
    await page
      .getByRole("button", { name: "Trial Packs", exact: true })
      .click();
    assert.equal(await page.locator(".product-card").count(), 2);
    await page.getByRole("button", { name: "All prawns", exact: true }).click();
    await page.getByLabel("Search prawns").fill("flagship");
    assert.equal(await page.locator(".product-card").count(), 1);
    await page.locator(".product-card").click();
    await page.getByRole("button", { name: /Add to bag/ }).click();
    await page
      .getByRole("button", { name: "500g ₹1,200", exact: true })
      .click();
    await page.getByRole("button", { name: /Add to bag/ }).click();
    await page.getByRole("link", { name: "View bag & checkout →" }).click();
    await page.locator(".bag-item").first().waitFor();
    assert.equal(await page.locator(".bag-item").count(), 2);
    await page.reload();
    await page.locator(".bag-item").first().waitFor();
    assert.equal(await page.locator(".bag-item").count(), 2);
    await page
      .locator("img")
      .evaluateAll((images) =>
        Promise.all(images.map((img) => img.decode().catch(() => {}))),
      );
    await page.screenshot({
      path: path.join(screenshots, "bag-mobile.png"),
      fullPage: true,
      animations: "disabled",
    });
    await page.getByRole("link", { name: "Continue to delivery →" }).click();
    for (const [label, value] of [
      ["Full name", "Test Customer"],
      ["Email address", "test@example.com"],
      ["Mobile number", "9876543210"],
      ["Address", "123 Test Street"],
      ["City", "Kolkata"],
      ["State", "West Bengal"],
      ["PIN code", "700001"],
    ])
      await page
        .locator(".delivery-fields")
        .getByLabel(label, { exact: true })
        .fill(value);
    await page.getByRole("button", { name: "Review order →" }).click();
    await page
      .getByRole("heading", { name: "A good meal starts here." })
      .waitFor();
    assert.equal(await page.locator('input[name="cardNumber"]').count(), 0);
    await page
      .locator("img")
      .evaluateAll((images) =>
        Promise.all(images.map((img) => img.decode().catch(() => {}))),
      );
    await page.screenshot({
      path: path.join(screenshots, "review-mobile.png"),
      fullPage: true,
      animations: "disabled",
    });
    await page.goto("http://127.0.0.1:3100/products/does-not-exist");
    assert.ok(
      await page
        .getByRole("heading", { name: "This selection isn’t available." })
        .isVisible(),
    );
    await page.goto("http://127.0.0.1:3100/login?next=%2Fcheckout");
    await page
      .getByRole("link", { name: "Create an account", exact: true })
      .click();
    await page.waitForURL("**/register?next=%2Fcheckout");
    await page.goto("http://127.0.0.1:3100/faq");
    await page
      .locator("summary")
      .filter({ hasText: "Can I choose the pack size?" })
      .click();
    assert.ok(
      await page
        .getByText("Yes. Choose one of the available weights", { exact: false })
        .isVisible(),
    );
    await page.goto("http://127.0.0.1:3100/contact");
    await page
      .locator(".contact-form")
      .getByLabel("Your name")
      .fill("Test Customer");
    await page
      .locator(".contact-form")
      .getByLabel("Email address")
      .fill("test@example.com");
    await page
      .getByLabel("Your message")
      .fill("This is a browser test enquiry.");
    // Mock transport responses: never send a real enquiry or subscribe an address.
    await page.route("**/api/support", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          error:
            "Our enquiry form is temporarily unavailable. Please try again later.",
        }),
      }),
    );
    await page.getByRole("button", { name: "Send enquiry →" }).click();
    await page.getByRole("alert").waitFor();
    assert.equal(
      await page
        .locator(".contact-form")
        .getByLabel("Email address")
        .inputValue(),
      "test@example.com",
    );
    await page.unroute("**/api/support");
    await page.route("**/api/support", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message:
            "Your signup request has been sent. Look out for a subscription confirmation.",
        }),
      }),
    );
    await page
      .locator(".newsletter-form")
      .getByLabel("Email address", { exact: true })
      .fill("test@example.com");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Join →" }).click();
    await page
      .getByText("Your signup request has been sent.", { exact: false })
      .waitFor();
    await page.goto("http://127.0.0.1:3100/cook");
    await page.locator('select[name="cuisine"]').selectOption("Thai");
    await page.getByLabel("Ingredients to avoid").fill("Peanuts");
    assert.ok(
      await page
        .getByRole("link", { name: "Sign in to create a recipe →" })
        .isVisible(),
    );
    assert.equal(await page.locator(".install-app").count(), 0);
    const manifest = await (
      await page.request.get("http://127.0.0.1:3100/manifest.webmanifest")
    ).json();
    assert.equal(manifest.display, "standalone");
    assert.ok(manifest.icons.some((icon) => icon.purpose === "maskable"));
    for (const icon of manifest.icons)
      assert.equal(
        (await page.request.get("http://127.0.0.1:3100" + icon.src)).status(),
        200,
      );
    const android = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/131 Mobile Safari/537.36",
      viewport: { width: 390, height: 844 },
    });
    const phone = await android.newPage();
    await phone.goto("http://127.0.0.1:3100/home");
    await phone.getByRole("button", { name: "Open menu", exact: true }).click();
    await phone.evaluate(() => {
      const event = new Event("beforeinstallprompt", { cancelable: true });
      event.prompt = async () => {};
      event.userChoice = Promise.resolve({ outcome: "accepted" });
      window.dispatchEvent(event);
    });
    await phone
      .getByRole("button", { name: "↓ Install Wave of Bengal" })
      .click();
    assert.equal(await phone.locator(".install-app").count(), 0);
    await android.close();
    assert.deepEqual(errors, []);
    console.log(
      "PASS: 85 responsive route checks (375–1440px), mobile menu, filters/search, pack variants, persisted bag, delivery review, invalid product, auth return URL; no page errors.",
    );
  } finally {
    await browser.close();
  }
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => server.kill());
