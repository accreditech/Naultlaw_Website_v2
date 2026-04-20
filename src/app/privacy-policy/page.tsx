import { type Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal-page-layout";
import { publicDisclosures } from "@/lib/public-disclosures";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: publicDisclosures.privacyPolicy.summary,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title={publicDisclosures.privacyPolicy.title}
      summary={publicDisclosures.privacyPolicy.summary}
      paragraphs={publicDisclosures.privacyPolicy.paragraphs}
    />
  );
}
