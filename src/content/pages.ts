import { site } from "@/config/site";

type Action = { label: string; href: string };

/**
 * Copy for the pages that are not service pages. Each entry has the page heading,
 * lead, meta description (under 160 characters), and the date its copy last changed.
 */
export const homePage = {
  path: "/",
  updated: "2026-10-31",
  hero: {
    title: "We build the software your business runs on.",
    lead: "Websites, mobile apps, WhatsApp and voice agents, and the marketing that fills them. Scoped in writing, shipped in weekly demos, and handed over with you owning every account.",
    primary: { label: "Start a project", href: "/start" } satisfies Action,
    secondary: { label: "See how a project runs", href: "/process" } satisfies Action,
    /** Three commitments in a few words each, beside the hero buttons. */
    proof: ["Fixed scope and price", "Weekly demos", "You own everything"],
  },
  services: { title: "What we do" },
  process: {
    title: "How a project runs",
    link: { label: "The process in detail", href: "/process" },
  },
  commitments: { title: "What you can hold us to" },
  work: { title: "Selected work", link: { label: "All work", href: "/work" } },
} as const;

export const closingCta = {
  title: "Tell us what you need",
  text: `Answer a few questions about your project and we reply within ${site.responseTime} with next steps and, where possible, a price range.`,
  primary: { label: "Start a project", href: "/start" } satisfies Action,
  secondary: { label: "Email us", href: `mailto:${site.contact.email}` } satisfies Action,
} as const;

export const servicesPage = {
  path: "/services",
  updated: "2026-10-31",
  title: "Services",
  description:
    "Web development, app development, agentic automation, digital marketing, and custom software. A written scope, weekly demos, and accounts you own.",
  lead: "Five lines of work, one way of working: a written scope, weekly demos, and accounts you own.",
  listTitle: "Service lines",
  processTitle: "How a project runs",
} as const;

export const processPage = {
  path: "/process",
  updated: "2026-10-31",
  title: "How a project runs",
  description:
    "The four steps every project follows: scope, build, launch, and run. What we need from you and what you get at each step.",
  lead: "The same four steps on every project, written down so you know what to expect and what we expect from you.",
  needFromYouTitle: "What we need from you",
  youGetTitle: "What you get",
  workingTogetherTitle: "Working together",
} as const;

export const workPage = {
  path: "/work",
  updated: "2026-10-31",
  title: "Selected work",
  description: "Projects we have permission to show. Ask us for a walkthrough of the rest.",
  lead: "Work we have permission to show. Ask us for a walkthrough of the rest.",
  emptyTitle: "No published case studies yet",
  emptyText: "We publish work when clients give permission. Ask us for a walkthrough on a call.",
  emptyAction: { label: "Contact us", href: "/contact" } satisfies Action,
} as const;

export const aboutPage = {
  path: "/about",
  updated: "2026-10-31",
  title: `About ${site.name}`,
  description: "Who we are, what we commit to on every project, and how to reach us.",
  lead: "[OWNER: two sentences: when the company was founded, where it is based, and what the team's background is]",
  beliefsTitle: "What we believe about this work",
  teamTitle: "Team",
  contactTitle: "Contact",
} as const;

export const contactPage = {
  path: "/contact",
  updated: "2026-10-31",
  title: "Contact",
  description: "Tell us what you are working on. Send a message, email us, or book a call.",
  lead: `Tell us what you are working on. We reply within ${site.responseTime}.`,
  detailsTitle: "Other ways to reach us",
  bookCall: "Book a call",
} as const;

export const startPage = {
  path: "/start",
  updated: "2026-10-31",
  title: "Start a project",
  description:
    "Answer five short questions about your project. We read every brief and reply with next steps and, where possible, a price range.",
  lead: `Five short steps. We read every brief and reply within ${site.responseTime}.`,
} as const;
