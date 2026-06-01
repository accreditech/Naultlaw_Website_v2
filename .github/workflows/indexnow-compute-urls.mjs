#!/usr/bin/env node
// Map the files changed in the current commit range to a list of
// production URLs (https://naultlaw.com/...). Writes two outputs for
// the GitHub Actions step that calls this:
//   url_count = "<n>"
//   url_json  = '{"urls":["https://naultlaw.com/...", ...]}'
//
// "URL-affecting" is conservative: ANY edit to a route page.tsx, layout,
// shared content file, or sitemap source counts. Pure docs / scripts /
// tests don't. The trade-off favors over-trigger (re-submit a URL whose
// content didn't change) over under-trigger (miss a URL that did). Bing
// IndexNow is happy with repeat submissions of the same URL.

import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

const SITE_BASE = "https://naultlaw.com";

const beforeSha = (process.env.BEFORE_SHA ?? "").trim();
const afterSha = (process.env.AFTER_SHA ?? "").trim();

function setOutput(name, value) {
  const outFile = process.env.GITHUB_OUTPUT;
  if (!outFile) {
    console.log(`(local) ${name}=${value}`);
    return;
  }
  // Multiline-safe heredoc form for the JSON payload.
  if (value.includes("\n")) {
    const delim = `EOF_${Date.now()}`;
    appendFileSync(outFile, `${name}<<${delim}\n${value}\n${delim}\n`);
  } else {
    appendFileSync(outFile, `${name}=${value}\n`);
  }
}

function emit(urls) {
  const sorted = [...new Set(urls)].sort();
  setOutput("url_count", String(sorted.length));
  setOutput("url_json", JSON.stringify({ urls: sorted }));
  if (sorted.length === 0) {
    console.log("No URL-affecting files changed in this commit range.");
  } else {
    console.log(`Resolved ${sorted.length} URL(s):`);
    for (const u of sorted) console.log(`  ${u}`);
  }
}

