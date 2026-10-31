/*
 * The refined design system for GetWithUs: Hybrid Premium (concept E) with the
 * structure and restraint of Minimal Corporate (concept B). Every value the
 * alternative homepage and its /design/hybrid-system reference use comes from here.
 */

export type Token = { name: string; hex: string; use: string };

export const systemColors = {
  navy: [
    { name: "Navy 950", hex: "#08112A", use: "Footer, deepest band" },
    { name: "Navy 900", hex: "#0B1631", use: "Primary brand colour: navigation, hero, dark bands" },
    { name: "Navy 800", hex: "#12204A", use: "Raised surfaces on navy" },
    { name: "Navy 700", hex: "#22305C", use: "Rules and borders on navy" },
    { name: "Navy 600", hex: "#33447A", use: "Strong borders on navy, outline buttons" },
  ],
  paper: [
    { name: "White", hex: "#FFFFFF", use: "Cards, alternate sections" },
    { name: "Warm white", hex: "#F7F6F2", use: "Page background for reading sections" },
    { name: "Paper shade", hex: "#EFEDE6", use: "Illustration panels, quiet fills" },
  ],
  ink: [
    { name: "Ink", hex: "#0F1424", use: "Text on light" },
    { name: "Slate", hex: "#4A5065", use: "Secondary text on light" },
    { name: "Slate muted", hex: "#5E6478", use: "Captions and meta on light" },
    { name: "Navy text", hex: "#F4F6FB", use: "Text on navy" },
    { name: "Mist", hex: "#AEB7CE", use: "Secondary text on navy" },
  ],
  rules: [
    { name: "Rule", hex: "#E3E1DA", use: "Dividers and card borders on light" },
    { name: "Rule strong", hex: "#C9C6BC", use: "Hover borders, inputs on light" },
  ],
  blue: [
    { name: "Blue 600", hex: "#2052E8", use: "Accent: primary buttons and links on light" },
    { name: "Blue 700", hex: "#1842C4", use: "Accent hover and pressed" },
    { name: "Blue 300", hex: "#8EAEFF", use: "Accent text and focus ring on navy" },
  ],
  status: [
    { name: "Success", hex: "#1F7A4F", use: "Confirmation text and icons" },
    { name: "Error", hex: "#B42318", use: "Error text and field borders" },
  ],
} as const satisfies Record<string, readonly Token[]>;

/** CSS custom properties for light sections; navy sections override them (see navyTone). */
const systemVars = {
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
} as const;

export const systemPage = {
  slug: "final",
  scheme: "light",
  canvas: "#F7F6F2",
  vars: systemVars,
} as const;

export const systemType = [
  {
    role: "Display (H1)",
    spec: "Instrument Serif 400, 44 to 76 px, line height 1.0, tracking -0.01em",
    sample: "Build with us.",
  },
  {
    role: "Heading 2",
    spec: "Instrument Serif 400, 36 to 52 px, line height 1.04",
    sample: "Three practices, one team.",
  },
  {
    role: "Heading 3, editorial",
    spec: "Instrument Serif 400, 28 px, line height 1.15",
    sample: "Digital Engineering",
  },
  {
    role: "Heading 3, interface",
    spec: "Instrument Sans 600, 18 px, line height 1.35",
    sample: "Web application development",
  },
  {
    role: "Lead",
    spec: "Instrument Sans 400, 17 to 19 px, line height 1.6",
    sample: "One team designs, engineers, markets, and automates.",
  },
  {
    role: "Body",
    spec: "Instrument Sans 400, 16 px, line height 1.6, measure 68 characters",
    sample: "You see working software every week.",
  },
  {
    role: "Small and labels",
    spec: "Instrument Sans 500, 14 px, line height 1.5",
    sample: "Concept project",
  },
  { role: "Button", spec: "Instrument Sans 500, 15 px, line height 1", sample: "Start a project" },
] as const;

export const systemSpacing = [
  { token: "1", px: 4, use: "Icon gaps" },
  { token: "2", px: 8, use: "Inline gaps, badge padding" },
  { token: "3", px: 12, use: "List rows" },
  { token: "4", px: 16, use: "Button gaps, small stacks" },
  { token: "6", px: 24, use: "Card padding on phones, grid gaps, page gutter on phones" },
  { token: "8", px: 32, use: "Card padding, gaps between groups" },
  { token: "10", px: 40, use: "Page gutter from 768 px" },
  { token: "12", px: 48, use: "Heading to content" },
  { token: "16", px: 64, use: "Section padding on phones" },
  { token: "24", px: 96, use: "Section padding from 768 px" },
] as const;

export const systemRadii = [
  { name: "Control", px: 8, use: "Buttons, inputs, menu items" },
  { name: "Card", px: 12, use: "Cards, panels, frames" },
  { name: "Pill", px: 999, use: "Badges" },
] as const;

export const systemBreakpoints = [
  { name: "Base", min: 0, layout: "One column, 24 px gutters, full-width buttons, menu button" },
  { name: "sm", min: 640, layout: "Buttons side by side, two-column grids where items are short" },
  {
    name: "md",
    min: 768,
    layout: "Label column beside headings, 40 px gutters, 96 px section padding",
  },
  { name: "lg", min: 1024, layout: "Full navigation, three-column practice grid, two-column hero" },
  { name: "xl", min: 1280, layout: "Content capped at 1240 px; extra width becomes margin" },
] as const;

export const systemMotion = [
  { name: "Hover colour", duration: "180 ms", easing: "ease-out", use: "Links, buttons, borders" },
  {
    name: "Underline draw",
    duration: "220 ms",
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    use: "Navigation and text links",
  },
  {
    name: "Arrow nudge",
    duration: "200 ms",
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    use: "Arrow inside a button moves 3 px; the button never moves",
  },
  {
    name: "Card rule",
    duration: "300 ms",
    easing: "ease-out",
    use: "Blue line draws across the top of a hovered card",
  },
  {
    name: "Menu open",
    duration: "220 ms",
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    use: "Phone menu fades and drops 8 px",
  },
  {
    name: "Section reveal",
    duration: "Tied to scroll, first 32% of entry",
    easing: "linear",
    use: "Content rises 18 px as it enters; CSS only, content visible without it",
  },
] as const;

export const systemRules = [
  "Serif for display and section headings only; every interface label, card title, and button uses the sans.",
  "Electric blue is for action: buttons, links, focus. Never for decoration or large fills.",
  "Navy marks the statement moments (hero, commitments, call to action); warm white is for reading.",
  "One primary button per view. The secondary action is a text link or an outline button.",
  "No motion that runs forever. Every animation answers a scroll or a pointer and then stops.",
  "Under reduced motion: no reveals, no transitions beyond colour.",
  "Every text pairing at 4.5:1 or more; body text at 7:1 or more.",
] as const;
