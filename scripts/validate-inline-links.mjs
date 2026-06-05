/**
 * Build-time validator for in-body contextual links (runs in `prebuild`).
 *
 * Guarantees, so a bad link can never reach production or a visitor:
 *   1. Every `[anchor](/path)` token targets a CLEAN INTERNAL path (no external
 *      URLs, no whitespace) — shares isInternalLinkPath with the renderer.
 *   2. Every target RESOLVES to a real route (no broken internal links).
 *   3. No target is a 301 redirect `source` (no redirect-hop links — use the
 *      final URL).
 *   4. No malformed / partial token residue (`]` adjacent to `(` that is not a
 *      complete, valid token) survives — it would otherwise render as visible
 *      brackets to a visitor.
 *
 * Pure data-file text scan; no server or TS loader needed. Non-zero exit fails
 * the build with a readable report.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  findInlineLinkTokens,
  isInternalLinkPath,
} from "../src/lib/content/inline-links.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

/** Top-level `slug: "x",` lines only (anchored to line end). Nested
    relatedServices entries are `{ slug: "x", label: … }` on one line, so the
    end-anchor excludes them. */
const SLUG_LINE = /^\s*slug:\s*"([^"]+)",\s*$/gm;

function slugsFrom(rel) {
  const text = read(rel);
  const out = [];
  let m;
  while ((m = SLUG_LINE.exec(text)) !== null) out.push(m[1]);
  return out;
}

// ── Build the set of real, final routes ────────────────────────────────────
const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/practice-areas",
  "/expert-witness",
  "/articles",
  "/contact",
  "/legal",
  "/intake-notice",
];

const BOFU_CHILD_FILES = [
  "src/lib/content/bofu/business-disputes-children.ts",
  "src/lib/content/bofu/business-formation-children.ts",
  "src/lib/content/bofu/contract-services-children.ts",
  "src/lib/content/bofu/expert-witness-children.ts",
  "src/lib/content/bofu/real-estate-disputes-children.ts",
  "src/lib/content/bofu/real-estate-transactions-children.ts",
];

const validRoutes = new Set(STATIC_ROUTES);
for (const s of slugsFrom("src/lib/content/resources.ts"))
  validRoutes.add(`/articles/${s}`);
for (const s of slugsFrom("src/lib/content/practice-areas.ts"))
  validRoutes.add(`/practice-areas/${s}`);
for (const s of slugsFrom("src/lib/content/bofu-services.ts"))
  validRoutes.add(`/services/${s}`); // hubs
for (const f of BOFU_CHILD_FILES)
  for (const s of slugsFrom(f)) validRoutes.add(`/services/${s}`); // children

// ── Redirect sources (links must use the final URL, never a hop) ────────────
const redirectSources = new Set();
{
  const cfg = read("next.config.ts");
  const re = /source:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(cfg)) !== null) redirectSources.add(m[1]);
}

// ── Scan the content files that carry rich-text body prose ──────────────────
const CONTENT_FILES = [
  "src/lib/content/resources.ts",
  "src/lib/content/practice-areas.ts",
  "src/lib/content/bofu-services.ts",
  ...BOFU_CHILD_FILES,
];

const errors = [];
const anchorsByTarget = new Map(); // target -> Set<anchor> (variety report)
let tokenCount = 0;

for (const file of CONTENT_FILES) {
  const text = read(file);

  // 1–3: validate every well-formed token.
  for (const t of findInlineLinkTokens(text)) {
    tokenCount++;
    if (!isInternalLinkPath(t.href)) {
      errors.push(`${file}: ${t.raw} — target is not a clean internal path.`);
      continue;
    }
    // Strip query/hash before resolving against the route set.
    const path = t.href.replace(/[?#].*$/, "");
    if (redirectSources.has(path)) {
      errors.push(
        `${file}: ${t.raw} — target ${path} is a 301 redirect source; link the final URL instead.`,
      );
    } else if (!validRoutes.has(path)) {
      errors.push(
        `${file}: ${t.raw} — target ${path} does not resolve to a known route (broken link).`,
      );
    }
    if (!anchorsByTarget.has(t.href)) anchorsByTarget.set(t.href, new Set());
    anchorsByTarget.get(t.href).add(t.anchor);
  }

  // 4: residue net — any `]` adjacent to `(` that is NOT the seam of a valid
  // token is a malformed/partial link that would render as visible brackets.
  const validSeams = new Set(findInlineLinkTokens(text).map((t) => t.index));
  const seam = /\]\s*\(/g;
  let s;
  while ((s = seam.exec(text)) !== null) {
    // Find the start of the bracket group this seam closes.
    const open = text.lastIndexOf("[", s.index);
    if (open === -1 || !validSeams.has(open)) {
      const snippet = text.slice(Math.max(0, s.index - 30), s.index + 30);
      errors.push(
        `${file}: malformed inline-link token near "…${snippet.replace(/\n/g, " ")}…" (bracket/paren mismatch).`,
      );
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (errors.length > 0) {
  console.error("✗ Inline-link validation failed:\n");
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n${errors.length} problem(s). Build aborted.`);
  process.exit(1);
}

// Over-optimization guard (informational): flag exact-anchor reuse across the
// site, and targets that may be over-linked.
const repeatedAnchors = new Map(); // anchor -> count
for (const set of anchorsByTarget.values())
  for (const a of set) repeatedAnchors.set(a, (repeatedAnchors.get(a) ?? 0) + 1);

console.log(
  `✓ Inline-link validation passed: ${tokenCount} token(s) across ${CONTENT_FILES.length} files, all internal, resolving, no redirect hops.`,
);
const dupAnchors = [...repeatedAnchors.entries()].filter(([, n]) => n > 1);
if (dupAnchors.length > 0) {
  console.log(
    `  note: exact anchor text reused → ${dupAnchors
      .map(([a, n]) => `"${a}" ×${n}`)
      .join(", ")}`,
  );
}
