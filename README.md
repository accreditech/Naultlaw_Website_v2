This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## SEO & Indexing automation

URLs on naultlaw.com are submitted to **IndexNow** (Bing, Yandex, Seznam.cz, Naver, AI-search products) by two in-repo triggers:

- A **GitHub Action** on every push to `master` diffs the commit range, waits for the Vercel deploy to land, and POSTs only the changed URLs to `/api/indexnow`.
- A **Vercel Cron** hits the same endpoint weekly (`vercel.json`) and submits the full sitemap as a safety net.

Both authenticate with the shared `CRON_SECRET` (set the same value in Vercel Production env vars AND as a GitHub repo secret).

The sitemap emits accurate per-URL `<lastmod>` from git commit history via `scripts/generate-content-mtimes.mjs` (runs as the `prebuild` npm hook).

**Google's Indexing API is NOT used for general pages** — Google restricts that API to `JobPosting` / `BroadcastEvent` content. Full architecture + retirement steps for the old Windows scheduled task in [`docs/seo-indexing.md`](./docs/seo-indexing.md).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
