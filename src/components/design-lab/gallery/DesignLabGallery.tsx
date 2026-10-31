import Link from "next/link";
import ConceptViewer from "@/components/design-lab/gallery/ConceptViewer";
import PaletteCard from "@/components/design-lab/gallery/PaletteCard";
import Scorecard from "@/components/design-lab/gallery/Scorecard";
import { concepts } from "@/content/design-lab/concepts";
import { evaluations, weightedScore, winningSlug } from "@/content/design-lab/evaluation";

const entries = [
  ...concepts.map((concept) => ({
    key: concept.slug,
    label: `${concept.letter}: ${concept.name}`,
    href: `/design/${concept.slug}`,
  })),
  { key: "final", label: "Final: refined homepage", href: "/design/final" },
  { key: "system", label: "Design system", href: "/design/system" },
  { key: "current", label: "Current live design", href: "/" },
];

const refinements = [
  [
    "Typography hierarchy",
    "The serif is kept for the H1, section headings, and practice titles; every card title, label, and button moved to the sans. The H1 is capped at 76 px and section headings at 52 px.",
  ],
  [
    "Spacing",
    "One section rhythm (64 px on phones, 96 px from 768 px) and 48 px from heading to content, which removes the empty bands in E.",
  ],
  [
    "Visual balance",
    "Statement left, lead and actions right, with the three commitments from B placed beside the primary button where they support the decision.",
  ],
  [
    "Call to action placement",
    "Navigation, hero, a help-me-choose prompt after the practices, and the closing band: four chances, never two in one view.",
  ],
  [
    "Service clarity",
    "Practice cards say what each practice is and link to its services; the services are listed once, with descriptions, grouped and anchored by practice.",
  ],
  [
    "Phone experience",
    "Full-width primary buttons, a practice index with 48 px tap targets, and a menu whose dialog code loads only when opened.",
  ],
  [
    "Animation timing",
    "The endless hero sweep is gone. Every animation answers a scroll or a pointer: 180 ms colour, 220 ms underline, 300 ms card rule, scroll-linked reveals.",
  ],
  [
    "Consistent tokens",
    "Every colour, size, radius, and timing comes from src/content/design-lab/system.ts, rendered at /design/system.",
  ],
];

