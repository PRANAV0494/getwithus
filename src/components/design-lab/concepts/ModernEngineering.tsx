import { ArrowRight } from "lucide-react";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import LabFootnote from "@/components/design-lab/LabFootnote";
import LabMark from "@/components/design-lab/LabMark";
import LabMobileMenu from "@/components/design-lab/LabMobileMenu";
import LabPage from "@/components/design-lab/LabPage";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
import PracticeTabs from "@/components/design-lab/PracticeTabs";
import ProjectArt from "@/components/design-lab/ProjectArt";
import ScrollSpyLinks from "@/components/design-lab/ScrollSpyLinks";
import { conceptBySlug } from "@/content/design-lab/concepts";
import { lab } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/*
 * Concept D, Modern Engineering: the site drawn like a technical document. A
 * visible column grid, monospaced labels, corner-bracket panels, and a system
 * diagram where data pulses travel between the three practices.
 */

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--lab-font-body",
  display: "swap",
  axes: ["wdth"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--lab-font-mono",
  display: "swap",
});

const concept = conceptBySlug("modern-engineering");
const container = "relative mx-auto w-full max-w-[1200px] px-6 md:px-10";
const heading = "font-semibold tracking-[-0.02em] text-balance [font-stretch:92%]";
const monoText = "font-(family-name:--lab-font-mono)";

const specs = [
  ["engineering", "web, mobile, apis, enterprise"],
  ["growth", "websites, seo, marketing, brand"],
  ["ai", "assistants, automation, analytics"],
] as const;

function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "lab-nudge inline-flex h-12 items-center justify-center gap-2.5 rounded-[2px] px-5 text-[15px] font-medium transition-colors duration-200",
        variant === "primary"
          ? "bg-(--lab-accent) text-(--lab-on-accent) hover:bg-(--lab-accent-hover)"
          : "border border-(--lab-border-strong) bg-(--lab-surface) text-(--lab-text) hover:border-(--lab-accent)",
        className,
      )}
    >
      {children}
      <Icon icon={ArrowRight} size={16} className="lab-arrow" />
    </Link>
  );
}

function Brackets() {
  const corner =
    "absolute size-3 border-(--lab-text-3) transition-colors duration-200 group-hover:border-(--lab-accent)";
  return (
    <span aria-hidden="true">
      <span className={cn(corner, "-top-px -left-px border-t border-l")} />
      <span className={cn(corner, "-top-px -right-px border-t border-r")} />
      <span className={cn(corner, "-bottom-px -left-px border-b border-l")} />
      <span className={cn(corner, "-right-px -bottom-px border-r border-b")} />
    </span>
  );
}

function SectionHeader({
  index,
  label,
  title,
  lead,
  id,
}: {
  index: string;
  label: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <div className="lab-reveal grid gap-4 md:grid-cols-[200px_1fr]">
      <p className={cn(monoText, "pt-2 text-xs text-(--lab-text-3)")}>
        {index} / {label.toLowerCase()}
      </p>
      <div className="max-w-2xl">
        <h2 id={id} className={cn(heading, "text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1]")}>
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-[17px] leading-relaxed text-(--lab-text-2)">{lead}</p>
        ) : null}
      </div>
    </div>
  );
}

