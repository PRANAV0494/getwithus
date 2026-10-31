import LabPage from "@/components/design-lab/LabPage";
import { systemFonts } from "@/components/design-lab/hybrid/fonts";
import PracticeCard from "@/components/design-lab/hybrid/PracticeCard";
import SectionHeading from "@/components/design-lab/hybrid/SectionHeading";
import SystemButton from "@/components/design-lab/hybrid/SystemButton";
import SystemFooter from "@/components/design-lab/hybrid/SystemFooter";
import SystemHeader from "@/components/design-lab/hybrid/SystemHeader";
import SystemSection, { type Tone } from "@/components/design-lab/hybrid/SystemSection";
import { navyTone, serif } from "@/components/design-lab/hybrid/tones";
import WorkCard from "@/components/design-lab/hybrid/WorkCard";
import { lab } from "@/content/design-lab/content";
import {
  systemBreakpoints,
  systemColors,
  systemMotion,
  systemPage,
  systemRadii,
  systemRules,
  systemSpacing,
  systemType,
} from "@/content/design-lab/hybrid-system";
import { contrastRatio, luminance } from "@/lib/color";
import { cn } from "@/lib/cn";

/*
 * The living reference for the refined design system: every token and
 * component rendered from the same sources the final homepage uses.
 */

const links = [
  { id: "colour", label: "Colour" },
  { id: "type", label: "Type" },
  { id: "space", label: "Space" },
  { id: "components", label: "Components" },
  { id: "motion", label: "Motion" },
];

const toneSamples: { tone: Tone; name: string; use: string }[] = [
  { tone: "navy", name: "Navy", use: "Hero, commitments, call to action" },
  { tone: "navy-deep", name: "Navy 950", use: "Footer" },
  { tone: "paper", name: "Warm white", use: "Reading sections" },
  { tone: "white", name: "White", use: "Practices and work" },
];

