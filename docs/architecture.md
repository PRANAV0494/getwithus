# Architecture

## Layers

```text
src/
  app/          routes only: pages, layouts, route handlers, metadata files
  components/   UI. Never imports src/server or a feature repository
    ui/         the kit (Button, Field, Dialog, Table, ...)
    layout/     header, mega menu, mobile menu, footer
    sections/   page sections built from content
    forms/      contact form, project brief, verification step
    three/      the 3D scene (client only)
    admin/      admin screens
  features/     business logic per domain: schema, service, repository, actions
    leads/  verification/  notifications/  admin/  case-studies/  maintenance/
  server/       infrastructure: database client and schema, email, rate limiter, auth, request helpers
  lib/          framework-free helpers: Result, AppError, logger, http envelope, dates, SEO
  config/       env (validated), flags, site facts, public env for the browser
  content/      all copy, typed
  stores/       the two Zustand stores
  hooks/        browser hooks shared by components
```

Dependency direction is one way: `app` uses `components` and `features`; `features` use `server` and `lib`; `server` uses `lib`; nothing imports `app`. ESLint enforces the important edges: components cannot import `@/server/*` or `@/features/*/repository`, nothing imports with `../../`, and only `src/config/env.ts` and `src/config/public-env.ts` read `process.env`.

Inside a feature:

| File            | Role                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `schema.ts`     | Zod schemas. Shared with the browser ones use `zod/mini` to keep client bundles small               |
| `repository.ts` | The only code that touches the database. Every query is wrapped in `try/catch` and returns `Result` |
| `service.ts`    | Business rules. Returns `Result<T, AppError>`; throws only for programmer errors                    |
| `actions.ts`    | Server actions for the admin, each wrapped in `withAction` and guarded by `requireAdmin()`          |

Route handlers in `src/app/api/v1` stay thin: origin check, rate limit, parse, call the service, map the `Result` with `ok()`/`fail()`/`toResponse()` from `src/lib/http.ts`. `withHandler` assigns the request ID, catches anything unexpected once, logs it, and answers `INTERNAL` with the ID.

## A lead, end to end

1. The visitor opens `/contact` or `/start`. The page is static HTML from the build. The form hydrates after the page and fetches a form token (`GET /api/v1/forms/token`, an HMAC-signed timestamp).
2. Submit: `POST /api/v1/leads`. The handler checks the `Origin`, parses the body, and calls `submitLead`, which checks the token age (at least 3 seconds, at most 2 hours), the honeypot (a filled honeypot gets a fake success and nothing is stored), Turnstile when configured, and the rate limits (5 per hour per IP, 3 per hour per email). Then, in one transaction, it inserts the lead (`pending_verification`), a verification row (the code stored only as an HMAC), and a `created` event, and emails the code.
3. The visitor types the code: `POST /api/v1/leads/verify`. A correct code marks the verification consumed and the lead `new` with `email_verified_at`, writes a `verified` event, and responds. After the response, `after()` sends the client their confirmation email and dispatches team notifications.
4. Dispatch (`src/features/notifications/dispatch.ts`) writes the in-app notification, sends every enabled channel with `Promise.allSettled`, and records one delivery row and one `notification_sent` or `notification_failed` event per channel. A failing channel never affects the others or the visitor.
5. The team sees the lead in `/admin`, changes its status (optimistic UI, a `status_changed` event, and a notification), and adds notes (`note_added` events).
6. The daily cron (`/api/v1/cron/cleanup`) deletes leads never verified after 7 days, spent verifications after a day, and rate-limit rows after 24 hours.

## Admin and authentication

- Auth.js with the Resend provider sends magic links through the app's own email client, so the console transport works in development. The `signIn` callback rejects any address not in `ADMIN_EMAILS`, so no user row is ever created for it. Sessions live in the database for 7 days.
- `src/proxy.ts` (the Next.js 16 replacement for middleware) is an optimistic check: no session cookie under `/admin` means a redirect to `/admin/login?next=...`.
- The real check is `requireAdmin()`, which reads the session from the database and re-checks the allowlist. It runs in the admin layout, at the top of every admin page (layouts and pages render in parallel, so a layout check alone would not stop a page from reading data), and in every admin server action. It is memoized per request with React `cache`.

