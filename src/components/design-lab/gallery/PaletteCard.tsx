import Link from "next/link";
import type { Concept, Swatch } from "@/content/design-lab/concepts";
import { contrastLevel, contrastRatio, luminance } from "@/lib/color";

function Chip({ swatch, role }: { swatch: Swatch; role?: string }) {
  const dark = luminance(swatch.hex) < 0.18;
  return (
    <li className="overflow-hidden rounded-control border border-line">
      <div
        className="flex h-16 items-end p-2 font-mono text-xs"
        style={{ backgroundColor: swatch.hex, color: dark ? "#FFFFFF" : "#0B0E13" }}
      >
        {swatch.hex}
      </div>
      <div className="p-2">
        <p className="type-small font-medium text-ink">
          {role ? `${role}: ${swatch.name}` : swatch.name}
        </p>
        <p className="type-small text-body">{swatch.use}</p>
      </div>
    </li>
  );
}

/** One concept's complete colour system, type, components, and measured contrast. */
export default function PaletteCard({ concept, href }: { concept: Concept; href: string }) {
  const { palette } = concept;
  return (
    <article
      aria-labelledby={`palette-${concept.slug}`}
      className="rounded-card border border-line bg-card p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 id={`palette-${concept.slug}`} className="type-h3">
          {concept.letter}: {concept.name}
        </h3>
        <Link href={href} className="type-small text-accent hover:text-accent">
          Open prototype {concept.letter}
        </Link>
      </div>
      <p className="mt-2 max-w-[70ch] text-body">{concept.direction}</p>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Chip swatch={palette.primary} role="Primary" />
        <Chip swatch={palette.secondary} role="Secondary" />
        <Chip swatch={palette.accent} role="Accent" />
        {[...palette.backgrounds, ...palette.text, ...palette.borders].map((swatch) => (
          <Chip key={`${swatch.name}-${swatch.hex}`} swatch={swatch} />
        ))}
      </ul>

      <dl className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
        {[
          ["Display type", concept.typography.display],
          ["Body type", concept.typography.body],
          ...(concept.typography.mono ? [["Mono type", concept.typography.mono]] : []),
          ["Scale", concept.typography.scale],
          ["Buttons", concept.components.buttons],
          ["Cards", concept.components.cards],
          ["Navigation", concept.components.navigation],
          ["Hero", concept.components.hero],
          ["Motion", concept.components.motion],
        ].map(([term, detail]) => (
          <div key={term}>
            <dt className="type-small font-medium text-ink">{term}</dt>
            <dd className="type-small text-body">{detail}</dd>
          </div>
        ))}
      </dl>

      <table className="mt-6 w-full text-left type-small">
        <caption className="mb-2 text-left font-medium text-ink">
          Measured contrast (WCAG 2.2)
        </caption>
        <thead className="text-body">
          <tr>
            <th scope="col" className="py-1.5 font-normal">
              Pairing
            </th>
            <th scope="col" className="py-1.5 font-normal">
              Sample
            </th>
            <th scope="col" className="py-1.5 font-normal">
              Ratio
            </th>
            <th scope="col" className="py-1.5 font-normal">
              Level
            </th>
          </tr>
        </thead>
        <tbody>
          {concept.contrast.map((pair) => {
            const ratio = contrastRatio(pair.fg, pair.bg);
            return (
              <tr key={pair.label} className="border-t border-line">
                <td className="py-1.5 text-ink">{pair.label}</td>
                <td className="py-1.5">
                  <span
                    className="rounded-tag px-2 py-0.5 font-medium"
                    style={{ color: pair.fg, backgroundColor: pair.bg }}
                  >
                    Aa
                  </span>
                </td>
                <td className="py-1.5 font-mono text-ink tabular-nums">{ratio.toFixed(2)}:1</td>
                <td className="py-1.5 text-body">{contrastLevel(ratio, pair.large)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
}
