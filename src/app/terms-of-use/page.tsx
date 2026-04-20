import { type Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal-page-layout";
import { publicDisclosures } from "@/lib/public-disclosures";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
  description: publicDisclosures.termsOfUse.summary,
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title={publicDisclosures.termsOfUse.title}
      summary={publicDisclosures.termsOfUse.summary}
      paragraphs={publicDisclosures.termsOfUse.paragraphs}
    />
  );
}
