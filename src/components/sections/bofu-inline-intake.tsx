"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  bestTimeOptions,
  urgencyOptions,
  valueAtStakeOptions,
} from "@/lib/intake";
import { readVisitorContextForSubmit } from "@/lib/visitor-tracking";

/**
 * Inline mini-intake form rendered at the bottom of every BOFU page.
 *
 * Captures Name + Email + Phone + the legal acknowledgment, posts to the
 * existing /api/intake endpoint with sourcePath set to the BOFU page URL,
 * and on success navigates the visitor to /contact/stage-two?lead=<id>
 * for the longer "tell us about your matter" form.
 *
 * Backend is unchanged — the API treats this as a normal stage-one
 * submission. Visitor-tracking context (UTM, referrer, landing path,
 * journey) is bundled into the same payload.
 */

type Props = {
  /** BOFU page slug, used as sourcePath = /services/<refSlug>. */
  refSlug: string;
  /** Optional heading override; defaults to a generic prompt. */
  heading?: string;
  /** Optional supporting line; defaults to "what happens next" copy. */
  intro?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  /** Optional triage signals — same enum values as the full /contact form. */
  urgencyDeadline: string;
  valueAtStake: string;
  bestTime: string;
  /** Optional context — same fields as the full /contact form. */
  opposingParties: string;
  description: string;
  acknowledgment: boolean;
  /** Honeypot — bots fill, humans leave blank. */
  website: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  urgencyDeadline: "",
  valueAtStake: "",
  bestTime: "",
  opposingParties: "",
  description: "",
  acknowledgment: false,
  website: "",
};

export function BofuInlineIntakeForm({ refSlug, heading, intro }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now().toString());

  const sourcePath = useMemo(() => `/services/${refSlug}`, [refSlug]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const localErrors: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      localErrors.name = "Please enter your full name or company name.";
    }
    if (!formData.email.trim()) {
      localErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      localErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.replace(/\D/g, "").trim()) {
      localErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      localErrors.phone = "Please enter a 10-digit phone number.";
    }
    if (!formData.acknowledgment) {
      localErrors.acknowledgment =
        "Please confirm the acknowledgment before submitting.";
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setSubmitting(false);
      return;
    }

    const visitor = readVisitorContextForSubmit();

    const payload = {
      ...formData,
      ...visitor,
      formStartedAt,
      sourcePath,
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
          const remoteErrors: Partial<Record<keyof FormState, string>> = {};
          for (const key of Object.keys(result.fieldErrors) as Array<
            keyof FormState
          >) {
            remoteErrors[key] = String(result.fieldErrors[key]);
          }
          setErrors(remoteErrors);
        }
        setSubmitError(
          result.error ??
            "We could not submit your request right now. Please call the office if the matter is urgent."
        );
        setSubmitting(false);
        return;
      }

      const redirectUrl =
        typeof result.redirectUrl === "string" && result.redirectUrl.length > 0
          ? result.redirectUrl
          : `/contact/stage-two?lead=${encodeURIComponent(result.leadId ?? "")}`;
      router.push(redirectUrl);
    } catch {
      setSubmitError(
        "We could not reach the server. Please call the office if the matter is urgent."
      );
      setSubmitting(false);
    }
  }

  return (
    <div id="bofu-intake" className="surface-card scroll-mt-24 p-6 sm:p-8">
      <p className="font-heading text-xl text-foreground sm:text-2xl">
        {heading ?? "Schedule a Consultation"}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {intro ??
          "The intake is structured and short — name, contact, opposing party, brief description. You'll hear back within one business day if the matter is a fit."}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {/* Honeypot — visually hidden, no autocomplete */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor={`bofu-website-${refSlug}`}>Website</label>
          <input
            id={`bofu-website-${refSlug}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`bofu-name-${refSlug}`}
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Full name or company name
          </label>
          <input
            id={`bofu-name-${refSlug}`}
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          {errors.name && (
            <p className="text-xs text-red-700">{errors.name}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`bofu-email-${refSlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Email
            </label>
            <input
              id={`bofu-email-${refSlug}`}
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            {errors.email && (
              <p className="text-xs text-red-700">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`bofu-phone-${refSlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Phone
            </label>
            <input
              id={`bofu-phone-${refSlug}`}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            {errors.phone && (
              <p className="text-xs text-red-700">{errors.phone}</p>
            )}
          </div>
        </div>

        <details className="rounded-lg border border-dashed border-border bg-muted/20 p-4 sm:p-5">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
            Add details — optional
          </summary>
          <div className="mt-4 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`bofu-urgency-${refSlug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Urgency
                </label>
                <select
                  id={`bofu-urgency-${refSlug}`}
                  value={formData.urgencyDeadline}
                  onChange={(e) => update("urgencyDeadline", e.target.value)}
                  className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="">Select…</option>
                  {urgencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`bofu-value-${refSlug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Value at stake
                </label>
                <select
                  id={`bofu-value-${refSlug}`}
                  value={formData.valueAtStake}
                  onChange={(e) => update("valueAtStake", e.target.value)}
                  className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="">Select…</option>
                  {valueAtStakeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`bofu-besttime-${refSlug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Best time to reach you
                </label>
                <select
                  id={`bofu-besttime-${refSlug}`}
                  value={formData.bestTime}
                  onChange={(e) => update("bestTime", e.target.value)}
                  className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="">Select…</option>
                  {bestTimeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`bofu-opposing-${refSlug}`}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Opposing party
              </label>
              <input
                id={`bofu-opposing-${refSlug}`}
                type="text"
                autoComplete="off"
                value={formData.opposingParties}
                onChange={(e) => update("opposingParties", e.target.value)}
                placeholder="Name of any opposing person, business, or counsel"
                className="h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`bofu-description-${refSlug}`}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Brief description
              </label>
              <textarea
                id={`bofu-description-${refSlug}`}
                rows={4}
                value={formData.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="A few sentences about the matter — keep it high-level for now."
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </div>
        </details>

        <div className="flex items-start gap-3">
          <input
            id={`bofu-ack-${refSlug}`}
            type="checkbox"
            checked={formData.acknowledgment}
            onChange={(e) => update("acknowledgment", e.target.checked)}
            aria-invalid={Boolean(errors.acknowledgment)}
            className="mt-1 size-4 shrink-0 rounded border-border text-accent focus:ring-2 focus:ring-accent/30"
          />
          <label
            htmlFor={`bofu-ack-${refSlug}`}
            className="text-xs leading-5 text-muted-foreground"
          >
            I understand this is intake information only — submitting does not
            create an attorney-client relationship — and I have reviewed and
            agree to the{" "}
            <Link
              href="/legal"
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              website terms
            </Link>
            .
          </label>
        </div>
        {errors.acknowledgment && (
          <p className="text-xs text-red-700">{errors.acknowledgment}</p>
        )}

        {submitError && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            {submitError}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit"}
          </button>
          <p className="text-xs text-muted-foreground">
            Response within one business day.
          </p>
        </div>
      </form>
    </div>
  );
}
