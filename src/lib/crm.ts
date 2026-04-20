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

function optionalValue(value?: string) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function buildCrmPayload({
  leadId,
  intake,
}: {
  leadId: string;
  intake: StageOneIntakeInput;
}): Record<string, unknown> {
  const submittedAt = new Date().toISOString();
  const practiceArea = getPracticeArea(intake.practiceArea);
  const sourceName =
    optionalValue(process.env.CRM_SOURCE_NAME) ?? "Website Consultation Intake";
  const practiceAreaTitle = practiceArea?.title ?? intake.practiceArea;
  const companyName = optionalValue(intake.companyName);
  const propertyAddress = optionalValue(intake.propertyAddress);
  const sourcePath = optionalValue(intake.sourcePath) ?? "/contact";
  const pendingMatter = intake.pendingMatter === "yes";
  const summaryLine = `${practiceAreaTitle} inquiry from ${intake.name} in ${intake.county}`;

  return {
    source: {
      name: sourceName,
      channel: "website",
      form: "stage-one-conflict-screen",
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
      county: intake.county,
      referralSource: intake.referralSource,
    },
    matter: {
      practiceAreaSlug: intake.practiceArea,
      practiceAreaTitle,
      issueType: intake.issueType,
      opposingParties: intake.opposingParties,
      propertyAddress,
      pendingMatter,
      urgencyDeadline: intake.urgencyDeadline,
    },
    workflow: {
      leadStatus: "new",
      intakeStage: "stage-one",
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
      tags: [
        "website-intake",
        "stage-one",
        intake.practiceArea,
        intake.county,
        pendingMatter ? "pending-matter" : "no-pending-matter",
      ],
    },
    notes: {
      summaryLine,
      internalSummary:
        `${summaryLine}. Issue type: ${intake.issueType}. ` +
        `Referral source: ${intake.referralSource}. ` +
        `Urgency: ${intake.urgencyDeadline}.`,
    },
    screeningInput: {
      name: intake.name,
      companyName,
      email: intake.email.toLowerCase(),
      phone: intake.phone,
      county: intake.county,
      opposingParties: intake.opposingParties,
      practiceArea: intake.practiceArea,
      practiceAreaTitle,
      issueType: intake.issueType,
      propertyAddress,
      pendingMatter,
      urgencyDeadline: intake.urgencyDeadline,
      referralSource: intake.referralSource,
      acknowledgment: intake.acknowledgment,
    },
  };
}

export async function syncLeadToCrm({
  leadId,
  intake,
}: {
  leadId: string;
  intake: StageOneIntakeInput;
}): Promise<CrmSyncResult> {
  const endpoint = process.env.CRM_WEBHOOK_URL ?? null;
  const sourceName =
    optionalValue(process.env.CRM_SOURCE_NAME) ?? "Website Consultation Intake";
  const payload = buildCrmPayload({ leadId, intake });

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
