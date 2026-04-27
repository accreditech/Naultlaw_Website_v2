import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Expert Witness & Litigation Consulting",
  description:
    "Tennessee real estate and brokerage expert witness services for plaintiff and defense counsel. Stephen Nault is an attorney and licensed managing broker available for case review, designation, written reports, and trial testimony.",
  path: "/expert-witness",
});

const PHONE_DISPLAY = "(615) 953-9505";
const PHONE_HREF = "tel:+16159539505";

const CASE_TYPES = [
  {
    t: "Standard of Care & Industry Custom",
    d: "What a reasonably competent Tennessee broker, agent, or manager would have done under the same circumstances — and how TREC standards, commission rules, and published custom apply.",
  },
  {
    t: "Commercial Leasing Disputes",
    d: "LOI and lease interpretation, CAM reconciliations, exclusivity and co-tenancy, defaults, subordination, and tenant/landlord conduct during and after the transaction.",
  },
  {
    t: "Brokerage & Agency Disputes",
    d: "Agency formation, scope of representation, dual agency, designated agency, supervision of affiliates, and the commission/procuring-cause framework.",
  },
  {
    t: "Disclosure & Misrepresentation",
    d: "Seller's Property Disclosure, material defects, agent duty to investigate, and when industry practice required disclosure that was not made.",
  },
  {
    t: "Property Management Operations",
    d: "Trust accounting, escrow handling, habitability, vendor management, lease enforcement, and the line between managing and practicing.",
  },
  {
    t: "TREC Licensing & Supervision",
    d: "How complaints are evaluated, what supervising brokers should reasonably catch, and how training and written policy bear on licensee conduct.",
  },
];

const SERVICES = [
  {
    t: "Pre-Litigation Consulting",
    d: "Early case review before an expert is designated. Confidential assessment of whether industry custom or standard of care actually supports your theory.",
  },
  {
    t: "Expert Designation & Reports",
    d: "Rule 26 disclosures, written reports, and supporting exhibits prepared with the underlying record in mind and written to be cross-examined.",
  },
  {
    t: "Deposition & Trial Testimony",
    d: "Clear, non-theatrical testimony. Complex industry concepts explained to a judge or jury in plain language — without overreaching or editorializing.",
  },
  {
    t: "Rebuttal & Second Opinions",
    d: "Review of opposing expert reports. Identification of assumptions, overreach, and where industry practice does not match the opinion offered.",
  },
];

const QUALIFICATIONS = [
  { l: "Attorney", v: "Tennessee Bar, 2018 · USDC Middle District of TN" },
  {
    l: "Real Estate",
    v: "TN Licensed Broker since 2012 · Managing Broker since 2021",
  },
  { l: "Instructor", v: "TREC Course Instructor License, 2020" },
  { l: "Mediator", v: "Rule 31 Listed Mediator" },
  {
    l: "Hands-on",
    v: "Leasing, property management, brokerage, and commercial real estate operations",
  },
];

const PhoneIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function ExpertWitnessPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <section
        style={{
          background: "var(--primary)",
          paddingBlock: "6rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/NaultSpeaking.JPG"
          alt=""
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 25%",
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(18,35,44,.92) 0%, rgba(18,35,44,.75) 60%, rgba(18,35,44,.55) 100%)",
          }}
        />
        <div
          className="shell g-2"
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="eyebrow light" style={{ marginBottom: 14 }}>
              For Attorneys · Expert Witness &amp; Consulting
            </p>
            <h1
              style={{
                fontFamily: "var(--font-head)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(2rem,3.8vw,3.2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "var(--white)",
                marginBottom: "1.5rem",
              }}
            >
              When industry experience is needed for you to win your case.
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,.72)",
                marginBottom: "2rem",
              }}
            >
              Stephen Nault has over 20 years of real estate experience and is
              an active managing broker of a real estate firm as well as a
              Tennessee Real Estate Commission Course Instructor. This
              includes commercial and residential sales, investments, and
              property management. He has managed millions of square feet of
              office space, and at one point oversaw a leasing portfolio of
              over 120 commercial leases in 30+ countries. When experience
              matters you need an expert who has experience in both the field
              and in the courtroom. Expert services include case review,
              written reports, depositions and trial testimony.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  padding: "12px 24px",
                  borderRadius: 6,
                  background: "var(--accent)",
                  color: "var(--primary)",
                  textDecoration: "none",
                }}
              >
                Schedule a Consultation
              </Link>
              <a
                href={PHONE_HREF}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  padding: "12px 24px",
                  borderRadius: 6,
                  background: "transparent",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <PhoneIcon />
                Call the Office
              </a>
            </div>
          </div>
          {/* Credential card */}
          <div
            style={{
              background: "var(--white)",
              borderRadius: 10,
              padding: "1.75rem",
              boxShadow: "0 24px 60px rgba(0,0,0,.35)",
            }}
          >
            <p
              style={{
                fontSize: ".68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "var(--accent-readable)",
                marginBottom: 14,
              }}
            >
              Qualifications
            </p>
            {QUALIFICATIONS.map((r, i) => (
              <div
                key={r.l}
                style={{
                  paddingBlock: 10,
                  borderBottom:
                    i < QUALIFICATIONS.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <p
                  style={{
                    fontSize: ".7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".14em",
                    color: "var(--muted-fg)",
                    marginBottom: 2,
                  }}
                >
                  {r.l}
                </p>
                <p
                  style={{
                    fontSize: ".85rem",
                    lineHeight: 1.55,
                    color: "var(--fg)",
                  }}
                >
                  {r.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case types */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="shell">
          <div style={{ maxWidth: 640, marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Case Types
            </p>
            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.75rem,2.8vw,2.4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                marginBottom: "1rem",
              }}
            >
              Where industry experience changes the analysis.
            </h2>
            <p
              style={{
                fontSize: ".95rem",
                lineHeight: 1.8,
                color: "var(--muted-fg)",
              }}
            >
              Matters where standard of care, custom, and practice are at
              issue — not just the black-letter law.
            </p>
          </div>
          <div
            className="g-cards-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "1.5rem",
            }}
          >
            {CASE_TYPES.map((c) => (
              <div
                key={c.t}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "1.5rem 1.75rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    marginBottom: 8,
                  }}
                >
                  {c.t}
                </p>
                <p
                  style={{
                    fontSize: ".875rem",
                    lineHeight: 1.75,
                    color: "var(--muted-fg)",
                  }}
                >
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="sec" style={{ background: "var(--muted)" }}>
        <div className="shell">
          <div
            className="g-sidebar"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <div
              className="no-sticky-mobile"
              style={{ position: "sticky", top: 100 }}
            >
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Engagement
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  marginBottom: "1rem",
                }}
              >
                Retained at any stage.
              </h2>
              <p
                style={{
                  fontSize: ".9rem",
                  lineHeight: 1.8,
                  color: "var(--muted-fg)",
                }}
              >
                From a confidential consulting role before designation through
                formal testimony at trial. Conflict-screened before any
                detailed review.
              </p>
            </div>
            <div>
              {SERVICES.map((s, i) => (
                <div
                  key={s.t}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.25rem",
                    paddingBlock: "1.5rem",
                    borderBottom:
                      i === SERVICES.length - 1
                        ? "none"
                        : "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-head)",
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: "var(--accent-readable)",
                      lineHeight: 1,
                      minWidth: 36,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "var(--fg)",
                        marginBottom: 6,
                      }}
                    >
                      {s.t}
                    </p>
                    <p
                      style={{
                        fontSize: ".9rem",
                        lineHeight: 1.75,
                        color: "var(--muted-fg)",
                      }}
                    >
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="sec" style={{ background: "var(--white)" }}>
        <div className="shell">
          <div
            className="g-2-reverse"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <Image
                src="/images/NaultSpeaking.JPG"
                alt="Stephen Nault presenting"
                width={720}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: 8,
                }}
              />
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Approach
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  marginBottom: "1.25rem",
                }}
              >
                Measured. Prepared. Plain-spoken.
              </h2>
              <p
                style={{
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  color: "var(--muted-fg)",
                  marginBottom: "1.25rem",
                }}
              >
                An expert who overreaches hurts the case. The work here is
                grounded in the record, framed in language a jury can follow,
                and limited to what the industry actually supports.
              </p>
              <p
                style={{
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  color: "var(--muted-fg)",
                  marginBottom: "1.75rem",
                }}
              >
                Teaching TREC coursework and working day-to-day as a managing
                broker keeps the opinions current — not drawn from practice
                ten years ago.
              </p>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  padding: "12px 24px",
                  borderRadius: 6,
                  background: "var(--primary)",
                  color: "var(--white)",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
