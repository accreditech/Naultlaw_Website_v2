"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type ArticleCardData = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  img: string;
  date: string;
  read: string;
  featured?: boolean;
};

type Props = {
  articles: ArticleCardData[];
  categories: string[];
};

export function ArticlesIndex({ articles, categories }: Props) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (cat !== "All" && a.category !== cat) return false;
      if (q && !`${a.title} ${a.excerpt}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [articles, cat, q]);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);
  const showFeatured = cat === "All" && q === "" && !!featured;

  return (
    <main className="fade-in">
      {/* Hero */}
      <section style={{ background: "var(--primary)", paddingBlock: "5rem" }}>
        <div className="shell">
          <div
            className="g-articles-header"
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "4rem",
              alignItems: "end",
            }}
          >
            <div>
              <p className="eyebrow light" style={{ marginBottom: 12 }}>
                Articles
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
                  marginBottom: "1rem",
                }}
              >
                Notes from the practice.
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,.6)",
                  maxWidth: 540,
                }}
              >
                Short, practical writing on commercial leasing, TREC matters,
                real estate disputes, and the industry issues that sit
                underneath them.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                style={{
                  width: "100%",
                  fontFamily: "var(--font-body)",
                  fontSize: ".925rem",
                  padding: "14px 16px 14px 44px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,.18)",
                  background: "rgba(255,255,255,.06)",
                  color: "var(--white)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky category filter */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--white)",
          position: "sticky",
          top: 80,
          zIndex: 50,
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            paddingBlock: 14,
            overflowX: "auto",
          }}
        >
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".825rem",
                  fontWeight: 500,
                  padding: "7px 14px",
                  borderRadius: 20,
                  cursor: "pointer",
                  background: active ? "var(--primary)" : "transparent",
                  color: active ? "var(--white)" : "var(--muted-fg)",
                  border: active
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                  whiteSpace: "nowrap",
                  transition: "all .15s",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles grid */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="shell">
          {filtered.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--muted-fg)",
                paddingBlock: "4rem",
                fontSize: ".95rem",
              }}
            >
              No articles match that filter.
            </p>
          ) : (
            <>
              {showFeatured && featured && (
                <Link
                  href={`/articles/${featured.slug}`}
                  className="g-featured"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: "3rem",
                    marginBottom: "4rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    overflow: "hidden",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={featured.img}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div
                    className="featured-article-body"
                    style={{
                      padding: "3rem 2.5rem 3rem 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: ".72rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: ".16em",
                        color: "var(--accent-readable)",
                        marginBottom: 14,
                      }}
                    >
                      Featured · {featured.category}
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-head)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "clamp(1.5rem,2.4vw,2rem)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.12,
                        marginBottom: "1rem",
                      }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      style={{
                        fontSize: ".95rem",
                        lineHeight: 1.8,
                        color: "var(--muted-fg)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {featured.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontSize: ".8rem",
                        color: "var(--muted-fg)",
                      }}
                    >
                      <span>{featured.date}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{featured.read} read</span>
                    </div>
                  </div>
                </Link>
              )}

              <div
                className="g-cards-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "1.75rem",
                }}
              >
                {(showFeatured ? rest : filtered).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    style={{
                      background: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      overflow: "hidden",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
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
                        src={a.img}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                      <p
                        style={{
                          fontSize: ".66rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: ".16em",
                          color: "var(--accent-readable)",
                          marginBottom: 10,
                        }}
                      >
                        {a.category}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-head)",
                          fontStyle: "italic",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          lineHeight: 1.3,
                          color: "var(--fg)",
                          marginBottom: 10,
                        }}
                      >
                        {a.title}
                      </h3>
                      <p
                        style={{
                          fontSize: ".85rem",
                          lineHeight: 1.7,
                          color: "var(--muted-fg)",
                          marginBottom: 14,
                        }}
                      >
                        {a.excerpt}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: ".75rem",
                          color: "var(--muted-fg)",
                        }}
                      >
                        <span>{a.date}</span>
                        <span style={{ opacity: 0.4 }}>·</span>
                        <span>{a.read} read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
