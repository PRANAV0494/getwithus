import { budgetOptions, optionLabel, timelineOptions } from "@/content/brief";
import { serviceName } from "@/content/services/catalog";
import type { Lead } from "@/features/leads/types";

export type LeadDetail = { label: string; value: string };

/**
 * The lead's fields as label and value pairs, in reading order, skipping empty
 * ones. `audience: "client"` leaves out what the person already knows about
 * themselves (name, email, phone) and internal fields.
 */
export function leadDetails(lead: Lead, audience: "team" | "client"): LeadDetail[] {
  const rows: [string, string | null | undefined][] = [
    ["Name", audience === "team" ? lead.name : null],
    ["Email", audience === "team" ? lead.email : null],
    ["Company", lead.company],
    ["Phone or WhatsApp", audience === "team" ? lead.phone : null],
    ["Services", lead.services.map(serviceName).join(", ")],
    [lead.source === "brief" ? "Project description" : "Message", lead.message],
    ["Existing website or app", lead.existingUrl],
    ["Budget", optionLabel(budgetOptions, lead.budgetRange)],
    ["Timeline", optionLabel(timelineOptions, lead.timeline)],
    ["How they heard about us", audience === "team" ? lead.referral : null],
    [
      "Source",
      audience === "team"
        ? lead.source + (lead.meta.integration ? ` (${lead.meta.integration})` : "")
        : null,
    ],
  ];
  return rows
    .filter((row): row is [string, string] => Boolean(row[1]))
    .map(([label, value]) => ({ label, value }));
}
