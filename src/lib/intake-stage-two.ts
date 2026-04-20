import { z } from "zod";

import { getPracticeArea, practiceAreas } from "@/lib/content/practice-areas";

export type StageTwoFieldConfig = {
  name: string;
  label: string;
  description: string;
  type: "text" | "textarea" | "select";
  options?: readonly string[];
  optional?: boolean;
  placeholder?: string;
  rows?: number;
};

export type StageTwoBranch = {
  practiceArea: string;
  title: string;
  description: string;
  caution: string;
  checklist: string[];
  fields: StageTwoFieldConfig[];
  schema: z.ZodTypeAny;
  summarize: (values: Record<string, unknown>) => string;
};

const practiceAreaValues = practiceAreas.map((entry) => entry.slug) as [
  string,
  ...string[],
];

export const stageTwoObjectiveOptions = [
  "Understand exposure and next-step options",
  "Prepare a measured response or demand",
  "Support negotiation or settlement planning",
  "Prepare for arbitration or litigation posture",
  "Stabilize an active business or property issue",
] as const;

const commonFields: StageTwoFieldConfig[] = [
  {
    name: "primaryObjective",
    label: "Primary objective",
    description: "Choose the decision or outcome you need this follow-up to support.",
    type: "select",
    options: stageTwoObjectiveOptions,
  },
  {
    name: "timelineSummary",
    label: "Timeline and current posture",
    description:
      "Give a concise chronology of the key dates, notices, and current status. Keep it factual and organized.",
    type: "textarea",
    rows: 5,
  },
  {
    name: "documentsAvailable",
    label: "Core documents available",
    description:
      "List the agreements, notices, filings, emails, or records you have available for review.",
    type: "textarea",
    rows: 4,
  },
  {
    name: "keyContacts",
    label: "Key people involved",
    description:
      "Identify the decision-makers, counterparties, brokers, managers, or counsel who matter most.",
    type: "textarea",
    rows: 3,
    optional: true,
  },
];

const stageTwoBaseSchema = z.object({
  leadId: z.string().uuid(),
  practiceArea: z.enum(practiceAreaValues),
  primaryObjective: z.enum(stageTwoObjectiveOptions),
  timelineSummary: z.string().trim().min(20).max(1200),
  documentsAvailable: z.string().trim().min(10).max(800),
  keyContacts: z.string().trim().max(500).optional().default(""),
  officeRequestedFollowUp: z.boolean().refine((value) => value, {
    message:
      "Please confirm that the office has asked you to complete this branch-specific follow-up.",
  }),
  noConfidentialAttachments: z.boolean().refine((value) => value, {
    message:
      "Please confirm that you are not uploading documents or sending materials outside the requested structured fields.",
  }),
  website: z.string().trim().max(0).optional().default(""),
  formStartedAt: z.string().trim().min(1),
  sourcePath: z.string().trim().max(200).optional().default("/contact/stage-two"),
});

export type StageTwoSubmissionPayload = z.infer<typeof stageTwoBaseSchema> &
  Record<string, unknown>;

const leaseStages = [
  "New lease or LOI stage",
  "Existing lease performance problem",
  "Renewal, amendment, or estoppel stage",
  "Assignment, sublease, or exit planning stage",
] as const;

const noticePostures = [
  "No formal notice sent yet",
  "Sent a notice or demand",
  "Received a notice or demand",
  "Deadline or cure period is already running",
] as const;

const trecLicenseRoles = [
  "Affiliate broker",
  "Principal broker or managing broker",
  "Brokerage entity or team leader",
  "Attorney or referral source gathering the record",
] as const;

const trecComplaintStages = [
  "Complaint or inquiry just arrived",
  "Response deadline is pending",
  "Preliminary response already sent",
  "Parallel civil demand or threat is active",
] as const;

const ownerEntityTypes = [
  "LLC",
  "Corporation",
  "Partnership or JV",
  "Real-estate-holding entity",
] as const;

const ownerControlIssues = [
  "Manager or member authority dispute",
  "Buyout, deadlock, or separation pressure",
  "Books and records access issue",
  "Capital, distributions, or account-control conflict",
] as const;

const currentPostures = [
  "Internal assessment only",
  "Preparing for a demand or response",
  "Negotiation is active but unclear",
  "Formal dispute action is being considered now",
] as const;

const desiredWorkProducts = [
  "Claims-and-defenses assessment",
  "Document chronology and risk map",
  "Decision memo on next-step options",
  "Pre-suit strategy and pressure-point analysis",
] as const;

