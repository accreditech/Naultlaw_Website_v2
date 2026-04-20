import assert from "node:assert/strict";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const baseUrl = (
  process.env.QA_BASE_URL ??
  process.env.SMOKE_BASE_URL ??
  "http://127.0.0.1:3000"
).replace(/\/$/, "");

const responsiveTargets = [
  "/",
  "/contact",
  "/about",
  "/practice-areas",
  "/practice-areas/commercial-leasing",
  "/articles",
  "/articles/when-a-broker-complaint-turns-into-a-records-problem",
];

const accessibilityTargets = [
  "/",
  "/contact",
  "/about",
  "/practice-areas/commercial-leasing",
];

function formatViolations(path, violations) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => node.target.join(" "))
        .slice(0, 5)
        .join(" | ");
      return `- ${path}: [${violation.id}] ${violation.help}\n  ${nodes}`;
    })
    .join("\n");
}

async function expectNoHorizontalOverflow(page, path, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });

  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  assert(
    metrics.docScrollWidth <= metrics.innerWidth + 1,
    `${path} overflows horizontally at ${width}px (docScrollWidth ${metrics.docScrollWidth} > innerWidth ${metrics.innerWidth}).`
  );
  assert(
    metrics.bodyScrollWidth <= metrics.innerWidth + 1,
    `${path} body overflows horizontally at ${width}px (bodyScrollWidth ${metrics.bodyScrollWidth} > innerWidth ${metrics.innerWidth}).`
  );
}

async function runAccessibilityAudit(page, path) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  assert.equal(
    results.violations.length,
    0,
    `Accessibility violations found:\n${formatViolations(path, results.violations)}`
  );
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("response", (response) => {
    if (response.status() === 404) {
      const url = response.url();
      const isExpected =
        url.includes("/_vercel/") ||
        url.includes("vercel-scripts") ||
        url.includes("va.vercel-scripts") ||
        url.includes("speed-insights");
      if (!isExpected) {
        consoleErrors.push(`404: ${url}`);
      }
    }
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      const isResourceLoad = text.includes("Failed to load resource");
      if (!isResourceLoad) {
        consoleErrors.push(`console error: ${text}`);
      }
    }
  });

  try {
    // ── Responsive overflow checks ──────────────────────────────
    for (const target of responsiveTargets) {
      await expectNoHorizontalOverflow(page, target, 390, 844);
      await expectNoHorizontalOverflow(page, target, 768, 1024);
      await expectNoHorizontalOverflow(page, target, 1280, 1200);
    }

    // ── Skip nav link ────────────────────────────────────────────
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    await page.getByRole("link", { name: /skip to main content/i }).waitFor();

    // ── Mobile menu ──────────────────────────────────────────────
    // { force: true } bypasses Playwright's coordinate-based overlap check.
    // The sticky header has z-40 and the button is unblocked in real browsers;
    // the headless renderer's pointer-events check incorrectly flags the hero image.
    await page.getByRole("button", { name: /open menu/i }).click({ force: true });
    await page.getByRole("navigation", { name: /mobile navigation/i }).waitFor();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: /open menu/i }).waitFor();

    // ── Contact form validation ──────────────────────────────────
    await page.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded" });
    await page.getByRole("textbox", { name: /full name/i }).fill("QA Prospect");
    await page.getByRole("textbox", { name: /email/i }).fill("qa@example.com");
    await page.getByRole("textbox", { name: /phone/i }).fill("615-555-0100");
    await page.getByRole("textbox", { name: /opposing party or parties/i }).fill(
      "Example Counterparty LLC"
    );
    await page.getByRole("button", { name: /submit consultation request/i }).click();
    await page
      .getByText(/please confirm that you understand the intake acknowledgment/i)
      .waitFor();
    const acknowledgmentInvalid = await page
      .locator("#acknowledgment")
      .getAttribute("aria-invalid");
    assert.equal(
      acknowledgmentInvalid,
      "true",
      "Acknowledgment checkbox should be marked invalid after empty submission."
    );

    // ── Accessibility audits ─────────────────────────────────────
    for (const target of accessibilityTargets) {
      await runAccessibilityAudit(page, target);
    }

    // ── Console errors ────────────────────────────────────────────
    assert.equal(
      consoleErrors.length,
      0,
      `Browser console errors detected:\n${consoleErrors.join("\n")}`
    );

    console.log(`✓ QA check passed for ${baseUrl}`);
  } finally {
    await context.close();
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