## The 3D scene

- `SceneCanvas` sits on the home page, fixed behind the content, `aria-hidden`, and never receives pointer events. It mounts once the page has settled: 2.5 seconds after the load event or the first scroll, whichever comes first, then the next idle period. The chunk (three, fiber, drei, and the scene) loads only then, and only on the home and service pages. See [decisions/0009-scene-mount-timing.md](decisions/0009-scene-mount-timing.md).
- `useQuality` picks a tier once (high, medium, low, or none) from WebGL 2 support, pointer type, cores, pixel ratio, Save-Data, and reduced motion. `none` shows a static SVG outline. drei's `PerformanceMonitor` steps the tier down on sustained frame drops; an error boundary drops to `none` on any scene error.
- Scroll writes progress to the scene store at most once per frame (`useScrollProgress`). The camera rig damps progress and its own position and target with `MathUtils.damp`, and each station maps its window of progress to a smoothstepped `t` (`useStationT`). Stations: lattice slab, glass pane and phone, network, field.
- The canvas renders on demand: frames are requested while anything moves and stop when the tab is hidden or the camera has settled at the end, so a still page costs nothing.
- Everything is procedural and seeded (`src/lib/random.ts`), so the scene is identical on every load. Colors come from the CSS tokens at mount.
- Service pages render one station in a 4:3 panel at 30 frames per second while on screen, loaded only once the panel comes near the viewport.

## Cache Components rules

`cacheComponents: true` makes every route static by default and requires anything request-specific to sit inside `<Suspense>`.

- The marketing layout exports `ensureStatic = "navigation"`, so the build fails if a marketing page reads cookies, headers, search params, or the current time outside a boundary. All marketing pages are built from `src/content` and `src/config`.
- Request-specific UI (the admin, the login page's `searchParams`) renders inside `<Suspense>` with a skeleton fallback.
- Code that is random or time-based at request time calls `await connection()` first (for example `getAdmin`, because Auth.js draws a random CSRF token inside `auth()`).
- `generateStaticParams` must return at least one entry. `/work/[slug]` returns the placeholder slug `none` (which renders the 404 page) while no case study is published.
- Route handlers that answer per request call `connection()` before their work (done once in `withHandler`).
- Server actions call `refresh()` from `next/cache` after a mutation so the admin shows fresh data.

## Security in brief

Headers are static and set in `next.config.ts` ([decisions/0002-security-headers.md](decisions/0002-security-headers.md)). Inputs are validated with Zod at every boundary. Mutating public endpoints check the `Origin`. Rate limits are keyed by a SHA-256 of the IP with a daily salt, so raw IPs are never stored. Codes and form tokens are HMACs with `VERIFICATION_PEPPER`. Secrets are compared with `timingSafeEqual`. Logs mask client emails and never contain codes, tokens, or bodies.

`getClientIp` takes the first address in `x-forwarded-for`, which Vercel sets. Behind another proxy, confirm it overwrites that header rather than appending to a value the client sent.

## Decisions and their reasons

Each has a short record in [decisions/](decisions/).

- Drizzle over Prisma ([0003](decisions/0003-drizzle-over-prisma.md)): SQL-shaped queries, no engine binary, small serverless cold starts, migrations as plain SQL.
- Zustand over React context ([0004](decisions/0004-zustand-over-context.md)): the render loop reads scroll progress with `getState()` without re-rendering React; the brief draft persists to sessionStorage in a few lines.
- Content in code over a CMS ([0005](decisions/0005-content-in-code.md)): typed, reviewed in pull requests, static at build, no extra service. A CMS can come later behind the same types.
- Auth.js magic links ([0006](decisions/0006-authjs-magic-link.md)): a handful of team members, no passwords to manage, database sessions that can be revoked.
- Resend ([0007](decisions/0007-resend.md)): simple API, react-email templates, domain verification with SPF, DKIM, and DMARC.
- No smooth scroll library ([0008](decisions/0008-no-smooth-scroll.md)): native scrolling stays fast and accessible; the scene damps progress itself.
