import { and, eq, lt } from "drizzle-orm";
import { toLead } from "@/features/leads/mappers";
import type { Lead, LeadEventType, NewLead } from "@/features/leads/types";
import { dbError } from "@/lib/errors";
import { err, ok, type Result } from "@/lib/result";
import { db } from "@/server/db/client";
import { emailVerifications, leadEvents, leads } from "@/server/db/schema";

function leadValues(lead: NewLead) {
  return {
    source: lead.source,
    name: lead.name,
    email: lead.email,
    company: lead.company ?? null,
    phone: lead.phone ?? null,
    services: lead.services ?? [],
    message: lead.message ?? null,
    budgetRange: lead.budgetRange ?? null,
    timeline: lead.timeline ?? null,
    existingUrl: lead.existingUrl ?? null,
    referral: lead.referral ?? null,
    meta: lead.meta ?? {},
  };
}

/**
 * Inserts a lead awaiting verification, its first verification code, and the
 * `created` event, in one transaction.
 */
export async function createLeadWithVerification(
  lead: NewLead,
  verification: { codeHash: string; expiresAt: Date },
): Promise<Result<Lead>> {
  try {
    const created = await db.transaction(async (tx) => {
      const [row] = await tx.insert(leads).values(leadValues(lead)).returning();
      await tx.insert(emailVerifications).values({ leadId: row.id, ...verification });
      await tx.insert(leadEvents).values({
        leadId: row.id,
        type: "created",
        actor: "client",
        data: { source: lead.source },
      });
      return row;
    });
    return ok(toLead(created));
  } catch (error) {
    return err(dbError(error));
  }
}

/** Inserts a lead that a trusted system already verified, with `created` and `verified` events. */
export async function createVerifiedLead(lead: NewLead, verifiedAt: Date): Promise<Result<Lead>> {
  try {
    const created = await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(leads)
        .values({ ...leadValues(lead), status: "new", emailVerifiedAt: verifiedAt })
        .returning();
      await tx.insert(leadEvents).values([
        {
          leadId: row.id,
          type: "created",
          actor: "system",
          data: { source: lead.source, integration: lead.meta?.integration },
        },
        { leadId: row.id, type: "verified", actor: "system", data: { by: "integration" } },
      ]);
      return row;
    });
    return ok(toLead(created));
  } catch (error) {
    return err(dbError(error));
  }
}

/** A lead by ID, or null. */
export async function findLeadById(id: string): Promise<Result<Lead | null>> {
  try {
    const [row] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return ok(row ? toLead(row) : null);
  } catch (error) {
    return err(dbError(error));
  }
}

/**
 * Consumes the code, marks the email verified, moves the lead to `new`, and writes
 * the `verified` event, in one transaction.
 */
export async function completeVerification(
  leadId: string,
  verificationId: string,
  now: Date,
): Promise<Result<Lead>> {
  try {
    const updated = await db.transaction(async (tx) => {
      await tx
        .update(emailVerifications)
        .set({ consumedAt: now })
        .where(eq(emailVerifications.id, verificationId));
      const [row] = await tx
        .update(leads)
        .set({ status: "new", emailVerifiedAt: now })
        .where(and(eq(leads.id, leadId), eq(leads.status, "pending_verification")))
        .returning();
      await tx.insert(leadEvents).values({ leadId, type: "verified", actor: "client", data: {} });
      return row;
    });
    return ok(toLead(updated));
  } catch (error) {
    return err(dbError(error));
  }
}

/** Appends an event to a lead's timeline. */
export async function recordLeadEvent(
  leadId: string,
  type: LeadEventType,
  actor: string,
  data: Record<string, unknown> = {},
): Promise<Result<null>> {
  try {
    await db.insert(leadEvents).values({ leadId, type, actor, data });
    return ok(null);
  } catch (error) {
    return err(dbError(error));
  }
}

/** Deletes leads still awaiting verification that were created before `cutoff`. Returns the count. */
export async function deleteUnverifiedLeadsBefore(cutoff: Date): Promise<Result<number>> {
  try {
    const deleted = await db
      .delete(leads)
      .where(and(eq(leads.status, "pending_verification"), lt(leads.createdAt, cutoff)))
      .returning({ id: leads.id });
    return ok(deleted.length);
  } catch (error) {
    return err(dbError(error));
  }
}
