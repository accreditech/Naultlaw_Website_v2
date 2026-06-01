#!/usr/bin/env node
// Generate src/lib/generated/content-mtimes.json — a map from repo-relative
// file path to ISO timestamp of the last commit that touched the file.
//
// Why: src/app/sitemap.ts needs an accurate <lastmod> per URL. File mtime
// on Vercel is the build-container clock (worthless — same for every file
// touched by the deploy), so we use git's record of the last edit instead.
//
// When: runs as the `prebuild` npm hook (see package.json) so every Vercel
// deploy regenerates the manifest from that deploy's commit history. The
// committed baseline (this script's output checked into the repo) is the
// fallback if the prebuild step ever fails — sitemap.ts always has data.
//
// Graceful degradation: if `git log` fails (shallow clone with no history,
// no .git directory, anything else), we keep whatever's already on disk
// and log a warning. Better stale lastmod than a broken build.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = resolve(__dirname, '..')
const outPath = join(repoRoot, 'src', 'lib', 'generated', 'content-mtimes.json')

// Paths whose last-commit timestamp drives a URL's <lastmod>. Add new
// entries when a new sitemap branch is added (e.g., a new dynamic route
// whose pages render from a fresh content file). Patterns are evaluated
// relative to the repo root, forward-slash separators on all platforms.
const TRACKED_PATHS = [
  // Static routes
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/articles/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/expert-witness/page.tsx',
  'src/app/practice-areas/page.tsx',
  'src/app/services/page.tsx',
  // Dynamic-route templates (per-slug pages use the template + the
  // content file; we record both and the sitemap picks the most recent).
  'src/app/articles/[slug]/page.tsx',
  'src/app/practice-areas/[slug]/page.tsx',
  'src/app/services/[slug]/page.tsx',
  // Content files driving the dynamic routes
  'src/lib/content/resources.ts',
  'src/lib/content/practice-areas.ts',
  'src/lib/content/bofu-services.ts',
  'src/lib/content/bofu/business-disputes-children.ts',
  'src/lib/content/bofu/business-formation-children.ts',
  'src/lib/content/bofu/contract-services-children.ts',
  'src/lib/content/bofu/expert-witness-children.ts',
  'src/lib/content/bofu/real-estate-disputes-children.ts',
  'src/lib/content/bofu/real-estate-transactions-children.ts',
]

function gitLastCommitIso(repoRelativePath) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%aI', '--', repoRelativePath],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    ).trim()
    return out || null
  } catch {
    return null
  }
}

function main() {
  const manifest = {}
  let gitFailures = 0

  for (const p of TRACKED_PATHS) {
    const absPath = join(repoRoot, p)
    if (!existsSync(absPath)) {
      console.warn(`[mtimes] skip (not on disk): ${p}`)
      continue
    }
    const iso = gitLastCommitIso(p)
    if (iso) {
      manifest[p] = iso
    } else {
      gitFailures += 1
    }
  }

  if (gitFailures > 0 && Object.keys(manifest).length === 0) {
    // Total git failure (no history at all). Keep whatever's already
    // committed at outPath — never overwrite a good manifest with an
    // empty one. Vercel shallow-clone case lands here on the very first
    // build after this script ships; subsequent builds work because
    // Vercel's fetch depth is sufficient for recent commits.
    console.warn(
      '[mtimes] git log returned nothing for any tracked file. Keeping the ' +
        'existing manifest on disk (if any). The committed baseline is the ' +
        'fallback per the script header.',
    )
    if (existsSync(outPath)) {
      console.warn(`[mtimes] existing manifest preserved: ${relative(repoRoot, outPath)}`)
      return
    }
    // No existing manifest either — write an empty object so the
    // sitemap import works (it will fall through to no-lastmod).
  }

  mkdirSync(dirname(outPath), { recursive: true })
  // Sort keys for stable diffs.
  const sorted = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((k) => [k, manifest[k]]),
  )
  writeFileSync(outPath, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
  console.log(
    `[mtimes] wrote ${Object.keys(sorted).length} entries → ${relative(repoRoot, outPath)}`,
  )
}

main()
