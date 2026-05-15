#!/usr/bin/env node
/**
 * Counts unique-body words per BOFU page (hubs + services).
 * Excludes h2 labels (often repeated across pages) and metadata fields.
 * Counts: intro + section.paragraphs[].
 * Output: CSV with slug,kind,wordCount.
 */
import { readFileSync, writeFileSync } from "node:fs";

const files = [
  "src/lib/content/bofu/expert-witness-children.ts",
  "src/lib/content/bofu/business-formation-children.ts",
  "src/lib/content/bofu/contract-services-children.ts",
  "src/lib/content/bofu/real-estate-transactions-children.ts",
  "src/lib/content/bofu/real-estate-disputes-children.ts",
  "src/lib/content/bofu/business-disputes-children.ts",
];

const HUB_FILE = "src/lib/content/bofu-services.ts";

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Naive TS literal parser — pulls out string-literal contents.
// Strategy: capture each top-level object { ... slug: "...", ... sections: [ ... ] }
// in the children arrays and the bofuHubs array, then sum:
//   - intro string
//   - every paragraphs[] entry in sections
// For hubs, sum: intro + whatThisCovers + whenToCall.
function parseChildrenFile(src) {
  // Find each top-level object block in `export const ... = [ ... ]`.
  // Use a depth-tracking scan to extract individual `{ ... }` blocks.
  const items = [];
  let depth = 0;
  let start = -1;
  let inString = null; // single or double quote char
  let escape = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (ch === "\\") { escape = true; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'") { inString = ch; continue; }
    if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        items.push(src.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return items;
}

function extractField(obj, name) {
  // Match: name: "..." OR name: `...` allowing escapes and concatenation. Single string only.
  const re = new RegExp(`\\b${name}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
  const m = re.exec(obj);
  if (m) return JSON.parse(`"${m[1]}"`);
  return null;
}

function extractIntro(obj) {
  return extractField(obj, "intro");
}

function extractSlug(obj) {
  return extractField(obj, "slug");
}

function extractHubSlug(obj) {
  return extractField(obj, "slug");
}

function extractParagraphs(obj) {
  // Find paragraphs: [ "...", "..." ] occurrences and collect strings.
  // Simple state machine.
  const out = [];
  const re = /paragraphs\s*:\s*\[/g;
  let m;
  while ((m = re.exec(obj))) {
    let i = m.index + m[0].length;
    let depth = 1;
    let inString = null;
    let escape = false;
    let current = "";
    let collecting = false;
    while (i < obj.length && depth > 0) {
      const ch = obj[i];
      if (escape) { current += ch; escape = false; i++; continue; }
      if (inString) {
        if (ch === "\\") { escape = true; current += ch; i++; continue; }
        if (ch === inString) {
          inString = null;
          out.push(JSON.parse(`"${current}"`));
          current = "";
          collecting = false;
          i++;
          continue;
        }
        current += ch;
        i++;
        continue;
      }
      if (ch === '"') { inString = ch; collecting = true; i++; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      // Ignore commas and identifiers outside strings (handles TRIAL_COUNTIES_SENTENCE)
      i++;
    }
  }
  return out;
}

const rows = [["slug", "kind", "wordCount", "file"]];

// Process services children files
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const items = parseChildrenFile(src);
  for (const item of items) {
    const slug = extractSlug(item);
    if (!slug) continue;
    const intro = extractIntro(item) ?? "";
    const paragraphs = extractParagraphs(item);
    const totalWords = countWords(intro) + paragraphs.reduce((s, p) => s + countWords(p), 0);
    rows.push([slug, "service", totalWords, f]);
  }
}

// Process hubs (bofuHubs in bofu-services.ts)
{
  const src = readFileSync(HUB_FILE, "utf8");
  // Only consider blocks in the bofuHubs export — slice from `export const bofuHubs` to next `export`.
  const startIdx = src.indexOf("export const bofuHubs");
  const endIdx = src.indexOf("export const bofuServices");
  const slice = src.slice(startIdx, endIdx > 0 ? endIdx : src.length);
  const items = parseChildrenFile(slice);
  for (const item of items) {
    // Hub slug field
    const slug = extractField(item, "slug");
    if (!slug) continue;
    const intro = extractField(item, "intro") ?? "";
    const whatThisCovers = extractField(item, "whatThisCovers") ?? "";
    const whenToCall = extractField(item, "whenToCall") ?? "";
    const totalWords = countWords(intro) + countWords(whatThisCovers) + countWords(whenToCall);
    rows.push([slug, "hub", totalWords, HUB_FILE]);
  }
}

// CSV output
const csv = rows.map((r) => r.join(",")).join("\n");
writeFileSync("scripts/bofu-word-counts.csv", csv);
process.stdout.write(csv + "\n");
