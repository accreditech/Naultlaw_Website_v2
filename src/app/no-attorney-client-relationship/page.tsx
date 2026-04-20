import { type Metadata } from "next";
import { LegalPageLayout } from "@/components/sections/legal-page-layout";
import { publicDisclosures } from "@/lib/public-disclosures";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "No Attorney-Client Relationship",
  description: publicDisclosures.noAttorneyClientRelationship.summary,
  path: "/no-attorney-client-relationship",
});

export default function NoAttorneyClientRelationshipPage() {
  return (
    <LegalPageLayout
      title={publicDisclosures.noAttorneyClientRelationship.title}
      summary={publicDisclosures.noAttorneyClientRelationship.summary}
      paragraphs={publicDisclosures.noAttorneyClientRelationship.paragraphs}
    />
  );
}
