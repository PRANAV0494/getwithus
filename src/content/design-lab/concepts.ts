/*
 * The five design directions explored for GetWithUs, each as one complete token
 * set. Pages read `vars` as CSS custom properties; the gallery renders `palette`
 * and checks `contrast` pairs. Every hex value here is the single source.
 */

export type ConceptSlug =
  | "midnight-tech"
  | "minimal-corporate"
  | "creative-studio"
  | "modern-engineering"
  | "hybrid-premium";

export type Swatch = { name: string; hex: string; use: string };

type ContrastPair = { label: string; fg: string; bg: string; large?: boolean };

export type Concept = {
  letter: string;
  slug: ConceptSlug;
  name: string;
  direction: string;
  scheme: "dark" | "light" | "mixed";
  /** The page background colour, also painted on `html` so overscroll matches. */
  canvas: string;
  palette: {
    primary: Swatch;
    secondary: Swatch;
    accent: Swatch;
    backgrounds: readonly Swatch[];
    text: readonly Swatch[];
    borders: readonly Swatch[];
  };
  vars: Readonly<Record<`--${string}`, string>>;
  typography: { display: string; body: string; mono?: string; scale: string };
  components: {
    buttons: string;
    cards: string;
    navigation: string;
    hero: string;
    motion: string;
  };
  contrast: readonly ContrastPair[];
};

const midnightTech: Concept = {
  letter: "A",
  slug: "midnight-tech",
  name: "Midnight Tech",
  direction:
    "A deep navy product-company atmosphere: centered statement hero, a console-style visual of the three practices, one electric blue light source, and quiet surfaces.",
  scheme: "dark",
  canvas: "#060A18",
  palette: {
    primary: { name: "Deep navy", hex: "#0A1230", use: "Brand colour, raised panels" },
    secondary: { name: "Navy surface", hex: "#121C42", use: "Cards, tab lists, inputs" },
    accent: {
      name: "Electric blue",
      hex: "#2563FF",
      use: "Primary buttons, active states, the hero light",
    },
    backgrounds: [
      { name: "Midnight", hex: "#060A18", use: "Page" },
      { name: "Midnight raised", hex: "#0A1029", use: "Alternate sections" },
      { name: "Surface", hex: "#0D1533", use: "Cards" },
    ],
    text: [
      { name: "Primary text", hex: "#EEF2FF", use: "Headings and body" },
      { name: "Secondary text", hex: "#A8B3D6", use: "Leads, descriptions" },
      { name: "Muted text", hex: "#7D89B0", use: "Captions, labels" },
      { name: "Link blue", hex: "#7AA2FF", use: "Text links and accents on dark" },
    ],
    borders: [
      { name: "Border", hex: "#1C2850", use: "Card and section edges" },
      { name: "Border strong", hex: "#2A3A6E", use: "Inputs, hover edges" },
    ],
  },
  vars: {
    "--lab-bg": "#060A18",
    "--lab-bg-alt": "#0A1029",
    "--lab-surface": "#0D1533",
    "--lab-surface-2": "#121C42",
    "--lab-border": "#1C2850",
    "--lab-border-strong": "#2A3A6E",
    "--lab-text": "#EEF2FF",
    "--lab-text-2": "#A8B3D6",
    "--lab-text-3": "#7D89B0",
    "--lab-accent": "#2563FF",
    "--lab-accent-hover": "#3B74FF",
    "--lab-accent-text": "#7AA2FF",
    "--lab-on-accent": "#FFFFFF",
    "--lab-focus": "#7AA2FF",
  },
  typography: {
    display: "Sora 600, tracking -0.03em",
    body: "Manrope 400 and 500",
    scale: "Hero 40 to 72 px, H2 30 to 44 px, H3 20 px, body 16 to 17 px, small 14 px",
  },
  components: {
    buttons:
      "Pill (999 px radius). Primary electric blue with white label; secondary is a navy surface with a strong border. The arrow nudges 2 px on hover; the button itself never moves.",
    cards:
      "Navy surface, 1 px border, 16 px radius. Hover lifts the border to blue and lights a thin blue rule along the top.",
    navigation:
      "Sticky 68 px bar on midnight with a hairline border. Centered links with scroll spy (active link turns white with a blue dot); primary button on the right; full-screen sheet on mobile.",
    hero: "Centered: tagline pill, two-line statement, lead, two buttons, then a wide console panel showing the three practices at work.",
    motion:
      "One soft blue light drifts behind the hero over 24 seconds. Sections rise 16 px as they enter. Hover transitions 180 ms.",
  },
  contrast: [
    { label: "Body on page", fg: "#EEF2FF", bg: "#060A18" },
    { label: "Secondary on page", fg: "#A8B3D6", bg: "#060A18" },
    { label: "Muted on surface", fg: "#7D89B0", bg: "#0D1533" },
    { label: "Link blue on page", fg: "#7AA2FF", bg: "#060A18" },
    { label: "Button label on electric blue", fg: "#FFFFFF", bg: "#2563FF" },
  ],
};

