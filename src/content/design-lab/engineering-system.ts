/*
 * The selected design system for GetWithUs: Modern Engineering (concept D),
 * refined. Every value the final homepage (/design/final) and the system
 * reference (/design/system) use comes from here.
 */

export type Token = { name: string; hex: string; use: string };

export const engineeringColors = {
  carbon: [
    { name: "Carbon 950", hex: "#0B0D0F", use: "Footer, deepest surface" },
    { name: "Carbon 900", hex: "#0F1113", use: "Page background" },
    { name: "Carbon 850", hex: "#13161A", use: "Raised sections" },
    { name: "Panel", hex: "#171A1E", use: "Cards, diagram nodes, tables" },
    { name: "Panel raised", hex: "#1D2126", use: "Hovered rows and panels" },
  ],
  lines: [
    { name: "Grid", hex: "#1B1F24", use: "The layout grid behind every page" },
    { name: "Border", hex: "#262B31", use: "Panel and table edges, dividers" },
    { name: "Border strong", hex: "#353C44", use: "Outline buttons, timelines, hover edges" },
  ],
  text: [
    { name: "Text", hex: "#E6E9EC", use: "Headings and body" },
    { name: "Text secondary", hex: "#A0A8B2", use: "Leads, descriptions" },
    { name: "Text muted", hex: "#848D98", use: "Monospaced labels, captions, meta" },
  ],
  signal: [
    {
      name: "Signal cyan",
      hex: "#2CD5E6",
      use: "Primary buttons, active states, focus, diagram data",
    },
    { name: "Cyan bright", hex: "#5FE2EF", use: "Primary button hover" },
    { name: "On cyan", hex: "#061417", use: "Text on cyan" },
    { name: "Cyan tint", hex: "#0E2A2E", use: "Icon tiles and badges behind cyan" },
  ],
  status: [
    { name: "Success", hex: "#3DD68C", use: "Confirmations" },
    { name: "Error", hex: "#FF7A70", use: "Errors and field borders" },
  ],
} as const satisfies Record<string, readonly Token[]>;

export const engineeringPage = {
  slug: "final",
  scheme: "dark",
  canvas: "#0F1113",
  vars: {
    "--lab-bg": "#0F1113",
    "--lab-bg-alt": "#13161A",
    "--lab-surface": "#171A1E",
    "--lab-surface-2": "#1D2126",
    "--lab-grid": "#1B1F24",
    "--lab-border": "#262B31",
    "--lab-border-strong": "#353C44",
    "--lab-text": "#E6E9EC",
    "--lab-text-2": "#A0A8B2",
    "--lab-text-3": "#848D98",
    "--lab-accent": "#2CD5E6",
    "--lab-accent-hover": "#5FE2EF",
    "--lab-accent-text": "#2CD5E6",
    "--lab-on-accent": "#061417",
    "--lab-focus": "#2CD5E6",
  },
} as const;

export const engineeringType = [
  {
    role: "Display (H1)",
    spec: "Archivo 600, width 92, 40 to 60 px, line height 1.04, tracking -0.02em",
    sample: "We build software.",
  },
  {
    role: "Heading 2",
    spec: "Archivo 600, width 92, 30 to 40 px, line height 1.1",
    sample: "Three practices, one team.",
  },
  { role: "Heading 3", spec: "Archivo 600, 20 px, line height 1.3", sample: "Digital Engineering" },
  {
    role: "Lead",
    spec: "Archivo 400, 17 to 18 px, line height 1.6",
    sample: "One team designs, engineers, markets, and automates.",
  },
  {
    role: "Body",
    spec: "Archivo 400, 16 px, line height 1.6, measure 68 characters",
    sample: "You see working software every week.",
  },
  {
    role: "Interface",
    spec: "Archivo 500, 14 to 15 px, sentence case",
    sample: "Web application development",
  },
  {
    role: "Label (mono)",
    spec: "JetBrains Mono 400, 12 px, lowercase; indices, ids, and specifications only",
    sample: "01 / practices",
  },
  { role: "Button", spec: "Archivo 500, 15 px, line height 1", sample: "Start a project" },
] as const;

export const engineeringSpacing = [
  { token: "1", px: 4, use: "Icon gaps" },
  { token: "2", px: 8, use: "Inline gaps" },
  { token: "3", px: 12, use: "Corner bracket length, table rows" },
  { token: "4", px: 16, use: "Button gaps, small stacks" },
  { token: "6", px: 24, use: "Panel padding on phones, grid gaps, page gutter on phones" },
  { token: "7", px: 28, use: "Panel padding" },
  { token: "10", px: 40, use: "Page gutter from 768 px" },
  { token: "12", px: 48, use: "Heading to content" },
  { token: "16", px: 64, use: "Section padding on phones" },
  { token: "24", px: 96, use: "Section padding from 768 px" },
] as const;

export const engineeringRadii = [
  { name: "Control", px: 2, use: "Buttons, inputs, badges" },
  { name: "Panel", px: 0, use: "Cards and tables, marked by 12 px corner brackets" },
] as const;

export const engineeringBreakpoints = [
  {
    name: "Base",
    min: 0,
    layout: "One column, 24 px gutters, full-width buttons, practice list instead of the diagram",
  },
  {
    name: "sm",
    min: 640,
    layout: "Buttons side by side; the system diagram appears below the hero text",
  },
  {
    name: "md",
    min: 768,
    layout:
      "Section index column beside headings, 40 px gutters, 96 px section padding, 12-column grid",
  },
  {
    name: "lg",
    min: 1024,
    layout: "Full navigation, diagram beside the hero, three-column practices, six-step pipeline",
  },
  { name: "xl", min: 1280, layout: "Content capped at 1200 px; the grid continues to the edges" },
] as const;

export const engineeringMotion = [
  { name: "Hover colour", duration: "180 ms", easing: "ease-out", use: "Links, buttons, borders" },
  {
    name: "Underline draw",
    duration: "220 ms",
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    use: "Navigation and text links",
  },
  {
    name: "Arrow extend",
    duration: "200 ms",
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    use: "Arrow inside a button moves 3 px; the button never moves",
  },
  {
    name: "Bracket signal",
    duration: "200 ms",
    easing: "ease-out",
    use: "Corner brackets and borders of a hovered panel turn cyan",
  },
  {
    name: "Diagram pulses",
    duration: "3.2 s per pass, 3 passes",
    easing: "linear",
    use: "Data travels between practices when the page opens, then stops",
  },
  {
    name: "Section reveal",
    duration: "Tied to scroll, first 32% of entry",
    easing: "linear",
    use: "Content rises 18 px as it enters; CSS only, content visible without it",
  },
] as const;

export const engineeringRules = [
  "Monospace only for labels, indices, and specifications at 11 to 13 px. Everything people read at length is sans, in sentence case.",
  "Cyan is the signal: actions, active states, focus, and data in diagrams. Never large fills or body text.",
  "Panels are square, marked by corner brackets; brackets and borders turn cyan on hover.",
  "The layout grid is always visible behind the content and never competes with it.",
  "One primary button per view. The secondary action is an outline button or a text link.",
  "No motion that runs forever: the diagram pulses three times and stops; everything else answers the visitor.",
  "Body text at 7:1 or more; muted labels at 4.5:1 or more on every surface.",
] as const;
