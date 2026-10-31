# 0012. The live site adopts the Modern Engineering design

Date: 2026-11-01

## Context

The site shipped on the spec's "one light" design: an amber lamp as the only accent, Schibsted Grotesk, rounded cards, headings capped at 44 px, and a scroll-driven 3D scene behind the home page. The design lab (`/design`, [design-lab/README.md](../design-lab/README.md)) explored five directions, scored them, and the owner selected D, Modern Engineering, then asked for it to replace the live design on every page. That changes rules the spec set: the accent colour, the fonts, the heading sizes, the corner radii, scroll reveals, and the home page's 3D scene.

## Decision

- Tokens keep their names where the role is unchanged (`ink`, `fog`, `line`, and steps) and take D's values; the accent token is renamed from `lamp` to `signal` (`#2CD5E6`), with `signal-2` for hover and `signal-tint` for icon tiles. New tokens: `ink-0` (footer), `ink-1` (raised sections), `grid`. Radii drop to 2 px for controls and 0 for panels, which carry corner brackets instead.
- Type is Archivo (headings at 92 percent width, up to 60 px) and JetBrains Mono for small lowercase labels only. The Open Graph images use a static Archivo SemiBold TTF in `src/assets/fonts`.
- The home page drops the 3D scene. Its hero is the copy beside figure 01, an SVG diagram of the four service lines around the client's business with pulses that run three passes and stop. The service pages keep their 3D station panels, framed in D's bracketed figure and lit in cyan. The scroll-driven camera rig, the scroll progress in the scene store, and the `?no3d=1` test switch are removed.
- Sections may reveal as they enter (`.reveal`), never on a hero, and off under reduced motion. The lab used CSS scroll-driven animation (`animation-timeline: view()`), but that ties opacity to scroll position, so a block resting at the fold of an unscrolled page stays half faded and its text fails contrast (Lighthouse caught it on `/services` and `/about`). The live site uses a small IntersectionObserver instead (`RevealObserver`): blocks on screen at load are never hidden, blocks below the fold fade up once over 600 ms as they enter, and without JavaScript nothing is hidden.
- Content, routes, forms, the admin, and the information architecture are unchanged. The brand name is written GetWithUs, as in the brief, and the tagline "Build with us. Grow with us." appears in the hero and footer.

[design.md](../design.md) is rewritten to describe the result; its hard rules now allow 60 px headings and the section reveals, and add "no endless animation".

## Consequences

- No 3D code loads on the home page. Its initial JavaScript fell from 176.3 to 173.1 KB gzipped (including the 0.3 KB reveal observer), and the three, fiber, and drei chunk now loads on service pages only.
- [0009-scene-mount-timing.md](0009-scene-mount-timing.md) and [0008-no-smooth-scroll.md](0008-no-smooth-scroll.md) now apply to the service page panels only; the home page has no scene to mount or scroll.
- Every surface changed colour at once because components use tokens; the admin, forms, emails, icons, and Open Graph images moved to cyan with no per-component work beyond the rename.
- The visual baselines (`tests/e2e/visual.spec.ts-snapshots`) were regenerated for Windows; the Linux set must be refreshed from the CI artifact before CI's visual job passes again.
- The design lab stays at `/design` (noindex, framed only by itself) as the record of the decision.
