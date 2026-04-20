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

export const urgencyOptions = [
  "Immediate deadline within 48 hours",
  "This week",
  "Within 30 days",
  "Planning ahead",
] as const;

export const pendingMatterOptions = ["yes", "no"] as const;
export const stageTwoOtherIssueLabel = "Other matter within this practice area";

export const stageOneIntakeSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    companyName: z.string().trim().max(120).optional().default(""),
    email: z.email().trim().max(160),
    phone: z
      .string()
      .trim()
      .min(10)
      .max(32)
      .regex(/^[0-9+().\-\s]+$/, "Enter a valid phone number."),
    county: z.enum(countyValues),
    opposingParties: z.string().trim().min(2).max(180),
    practiceArea: z.enum(practiceAreaValues),
    issueType: z.string().trim().min(2).max(160),
    propertyAddress: z.string().trim().max(180).optional().default(""),
    pendingMatter: z.enum(pendingMatterOptions),
    urgencyDeadline: z.enum(urgencyOptions),
    referralSource: z.enum(referralValues),
    acknowledgment: z
      .boolean()
      .refine((value) => value, {
        message:
          "Please confirm that you understand the intake acknowledgment before submitting.",
      }),
    website: z.string().trim().max(0).optional().default(""),
    formStartedAt: z.string().trim().min(1),
    sourcePath: z.string().trim().max(200).optional().default(""),
  })
  .superRefine((value, context) => {
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

export function getIssueTypeOptions(practiceAreaSlug?: string) {
  const practiceArea = practiceAreas.find(
    (entry) => entry.slug === practiceAreaSlug
  );

  if (!practiceArea) {
    return [];
  }

  return [...practiceArea.issueTypes, stageTwoOtherIssueLabel];
}

export function evaluateSpamSignals(input: StageOneIntakeInput) {
  const startedAt = Number(input.formStartedAt);
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;
  const honeypotHit = input.website.trim().length > 0;
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

export function formatFieldErrors(error: z.ZodError<StageOneIntakeInput>) {
  return error.issues.reduce<Record<string, string>>((accumulator, issue) => {
    const key = issue.path.join(".");
    if (!accumulator[key]) {
      accumulator[key] = issue.message;
    }
    return accumulator;
  }, {});
}

export const stageOneDefaults: Omit<StageOneIntakeInput, "formStartedAt"> = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  county: "Sumner County",
  opposingParties: "",
  practiceArea: practiceAreaValues[0],
  issueType: practiceAreas[0]?.issueTypes[0] ?? "",
  propertyAddress: "",
  pendingMatter: "no",
  urgencyDeadline: "Planning ahead",
  referralSource: "Online search",
  acknowledgment: false,
  website: "",
  sourcePath: "/contact",
};
