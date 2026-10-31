import { ArrowUpRight, Plus } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import LabFootnote from "@/components/design-lab/LabFootnote";
import LabMark from "@/components/design-lab/LabMark";
import LabMobileMenu from "@/components/design-lab/LabMobileMenu";
import LabPage from "@/components/design-lab/LabPage";
import ProjectArt from "@/components/design-lab/ProjectArt";
import ScrollSpyLinks from "@/components/design-lab/ScrollSpyLinks";
import { conceptBySlug } from "@/content/design-lab/concepts";
import { lab } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/*
 * Concept C, Creative Digital Studio: black and paper sections, oversized
 * grotesque type, and lime used like a highlighter. The boldest of the five;
 * the layout breaks the even grid on purpose.
 */

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--lab-font-body",
  display: "swap",
});

const concept = conceptBySlug("creative-studio");
const container = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
const display = "font-bold tracking-[-0.045em] text-balance";
/** Paper sections redefine the variables, so shared components inside them adapt. */
const paper =
  "[--lab-bg:#F1EFE8] [--lab-bg-alt:#E8E5DB] [--lab-surface:#E8E5DB] [--lab-text:#0B0B0A] [--lab-text-2:#55534D] [--lab-text-3:#55534D] [--lab-border:#D2CEC2] [--lab-border-strong:#B9B4A6] [--lab-focus:#0B0B0A] [--lab-mark:#0B0B0A] bg-(--lab-bg) text-(--lab-text)";
const MARKED = "automate work.";