const minimalCorporate: Concept = {
  letter: "B",
  slug: "minimal-corporate",
  name: "Minimal Corporate",
  direction:
    "Calm, enterprise-ready clarity: white and off-white space, charcoal type, one royal blue, and layouts that read like a well-edited proposal.",
  scheme: "light",
  canvas: "#FFFFFF",
  palette: {
    primary: { name: "Charcoal", hex: "#16191F", use: "Headings, footer, logo" },
    secondary: { name: "Off-white", hex: "#F5F6F8", use: "Alternate sections, tiles" },
    accent: { name: "Royal blue", hex: "#1E4FD8", use: "Primary buttons, links, icons" },
    backgrounds: [
      { name: "White", hex: "#FFFFFF", use: "Page" },
      { name: "Off-white", hex: "#F5F6F8", use: "Alternate sections" },
      { name: "Blue tint", hex: "#EAF0FD", use: "Icon tiles, highlights" },
    ],
    text: [
      { name: "Primary text", hex: "#16191F", use: "Headings and body" },
      { name: "Secondary text", hex: "#444B57", use: "Leads, descriptions" },
      { name: "Muted text", hex: "#646B78", use: "Captions, labels" },
    ],
    borders: [
      { name: "Border", hex: "#E4E7EC", use: "Dividers, cards" },
      { name: "Border strong", hex: "#CDD2DA", use: "Inputs, outlined buttons" },
    ],
  },
  vars: {
    "--lab-bg": "#FFFFFF",
    "--lab-bg-alt": "#F5F6F8",
    "--lab-surface": "#FFFFFF",
    "--lab-surface-2": "#EAF0FD",
    "--lab-border": "#E4E7EC",
    "--lab-border-strong": "#CDD2DA",
    "--lab-text": "#16191F",
    "--lab-text-2": "#444B57",
    "--lab-text-3": "#646B78",
    "--lab-accent": "#1E4FD8",
    "--lab-accent-hover": "#173FB0",
    "--lab-accent-text": "#1E4FD8",
    "--lab-on-accent": "#FFFFFF",
    "--lab-focus": "#1E4FD8",
  },
  typography: {
    display: "IBM Plex Sans 600, tracking -0.02em",
    body: "IBM Plex Sans 400 and 500",
    scale: "Hero 36 to 56 px, H2 28 to 40 px, H3 19 px, body 16 to 17 px, small 14 px",
  },
  components: {
    buttons:
      "6 px radius. Primary royal blue with white label; secondary outlined in strong charcoal border. Darker fill on hover, arrow nudge, no movement.",
    cards:
      "Mostly no cards: hairline dividers and columns. Where used, white with a 1 px border and an 8 px radius.",
    navigation:
      "Sticky 72 px white bar with a bottom border. Links with a royal blue underline that draws from the left; text Contact link plus the primary button.",
    hero: "Left-aligned statement and buttons with three commitments beneath; on the right a practice overview panel that doubles as navigation.",
    motion:
      "Restrained: underline draws, colour fades, and gentle section reveals. No background movement.",
  },
  contrast: [
    { label: "Body on page", fg: "#16191F", bg: "#FFFFFF" },
    { label: "Secondary on off-white", fg: "#444B57", bg: "#F5F6F8" },
    { label: "Muted on off-white", fg: "#646B78", bg: "#F5F6F8" },
    { label: "Royal blue link on page", fg: "#1E4FD8", bg: "#FFFFFF" },
    { label: "Button label on royal blue", fg: "#FFFFFF", bg: "#1E4FD8" },
  ],
};

