import { env } from "@/config/env";

export type SocialLink = { label: string; href: string };

/**
 * Site-wide facts. Every owner placeholder below is a fact only the business owner
 * can supply; `pnpm guard:strict` fails until all of them are replaced.
 */
export const site = {
  // [OWNER: confirm the brand name and its exact casing, and whether a different wordmark exists]
  name: env.NEXT_PUBLIC_SITE_NAME,
  wordmark: "getwithus",
  url: env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""),
  description:
    "Websites, mobile apps, WhatsApp and voice agents, and the marketing that fills them. Scoped in writing, shipped in weekly demos, and handed over with you owning every account.",
  footerDescription: "Websites, apps, agents, and marketing for businesses that need them to work.",
  contact: {
    email: "[OWNER: hello@domain]",
    phone: "[OWNER: phone or WhatsApp number]",
    city: "[OWNER: city, country]",
    address: "[OWNER: address]",
  },
  legalEntity: "[OWNER: legal entity name]",
  responseTime: "[OWNER: response time, for example one business day]",
  fixWindow: "[OWNER: fix window, for example 30-day]",
  copyrightYear: 2026,
  // Real profile URLs only. Empty means no social links are rendered anywhere.
  social: [] as SocialLink[],
  schedulingUrl: env.NEXT_PUBLIC_SCHEDULING_URL,
} as const;
