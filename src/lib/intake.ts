/**
 * Intake form validation schema.
 *
 * The simplified intake (V2 launch) collects only Name, Email, Phone, and the
 * acknowledgment checkbox as required fields. Everything else is optional and
 * may be filled in at Stage One or deferred to Stage Two.
 *
 * The Zod schema below mirrors that — every field except the four required
 * ones permits `null`/`undefined`/empty string. Validation is intentionally
 * lenient so people aren't blocked from submitting; richer triage happens in
 * Stage Two and on the CRM side.
 *
 * Schema sections (mirrors the CRM webhook contract):
 *   - Required PII (name, email, phone)
 *   - Optional intake fields (description, value at stake, etc.)
 *   - Hidden tracking fields (UTM, journey, referrer, landing path)
 *   - Compliance/control fields (acknowledgment, honeypot, formStartedAt)
 */

import { z } from "zod";

import { practiceAreas } from "@/lib/content/practice-areas";
import { siteConfig } from "@/lib/site-config";

const countyValues = siteConfig.counties as unknown as [string, ...string[]];
const referralValues = siteConfig.referralSources as unknown as [
  string,
  ...string[],
];
const practiceAreaValues = practiceAreas.map((practiceArea) => practiceArea.slug) as [
  string,
  ...string[],
];

/* ------------------------------------------------------------------ */
/* Public option lists exposed to the form UI                          */
/* ------------------------------------------------------------------ */

export const urgencyOptions = [
  "Immediate deadline within 48 hours",
  "This week",
  "Within 30 days",
  "Planning ahead",
] as const;

export const pendingMatterOptions = ["yes", "no"] as const;

export const bestTimeOptions = [
  "Morning (9–12 CT)",
  "Midday (12–2 CT)",
  "Afternoon (2–5 CT)",
  "Anytime during business hours",
  "After hours / weekends",
  "I'll follow up by email instead",
] as const;

export const valueAtStakeOptions = [
  "Under $25,000",
  "$25,000 – $100,000",
  "$100,000 – $500,000",
  "$500,000 – $1,000,000",
  "Over $1,000,000",
  "Non-monetary (reputation, license, business survival)",
  "Not sure yet",
] as const;

export const stageTwoOtherIssueLabel = "Other matter within this practice area";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** A nullable, optional string that turns empty strings into `undefined`. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined));

/** Optional enum that allows undefined/empty (i.e., user did not pick). */
const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([
      z.enum(values as unknown as [string, ...string[]]),
      z.literal("").transform(() => undefined),
    ])
    .optional();

/** Journey entries captured client-side: path + ISO timestamp. */
export const journeyEntrySchema = z.object({
  path: z.string().trim().max(200),
  ts: z.string().trim().max(40),
});

/* ------------------------------------------------------------------ */
/* Stage One schema                                                    */
/* ------------------------------------------------------------------ */

