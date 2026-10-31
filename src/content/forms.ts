import { site } from "@/config/site";
import type { ErrorCode } from "@/lib/errors";

/** Labels, hints, and messages for the contact form, the project brief, and code verification. */
export const formCopy = {
  fields: {
    name: "Name",
    email: "Work email",
    company: "Company",
    services: "What do you need?",
    message: "Message",
    description: "Describe what you want built and what problem it solves",
    existingUrl: "Existing website or app, if any",
    budgetRange: "Budget",
    timeline: "Timeline",
    phone: "Phone or WhatsApp",
    referral: "How did you hear about us?",
  },
  hints: {
    email: "We send a 6-digit code here to confirm it is yours.",
    phone: "Include the country code, for example +44.",
  },
  sendAndVerify: "Send and verify",
  continue: "Continue",
  back: "Back",
  verify: {
    title: "Check your email",
    intro: (email: string, subject: "message" | "brief") =>
      `We sent a 6-digit code to ${email}. Enter it to confirm your ${subject}.`,
    codeLabel: "Verification code",
    confirm: "Confirm",
    resend: "Resend code",
    resendIn: (seconds: number) => `Resend code in ${seconds} s`,
    resent: "We sent a new code. It replaces the earlier one.",
    differentEmail: "Use a different email",
  },
  success: {
    contact: (email: string) => `Confirmed. We reply within ${site.responseTime} to ${email}.`,
    brief: `Confirmed. We read every brief and reply within ${site.responseTime}.`,
    backHome: "Back to home",
  },
  brief: {
    steps: [
      "What do you need?",
      "About the project",
      "Budget and timing",
      "Your details",
      "Confirm",
    ],
    progressLabel: "Project brief progress",
    stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  },
} as const;

const directly = `email us directly at ${site.contact.email}`;

/**
 * The copy shown for an API error code (spec section 13). Client errors with a
 * specific server message (validation, conflict) fall back to that message.
 */
export function errorCopy(
  code: ErrorCode,
  options: { remainingAttempts?: number; message?: string } = {},
): string {
  switch (code) {
    case "VERIFICATION_INVALID": {
      const remaining = options.remainingAttempts;
      const left =
        remaining !== undefined && remaining <= 2
          ? ` ${remaining} ${remaining === 1 ? "attempt" : "attempts"} left.`
          : "";
      return `That code is not correct. Check the email and try again.${left}`;
    }
    case "VERIFICATION_EXPIRED":
      return "That code has expired. Request a new one.";
    case "VERIFICATION_LOCKED":
      return "Too many attempts. Request a new code to continue.";
    case "RATE_LIMITED":
      return "Too many requests from this connection. Try again in a few minutes.";
    case "EMAIL_ERROR":
      return `We could not send the email right now. Try again, or ${directly}.`;
    case "BOT_CHECK_FAILED":
      return "We could not confirm this request came from a person. Try again in a few seconds.";
    case "VALIDATION_ERROR":
    case "CONFLICT":
    case "NOT_FOUND":
      return options.message ?? "Check the highlighted fields and try again.";
    default:
      return `Something went wrong on our side. Try again, or ${directly}.`;
  }
}