function Pill({
  href,
  children,
  variant = "lime",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "lime" | "outline" | "ink";
  className?: string;
}) {
  const styles = {
    lime: "bg-(--lab-accent) text-(--lab-on-accent) hover:bg-(--lab-accent-hover)",
    outline: "border border-current text-(--lab-text) hover:bg-(--lab-text) hover:text-(--lab-bg)",
    ink: "bg-[#0B0B0A] text-[#F1EFE8] hover:bg-[#2B2A27]",
  } as const;
  return (
    <Link
      href={href}
      className={cn(
        "lab-tilt inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-base font-medium whitespace-nowrap transition-colors duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
      <Icon icon={ArrowUpRight} size={20} className="lab-arrow" />
    </Link>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-(--lab-text-2)">
      <span className="size-2 bg-[var(--lab-mark,var(--lab-accent))]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function CreativeStudio() {
  const [before] = lab.hero.title.split(MARKED);
  return (
    <LabPage
      concept={concept}
      fontClassName={cn(bricolage.variable, "font-(family-name:--lab-font-body)")}
      headerHeight={76}
    >
      <header className="sticky top-0 z-40 border-b border-(--lab-border) bg-(--lab-bg)">
        <div className={cn(container, "flex h-[76px] items-center justify-between gap-6")}>
          <Link
            href="#top"
            className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.03em]"
          >
            <LabMark tile="#C8F53C" glyph="#0B0B0A" radius={32} size={30} />
            {lab.brand.name}
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ScrollSpyLinks
              links={lab.nav}
              className="flex items-center gap-8"
              linkClassName="relative py-1 text-[15px] text-(--lab-text-2) transition-colors duration-200 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-(--lab-accent) after:transition-[width] after:duration-300 hover:text-(--lab-text) hover:after:w-full aria-[current=true]:text-(--lab-text) aria-[current=true]:after:w-full"
            />
          </nav>
          <div className="flex items-center gap-3">
            <Pill
              href={lab.actions.start.href}
              className="hidden h-11 px-5 text-[15px] sm:inline-flex"
            >
              {lab.actions.start.label}
            </Pill>
            <div className="lg:hidden">
              <LabMobileMenu
                links={lab.nav}
                action={lab.actions.start}
                linkClassName="text-4xl font-bold tracking-[-0.04em]"
              />
            </div>
          </div>
        </div>
      </header>

      <main id="content" tabIndex={-1} className="outline-none">
        <section
          id="top"
          aria-labelledby="hero-title"
          className={cn(container, "pt-16 pb-14 md:pt-24")}
        >
          <Label>{lab.hero.eyebrow}</Label>
          <h1
            id="hero-title"
            className={cn(
              display,
              "mt-8 max-w-[14ch] text-[clamp(3rem,8.6vw,7.75rem)] leading-[0.94] [font-variation-settings:'opsz'_96]",
            )}
          >
            {before}
            <span className="lab-motion [animation:lab-mark_900ms_cubic-bezier(0.2,0.7,0.2,1)_250ms_both] bg-[linear-gradient(var(--lab-accent),var(--lab-accent))] [box-decoration-break:clone] [background-size:100%_100%] bg-no-repeat px-[0.04em] text-(--lab-on-accent) [-webkit-box-decoration-break:clone]">
              {MARKED}
            </span>
          </h1>
          <div className="mt-14 grid items-end gap-10 border-t border-(--lab-border) pt-10 lg:grid-cols-2">
            <p className="max-w-[48ch] text-lg leading-relaxed text-(--lab-text-2) md:text-xl">
              {lab.hero.lead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Pill href={lab.actions.start.href}>{lab.actions.start.label}</Pill>
              <Pill href={lab.actions.process.href} variant="outline">
                {lab.actions.process.label}
              </Pill>
            </div>
          </div>
          <ul className="mt-14 flex flex-wrap gap-x-3 gap-y-2 text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.03em] text-(--lab-text-3)">
            {lab.practices.map((practice, index) => (
              <li key={practice.id} className="flex items-center gap-3">
                <Link
                  href="#practices"
                  className="transition-colors duration-200 hover:text-(--lab-accent)"
                >
                  {practice.name}
                </Link>
                {index < lab.practices.length - 1 ? <span aria-hidden="true">/</span> : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="intro-title" className={paper}>
          <div className={cn(container, "py-24 md:py-32")}>
            <Label>{lab.intro.label}</Label>
            <h2
              id="intro-title"
              className={cn(
                display,
                "lab-reveal mt-6 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98]",
              )}
            >
              {lab.intro.title}
            </h2>
            <div className="lab-reveal mt-12 grid gap-8 text-lg leading-relaxed text-(--lab-text-2) md:grid-cols-2">
              {lab.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-10 flex flex-wrap gap-3">
              {lab.intro.principles.map((principle) => (
                <li
                  key={principle}
                  className="rounded-full bg-[#0B0B0A] px-5 py-2.5 text-[15px] font-medium text-[#F1EFE8]"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="practices"
          aria-labelledby="practices-title"
          className={cn(container, "py-24 md:py-32")}
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Label>{lab.practicesIntro.label}</Label>
              <h2
                id="practices-title"
                className={cn(display, "mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98]")}
              >
                {lab.practicesIntro.title}
              </h2>
            </div>
            <p className="max-w-[46ch] text-lg leading-relaxed text-(--lab-text-2) md:justify-self-end">
              {lab.practicesIntro.lead}
            </p>
          </div>
          <ul className="mt-16 border-t border-(--lab-border)">
            {lab.practices.map((practice, index) => (
              <li
                key={practice.id}
                className="lab-reveal group border-b border-(--lab-border) py-10"
              >
                <div className="grid gap-6 md:grid-cols-[80px_1fr_auto] md:items-start">
                  <span className="text-sm font-medium text-(--lab-accent) tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className={cn(
                        display,
                        "text-[clamp(2rem,5vw,4.25rem)] leading-none transition-colors duration-300 group-hover:text-(--lab-accent)",
                      )}
                    >
                      {practice.name}
                    </h3>
                    <p className="mt-5 max-w-[60ch] text-lg text-(--lab-text-2)">
                      {practice.detail}
                    </p>
                    <p className="mt-5 max-w-[80ch] text-[15px] leading-relaxed text-(--lab-text-3)">
                      {practice.services.map((service) => service.name).join("  /  ")}
                    </p>
                  </div>
                  <Link
                    href="#services"
                    className="lab-tilt inline-flex size-14 items-center justify-center rounded-full border border-(--lab-border-strong) transition-colors duration-300 group-hover:border-(--lab-accent) group-hover:bg-(--lab-accent) group-hover:text-(--lab-on-accent)"
                  >
                    <Icon
                      icon={ArrowUpRight}
                      size={24}
                      className="lab-arrow"
                      label={`${practice.name} services`}
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" aria-labelledby="services-title" className={paper}>
          <div className={cn(container, "py-24 md:py-32")}>
            <Label>{lab.servicesIntro.label}</Label>
            <h2
              id="services-title"
              className={cn(
                display,
                "mt-6 max-w-[16ch] text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98]",
              )}
            >
              {lab.servicesIntro.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-(--lab-text-2)">
              {lab.servicesIntro.lead}
            </p>
            <div className="mt-16 grid gap-16">
              {lab.practices.map((practice) => (
                <div key={practice.id}>
                  <h3 className="flex items-center gap-3 text-2xl font-bold tracking-[-0.03em]">
                    <span className="size-3 bg-[#0B0B0A]" aria-hidden="true" />
                    {practice.name}
                  </h3>
                  <ul className="mt-6 grid gap-px bg-(--lab-border) sm:grid-cols-2 lg:grid-cols-3">
                    {practice.services.map((service) => (
                      <li
                        key={service.name}
                        className="lab-reveal group bg-(--lab-bg) p-7 transition-colors duration-300 hover:bg-[#0B0B0A]"
                      >
                        <h4 className="text-xl font-bold tracking-[-0.03em] transition-colors duration-300 group-hover:text-[#C8F53C]">
                          {service.name}
                        </h4>
                        <p className="mt-3 leading-relaxed text-(--lab-text-2) transition-colors duration-300 group-hover:text-[#A9A69D]">
                          {service.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="why"
          aria-labelledby="why-title"
          className={cn(container, "grid gap-14 py-24 md:grid-cols-[0.9fr_1.1fr] md:py-32")}
        >
          <div className="md:sticky md:top-28 md:self-start">
            <Label>{lab.whyIntro.label}</Label>
            <h2
              id="why-title"
              className={cn(display, "mt-6 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98]")}
            >
              {lab.whyIntro.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg text-(--lab-text-2)">{lab.whyIntro.lead}</p>
          </div>
          <ul className="border-t border-(--lab-border)">
            {lab.why.map((point) => (
              <li
                key={point.title}
                className="lab-reveal grid grid-cols-[32px_1fr] gap-4 border-b border-(--lab-border) py-8"
              >
                <Icon icon={Plus} size={24} className="mt-1 text-(--lab-accent)" />
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">{point.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-(--lab-text-2)">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="process" aria-labelledby="process-title" className={paper}>
          <div className={cn(container, "py-24 md:py-32")}>
            <Label>{lab.processIntro.label}</Label>
            <h2
              id="process-title"
              className={cn(display, "mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98]")}
            >
              {lab.processIntro.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-(--lab-text-2)">{lab.processIntro.lead}</p>
            <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {lab.process.map((step, index) => (
                <li key={step.title} className="lab-reveal">
                  <span
                    aria-hidden="true"
                    className="block text-[5.5rem] leading-none font-extrabold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#0B0B0A]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em]">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-(--lab-text-2)">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={cn(container, "py-24 md:py-32")}>
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <Label>{lab.workIntro.label}</Label>
              <h2
                id="work-title"
                className={cn(display, "mt-6 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.98]")}
              >
                {lab.workIntro.title}
              </h2>
            </div>
            <p className="max-w-[46ch] text-lg text-(--lab-text-2) md:justify-self-end">
              {lab.workIntro.lead}
            </p>
          </div>
          <ul className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {lab.work.map((project, index) => (
              <li
                key={project.id}
                className={cn("lab-reveal group", index % 2 === 1 && "md:mt-28")}
              >
                <div className="overflow-hidden bg-(--lab-surface) p-8 [--art-fill:#1F1F1C] [--art-line:#45433E] [--art-panel:#0B0B0A]">
                  <ProjectArt
                    kind={project.kind}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-(--lab-accent) px-3 py-1 text-xs font-medium text-(--lab-accent)">
                    {lab.workIntro.badge}
                  </span>
                  <span className="text-sm text-(--lab-text-3)">{project.tags.join(" / ")}</span>
                </div>
                <h3 className="mt-4 text-3xl font-bold tracking-[-0.04em] transition-colors duration-300 group-hover:text-(--lab-accent)">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-(--lab-text-2)">
                  {project.summary}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="bg-(--lab-accent) text-(--lab-text) [--lab-bg:#C8F53C] [--lab-focus:#0B0B0A] [--lab-text-2:#2B2A27] [--lab-text:#0B0B0A]"
        >
          <div className={cn(container, "py-24 md:py-32")}>
            <h2
              id="contact-title"
              className={cn(
                display,
                "lab-reveal max-w-[14ch] text-[clamp(2.75rem,7.4vw,6.5rem)] leading-[0.94]",
              )}
            >
              {lab.contact.title}
            </h2>
            <div className="mt-12 grid items-end gap-10 md:grid-cols-2">
              <div>
                <p className="max-w-[46ch] text-xl leading-relaxed text-(--lab-text-2)">
                  {lab.contact.body}
                </p>
                <p className="mt-4 text-[15px] text-(--lab-text-2)">
                  {lab.contact.emailLabel}{" "}
                  <span className="font-medium text-(--lab-text)">{lab.contact.email}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Pill href={lab.actions.start.href} variant="ink">
                  {lab.actions.start.label}
                </Pill>
                <Pill href={lab.actions.contact.href} variant="outline">
                  {lab.actions.contact.label}
                </Pill>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={cn(container, "py-16")}>
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[clamp(2rem,4vw,3rem)] leading-none font-bold tracking-[-0.045em]">
              {lab.brand.tagline}
            </p>
            <p className="mt-5 max-w-[34ch] text-(--lab-text-2)">{lab.footer.note}</p>
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
        <div className="mt-16 flex flex-col gap-3 border-t border-(--lab-border) pt-6 text-sm text-(--lab-text-3) md:flex-row md:justify-between">
          <p className="flex items-center gap-2">
            <LabMark tile="#C8F53C" glyph="#0B0B0A" radius={32} size={20} />
            {lab.footer.copyright}
          </p>
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
      <h2 className="text-sm text-(--lab-text-3)">{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-lg transition-colors duration-200 hover:text-(--lab-accent)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