export const stageOneIntakeSchema = z
  .object({
    /* Required PII -------------------------------------------------- */
    name: z.string().trim().min(2).max(180),
    email: z.email().trim().max(255).transform((v) => v.toLowerCase()),
    phone: z
      .string()
      .trim()
      .min(10)
      .max(40)
      .regex(/^[0-9+().\-\s]+$/, "Enter a valid phone number."),

    /* Optional intake fields --------------------------------------- */
    companyName: optionalText(180),
    description: optionalText(4000),
    valueAtStake: optionalEnum(valueAtStakeOptions),
    bestTime: optionalEnum(bestTimeOptions),
    county: optionalEnum(countyValues),
    opposingParties: optionalText(255),
    practiceArea: optionalEnum(practiceAreaValues),
    issueType: optionalText(180),
    propertyAddress: optionalText(255),
    pendingMatter: optionalEnum(pendingMatterOptions),
    urgencyDeadline: optionalEnum(urgencyOptions),
    referralSource: optionalEnum(referralValues),

    /* Hidden tracking fields (captured by visitor-tracker utility) -- */
    landingPath: optionalText(255),
    referrerUrl: optionalText(2000),
    utmSource: optionalText(160),
    utmMedium: optionalText(160),
    utmCampaign: optionalText(200),
    utmTerm: optionalText(200),
    utmContent: optionalText(200),
    journey: z.array(journeyEntrySchema).max(50).optional(),

    /* Compliance / control ----------------------------------------- */
    acknowledgment: z
      .boolean()
      .refine((value) => value, {
        message:
          "Please confirm that you understand the intake acknowledgment before submitting.",
      }),
    /** Honeypot — bots fill, humans leave blank. */
    website: z.string().trim().max(0).optional().default(""),
    /** Timestamp written when the form first mounts; used for spam timing. */
    formStartedAt: z.string().trim().min(1),
    /** Page where the form was actually submitted from (current URL). */
    sourcePath: z.string().trim().max(255).optional().default("/contact"),
  })
  .superRefine((value, context) => {
    // Only validate issueType against practiceArea when both are present.
    if (!value.practiceArea) return;

    const practiceArea = practiceAreas.find(
      (entry) => entry.slug === value.practiceArea
    );
    if (!practiceArea) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["practiceArea"],
        message: "Choose a practice area.",
      });
      return;
    }

    if (!value.issueType) return;

    const allowedIssues = new Set([
      ...practiceArea.issueTypes,
      stageTwoOtherIssueLabel,
    ]);

    if (!allowedIssues.has(value.issueType)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["issueType"],
        message: "Choose the issue type that best fits your matter.",
      });
    }
  });

export type StageOneIntakeInput = z.infer<typeof stageOneIntakeSchema>;

/* ------------------------------------------------------------------ */
/* Issue-type helper (kept for stage-two flow)                         */
/* ------------------------------------------------------------------ */

export function getIssueTypeOptions(practiceAreaSlug?: string) {
  const practiceArea = practiceAreas.find(
    (entry) => entry.slug === practiceAreaSlug
  );
  if (!practiceArea) return [];
  return [...practiceArea.issueTypes, stageTwoOtherIssueLabel];
}

/* ------------------------------------------------------------------ */
/* Spam signal evaluation                                              */
/* ------------------------------------------------------------------ */

export function evaluateSpamSignals(input: StageOneIntakeInput) {
  const startedAt = Number(input.formStartedAt);
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;
  const honeypotHit = (input.website ?? "").trim().length > 0;
  const suspiciouslyFast = elapsedMs > 0 && elapsedMs < 2500;
  const staleSubmission = elapsedMs > 1000 * 60 * 60 * 24;

  return {
    honeypotHit,
    suspiciouslyFast,
    staleSubmission,
    elapsedMs,
    blocked: honeypotHit || suspiciouslyFast || staleSubmission,
  };
}

/* ------------------------------------------------------------------ */
/* Field-error formatting (used by the API route)                      */
/* ------------------------------------------------------------------ */

export function formatFieldErrors(error: z.ZodError<StageOneIntakeInput>) {
  return error.issues.reduce<Record<string, string>>((accumulator, issue) => {
    const key = issue.path.join(".");
    if (!accumulator[key]) {
      accumulator[key] = issue.message;
    }
    return accumulator;
  }, {});
}

/* ------------------------------------------------------------------ */
/* Form defaults                                                       */
/* ------------------------------------------------------------------ */

/**
 * Initial form state. Every "user must pick" field starts as an empty string
 * so the dropdown shows "Select one…" — never a value the user didn't choose.
 */
export const stageOneDefaults = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  description: "",
  valueAtStake: "",
  bestTime: "",
  county: "",
  opposingParties: "",
  practiceArea: "",
  issueType: "",
  propertyAddress: "",
  pendingMatter: "",
  urgencyDeadline: "",
  referralSource: "",
  acknowledgment: false,
  website: "",
  sourcePath: "/contact",
  // Tracking fields are populated at submit time, not at form mount.
  landingPath: "",
  referrerUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  journey: [] as Array<{ path: string; ts: string }>,
};
