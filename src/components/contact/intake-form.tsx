"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { DisclosurePanel } from "@/components/site/disclosure-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { practiceAreaOptions } from "@/lib/content/practice-areas";
import {
  getIssueTypeOptions,
  pendingMatterOptions,
  stageOneDefaults,
  stageOneIntakeSchema,
  urgencyOptions,
} from "@/lib/intake";
import { publicDisclosures } from "@/lib/public-disclosures";
import { siteConfig } from "@/lib/site-config";

const selectCls =
  "flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent";

export function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState(() => ({
    ...stageOneDefaults,
    formStartedAt: Date.now().toString(),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const issueTypeOptions = getIssueTypeOptions(formData.practiceArea);

  // Populate sourcePath from ?ref= query param
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setFormData((current) => ({
        ...current,
        sourcePath: ref.startsWith("/") ? ref : `/${ref}`,
      }));
    }
  }, [searchParams]);

  function updateField(name: string, value: string | boolean) {
    setFormData((current) => {
      if (name === "practiceArea") {
        const nextOptions = getIssueTypeOptions(String(value));
        return {
          ...current,
          practiceArea: String(value),
          issueType: nextOptions.includes(current.issueType)
            ? current.issueType
            : (nextOptions[0] ?? ""),
        };
      }
      return { ...current, [name]: value };
    });

    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmissionError(null);

    const parsed = stageOneIntakeSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.issues.reduce<Record<string, string>>(
        (acc, issue) => {
          const key = issue.path.join(".");
          if (!acc[key]) acc[key] = issue.message;
          return acc;
        },
        {}
      );
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setSubmissionError(
          result.error ??
            "We could not submit your consultation request right now. Please call the office if the matter is urgent."
        );
        setSubmitting(false);
        return;
      }

      startTransition(() => {
        router.push(result.redirectUrl);
      });
    } catch {
      setSubmissionError(
        "We could not submit your consultation request right now. Please call the office if the matter is urgent."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="surface-card overflow-hidden">
      {/* Form header */}
      <div className="border-b border-border px-6 py-6 sm:px-8">
        <p className="eyebrow text-muted-foreground">Stage 1 — Conflict Screen</p>
        <h2 className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">
          Schedule a consultation review
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {publicDisclosures.contactShortWarning}
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <DisclosurePanel
          title={publicDisclosures.intakeWarning.title}
          paragraphs={publicDisclosures.intakeWarning.paragraphs}
          tone="warning"
        />

        <form
          id="conflict-screen"
          className="mt-6 scroll-mt-32 space-y-5"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={submitting}
        >
          {/* Row 1: Name + Company */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              name="name"
              value={formData.name}
              error={errors.name}
              onChange={updateField}
              autoComplete="name"
            />
            <Field
              label="Company name"
              name="companyName"
              value={formData.companyName}
              error={errors.companyName}
              onChange={updateField}
              optional
              autoComplete="organization"
            />
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={updateField}
              autoComplete="email"
              inputMode="email"
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              error={errors.phone}
              onChange={updateField}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          {/* Row 3: County + Practice area */}
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="County"
              name="county"
              value={formData.county}
              error={errors.county}
              options={[...siteConfig.counties]}
              onChange={updateField}
            />
            <SelectField
              label="Practice area"
              name="practiceArea"
              value={formData.practiceArea}
              error={errors.practiceArea}
              options={practiceAreaOptions.map((item) => item.label)}
              values={practiceAreaOptions.map((item) => item.value)}
              onChange={updateField}
            />
          </div>

          {/* Row 4: Opposing party + Issue type */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Opposing party or parties"
              name="opposingParties"
              value={formData.opposingParties}
              error={errors.opposingParties}
              onChange={updateField}
            />
            <SelectField
              label="Issue type"
              name="issueType"
              value={formData.issueType}
              error={errors.issueType}
              options={issueTypeOptions}
              onChange={updateField}
            />
          </div>

          {/* Row 5: Property address + Pending matter */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Property address"
              name="propertyAddress"
              value={formData.propertyAddress}
              error={errors.propertyAddress}
              onChange={updateField}
              optional
              autoComplete="street-address"
            />
            <SelectField
              label="Pending lawsuit, complaint, or admin matter"
              name="pendingMatter"
              value={formData.pendingMatter}
              error={errors.pendingMatter}
              options={pendingMatterOptions.map((v) => (v === "yes" ? "Yes" : "No"))}
              values={[...pendingMatterOptions]}
              onChange={updateField}
            />
          </div>

          {/* Row 6: Urgency + Referral */}
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Urgency or deadline"
              name="urgencyDeadline"
              value={formData.urgencyDeadline}
              error={errors.urgencyDeadline}
              options={[...urgencyOptions]}
              onChange={updateField}
            />
            <SelectField
              label="How did you find us"
              name="referralSource"
              value={formData.referralSource}
              error={errors.referralSource}
              options={[...siteConfig.referralSources]}
              onChange={updateField}
            />
          </div>

          {/* Honeypot — hidden from assistive technology */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Acknowledgment */}
          <div className="rounded-xl border border-border bg-muted/40 px-4 py-4">
            <label htmlFor="acknowledgment" className="flex items-start gap-3">
              <input
                id="acknowledgment"
                type="checkbox"
                checked={formData.acknowledgment}
                onChange={(e) => updateField("acknowledgment", e.target.checked)}
                aria-invalid={Boolean(errors.acknowledgment)}
                aria-describedby={
                  errors.acknowledgment ? "acknowledgment-error" : undefined
                }
                className="mt-1 size-4 rounded border border-border accent-accent"
              />
              <span className="text-sm leading-6 text-muted-foreground">
                {publicDisclosures.intakeCheckboxAcknowledgment}
              </span>
            </label>
            {errors.acknowledgment && (
              <p
                id="acknowledgment-error"
                className="mt-2 text-xs text-destructive"
                role="alert"
              >
                {errors.acknowledgment}
              </p>
            )}
          </div>

          {/* Submission error */}
          {submissionError && (
            <div
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-4 text-sm text-destructive"
              role="alert"
            >
              {submissionError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full justify-center"
            disabled={submitting}
          >
            {submitting ? (
              "Submitting…"
            ) : (
              <>
                Submit Consultation Request
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  autoComplete,
  inputMode,
}: FieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {optional && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  values?: string[];
  onChange: (name: string, value: string) => void;
  error?: string;
};

function SelectField({
  label,
  name,
  value,
  options,
  values,
  onChange,
  error,
}: SelectFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={selectCls}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      >
        {options.map((option, i) => (
          <option key={option} value={values?.[i] ?? option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
