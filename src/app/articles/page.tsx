import { type Metadata } from "next";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { ArticlesIndex } from "@/components/sections/articles-index";
import { resources } from "@/lib/content/resources";
import { pageImages } from "@/lib/content/images";
import { createMetadata } from "@/lib/metadata";
import { collectionPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Articles",
  description:
    "Practical writing on Tennessee commercial leasing, TREC matters, real estate disputes, and the industry issues that sit underneath them.",
  path: "/articles",
});

const READ_TIMES: Record<string, string> = {
  "when-a-broker-complaint-turns-into-a-records-problem": "9 min",
  "commission-disputes-that-carry-more-than-money-risk": "8 min",
  "when-a-transaction-complaint-may-also-create-civil-exposure": "9 min",
  "deadlock-in-a-closely-held-business-decision-points-before-escalation": "8 min",
  "when-the-operating-agreement-no-longer-matches-reality": "8 min",
  "books-records-and-account-access-early-control-red-flags": "8 min",
  "early-mistakes-that-make-a-brokerage-complaint-worse": "8 min",
  "what-to-do-when-a-commercial-lease-default-notice-arrives": "7 min",
  "five-commercial-lease-terms-worth-slowing-down-for": "6 min",
  "what-to-do-first-after-a-trec-complaint-arrives": "6 min",
  "what-the-tennessee-real-estate-commission-can-and-cannot-do": "8 min",
  "owner-dispute-warning-signs-before-the-business-stalls": "6 min",
  "what-investigate-and-advise-looks-like-before-suit": "7 min",
};

const DATE_LABELS: Record<string, string> = {
  "when-a-broker-complaint-turns-into-a-records-problem": "April 2026",
  "commission-disputes-that-carry-more-than-money-risk": "April 2026",
  "when-a-transaction-complaint-may-also-create-civil-exposure": "April 2026",
  "deadlock-in-a-closely-held-business-decision-points-before-escalation": "March 2026",
  "when-the-operating-agreement-no-longer-matches-reality": "March 2026",
  "books-records-and-account-access-early-control-red-flags": "March 2026",
  "early-mistakes-that-make-a-brokerage-complaint-worse": "February 2026",
  "what-to-do-when-a-commercial-lease-default-notice-arrives": "February 2026",
  "five-commercial-lease-terms-worth-slowing-down-for": "January 2026",
  "what-to-do-first-after-a-trec-complaint-arrives": "January 2026",
  "what-the-tennessee-real-estate-commission-can-and-cannot-do": "December 2025",
  "owner-dispute-warning-signs-before-the-business-stalls": "December 2025",
  "what-investigate-and-advise-looks-like-before-suit": "November 2025",
};

export default function ArticlesPage() {
  const articles = resources.map((r, i) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    img: pageImages.articleSlugs[r.slug] ?? "/images/workspace_flat_lay.jpg",
    date: DATE_LABELS[r.slug] ?? "2026",
    read: READ_TIMES[r.slug] ?? "6 min",
    featured: i === 0,
  }));
  const categories = [
    "All",
    ...Array.from(new Set(resources.map((r) => r.category))),
  ];

  return (
    <>
      <StructuredDataScript
        data={collectionPageSchema({
          title: "Articles",
          description:
            "Practical writing on Tennessee commercial leasing, TREC matters, real estate disputes, and the industry issues that sit underneath them.",
          path: "/articles",
          items: resources.map((r) => ({
            name: r.title,
            path: `/articles/${r.slug}`,
          })),
        })}
      />
      <ArticlesIndex articles={articles} categories={categories} />
    </>
  );
}
