"use client";

import { useEffect, useState } from "react";
import type { HomepageTestimonial } from "@/lib/content/testimonials";

type Props = { testimonials: readonly HomepageTestimonial[] };

export function TestimonialCarousel({ testimonials }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

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
            marginBottom: "2rem",
          }}
        >
          What his clients are saying.
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial ${i + 1}`}
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
      <div style={{ position: "relative", minHeight: 180 }}>
        {testimonials.map((t, i) => (
          <div
            key={t.name + i}
            aria-hidden={i !== idx}
            style={{
              position: i === idx ? "relative" : "absolute",
              opacity: i === idx ? 1 : 0,
              top: 0,
              left: 0,
              right: 0,
              transition: "opacity .5s",
              pointerEvents: i === idx ? "auto" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-head)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem,1.8vw,1.35rem)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,.88)",
                marginBottom: "1.5rem",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,.65)",
                }}
              >
                {t.name} · {t.dateLabel} · {t.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
