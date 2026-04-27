import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Stephen Nault",
  description:
    "Stephen C. Nault — Tennessee attorney, licensed real estate broker, TREC course instructor, and Rule 31 listed mediator. Based in Gallatin, serving Middle Tennessee.",
  path: "/about",
});

const TIMELINE = [
  {
    y: "2012",
    t: "Licensed Tennessee Real Estate Agent",
    d: "Began working full-time in residential and commercial real estate across Middle Tennessee.",
  },
  {
    y: "2018",
    t: "Admitted to the Tennessee Bar",
    d: "Licensed to practice law in all Tennessee state courts and the U.S. District Court, Middle District of Tennessee.",
  },
  {
    y: "2020",
    t: "TREC Course Instructor License",
    d: "Approved to teach continuing education coursework to Tennessee real estate licensees.",
  },
  {
    y: "2021",
    t: "Managing Broker",
    d: "Day-to-day operational responsibility for brokerage compliance, affiliate supervision, and trust accounting.",
  },
  {
    y: "2023",
    t: "Rule 31 Listed Mediator",
    d: "Completed the Tennessee Supreme Court's civil mediator training and listed for general civil matters.",
  },
];

const APPROACH = [
  {
    h: "One attorney, start to finish.",
    b: "Your intake isn't triaged to an associate. The person who takes the fit call is the person drafting the filings.",
  },
  {
    h: "Industry-informed, not just book-learned.",
    b: "Real estate law reads differently when you've spent years actually selling and leasing property. That grounding changes what questions get asked.",
  },
  {
    h: "A dispute-resolution orientation.",
    b: "Being a Rule 31 mediator shapes how every problem gets framed — whether mediation is on the table or not. The goal is the outcome, not the fight.",
  },
  {
    h: "Scope-clear engagements.",
    b: "Every matter starts with a written scope. You'll know what's included, what isn't, and what happens if the matter expands.",
  },
];

const MEMBERSHIPS = [
  {
    h: "Tennessee Bar Association",
    d: "Real Estate Law Section; Business Law Section.",
  },
  {
    h: "Sumner County Bar Association",
    d: "Active member, Middle Tennessee bench-bar programs.",
  },
  {
    h: "Tennessee REALTORS®",
    d: "Continuing participation in the broker community and continuing education tracks.",
  },
  {
    h: "TREC Continuing Education",
    d: "Licensed course instructor; writes and delivers coursework on compliance and brokerage practice.",
  },
];

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
      marginTop: 10,
    }}
  />
);

export default function AboutPage() {
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg,rgba(18,35,44,1) 0%,rgba(18,35,44,.85) 60%,rgba(18,35,44,.6) 100%)",
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
              About · Stephen C. Nault
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
              Lawyer, broker, instructor — in that order of how the work gets
              done.
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,.72)",
                marginBottom: "1rem",
              }}
            >
              Stephen Nault practices business and real estate law in Gallatin,
              Tennessee. Before law school he spent six years as a Tennessee
              licensed real estate agent, and he continues to hold an active
              managing broker&apos;s license alongside his law practice.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,.72)",
              }}
            >
              That combination — attorney, broker, TREC instructor, and Rule
              31 mediator — shapes how matters are analyzed from intake
              through resolution.
            </p>
          </div>
          <div
            style={{
              background: "var(--white)",
              borderRadius: 10,
              padding: "1.25rem",
              boxShadow: "0 24px 60px rgba(0,0,0,.35)",
            }}
          >
            <Image
              src="/images/stephen-nault-headshot.jpg"
              alt="Stephen Nault"
              width={720}
              height={900}
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="shell">
          <div
            className="g-sidebar"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <div
              className="no-sticky-mobile"
              style={{ position: "sticky", top: 100 }}
            >
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
                  marginBottom: "1rem",
                }}
              >
                Direct, prepared, and limited in scope.
              </h2>
              <p
                style={{
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  color: "var(--muted-fg)",
                }}
              >
                A practice run by one attorney rather than a team by design.
                Every matter is evaluated, scoped, and handled by the same
                person.
              </p>
            </div>
            <div>
              {APPROACH.map((pt) => (
                <div
                  key={pt.h}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.25rem",
                    paddingBlock: "1.5rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <AccentDot />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "var(--fg)",
                        marginBottom: 6,
                      }}
                    >
                      {pt.h}
                    </p>
                    <p
                      style={{
                        fontSize: ".9rem",
                        lineHeight: 1.75,
                        color: "var(--muted-fg)",
                      }}
                    >
                      {pt.b}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="sec" style={{ background: "var(--muted)" }}>
        <div className="shell">
          <div style={{ maxWidth: 560, marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Background
            </p>
            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.75rem,2.8vw,2.4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
              }}
            >
              The professional record.
            </h2>
          </div>
          <div style={{ position: "relative", maxWidth: 780 }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 70,
                top: 8,
                bottom: 8,
                width: 1,
                background: "var(--border)",
              }}
            />
            {TIMELINE.map((e) => (
              <div
                key={e.y}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "2rem",
                  paddingBlock: "1.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontSize: "1.6rem",
                    color: "var(--accent-readable)",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {e.y}
                </div>
                <div>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 64,
                      top: "1.9rem",
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: "var(--muted)",
                      border: "2px solid var(--accent)",
                    }}
                  />
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "var(--fg)",
                      marginBottom: 4,
                    }}
                  >
                    {e.t}
                  </p>
                  <p
                    style={{
                      fontSize: ".9rem",
                      lineHeight: 1.75,
                      color: "var(--muted-fg)",
                    }}
                  >
                    {e.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="sec" style={{ background: "var(--white)" }}>
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
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Memberships &amp; Activities
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.6rem,2.5vw,2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                }}
              >
                Where the work sits in the broader profession.
              </h2>
            </div>
            <div
              className="g-cards-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              {MEMBERSHIPS.map((m) => (
                <div
                  key={m.h}
                  style={{
                    paddingBlock: "1rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: ".95rem",
                      color: "var(--fg)",
                      marginBottom: 6,
                    }}
                  >
                    {m.h}
                  </p>
                  <p
                    style={{
                      fontSize: ".875rem",
                      lineHeight: 1.7,
                      color: "var(--muted-fg)",
                    }}
                  >
                    {m.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="sec"
        style={{
          background: "var(--muted)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          className="shell"
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}
        >
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
            Discuss your matter directly.
          </h2>
          <p
            style={{
              fontSize: ".95rem",
              lineHeight: 1.8,
              color: "var(--muted-fg)",
              marginBottom: "2rem",
            }}
          >
            The intake is short and conflict-screened. You&apos;ll hear back
            within one business day.
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
      </section>
    </main>
  );
}
