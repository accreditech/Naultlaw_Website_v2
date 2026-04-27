import { type Metadata } from "next";
import Link from "next/link";

import { createMetadata } from "@/lib/metadata";
import { publicDisclosures } from "@/lib/public-disclosures";

export const metadata: Metadata = createMetadata({
  title: "Legal",
  description:
    "Site terms, privacy policy, attorney advertising notice, and engagement terms for The Law Office of Stephen Nault.",
  path: "/legal",
});

const LAST_REVIEWED = "April 2026";

const SECTIONS = [
  {
    id: "site-terms",
    label: "Site Terms",
    title: publicDisclosures.termsOfUse.title,
    summary: publicDisclosures.termsOfUse.summary,
    paragraphs: publicDisclosures.termsOfUse.paragraphs,
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    title: publicDisclosures.privacyPolicy.title,
    summary: publicDisclosures.privacyPolicy.summary,
    paragraphs: [
      ...publicDisclosures.privacyPolicy.paragraphs,
      // Disclosure for the new visitor-tracking + UTM + journey-capture
      // features. Required because we now persist behavioral data tied to
      // a submitted lead.
      "When you submit a contact or intake form, this website may also " +
        "record general first-touch attribution information (such as a " +
        "campaign or referral parameter present in the URL when you first " +
        "arrived) and a high-level summary of the public pages you " +
        "visited during the same browser session. This information is " +
        "stored only with the lead record you submitted and is used to " +
        "understand how prospective clients find the office and to " +
        "prepare for the initial conversation. It is not shared with " +
        "third parties for marketing.",
      "This website also records a one-way hashed version of your " +
        "internet protocol (IP) address with each submission. The actual " +
        "IP address is not stored. The hash is used solely to limit " +
        "abusive submissions and to indicate when the office has " +
        "received prior submissions from the same connection.",
    ],
  },
  {
    id: "attorney-advertising",
    label: "Attorney Advertising",
    title: publicDisclosures.websiteDisclaimer.title,
    summary: publicDisclosures.websiteDisclaimer.summary,
    paragraphs: [
      ...publicDisclosures.websiteDisclaimer.paragraphs,
      // Combine the no-attorney-client-relationship copy as a sub-section
      // since it covers a closely related topic. Lead with a small heading.
      "— No Attorney-Client Relationship —",
      ...publicDisclosures.noAttorneyClientRelationship.paragraphs,
    ],
  },
  {
    id: "engagement-terms",
    label: "Engagement Terms",
    title: "Engagement Terms",
    summary:
      "These terms apply once you have engaged the office for legal representation. They supplement, but do not replace, your written engagement letter.",
    paragraphs: [
      "The terms in this section apply when an attorney-client " +
        "relationship has been established between you and the office. " +
        "An attorney-client relationship begins only after the office " +
        "has completed conflict review, agreed to undertake the matter, " +
        "and confirmed the engagement on terms acceptable to both " +
        "parties — typically through a signed engagement letter or " +
        "retainer agreement.",
      "Scope of representation. The office's representation is limited " +
        "to the matters described in your engagement letter. Work " +
        "outside that scope, including new matters, expanded matters, " +
        "or substantially different matters, requires a separate " +
        "engagement.",
      "Fees and billing. Fees are described in the engagement letter " +
        "and are billed on the schedule set out there. Reasonable costs " +
        "and disbursements (filing fees, deposition costs, expert fees, " +
        "courier fees, and similar third-party charges) are billed " +
        "separately. The office may suspend or withdraw from " +
        "representation if invoices are not paid as agreed.",
      "Communication. The office will keep you reasonably informed " +
        "about the status of your matter and respond to reasonable " +
        "requests for information. Routine email communications are " +
        "appropriate for non-time-sensitive matters; please call the " +
        "office for anything urgent.",
      "Confidentiality. Information you share in connection with the " +
        "representation is treated as confidential consistent with " +
        "applicable rules of professional conduct, except where the " +
        "rules require or permit disclosure.",
      "File retention. After the matter concludes, the office retains " +
        "client files according to its standard retention practices and " +
        "applicable rules. You are entitled to a copy of any documents " +
        "you provided. The office may dispose of the file after the " +
        "retention period without further notice.",
      "Termination. You may terminate the representation at any time " +
        "by written notice. The office may withdraw consistent with " +
        "applicable rules. On termination, fees and costs incurred " +
        "through the date of termination remain payable.",
      "Tennessee jurisdiction. The representation is governed by the " +
        "laws of the State of Tennessee and by the Tennessee Rules of " +
        "Professional Conduct. Any dispute about fees or services is " +
        "subject to applicable Tennessee dispute-resolution procedures.",
      "Site Terms continue to apply. Your use of this website remains " +
        "subject to the Site Terms section above for as long as you " +
        "interact with this website, whether or not you are a client of " +
        "the office.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="fade-in">
      {/* Hero / table of contents */}
      <section
        style={{
          background: "var(--primary)",
          paddingBlock: "4.5rem",
        }}
      >
        <div className="shell" style={{ maxWidth: 880 }}>
          <p className="eyebrow light" style={{ marginBottom: 12 }}>
            Legal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "var(--white)",
              marginBottom: ".75rem",
            }}
          >
            Site terms, privacy, and engagement notices.
          </h1>
          <p
            style={{
              fontSize: ".975rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,.6)",
              maxWidth: 580,
            }}
          >
            All of the legal notices that govern your use of this website and
            any subsequent engagement. Last reviewed {LAST_REVIEWED}.
          </p>

          <nav
            aria-label="Legal sections"
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".82rem",
                  fontWeight: 500,
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,.18)",
                  color: "rgba(255,255,255,.82)",
                  textDecoration: "none",
                  background: "rgba(255,255,255,.04)",
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Sections */}
      <section style={{ background: "var(--bg)", paddingBlock: "4rem" }}>
        <div className="shell" style={{ maxWidth: 760 }}>
          {SECTIONS.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              style={{
                scrollMarginTop: 100,
                paddingTop: i === 0 ? 0 : "3rem",
                paddingBottom: "1rem",
                borderTop: i === 0 ? "none" : "1px solid var(--border)",
                marginTop: i === 0 ? 0 : "2rem",
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 10 }}>
                Section {i + 1}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  color: "var(--fg)",
                  marginBottom: ".75rem",
                }}
              >
                {s.title}
              </h2>
              {s.summary && (
                <p
                  style={{
                    fontSize: ".95rem",
                    lineHeight: 1.75,
                    color: "var(--muted-fg)",
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  {s.summary}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {s.paragraphs.map((para, j) => {
                  // Sub-headings start with em-dashes on each side; render them
                  // as a smaller heading rather than a paragraph.
                  if (para.startsWith("—") && para.endsWith("—")) {
                    return (
                      <h3
                        key={j}
                        style={{
                          fontFamily: "var(--font-head)",
                          fontStyle: "italic",
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          color: "var(--fg)",
                          marginTop: ".5rem",
                        }}
                      >
                        {para.replace(/^—\s*|\s*—$/g, "")}
                      </h3>
                    );
                  }
                  return (
                    <p
                      key={j}
                      style={{
                        fontSize: ".88rem",
                        lineHeight: 1.75,
                        color: "var(--fg)",
                      }}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            </article>
          ))}

          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: ".875rem",
                color: "var(--accent-readable)",
                textDecoration: "none",
              }}
            >
              Have a question? Contact the office →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
