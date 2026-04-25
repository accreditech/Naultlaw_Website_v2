import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { homepageTestimonials } from "@/lib/content/testimonials";
import { createMetadata } from "@/lib/metadata";
import {
  localBusinessSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Home",
    description:
      "Business, real estate, and dispute-resolution counsel for owners, investors, brokers, contractors, and real estate professionals in Sumner County and surrounding counties.",
    path: "/",
  }),
  // Homepage shares a route segment with the root layout, so the layout's
  // title.template doesn't auto-apply here. Set the full title directly.
  title: "NaultLaw - Home",
};

const FEATURED_PA = [
  {
    slug: "commercial-leasing",
    label: "Commercial Leasing",
    eyebrow: "Real Estate",
    desc:
      "Lease terms should support the business plan, not become the next dispute. LOI review, defaults, CAM reconciliations, and exit strategy.",
    img: "/images/charming_street_sunset.jpg",
  },
  {
    slug: "trec-defense-and-realtor-complaints",
    label: "TREC Defense and Realtor Representation",
    eyebrow: "Licensing",
    desc:
      "Representing real estate professionals and their clients — whether a complaint has been filed, an investigation is open, or you want a structured review before one becomes likely.",
    img: "/images/realtorreview.jpg",
  },
  {
    slug: "operating-agreements-and-owner-disputes",
    label: "Owner & Partner Disputes",
    eyebrow: "Business",
    desc:
      "Deadlock, distribution disputes, fiduciary concerns, or a forced-buyout demand. Owner conflicts need to be framed before they escalate.",
    img: "/images/bizconflict.jpg",
  },
  {
    slug: "real-estate-disputes",
    label: "Real Estate Disputes",
    eyebrow: "Real Estate",
    desc:
      "A transaction failed, title has a problem, earnest money is being held, or a broker's conduct is in question.",
    img: "/images/coupleconcerned.jpg",
  },
  {
    slug: "business-contract-drafting-and-review",
    label: "Business Contracts",
    eyebrow: "Business",
    desc:
      "Contracts drafted, reviewed before signing, or enforced. Or someone is claiming you breached one.",
    img: "/images/contractreviewguy.jpg",
  },
  {
    slug: "strategic-case-assessment",
    label: "Strategic Case Assessment",
    eyebrow: "Consultation",
    desc:
      "Not sure whether you have a viable claim? A structured, honest review of the situation before committing to a lawsuit.",
    img: "/images/workspace_flat_lay.jpg",
  },
];

const PHONE_DISPLAY = "(615) 953-9505";
const PHONE_HREF = "tel:+16159539505";

const PhoneIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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

const AccentDot = () => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)",
      flexShrink: 0,
      marginTop: 9,
    }}
  />
);

