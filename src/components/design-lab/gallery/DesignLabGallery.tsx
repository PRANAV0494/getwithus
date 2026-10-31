import Link from "next/link";
import ConceptViewer from "@/components/design-lab/gallery/ConceptViewer";
import PaletteCard from "@/components/design-lab/gallery/PaletteCard";
import Scorecard from "@/components/design-lab/gallery/Scorecard";
import { concepts } from "@/content/design-lab/concepts";
import { evaluations, weightedScore } from "@/content/design-lab/evaluation";

const entries = [
  ...concepts.map((concept) => ({
    key: concept.slug,
    label: `${concept.letter}: ${concept.name}`,
    href: `/design/${concept.slug}`,
  })),
  { key: "final", label: "Final: D refined (selected)", href: "/design/final" },
  { key: "system", label: "D design system", href: "/design/system" },
  { key: "hybrid-final", label: "E refined (alternative)", href: "/design/hybrid-final" },
  { key: "hybrid-system", label: "E design system", href: "/design/hybrid-system" },
  { key: "current", label: "Current live design", href: "/" },
];

const refinements = [
  [
    "Reading",
    "Service names, practice titles, and every paragraph moved from lowercase monospace to sentence-case Archivo. Monospace stays for 11 to 13 px labels, ids, and specifications only.",
  ],
  [
    "Service clarity",
    "The tabs are gone: all eighteen services are visible, grouped in specification tables with an anchor per practice. Practice cards link to their group instead of repeating it.",
  ],
  [
    "Conversion",
    "The three commitments sit under the hero buttons, a help-me-choose prompt follows the practices, and the closing panel drops the fake terminal command for a clear heading and two actions.",
  ],
  [
    "Warmth for growth clients",
    "Plain-language summaries lead every practice card and the hero practice index, and the diagram gives Digital Growth and AI the same weight as engineering.",
  ],
  [
    "Motion",
    "The diagram pulses run three passes when the page opens, then stop. Nothing else moves on its own; everything else answers a scroll, a hover, or a tap.",
  ],
  [
    "Phones and tablets",
    "Below 640 px a readable practice list replaces the diagram; buttons go full width. Diagram labels are set in 16 px sans so they stay legible on tablets.",
  ],
  [
    "Performance",
    "The menu dialog loads on first use and the tabs are gone, bringing the page under the 180 KB budget (see the numbers below).",
  ],
  [
    "Accessibility",
    "Dismissing the phone menu returns focus to the Menu button. The same bug was found and fixed on the live site. Every text pairing measures 4.5:1 or more.",
  ],
];

/** The design lab: inspect, compare, and read the evaluation of the five directions. */
export default function DesignLabGallery() {
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
            <a href="#selected" className="text-lamp hover:text-lamp-2">
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

        <section id="selected" aria-labelledby="selected-title" className="mt-20">
          <h2 id="selected-title" className="type-h2">
            Selected direction: D: Modern Engineering, refined
          </h2>
          <div className="mt-4 grid max-w-[80ch] gap-3 text-fog-2">
            <p>
              You chose Modern Engineering. It is a sound choice for an agency that wants to lead
              with technical credibility: it shows engineering competence on sight, it is ownable
              among agency sites, and it keeps the dark theme the build spec asks for.
            </p>
            <p>
              The scorecard is left as measured: Hybrid Premium still has the highest score (88.0)
              for its broader appeal, and its refined version stays available as the alternative.
              The refinement of D targets every weakness that cost it points: slow-to-read
              monospaced text, coldness for growth clients, the endless diagram animation, the
              JavaScript over budget, and the gimmicks.
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
          <table className="mt-8 w-full max-w-[760px] text-left type-small">
            <caption className="mb-2 text-left font-medium text-fog">
              D before and after refinement, measured on the same production build
            </caption>
            <thead className="text-fog-2">
              <tr>
                <th scope="col" className="py-1.5 font-normal">
                  Measure
                </th>
                <th scope="col" className="py-1.5 font-normal">
                  D as explored
                </th>
                <th scope="col" className="py-1.5 font-normal">
                  D refined
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  Lighthouse performance, mobile
                </th>
                <td className="py-1.5 text-fog-2">98 (runs 97, 98, 98)</td>
                <td className="py-1.5 text-fog">100 (runs 99, 100, 100)</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  Total blocking time
                </th>
                <td className="py-1.5 text-fog-2">180 ms</td>
                <td className="py-1.5 text-fog">80 ms</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  Initial JavaScript, gzipped
                </th>
                <td className="py-1.5 text-fog-2">195.8 KB</td>
                <td className="py-1.5 text-fog">177.0 KB</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  axe violations (WCAG 2.2 AA)
                </th>
                <td className="py-1.5 text-fog-2">0</td>
                <td className="py-1.5 text-fog">0</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  Animation that never stops
                </th>
                <td className="py-1.5 text-fog-2">Yes, diagram pulses</td>
                <td className="py-1.5 text-fog">No, three passes then stop</td>
              </tr>
              <tr className="border-t border-line">
                <th scope="row" className="py-1.5 font-normal text-fog">
                  Focus after closing the phone menu
                </th>
                <td className="py-1.5 text-fog-2">Menu button</td>
                <td className="py-1.5 text-fog">Menu button</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/design/final"
              className="inline-flex h-11 items-center rounded-control bg-lamp px-5 font-medium text-ink hover:bg-lamp-2"
            >
              Open the final homepage
            </Link>
            <Link
              href="/design/system"
              className="inline-flex h-11 items-center rounded-control border border-line-strong px-5 font-medium text-fog hover:border-fog-3"
            >
              Open the design system
            </Link>
            <Link
              href="/design/hybrid-final"
              className="inline-flex h-11 items-center rounded-control px-2 font-medium text-lamp hover:text-lamp-2"
            >
              See the E alternative
            </Link>
          </div>
          <p className="mt-6 max-w-[80ch] type-small text-fog-2">
            Nothing has replaced the live site. Moving D into production keeps the dark theme but
            changes other rules in the build spec (headings up to 60 px, cyan in place of the lamp
            accent, Archivo and JetBrains Mono in place of Schibsted Grotesk, scroll reveals, and no
            3D scene on the homepage), so it needs your go-ahead. The full report is in
            docs/design-lab/README.md.
          </p>
        </section>
      </div>
    </main>
  );
}
