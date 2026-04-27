"use client";

/**
 * Stage-Two follow-up form.
 *
 * Renders below the success screen. All fields are optional. Submission
 * POSTs to /api/intake/stage-two which calls the same CRM webhook with
 * the same leadId — the CRM upserts the existing lead with the new info.
 *
 * Pre-fills any fields that were already collected at Stage One (e.g., if
 * the user filled in description on Stage One, that value is shown here
 * with the option to revise it). Pre-fills are passed in via the `defaults`
 * prop from the server component.
 */

import { useState } from "react";

import { practiceAreas } from "@/lib/content/practice-areas";
import { siteConfig } from "@/lib/site-config";

const ACCENT_FOCUS = "var(--accent)";
const BORDER_DEFAULT = "var(--border)";

type Defaults = {
  description: string;
  county: string;
  practiceArea: string;
  issueType: string;
  opposingParties: string;
  propertyAddress: string;
};

type Props = {
  leadId: string;
  defaults: Defaults;
};

const DESCRIPTION_MAX = 4000;

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: ".9375rem",
  padding: "11px 14px",
  minHeight: 48,
  border: `1px solid ${BORDER_DEFAULT}`,
  borderRadius: 6,
  background: "var(--white)",
  color: "var(--fg)",
  outline: "none",
};

function selectStyle(hasValue: boolean): React.CSSProperties {
  return {
    ...inputStyle,
    color: hasValue ? "var(--fg)" : "var(--muted-fg)",
    appearance: "none",
    backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"12\\" height=\\"12\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"%23637074\\" stroke-width=\\"2\\"><polyline points=\\"6 9 12 15 18 9\\"/></svg>")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
  };
}

export function StageTwoForm({ leadId, defaults }: Props) {
  const [data, setData] = useState({
    description: defaults.description,
    county: defaults.county,
    practiceArea: defaults.practiceArea,
    issueType: defaults.issueType,
    opposingParties: defaults.opposingParties,
    propertyAddress: defaults.propertyAddress,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Issue type options cascade from the chosen practice area
  const practiceAreaEntry = practiceAreas.find(
    (entry) => entry.slug === data.practiceArea
  );
  const issueTypes = practiceAreaEntry?.issueTypes ?? [];

  function update<K extends keyof typeof data>(key: K, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
    // Reset issueType if practiceArea changes
    if (key === "practiceArea") {
      setData((prev) => ({ ...prev, [key]: value, issueType: "" }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/intake/stage-two", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSubmitError(
          result.error ??
            "We couldn't save those details right now. Your initial intake is fine — feel free to call the office if you'd like to share more."
        );
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setSubmitError(
        "We couldn't save those details right now. Your initial intake is fine — feel free to call the office if you'd like to share more."
      );
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        style={{
          padding: "1.5rem 1.75rem",
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--accent)",
            margin: "0 auto 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 11l5 5 9-9"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          style={{
            fontFamily: "var(--font-head)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--fg)",
            marginBottom: 6,
          }}
        >
          Saved — thanks.
        </p>
        <p
          style={{
            fontSize: ".9rem",
            lineHeight: 1.6,
            color: "var(--muted-fg)",
          }}
        >
          The office has the additional context. You&apos;ll still hear back
          on the same 1–3 business day timeline.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "clamp(1.5rem, 3vw, 2rem)",
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: 8,
      }}
    >
      {submitError && (
        <div
          role="alert"
          style={{
            padding: "1rem 1.25rem",
            borderRadius: 8,
            border: "1px solid #b4462f",
            background: "#fcefe9",
            color: "#7a2e1a",
            fontSize: ".875rem",
            lineHeight: 1.6,
          }}
        >
          {submitError}
        </div>
      )}

      {/* Description */}
      <div>
        <label
          htmlFor="s2-description"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: ".8125rem",
            fontWeight: 600,
            color: "var(--fg)",
            marginBottom: 6,
          }}
        >
          <span>Brief description of the situation and current status</span>
          <span
            style={{
              fontWeight: 400,
              fontSize: ".7rem",
              color: "var(--muted-fg)",
            }}
          >
            {data.description.length} / {DESCRIPTION_MAX}
          </span>
        </label>
        <textarea
          id="s2-description"
          rows={5}
          maxLength={DESCRIPTION_MAX}
          value={data.description}
          onChange={(e) =>
            update("description", e.target.value.slice(0, DESCRIPTION_MAX))
          }
          placeholder="What kind of matter, who's involved, where things stand. Keep it high-level — detailed facts come after the conflict check."
          style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
          onBlur={(e) => (e.target.style.borderColor = BORDER_DEFAULT)}
        />
      </div>

      {/* County + Practice area */}
      <div
        className="g-form-fields"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
        }}
      >
        <div>
          <label
            htmlFor="s2-county"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            County of the matter
          </label>
          <select
            id="s2-county"
            value={data.county}
            onChange={(e) => update("county", e.target.value)}
            style={selectStyle(Boolean(data.county))}
          >
            <option value="">Select one…</option>
            {siteConfig.counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="s2-practice"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Practice area
          </label>
          <select
            id="s2-practice"
            value={data.practiceArea}
            onChange={(e) => update("practiceArea", e.target.value)}
            style={selectStyle(Boolean(data.practiceArea))}
          >
            <option value="">Select one…</option>
            {practiceAreas.map((pa) => (
              <option key={pa.slug} value={pa.slug}>
                {pa.shortTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Issue type — only if practice area chosen */}
      {issueTypes.length > 0 && (
        <div>
          <label
            htmlFor="s2-issue"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Type of issue
          </label>
          <select
            id="s2-issue"
            value={data.issueType}
            onChange={(e) => update("issueType", e.target.value)}
            style={selectStyle(Boolean(data.issueType))}
          >
            <option value="">Select one…</option>
            {issueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
            <option value="Other matter within this practice area">
              Other matter within this practice area
            </option>
          </select>
        </div>
      )}

      {/* Opposing parties */}
      <div>
        <label
          htmlFor="s2-opposing"
          style={{
            display: "block",
            fontSize: ".8125rem",
            fontWeight: 600,
            color: "var(--fg)",
            marginBottom: 6,
          }}
        >
          Opposing party or parties{" "}
          <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
            (names only — for conflict check)
          </span>
        </label>
        <input
          id="s2-opposing"
          type="text"
          value={data.opposingParties}
          onChange={(e) => update("opposingParties", e.target.value)}
          placeholder="Names of individuals, companies, or brokerages on the other side"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
          onBlur={(e) => (e.target.style.borderColor = BORDER_DEFAULT)}
        />
      </div>

      {/* Property address */}
      <div>
        <label
          htmlFor="s2-property"
          style={{
            display: "block",
            fontSize: ".8125rem",
            fontWeight: 600,
            color: "var(--fg)",
            marginBottom: 6,
          }}
        >
          Property address{" "}
          <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
            (if applicable)
          </span>
        </label>
        <input
          id="s2-property"
          type="text"
          value={data.propertyAddress}
          onChange={(e) => update("propertyAddress", e.target.value)}
          placeholder="Street address, city, state"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
          onBlur={(e) => (e.target.style.borderColor = BORDER_DEFAULT)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          marginTop: ".5rem",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: ".95rem",
          padding: "14px 24px",
          borderRadius: 6,
          background: submitting ? "var(--muted-fg)" : "var(--primary)",
          color: "var(--white)",
          border: "none",
          cursor: submitting ? "wait" : "pointer",
        }}
      >
        {submitting ? "Saving…" : "Save these details"}
      </button>
    </form>
  );
}
