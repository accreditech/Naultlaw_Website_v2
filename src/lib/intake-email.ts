/**
 * Client-confirmation + admin-BCC email for new intake submissions.
 *
 * Sender: noreply@naultlaw.com (replies bounce by design)
 * Recipient: the prospect's email
 * BCC: admin@naultlaw.com (interim staff notification until the CRM team
 *      ships their own staff-side notification)
 *
 * Subject: "NaultLaw Intake — {Name} — {leadId-short}" — gives Steve a
 * unique-per-submission identifier to filter on in his inbox.
 *
 * Driver: Resend (RESEND_API_KEY env var). If the key is missing (e.g.,
 * local dev without keys), the function logs and returns a soft "skipped"
 * status instead of throwing — the lead is still saved to DB and CRM.
 *
 * Repeat-IP signal: if the same hashed IP has submitted before, we surface
 * that to the BCC body so Steve knows it's a returning visitor without
 * ever exposing the actual IP address.
 */

import "server-only";

import { Resend } from "resend";

import type { StageOneIntakeInput } from "@/lib/intake";
import { findPriorLeadsByIpHash } from "@/lib/intake-server";
import { siteConfig } from "@/lib/site-config";

const FROM = "Nault Law Intake <noreply@naultlaw.com>";
const BCC = "admin@naultlaw.com";

export type EmailResult =
  | { status: "sent"; id: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; error: string };

function shortLeadId(id: string) {
  return id.split("-")[0] ?? id.slice(0, 8);
}