function gitDiffNames() {
  // ZEROES = first push / new branch — github.event.before is all-zeros.
  const ZEROES = "0000000000000000000000000000000000000000";
  if (!beforeSha || beforeSha === ZEROES) {
    console.log(
      "No usable parent SHA (first push or force-push). Submitting empty list; the weekly Vercel Cron will resubmit the full sitemap.",
    );
    return [];
  }
  try {
    const out = execFileSync(
      "git",
      ["diff", "--name-only", `${beforeSha}..${afterSha}`],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return out.split("\n").map((l) => l.trim()).filter(Boolean);
  } catch (err) {
    console.warn(
      `git diff failed (${err instanceof Error ? err.message : err}); submitting empty list.`,
    );
    return [];
  }
}

function loadSlugsFrom(filePath, exportName) {
  // Cheap line-scan for `slug: "..."` inside the export. We don't need
  // a full TS parser — the slug field is always written on its own line
  // in the content arrays. False positives are harmless (we'd submit a
  // URL that exists; IndexNow doesn't care). False negatives only happen
  // if a slug ever moves onto a multi-line construct — fix that here
  // when it happens.
  void exportName; // (single-export files; arg kept for future use)
  const text = readFileSync(filePath, "utf8");
  const slugs = [];
  for (const line of text.split("\n")) {
    const m = /^\s*slug:\s*["']([^"']+)["']/.exec(line);
    if (m) slugs.push(m[1]);
  }
  return slugs;
}

const all = new Set();

function add(url) {
  all.add(url);
}
function addAll(urls) {
  for (const u of urls) all.add(u);
}

const changed = gitDiffNames();

// ---------------------------------------------------------------------
// File → URL mapping. Keep in sync with src/lib/sitemap-data.ts. When
// a new sitemap branch is added there, add it here too — there is no
// automated cross-check.
// ---------------------------------------------------------------------

// Static routes — page edit = re-submit that URL.
const STATIC = {
  "src/app/page.tsx": `${SITE_BASE}/`,
  "src/app/about/page.tsx": `${SITE_BASE}/about`,
  "src/app/articles/page.tsx": `${SITE_BASE}/articles`,
  "src/app/contact/page.tsx": `${SITE_BASE}/contact`,
  "src/app/expert-witness/page.tsx": `${SITE_BASE}/expert-witness`,
  "src/app/practice-areas/page.tsx": `${SITE_BASE}/practice-areas`,
  "src/app/services/page.tsx": `${SITE_BASE}/services`,
};

// Shared site-wide files. A change here affects every page; we treat it
// as "submit the full sitemap" by adding every entry.
const SHARED_WHOLE_SITE = new Set([
  "src/app/layout.tsx",
  "src/app/globals.css",
  "src/lib/site-config.ts",
  "src/lib/content/attorney.ts",
  "src/components/global-header.tsx",
  "src/components/global-footer.tsx",
  "src/app/sitemap.ts",
  "src/lib/sitemap-data.ts",
  "src/lib/generated/content-mtimes.json",
]);

function expandFullSitemap() {
  // Pull the same URL list the sitemap+API use by reading the manifest +
  // walking the content files. To keep this script dependency-free we
  // reuse the three content files via plain text-scan + the static set.
  for (const url of Object.values(STATIC)) add(url);
  // /practice-areas/<slug>
  for (const slug of loadSlugsFrom(
    "src/lib/content/practice-areas.ts",
    "practiceAreas",
  )) {
    add(`${SITE_BASE}/practice-areas/${slug}`);
  }
  // /services/<hub> AND /services/<service>. Both live as `slug: "..."`
  // entries in bofu-services.ts (the hubs are inline at the top of the
  // file; the services come from the per-hub children imports).
  const hubSlugs = loadSlugsFrom(
    "src/lib/content/bofu-services.ts",
    "bofuHubs",
  );
  for (const slug of hubSlugs) add(`${SITE_BASE}/services/${slug}`);
  const bofuChildrenFiles = [
    "src/lib/content/bofu/business-disputes-children.ts",
    "src/lib/content/bofu/business-formation-children.ts",
    "src/lib/content/bofu/contract-services-children.ts",
    "src/lib/content/bofu/expert-witness-children.ts",
    "src/lib/content/bofu/real-estate-disputes-children.ts",
    "src/lib/content/bofu/real-estate-transactions-children.ts",
  ];
  for (const f of bofuChildrenFiles) {
    for (const slug of loadSlugsFrom(f, "")) {
      add(`${SITE_BASE}/services/${slug}`);
    }
  }
  // /articles/<slug>
  for (const slug of loadSlugsFrom("src/lib/content/resources.ts", "resources")) {
    add(`${SITE_BASE}/articles/${slug}`);
  }
}

for (const path of changed) {
  // Static route
  if (path in STATIC) {
    add(STATIC[path]);
    continue;
  }
  // Shared file → full sitemap
  if (SHARED_WHOLE_SITE.has(path)) {
    expandFullSitemap();
    continue;
  }
  // /articles/<slug> — content file edit submits every article URL
  if (path === "src/lib/content/resources.ts" || path === "src/app/articles/[slug]/page.tsx") {
    for (const slug of loadSlugsFrom("src/lib/content/resources.ts", "resources")) {
      add(`${SITE_BASE}/articles/${slug}`);
    }
    continue;
  }
  // /practice-areas/<slug>
  if (
    path === "src/lib/content/practice-areas.ts" ||
    path === "src/app/practice-areas/[slug]/page.tsx"
  ) {
    for (const slug of loadSlugsFrom(
      "src/lib/content/practice-areas.ts",
      "practiceAreas",
    )) {
      add(`${SITE_BASE}/practice-areas/${slug}`);
    }
    continue;
  }
  // /services/<slug> — bofu changes
  if (
    path === "src/lib/content/bofu-services.ts" ||
    path === "src/app/services/[slug]/page.tsx" ||
    /^src\/lib\/content\/bofu\/.*-children\.ts$/.test(path)
  ) {
    // hubs from bofu-services.ts
    for (const slug of loadSlugsFrom(
      "src/lib/content/bofu-services.ts",
      "bofuHubs",
    )) {
      add(`${SITE_BASE}/services/${slug}`);
    }
    // children
    const childFiles = [
      "src/lib/content/bofu/business-disputes-children.ts",
      "src/lib/content/bofu/business-formation-children.ts",
      "src/lib/content/bofu/contract-services-children.ts",
      "src/lib/content/bofu/expert-witness-children.ts",
      "src/lib/content/bofu/real-estate-disputes-children.ts",
      "src/lib/content/bofu/real-estate-transactions-children.ts",
    ];
    for (const f of childFiles) {
      for (const slug of loadSlugsFrom(f, "")) {
        add(`${SITE_BASE}/services/${slug}`);
      }
    }
    continue;
  }
  // Anything else (docs, scripts, tests, .github, etc.) — no submission.
}

emit([...all]);
