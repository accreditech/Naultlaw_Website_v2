import "server-only";

import { getPracticeArea } from "@/lib/content/practice-areas";
import type { StageOneIntakeInput } from "@/lib/intake";
import { siteConfig } from "@/lib/site-config";

export type CrmSyncResult = {
  status: "success" | "failed" | "skipped";
  endpoint: string | null;
  responseStatus?: number;
  responseBody?: string;
  errorMessage?: string;
  payload: Record<string, unknown>;
};

function optionalValue(value?: string | null) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Build the CRM payload following the contract documented by the CRM team:
 *
 *   matter.valueAtStake (string | null)
 *   analytics.utmSource / utmMedium / utmCampaign / utmTerm / utmContent
 *   analytics.referrerUrl
 *   analytics.journey (array of {path, ts}, max 50 entries)
 *
 * Unrecognized fields are silently stripped on the CRM side, so over-sending
 * is safe — but we keep the shape clean and only send fields they support.
 */
function buildCrmPayload({
  leadId,
  intake,
  source,
}: {
  leadId: string;
  intake: StageOneIntakeInput;
  source?: { name?: string; form?: string; intakeStage?: string };
}): Record<string, unknown> {
  const submittedAt = new Date().toISOString();
  const practiceArea = intake.practiceArea
    ? getPracticeArea(intake.practiceArea)
    : null;
  const sourceName =
    source?.name ??
    optionalValue(process.env.CRM_SOURCE_NAME) ??
    "Website Consultation Intake";
  const formLabel = source?.form ?? "stage-one";
  const intakeStage = source?.intakeStage ?? "stage-one";
  const practiceAreaTitle = practiceArea?.title ?? null;
  const practiceAreaSlug = intake.practiceArea ?? null;
  const companyName = optionalValue(intake.companyName);
  const propertyAddress = optionalValue(intake.propertyAddress);
  const sourcePath = optionalValue(intake.sourcePath) ?? "/contact";
  const referralSource = optionalValue(intake.referralSource);
  const issueType = optionalValue(intake.issueType);
  const opposingParties = optionalValue(intake.opposingParties);
  const valueAtStake = optionalValue(intake.valueAtStake);
  const description = optionalValue(intake.description);
  const pendingMatter =
    intake.pendingMatter === "yes"
      ? true
      : intake.pendingMatter === "no"
        ? false
        : null;
  const urgencyDeadline = optionalValue(intake.urgencyDeadline);
  const county = optionalValue(intake.county);

  // Summary line — falls back gracefully when fields are missing
  const summaryParts: string[] = [];
  if (practiceAreaTitle) summaryParts.push(`${practiceAreaTitle} inquiry`);
  else summaryParts.push("Website inquiry");
  summaryParts.push(`from ${intake.name}`);
  if (county) summaryParts.push(`in ${county}`);
  const summaryLine = summaryParts.join(" ");

  const internalSummaryParts: string[] = [`${summaryLine}.`];
  if (issueType) internalSummaryParts.push(`Issue type: ${issueType}.`);
  if (referralSource) internalSummaryParts.push(`Referral source: ${referralSource}.`);
  if (urgencyDeadline) internalSummaryParts.push(`Urgency: ${urgencyDeadline}.`);
  if (valueAtStake) internalSummaryParts.push(`Value at stake: ${valueAtStake}.`);
  if (description) internalSummaryParts.push(`Description: ${description}`);

  const tags: string[] = ["website-intake", intakeStage];
  if (practiceAreaSlug) tags.push(practiceAreaSlug);
  if (county) tags.push(county.toLowerCase().replace(/\s+/g, "-"));
  if (pendingMatter === true) tags.push("pending-matter");
  if (pendingMatter === false) tags.push("no-pending-matter");
  if (valueAtStake) tags.push(`value-${valueAtStake.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
  if (intake.utmSource) tags.push(`utm-${intake.utmSource}`);

  return {
    source: {
      name: sourceName,
      channel: "website",
      form: formLabel,
      leadId,
      submittedAt,
      sourcePath,
      siteUrl: siteConfig.url,
    },
    office: {
      firmName: siteConfig.firmName,
      attorneyName: siteConfig.attorneyName,
      officeAddress: siteConfig.officeLabel,
      officePhone: siteConfig.phoneLabel,
      intakeEmail: siteConfig.email,
    },
    contact: {
      name: intake.name,
      companyName,
      email: intake.email.toLowerCase(),
      phone: intake.phone,
      county,
      referralSource,
    },
    matter: {
      practiceAreaSlug,
      practiceAreaTitle,
      issueType,
      opposingParties,
      propertyAddress,
      pendingMatter,
      urgencyDeadline,
      valueAtStake,
      description,
    },
    analytics: {
      utmSource: optionalValue(intake.utmSource),
      utmMedium: optionalValue(intake.utmMedium),
      utmCampaign: optionalValue(intake.utmCampaign),
      utmTerm: optionalValue(intake.utmTerm),
      utmContent: optionalValue(intake.utmContent),
      referrerUrl: optionalValue(intake.referrerUrl),
      landingPath: optionalValue(intake.landingPath),
      journey: Array.isArray(intake.journey) ? intake.journey : [],
    },
    workflow: {
      leadStatus: "new",
      intakeStage,
      stageTwoStatus: "planned",
      requestedAction: siteConfig.primaryCta.label,
      conflictScreenRequested: true,
    },
    compliance: {
      noAttorneyClientRelationshipCreated: true,
      confidentialFactsDeferred: true,
      documentsDeferredUntilRequested: true,
      acknowledgmentAccepted: intake.acknowledgment,
      warningsShown: [
        "Do not submit confidential facts or documents yet.",
        "Submission does not create an attorney-client relationship.",
        "Detailed information may be requested only after conflicts and fit review.",
      ],
    },
    routing: {
      positioningStatement: siteConfig.positioningStatement,
      primaryServiceCounties: siteConfig.serviceCounties,
      secondaryReach: siteConfig.secondaryReach,
      tags,
    },
    notes: {
      summaryLine,
      internalSummary: internalSummaryParts.join(" "),
    },
    screeningInput: {
      name: intake.name,
      companyName,
      email: intake.email.toLowerCase(),
      phone: intake.phone,
      county,
      opposingParties,
      practiceArea: practiceAreaSlug,
      practiceAreaTitle,
      issueType,
      propertyAddress,
      pendingMatter,
      urgencyDeadline,
      referralSource,
      acknowledgment: intake.acknowledgment,
    },
  };
}

export async function syncLeadToCrm({
  leadId,
  intake,
  source,
}: {
  leadId: string;
  intake: StageOneIntakeInput;
  source?: { name?: string; form?: string; intakeStage?: string };
}): Promise<CrmSyncResult> {
  const endpoint = process.env.CRM_WEBHOOK_URL ?? null;
  const sourceName =
    optionalValue(process.env.CRM_SOURCE_NAME) ?? "Website Consultation Intake";
  const payload = buildCrmPayload({ leadId, intake, source });

  if (!endpoint) {
    return {
      status: "skipped",
      endpoint: null,
      errorMessage: "CRM_WEBHOOK_URL is not configured.",
      payload,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CRM-Source": sourceName,
        "X-Lead-Id": leadId,
        ...(process.env.CRM_API_KEY
          ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseBody = await response.text();

    if (!response.ok) {
      return {
        status: "failed",
        endpoint,
        responseStatus: response.status,
        responseBody,
        errorMessage: "CRM responded with a non-success status.",
        payload,
      };
    }

    return {
      status: "success",
      endpoint,
      responseStatus: response.status,
      responseBody,
      payload,
    };
  } catch (error) {
    return {
      status: "failed",
      endpoint,
      errorMessage:
        error instanceof Error ? error.message : "Unknown CRM sync error.",
      payload,
    };
  }
}
