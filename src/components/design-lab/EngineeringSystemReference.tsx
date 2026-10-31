import LabPage from "@/components/design-lab/LabPage";
import Brackets from "@/components/design-lab/engineering/Brackets";
import EngButton from "@/components/design-lab/engineering/EngButton";
import EngFooter from "@/components/design-lab/engineering/EngFooter";
import EngHeader from "@/components/design-lab/engineering/EngHeader";
import EngPracticeCard from "@/components/design-lab/engineering/EngPracticeCard";
import EngSection from "@/components/design-lab/engineering/EngSection";
import EngSectionHeading from "@/components/design-lab/engineering/EngSectionHeading";
import EngWorkCard from "@/components/design-lab/engineering/EngWorkCard";
import GridBackdrop from "@/components/design-lab/engineering/GridBackdrop";
import SystemDiagram from "@/components/design-lab/engineering/SystemDiagram";
import { engineeringFonts } from "@/components/design-lab/engineering/fonts";
import { container, heading, mono } from "@/components/design-lab/engineering/tones";
import { lab } from "@/content/design-lab/content";
import {
  engineeringBreakpoints,
  engineeringColors,
  engineeringMotion,
  engineeringPage,
  engineeringRadii,
  engineeringRules,
  engineeringSpacing,
  engineeringType,
} from "@/content/design-lab/engineering-system";
import { contrastRatio, luminance } from "@/lib/color";
import { cn } from "@/lib/cn";

/*
 * The living reference for the selected design system: every token and
 * component rendered from the same sources the final homepage uses.
 */

const links = [
  { id: "colour", label: "Colour" },
  { id: "type", label: "Type" },
  { id: "space", label: "Space" },
  { id: "components", label: "Components" },
  { id: "motion", label: "Motion" },
];

const PAGE = "#0F1113";

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
    <div className="lab-reveal mt-8 overflow-x-auto border border-(--lab-border)">
      <table className="w-full min-w-[560px] text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-(--lab-surface)">
          <tr className="border-b border-(--lab-border)">
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className={cn(mono, "px-4 py-3 text-xs font-normal text-(--lab-text-3)")}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-(--lab-border) last:border-b-0">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-4 py-3 align-top",
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