export default function HomePage() {
  return (
    <>
      <StructuredDataScript data={websiteSchema()} />
      <StructuredDataScript data={organizationSchema()} />
      <StructuredDataScript data={localBusinessSchema()} />
      <StructuredDataScript data={personSchema()} />

      <main className="fade-in">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          className="hero-section"
          style={{
            position: "relative",
            minHeight: "88vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Image
            src="/images/naultlawoffice.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(18,35,44,.94) 0%, rgba(18,35,44,.86) 42%, rgba(18,35,44,.55) 72%, rgba(18,35,44,.35) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18,35,44,.35) 0%, rgba(18,35,44,0) 30%, rgba(18,35,44,0) 70%, rgba(18,35,44,.6) 100%)",
            }}
          />

          <div
            className="shell hero-grid"
            style={{
              position: "relative",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "1.35fr 1fr",
              gap: "clamp(2rem,5vw,5rem)",
              alignItems: "center",
              paddingBlock: "6rem",
              width: "100%",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <p className="eyebrow light" style={{ marginBottom: "1.25rem" }}>
                Tennessee Real Estate &amp; Business Law · Gallatin
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontSize: "clamp(2.2rem,3.8vw,3.3rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "var(--white)",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.03em",
                }}
              >
                A practical approach to business and real estate law.
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,.75)",
                  marginBottom: "2rem",
                }}
              >
                Stephen Nault is a Tennessee attorney and licensed real estate
                broker based in Gallatin. Real-world industry experience,
                focused on problem prevention and resolution — handled
                directly, without delegation.
              </p>
              <div
                className="hero-cta-row"
                style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
              >
                <Link
                  href="/contact"
                  className="hero-cta-schedule"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: ".9rem",
                    padding: "12px 24px",
                    borderRadius: 6,
                    background: "var(--accent)",
                    color: "var(--primary)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Schedule a Consultation
                </Link>
                <a
                  href={PHONE_HREF}
                  className="hero-cta-call"
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

            {/* Headshot card */}
            <div
              className="hero-headshot-card"
              style={{ position: "relative", alignSelf: "center" }}
            >
              <div
                style={{
                  background: "var(--white)",
                  borderRadius: 10,
                  padding: "1.75rem 1.75rem 1.5rem",
                  boxShadow: "0 24px 60px rgba(0,0,0,.35)",
                  maxWidth: 380,
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    overflow: "hidden",
                    borderRadius: 6,
                    marginBottom: "1.25rem",
                    background: "#f0ebe4",
                    position: "relative",
                  }}
                >
                  <Image
                    src="/images/Naultheadshotwhitebackground.jpeg"
                    alt="Stephen Nault"
                    fill
                    sizes="380px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    color: "var(--primary)",
                    marginBottom: 4,
                    letterSpacing: "-.01em",
                  }}
                >
                  Stephen C. Nault
                </p>
                <p
                  style={{
                    fontSize: ".78rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".14em",
                    color: "var(--accent)",
                  }}
                >
                  Attorney
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEXT STRIP ────────────────────────────────── */}
        <section style={{ background: "var(--accent)", paddingBlock: "1.1rem" }}>
          <div
            className="shell"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1.5rem,4vw,3.5rem)",
              flexWrap: "wrap",
            }}
          >
            {[
              "Tennessee Lawyer",
              "Tennessee Licensed Real Estate Broker",
              "Rule 31 Listed Mediator",
              "Real Estate Expert Witness",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: ".82rem",
                  fontWeight: 600,
                  color: "var(--primary)",
                  letterSpacing: ".02em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────── */}
        <section className="sec" style={{ background: "var(--primary)" }}>
          <div className="shell">
            <TestimonialCarousel testimonials={homepageTestimonials} />
          </div>
        </section>

        {/* ── PRACTICE AREA CARDS (featured 6) ─────────────── */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="shell">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 10 }}>
                  Practice Areas
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(1.75rem,2.5vw,2.3rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.12,
                  }}
                >
                  A closer look at each area.
                </h2>
              </div>
            </div>
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
              {FEATURED_PA.map((pa) => (
                <li key={pa.slug} style={{ display: "flex" }}>
                  <Link
                    href={`/practice-areas/${pa.slug}`}
                    className="surface-card group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "transform .2s, box-shadow .2s",
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
                        src={pa.img}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
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
                          {pa.eyebrow}
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
                        {pa.label}
                      </h3>
                      <p
                        style={{
                          fontSize: ".845rem",
                          lineHeight: 1.75,
                          color: "var(--muted-fg)",
                        }}
                      >
                        {pa.desc}
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
              ))}
            </ul>
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="/practice-areas"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".9rem",
                  fontWeight: 600,
                  color: "var(--accent-readable)",
                  padding: "12px 28px",
                  borderRadius: 6,
                  background: "transparent",
                  border: "1.5px solid var(--accent)",
                  textDecoration: "none",
                }}
              >
                View All 8 Practice Areas →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY THIS PRACTICE ────────────────────────────── */}
        <section className="sec" style={{ background: "var(--muted)" }}>
          <div className="shell">
            <div
              className="g-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5rem",
                alignItems: "center",
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 14 }}>
                  Why This Practice
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(1.75rem,2.5vw,2.4rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.12,
                    marginBottom: "1.25rem",
                  }}
                >
                  Where Legal advice meets real-world business and real
                  estate experience.
                </h2>
                <p
                  style={{
                    fontSize: ".9375rem",
                    lineHeight: 1.85,
                    color: "var(--muted-fg)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Mr. Nault&apos;s professional life began in commercial real
                  estate — a decade of work that started in financial analysis
                  and property management and grew into his own real estate
                  investment company before he turned to the law.
                </p>
                <p
                  style={{
                    fontSize: ".9375rem",
                    lineHeight: 1.85,
                    color: "var(--muted-fg)",
                    marginBottom: "1.75rem",
                  }}
                >
                  That experience is the difference. Mr. Nault hasn&apos;t
                  just read about commercial leases, brokerage operations, and
                  property management — he&apos;s done the work. A legal
                  opinion that ignores the business reality is rarely useful.
                  You need a lawyer who understands your business as much as
                  you do.
                </p>
                {[
                  {
                    h: "A broker, not an observer.",
                    b: "Licensed in Tennessee since 2012, with hands-on experience in leasing, property management, and commercial real estate advisory work.",
                  },
                  {
                    h: "A TREC course instructor.",
                    b: "Not an outside observer of the licensing system. Someone who teaches it.",
                  },
                  {
                    h: "Your matter stays with Stephen.",
                    b: "Not assigned to an associate. Not delegated after the intake call. You deal with the same person from start to finish.",
                  },
                  {
                    h: "A Rule 31 Mediator.",
                    b: "A dispute-resolution orientation that shapes how every problem gets analyzed, not just when mediation is on the table.",
                  },
                ].map((pt) => (
                  <div
                    key={pt.h}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <AccentDot />
                    <p
                      style={{
                        fontSize: ".9375rem",
                        lineHeight: 1.8,
                        color: "var(--fg)",
                      }}
                    >
                      <strong>{pt.h}</strong>{" "}
                      <span style={{ color: "var(--muted-fg)" }}>{pt.b}</span>
                    </p>
                  </div>
                ))}
                <div style={{ marginTop: "2rem" }}>
                  <Link
                    href="/about"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: ".8125rem",
                      padding: "10px 20px",
                      borderRadius: 6,
                      background: "transparent",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    About Stephen Nault
                  </Link>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Image
                  src="/images/stephen-nault-headshot.jpg"
                  alt="Stephen Nault"
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
            </div>
          </div>
        </section>

        {/* ── SMALL TOWN / LOCAL BANNER ────────────────────── */}
        <section
          className="mobile-banner-height"
          style={{ position: "relative", height: 380, overflow: "hidden" }}
        >
          <Image
            src="/images/small_town_square.jpg"
            alt="Downtown Gallatin, TN"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(18,35,44,.58)",
            }}
          />
          <div
            className="shell"
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <p className="eyebrow light" style={{ marginBottom: 12 }}>
                Gallatin &amp; Sumner County
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  color: "var(--white)",
                  marginBottom: "1rem",
                }}
              >
                A local practice, built for local problems.
              </h2>
              <p
                style={{
                  fontSize: ".9375rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,.65)",
                }}
              >
                Based in Gallatin, serving Sumner, Wilson, Robertson, and
                Trousdale Counties. Local relationships, local market
                dynamics, and the kind of knowledge that only comes from
                working here.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section className="sec" style={{ background: "var(--bg)" }}>
          <div className="shell">
            <div style={{ maxWidth: 560, marginBottom: "3rem" }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Getting Started
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.75rem,2.5vw,2.3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                }}
              >
                Three steps, no surprises.
              </h2>
            </div>
            <div
              className="g-cards-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "4rem",
              }}
            >
              {[
                {
                  n: "01",
                  h: "Submit the intake",
                  b: "Name, contact, brief situation, opposing party if any. Conflict-screened before detailed review begins.",
                },
                {
                  n: "02",
                  h: "Intro call",
                  b: "A short call to confirm no conflict exists and we are a good fit for one another. No billing until that's clear.",
                },
                {
                  n: "03",
                  h: "Engagement begins",
                  b: "Scope, retainer, timeline. Work starts with a clear record of what you're trying to accomplish.",
                },
              ].map((s) => (
                <div key={s.n}>
                  <div
                    style={{
                      fontFamily: "var(--font-head)",
                      fontStyle: "italic",
                      fontSize: "2.75rem",
                      fontWeight: 400,
                      color: "var(--accent-readable)",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {s.n}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "var(--fg)",
                      marginBottom: 8,
                    }}
                  >
                    {s.h}
                  </h3>
                  <p
                    style={{
                      fontSize: ".875rem",
                      lineHeight: 1.8,
                      color: "var(--muted-fg)",
                    }}
                  >
                    {s.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────── */}
        <section
          className="sec"
          style={{
            background: "var(--muted)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="shell">
            <div
              className="g-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(1.75rem,2.8vw,2.6rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.12,
                    marginBottom: "1.25rem",
                  }}
                >
                  If any of this sounds like your situation.
                </h2>
                <p
                  style={{
                    fontSize: ".9375rem",
                    lineHeight: 1.85,
                    color: "var(--muted-fg)",
                    marginBottom: "2rem",
                  }}
                >
                  The intake is structured and short. You&apos;ll hear back
                  within one business day after the conflict check.
                </p>
                <div
                  className="final-cta-row"
                  style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
                >
                  <Link
                    href="/contact"
                    className="final-cta-schedule"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: ".9rem",
                      padding: "12px 24px",
                      borderRadius: 6,
                      background: "var(--primary)",
                      color: "var(--white)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Schedule a Consultation
                  </Link>
                  <a
                    href={PHONE_HREF}
                    className="final-cta-call"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: ".9rem",
                      padding: "12px 24px",
                      borderRadius: 6,
                      background: "transparent",
                      color: "var(--accent-readable)",
                      border: "1.5px solid var(--accent)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <PhoneIcon />
                    Call the Office
                  </a>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Image
                  src="/images/naultlawoffice.jpg"
                  alt="Nault Law Office"
                  width={900}
                  height={675}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