function escape(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRow(label: string, value: string | null | undefined): string {
  if (!value || value.trim().length === 0) return "";
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#637074;font-size:13px;vertical-align:top;width:38%;">${escape(label)}</td>
      <td style="padding:6px 0;color:#12232c;font-size:13px;line-height:1.6;">${escape(value)}</td>
    </tr>`;
}

/** Build the HTML email body — same layout for client + admin BCC. */
function buildEmailHtml({
  intake,
  leadId,
  priorCount,
  priorRecent,
}: {
  intake: StageOneIntakeInput;
  leadId: string;
  priorCount: number;
  priorRecent: Array<{ name: string; createdAt: Date | string }>;
}): string {
  const summary = [
    fieldRow("Name", intake.name),
    fieldRow("Email", intake.email),
    fieldRow("Phone", intake.phone),
    fieldRow("Approximate value at stake", intake.valueAtStake),
    fieldRow(
      "Pending lawsuit",
      intake.pendingMatter === "yes"
        ? "Yes"
        : intake.pendingMatter === "no"
          ? "No"
          : null
    ),
    fieldRow("Urgency", intake.urgencyDeadline),
    fieldRow("Best time to call", intake.bestTime),
    fieldRow("How they heard", intake.referralSource),
    fieldRow("Description", intake.description),
  ]
    .filter(Boolean)
    .join("");

  const utmSource = intake.utmSource;
  const utmCampaign = intake.utmCampaign;
  const referrer = intake.referrerUrl;
  const showAttribution = utmSource || utmCampaign || referrer;

  const journey = Array.isArray(intake.journey) ? intake.journey : [];
  const journeyLines = journey
    .slice(-8) // most recent 8 — full set is in DB
    .map((entry) => `• ${escape(entry.path)}`)
    .join("<br>");

  const priorIpBlock =
    priorCount > 0
      ? `
    <tr>
      <td colspan="2" style="padding:14px 12px 6px 0;color:#7a2e1a;font-size:13px;background:#fcefe9;border-left:3px solid #b4462f;">
        <strong>This visitor has submitted ${priorCount} prior lead${priorCount === 1 ? "" : "s"} from the same connection.</strong>
        ${priorRecent.length > 0
          ? `<br><span style="color:#637074;">Most recent: ${escape(priorRecent[0].name)} on ${new Date(priorRecent[0].createdAt).toLocaleDateString()}.</span>`
          : ""}
      </td>
    </tr>`
      : "";

  const attributionBlock = showAttribution
    ? `
    <tr><td colspan="2" style="padding-top:18px;"><div style="border-top:1px solid #e2ddd7;"></div></td></tr>
    <tr>
      <td colspan="2" style="padding:10px 0 4px;color:#637074;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;font-weight:600;">
        Source
      </td>
    </tr>
    ${fieldRow("UTM source", utmSource)}
    ${fieldRow("UTM campaign", utmCampaign)}
    ${fieldRow("Referrer", referrer)}
    ${fieldRow("Landing page", intake.landingPath)}
    ${journey.length > 0 ? `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#637074;font-size:13px;vertical-align:top;width:38%;">Pages browsed</td>
      <td style="padding:6px 0;color:#12232c;font-size:13px;line-height:1.7;">${journeyLines}</td>
    </tr>` : ""}
    `
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>NaultLaw Intake</title>
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#12232c;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#faf9f7;padding:36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border:1px solid #e2ddd7;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:32px 36px 18px;border-bottom:1px solid #e2ddd7;background:#12232c;color:#ffffff;">
              <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-style:italic;font-weight:500;font-size:24px;color:#ffffff;">
                Thanks — your message is in.
              </h1>
              <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(255,255,255,0.72);">
                The Law Office of Stephen Nault has received your inquiry.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 36px 8px;">
              <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#12232c;">
                Hi ${escape(intake.name.split(/\s+/)[0])},
              </p>
              <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#12232c;">
                This is a confirmation that your inquiry has been received.
                Typical turnaround is <strong>1–3 business days</strong>.
                For anything time-sensitive, please call the office directly
                at <a href="tel:+16159539505" style="color:#7c5f30;">${siteConfig.phoneLabel}</a>.
              </p>
              <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#12232c;">
                For your records, here is what was submitted:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #e2ddd7;">
                ${priorIpBlock}
                ${summary}
                ${attributionBlock}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 28px;border-top:1px solid #e2ddd7;background:#f5f2ee;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.7;color:#637074;">
                <strong>The Law Office of Stephen Nault</strong><br>
                121 S. Hickory Ave, Gallatin, TN 37066<br>
                <a href="tel:+16159539505" style="color:#7c5f30;">${siteConfig.phoneLabel}</a>
                &nbsp;·&nbsp;
                <a href="${siteConfig.url}" style="color:#7c5f30;">${siteConfig.url.replace(/^https?:\/\//, "")}</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;line-height:1.6;color:#9aa0a3;">
                This is an automated confirmation — replies to this address are not monitored.
                To follow up, please call the office or use the contact form on the website.
                This message does not create an attorney-client relationship.
                See <a href="${siteConfig.url}/legal" style="color:#7c5f30;">Site Terms and Privacy Policy</a>.
                Reference ID: ${escape(leadId)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Send the client-confirmation + admin-BCC email after a successful intake. */
export async function sendIntakeEmail({
  leadId,
  intake,
  ipHash,
}: {
  leadId: string;
  intake: StageOneIntakeInput;
  ipHash: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "skipped",
      reason: "RESEND_API_KEY is not configured.",
    };
  }
  if (!intake.email) {
    return {
      status: "skipped",
      reason: "Lead has no email address — confirmation cannot be sent.",
    };
  }

  // Look up prior leads by the SAME hashed IP to surface a "repeat visitor"
  // signal in the BCC body. Never exposes the actual IP.
  const prior = await findPriorLeadsByIpHash({
    ipHash,
    excludeLeadId: leadId,
    limit: 5,
  }).catch(() => []);

  const html = buildEmailHtml({
    intake,
    leadId,
    priorCount: prior.length,
    priorRecent: prior.map((p) => ({
      name: p.name,
      createdAt: p.createdAt,
    })),
  });

  const subject = `NaultLaw Intake — ${intake.name} — ${shortLeadId(leadId)}`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: intake.email,
      bcc: BCC,
      subject,
      html,
      replyTo: BCC, // any client reply goes to admin@ (not noreply)
      headers: {
        "X-Entity-Ref-ID": leadId,
        "X-NaultLaw-Form": "stage-one-intake",
      },
    });
    if (error) {
      return {
        status: "failed",
        error:
          typeof error === "string"
            ? error
            : (error as { message?: string }).message ?? "Unknown Resend error.",
      };
    }
    return { status: "sent", id: data?.id ?? "unknown" };
  } catch (e) {
    return {
      status: "failed",
      error: e instanceof Error ? e.message : "Unknown Resend exception.",
    };
  }
}
