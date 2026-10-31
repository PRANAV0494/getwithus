import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import LabFootnote from "@/components/design-lab/LabFootnote";
import LabMark from "@/components/design-lab/LabMark";
import LabMobileMenu from "@/components/design-lab/LabMobileMenu";
import LabPage from "@/components/design-lab/LabPage";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
import ProjectArt from "@/components/design-lab/ProjectArt";
import ScrollSpyLinks from "@/components/design-lab/ScrollSpyLinks";
import { conceptBySlug } from "@/content/design-lab/concepts";
import { lab } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/*
 * Concept E, Hybrid Premium: navy bands for the statement moments, warm
 * off-white pages for reading, a serif display face, and electric blue kept
 * for action. Editorial rather than product-like.
 */

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--lab-font-display",
  display: "swap",
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lab-font-body",
  display: "swap",
});

const concept = conceptBySlug("hybrid-premium");
const container = "mx-auto w-full max-w-[1240px] px-6 md:px-10";
const serifHeading =
  "font-(family-name:--lab-font-display) font-normal tracking-[-0.01em] text-balance";
/** Navy bands redefine the variables, so text, borders, and links adapt inside them. */
const navy =
  "[--lab-bg:#0B1631] [--lab-surface:#12204A] [--lab-text:#F4F6FB] [--lab-text-2:#AEB7CE] [--lab-text-3:#AEB7CE] [--lab-border:#22305C] [--lab-border-strong:#33447A] [--lab-accent-text:#8EAEFF] [--lab-focus:#8EAEFF] bg-(--lab-bg) text-(--lab-text)";

