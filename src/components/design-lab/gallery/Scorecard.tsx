import { concepts } from "@/content/design-lab/concepts";
import { criteria, evaluations, weightedScore, winningSlug } from "@/content/design-lab/evaluation";
import { cn } from "@/lib/cn";

/** The weighted scorecard: criteria down the side, concepts across, totals and measurements below. */
export default function Scorecard() {
  const winner = winningSlug();
  const rows = evaluations.map((evaluation) => ({
    evaluation,
    concept: concepts.find((concept) => concept.slug === evaluation.slug),
    total: weightedScore(evaluation.scores),
  }));
  const cell = (slug: string) =>
    cn("px-3 py-2.5 text-right tabular-nums", slug === winner && "bg-lamp/10 text-fog");

  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full min-w-[760px] text-left type-small">
        <caption className="sr-only">Weighted evaluation of the five design directions</caption>
        <thead className="bg-ink-2 text-fog-2">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">
              Criterion
            </th>
            <th scope="col" className="px-3 py-3 text-right font-medium">
              Weight
            </th>
            {rows.map(({ concept, evaluation }) => (
              <th
                key={evaluation.slug}
                scope="col"
                className={cn(cell(evaluation.slug), "py-3 font-medium")}
              >
                {concept?.letter}: {concept?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-fog-2">
          {criteria.map((criterion) => (
            <tr key={criterion.id} className="border-t border-line">
              <th scope="row" className="px-3 py-2.5 font-normal text-fog">
                {criterion.name}
              </th>
              <td className="px-3 py-2.5 text-right tabular-nums">{criterion.weight}%</td>
              {rows.map(({ evaluation }) => (
                <td key={evaluation.slug} className={cell(evaluation.slug)}>
                  {evaluation.scores[criterion.id]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-line-strong text-fog">
            <th scope="row" className="px-3 py-3 font-semibold">
              Weighted score (of 100)
            </th>
            <td className="px-3 py-3 text-right">100%</td>
            {rows.map(({ evaluation, total }) => (
              <td
                key={evaluation.slug}
                className={cn(cell(evaluation.slug), "py-3 text-base font-semibold")}
              >
                {total.toFixed(1)}
                {evaluation.slug === winner ? (
                  <span className="block type-small font-medium text-lamp">Recommended</span>
                ) : null}
              </td>
            ))}
          </tr>
          {[
            [
              "Lighthouse performance, mobile (median of 6 runs)",
              (slug: string) => {
                const m = evaluations.find((e) => e.slug === slug)?.measured;
                return m ? `${m.lighthouse} (${m.lighthouseRuns.join(", ")})` : "";
              },
            ],
            [
              "Total blocking time (two rounds)",
              (slug: string) => {
                const range = evaluations.find((e) => e.slug === slug)?.measured.totalBlockingMs;
                return range ? `${range[0]} to ${range[1]} ms` : "";
              },
            ],
            [
              "Initial JavaScript, gzipped",
              (slug: string) =>
                `${evaluations.find((e) => e.slug === slug)?.measured.initialJsKb} KB`,
            ],
            [
              "axe violations (WCAG 2.2 AA)",
              (slug: string) =>
                String(evaluations.find((e) => e.slug === slug)?.measured.axeViolations),
            ],
            [
              "Lowest declared text contrast",
              (slug: string) =>
                `${evaluations.find((e) => e.slug === slug)?.measured.lowestContrast.toFixed(2)}:1`,
            ],
            [
              "Animation that never stops",
              (slug: string) =>
                evaluations.find((e) => e.slug === slug)?.measured.endlessAnimation ? "Yes" : "No",
            ],
          ].map(([label, value]) => (
            <tr key={label as string} className="border-t border-line">
              <th scope="row" className="px-3 py-2.5 font-normal text-fog-2">
                {label as string}
              </th>
              <td className="px-3 py-2.5 text-right">Measured</td>
              {rows.map(({ evaluation }) => (
                <td key={evaluation.slug} className={cell(evaluation.slug)}>
                  {(value as (slug: string) => string)(evaluation.slug)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
