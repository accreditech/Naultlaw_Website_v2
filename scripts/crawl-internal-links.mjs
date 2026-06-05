/**
 * Internal-link crawler for pre-merge validation (not wired into build).
 *
 *  - BFS from "/" following only same-origin <a href> links found in rendered
 *    HTML (the visible link graph), recording click-depth from the homepage.
 *  - Flags any internal link that does not return 200, and any that returns a
 *    3xx (a redirect hop — links should point at the final URL).
 *  - Flags rendered `](`/stray inline-link bracket residue in page HTML.
 *  - Confirms a supplied list of "must-reach within N clicks" routes is covered.
 *
 * Usage: node scripts/crawl-internal-links.mjs [baseUrl]
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const SLUG_LINE = /^\s*slug:\s*"([^"]+)",\s*$/gm;
function slugsFrom(rel) {
  const out = [];
  let m;
  const text = read(rel);
  while ((m = SLUG_LINE.exec(text)) !== null) out.push(m[1]);
  return out;
}

// Every content route that must be reachable (orphan/depth check target set).
const mustReach = new Set([
  "/",
  "/about",
  "/services",
  "/practice-areas",
  "/expert-witness",
  "/articles",
  "/contact",
]);
for (const s of slugsFrom("src/lib/content/resources.ts"))
  mustReach.add(`/articles/${s}`);
for (const s of slugsFrom("src/lib/content/practice-areas.ts"))
  mustReach.add(`/practice-areas/${s}`);
for (const s of slugsFrom("src/lib/content/bofu-services.ts"))
  mustReach.add(`/services/${s}`);
for (const f of [
  "src/lib/content/bofu/business-disputes-children.ts",
  "src/lib/content/bofu/business-formation-children.ts",
  "src/lib/content/bofu/contract-services-children.ts",
  "src/lib/content/bofu/expert-witness-children.ts",
  "src/lib/content/bofu/real-estate-disputes-children.ts",
  "src/lib/content/bofu/real-estate-transactions-children.ts",
])
  for (const s of slugsFrom(f)) mustReach.add(`/services/${s}`);

const MAX_DEPTH = 3;
const depth = new Map([["/", 0]]);
const queue = [["/", 0]];
const status = new Map(); // path -> http status
const redirects = []; // { from, to, status }
const bracketResidue = []; // paths whose HTML shows stray inline-link tokens
const linkSources = new Map(); // path -> first page it was linked from

function normalize(href) {
  if (!href) return null;
  if (href.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    if (!href.startsWith(BASE)) return null; // external
    href = href.slice(BASE.length) || "/";
  }
  if (!href.startsWith("/")) return null;
  if (href.startsWith("//")) return null;
  return href.replace(/[?#].*$/, "").replace(/\/$/, "") || "/";
}

async function run() {
  while (queue.length) {
    const [path, d] = queue.shift();
    if (status.has(path)) continue;

    const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
    status.set(path, res.status);

    if (res.status >= 300 && res.status < 400) {
      redirects.push({ from: path, to: res.headers.get("location"), status: res.status });
      continue; // don't crawl through a redirect
    }
    if (res.status !== 200) continue;

    const html = await res.text();

    // Rendered bracket-residue guard: a `](` in visible HTML means an inline
    // link token failed to parse. (Excludes nothing — our tokens never reach
    // HTML as text when parsed correctly.)
    if (/\]\s*\(\s*\//.test(html)) bracketResidue.push(path);

    if (d >= MAX_DEPTH) continue;
    const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => m[1]);
    for (const raw of hrefs) {
      const next = normalize(raw);
      if (!next) continue;
      if (!linkSources.has(next)) linkSources.set(next, path);
      if (!depth.has(next) || depth.get(next) > d + 1) depth.set(next, d + 1);
      if (!status.has(next)) queue.push([next, d + 1]);
    }
  }

  // ── Report ────────────────────────────────────────────────────────────────
  const broken = [...status.entries()].filter(
    ([, s]) => s !== 200 && !(s >= 300 && s < 400),
  );
  const unreached = [...mustReach].filter((p) => !depth.has(p));
  const tooDeep = [...mustReach].filter(
    (p) => depth.has(p) && depth.get(p) > MAX_DEPTH,
  );

  console.log(`Crawled ${status.size} URLs from ${BASE}`);
  console.log(`  200 OK:        ${[...status.values()].filter((s) => s === 200).length}`);
  console.log(`  redirects:     ${redirects.length}`);
  console.log(`  broken:        ${broken.length}`);
  console.log(`  must-reach:    ${mustReach.size} routes; unreached ${unreached.length}, too deep (>${MAX_DEPTH}) ${tooDeep.length}`);

  let failed = false;
  if (broken.length) {
    failed = true;
    console.error("\n✗ Broken internal links:");
    for (const [p, s] of broken) console.error(`  - ${p} → ${s} (linked from ${linkSources.get(p) ?? "seed"})`);
  }
  if (redirects.length) {
    failed = true;
    console.error("\n✗ Internal links that hop through a redirect (use the final URL):");
    for (const r of redirects) console.error(`  - ${r.from} → ${r.status} → ${r.to} (linked from ${linkSources.get(r.from) ?? "seed"})`);
  }
  if (bracketResidue.length) {
    failed = true;
    console.error("\n✗ Pages with unparsed inline-link bracket residue in HTML:");
    for (const p of bracketResidue) console.error(`  - ${p}`);
  }
  if (unreached.length) {
    failed = true;
    console.error(`\n✗ Orphaned (unreachable within ${MAX_DEPTH} clicks):`);
    for (const p of unreached) console.error(`  - ${p}`);
  }
  if (tooDeep.length) {
    failed = true;
    console.error(`\n✗ Reachable but deeper than ${MAX_DEPTH} clicks:`);
    for (const p of tooDeep) console.error(`  - ${p} (depth ${depth.get(p)})`);
  }

  if (failed) {
    console.error("\nCrawl validation FAILED.");
    process.exit(1);
  }
  console.log("\n✓ Crawl validation passed: no broken links, no redirect hops, no bracket residue, every content route within 3 clicks.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
