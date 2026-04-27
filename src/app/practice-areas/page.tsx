import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { practiceAreas } from "@/lib/content/practice-areas";
import { createMetadata } from "@/lib/metadata";
import { collectionPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Practice Areas",
  description:
    "Eight areas across business law, real estate, dispute resolution, and attorney support. Tennessee real estate and business law in Gallatin and Sumner County.",
  path: "/practice-areas",
});

const PA_VISUAL: Record<string, { eyebrow: string; img: string; desc: string }> = {
  "commercial-leasing": {
    eyebrow: "Real Estate",
    img: "/images/charming_street_sunset.jpg",
    desc: "Lease terms should support the business plan, not become the next dispute. LOI review, defaults, CAM reconciliations, and exit strategy.",
  },
  "trec-defense-and-realtor-complaints": {
    eyebrow: "Licensing",
    img: "/images/realtorreview.jpg",
    desc: "Representing real estate professionals and their clients — whether a complaint has been filed, an investigation is open, or you want a structured review before one becomes likely.",
  },
  "operating-agreements-and-owner-disputes": {
    eyebrow: "Business",
    img: "/images/bizconflict.jpg",
    desc: "Deadlock, distribution disputes, fiduciary concerns, or a forced-buyout demand. Owner conflicts need to be framed before they escalate.",
  },
  "real-estate-disputes": {
    eyebrow: "Real Estate",
    img: "/images/coupleconcerned.jpg",
    desc: "A transaction failed, title has a problem, earnest money is being held, or a broker's conduct is in question.",
  },
  "business-contract-drafting-and-review": {
    eyebrow: "Business",
    img: "/images/contractreviewguy.jpg",
    desc: "Contracts drafted, reviewed before signing, or enforced. Or someone is claiming you breached one.",
  },
  "strategic-case-assessment": {
    eyebrow: "Consultation",
    img: "/images/workspace_flat_lay.jpg",
    desc: "Not sure whether you have a viable claim? A structured, honest review of the situation before committing to a lawsuit.",
  },
  "expert-witness-real-estate-and-brokerage-matters": {
    eyebrow: "Attorney Support",
    img: "/images/NaultSpeaking.JPG",
    desc: "Industry-informed analysis for real estate and brokerage disputes where professional standards, custom, and practice are at issue.",
  },
  "arbitration-and-dispute-resolution": {
    eyebrow: "Dispute Resolution",
    img: "/images/modern_executive_conference.jpg",
    desc: "Forum selection, demand strategy, arbitration positioning, and settlement leverage for business-focused disputes.",
  },
};

const PHONE_DISPLAY = "(615) 953-9505";
const PHONE_HREF = "tel:+16159539505";

export default function PracticeAreasPage() {
  return (
    <>
      <StructuredDataScript
        data={collectionPageSchema({
          title: "Practice Areas",
          description:
            "Eight areas across business law, real estate, dispute resolution, and attorney support.",
          path: "/practice-areas",
          items: practiceAreas.map((area) => ({
            name: area.shortTitle,
            path: `/practice-areas/${area.slug}`,
          })),
        })}
      />
      <main className="fade-in">
        <section style={{ background: "var(--primary)", paddingBlock: "5rem" }}>
          <div className="shell">
            <p className="eyebrow light" style={{ marginBottom: 12 }}>
              Nault Law
            </p>
            <h1
              style={{
                fontFamily: "var(--font-head)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "var(--white)",
                marginBottom: "1.25rem",
              }}
            >
              Practice Areas
            </h1>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,.6)",
                maxWidth: 540,
              }}
            >
              Eight areas across business law, real estate, dispute resolution,
              and attorney support. If your situation touches any of these,
              you&apos;re likely in the right place.
            </p>
          </div>
        </section>

        <section className="sec" style={{ background: "var(--bg)" }}>
          <div className="shell">
            <ul
              className="g-cards-3"
              style={{
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "1.5rem",
                padding: 0,
                margin: 0,
              }}
            >
              {practiceAreas.map((pa) => {
                const v = PA_VISUAL[pa.slug];
                if (!v) return null;
                return (
                  <li key={pa.slug} style={{ display: "flex" }}>
                    <Link
                      href={`/practice-areas/${pa.slug}`}
                      className="surface-card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        overflow: "hidden",
                        textDecoration: "none",
                        background: "var(--white)",
                      }}
                    >
                      <div
                        style={{
                          aspectRatio: "16/10",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={v.img}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: ".62rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: ".18em",
                              background: "rgba(18,35,44,.72)",
                              color: "rgba(255,255,255,.85)",
                              padding: "4px 10px",
                              borderRadius: 4,
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            {v.eyebrow}
                          </span>
                        </div>
                      </div>
                      <div style={{ padding: "20px 22px 24px" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-head)",
                            fontStyle: "italic",
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            color: "var(--fg)",
                            marginBottom: 8,
                            lineHeight: 1.25,
                          }}
                        >
                          {pa.shortTitle}
                        </h3>
                        <p
                          style={{
                            fontSize: ".845rem",
                            lineHeight: 1.75,
                            color: "var(--muted-fg)",
                          }}
                        >
                          {v.desc}
                        </p>
                        <p
                          style={{
                            marginTop: 12,
                            fontSize: ".8125rem",
                            fontWeight: 600,
                            color: "var(--accent-readable)",
                          }}
                        >
                          Learn more →
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          style={{
            background: "var(--muted)",
            paddingBlock: "4rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="shell">
            <div
              className="g-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: "4rem",
                alignItems: "center",
                background: "var(--primary)",
                borderRadius: 12,
                padding: "3rem clamp(2rem,4vw,3.5rem)",
                color: "var(--white)",
              }}
            >
              <div>
                <p className="eyebrow light" style={{ marginBottom: 12 }}>
                  If any of this sounds like your situation
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(1.5rem,2.4vw,2rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.12,
                    color: "var(--white)",
                    marginBottom: "1rem",
                  }}
                >
                  Not sure which area fits?
                </h2>
                <p
                  style={{
                    fontSize: ".95rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,.7)",
                  }}
                >
                  Strategic Case Assessment is a structured review for exactly
                  that scenario. Share what you know — the intake is
                  conflict-screened and you&apos;ll hear back within one
                  business day.
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
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
                    textAlign: "center",
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
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
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
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
