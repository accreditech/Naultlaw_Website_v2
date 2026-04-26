"use client";

/**
 * Stage-One intake form (simplified V2).
 *
 * Required fields: Name, Email, Phone, Acknowledgment.
 * Everything else is optional. Dropdowns default to "Select one…" with no
 * value behind it so blank submissions never get lied-about defaults.
 *
 * Design decisions baked in:
 *   - Phone auto-formats as (XXX) XXX-XXXX while the user types
 *   - Required fields are flagged with a red asterisk + aria-required
 *   - Submit-time validation surfaces all missing fields in a banner
 *     at the top of the form, not just inline errors
 *   - Visitor context (UTM, journey, referrer, landing path) is read
 *     from sessionStorage at submit time and posted along
 *   - Honeypot field, form-load timestamp, and IP rate limiting handled
 *     server-side by the existing /api/intake route
 */

import {
  startTransition,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  bestTimeOptions,
  pendingMatterOptions,
  stageOneDefaults,
  urgencyOptions,
  valueAtStakeOptions,
} from "@/lib/intake";
import { siteConfig } from "@/lib/site-config";
import { readVisitorContextForSubmit } from "@/lib/visitor-tracking";

const ACCENT_FOCUS = "var(--accent)";
const BORDER_DEFAULT = "var(--border)";

type FormData = typeof stageOneDefaults;

const REQUIRED_LABELS: Record<string, string> = {
  name: "Full Name or Company Name",
  email: "Email Address",
  phone: "Phone",
  acknowledgment: "Confirmation checkbox",
};