function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "text";
  className?: string;
}) {
  const styles = {
    primary: "h-12 rounded-lg bg-(--lab-accent) px-6 text-[#FFFFFF] hover:bg-(--lab-accent-hover)",
    light: "h-12 rounded-lg bg-[#FFFFFF] px-6 text-[#0B1631] hover:bg-[#E6ECFF]",
    text: "lab-underline h-auto px-0 py-1 text-(--lab-text)",
  } as const;
  return (
    <Link
      href={href}
      className={cn(
        "lab-nudge inline-flex items-center justify-center gap-2 text-[15px] font-medium transition-colors duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
      <Icon icon={ArrowRight} size={16} className="lab-arrow" />
    </Link>
  );
}

function SectionHeader({
  label,
  title,
  lead,
  id,
}: {
  label: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <div className="lab-reveal grid gap-6 border-t border-(--lab-border) pt-8 md:grid-cols-[220px_1fr]">
      <p className="text-sm font-medium text-(--lab-text-2)">{label}</p>
      <div className="max-w-3xl">
        <h2
          id={id}
          className={cn(serifHeading, "text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.02]")}
        >
          {title}
        </h2>
        {lead ? (
          <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-(--lab-text-2)">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function HybridPremium() {
  return (
    <LabPage
      concept={concept}
      fontClassName={cn(serif.variable, sans.variable, "font-(family-name:--lab-font-body)")}
      headerHeight={72}
    >
      <header className={cn(navy, "sticky top-0 z-40 border-b border-(--lab-border)")}>
        <div className={cn(container, "flex h-[72px] items-center justify-between gap-6")}>
          <Link href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold">
            <LabMark tile="#FFFFFF" glyph="#0B1631" radius={10} />
            {lab.brand.name}
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ScrollSpyLinks
              links={lab.nav}
              className="flex items-center gap-8"
              linkClassName="lab-underline py-1 text-[15px] text-(--lab-text-2) hover:text-(--lab-text) aria-[current=true]:text-(--lab-text)"
            />
          </nav>
          <div className="flex items-center gap-3">
            <Button
              href={lab.actions.start.href}
              variant="light"
              className="hidden h-10 px-5 text-sm sm:inline-flex"
            >
              {lab.actions.start.label}
            </Button>
            <div className="lg:hidden">
              <LabMobileMenu
                links={lab.nav}
                action={lab.actions.start}
                panelClassName={navy}
                triggerClassName="rounded-lg"
                actionClassName="rounded-lg bg-[#FFFFFF] text-[#0B1631]"
                linkClassName="font-(family-name:--lab-font-display) text-4xl font-normal"
              />
            </div>
          </div>
        </div>
      </header>

      <main id="content" tabIndex={-1} className="outline-none">
        <section
          id="top"
          aria-labelledby="hero-title"
          className={cn(navy, "relative overflow-hidden")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#22305C66_1px,transparent_1px)] bg-size-[calc(100%/6)_100%]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="lab-motion absolute inset-y-0 w-1/3 [animation:lab-sweep_14s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,#FFFFFF0D,transparent)]" />
          </div>
          <div className={cn(container, "relative pt-20 pb-10 md:pt-28")}>
            <p className="text-sm font-medium text-(--lab-accent-text)">{lab.hero.eyebrow}</p>
            <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
              <h1
                id="hero-title"
                className={cn(serifHeading, "text-[clamp(2.75rem,6.6vw,5.25rem)] leading-[0.98]")}
              >
                {lab.hero.title}
              </h1>
              <div className="lg:pb-2">
                <p className="text-[17px] leading-relaxed text-(--lab-text-2)">{lab.hero.lead}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href={lab.actions.start.href} variant="light">
                    {lab.actions.start.label}
                  </Button>
                  <Button href={lab.actions.process.href} variant="text">
                    {lab.actions.process.label}
                  </Button>
                </div>
              </div>
            </div>
            <ol className="mt-20 grid border-t border-(--lab-border) md:grid-cols-3">
              {lab.practices.map((practice, index) => (
                <li
                  key={practice.id}
                  className="border-b border-(--lab-border) md:border-b-0 md:border-l md:first:border-l-0"
                >
                  <Link
                    href="#practices"
                    className="lab-nudge group flex items-start justify-between gap-4 py-6 md:px-6 md:first:pl-0"
                  >
                    <span>
                      <span className="text-sm text-(--lab-text-3) tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn(serifHeading, "mt-1 block text-[1.75rem] leading-tight")}>
                        {practice.name}
                      </span>
                      <span className="mt-1 block text-sm text-(--lab-text-2)">
                        {practice.summary}
                      </span>
                    </span>
                    <Icon
                      icon={ArrowUpRight}
                      size={20}
                      className="lab-arrow mt-1 shrink-0 text-(--lab-accent-text)"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="intro-title" className={cn(container, "py-24 md:py-32")}>
          <div className="lab-reveal grid gap-6 md:grid-cols-[220px_1fr]">
            <p className="text-sm font-medium text-(--lab-text-2)">{lab.intro.label}</p>
            <div className="max-w-4xl">
              <h2
                id="intro-title"
                className={cn(serifHeading, "text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.02]")}
              >
                {lab.intro.title}
              </h2>
              <div className="mt-8 grid gap-6 text-[17px] leading-relaxed text-(--lab-text-2) md:grid-cols-2">
                {lab.intro.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-(--lab-border) bg-(--lab-border) sm:grid-cols-3">
                {lab.intro.principles.map((principle) => (
                  <li key={principle} className="bg-[#FFFFFF] px-5 py-4 font-medium">
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="practices" aria-labelledby="practices-title" className="bg-[#FFFFFF]">
          <div className={cn(container, "py-24 md:py-32")}>
            <SectionHeader id="practices-title" {...lab.practicesIntro} />
            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {lab.practices.map((practice) => (
                <li
                  key={practice.id}
                  className="lab-reveal group relative rounded-xl border border-(--lab-border) bg-(--lab-bg) p-8 transition-colors duration-200 hover:border-(--lab-border-strong)"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-0.5 origin-left scale-x-0 bg-(--lab-accent) transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <PracticeIcon id={practice.id} size={24} className="text-(--lab-accent)" />
                  <h3 className={cn(serifHeading, "mt-6 text-[2rem] leading-tight")}>
                    {practice.name}
                  </h3>
                  <p className="mt-3 leading-relaxed text-(--lab-text-2)">{practice.detail}</p>
                  <ul className="mt-6 grid gap-2 border-t border-(--lab-border) pt-5 text-[15px]">
                    {practice.services.map((service) => (
                      <li key={service.name}>{service.name}</li>
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
          className={cn(container, "py-24 md:py-32")}
        >
          <SectionHeader id="services-title" {...lab.servicesIntro} />
          <div className="mt-14 grid gap-12">
            {lab.practices.map((practice) => (
              <div
                key={practice.id}
                className="lab-reveal grid gap-6 border-t border-(--lab-border) pt-8 md:grid-cols-[220px_1fr]"
              >
                <h3 className={cn(serifHeading, "text-[1.75rem] leading-tight")}>
                  {practice.name}
                </h3>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {practice.services.map((service) => (
                    <li key={service.name} className="group border-b border-(--lab-border) py-5">
                      <h4 className="flex items-center justify-between gap-3 font-semibold">
                        {service.name}
                        <Icon
                          icon={ArrowRight}
                          size={16}
                          className="-translate-x-1 text-(--lab-accent) opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </h4>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-(--lab-text-2)">
                        {service.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="why" aria-labelledby="why-title" className={navy}>
          <div className={cn(container, "py-24 md:py-32")}>
            <SectionHeader id="why-title" {...lab.whyIntro} />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2 lg:grid-cols-3">
              {lab.why.map((point) => (
                <li key={point.title} className="lab-reveal bg-(--lab-bg) p-8">
                  <span className="block size-2 bg-(--lab-accent-text)" aria-hidden="true" />
                  <h3 className={cn(serifHeading, "mt-6 text-[1.625rem] leading-tight")}>
                    {point.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-(--lab-text-2)">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className={cn(container, "py-24 md:py-32")}
        >
          <SectionHeader id="process-title" {...lab.processIntro} />
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
            {lab.process.map((step, index) => (
              <li key={step.title} className="lab-reveal">
                <span
                  className={cn(serifHeading, "block text-5xl leading-none text-(--lab-accent)")}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" aria-labelledby="work-title" className="bg-[#FFFFFF]">
          <div className={cn(container, "py-24 md:py-32")}>
            <SectionHeader
              id="work-title"
              label={lab.workIntro.label}
              title={lab.workIntro.title}
              lead={lab.workIntro.lead}
            />
            <ul className="mt-14 grid gap-6 md:grid-cols-6">
              {lab.work.map((project, index) => (
                <li
                  key={project.id}
                  className={cn(
                    "lab-reveal group",
                    index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2",
                  )}
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-(--lab-border) bg-(--lab-bg) transition-colors duration-200 group-hover:border-(--lab-border-strong)">
                    <div className="flex flex-1 items-center bg-[#EFEDE6] p-8 [--art-fill:#F7F6F2] [--art-line:#C9C6BC] [--art-panel:#FFFFFF]">
                      <ProjectArt
                        kind={project.kind}
                        className={cn(
                          "mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                          index === 0 || index === 3 ? "max-w-[460px]" : "max-w-[300px]",
                        )}
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium text-(--lab-accent)">
                        {lab.workIntro.badge}
                      </p>
                      <h3 className={cn(serifHeading, "mt-2 text-[1.75rem] leading-tight")}>
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">
                        {project.summary}
                      </p>
                      <p className="mt-4 text-sm text-(--lab-text-3)">{project.tags.join(", ")}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className={navy}>
          <div
            className={cn(
              container,
              "grid gap-10 py-24 md:py-32 lg:grid-cols-[1.3fr_1fr] lg:items-end",
            )}
          >
            <h2
              id="contact-title"
              className={cn(
                serifHeading,
                "lab-reveal text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[1]",
              )}
            >
              {lab.contact.title}
            </h2>
            <div className="lab-reveal">
              <p className="text-[17px] leading-relaxed text-(--lab-text-2)">{lab.contact.body}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={lab.actions.start.href} variant="light">
                  {lab.actions.start.label}
                </Button>
                <Button href={lab.actions.contact.href} variant="text">
                  {lab.actions.contact.label}
                </Button>
              </div>
              <p className="mt-6 text-sm text-(--lab-text-2)">
                {lab.contact.emailLabel}{" "}
                <span className="text-(--lab-text)">{lab.contact.email}</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={cn(navy, "border-t border-(--lab-border) [--lab-bg:#08112A]")}>
        <div className={cn(container, "grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
          <div>
            <p className="flex items-center gap-2.5 text-[17px] font-semibold">
              <LabMark tile="#FFFFFF" glyph="#0B1631" radius={10} />
              {lab.brand.name}
            </p>
            <p className={cn(serifHeading, "mt-5 text-3xl leading-tight")}>{lab.brand.tagline}</p>
            <p className="mt-3 max-w-[34ch] text-sm text-(--lab-text-2)">{lab.footer.note}</p>
          </div>
          <FooterColumn
            title="Practices"
            links={lab.practices.map((practice) => ({ label: practice.name, href: "#practices" }))}
          />
          <FooterColumn
            title="Company"
            links={lab.nav.map((link) => ({ label: link.label, href: `#${link.id}` }))}
          />
          <FooterColumn title="Legal" links={lab.footer.legal} />
        </div>
        <div
          className={cn(
            container,
            "flex flex-col gap-3 border-t border-(--lab-border) py-6 text-sm text-(--lab-text-2) md:flex-row md:justify-between",
          )}
        >
          <p>{lab.footer.copyright}</p>
          <LabFootnote letter={concept.letter} name={concept.name} />
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
      <h2 className="text-sm font-semibold">{title}</h2>
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
