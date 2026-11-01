# Design system

Concept: Modern Engineering. The site reads like a well-made technical document: carbon surfaces, one signal colour (cyan) for actions and data, square panels marked by corner brackets, a visible layout grid behind every page, and monospaced labels for indices and specifications. Dark theme only. Chosen in the design lab (direction D, see [design-lab/README.md](design-lab/README.md)) and adopted in [decisions/0012-design-modern-engineering.md](decisions/0012-design-modern-engineering.md).

Principles:

1. Monospace only for small labels, indices, and specifications ("01 / services", "service_01", "step_01"). Everything people read at length is sans, in sentence case.
2. Cyan is the signal: primary buttons, links, active states, focus, and data in diagrams. Never large fills or body text.
3. Panels are square, marked by 12 px corner brackets; brackets turn cyan when the panel is hovered.
4. The layout grid is always visible behind the content and never competes with it.
5. One primary button per view. The secondary action is an outline button or a text link.
6. No motion that runs forever, with one exception: the hero circuit (figure 01) runs continuously while it is on screen, at the owner's request. Everything else answers the visitor or plays once as content enters.

## Tokens

Defined once in `src/styles/tokens.css` as a Tailwind `@theme static` block, so each token is both a CSS variable on `:root` and a utility (`bg-ink`, `text-fog-2`, `border-line`). The default Tailwind palette is cleared, so no other hue can be used through a class (`text-white` generates nothing; use a token). The 3D panels read the same variables at mount.

| Token         | Value     | Use                                                        |
| ------------- | --------- | ---------------------------------------------------------- |
| `ink-0`       | `#0B0D0F` | Footer, deepest surface                                    |
| `ink`         | `#0F1113` | Page background                                            |
| `ink-1`       | `#13161A` | Raised sections (at 80 percent, so the grid shows faintly) |
| `ink-2`       | `#171A1E` | Panels: cards, menus, inputs, the diagram                  |
| `ink-3`       | `#1D2126` | Panel hover                                                |
| `grid`        | `#1B1F24` | The layout grid behind every page                          |
| `line`        | `#262B31` | Borders and dividers                                       |
| `line-strong` | `#353C44` | Outline buttons, timelines, hovered panel edges            |
| `fog`         | `#E6E9EC` | Primary text                                               |
| `fog-2`       | `#A0A8B2` | Secondary text, leads                                      |
| `fog-3`       | `#848D98` | Monospaced labels, captions, placeholders                  |
| `signal`      | `#2CD5E6` | Accent: primary buttons, links, focus ring, diagram data   |
| `signal-2`    | `#5FE2EF` | Accent hover and pressed                                   |
| `signal-tint` | `#0E2A2E` | Icon tiles behind cyan                                     |
| `ok`          | `#3DD68C` | Success only                                               |
| `err`         | `#FF7A70` | Errors only                                                |

Contrast (WCAG ratio):

| Text     | on `ink-0` | on `ink` | on `ink-1` | on `ink-2` | on `ink-3` |
| -------- | ---------: | -------: | ---------: | ---------: | ---------: |
| `fog`    |      15.97 |    15.53 |      14.89 |      14.32 |      13.28 |
| `fog-2`  |       8.10 |     7.87 |       7.55 |       7.26 |       6.73 |
| `fog-3`  |       5.79 |     5.63 |       5.40 |       5.19 |       4.81 |
| `signal` |      10.91 |    10.60 |      10.17 |       9.78 |       9.07 |
| `err`    |       7.67 |     7.45 |       7.15 |       6.87 |       6.37 |

Button labels are `ink` on `signal` (10.60:1) and on `signal-2` (12.26:1). Every text and background pair stays at or above 4.5:1; body text at or above 7:1. Check contrast after any change.

Radius: `rounded-tag` and `rounded-control` are 2 px (tags, inputs, buttons, chips); `rounded-card` and `rounded-panel` are 0 (cards, menus, panels), with corner brackets instead. Radio buttons stay round. No box shadows; depth comes from the carbon steps and borders. 8 px grid; sections pad 96 px from 768 px and 64 px below; the container is 1200 px wide with 24 px side padding (40 px from 768 px).

## Type

Archivo (variable, width axis) through `next/font`, with headings at 92 percent width, and JetBrains Mono 400 for labels and for code and identifiers in the admin. Use the `type-*` utilities from `src/styles/globals.css`, never raw sizes:

