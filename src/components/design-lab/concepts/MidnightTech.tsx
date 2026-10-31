import { ArrowRight, Check } from "lucide-react";
import { Manrope, Sora } from "next/font/google";
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
 * Concept A, Midnight Tech: deep navy, one electric blue light source, a
 * centered statement hero, and a console panel that shows the three practices
 * at work. Product-company polish applied to an agency.
 */

const display = Sora({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--lab-font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lab-font-body",
  display: "swap",
});

const concept = conceptBySlug("midnight-tech");
const container = "mx-auto w-full max-w-[1200px] px-6 md:px-10";
const heading =
  "font-(family-name:--lab-font-display) tracking-[-0.03em] text-balance text-(--lab-text)";

const consoleRows = {
  engineering: ["Release preview deployed", "API tests passing", "Mobile build sent to testers"],
  growth: ["Landing page variant live", "Search report ready", "Campaign budget on plan"],
  ai: ["Assistant handed a chat to staff", "Invoices matched automatically", "Morning report sent"],
} as const;

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
        "lab-nudge inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors duration-200",
        variant === "primary"
          ? "bg-(--lab-accent) text-(--lab-on-accent) hover:bg-(--lab-accent-hover)"
          : "border border-(--lab-border-strong) bg-(--lab-surface) text-(--lab-text) hover:border-(--lab-accent-text)",
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
  center = false,
}: {
  label: string;
  title: string;
  lead?: string;
  id: string;
  center?: boolean;
}) {
  return (
    <div className={cn("lab-reveal max-w-2xl", center && "mx-auto text-center")}>
      <p className="text-sm font-semibold text-(--lab-accent-text)">{label}</p>
      <h2
        id={id}
        className={cn(heading, "mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.1]")}
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 text-[17px] leading-relaxed text-(--lab-text-2)">{lead}</p> : null}
    </div>
  );
}