const creativeStudio: Concept = {
  letter: "C",
  slug: "creative-studio",
  name: "Creative Digital Studio",
  direction:
    "A confident studio voice: black and paper sections, oversized grotesque type, lime used like a highlighter, and compositions that break the even grid.",
  scheme: "mixed",
  canvas: "#0B0B0A",
  palette: {
    primary: { name: "Studio black", hex: "#0B0B0A", use: "Hero, practices, footer" },
    secondary: { name: "Paper", hex: "#F1EFE8", use: "Light sections, text on black" },
    accent: { name: "Signal lime", hex: "#C8F53C", use: "Buttons, highlights, hover fills" },
    backgrounds: [
      { name: "Studio black", hex: "#0B0B0A", use: "Dark sections" },
      { name: "Paper", hex: "#F1EFE8", use: "Light sections" },
      { name: "Ink surface", hex: "#161614", use: "Cards on black" },
      { name: "Paper shade", hex: "#E8E5DB", use: "Cards on paper" },
    ],
    text: [
      { name: "Paper text", hex: "#F1EFE8", use: "Text on black" },
      { name: "Ash", hex: "#A9A69D", use: "Secondary text on black" },
      { name: "Ink", hex: "#0B0B0A", use: "Text on paper and lime" },
      { name: "Graphite", hex: "#55534D", use: "Secondary text on paper" },
    ],
    borders: [
      { name: "Rule on black", hex: "#2B2A27", use: "Dividers on dark" },
      { name: "Rule on paper", hex: "#D2CEC2", use: "Dividers on light" },
    ],
  },
  vars: {
    "--lab-bg": "#0B0B0A",
    "--lab-bg-alt": "#161614",
    "--lab-surface": "#161614",
    "--lab-surface-2": "#1F1F1C",
    "--lab-border": "#2B2A27",
    "--lab-border-strong": "#45433E",
    "--lab-text": "#F1EFE8",
    "--lab-text-2": "#A9A69D",
    "--lab-text-3": "#8C897F",
    "--lab-accent": "#C8F53C",
    "--lab-accent-hover": "#D6FA66",
    "--lab-accent-text": "#C8F53C",
    "--lab-on-accent": "#0B0B0A",
    "--lab-focus": "#C8F53C",
  },
  typography: {
    display: "Bricolage Grotesque 700, tracking -0.04em, optical size 96",
    body: "Bricolage Grotesque 400 and 500",
    scale: "Hero 48 to 120 px, H2 36 to 72 px, H3 22 px, body 17 px, small 14 px",
  },
  components: {
    buttons:
      "Pill. Lime with ink label; on paper, ink with paper label. Hover swaps to the lighter lime; the arrow turns 45 degrees.",
    cards:
      "Flat blocks with no radius on paper; on hover they invert to black with a lime title. Work cards are large, offset into a staggered grid.",
    navigation:
      "Black bar, wordmark left, links with a lime underline that grows from the centre, lime pill on the right; mobile opens a full-screen black menu with large links.",
    hero: "Oversized left-aligned statement with one phrase marked in lime, then the lead and buttons pinned to a two-column grid.",
    motion:
      "The lime marker draws in once on load; rows slide their arrows on hover; sections rise as they enter. Bolder than the others but still brief.",
  },
  contrast: [
    { label: "Paper text on black", fg: "#F1EFE8", bg: "#0B0B0A" },
    { label: "Ash on black", fg: "#A9A69D", bg: "#0B0B0A" },
    { label: "Ink on paper", fg: "#0B0B0A", bg: "#F1EFE8" },
    { label: "Graphite on paper", fg: "#55534D", bg: "#F1EFE8" },
    { label: "Ink on lime", fg: "#0B0B0A", bg: "#C8F53C" },
  ],
};

