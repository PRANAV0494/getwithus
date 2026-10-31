import type { ConceptSlug } from "@/content/design-lab/concepts";

/*
 * The weighted evaluation of the five directions. Scores are design judgement
 * anchored to measurements taken on a local production build (Lighthouse mobile,
 * median of three runs; initial JavaScript; axe; measured contrast). See
 * docs/design-lab/README.md for the method and the raw numbers.
 */

export const criteria = [
  { id: "professional", name: "Professional appearance", weight: 20 },
  { id: "brand", name: "Brand identity", weight: 15 },
  { id: "ux", name: "UI/UX quality", weight: 15 },
  { id: "trust", name: "Trust and credibility", weight: 15 },
  { id: "consistency", name: "Visual consistency", weight: 10 },
  { id: "conversion", name: "Conversion potential", weight: 10 },
  { id: "responsive", name: "Responsiveness", weight: 10 },
  { id: "performance", name: "Performance and accessibility", weight: 5 },
] as const;

export type CriterionId = (typeof criteria)[number]["id"];

type Measurements = {
  /** Median of six mobile runs over two rounds on the same build. */
  lighthouse: number;
  lighthouseRuns: readonly number[];
  /** Total blocking time of the median run in each round, lowest and highest. */
  totalBlockingMs: readonly [number, number];
  initialJsKb: number;
  axeViolations: number;
  lowestContrast: number;
  endlessAnimation: boolean;
};

export type Evaluation = {
  slug: ConceptSlug;
  scores: Readonly<Record<CriterionId, number>>;
  measured: Measurements;
  strengths: readonly string[];
  weaknesses: readonly string[];
  suitability: string;
  international: string;
  ruleConflicts: readonly string[];
};

/** Weighted total out of 100. Weights sum to 100. */
export function weightedScore(scores: Readonly<Record<CriterionId, number>>): number {
  const total = criteria.reduce(
    (sum, criterion) => sum + scores[criterion.id] * criterion.weight,
    0,
  );
  return Math.round((total / 100) * 10) / 10;
}

const sharedConflicts = [
  "Headings above the 44 px cap in section 2.1 of the build spec",
  "Scroll-driven section reveals, which section 2.1 rules out for production",
  "A new accent colour in place of the lamp brand token",
];

