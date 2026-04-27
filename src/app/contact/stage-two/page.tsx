/**
 * Stage-two page = success screen + optional "tell us more" follow-up.
 *
 * After a successful Stage-One submission, the API redirects here with
 * `?lead={uuid}` (and optionally `&practice={slug}`). We:
 *   1. Show a user-voice confirmation
 *   2. If the prospect skipped the description on Stage One, gently nudge
 *      them to add a few sentences
 *   3. Offer an optional "tell us more" form (county, practice area,
 *      opposing party, anything else) that saves back into the existing
 *      lead record so the office can prep the conflict review
 */

import { type Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";

import { StageTwoForm } from "@/components/contact/stage-two-form";
import { db, schema } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Confirmation",
    description:
      "Thanks — your message has been received. Typical turnaround is 1–3 business days.",
    path: "/contact/stage-two",
  }),
  // Don't index the post-submission page.
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ lead?: string; practice?: string }>;
};

async function loadLead(leadId?: string) {
  if (!leadId || !db) return null;
  try {
    const [row] = await db
      .select({
        id: schema.leads.id,
        name: schema.leads.name,
        email: schema.leads.email,
        description: schema.leads.description,
        county: schema.leads.county,
        practiceArea: schema.leads.practiceArea,
        issueType: schema.leads.issueType,
        opposingParties: schema.leads.opposingParties,
        propertyAddress: schema.leads.propertyAddress,
      })
      .from(schema.leads)
      .where(eq(schema.leads.id, leadId))
      .limit(1);
    return row ?? null;
  } catch {
    return null;
  }
}

export default async function StageTwoPage({ searchParams }: Props) {
  const params = await searchParams;
  const lead = await loadLead(params.lead);

  const hasDescription = !!(
    lead?.description && lead.description.trim().length > 0
  );

  return (
    <main className="fade-in">
      {/* Confirmation hero */}
      <section
        style={{
          background: "var(--primary)",
          paddingBlock: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="shell" style={{ maxWidth: 720 }}>
          <p className="eyebrow light" style={{ marginBottom: 12 }}>
            Confirmation
          </p>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "var(--white)",
              marginBottom: "1rem",
            }}
          >
            Thanks{lead?.name ? `, ${lead.name.split(/\s+/)[0]}` : ""} —
            your message is in.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,.78)",
              marginBottom: ".75rem",
            }}
          >
            Typical turnaround is <strong>1–3 business days</strong>. For
            anything time-sensitive, the office line is{" "}
            <a
              href="tel:+16159539505"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              (615) 953-9505
            </a>
            .
          </p>
          <p
            style={{
              fontSize: ".9rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,.55)",
            }}
          >
            A confirmation has been emailed to{" "}
            {lead?.email ? <strong>{lead.email}</strong> : "the address you provided"}
            . If you don&apos;t see it, check your spam folder.
          </p>
        </div>
      </section>

      {/* Optional follow-up: "Tell us more" */}
      <section
        className="sec"
        style={{
          background: "var(--bg)",
          paddingBlock: "clamp(3rem, 6vw, 4.5rem)",
        }}
      >
        <div className="shell" style={{ maxWidth: 760 }}>
          {!hasDescription && lead && (
            <div
              role="note"
              style={{
                background: "#fbf6ec",
                border: "1px solid var(--accent)",
                borderRadius: 8,
                padding: "1.25rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: ".95rem",
                  lineHeight: 1.7,
                  color: "var(--fg)",
                }}
              >
                <strong>No description on that one — no problem.</strong>{" "}
                If you have a moment to spare, even a couple of sentences
                here helps the office hit the ground running on the first
                call. Things like: what kind of matter, who&apos;s on the
                other side if anyone, and where things stand right now.
                Save the deeper details for after the conflict check.
              </p>
            </div>
          )}

          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Optional · Save time on our call
          </p>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--fg)",
              marginBottom: ".5rem",
            }}
          >
            Tell us a little more.
          </h2>
          <p
            style={{
              fontSize: ".95rem",
              lineHeight: 1.7,
              color: "var(--muted-fg)",
              marginBottom: "2rem",
              maxWidth: 580,
            }}
          >
            Every field below is optional. The more you can share, the more
            useful the first conversation tends to be — but feel free to
            skip anything that&apos;s not relevant.
          </p>

          {lead ? (
            <StageTwoForm
              leadId={lead.id}
              defaults={{
                description: lead.description ?? "",
                county: lead.county ?? "",
                practiceArea: lead.practiceArea ?? "",
                issueType: lead.issueType ?? "",
                opposingParties: lead.opposingParties ?? "",
                propertyAddress: lead.propertyAddress ?? "",
              }}
            />
          ) : (
            <div
              style={{
                padding: "1.5rem",
                background: "var(--muted)",
                borderRadius: 8,
                color: "var(--muted-fg)",
                fontSize: ".875rem",
              }}
            >
              We couldn&apos;t locate that submission. The follow-up form
              is unavailable here, but your initial intake was received.
            </div>
          )}

          <p
            style={{
              marginTop: "2rem",
              fontSize: ".85rem",
              color: "var(--muted-fg)",
              textAlign: "center",
            }}
          >
            <Link
              href="/"
              style={{
                color: "var(--accent-readable)",
                textDecoration: "underline",
              }}
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