export default function EngineeringSystemReference() {
  return (
    <LabPage
      concept={engineeringPage}
      fontClassName={engineeringFonts}
      headerHeight={64}
      className="isolate"
    >
      <GridBackdrop />
      <EngHeader
        brand={lab.brand.name}
        links={links}
        action={{ label: "See the homepage", href: "/design/final" }}
      />
      <main id="content" tabIndex={-1} className="outline-none">
        <section aria-labelledby="system-title" className="border-b border-(--lab-border)">
          <div className={cn(container, "py-16 md:py-24")}>
            <p className="font-(family-name:--lab-font-mono) text-[13px] text-(--lab-accent)">
              &gt; design system
            </p>
            <h1
              id="system-title"
              className={cn(
                heading,
                "mt-5 max-w-[18ch] text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.04]",
              )}
            >
              The GetWithUs engineering design system.
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-(--lab-text-2)">
              Modern Engineering, refined for reading and speed. Every colour, size, component, and
              timing below is the same source the final homepage is built from.
            </p>
            <ul className="mt-8 grid max-w-3xl gap-px border border-(--lab-border) bg-(--lab-border)">
              {engineeringRules.map((rule, index) => (
                <li
                  key={rule}
                  className="grid grid-cols-[72px_1fr] gap-4 bg-(--lab-bg) px-5 py-3.5 text-[15px] text-(--lab-text-2)"
                >
                  <span className={cn(mono, "text-xs leading-6 text-(--lab-accent)")}>
                    rule_{String(index + 1).padStart(2, "0")}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EngSection id="colour" labelledBy="colour-title">
          <EngSectionHeading
            id="colour-title"
            index="01"
            label="colour"
            title="Carbon surfaces, quiet lines, one signal colour."
          />
          <div className="mt-12 grid gap-10">
            {Object.entries(engineeringColors).map(([group, tokens]) => (
              <div key={group} className="lab-reveal">
                <h3 className={cn(mono, "text-xs text-(--lab-text-3)")}>{group}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {tokens.map((token) => {
                    const dark = luminance(token.hex) < 0.2;
                    const shown = dark ? "#E6E9EC" : "#061417";
                    return (
                      <li
                        key={token.hex}
                        className="border border-(--lab-border) bg-(--lab-surface)"
                      >
                        <div
                          className="flex h-20 items-end justify-between p-3 text-xs"
                          style={{ backgroundColor: token.hex, color: shown }}
                        >
                          <span className="font-(family-name:--lab-font-mono)">{token.hex}</span>
                          <span>{contrastRatio(token.hex, dark ? shown : PAGE).toFixed(1)}:1</span>
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
          <p className="mt-6 text-sm text-(--lab-text-3)">
            Ratios: dark swatches against primary text, light swatches against the carbon 900 page.
          </p>
        </EngSection>

        <EngSection id="type" labelledBy="type-title" tone="raised">
          <EngSectionHeading
            id="type-title"
            index="02"
            label="typography"
            title="Archivo for everything you read, monospace for labels."
          />
          <ul className="mt-12">
            {engineeringType.map((item, index) => (
              <li
                key={item.role}
                className="lab-reveal grid gap-3 border-t border-(--lab-border) py-6 md:grid-cols-[240px_1fr] md:gap-10"
              >
                <div>
                  <p className="font-semibold">{item.role}</p>
                  <p className="mt-1 text-sm text-(--lab-text-2)">{item.spec}</p>
                </div>
                <p
                  className={cn(
                    index === 0 && cn(heading, "text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.04]"),
                    index === 1 && cn(heading, "text-[clamp(1.875rem,3.2vw,2.5rem)] leading-[1.1]"),
                    index === 2 && cn(heading, "text-xl"),
                    index === 3 && "text-lg text-(--lab-text-2)",
                    index === 4 && "text-base",
                    index === 5 && "text-[15px] font-medium",
                    index === 6 && cn(mono, "text-xs text-(--lab-text-3)"),
                    index === 7 && "text-[15px] font-medium",
                  )}
                >
                  {item.sample}
                </p>
              </li>
            ))}
          </ul>
        </EngSection>

        <EngSection id="space" labelledBy="space-title">
          <EngSectionHeading
            id="space-title"
            index="03"
            label="space and layout"
            title="A 4 px base, a visible 12-column grid, one container."
          />
          <ul className="lab-reveal mt-12 grid gap-3">
            {engineeringSpacing.map((step) => (
              <li
                key={step.token}
                className="grid grid-cols-[64px_1fr] items-center gap-4 sm:grid-cols-[64px_220px_1fr]"
              >
                <span className="font-(family-name:--lab-font-mono) text-sm text-(--lab-text-2)">
                  {step.px} px
                </span>
                <span className="h-3 bg-(--lab-accent)" style={{ width: step.px * 2 }} />
                <span className="text-sm text-(--lab-text-2) max-sm:col-span-2">{step.use}</span>
              </li>
            ))}
          </ul>
          <Table
            caption="Corner radii"
            head={["radius", "size", "use"]}
            rows={engineeringRadii.map((radius) => [radius.name, `${radius.px} px`, radius.use])}
          />
          <Table
            caption="Responsive breakpoints"
            head={["breakpoint", "from", "layout"]}
            rows={engineeringBreakpoints.map((point) => [
              point.name,
              `${point.min} px`,
              point.layout,
            ])}
          />
        </EngSection>

        <EngSection id="components" labelledBy="components-title" tone="raised">
          <EngSectionHeading
            id="components-title"
            index="04"
            label="components"
            title="Buttons, panels, tables, and the diagram, with their states."
          />
          <div className="lab-reveal group relative mt-12 border border-(--lab-border) bg-(--lab-surface) p-7">
            <Brackets />
            <h3 className="font-semibold">Buttons</h3>
            <p className="mt-1 text-sm text-(--lab-text-2)">
              Hover brightens the fill or turns the border cyan and extends the arrow 3 px. Tab to
              see the focus ring.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <EngButton href="#components">Start a project</EngButton>
              <EngButton href="#components" variant="secondary">
                Send a message
              </EngButton>
              <EngButton href="#components" variant="text">
                See how we work
              </EngButton>
              <EngButton href="#components" size="sm">
                Small primary
              </EngButton>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <EngPracticeCard practice={lab.practices[0]} index={0} />
            <SystemDiagram />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <EngWorkCard project={lab.work[0]} badge={lab.workIntro.badge} />
            <div className="lab-reveal">
              <h3 className="font-semibold">Specification row</h3>
              <p className="mt-1 text-sm text-(--lab-text-2)">
                Hover draws a cyan rule down the left edge and raises the panel.
              </p>
              <ul className="mt-4 grid gap-px border border-(--lab-border) bg-(--lab-border)">
                {lab.practices[2].services.slice(0, 3).map((service) => (
                  <li
                    key={service.name}
                    className="relative bg-(--lab-surface) p-5 transition-colors duration-200 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-(--lab-accent) before:transition-transform before:duration-200 hover:bg-(--lab-surface-2) hover:before:scale-y-100"
                  >
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="mt-1.5 text-[15px] text-(--lab-text-2)">{service.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-(--lab-text-2)">
                The navigation at the top of this page is the live header component, with scroll spy
                and the phone menu that loads on first use.
              </p>
            </div>
          </div>
        </EngSection>

        <EngSection id="motion" labelledBy="motion-title">
          <EngSectionHeading
            id="motion-title"
            index="05"
            label="motion"
            title="Every animation answers the visitor, then stops."
          />
          <Table
            caption="Animation guidelines"
            head={["motion", "duration", "easing", "use"]}
            rows={engineeringMotion.map((motion) => [
              motion.name,
              motion.duration,
              motion.easing,
              motion.use,
            ])}
          />
        </EngSection>
      </main>
      <EngFooter letter="D" name="Modern Engineering design system" />
    </LabPage>
  );
}
