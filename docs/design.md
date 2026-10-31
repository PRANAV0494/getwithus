# Design system

Concept: one light. Everything is lit by a single warm lamp inside the 3D scene, and the UI's accent is that lamp's color. Nothing else glows. The 3D world carries the visual weight; the type and components stay calm and conventional. Dark theme only.

## Tokens

Defined once in `src/styles/tokens.css` as a Tailwind `@theme static` block, so each token is both a CSS variable on `:root` and a utility (`bg-ink`, `text-fog-2`, `border-line`). The default Tailwind palette is cleared, so no other hue can be used through a class. The 3D scene reads the same variables at mount.

| Token         | Value                       | Use                                                      |
| ------------- | --------------------------- | -------------------------------------------------------- |
| `ink`         | `#0B0E13`                   | Page background                                          |
| `ink-2`       | `#121721`                   | Raised surfaces: cards, menus, inputs                    |
| `ink-3`       | `#1A2130`                   | Surface hover                                            |
| `line`        | `rgba(230, 233, 238, 0.10)` | Borders and dividers                                     |
| `line-strong` | `rgba(230, 233, 238, 0.22)` | Input borders, focused cards                             |
| `fog`         | `#E6E9EE`                   | Primary text (15.9:1 on ink)                             |
| `fog-2`       | `#9AA3B2`                   | Secondary text (7.6:1 on ink)                            |
| `fog-3`       | `#7A8494`                   | Placeholders, disabled (5.1:1 on ink)                    |
| `lamp`        | `#F0B35A`                   | Accent: primary buttons, links, focus ring, the 3D light |
| `lamp-2`      | `#D99A3E`                   | Accent hover and pressed                                 |
| `ok`          | `#5FBF8F`                   | Success only                                             |
| `err`         | `#E06C6C`                   | Errors only                                              |

Every text and background pair stays at or above 4.5:1; body text at or above 7:1. Check contrast after any change.

Radius is hierarchical: `rounded-tag` 4 px (tags, code), `rounded-control` 6 px (inputs, buttons), `rounded-card` 10 px (cards, menus), `rounded-panel` 16 px (the brief wizard panel). No box shadows; depth comes from the ink steps and borders. 8 px grid; sections pad 96 px on desktop and 64 px on mobile; the container is 1200 px wide with 24 px side padding (40 px from 768 px).

## Type

One family, Schibsted Grotesk (400, 500, 600, 700) through `next/font`, with Geist Mono only for code and identifiers in the admin. Use the `type-*` utilities from `src/styles/globals.css`, never raw sizes:

| Utility             | Mobile | Desktop | Line height | Tracking | Weight |
| ------------------- | ------ | ------- | ----------- | -------- | ------ |
| `type-display` (h1) | 32 px  | 44 px   | 1.1         | -0.02em  | 600    |
| `type-h2`           | 26 px  | 32 px   | 1.15        | -0.015em | 600    |
| `type-h3`           | 20 px  | 22 px   | 1.25        | -0.01em  | 600    |
| `type-h4`           | 18 px  | 18 px   | 1.35        | 0        | 600    |
| `type-lead`         | 17 px  | 19 px   | 1.55        | 0        | 400    |
| `type-body`         | 16 px  | 16 px   | 1.6         | 0        | 400    |
| `type-small`        | 14 px  | 14 px   | 1.5         | 0        | 400    |
| `type-button`       | 15 px  | 15 px   | 1           | 0        | 500    |

44 px is the largest text on the site. Body text is capped at 68 characters (`max-w-[68ch]`), everything is left-aligned (except the 404 page), and headings carry no colored or italic accents. Heading levels never skip; when a design calls for a smaller look, keep the level and change the utility (process step titles are `h3` with `type-h4`; footer column titles are `h2` with `type-small`).

## Components

`src/components/ui`, one component per file, default export, typed props, no business logic. Anything with focus or keyboard behavior is built on Radix (`radix-ui`).

