"use server";

import * as z from "zod/mini";
import { logger, maskEmail } from "@/lib/logger";

const briefSchema = z.object({
  services: z
    .array(z.string().check(z.trim(), z.maxLength(40)))
    .check(z.minLength(1), z.maxLength(10)),
  budget: z.string().check(z.trim(), z.minLength(1), z.maxLength(40)),
  email: z.pipe(z.string().check(z.trim(), z.toLowerCase(), z.maxLength(254)), z.email()),
});

export type Brief = z.input<typeof briefSchema>;
export type BriefResult = { ok: boolean };

/**
 * Receives the short brief from the home page terminal.
 *
 * Not connected yet: the lead pipeline (src/features/leads) needs a name, a
 * message of 20 characters or more, a bot check, and an emailed verification
 * code, none of which this three-question form collects. Until the terminal
 * gathers them (or the pipeline accepts short briefs), a brief is only logged
 * here, at warning level so it is noticed, and nobody is notified. See
 * docs/handoff.md.
 */
export async function submitBrief(input: Brief): Promise<BriefResult> {
  const parsed = briefSchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  const { services, budget, email } = parsed.data;
  logger.warn("Terminal brief received but not delivered: not connected to the lead pipeline", {
    services,
    budget,
    email: maskEmail(email),
  });
  return { ok: true };
}
