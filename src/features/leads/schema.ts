import { z } from "zod";
import { budgetOptions, timelineOptions } from "@/content/brief";
import { serviceSlugs } from "@/content/services/catalog";

/*
 * Zod schemas shared by the browser forms and the API. Messages are the copy the
 * forms show next to each field. Optional text fields accept "" (an untouched
 * input) and normalize it to undefined.
 */

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .transform((value) => value || undefined);

const name = z.string().trim().min(1, "Enter your name.").max(120, "Use 120 characters or fewer.");

/** Trimmed and lowercased before it is validated or stored. */
const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Use 254 characters or fewer.")
  .pipe(z.email("Enter a valid email address, for example name@company.com."));

const company = optionalText(120, "Use 120 characters or fewer.");

const phone = z
  .string()
  .trim()
  .max(40, "Use 40 characters or fewer.")
  .regex(/^$|^\+?[\d\s().-]{6,}$/, "Use digits, spaces, and an optional + for the country code.")
  .optional()
  .transform((value) => value || undefined);

const services = z.array(z.enum(serviceSlugs)).max(serviceSlugs.length);

/** Adds https:// when the visitor typed a bare domain; any other scheme is kept and rejected. */
const existingUrl = z
  .string()
  .trim()
  .max(500, "Use 500 characters or fewer.")
  .optional()
  .transform((value) =>
    value ? (/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`) : undefined,
  )
  .pipe(
    z
      .url({ protocol: /^https?$/, message: "Enter a web address, for example example.com." })
      .optional(),
  );

const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];
const timelineValues = timelineOptions.map((option) => option.value) as [string, ...string[]];

/** The contact form's visible fields. */
export const contactFieldsSchema = z.object({
  name,
  email,
  company,
  services: services.default([]),
  message: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters so we understand the request.")
    .max(2000, "Keep the message under 2,000 characters."),
});

/** The project brief, one object per wizard step. Each step validates before Continue. */
export const briefStepSchemas = {
  services: z.object({ services: services.min(1, "Choose at least one service.") }),
  project: z.object({
    description: z
      .string()
      .trim()
      .min(40, "Write at least 40 characters so we understand the project.")
      .max(3000, "Keep the description under 3,000 characters."),
    existingUrl,
  }),
  budget: z.object({
    budgetRange: z.enum(budgetValues, { message: "Choose a budget range, or Not sure yet." }),
    timeline: z.enum(timelineValues, { message: "Choose a timeline." }),
  }),
  details: z.object({
    name,
    email,
    company,
    phone,
    referral: optionalText(200, "Use 200 characters or fewer."),
  }),
};

export const briefFieldsSchema = briefStepSchemas.services
  .extend(briefStepSchemas.project.shape)
  .extend(briefStepSchemas.budget.shape)
  .extend(briefStepSchemas.details.shape);

/** Bot defenses sent alongside every public submission. */
const botFields = {
  formToken: z.string().min(1).max(200),
  /** Honeypot: hidden from people, so any value means a bot. */
  website: z.string().max(500).optional(),
  turnstileToken: z.string().max(4096).optional(),
  utm: z.record(z.string().max(40), z.string().max(200)).optional(),
};

/** Body of POST /api/v1/leads. */
export const leadSubmissionSchema = z.discriminatedUnion("source", [
  contactFieldsSchema.extend({ source: z.literal("contact"), ...botFields }),
  briefFieldsSchema.extend({ source: z.literal("brief"), ...botFields }),
]);

export type LeadSubmission = z.output<typeof leadSubmissionSchema>;

/** Body of POST /api/v1/integrations/leads, for the agency's own systems. */
export const integrationLeadSchema = z.object({
  name,
  email,
  company,
  phone,
  services: services.default([]),
  message: optionalText(2000, "Keep the message under 2,000 characters."),
  budgetRange: optionalText(120, "Use 120 characters or fewer."),
  timeline: optionalText(120, "Use 120 characters or fewer."),
  /** Which system sent the lead, for example "whatsapp-bot". */
  integration: optionalText(60, "Use 60 characters or fewer."),
});

export type IntegrationLead = z.output<typeof integrationLeadSchema>;