| Utility             | Below 768 px | From 768 px | Line height | Tracking | Weight | Width |
| ------------------- | -----------: | ----------: | ----------- | -------- | ------ | ----- |
| `type-display` (h1) |        40 px |       60 px | 1.04        | -0.02em  | 600    | 92    |
| `type-h2`           |        30 px |       40 px | 1.1         | -0.02em  | 600    | 92    |
| `type-h3`           |        20 px |       20 px | 1.3         | -0.01em  | 600    | 92    |
| `type-h4`           |        18 px |       18 px | 1.35        | 0        | 600    | 100   |
| `type-lead`         |        17 px |       18 px | 1.6         | 0        | 400    | 100   |
| `type-body`         |        16 px |       16 px | 1.6         | 0        | 400    | 100   |
| `type-small`        |        14 px |       14 px | 1.5         | 0        | 400    | 100   |
| `type-label` (mono) |        12 px |       12 px | 1.5         | 0        | 400    | n/a   |
| `type-button`       |        15 px |       15 px | 1           | 0        | 500    | 100   |

60 px is the largest text on the site. `type-label` lowercases with CSS, so the source keeps sentence case for screen readers. Body text is capped near 68 characters, everything is left-aligned (except the 404 page), and headings carry no coloured or italic accents. Heading levels never skip; when a design calls for a smaller look, keep the level and change the utility (footer column titles are `h2` with `type-label`).

## Layout patterns

- `GridBackdrop` (`src/components/layout`): fixed behind the marketing pages; 4 columns below 768 px, 12 from 768 px, aligned to the container, drawn in `grid`.
- `SectionHeading` (`src/components/ui`): the monospaced index ("01 / services") in a 200 px column from 768 px, then the `h2` and an optional lead. Content below it that should line up with the heading uses `md:ml-[224px]`.
- `PageHeader` (`src/components/sections`): an inner page's opening; a cyan prompt line ("> services"), the `h1`, the lead, ruled off below.
- `Brackets` (`src/components/ui`): the four corner brackets; muted at rest and cyan on hover of the parent `group` or while it carries `data-active`, or always cyan (`always`) on the closing call-to-action panel.
- Figures: numbered, bracketed, with a monospaced caption ("fig. 01 / ..."), decorative (`aria-hidden`) because the text beside them carries the content. Figure 01 is the hero diagram (`ServiceDiagram`); figure 02 is the blueprint (`BlueprintFigure`, drawn in isometric with `blueprintGeometry`, driven by `BlueprintController`), pinned beside the service cards from 1024 px and under the header on smaller screens.
- Specification lists: one ruled row per item with a monospaced prefix ("+", "step_01"); datasheets are hairline grids (`gap-px bg-line` around `bg-ink` cells).
- Raised sections (`bg-ink-1/80`) alternate with base sections on the home page.

## Components

`src/components/ui`, one component per file, default export, typed props, no business logic. Anything with focus or keyboard behaviour is built on Radix (`radix-ui`).

- Actions: `Button` (`primary`, `secondary`, `ghost`; `sm`, `md`, `lg`; `loading` keeps its width; renders a link with `href`).
- Forms: `Field` (label, hint, error, and the `aria-describedby` wiring, passed to its control through a render prop), `Input`, `Textarea`, `Select` (native), `Checkbox`, `RadioGroup`, `ChipGroup`, `CodeInput` (six boxes, paste, auto-advance, backspace).
- Overlays and disclosure: `Dialog`, `Sheet` (mobile menu), `DropdownMenu`, `Tooltip`, `Tabs`, `Accordion` (FAQ, each trigger inside an `h3`, a cyan plus that turns to a cross).
- Display: `Badge` (always carries text, so colour is never the only signal), `Table` (whole row clickable through a stretched link), `Skeleton`, `EmptyState`, `ErrorState`, `Toast` (sonner, loaded lazily).
- Layout: `Container`, `Section`, `SectionHeading`, `Brackets`, `Prose`, `Logo`, `Icon` (lucide, stroke 1.75, sizes 16, 20, 24).

`src/components/layout` has the header (current page in cyan), mega menu, mobile menu, grid backdrop, footer, and skip link; `src/components/sections` has the page sections, including `ServiceDiagram` (figure 01 on the home page); `src/components/admin` the admin screens.

## Motion

Allowed in exactly these places:

