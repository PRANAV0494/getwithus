/** Slugs of every service page. The five lines plus the two agentic automation products. */
export type ServiceSlug =
  | "web-development"
  | "app-development"
  | "agentic-automation"
  | "whatsapp-bot"
  | "calling-agent"
  | "digital-marketing"
  | "custom-software";

/** What the navigation, footer, and forms need to know about a service. */
export type ServiceSummary = {
  slug: ServiceSlug;
  name: string;
  href: string;
  /** One line for the mega menu. */
  menuDescription: string;
  /** The agentic automation products listed under their line. */
  children?: readonly ServiceSummary[];
};

type CaseStudyMetric = { label: string; value: string; source: string };

type CaseStudyImage = { src: string; alt: string; width: number; height: number };

/**
 * A case study. Rendered only when `published` and `permission` are both true;
 * metrics render only when `metricsApproved` is true.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  /** `null` renders as "Confidential [industry] client". */
  client: string | null;
  industry: string;
  services: readonly ServiceSlug[];
  summary: string;
  problem: string;
  work: string;
  outcome: string;
  metrics: readonly CaseStudyMetric[];
  metricsApproved: boolean;
  stack: readonly string[];
  images: readonly CaseStudyImage[];
  published: boolean;
  permission: boolean;
  /** ISO date, for example "2026-03-01". */
  date: string;
};