- Actions: `Button` (`primary`, `secondary`, `ghost`; `sm`, `md`, `lg`; `loading` keeps its width; renders a link with `href`).
- Forms: `Field` (label, hint, error, and the `aria-describedby` wiring, passed to its control through a render prop), `Input`, `Textarea`, `Select` (native), `Checkbox`, `RadioGroup`, `ChipGroup`, `CodeInput` (six boxes, paste, auto-advance, backspace).
- Overlays and disclosure: `Dialog`, `Sheet` (mobile menu), `DropdownMenu`, `Tooltip`, `Tabs`, `Accordion` (FAQ, each trigger inside an `h3`).
- Display: `Badge` (always carries text, so color is never the only signal), `Table` (whole row clickable through a stretched link), `Skeleton`, `EmptyState`, `ErrorState`, `Toast` (sonner, loaded lazily).
- Layout: `Container`, `Section`, `Prose`, `Logo`, `Icon` (lucide, stroke 1.75, sizes 16, 20, 24).

`src/components/layout` has the header, mega menu, mobile menu, footer, and skip link; `src/components/sections` has the page sections; `src/components/admin` the admin screens.

## Motion

Allowed in exactly four places:

1. The home hero reveal: heading, lead, and buttons fade in and rise 8 px over 500 ms with a 60 ms stagger, on the first page load only.
2. The 3D camera, driven by scroll.
3. Transitions that answer an action: menus, accordion, dialog, sheet, toast, code success. 150 to 250 ms, ease-out. Defined as keyframes in `globals.css` (`animate-menu-in`, `animate-dialog-in`, and so on).
4. Loading: skeletons and the button spinner.

`prefers-reduced-motion` turns off the reveal and the transitions and freezes the 3D camera at the hero view. Buttons never move: hover changes background or border color only, over 150 ms. No smooth scroll library, no parallax, no entrance animations on sections.

## Hard rules checklist

Run `pnpm guard` (part of `pnpm check` and `pnpm build`); it enforces the mechanical ones under `src/`. The rest need a person.

- [ ] No purple, violet, fuchsia, or indigo anywhere: UI, 3D scene, emails, favicon.
- [ ] No colored gradients. The only gradient is a fade from transparent to `ink`, blending the canvas into content.
- [ ] No moving buttons: no scale, tilt, sliding highlight, animated border, or pointer following.
- [ ] No fake social proof: no reviews, testimonials, client logos, star ratings, "trusted by" strips, or quotes.
- [ ] No metrics or statistics unless the owner supplies the figure and its source in a content file.
- [ ] No heading larger than 44 px on desktop and 32 px on mobile.
- [ ] No emoji anywhere, including docs and commit messages. Icons from lucide only.
- [ ] No em dashes or en dashes in copy, comments, emails, or docs. Use a comma, period, colon, or "to" for ranges.
- [ ] No scroll effects besides the 3D camera: no parallax, section entrances, pinned sections, counters, typing text, or marquees.
- [ ] No stock photography or AI imagery. Only the 3D scene, hand-made SVG, and real photos or screenshots with permission.
- [ ] No banned vocabulary (the guard lists it, for example "seamless", "cutting-edge", "unlock", "leverage", "elevate", "harness").
- [ ] No custom cursors or cursor effects.
- [ ] No template or tool branding ("Built with", "Powered by", Next.js or Vercel logos).
- [ ] No lorem ipsum, `TODO`, `FIXME`, commented-out code, or unused exports.
- [ ] Sentence case for every heading, label, and button; no all-caps labels.
- [ ] Every call to action names what happens ("Send and verify", "Resend code"), never "Submit" or "Learn more".
- [ ] Every page has a unique title (under 60 characters) and description (under 160), a canonical URL, an Open Graph image, and JSON-LD where relevant.
- [ ] Every field has a visible label, an associated error, and works by keyboard; every interactive element shows the lamp focus ring.
- [ ] Everything that can fail has a failure state the user can act on, with a reference ID where useful.
- [ ] Owner facts are written as `[OWNER: ...]` until supplied, never guessed.
