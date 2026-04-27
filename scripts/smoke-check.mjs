import assert from "node:assert/strict";

import { chromium } from "playwright";

const baseUrl = (process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

async function expectNoVisiblePlaceholder(page, pageName) {
  const bodyText = (await page.textContent("body")) ?? "";
  // Exclude intentional bracketed config stubs like "[Office phone placeholder]"
  const bodyWithoutBracketedStubs = bodyText.replace(/\[[^\]]*placeholder[^\]]*\]/gi, "");
  assert(
    !/\bplaceholder\b/i.test(bodyWithoutBracketedStubs),
    `${pageName} still contains visible placeholder language.`,
  );
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const unexpectedErrors = [];

  // Track 404 responses so we can filter expected ones (Vercel analytics etc.)
  page.on("response", (response) => {
    if (response.status() === 404) {
      const url = response.url();
      // Ignore 404s from Vercel analytics/speed-insights infrastructure
      // (they always 404 outside the Vercel edge environment).
      const isExpected =
        url.includes("/_vercel/") ||
        url.includes("vercel-scripts") ||
        url.includes("va.vercel-scripts") ||
        url.includes("speed-insights");
      if (!isExpected) {
        unexpectedErrors.push(`404: ${url}`);
      }
    }
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      // Console 404 messages lack the URL — we track those via response listener above.
      // Only catch non-resource JS errors here.
      const isResourceLoad = text.includes("Failed to load resource");
      if (!isResourceLoad) {
        unexpectedErrors.push(`console error: ${text}`);
      }
    }
  });

  try {
    // ── Homepage ────────────────────────────────────────────
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", {
        name: /A practical approach to business and real estate law/i,
      })
      .waitFor();
    await page
      .getByRole("banner")
      .getByRole("link", { name: /Schedule a Consultation/i })
      .first()
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Homepage");

    // ── Contact page ────────────────────────────────────────
    // V2 simplified intake: fields are Name, Email, Phone, plus optionals.
    // Submitting without the acknowledgment checkbox should surface the
    // banner-level required-field error.
    await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", { name: /Let's discuss your matter/i, level: 1 })
      .waitFor();
    await page.getByText(/Keep this high-level/i).waitFor();
    await page.getByRole("textbox", { name: /Full Name or Company Name/i }).fill("TEST - DO NOT CONTACT");
    await page.getByRole("textbox", { name: /Email Address/i }).fill("test@example.com");
    await page.getByRole("textbox", { name: "Phone" }).fill("6155550100");
    await page.getByRole("button", { name: /^Submit$/i }).click();
    // Acknowledgment is required and unchecked, so the error banner appears.
    await page
      .getByText(/Please confirm that you understand the intake acknowledgment/i)
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Contact page");

    // ── About page ──────────────────────────────────────────
    await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", {
        name: /Lawyer, broker, instructor/i,
        level: 1,
      })
      .waitFor();
    await expectNoVisiblePlaceholder(page, "About page");

    // ── Practice areas index ────────────────────────────────
    await page.goto(`${baseUrl}/practice-areas`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", { name: /Practice Areas/i, level: 1 })
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Practice areas page");

    // ── Practice area detail ────────────────────────────────
    await page.goto(`${baseUrl}/practice-areas/commercial-leasing`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: /Commercial Leasing/i, level: 1 }).waitFor();
    await expectNoVisiblePlaceholder(page, "Commercial leasing page");

    // ── Articles index ──────────────────────────────────────
    await page.goto(`${baseUrl}/articles`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", { name: /Notes from the practice/i, level: 1 })
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Articles page");

    // ── Article detail ──────────────────────────────────────
    await page.goto(
      `${baseUrl}/articles/when-a-broker-complaint-turns-into-a-records-problem`,
      { waitUntil: "networkidle" },
    );
    await page
      .getByRole("heading", { name: /When a Broker Complaint Turns Into a Records Problem/i })
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Article detail page");

    // ── Legal page (consolidated /legal replaces 4 prior pages) ─
    await page.goto(`${baseUrl}/legal`, { waitUntil: "networkidle" });
    await page
      .getByRole("heading", { level: 1, name: /Site terms, privacy/i })
      .waitFor();
    // Verify the 4 anchor sections all rendered
    await page
      .getByRole("heading", { level: 2, name: /Terms of Use/i })
      .waitFor();
    await page
      .getByRole("heading", { level: 2, name: /Privacy Policy/i })
      .waitFor();
    await expectNoVisiblePlaceholder(page, "Legal page");

    // Spot-check a 301 redirect from the old URL still lands somewhere valid
    const redirectResp = await page.goto(`${baseUrl}/website-disclaimer`, {
      waitUntil: "networkidle",
    });
    const finalUrl = page.url();
    if (!finalUrl.includes("/legal")) {
      throw new Error(
        `Expected /website-disclaimer to redirect to /legal, got ${finalUrl}`
      );
    }
    if (redirectResp && redirectResp.status() >= 400) {
      throw new Error(
        `Redirect target /legal returned ${redirectResp.status()}`
      );
    }

    // ── Unexpected errors ────────────────────────────────────
    assert.equal(
      unexpectedErrors.length,
      0,
      `Unexpected errors detected:\n${unexpectedErrors.join("\n")}`,
    );

    console.log(`✓ Smoke check passed for ${baseUrl}`);
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
