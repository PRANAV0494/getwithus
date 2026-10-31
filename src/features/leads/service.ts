import { createElement } from "react";
import { site } from "@/config/site";
import { issueFormToken, verifyFormToken, verifyTurnstile } from "@/features/leads/bot-checks";
import {
  createLeadWithVerification,
  createVerifiedLead,
  recordLeadEvent,
} from "@/features/leads/repository";
import type { IntegrationLead, LeadSubmission } from "@/features/leads/schema";
import { leadDetails } from "@/features/leads/summary";
import type { Lead, NewLead } from "@/features/leads/types";
import { CODE_TTL_MS } from "@/features/verification/code";
import { newCode, resendAvailableAt, sendCodeEmail } from "@/features/verification/service";
import { logger, maskEmail } from "@/lib/logger";
import { ok, type Result } from "@/lib/result";
import { sendEmail } from "@/server/email/client";
import { renderEmail } from "@/server/email/render";
import LeadConfirmed from "@/server/email/templates/LeadConfirmed";
import { checkRateLimits } from "@/server/rate-limit";
import { hashKey } from "@/server/request";

export type SubmitContext = {
  ip: string;
  ipHash: string;
  userAgent?: string;
  locale?: string;
  requestId: string;
};

export type SubmitLeadResult = { leadId: string; email: string; resendAvailableAt: string };

/** A signed form token for a form that has just been opened. */
export function formToken(): { token: string } {
  return { token: issueFormToken() };
}

function toNewLead(input: LeadSubmission, context: SubmitContext, turnstile: boolean): NewLead {
  const meta = {
    ipHash: context.ipHash,
    userAgent: context.userAgent,
    locale: context.locale,
    utm: input.utm,
    turnstile,
  };
  if (input.source === "contact") {
    return {
      source: "contact",
      name: input.name,
      email: input.email,
      company: input.company,
      services: input.services,
      message: input.message,
      meta,
    };
  }
  return {
    source: "brief",
    name: input.name,
    email: input.email,
    company: input.company,
    phone: input.phone,
    services: input.services,
    message: input.description,
    existingUrl: input.existingUrl,
    budgetRange: input.budgetRange,
    timeline: input.timeline,
    referral: input.referral,
    meta,
  };
}

/**
 * Accepts a contact message or project brief: runs the bot checks and rate
 * limits, stores the lead awaiting verification with its first code, and emails
 * the code. A filled honeypot gets a convincing success and nothing is stored.
 */
export async function submitLead(
  input: LeadSubmission,
  context: SubmitContext,
  now = new Date(),
): Promise<Result<SubmitLeadResult>> {
  if (input.website?.trim()) {
    logger.info("Honeypot submission ignored", {
      requestId: context.requestId,
      ipHash: context.ipHash,
    });
    return ok({
      leadId: crypto.randomUUID(),
      email: input.email,
      resendAvailableAt: resendAvailableAt(now),
    });
  }

  const token = verifyFormToken(input.formToken, now);
  if (!token.ok) return token;

  const limited = await checkRateLimits([
    { key: `lead_create:ip:${context.ipHash}`, limit: 5, windowSeconds: 3600 },
    { key: `lead_create:email:${hashKey(input.email)}`, limit: 3, windowSeconds: 3600 },
  ]);
  if (!limited.ok) return limited;

  const turnstile = await verifyTurnstile(input.turnstileToken, context.ip);
  if (!turnstile.ok) return turnstile;

  const { code, codeHash } = newCode();
  const created = await createLeadWithVerification(
    toNewLead(input, context, turnstile.data.checked),
    {
      codeHash,
      expiresAt: new Date(now.getTime() + CODE_TTL_MS),
    },
  );
  if (!created.ok) return created;
  const lead = created.data;

  const sent = await sendCodeEmail(lead.email, code);
  if (!sent.ok) return sent;
  await recordLeadEvent(lead.id, "verification_sent", "system");

  logger.info("Lead created, code sent", {
    requestId: context.requestId,
    leadId: lead.id,
    email: maskEmail(lead.email),
  });
  return ok({ leadId: lead.id, email: lead.email, resendAvailableAt: resendAvailableAt(now) });
}

/** Stores a lead from the agency's own systems; the caller already verified the contact. */
export async function createIntegrationLead(
  input: IntegrationLead,
  now = new Date(),
): Promise<Result<Lead>> {
  return createVerifiedLead(
    {
      source: "api",
      name: input.name,
      email: input.email,
      company: input.company,
      phone: input.phone,
      services: input.services,
      message: input.message,
      budgetRange: input.budgetRange,
      timeline: input.timeline,
      meta: { integration: input.integration },
    },
    now,
  );
}

/** Emails the person a copy of what they sent, after their address is confirmed. */
async function sendLeadConfirmation(lead: Lead, requestId: string): Promise<void> {
  const { html, text } = await renderEmail(
    createElement(LeadConfirmed, { name: lead.name, details: leadDetails(lead, "client") }),
  );
  const sent = await sendEmail({
    to: lead.email,
    subject: `Confirmed. We reply within ${site.responseTime}.`,
    html,
    text,
  });
  if (!sent.ok)
    logger.error("Confirmation email failed", { requestId, leadId: lead.id, error: sent.error });
}

/**
 * Work that follows a newly verified lead, run after the response is sent: the
 * client's confirmation email. Failures are logged and never reach the client.
 */
export async function handleLeadVerified(lead: Lead, requestId: string): Promise<void> {
  if (lead.source !== "api") await sendLeadConfirmation(lead, requestId);
}