function Table({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="lab-reveal mt-8 overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-(--lab-border-strong) text-sm text-(--lab-text-2)">
            {head.map((cell) => (
              <th key={cell} scope="col" className="py-3 pr-6 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-(--lab-border)">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={cn(
                    "py-3 pr-6 align-top",
                    index === 0 ? "font-medium" : "text-(--lab-text-2)",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HybridSystemReference() {
  return (
    <LabPage concept={systemPage} fontClassName={systemFonts} headerHeight={72}>
      <SystemHeader
        brand={lab.brand.name}
        links={links}
        action={{ label: "See the homepage", href: "/design/hybrid-final" }}
      />
      <main id="content" tabIndex={-1} className="outline-none">
        <section aria-labelledby="system-title" className={navyTone}>
          <div className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
            <p className="text-sm font-medium text-(--lab-accent-text)">Design system</p>
            <h1
              id="system-title"
              className={cn(
                serif,
                "mt-5 max-w-[16ch] text-[clamp(2.75rem,5.6vw,4.75rem)] leading-none",
              )}
            >
              The GetWithUs design system.
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-(--lab-text-2)">
              Hybrid Premium, refined with the structure of Minimal Corporate. Every colour, size,
              component, and timing below is the same source the final homepage is built from.
            </p>
            <ul className="mt-8 grid gap-2.5 text-[15px] text-(--lab-text-2)">
              {systemRules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 bg-(--lab-accent-text)"
                  />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SystemSection id="colour" labelledBy="colour-title">
          <SectionHeading
            id="colour-title"
            label="Colour"
            title="Navy for authority, warm white for reading, blue for action."
          />
          <div className="mt-12 grid gap-10">
            {Object.entries(systemColors).map(([group, tokens]) => (
              <div key={group} className="lab-reveal">
                <h3 className="text-sm font-semibold text-(--lab-text-2) capitalize">{group}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {tokens.map((token) => {
                    const dark = luminance(token.hex) < 0.2;
                    const against = dark ? "#FFFFFF" : "#0F1424";
                    return (
                      <li
                        key={token.hex}
                        className="overflow-hidden rounded-xl border border-(--lab-border) bg-[#FFFFFF]"
                      >
                        <div
                          className="flex h-20 items-end justify-between p-3 text-xs"
                          style={{ backgroundColor: token.hex, color: against }}
                        >
                          <span className="font-mono">{token.hex}</span>
                          <span>{contrastRatio(token.hex, against).toFixed(1)}:1</span>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold">{token.name}</p>
                          <p className="mt-1 text-sm text-(--lab-text-2)">{token.use}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mt-14 text-sm font-semibold text-(--lab-text-2)">Section backgrounds</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {toneSamples.map((sample) => (
              <li
                key={sample.tone}
                className="overflow-hidden rounded-xl border border-(--lab-border)"
              >
                <SystemSection
                  labelledBy={`tone-${sample.tone}`}
                  tone={sample.tone}
                  className="px-6 py-8 md:px-6 md:py-8"
                >
                  <p id={`tone-${sample.tone}`} className={cn(serif, "text-2xl")}>
                    {sample.name}
                  </p>
                  <p className="mt-2 text-sm text-(--lab-text-2)">{sample.use}</p>
                </SystemSection>
              </li>
            ))}
          </ul>
        </SystemSection>

        <SystemSection id="type" labelledBy="type-title" tone="white">
          <SectionHeading
            id="type-title"
            label="Typography"
            title="A serif voice for statements, a sans for everything you use."
          />
          <ul className="mt-12 grid gap-0">
            {systemType.map((item, index) => (
              <li
                key={item.role}
                className="lab-reveal grid gap-3 border-t border-(--lab-border) py-6 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <div>
                  <p className="font-semibold">{item.role}</p>
                  <p className="mt-1 text-sm text-(--lab-text-2)">{item.spec}</p>
                </div>
                <p
                  className={cn(
                    index < 3 ? serif : "",
                    index === 0 && "text-[clamp(2.75rem,5.6vw,4.75rem)] leading-none",
                    index === 1 && "text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.04]",
                    index === 2 && "text-[1.75rem] leading-tight",
                    index === 3 && "text-lg font-semibold",
                    index === 4 && "text-lg text-(--lab-text-2)",
                    index === 5 && "text-base",
                    index === 6 && "text-sm font-medium",
                    index === 7 && "text-[15px] font-medium",
                  )}
                >
                  {item.sample}
                </p>
              </li>
            ))}
          </ul>
        </SystemSection>

        <SystemSection id="space" labelledBy="space-title">
          <SectionHeading
            id="space-title"
            label="Space and layout"
            title="A 4 px base, generous sections, one container."
          />
          <ul className="lab-reveal mt-12 grid gap-3">
            {systemSpacing.map((step) => (
              <li
                key={step.token}
                className="grid grid-cols-[64px_1fr] items-center gap-4 sm:grid-cols-[64px_220px_1fr]"
              >
                <span className="font-mono text-sm text-(--lab-text-2)">{step.px} px</span>
                <span className="h-3 rounded-sm bg-(--lab-accent)" style={{ width: step.px * 2 }} />
                <span className="text-sm text-(--lab-text-2) max-sm:col-span-2">{step.use}</span>
              </li>
            ))}
          </ul>
          <Table
            caption="Corner radii"
            head={["Radius", "Size", "Use"]}
            rows={systemRadii.map((radius) => [radius.name, `${radius.px} px`, radius.use])}
          />
          <Table
            caption="Responsive breakpoints"
            head={["Breakpoint", "From", "Layout"]}
            rows={systemBreakpoints.map((point) => [point.name, `${point.min} px`, point.layout])}
          />
        </SystemSection>

        <SystemSection id="components" labelledBy="components-title" tone="white">
          <SectionHeading
            id="components-title"
            label="Components"
            title="Buttons, cards, and navigation, with their states."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="lab-reveal rounded-xl border border-(--lab-border) p-8">
              <h3 className="font-semibold">Buttons on light</h3>
              <p className="mt-1 text-sm text-(--lab-text-2)">
                Hover darkens the fill and moves the arrow 3 px. Tab to see the focus ring.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <SystemButton href="#components">Start a project</SystemButton>
                <SystemButton href="#components" variant="outline">
                  Send a message
                </SystemButton>
                <SystemButton href="#components" variant="text">
                  See how we work
                </SystemButton>
                <SystemButton href="#components" size="sm">
                  Small primary
                </SystemButton>
              </div>
            </div>
            <div className={cn(navyTone, "lab-reveal rounded-xl p-8")}>
              <h3 className="font-semibold">Buttons on navy</h3>
              <p className="mt-1 text-sm text-(--lab-text-2)">
                White is the primary on navy; blue would fall below 4.5:1.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <SystemButton href="#components" variant="inverse">
                  Start a project
                </SystemButton>
                <SystemButton href="#components" variant="outline">
                  Send a message
                </SystemButton>
                <SystemButton href="#components" variant="text">
                  See how we work
                </SystemButton>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <PracticeCard practice={lab.practices[0]} />
            <div className="lg:col-span-2">
              <WorkCard project={lab.work[0]} badge={lab.workIntro.badge} wide />
            </div>
          </div>
          <p className="mt-6 text-sm text-(--lab-text-2)">
            Cards: hover darkens the border and draws a blue rule across the top in 300 ms;
            illustrations scale to 103 percent. The navigation at the top of this page is the live
            header component, with scroll spy and the lazily loaded phone menu.
          </p>
        </SystemSection>

        <SystemSection id="motion" labelledBy="motion-title">
          <SectionHeading
            id="motion-title"
            label="Motion"
            title="Every animation answers the visitor, then stops."
          />
          <Table
            caption="Animation guidelines"
            head={["Motion", "Duration", "Easing", "Use"]}
            rows={systemMotion.map((motion) => [
              motion.name,
              motion.duration,
              motion.easing,
              motion.use,
            ])}
          />
        </SystemSection>
      </main>
      <SystemFooter letter="E" name="Hybrid Premium design system (alternative)" />
    </LabPage>
  );
}
