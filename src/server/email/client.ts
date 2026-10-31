import { Resend } from "resend";
import { env } from "@/config/env";
import { emailError } from "@/lib/errors";
import { logger, maskEmail } from "@/lib/logger";
import { err, ok, type Result } from "@/lib/result";

export type OutgoingEmail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

let resend: Resend | null = null;

function resendClient(): Resend {
  resend ??= new Resend(env.RESEND_API_KEY);
  return resend;
}

/**
 * Sends one email through Resend, or prints it with the console transport.
 * The console transport shows the full text (including verification codes) only
 * in development and test builds; production builds record only that a message was suppressed.
 */
export async function sendEmail(email: OutgoingEmail): Promise<Result<{ id: string | null }>> {
  const recipients = Array.isArray(email.to) ? email.to : [email.to];

  if (env.EMAIL_TRANSPORT === "console") {
    // Production builds print nothing that could carry a code; test builds print everything.
    if (env.NODE_ENV === "production" && env.NEXT_PUBLIC_TEST_HOOKS !== "1") {
      logger.warn("Email suppressed: EMAIL_TRANSPORT is console", {
        to: recipients.map(maskEmail),
      });
    } else {
      logger.info(
        `Email (console transport)\nTo: ${recipients.join(", ")}\nSubject: ${email.subject}\n\n${email.text}\n`,
      );
    }
    return ok({ id: null });
  }

  try {
    const { data, error } = await resendClient().emails.send(
      {
        from: env.EMAIL_FROM,
        to: recipients,
        subject: email.subject,
        html: email.html,
        text: email.text,
        replyTo: email.replyTo ?? env.EMAIL_REPLY_TO,
      },
      { signal: AbortSignal.timeout(5000) },
    );
    if (error) return err(emailError(error));
    return ok({ id: data?.id ?? null });
  } catch (error) {
    return err(emailError(error));
  }
}
