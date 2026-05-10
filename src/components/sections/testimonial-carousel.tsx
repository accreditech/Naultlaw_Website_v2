"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HomepageTestimonial } from "@/lib/content/testimonials";

type Props = { testimonials: readonly HomepageTestimonial[] };

const ROTATION_MS = 9000;
const TRUNCATE_AT = 220;

function StarRow({ count }: { count: number }) {
  return (
    <div
      aria-label={`${count} out of 5 stars`}
      role="img"
      style={{ display: "inline-flex", gap: 2, color: "var(--accent)" }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewerAvatar({
  name,
  photoFilename,
}: {
  name: string;
  photoFilename?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((p) => p.replace(/[^A-Za-z]/g, "")[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (photoFilename && !imgFailed) {
    return (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          background: "rgba(255,255,255,.12)",
          position: "relative",
        }}
      >
        <Image
          src={`/reviews/${photoFilename}`}
          alt={`Photo of ${name}`}
          fill
          sizes="48px"
          style={{ objectFit: "cover" }}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(201,169,110,.18)",
        color: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontFamily: "var(--font-head)",
        fontSize: ".95rem",
        fontWeight: 600,
        letterSpacing: ".02em",
      }}
    >
      {initials || "•"}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,.22)",
        background: "transparent",
        color: "rgba(255,255,255,.85)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background .15s, border-color .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,.08)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "rgba(255,255,255,.22)";
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

export function TestimonialCarousel({ testimonials }: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, ROTATION_MS);
    return () => clearInterval(t);
  }, [testimonials.length, paused]);

  if (!testimonials.length) return null;

  const goPrev = () => {
    setPaused(true);
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  };
  const goNext = () => {
    setPaused(true);
    setIdx((i) => (i + 1) % testimonials.length);
  };
  const jumpTo = (i: number) => {
    setPaused(true);
    setIdx(i);
  };
  const toggleExpand = (i: number) => {
    setPaused(true);
    setExpanded((s) => ({ ...s, [i]: !s[i] }));
  };

  return (
    <div
      className="g-split"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "5rem",
        alignItems: "center",
      }}
    >
      <div>
        <p className="eyebrow light" style={{ marginBottom: 12 }}>
          Client Reviews
        </p>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(1.75rem,2.5vw,2.4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "var(--white)",
            marginBottom: "1.5rem",
          }}
        >
          What his clients are saying.
        </h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Show review ${i + 1}`}
              style={{
                minWidth: 28,
                width: i === idx ? 44 : 28,
                height: 44,
                padding: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: i === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    i === idx ? "var(--accent)" : "rgba(255,255,255,.2)",
                  transition: "all .3s",
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowButton direction="prev" onClick={goPrev} />
          </div>
          <div style={{ flex: 1, minHeight: 180 }}>
            {testimonials.map((t, i) => {
              const isActive = i === idx;
              const isLong = t.quote.length > TRUNCATE_AT;
              const isExpanded = !!expanded[i];
              const visibleQuote =
                isLong && !isExpanded
                  ? t.quote
                      .slice(0, TRUNCATE_AT)
                      .replace(/\s+\S*$/, "")
                      .trimEnd()
                  : t.quote;
              return (
                <div
                  key={t.name + i}
                  aria-hidden={!isActive}
                  style={{
                    position: isActive ? "relative" : "absolute",
                    opacity: isActive ? 1 : 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    transition: "opacity .5s",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div style={{ marginBottom: 10 }}>
                    <StarRow count={t.rating} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-head)",
                      fontStyle: "italic",
                      fontSize: "clamp(1.05rem,1.7vw,1.3rem)",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,.9)",
                      marginBottom: "1rem",
                    }}
                  >
                    &ldquo;{visibleQuote}
                    {isLong && !isExpanded ? (
                      <>
                        {"… "}
                        <button
                          type="button"
                          onClick={() => toggleExpand(i)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--accent)",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontStyle: "normal",
                            fontSize: ".82rem",
                            fontWeight: 600,
                            letterSpacing: ".04em",
                            textTransform: "uppercase",
                            padding: 0,
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                        >
                          Read more
                        </button>
                      </>
                    ) : null}
                    &rdquo;
                    {isLong && isExpanded ? (
                      <>
                        {" "}
                        <button
                          type="button"
                          onClick={() => toggleExpand(i)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--accent)",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontStyle: "normal",
                            fontSize: ".82rem",
                            fontWeight: 600,
                            letterSpacing: ".04em",
                            textTransform: "uppercase",
                            padding: 0,
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                        >
                          Show less
                        </button>
                      </>
                    ) : null}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <ReviewerAvatar
                      name={t.name}
                      photoFilename={t.photoFilename}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: ".92rem",
                          fontWeight: 600,
                          color: "var(--white)",
                          lineHeight: 1.3,
                        }}
                      >
                        {t.name}
                      </div>
                      {t.context ? (
                        <div
                          style={{
                            fontSize: ".78rem",
                            color: "rgba(255,255,255,.65)",
                            lineHeight: 1.4,
                            marginTop: 2,
                          }}
                        >
                          {t.context}
                        </div>
                      ) : null}
                      <div
                        style={{
                          fontSize: ".72rem",
                          color: "rgba(255,255,255,.5)",
                          lineHeight: 1.4,
                          marginTop: 2,
                          letterSpacing: ".02em",
                        }}
                      >
                        {[t.location, t.dateLabel, t.source]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowButton direction="next" onClick={goNext} />
          </div>
        </div>
      </div>
    </div>
  );
}