export const stageTwoBranches: Record<string, StageTwoBranch> = {
  "commercial-leasing": {
    practiceArea: "commercial-leasing",
    title: "Commercial Leasing Follow-Up",
    description:
      "Use this branch to organize the lease posture, notices, business objective, and property context behind the next move.",
    caution:
      "This follow-up is intended for targeted chronology and lease posture, not a long narrative or document upload.",
    checklist: [
      "Lease or LOI stage",
      "Current notices and deadlines",
      "Property and occupancy context",
      "Practical business objective",
    ],
    schema: stageTwoBaseSchema.extend({
      leaseStage: z.enum(leaseStages),
      noticePosture: z.enum(noticePostures),
      propertyContext: z.string().trim().min(3).max(180),
      requestedOutcome: z.string().trim().min(3).max(220),
    }),
    fields: [
      ...commonFields,
      {
        name: "leaseStage",
        label: "Lease stage",
        description: "Identify where the deal or dispute sits right now.",
        type: "select",
        options: leaseStages,
      },
      {
        name: "noticePosture",
        label: "Notice posture",
        description: "Clarify whether a demand, default notice, or cure period is active.",
        type: "select",
        options: noticePostures,
      },
      {
        name: "propertyContext",
        label: "Property or use context",
        description: "Describe the property type, tenant use, or operational context.",
        type: "text",
        placeholder: "Example: neighborhood retail, office suite, flex industrial, medical office.",
      },
      {
        name: "requestedOutcome",
        label: "What would a useful outcome look like?",
        description: "State the practical outcome the business wants to preserve or achieve.",
        type: "text",
        placeholder: "Example: stabilize occupancy, respond to notice, negotiate amendment.",
      },
    ],
    summarize: (values) =>
      `${String(values.leaseStage)} / ${String(values.noticePosture)} / ${String(
        values.requestedOutcome
      )}`,
  },
  "trec-defense-and-realtor-complaints": {
    practiceArea: "trec-defense-and-realtor-complaints",
    title: "TREC and Brokerage Follow-Up",
    description:
      "Use this branch to organize the complaint posture, brokerage role, transaction context, and any parallel civil exposure.",
    caution:
      "Keep this response disciplined. The goal is to organize the file and pressure points, not to submit an emotional narrative.",
    checklist: [
      "License or brokerage role",
      "Complaint and response posture",
      "Transaction context",
      "Parallel civil risk",
    ],
    schema: stageTwoBaseSchema.extend({
      licenseRole: z.enum(trecLicenseRoles),
      complaintStage: z.enum(trecComplaintStages),
      transactionContext: z.string().trim().min(3).max(200),
      civilExposure: z.string().trim().min(3).max(200),
    }),
    fields: [
      ...commonFields,
      {
        name: "licenseRole",
        label: "Role in the matter",
        description: "Identify whether the follow-up is for an agent, broker, brokerage, or referring lawyer.",
        type: "select",
        options: trecLicenseRoles,
      },
      {
        name: "complaintStage",
        label: "Complaint posture",
        description: "Clarify the current response posture and urgency.",
        type: "select",
        options: trecComplaintStages,
      },
      {
        name: "transactionContext",
        label: "Transaction or office context",
        description: "Briefly describe the transaction, file, or supervision setting.",
        type: "text",
      },
      {
        name: "civilExposure",
        label: "Parallel civil exposure",
        description: "Identify any commission demand, consumer claim, or threatened civil dispute.",
        type: "text",
      },
    ],
    summarize: (values) =>
      `${String(values.licenseRole)} / ${String(values.complaintStage)} / ${String(
        values.civilExposure
      )}`,
  },
  "operating-agreements-and-owner-disputes": {
    practiceArea: "operating-agreements-and-owner-disputes",
    title: "Owner Dispute Follow-Up",
    description:
      "Use this branch to frame the entity structure, control problem, records posture, and the business pressure created by delay.",
    caution:
      "Keep the information structured around ownership, control, and records. The goal is to map the dispute efficiently, not to relive every conversation.",
    checklist: [
      "Entity type and ownership snapshot",
      "Control or governance issue",
      "Records-access posture",
      "Immediate business pressure",
    ],
    schema: stageTwoBaseSchema.extend({
      entityType: z.enum(ownerEntityTypes),
      ownershipSnapshot: z.string().trim().min(5).max(240),
      controlIssue: z.enum(ownerControlIssues),
      businessPressure: z.string().trim().min(5).max(300),
    }),
    fields: [
      ...commonFields,
      {
        name: "entityType",
        label: "Entity type",
        description: "Identify the type of entity at the center of the dispute.",
        type: "select",
        options: ownerEntityTypes,
      },
      {
        name: "ownershipSnapshot",
        label: "Ownership snapshot",
        description: "Summarize the ownership and management structure in plain terms.",
        type: "text",
      },
      {
        name: "controlIssue",
        label: "Main control issue",
        description: "Choose the governance or leverage problem driving the dispute.",
        type: "select",
        options: ownerControlIssues,
      },
      {
        name: "businessPressure",
        label: "Immediate business pressure",
        description: "Describe the part of the business or property operation that is being strained now.",
        type: "textarea",
        rows: 4,
      },
    ],
    summarize: (values) =>
      `${String(values.entityType)} / ${String(values.controlIssue)} / ${String(
        values.businessPressure
      ).slice(0, 70)}`,
  },
  "strategic-case-assessment": {
    practiceArea: "strategic-case-assessment",
    title: "Strategic Case Assessment Follow-Up",
    description:
      "Use this branch to frame the current posture, likely parties, and the kind of work product that would make the next move clearer.",
    caution:
      "This form is built to organize the early strategy work. Keep the information focused on decision points, likely parties, and what you need to understand next.",
    checklist: [
      "Current dispute posture",
      "Likely parties and pressure points",
      "Desired strategic output",
      "Main leverage concern",
    ],
    schema: stageTwoBaseSchema.extend({
      currentPosture: z.enum(currentPostures),
      likelyParties: z.string().trim().min(5).max(240),
      desiredWorkProduct: z.enum(desiredWorkProducts),
      leverageConcerns: z.string().trim().min(5).max(320),
    }),
    fields: [
      ...commonFields,
      {
        name: "currentPosture",
        label: "Current posture",
        description: "Choose the current stage of the matter.",
        type: "select",
        options: currentPostures,
      },
      {
        name: "likelyParties",
        label: "Likely parties or pressure points",
        description: "Identify the people, entities, or property relationships likely to matter most.",
        type: "textarea",
        rows: 3,
      },
      {
        name: "desiredWorkProduct",
        label: "Desired work product",
        description: "What kind of strategic output would be most useful right now?",
        type: "select",
        options: desiredWorkProducts,
      },
      {
        name: "leverageConcerns",
        label: "Main leverage concern",
        description: "Describe the business or litigation concern driving the need for early assessment.",
        type: "textarea",
        rows: 4,
      },
    ],
    summarize: (values) =>
      `${String(values.currentPosture)} / ${String(values.desiredWorkProduct)} / ${String(
        values.primaryObjective
      )}`,
  },
};