function SystemDiagram() {
  const nodes = [
    { id: "engineering", x: 48, y: 40, label: "engineering" },
    { id: "growth", x: 48, y: 290, label: "growth" },
    { id: "ai", x: 318, y: 165, label: "ai + automation" },
  ] as const;
  const paths = [
    "M150 76 C 200 76, 200 182, 236 182",
    "M150 326 C 200 326, 200 218, 236 218",
    "M318 201 L 300 201",
    "M100 112 L 100 290",
  ];
  return (
    <svg viewBox="0 0 480 400" aria-hidden="true" focusable="false" className="h-auto w-full">
      {paths.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#353C44" strokeWidth={1.5} />
          <path
            d={d}
            fill="none"
            stroke="#2CD5E6"
            strokeWidth={1.5}
            strokeDasharray="6 114"
            className="lab-motion [animation:lab-dash_3.2s_linear_infinite]"
          />
        </g>
      ))}
      <rect x={236} y={160} width={64} height={80} rx={2} fill="#1D2126" stroke="#2CD5E6" />
      <text
        x={268}
        y={196}
        textAnchor="middle"
        fill="#E6E9EC"
        fontSize={11}
        className="font-(family-name:--lab-font-mono)"
      >
        your
      </text>
      <text
        x={268}
        y={212}
        textAnchor="middle"
        fill="#E6E9EC"
        fontSize={11}
        className="font-(family-name:--lab-font-mono)"
      >
        business
      </text>
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.id === "ai" ? 148 : 104}
            height={72}
            rx={2}
            fill="#171A1E"
            stroke="#353C44"
          />
          <circle cx={node.x + 14} cy={node.y + 16} r={3} fill="#2CD5E6" />
          <text
            x={node.x + 26}
            y={node.y + 20}
            fill="#A0A8B2"
            fontSize={10}
            className="font-(family-name:--lab-font-mono)"
          >
            {node.id === "ai" ? "node_03" : node.id === "growth" ? "node_02" : "node_01"}
          </text>
          <text
            x={node.x + 12}
            y={node.y + 50}
            fill="#E6E9EC"
            fontSize={13}
            className="font-(family-name:--lab-font-mono)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ModernEngineering() {
  return (
    <LabPage
      concept={concept}
      fontClassName={cn(archivo.variable, mono.variable, "font-(family-name:--lab-font-body)")}
      headerHeight={64}
      className="isolate"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="mx-auto grid h-full max-w-[1200px] grid-cols-4 border-x border-(--lab-grid) px-6 md:grid-cols-12 md:px-10">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className="border-r border-(--lab-grid) last:border-r-0 max-md:[&:nth-child(n+5)]:hidden"
            />
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-(--lab-border) bg-(--lab-bg)">
        <div className={cn(container, "flex h-16 items-center justify-between gap-6")}>
          <Link
            href="#top"
            className="flex items-center gap-2.5 text-[17px] font-semibold [font-stretch:92%]"
          >
            <LabMark tile="#2CD5E6" glyph="#061417" radius={4} size={26} />
            {lab.brand.name}
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ScrollSpyLinks
              links={lab.nav}
              className={cn(monoText, "flex items-center gap-7")}
              linkClassName="lab-underline py-1 text-[13px] text-(--lab-text-2) hover:text-(--lab-text) aria-[current=true]:text-(--lab-accent)"
            />
          </nav>
          <div className="flex items-center gap-3">
            <Button href={lab.actions.start.href} className="hidden h-10 text-sm sm:inline-flex">
              {lab.actions.start.label}
            </Button>
            <div className="lg:hidden">
              <LabMobileMenu
                links={lab.nav}
                action={lab.actions.start}
                triggerClassName="rounded-[2px]"
                actionClassName="rounded-[2px]"
                linkClassName={cn(monoText, "text-xl font-medium")}
              />
            </div>
          </div>
        </div>
      </header>

      <main id="content" tabIndex={-1} className="outline-none">
        <section id="top" aria-labelledby="hero-title" className="border-b border-(--lab-border)">
          <div
            className={cn(
              container,
              "grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]",
            )}
          >
            <div>
              <p className={cn(monoText, "text-[13px] text-(--lab-accent)")}>
                &gt; {lab.hero.eyebrow}
              </p>
              <h1
                id="hero-title"
                className={cn(heading, "mt-5 text-[clamp(2.5rem,5.2vw,4rem)] leading-[1.04]")}
              >
                {lab.hero.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-(--lab-text-2)">
                {lab.hero.lead}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={lab.actions.start.href}>{lab.actions.start.label}</Button>
                <Button href={lab.actions.process.href} variant="secondary">
                  {lab.actions.process.label}
                </Button>
              </div>
              <dl
                className={cn(
                  monoText,
                  "mt-10 grid gap-2 border-t border-(--lab-border) pt-6 text-[13px]",
                )}
              >
                {specs.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[120px_1fr] gap-4">
                    <dt className="text-(--lab-text-3)">{key}</dt>
                    <dd className="text-(--lab-text-2)">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="group relative border border-(--lab-border) bg-(--lab-bg-alt) p-6">
              <Brackets />
              <p className={cn(monoText, "flex justify-between text-[11px] text-(--lab-text-3)")}>
                <span>fig. 01 / how the practices connect</span>
                <span>live</span>
              </p>
              <SystemDiagram />
            </div>
          </div>
        </section>

        <section aria-labelledby="intro-title" className={cn(container, "py-20 md:py-28")}>
          <SectionHeader index="00" label="About" id="intro-title" title={lab.intro.title} />
          <div className="lab-reveal mt-8 grid gap-6 md:grid-cols-[200px_1fr]">
            <span />
            <div className="grid max-w-3xl gap-4 text-[17px] leading-relaxed text-(--lab-text-2) md:grid-cols-2">
              {lab.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="practices"
          aria-labelledby="practices-title"
          className="border-y border-(--lab-border) bg-(--lab-bg-alt)/80"
        >
          <div className={cn(container, "py-20 md:py-28")}>
            <SectionHeader index="01" id="practices-title" {...lab.practicesIntro} />
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {lab.practices.map((practice, index) => (
                <li
                  key={practice.id}
                  className="lab-reveal group relative border border-(--lab-border) bg-(--lab-surface) p-7 transition-colors duration-200 hover:border-(--lab-border-strong)"
                >
                  <Brackets />
                  <p
                    className={cn(
                      monoText,
                      "flex items-center justify-between text-[11px] text-(--lab-text-3)",
                    )}
                  >
                    <span>practice_{String(index + 1).padStart(2, "0")}</span>
                    <PracticeIcon id={practice.id} className="text-(--lab-accent)" />
                  </p>
                  <h3 className={cn(heading, "mt-8 text-2xl")}>{practice.name}</h3>
                  <p className="mt-3 leading-relaxed text-(--lab-text-2)">{practice.detail}</p>
                  <ul
                    className={cn(
                      monoText,
                      "mt-6 grid gap-2 border-t border-(--lab-border) pt-5 text-[13px] text-(--lab-text-2)",
                    )}
                  >
                    {practice.services.map((service) => (
                      <li key={service.name}>
                        <span className="text-(--lab-accent)">+ </span>
                        {service.name.toLowerCase()}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className={cn(container, "py-20 md:py-28")}
        >
          <SectionHeader index="02" id="services-title" {...lab.servicesIntro} />
          <div className="mt-12 md:ml-[224px]">
            <PracticeTabs
              practices={lab.practices}
              marker="index"
              listClassName={cn(monoText, "flex flex-wrap gap-x-6 border-b border-(--lab-border)")}
              triggerClassName="-mb-px border-b-2 border-transparent py-3 text-[13px] text-(--lab-text-2) transition-colors duration-200 hover:text-(--lab-text) data-[state=active]:border-(--lab-accent) data-[state=active]:text-(--lab-accent)"
              panelClassName="mt-8 outline-none data-[state=active]:animate-[lab-rise_200ms_ease-out]"
              gridClassName="grid gap-px border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2"
              cardClassName="bg-(--lab-surface) p-6 transition-colors duration-200 hover:bg-(--lab-surface-2)"
              titleClassName="font-semibold text-(--lab-text)"
              bodyClassName="text-sm leading-relaxed text-(--lab-text-2)"
            />
          </div>
        </section>

        <section
          id="why"
          aria-labelledby="why-title"
          className="border-y border-(--lab-border) bg-(--lab-bg-alt)/80"
        >
          <div className={cn(container, "py-20 md:py-28")}>
            <SectionHeader index="03" id="why-title" {...lab.whyIntro} />
            <ul className="mt-14 grid gap-px border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2 lg:grid-cols-3">
              {lab.why.map((point, index) => (
                <li key={point.title} className="lab-reveal bg-(--lab-bg) p-7">
                  <p className={cn(monoText, "text-[11px] text-(--lab-accent)")}>
                    commit_{String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
                  <p className="mt-2 leading-relaxed text-(--lab-text-2)">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className={cn(container, "py-20 md:py-28")}
        >
          <SectionHeader index="04" id="process-title" {...lab.processIntro} />
          <ol className="relative mt-14 grid gap-0 lg:grid-cols-6">
            {lab.process.map((step, index) => (
              <li
                key={step.title}
                className="lab-reveal relative border-l border-(--lab-border-strong) pb-10 pl-6 lg:border-t lg:border-l-0 lg:pt-6 lg:pr-4 lg:pb-0 lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[5px] size-[9px] rotate-45 border border-(--lab-accent) bg-(--lab-bg) lg:-top-[5px] lg:left-0"
                />
                <p className={cn(monoText, "text-[11px] text-(--lab-accent)")}>
                  step_{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--lab-text-2)">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="work"
          aria-labelledby="work-title"
          className="border-y border-(--lab-border) bg-(--lab-bg-alt)/80"
        >
          <div className={cn(container, "py-20 md:py-28")}>
            <SectionHeader
              index="05"
              id="work-title"
              label={lab.workIntro.label}
              title={lab.workIntro.title}
              lead={lab.workIntro.lead}
            />
            <ul className="mt-14 grid gap-6 md:grid-cols-2">
              {lab.work.map((project) => (
                <li
                  key={project.id}
                  className="lab-reveal group relative border border-(--lab-border) bg-(--lab-surface)"
                >
                  <Brackets />
                  <div className="border-b border-(--lab-border) bg-(--lab-bg) p-8 [--art-fill:#1D2126] [--art-line:#353C44] [--art-panel:#171A1E]">
                    <ProjectArt
                      kind={project.kind}
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={cn(heading, "text-xl")}>{project.title}</h3>
                    <p className="mt-2 leading-relaxed text-(--lab-text-2)">{project.summary}</p>
                    <dl
                      className={cn(
                        monoText,
                        "mt-5 grid gap-1.5 border-t border-(--lab-border) pt-4 text-[12px]",
                      )}
                    >
                      <div className="grid grid-cols-[90px_1fr] gap-3">
                        <dt className="text-(--lab-text-3)">status</dt>
                        <dd className="text-(--lab-accent)">{lab.workIntro.badge.toLowerCase()}</dd>
                      </div>
                      <div className="grid grid-cols-[90px_1fr] gap-3">
                        <dt className="text-(--lab-text-3)">practice</dt>
                        <dd className="text-(--lab-text-2)">{project.practices.join(", ")}</dd>
                      </div>
                      <div className="grid grid-cols-[90px_1fr] gap-3">
                        <dt className="text-(--lab-text-3)">scope</dt>
                        <dd className="text-(--lab-text-2)">
                          {project.tags.join(", ").toLowerCase()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={cn(container, "py-20 md:py-28")}
        >
          <div className="lab-reveal group relative border border-(--lab-border-strong) bg-(--lab-surface) px-6 py-14 md:px-14">
            <Brackets />
            <p aria-hidden="true" className={cn(monoText, "text-[13px] text-(--lab-text-3)")}>
              <span className="text-(--lab-accent)">$</span> getwithus start --project
            </p>
            <h2
              id="contact-title"
              className={cn(
                heading,
                "mt-6 max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.06]",
              )}
            >
              {lab.contact.title}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[17px] text-(--lab-text-2)">{lab.contact.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={lab.actions.start.href}>{lab.actions.start.label}</Button>
              <Button href={lab.actions.contact.href} variant="secondary">
                {lab.actions.contact.label}
              </Button>
            </div>
            <p className={cn(monoText, "mt-6 text-[13px] text-(--lab-text-3)")}>
              {lab.contact.emailLabel.toLowerCase()}:{" "}
              <span className="text-(--lab-text-2)">{lab.contact.email}</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-(--lab-border) bg-(--lab-bg)">
        <div className={cn(container, "grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
          <div>
            <p className="flex items-center gap-2.5 text-[17px] font-semibold [font-stretch:92%]">
              <LabMark tile="#2CD5E6" glyph="#061417" radius={4} size={26} />
              {lab.brand.name}
            </p>
            <p className="mt-4 font-medium">{lab.brand.tagline}</p>
            <p className="mt-2 max-w-[34ch] text-sm text-(--lab-text-2)">{lab.footer.note}</p>
          </div>
          <FooterColumn
            title="practices"
            links={lab.practices.map((practice) => ({ label: practice.name, href: "#practices" }))}
          />
          <FooterColumn
            title="company"
            links={lab.nav.map((link) => ({ label: link.label, href: `#${link.id}` }))}
          />
          <FooterColumn title="legal" links={lab.footer.legal} />
        </div>
        <div
          className={cn(
            container,
            monoText,
            "flex flex-col gap-3 border-t border-(--lab-border) py-6 text-xs text-(--lab-text-3) md:flex-row md:justify-between",
          )}
        >
          <p>{lab.footer.copyright}</p>
          <LabFootnote letter={concept.letter} name={concept.name} className="text-xs" />
        </div>
      </footer>
    </LabPage>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className={cn(monoText, "text-xs text-(--lab-text-3)")}>{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="lab-underline text-sm text-(--lab-text-2) hover:text-(--lab-text)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
