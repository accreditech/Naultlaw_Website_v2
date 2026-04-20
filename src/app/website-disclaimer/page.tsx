import { type Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal-page-layout";
import { publicDisclosures } from "@/lib/public-disclosures";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Website Disclaimer",
  description: publicDisclosures.websiteDisclaimer.summary,
  path: "/website-disclaimer",
});

export default function WebsiteDisclaimerPage() {
  return (
    <LegalPageLayout
      title={publicDisclosures.websiteDisclaimer.title}
      summary={publicDisclosures.websiteDisclaimer.summary}
      paragraphs={publicDisclosures.websiteDisclaimer.paragraphs}
    />
  );
}