export function getStageTwoBranch(practiceArea: string | null | undefined) {
  if (!practiceArea) {
    return undefined;
  }

  return (
    stageTwoBranches[practiceArea] ?? {
      practiceArea,
      title: getPracticeArea(practiceArea)?.title ?? "Matter-Specific Follow-Up",
      description:
        "This branch gathers a structured timeline, available documents, and the practical next-step objective after initial review.",
      caution:
        "Only complete this follow-up if the office has asked you to do so. Keep the response focused and structured rather than narrative-heavy.",
      checklist: ["Core chronology", "Relevant documents", "Key contacts", "Desired practical outcome"],
      schema: stageTwoBaseSchema,
      fields: commonFields,
      summarize: (values) =>
        `${String(values.primaryObjective)} / ${String(values.timelineSummary).slice(0, 80)}`,
    }
  );
}

export function createStageTwoDefaults({
  leadId,
  practiceArea,
}: {
  leadId: string;
  practiceArea: string;
}) {
  const branch = getStageTwoBranch(practiceArea);

  if (!branch) {
    return undefined;
  }

  const defaults: Record<string, string | boolean> = {
    leadId,
    practiceArea,
    primaryObjective: stageTwoObjectiveOptions[0],
    timelineSummary: "",
    documentsAvailable: "",
    keyContacts: "",
    officeRequestedFollowUp: false,
    noConfidentialAttachments: false,
    website: "",
    formStartedAt: Date.now().toString(),
    sourcePath: `/contact/stage-two?lead=${leadId}&practice=${practiceArea}`,
  };

  branch.fields.forEach((field) => {
    if (!(field.name in defaults)) {
      defaults[field.name] = field.type === "select" ? (field.options?.[0] ?? "") : "";
    }
  });

  return defaults;
}

export function evaluateStageTwoSpamSignals(input: {
  website?: string;
  formStartedAt: string;
}) {
  const startedAt = Number(input.formStartedAt);
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;
  const honeypotHit = (input.website ?? "").trim().length > 0;
  const suspiciouslyFast = elapsedMs > 0 && elapsedMs < 3500;
  const staleSubmission = elapsedMs > 1000 * 60 * 60 * 24;

  return {
    honeypotHit,
    suspiciouslyFast,
    staleSubmission,
    elapsedMs,
    blocked: honeypotHit || suspiciouslyFast || staleSubmission,
  };
}

export function formatStageTwoFieldErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string>>((accumulator, issue) => {
    const key = issue.path.join(".");
    if (!accumulator[key]) {
      accumulator[key] = issue.message;
    }
    return accumulator;
  }, {});
}