/** The design lab: inspect, compare, and read the evaluation of the five directions. */
export default function DesignLabGallery() {
  const winner = evaluations.find((evaluation) => evaluation.slug === winningSlug());
  const winnerConcept = concepts.find((concept) => concept.slug === winner?.slug);
  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-10">
        <p className="type-small font-medium text-lamp">GetWithUs design lab</p>
        <h1 className="mt-3 type-display">Five directions, one recommendation.</h1>
        <p className="mt-4 max-w-[72ch] text-lg text-fog-2">
          Five complete homepages for GetWithUs, each built from the same content and structure so
          they can be compared on design alone, then scored and refined. Nothing here is linked from
          the live site or indexed by search engines.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 type-small">
          <li>
            <a href="#inspect" className="text-lamp hover:text-lamp-2">
              Inspect and compare
            </a>
          </li>
          <li>
            <a href="#scorecard" className="text-lamp hover:text-lamp-2">
              Scorecard
            </a>
          </li>
          <li>
            <a href="#evaluations" className="text-lamp hover:text-lamp-2">
              Evaluations
            </a>
          </li>
          <li>
            <a href="#colour" className="text-lamp hover:text-lamp-2">
              Colour systems
            </a>
          </li>
          <li>
            <a href="#winner" className="text-lamp hover:text-lamp-2">
              Recommendation
            </a>
          </li>
        </ul>

        <section id="inspect" aria-labelledby="inspect-title" className="mt-14">
          <h2 id="inspect-title" className="type-h2">
            Inspect and compare
          </h2>
          <p className="mt-2 max-w-[72ch] text-fog-2">
            Each frame is the real page at a real device width, scaled to fit. Menus, tabs, hover
            states, and scroll reveals all work inside it. Open any of them full size for the true
            experience.
          </p>
          <div className="mt-6">
            <ConceptViewer entries={entries} />
          </div>
        </section>

        <section id="scorecard" aria-labelledby="scorecard-title" className="mt-20">
          <h2 id="scorecard-title" className="type-h2">
            Weighted scorecard
          </h2>
          <p className="mt-2 max-w-[72ch] text-fog-2">
            Scores are design judgement anchored to measurements from a local production build:
            Lighthouse on a simulated mid-range phone, initial JavaScript, axe, and measured
            contrast. Weights follow the brief.
          </p>
          <div className="mt-6">
            <Scorecard />
          </div>
        </section>

        <section id="evaluations" aria-labelledby="evaluations-title" className="mt-20">
          <h2 id="evaluations-title" className="type-h2">
            What each direction does well, and where it falls short
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {evaluations.map((evaluation) => {
              const concept = concepts.find((item) => item.slug === evaluation.slug);
              return (
                <article
                  key={evaluation.slug}
                  aria-labelledby={`eval-${evaluation.slug}`}
                  className="rounded-card border border-line bg-ink-2 p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 id={`eval-${evaluation.slug}`} className="type-h3">
                      {concept?.letter}: {concept?.name}
                    </h3>
                    <p className="type-h4 text-lamp tabular-nums">
                      {weightedScore(evaluation.scores).toFixed(1)}
                    </p>
                  </div>
                  <h4 className="mt-4 type-small font-semibold text-fog">Strengths</h4>
                  <ul className="mt-1 grid gap-1.5 type-small text-fog-2">
                    {evaluation.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4 className="mt-4 type-small font-semibold text-fog">Weaknesses</h4>
                  <ul className="mt-1 grid gap-1.5 type-small text-fog-2">
                    {evaluation.weaknesses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4 className="mt-4 type-small font-semibold text-fog">Fit for GetWithUs</h4>
                  <p className="mt-1 type-small text-fog-2">{evaluation.suitability}</p>
                  <h4 className="mt-4 type-small font-semibold text-fog">International clients</h4>
                  <p className="mt-1 type-small text-fog-2">{evaluation.international}</p>
                  <h4 className="mt-4 type-small font-semibold text-fog">
                    Conflicts with the current build spec
                  </h4>
                  <ul className="mt-1 grid gap-1.5 type-small text-fog-2">
                    {evaluation.ruleConflicts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="colour" aria-labelledby="colour-title" className="mt-20">
          <h2 id="colour-title" className="type-h2">
            Five colour systems
          </h2>
          <p className="mt-2 max-w-[72ch] text-fog-2">
            Exact values for every role, the type and component choices, and the contrast of each
            text pairing, calculated with the WCAG 2.2 formula.
          </p>
          <div className="mt-6 grid gap-6">
            {concepts.map((concept) => (
              <PaletteCard key={concept.slug} concept={concept} href={`/design/${concept.slug}`} />
            ))}
          </div>
        </section>

        <section id="winner" aria-labelledby="winner-title" className="mt-20">
          <h2 id="winner-title" className="type-h2">
            Recommendation: {winnerConcept?.letter}: {winnerConcept?.name}, refined with B
          </h2>
          <div className="mt-4 grid max-w-[80ch] gap-3 text-fog-2">
            <p>
              Hybrid Premium scored highest because it is the only direction that is credible to
              enterprise buyers, warm enough for growth clients, and distinctive among development
              agencies at the same time. It reads as a senior consultancy that ships software, which
              is the position GetWithUs wants with international clients.
            </p>
            <p>
              Minimal Corporate came second for opposite reasons: the clearest structure and the
              fastest page, but the least memorable. The refinement keeps E&apos;s voice and
              B&apos;s discipline, and drops what cost E points: the endless hero animation,
              repeated service lists, and oversized empty space.
            </p>
          </div>
          <dl className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {refinements.map(([term, detail]) => (
              <div key={term}>
                <dt className="font-semibold text-fog">{term}</dt>
                <dd className="mt-1 type-small text-fog-2">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/design/final"
              className="inline-flex h-11 items-center rounded-control bg-lamp px-5 font-medium text-ink hover:bg-lamp-2"
            >
              Open the refined homepage
            </Link>
            <Link
              href="/design/system"
              className="inline-flex h-11 items-center rounded-control border border-line-strong px-5 font-medium text-fog hover:border-fog-3"
            >
              Open the design system
            </Link>
          </div>
          <p className="mt-6 max-w-[80ch] type-small text-fog-2">
            Nothing has replaced the live site. Adopting this direction changes rules in the
            original build spec (light sections, larger headings, a new accent colour, scroll
            reveals, and no 3D scene on the homepage), so it needs your approval first. The full
            report is in docs/design-lab/README.md.
          </p>
        </section>
      </div>
    </main>
  );
}