1. The home hero reveal: the tagline, heading, lead, and actions fade in and rise 8 px over 500 ms with a 60 ms stagger, on the first page load only.
2. Section reveals: blocks marked `.reveal` that start below the fold rise 18 px and fade in once, over 600 ms, as they enter. `RevealObserver` (`src/components/layout`, an IntersectionObserver) marks blocks already on screen at load as static, so nothing visible is ever hidden and no text rests half faded; without JavaScript every block simply shows. Never on a hero.
3. The hero circuit (figure 01): on load the wires draw in and the boards and core power on (about 1 s); then current streams along every wire, each board flashes as it fires glowing packets into the core (two per wire, 2.4 s a trip, clockwise in turn), the core breathes, scans, and ripples as packets arrive, and two dashed rings turn around it. It runs only while on screen and the tab is visible (`DiagramLive` pauses the CSS and SVG animations otherwise), it is not shown below 640 px, and under reduced motion it is drawn complete and still, with no packets.
4. The blueprint (figure 02, home page): beside the service cards, four slabs drop into place one per card as the cards pass the reading line, scrubbing both ways with scroll; the marketing slab's bars rise as it settles, and once all four sit, the uplink pulses three passes. Under reduced motion slabs are either waiting or docked, never in between.
5. The service page 3D panels: one station turning slowly (0.15 rad/s) at 30 frames per second while on screen.
6. Transitions that answer an action: menus, accordion, dialog, sheet, toast, code success, the 220 ms link underline, and hover colours. 150 to 250 ms, ease-out. Defined as keyframes and utilities in `globals.css`.
7. Loading: skeletons and the button spinner.

`prefers-reduced-motion` turns off the hero reveal, the section reveals, the pulses, and the transitions, makes the blueprint's slabs jump between waiting and docked, and renders a single still frame in the 3D panels. Buttons never move: hover changes background or border colour only. No smooth scroll library, no parallax, no pinned sections.

## Hard rules checklist

Run `pnpm guard` (part of `pnpm check` and `pnpm build`); it enforces the mechanical ones under `src/`. The rest need a person.

- [ ] No purple, violet, fuchsia, or indigo anywhere: UI, 3D panels, emails, favicon.
- [ ] No colour gradients. (The `link-draw` underline is a solid `currentColor` image, not a gradient between colours.)
- [ ] No moving buttons: no scale, tilt, sliding highlight, animated border, or pointer following.
- [ ] No fake social proof: no reviews, testimonials, client logos, star ratings, "trusted by" strips, or quotes.
- [ ] No metrics or statistics unless the owner supplies the figure and its source in a content file.
- [ ] No heading larger than 60 px on desktop and 40 px on mobile.
- [ ] No emoji anywhere, including docs and commit messages. Icons from lucide only.
- [ ] No em dashes or en dashes in copy, comments, emails, or docs. Use a comma, period, colon, or "to" for ranges.
- [ ] No scroll effects besides the one-time section reveals and the home page blueprint: no parallax, other scroll-linked movement or pinned sections, counters, typing text, or marquees.
- [ ] No endless animation, except the hero circuit, which pauses off screen and in background tabs and is still under reduced motion.
- [ ] No stock photography or AI imagery. Only the 3D panels, hand-made SVG, and real photos or screenshots with permission.
- [ ] No banned vocabulary (the guard lists it, for example "seamless", "cutting-edge", "unlock", "leverage", "elevate", "harness").
- [ ] No custom cursors or cursor effects.
- [ ] No template or tool branding ("Built with", "Powered by", Next.js or Vercel logos).
- [ ] No lorem ipsum, `TODO`, `FIXME`, commented-out code, or unused exports.
- [ ] Monospace only for labels, indices, specifications, and identifiers; never for paragraphs.
- [ ] Sentence case for every heading, label, and button in the source; no all-caps labels.
- [ ] Every call to action names what happens ("Send and verify", "Resend code"), never "Submit" or "Learn more".
- [ ] Every page has a unique title (under 60 characters) and description (under 160), a canonical URL, an Open Graph image, and JSON-LD where relevant.
- [ ] Every field has a visible label, an associated error, and works by keyboard; every interactive element shows the cyan focus ring.
- [ ] Everything that can fail has a failure state the user can act on, with a reference ID where useful.
- [ ] Owner facts are written as `[OWNER: ...]` until supplied, never guessed.