const modernEngineering: Concept = {
  letter: "D",
  slug: "modern-engineering",
  name: "Modern Engineering",
  direction:
    "The site as a technical drawing: graphite surfaces, a visible layout grid, monospaced labels, schematic diagrams, and cyan as the signal colour.",
  scheme: "dark",
  canvas: "#0F1113",
  palette: {
    primary: { name: "Graphite", hex: "#1A1D21", use: "Panels, navigation" },
    secondary: { name: "Steel", hex: "#2A3037", use: "Tabs, diagram nodes" },
    accent: { name: "Signal cyan", hex: "#2CD5E6", use: "Buttons, active states, diagram pulses" },
    backgrounds: [
      { name: "Carbon", hex: "#0F1113", use: "Page" },
      { name: "Carbon raised", hex: "#13161A", use: "Alternate sections" },
      { name: "Panel", hex: "#171A1E", use: "Cards" },
    ],
    text: [
      { name: "Primary text", hex: "#E6E9EC", use: "Headings and body" },
      { name: "Secondary text", hex: "#A0A8B2", use: "Leads, descriptions" },
      { name: "Muted text", hex: "#848D98", use: "Mono labels, captions" },
    ],
    borders: [
      { name: "Grid line", hex: "#1B1F24", use: "Background layout grid" },
      { name: "Border", hex: "#262B31", use: "Card and table edges" },
      { name: "Border strong", hex: "#353C44", use: "Inputs, hover edges" },
    ],
  },
  vars: {
    "--lab-bg": "#0F1113",
    "--lab-bg-alt": "#13161A",
    "--lab-surface": "#171A1E",
    "--lab-surface-2": "#1D2126",
    "--lab-border": "#262B31",
    "--lab-border-strong": "#353C44",
    "--lab-grid": "#1B1F24",
    "--lab-text": "#E6E9EC",
    "--lab-text-2": "#A0A8B2",
    "--lab-text-3": "#848D98",
    "--lab-accent": "#2CD5E6",
    "--lab-accent-hover": "#5FE2EF",
    "--lab-accent-text": "#2CD5E6",
    "--lab-on-accent": "#061417",
    "--lab-focus": "#2CD5E6",
  },
  typography: {
    display: "Archivo 600, width 92, tracking -0.02em",
    body: "Archivo 400 and 500",
    mono: "JetBrains Mono 400 and 500 for labels, steps, and specifications",
    scale: "Hero 40 to 64 px, H2 28 to 40 px, H3 18 px, body 16 px, mono labels 12 to 13 px",
  },
  components: {
    buttons:
      "Square (2 px radius). Primary cyan with dark label; secondary outlined steel. Hover brightens the fill and extends the arrow.",
    cards:
      "Panels with corner brackets instead of rounded corners; hover turns the brackets and border cyan. Lists read like specification tables.",
    navigation:
      "Graphite bar with a hairline border; links with a cyan underline and scroll spy; a mono status tag beside the logo.",
    hero: "Split: statement, buttons, and a mono specification on the left; a live system diagram of the three practices on the right.",
    motion:
      "Data pulses travel along the diagram lines in a slow loop; panels reveal as they enter; tab changes cross-fade in 160 ms.",
  },
  contrast: [
    { label: "Body on page", fg: "#E6E9EC", bg: "#0F1113" },
    { label: "Secondary on panel", fg: "#A0A8B2", bg: "#171A1E" },
    { label: "Muted on page", fg: "#848D98", bg: "#0F1113" },
    { label: "Cyan on page", fg: "#2CD5E6", bg: "#0F1113" },
    { label: "Button label on cyan", fg: "#061417", bg: "#2CD5E6" },
  ],
};

