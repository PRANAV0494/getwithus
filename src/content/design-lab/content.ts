import { site } from "@/config/site";

/*
 * The one set of copy every design-lab concept renders, so the five directions
 * are compared on design alone. Nothing here is a claim the owner has not made:
 * the work items are labelled concept projects, and contact details come from
 * src/config/site.ts (owner placeholders until supplied).
 */

export type PracticeId = "engineering" | "growth" | "ai";

type LabService = { name: string; description: string };

export type LabPractice = {
  id: PracticeId;
  name: string;
  short: string;
  summary: string;
  detail: string;
  services: readonly LabService[];
};

export type ArtKind = "app" | "site" | "chat" | "dashboard";

export type LabProject = {
  id: string;
  title: string;
  kind: ArtKind;
  practices: readonly PracticeId[];
  summary: string;
  tags: readonly string[];
};

export type LabPoint = { title: string; body: string };

export const lab = {
  brand: {
    name: "GetWithUs",
    tagline: "Build with us. Grow with us.",
  },
  nav: [
    { id: "practices", label: "Practices" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "why", label: "Why us" },
  ],
  actions: {
    start: { label: "Start a project", href: "/start" },
    process: { label: "See how we work", href: "#process" },
    contact: { label: "Send a message", href: "/contact" },
  },
  hero: {
    eyebrow: "Build with us. Grow with us.",
    title: "We build software, grow brands, and automate work.",
    lead: "GetWithUs is a software and technology agency for startups, growing businesses, and enterprises in India and abroad. One team designs, engineers, markets, and automates, so your product and your growth follow the same plan.",
  },
  intro: {
    label: "About GetWithUs",
    title: "One partner from first idea to steady growth.",
    body: [
      "Most companies hire one firm to build, another to market, and a third to automate, then spend months stitching the work together.",
      "At GetWithUs, engineering, growth, and AI work from one plan, one codebase, and one point of contact. You see working software every week and own everything we make.",
    ],
    principles: ["Scope in writing", "Weekly demos", "You own everything"],
  },
  practicesIntro: {
    label: "Practices",
    title: "Three practices, one team.",
    lead: "Most projects draw on more than one. A new app needs a launch plan; a website needs automation behind its forms.",
  },
  practices: [
    {
      id: "engineering",
      name: "Digital Engineering",
      short: "Engineering",
      summary: "Custom software, web and mobile apps, and the APIs that connect them.",
      detail:
        "We design and build reliable software around how your business works, from a first version you can test with customers to systems that run your operations.",
      services: [
        {
          name: "Custom software development",
          description: "Software shaped around your processes instead of the other way round.",
        },
        {
          name: "Web application development",
          description: "Fast, secure web apps your team and customers use every day.",
        },
        {
          name: "Mobile app development",
          description: "iOS and Android apps from one codebase, published to both stores.",
        },
        {
          name: "Full-stack development",
          description: "Front end, back end, database, and hosting handled by one team.",
        },
        {
          name: "Enterprise solutions",
          description:
            "Portals, dashboards, and internal tools that connect to the systems you already run.",
        },
        {
          name: "API development and integration",
          description:
            "Clean APIs and integrations with payment, CRM, ERP, and messaging platforms.",
        },
      ],
    },
    {
      id: "growth",
      name: "Digital Growth",
      short: "Growth",
      summary: "Websites, search, and marketing that turn visitors into customers.",
      detail:
        "We build the website, set up search and campaigns, and keep improving what converts, with every change measured.",
      services: [
        {
          name: "Website design and development",
          description: "Fast, accessible websites your team can update without a developer.",
        },
        {
          name: "Digital marketing",
          description: "Search and social campaigns with budgets and reporting you can follow.",
        },
        {
          name: "Search engine optimization",
          description: "Technical SEO, content structure, and local search so people find you.",
        },
        {
          name: "Brand development",
          description: "Names, logos, voice, and visual systems that stay consistent everywhere.",
        },
        {
          name: "Conversion optimization",
          description: "Testing pages, forms, and offers to turn more visits into enquiries.",
        },
        {
          name: "Digital strategy",
          description: "A clear plan for channels, budget, and what to build next.",
        },
      ],
    },
    {
      id: "ai",
      name: "AI & Automation",
      short: "AI",
      summary: "AI features and automated workflows that take repetitive work off your team.",
      detail:
        "We add AI where it saves real time, connect it to your data and tools, and keep a person in charge of every decision that matters.",
      services: [
        {
          name: "AI-powered applications",
          description: "Products built around language models, search, and prediction.",
        },
        {
          name: "AI integration",
          description: "AI features added to the software and tools you already use.",
        },
        {
          name: "Business process automation",
          description:
            "Routine steps like data entry, follow-ups, and reports handled automatically.",
        },
        {
          name: "Intelligent workflows",
          description:
            "Workflows that route, check, and escalate work using rules and AI together.",
        },
        {
          name: "Data analytics",
          description: "Dashboards and reports that show what is working, from data you can trust.",
        },
        {
          name: "AI chatbots and assistants",
          description:
            "Assistants on your website and WhatsApp that answer, book, and hand over to your team.",
        },
      ],
    },
  ] satisfies readonly LabPractice[],
  servicesIntro: {
    label: "Services",
    title: "What we build and run.",
    lead: "Eighteen services across the three practices. Pick one, or let us combine them into a plan.",
  },
  whyIntro: {
    label: "Why GetWithUs",
    title: "How we keep projects on track.",
    lead: "No claims you cannot check. These are the commitments in every contract.",
  },
  why: [
    {
      title: "Scope, price, and timeline in writing",
      body: "Every project starts with a written scope. You know what you are getting and what it costs before work begins.",
    },
    {
      title: "Working software every week",
      body: "Weekly demos you can click through, not status reports. Your feedback goes straight into the next week.",
    },
    {
      title: "You own everything",
      body: "Code, designs, domains, and accounts are in your name from day one. There is no lock-in.",
    },
    {
      title: "One team, three disciplines",
      body: "Engineers, designers, marketers, and AI specialists plan together, so nothing gets lost between vendors.",
    },
    {
      title: "Built to be handed over",
      body: "Tested, documented, and monitored code that another team could pick up tomorrow.",
    },
    {
      title: "Clear across time zones",
      body: "Written updates, recorded demos, and a shared project board keep clients in India and abroad in step.",
    },
  ] satisfies readonly LabPoint[],
  processIntro: {
    label: "Process",
    title: "How a project runs.",
    lead: "Six steps, the same for a two-week website and a six-month platform.",
  },
  process: [
    {
      title: "Discover",
      body: "We learn your business, your users, and your goals, and agree what success looks like.",
    },
    {
      title: "Scope",
      body: "You get a written scope with deliverables, a timeline, and a fixed price or a clear monthly budget.",
    },
    {
      title: "Design",
      body: "Wireframes and visual designs you can click through before any code is written.",
    },
    {
      title: "Build",
      body: "Weekly releases to a private preview, with a demo every week and your feedback built in.",
    },
    {
      title: "Launch",
      body: "We handle hosting, domains, analytics, and store releases, then watch the first weeks closely.",
    },
    {
      title: "Grow",
      body: "Improvements, campaigns, and automation based on what the numbers show.",
    },
  ] satisfies readonly LabPoint[],
  workIntro: {
    label: "Selected work",
    title: "The kind of work we take on.",
    lead: "These are concept projects, not client work. Case studies published with client permission will replace them.",
    badge: "Concept project",
  },
  work: [
    {
      id: "clinic",
      title: "Clinic booking platform",
      kind: "app",
      practices: ["engineering"],
      summary:
        "Online booking, reminders, and staff schedules for a clinic with several locations.",
      tags: ["Web app", "Mobile app", "API"],
    },
    {
      id: "retail",
      title: "Retail growth website",
      kind: "site",
      practices: ["growth"],
      summary: "A fast catalogue site with search, local SEO, and a measured enquiry funnel.",
      tags: ["Website", "SEO", "Analytics"],
    },
    {
      id: "assistant",
      title: "WhatsApp order assistant",
      kind: "chat",
      practices: ["ai"],
      summary:
        "An assistant that takes orders and answers questions on WhatsApp, then hands over to staff.",
      tags: ["AI assistant", "WhatsApp", "Automation"],
    },
    {
      id: "operations",
      title: "Operations dashboard",
      kind: "dashboard",
      practices: ["engineering", "ai"],
      summary:
        "One view of orders, stock, and alerts, with reports sent automatically every morning.",
      tags: ["Dashboard", "Data", "Automation"],
    },
  ] satisfies readonly LabProject[],
  contact: {
    title: "Tell us what you want to build.",
    body: "Share a few lines about your project. We reply with questions or a first plan, and there is no obligation.",
    emailLabel: "Or email",
    email: site.contact.email,
  },
  footer: {
    note: "Software, growth, and AI for startups, growing businesses, and enterprises.",
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    copyright: `© ${site.copyrightYear} GetWithUs`,
  },
} as const;