/** Auto-format a digit-string into US phone format. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    fontFamily: "var(--font-body)",
    fontSize: ".9375rem",
    padding: "11px 14px",
    minHeight: 48,
    border: `1px solid ${hasError ? "#b4462f" : BORDER_DEFAULT}`,
    borderRadius: 6,
    background: "var(--white)",
    color: "var(--fg)",
    outline: "none",
  };
}

function selectStyle(hasValue: boolean, hasError: boolean): React.CSSProperties {
  return {
    ...inputStyle(hasError),
    color: hasValue ? "var(--fg)" : "var(--muted-fg)",
    appearance: "none",
    backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"12\\" height=\\"12\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"%23637074\\" stroke-width=\\"2\\"><polyline points=\\"6 9 12 15 18 9\\"/></svg>")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
  };
}

function RequiredAsterisk() {
  return (
    <span
      aria-hidden="true"
      style={{ color: "#b4462f", marginLeft: 4, fontWeight: 700 }}
    >
      *
    </span>
  );
}

const DESCRIPTION_MAX = 1500;

export function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>(() => ({
    ...stageOneDefaults,
  }));
  // Form-load timestamp written once at mount; used server-side for
  // suspiciously-fast submission detection.
  const [formStartedAt] = useState(() => Date.now().toString());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [, startNav] = useTransition();

  // Optional ?ref= query param on inbound links (e.g., /contact?ref=/articles/...)
  // is captured as the canonical sourcePath. The visitor-tracker also captures
  // landingPath separately (the FIRST page of the session).
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref && ref !== formData.sourcePath) {
      setFormData((prev) => ({ ...prev, sourcePath: ref }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  /** Build the list of missing-required-field messages for the banner. */
  const missingRequired = useMemo(() => {
    if (!Object.keys(errors).length) return [] as string[];
    return Object.keys(errors)
      .filter((k) => REQUIRED_LABELS[k])
      .map((k) => REQUIRED_LABELS[k]);
  }, [errors]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    // Client-side required-field check. Server-side Zod is the source of truth,
    // but a quick client check prevents an obviously-blank submission round-trip.
    const localErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      localErrors.name = "Please enter your full name or company name.";
    }
    if (!formData.email.trim()) {
      localErrors.email = "Please enter your email address.";
    }
    if (!formData.phone.replace(/\D/g, "").trim()) {
      localErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      localErrors.phone = "Please enter a 10-digit phone number.";
    }
    if (!formData.acknowledgment) {
      localErrors.acknowledgment =
        "Please confirm that you understand the intake acknowledgment before submitting.";
    }
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setSubmitting(false);
      requestAnimationFrame(() => {
        const banner = document.getElementById("intake-error-banner");
        banner?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    // Read visitor-tracking context from sessionStorage (UTM, journey, etc.)
    const visitor = readVisitorContextForSubmit();

    const payload = {
      ...formData,
      ...visitor,
      formStartedAt,
    };

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.fieldErrors && typeof result.fieldErrors === "object") {
          setErrors(result.fieldErrors);
        }
        setSubmitError(
          result.error ??
            "We could not submit your request right now. Please call the office if the matter is urgent."
        );
        setSubmitting(false);
        requestAnimationFrame(() => {
          const banner = document.getElementById("intake-error-banner");
          banner?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }

      startTransition(() => {
        startNav(() => {
          router.push(result.redirectUrl ?? "/contact/stage-two");
        });
      });
    } catch {
      setSubmitError(
        "We could not submit your request right now. Please call the office if the matter is urgent."
      );
      setSubmitting(false);
    }
  }

  const phoneDigitCount = formData.phone.replace(/\D/g, "").length;

  return (
    <div className="surface-card" style={{ overflow: "hidden" }}>
      {/* Header strip */}
      <div
        style={{
          padding: "1.5rem clamp(1.25rem, 3vw, 2rem)",
          borderBottom: `1px solid ${BORDER_DEFAULT}`,
          background: "var(--white)",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: 6 }}>
          Stage 1 — Intake
        </p>
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
            letterSpacing: "-0.02em",
            color: "var(--fg)",
          }}
        >
          Schedule a consultation review
        </h2>
        <p
          style={{
            marginTop: 6,
            fontSize: ".875rem",
            color: "var(--muted-fg)",
            lineHeight: 1.6,
          }}
        >
          Just the basics for now. Anything you skip can be filled in later.
        </p>
      </div>

      <form
        id="intake-form"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={submitting}
        style={{
          padding: "clamp(1.5rem, 3vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          background: "var(--white)",
        }}
      >
        {/* Required-field error banner */}
        {(missingRequired.length > 0 || submitError) && (
          <div
            id="intake-error-banner"
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
            {missingRequired.length > 0 && (
              <p>
                <strong>Please complete:</strong>{" "}
                {missingRequired.join(", ")}.
              </p>
            )}
            {submitError && <p style={{ marginTop: 4 }}>{submitError}</p>}
          </div>
        )}

        {/* Honeypot — hidden from real users + screen readers */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => update("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -10000,
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        />

        {/* Name */}
        <div>
          <label
            htmlFor="intake-name"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Full Name or Company Name
            <RequiredAsterisk />
          </label>
          <input
            id="intake-name"
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            style={inputStyle(Boolean(errors.name))}
            onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
            onBlur={(e) =>
              (e.target.style.borderColor = errors.name
                ? "#b4462f"
                : BORDER_DEFAULT)
            }
          />
          {errors.name && (
            <p
              style={{
                marginTop: 6,
                fontSize: ".75rem",
                color: "#b4462f",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email + Phone — two columns */}
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
              htmlFor="intake-email"
              style={{
                display: "block",
                fontSize: ".8125rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: 6,
              }}
            >
              Email Address
              <RequiredAsterisk />
            </label>
            <input
              id="intake-email"
              type="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              style={inputStyle(Boolean(errors.email))}
              onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.email
                  ? "#b4462f"
                  : BORDER_DEFAULT)
              }
            />
            {errors.email && (
              <p
                style={{
                  marginTop: 6,
                  fontSize: ".75rem",
                  color: "#b4462f",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="intake-phone"
              style={{
                display: "block",
                fontSize: ".8125rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: 6,
              }}
            >
              Phone
              <RequiredAsterisk />
            </label>
            <input
              id="intake-phone"
              type="tel"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              inputMode="tel"
              placeholder="(615) 555-0100"
              value={formData.phone}
              onChange={(e) => update("phone", formatPhone(e.target.value))}
              style={inputStyle(Boolean(errors.phone))}
              onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.phone
                  ? "#b4462f"
                  : BORDER_DEFAULT)
              }
            />
            {errors.phone && (
              <p
                style={{
                  marginTop: 6,
                  fontSize: ".75rem",
                  color: "#b4462f",
                }}
              >
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Approximate value at stake */}
        <div>
          <label
            htmlFor="intake-value"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Approximate value at stake{" "}
            <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
              (optional)
            </span>
          </label>
          <select
            id="intake-value"
            value={formData.valueAtStake}
            onChange={(e) => update("valueAtStake", e.target.value)}
            style={selectStyle(Boolean(formData.valueAtStake), false)}
          >
            <option value="">Select one…</option>
            {valueAtStakeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Pending matter + Urgency — two columns */}
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
              htmlFor="intake-pending"
              style={{
                display: "block",
                fontSize: ".8125rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: 6,
              }}
            >
              Pending lawsuit or complaint?{" "}
              <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
                (optional)
              </span>
            </label>
            <select
              id="intake-pending"
              value={formData.pendingMatter}
              onChange={(e) => update("pendingMatter", e.target.value)}
              style={selectStyle(Boolean(formData.pendingMatter), false)}
            >
              <option value="">Select one…</option>
              {pendingMatterOptions.map((o) => (
                <option key={o} value={o}>
                  {o === "yes" ? "Yes" : "No"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="intake-urgency"
              style={{
                display: "block",
                fontSize: ".8125rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: 6,
              }}
            >
              Urgency or deadline{" "}
              <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
                (optional)
              </span>
            </label>
            <select
              id="intake-urgency"
              value={formData.urgencyDeadline}
              onChange={(e) => update("urgencyDeadline", e.target.value)}
              style={selectStyle(Boolean(formData.urgencyDeadline), false)}
            >
              <option value="">Select one…</option>
              {urgencyOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Best time for calls */}
        <div>
          <label
            htmlFor="intake-besttime"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            Best time for calls{" "}
            <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
              (optional)
            </span>
          </label>
          <select
            id="intake-besttime"
            value={formData.bestTime}
            onChange={(e) => update("bestTime", e.target.value)}
            style={selectStyle(Boolean(formData.bestTime), false)}
          >
            <option value="">Select one…</option>
            {bestTimeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Brief description */}
        <div>
          <label
            htmlFor="intake-description"
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
            <span>
              Brief description of the situation and current status{" "}
              <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
                (optional)
              </span>
            </span>
            <span
              style={{
                fontWeight: 400,
                fontSize: ".7rem",
                color:
                  formData.description.length > DESCRIPTION_MAX
                    ? "#b4462f"
                    : "var(--muted-fg)",
              }}
            >
              {formData.description.length} / {DESCRIPTION_MAX}
            </span>
          </label>
          <div
            style={{
              background: "#fbf6ec",
              border: "1px solid var(--accent)",
              borderRadius: 6,
              padding: "10px 14px",
              marginBottom: 10,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-readable)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 2 }}
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p
              style={{
                fontSize: ".78rem",
                lineHeight: 1.65,
                color: "var(--fg)",
              }}
            >
              <strong>Keep this high-level.</strong> Do not share privileged
              or confidential facts until a written engagement is signed.
              Stick to: what kind of matter, who&apos;s involved (including
              the opposing party if any — names only, no backstory),
              where you are in the process (have you been sued? if so,
              what county?), and the outcome you&apos;re looking for.
              Detailed facts come after the conflict check clears.
            </p>
          </div>
          <textarea
            id="intake-description"
            rows={5}
            maxLength={DESCRIPTION_MAX}
            value={formData.description}
            onChange={(e) =>
              update("description", e.target.value.slice(0, DESCRIPTION_MAX))
            }
            placeholder="Example: Commercial lease dispute with landlord over CAM reconciliation. Looking for a review of the lease and options to respond."
            style={{
              ...inputStyle(false),
              resize: "vertical",
              minHeight: 120,
            }}
            onFocus={(e) => (e.target.style.borderColor = ACCENT_FOCUS)}
            onBlur={(e) => (e.target.style.borderColor = BORDER_DEFAULT)}
          />
        </div>

        {/* How did you hear */}
        <div>
          <label
            htmlFor="intake-referral"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            How did you hear about this office?{" "}
            <span style={{ fontWeight: 400, color: "var(--muted-fg)" }}>
              (optional)
            </span>
          </label>
          <select
            id="intake-referral"
            value={formData.referralSource}
            onChange={(e) => update("referralSource", e.target.value)}
            style={selectStyle(Boolean(formData.referralSource), false)}
          >
            <option value="">Select one…</option>
            {siteConfig.referralSources.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Acknowledgment */}
        <div
          style={{
            marginTop: ".5rem",
            padding: "1rem 1.25rem",
            borderRadius: 8,
            background: "var(--muted)",
          }}
        >
          <label
            htmlFor="intake-ack"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              fontSize: ".875rem",
              lineHeight: 1.6,
              color: "var(--fg)",
              cursor: "pointer",
            }}
          >
            <input
              id="intake-ack"
              type="checkbox"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.acknowledgment)}
              checked={formData.acknowledgment}
              onChange={(e) => update("acknowledgment", e.target.checked)}
              style={{
                marginTop: 3,
                width: 18,
                height: 18,
                accentColor: "var(--accent-readable)",
                flexShrink: 0,
              }}
            />
            <span>
              I understand that submitting this form does not create an
              attorney-client relationship. I have not included confidential
              information, and I have reviewed and agree to the{" "}
              <Link
                href="/legal"
                style={{
                  color: "var(--accent-readable)",
                  textDecoration: "underline",
                }}
              >
                Site Terms and Privacy Policy
              </Link>
              .
              <RequiredAsterisk />
            </span>
          </label>
          {errors.acknowledgment && (
            <p
              style={{
                marginTop: 8,
                marginLeft: 30,
                fontSize: ".75rem",
                color: "#b4462f",
              }}
            >
              {errors.acknowledgment}
            </p>
          )}
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
            transition: "opacity .15s",
          }}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>

        <p
          style={{
            fontSize: ".75rem",
            color: "var(--muted-fg)",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          Need to reach the office directly? Call{" "}
          <a
            href={siteConfig.phoneHref}
            style={{ color: "var(--accent-readable)" }}
          >
            {siteConfig.phoneLabel}
          </a>
          .
        </p>
        {/* Phone digit count surfaced for accessibility users */}
        <span className="sr-only" aria-live="polite">
          {phoneDigitCount > 0 && phoneDigitCount < 10
            ? `Phone number has ${phoneDigitCount} of 10 digits.`
            : ""}
        </span>
      </form>
    </div>
  );
}