const hybridPremium: Concept = {
  letter: "E",
  slug: "hybrid-premium",
  name: "Hybrid Premium",
  direction:
    "Editorial confidence: navy bands for the statement moments, warm off-white pages for reading, a serif display face, minimal cards, and electric blue reserved for action.",
  scheme: "mixed",
  canvas: "#F7F6F2",
  palette: {
    primary: { name: "Navy", hex: "#0B1631", use: "Hero, navigation, dark bands, footer" },
    secondary: { name: "Warm white", hex: "#F7F6F2", use: "Reading sections" },
    accent: { name: "Electric blue", hex: "#2052E8", use: "Primary buttons and links on light" },
    backgrounds: [
      { name: "Navy", hex: "#0B1631", use: "Dark bands" },
      { name: "Navy raised", hex: "#12204A", use: "Cards on navy" },
      { name: "Warm white", hex: "#F7F6F2", use: "Light sections" },
      { name: "White", hex: "#FFFFFF", use: "Cards on light" },
    ],
    text: [
      { name: "Ink", hex: "#0F1424", use: "Text on light" },
      { name: "Slate", hex: "#4A5065", use: "Secondary text on light" },
      { name: "Navy text", hex: "#F4F6FB", use: "Text on navy" },
      { name: "Mist", hex: "#AEB7CE", use: "Secondary text on navy" },
      { name: "Light blue", hex: "#8EAEFF", use: "Links and accents on navy" },
    ],
    borders: [
      { name: "Rule on light", hex: "#E3E1DA", use: "Dividers and cards" },
      { name: "Rule on navy", hex: "#22305C", use: "Dividers on dark" },
    ],
  },
  vars: {
    "--lab-bg": "#F7F6F2",
    "--lab-bg-alt": "#FFFFFF",
    "--lab-surface": "#FFFFFF",
    "--lab-surface-2": "#EFEDE6",
    "--lab-border": "#E3E1DA",
    "--lab-border-strong": "#C9C6BC",
    "--lab-text": "#0F1424",
    "--lab-text-2": "#4A5065",
    "--lab-text-3": "#5E6478",
    "--lab-accent": "#2052E8",
    "--lab-accent-hover": "#1842C4",
    "--lab-accent-text": "#2052E8",
    "--lab-on-accent": "#FFFFFF",
    "--lab-focus": "#2052E8",
    "--lab-navy": "#0B1631",
    "--lab-navy-2": "#12204A",
  },
  typography: {
    display: "Instrument Serif 400 for headlines, tracking -0.01em",
    body: "Instrument Sans 400, 500, and 600 for text and interface",
    scale: "Hero 44 to 84 px, H2 34 to 56 px, H3 22 px, body 16 to 17 px, small 14 px",
  },
  components: {
    buttons:
      "8 px radius. Electric blue with white label on light, white with navy label on navy; secondary is a text link with a drawn underline.",
    cards:
      "White with a hairline rule and no shadow; hover darkens the rule and draws a blue line across the top. Work uses an asymmetric editorial grid.",
    navigation:
      "Sticky navy bar across every section; quiet links with underline and scroll spy; white primary button.",
    hero: "Navy band with a large serif statement left, the lead and buttons right, and a three-part practice index along the bottom edge.",
    motion:
      "A faint light sweeps the hero grid every 14 seconds; sections reveal gently; underlines draw in 220 ms.",
  },
  contrast: [
    { label: "Ink on warm white", fg: "#0F1424", bg: "#F7F6F2" },
    { label: "Slate on warm white", fg: "#4A5065", bg: "#F7F6F2" },
    { label: "Text on navy", fg: "#F4F6FB", bg: "#0B1631" },
    { label: "Mist on navy", fg: "#AEB7CE", bg: "#0B1631" },
    { label: "Button label on blue", fg: "#FFFFFF", bg: "#2052E8" },
  ],
};

export const concepts: readonly Concept[] = [
  midnightTech,
  minimalCorporate,
  creativeStudio,
  modernEngineering,
  hybridPremium,
];

/** A concept by slug; the slugs are fixed, so a missing one is a programming error. */
export function conceptBySlug(slug: ConceptSlug): Concept {
  const concept = concepts.find((entry) => entry.slug === slug);
  if (!concept) throw new Error(`Unknown design concept: ${slug}`);
  return concept;
}