export const evaluations: readonly Evaluation[] = [
  {
    slug: "midnight-tech",
    scores: {
      professional: 88,
      brand: 72,
      ux: 86,
      trust: 82,
      consistency: 88,
      conversion: 84,
      responsive: 88,
      performance: 86,
    },
    measured: {
      lighthouse: 97.5,
      lighthouseRuns: [93, 94, 99, 97, 98, 98],
      totalBlockingMs: [180, 270],
      initialJsKb: 196.2,
      axeViolations: 0,
      lowestContrast: 4.88,
      endlessAnimation: true,
    },
    strengths: [
      "The most polished first screen: a centered statement with a console panel that shows all three practices working at once.",
      "Tabbed services and a horizontal timeline keep a long page compact.",
      "Dark navy with one light source feels premium without extra decoration.",
    ],
    weaknesses: [
      "Navy plus electric blue is the default look of developer tools and SaaS products, so it says less about GetWithUs in particular.",
      "The console rows are illustrative; some visitors may read them as live client activity.",
      "The drifting hero light runs forever and costs main-thread time on phones.",
    ],
    suitability:
      "Strong for engineering and AI buyers; less natural for the Digital Growth practice, where marketing and brand clients expect warmth.",
    international:
      "Familiar to international product teams, which helps credibility but blends in with many SaaS and agency sites.",
    ruleConflicts: [
      ...sharedConflicts,
      "A coloured radial glow, where section 2.1 permits only transparent-to-background fades",
    ],
  },
  {
    slug: "minimal-corporate",
    scores: {
      professional: 90,
      brand: 62,
      ux: 90,
      trust: 90,
      consistency: 90,
      conversion: 88,
      responsive: 90,
      performance: 96,
    },
    measured: {
      lighthouse: 99,
      lighthouseRuns: [99, 99, 99, 99, 99, 100],
      totalBlockingMs: [110, 120],
      initialJsKb: 190.9,
      axeViolations: 0,
      lowestContrast: 4.96,
      endlessAnimation: false,
    },
    strengths: [
      "The clearest page: the hero's practice panel doubles as navigation, and the services read like a well-edited proposal.",
      "Reads as established and low-risk, which procurement and enterprise buyers reward.",
      "Fastest of the five: no background motion, nothing heavy.",
    ],
    weaknesses: [
      "Royal blue on white with IBM Plex is the look of countless IT services firms; it is easy to forget which site you were on.",
      "Little visual tension, so the brand line has to carry all the personality.",
    ],
    suitability:
      "Excellent for enterprise and procurement-led buyers; undersells the AI and growth work to founders and startups.",
    international:
      "Very safe internationally: legible, conventional, accessible. The risk is anonymity, not doubt.",
    ruleConflicts: [
      ...sharedConflicts,
      "Light backgrounds, where section 2.2 requires a dark theme",
    ],
  },
  {
    slug: "creative-studio",
    scores: {
      professional: 76,
      brand: 90,
      ux: 74,
      trust: 68,
      consistency: 84,
      conversion: 76,
      responsive: 82,
      performance: 92,
    },
    measured: {
      lighthouse: 99,
      lighthouseRuns: [93, 99, 99, 98, 99, 99],
      totalBlockingMs: [140, 150],
      initialJsKb: 190.9,
      axeViolations: 0,
      lowestContrast: 6.68,
      endlessAnimation: false,
    },
    strengths: [
      "The most memorable direction: oversized type, a lime highlighter, and compositions nobody would mistake for a template.",
      "Service cards that invert on hover make a long list feel lively.",
      "The lime closing band is the most decisive call to action of the five.",
    ],
    weaknesses: [
      "Reads as a design studio more than an engineering partner; CTOs and enterprise buyers may doubt the technical depth.",
      "Huge type lowers scannability and pushes the lead and buttons down, especially on phones.",
      "Needed fixes for narrow phones and tablets, a sign the type scale is fragile.",
    ],
    suitability:
      "Great for brand and growth clients and for founders who value boldness; a weak fit for enterprise software and AI work.",
    international:
      "Distinctive, but a lime and black studio look can feel informal to conservative buyers in some markets.",
    ruleConflicts: [...sharedConflicts, "Numbered markers on practices, which are not a sequence"],
  },
  {
    slug: "modern-engineering",
    scores: {
      professional: 84,
      brand: 80,
      ux: 80,
      trust: 84,
      consistency: 88,
      conversion: 78,
      responsive: 84,
      performance: 82,
    },
    measured: {
      lighthouse: 95.5,
      lighthouseRuns: [90, 91, 97, 95, 96, 97],
      totalBlockingMs: [210, 380],
      initialJsKb: 196.2,
      axeViolations: 0,
      lowestContrast: 5.2,
      endlessAnimation: true,
    },
    strengths: [
      "Signals engineering competence on sight: the system diagram, specification tables, and step pipeline feel exact.",
      "An ownable identity among agencies, with structure that scales to many services.",
      "Monospaced labels give every section a clear index.",
    ],
    weaknesses: [
      "Monospaced, lowercase service names are slower to read than sentence-case text.",
      "Cold for the Digital Growth practice; the terminal prompt in the closing section is a gimmick.",
      "The endless pulse animation on the diagram repaints every frame.",
    ],
    suitability:
      "Ideal for engineering-led and technical buyers; less inviting for marketing, brand, and non-technical founders.",
    international:
      "Respected by technical audiences everywhere; non-technical decision makers may find it intimidating.",
    ruleConflicts: [...sharedConflicts],
  },
  {
    slug: "hybrid-premium",
    scores: {
      professional: 92,
      brand: 86,
      ux: 86,
      trust: 92,
      consistency: 86,
      conversion: 84,
      responsive: 88,
      performance: 83,
    },
    measured: {
      lighthouse: 92.5,
      lighthouseRuns: [88, 88, 89, 96, 98, 98],
      totalBlockingMs: [170, 480],
      initialJsKb: 190.9,
      axeViolations: 0,
      lowestContrast: 6.12,
      endlessAnimation: true,
    },
    strengths: [
      "Feels like a senior consultancy that also ships software: navy authority, warm reading pages, and a serif voice.",
      "The editorial label column makes long sections easy to scan, and the hero's practice index gives three clear entry points.",
      "Serves all three practices equally: technical enough for engineering, warm enough for growth, calm enough for AI.",
    ],
    weaknesses: [
      "The endless light sweep in the hero added up to 300 ms of blocking time on a simulated phone, the most variable result of the five.",
      "Some sections leave too much empty space, and the practice cards repeat the service list shown again below.",
      "A single-weight serif needs discipline: it works for headlines, not for interface labels.",
    ],
    suitability:
      "The best fit across startups, growing businesses, and enterprises, and across all three practices.",
    international:
      "Reads as premium and established in any market without depending on a trend; the strongest choice for international clients.",
    ruleConflicts: [
      ...sharedConflicts,
      "Light reading sections, where section 2.2 requires a dark theme",
    ],
  },
];

/** The highest weighted score; the gallery and docs mark it as the recommendation. */
export function winningSlug(): ConceptSlug {
  return [...evaluations].sort((a, b) => weightedScore(b.scores) - weightedScore(a.scores))[0].slug;
}