export default function MidnightTech() {
  return (
    <LabPage
      concept={concept}
      fontClassName={cn(display.variable, body.variable, "font-(family-name:--lab-font-body)")}
      headerHeight={68}
    >
      <header className="sticky top-0 z-40 border-b border-(--lab-border)/70 bg-(--lab-bg)/95">
        <div className={cn(container, "flex h-[68px] items-center justify-between gap-6")}>
          <Link
            href="#top"
            className="flex items-center gap-2.5 font-(family-name:--lab-font-display) text-[17px] font-semibold"
          >
            <LabMark tile="#2563FF" glyph="#FFFFFF" radius={18} />
            {lab.brand.name}
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ScrollSpyLinks
              links={lab.nav}
              className="flex items-center gap-1"
              linkClassName="relative rounded-full px-3.5 py-2 text-sm font-medium text-(--lab-text-2) transition-colors duration-200 hover:text-(--lab-text) aria-[current=true]:text-(--lab-text) aria-[current=true]:after:absolute aria-[current=true]:after:-bottom-0.5 aria-[current=true]:after:left-1/2 aria-[current=true]:after:size-1 aria-[current=true]:after:-translate-x-1/2 aria-[current=true]:after:rounded-full aria-[current=true]:after:bg-(--lab-accent-text)"
            />
          </nav>
          <div className="flex items-center gap-3">
            <Button
              href={lab.actions.start.href}
              className="hidden h-10 px-5 text-sm sm:inline-flex"
            >
              {lab.actions.start.label}
            </Button>
            <div className="lg:hidden">
              <LabMobileMenu links={lab.nav} action={lab.actions.start} />
            </div>
          </div>
        </div>
      </header>

      <main id="content" tabIndex={-1} className="outline-none">
        <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1C285055_1px,transparent_1px),linear-gradient(to_bottom,#1C285055_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_40%,transparent_100%)] bg-size-[56px_56px]"
          />
          <div
            aria-hidden="true"
            className="lab-motion pointer-events-none absolute top-[-240px] left-1/2 h-[620px] w-[900px] -translate-x-1/2 [animation:lab-drift_24s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(closest-side,#2563FF38,transparent)]"
          />
          <div className={cn(container, "relative pt-20 pb-16 text-center md:pt-28")}>
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--lab-border-strong) bg-(--lab-surface)/80 px-4 py-1.5 text-sm text-(--lab-text-2)">
              <span className="size-1.5 rounded-full bg-(--lab-accent-text)" aria-hidden="true" />
              {lab.hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className={cn(
                heading,
                "mx-auto mt-7 max-w-[22ch] text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[1.05] text-balance",
              )}
            >
              {lab.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[62ch] text-[17px] leading-relaxed text-(--lab-text-2) md:text-lg">
              {lab.hero.lead}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={lab.actions.start.href} className="w-full sm:w-auto">
                {lab.actions.start.label}
              </Button>
              <Button
                href={lab.actions.process.href}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {lab.actions.process.label}
              </Button>
            </div>

            <div className="relative mx-auto mt-16 max-w-5xl rounded-2xl border border-(--lab-border-strong) bg-(--lab-bg-alt) p-2 text-left shadow-[0_40px_120px_-40px_#2563FF55]">
              <div className="flex items-center gap-2 px-3 py-2.5">
                {["#2A3A6E", "#2A3A6E", "#2A3A6E"].map((color, index) => (
                  <span
                    key={index}
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-3 text-xs text-(--lab-text-3)">getwithus / this week</span>
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                {lab.practices.map((practice) => (
                  <div
                    key={practice.id}
                    className="rounded-xl border border-(--lab-border) bg-(--lab-surface) p-4"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-(--lab-text)">
                      <PracticeIcon
                        id={practice.id}
                        size={16}
                        className="text-(--lab-accent-text)"
                      />
                      {practice.name}
                    </p>
                    <ul className="mt-4 grid gap-2.5">
                      {consoleRows[practice.id].map((row) => (
                        <li
                          key={row}
                          className="flex items-center gap-2.5 rounded-lg bg-(--lab-surface-2) px-3 py-2 text-[13px] text-(--lab-text-2)"
                        >
                          <span
                            className="size-1.5 shrink-0 rounded-full bg-(--lab-accent-text)"
                            aria-hidden="true"
                          />
                          {row}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="intro-title"
          className="border-y border-(--lab-border) bg-(--lab-bg-alt)"
        >
          <div className={cn(container, "grid gap-10 py-20 md:grid-cols-[1fr_1.1fr] md:py-24")}>
            <div className="lab-reveal">
              <p className="text-sm font-semibold text-(--lab-accent-text)">{lab.intro.label}</p>
              <h2
                id="intro-title"
                className={cn(heading, "mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.1]")}
              >
                {lab.intro.title}
              </h2>
            </div>
            <div className="lab-reveal">
              {lab.intro.body.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-[17px] leading-relaxed text-(--lab-text-2)">
                  {paragraph}
                </p>
              ))}
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {lab.intro.principles.map((principle) => (
                  <li
                    key={principle}
                    className="inline-flex items-center gap-2 rounded-full border border-(--lab-border-strong) px-4 py-2 text-sm text-(--lab-text)"
                  >
                    <Icon icon={Check} size={16} className="text-(--lab-accent-text)" />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="practices"
          aria-labelledby="practices-title"
          className={cn(container, "py-24 md:py-28")}
        >
          <SectionHeader id="practices-title" {...lab.practicesIntro} />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {lab.practices.map((practice) => (
              <li
                key={practice.id}
                className="lab-reveal group relative overflow-hidden rounded-2xl border border-(--lab-border) bg-(--lab-surface) p-7 transition-colors duration-200 hover:border-(--lab-border-strong)"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-(--lab-accent) transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-(--lab-surface-2) text-(--lab-accent-text)">
                  <PracticeIcon id={practice.id} />
                </span>
                <h3 className={cn(heading, "mt-6 text-xl")}>{practice.name}</h3>
                <p className="mt-3 text-(--lab-text-2)">{practice.detail}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-(--lab-border) pt-6">
                  {practice.services.map((service) => (
                    <li key={service.name} className="flex gap-2.5 text-sm text-(--lab-text)">
                      <Icon icon={Check} size={16} className="mt-0.5 text-(--lab-accent-text)" />
                      {service.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="services"
          aria-labelledby="services-title"
          className="border-t border-(--lab-border) bg-(--lab-bg-alt)"
        >
          <div className={cn(container, "py-24 md:py-28")}>
            <SectionHeader id="services-title" {...lab.servicesIntro} />
            <div className="mt-12">
              <PracticeTabs
                practices={lab.practices}
                listClassName="inline-flex max-w-full flex-wrap gap-1 rounded-full border border-(--lab-border) bg-(--lab-surface) p-1"
                triggerClassName="rounded-full px-4 py-2 text-sm font-medium text-(--lab-text-2) transition-colors duration-200 hover:text-(--lab-text) data-[state=active]:bg-(--lab-accent) data-[state=active]:text-(--lab-on-accent)"
                panelClassName="mt-8 outline-none"
                gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                cardClassName="group rounded-2xl border border-(--lab-border) bg-(--lab-surface) p-6 transition-colors duration-200 hover:border-(--lab-accent) hover:bg-(--lab-surface-2)"
                titleClassName="text-base font-semibold text-(--lab-text)"
                bodyClassName="text-sm leading-relaxed text-(--lab-text-2)"
              />
            </div>
          </div>
        </section>

        <section id="why" aria-labelledby="why-title" className={cn(container, "py-24 md:py-28")}>
          <SectionHeader id="why-title" {...lab.whyIntro} />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {lab.why.map((point) => (
              <li key={point.title} className="lab-reveal border-t border-(--lab-border) pt-6">
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-(--lab-border-strong) text-(--lab-accent-text)">
                  <Icon icon={Check} size={16} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-(--lab-text-2)">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="process"
          aria-labelledby="process-title"
          className="border-y border-(--lab-border) bg-(--lab-bg-alt)"
        >
          <div className={cn(container, "py-24 md:py-28")}>
            <SectionHeader id="process-title" {...lab.processIntro} />
            <ol className="relative mt-14 grid gap-8 lg:grid-cols-6 lg:gap-5">
              <span
                aria-hidden="true"
                className="absolute top-5 right-[8%] left-[8%] hidden h-px bg-(--lab-border-strong) lg:block"
              />
              {lab.process.map((step, index) => (
                <li key={step.title} className="lab-reveal relative flex gap-4 lg:block">
                  <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-(--lab-accent) bg-(--lab-bg) text-sm font-semibold text-(--lab-accent-text) tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold lg:mt-5">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--lab-text-2)">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={cn(container, "py-24 md:py-28")}>
          <SectionHeader
            id="work-title"
            label={lab.workIntro.label}
            title={lab.workIntro.title}
            lead={lab.workIntro.lead}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {lab.work.map((project) => (
              <li
                key={project.id}
                className="lab-reveal group overflow-hidden rounded-2xl border border-(--lab-border) bg-(--lab-surface) transition-colors duration-200 hover:border-(--lab-border-strong)"
              >
                <div className="relative bg-(--lab-bg-alt) px-8 pt-8 [--art-fill:#121C42] [--art-line:#2A3A6E] [--art-panel:#0D1533]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,#2563FF30,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <ProjectArt
                    kind={project.kind}
                    className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  />
                </div>
                <div className="p-7">
                  <p className="inline-flex rounded-full border border-(--lab-border-strong) px-3 py-1 text-xs text-(--lab-text-2)">
                    {lab.workIntro.badge}
                  </p>
                  <h3 className={cn(heading, "mt-4 text-xl")}>{project.title}</h3>
                  <p className="mt-2 text-(--lab-text-2)">{project.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-(--lab-surface-2) px-2.5 py-1 text-xs text-(--lab-text-2)"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={cn(container, "pb-24 md:pb-28")}
        >
          <div className="lab-reveal relative overflow-hidden rounded-3xl border border-(--lab-border-strong) bg-(--lab-surface) px-6 py-16 text-center md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(50%_100%_at_50%_0%,#2563FF40,transparent)]"
            />
            <h2
              id="contact-title"
              className={cn(
                heading,
                "relative mx-auto max-w-[18ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.08]",
              )}
            >
              {lab.contact.title}
            </h2>
            <p className="relative mx-auto mt-5 max-w-[52ch] text-[17px] text-(--lab-text-2)">
              {lab.contact.body}
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={lab.actions.start.href}>{lab.actions.start.label}</Button>
              <Button href={lab.actions.contact.href} variant="secondary">
                {lab.actions.contact.label}
              </Button>
            </div>
            <p className="relative mt-6 text-sm text-(--lab-text-3)">
              {lab.contact.emailLabel}{" "}
              <span className="text-(--lab-text-2)">{lab.contact.email}</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-(--lab-border) bg-(--lab-bg-alt)">
        <div className={cn(container, "grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
          <div>
            <p className="flex items-center gap-2.5 font-(family-name:--lab-font-display) text-[17px] font-semibold">
              <LabMark tile="#2563FF" glyph="#FFFFFF" radius={18} />
              {lab.brand.name}
            </p>
            <p className="mt-4 font-semibold text-(--lab-text)">{lab.brand.tagline}</p>
            <p className="mt-2 max-w-[34ch] text-sm text-(--lab-text-2)">{lab.footer.note}</p>
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
            "flex flex-col gap-3 border-t border-(--lab-border) py-6 text-sm text-(--lab-text-3) md:flex-row md:justify-between",
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
      <h2 className="text-sm font-semibold text-(--lab-text)">{title}</h2>
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
