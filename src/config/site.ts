// public-env, not env: client components render the logo, and the validator stays out of their bundle.
import { publicEnv } from "@/config/public-env";

export type SocialLink = { label: string; href: string };

/**
 * Site-wide facts. Every owner placeholder below is a fact only the business owner
 * can supply; `pnpm guard:strict` fails until all of them are replaced.
 */
export const site = {
  // Name and casing from the brief (GetWithUs). [OWNER: confirm whether a designed wordmark or logo exists]
  name: publicEnv.siteName,
  wordmark: "GetWithUs",
  /** The brand line from the brief. */
  tagline: "Build with us. Grow with us.",
  url: publicEnv.siteUrl.replace(/\/$/, ""),
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
  schedulingUrl: publicEnv.schedulingUrl,
} as const;

/** A site fact, or undefined while it is still an owner placeholder, so whatever shows it can be left out. */
export function known(value: string | undefined): string | undefined {
  return value && !value.startsWith("[OWNER:") ? value : undefined;
}

/** How soon we reply, for promises on the page. Undefined until the owner supplies it. */
export const RESPONSE_TIME = known(site.responseTime);

type NavLink = {
  label: string;
  href: string;
  /** Shown only while a published case study exists. */ needsWork?: boolean;
};

/** Header links after "Services". The footer's Company column reuses them. */
const primaryNav: readonly NavLink[] = [
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work", needsWork: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Drops the Work link while there is no published case study. */
export function visibleNav(hasWork: boolean): NavLink[] {
  return primaryNav.filter((link) => hasWork || !link.needsWork);
}
