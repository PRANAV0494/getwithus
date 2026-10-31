import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  FileText,
  KeyRound,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { IBM_Plex_Sans } from "next/font/google";
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
 * Concept B, Minimal Corporate: white space, charcoal type, one royal blue. It
 * reads like a well-edited proposal: columns and dividers instead of cards,
 * and nothing moves unless the visitor asks it to.
 */

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lab-font-body",
  display: "swap",
});

const concept = conceptBySlug("minimal-corporate");
const container = "mx-auto w-full max-w-[1200px] px-6 md:px-10";
const heading = "font-semibold tracking-[-0.02em] text-balance text-(--lab-text)";
const whyIcons: readonly LucideIcon[] = [
  FileText,
  CalendarCheck,
  KeyRound,
  Users,
  ShieldCheck,
  Clock,
];

function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "inverse-outline";
  className?: string;
}) {
  const styles = {
    primary: "bg-(--lab-accent) text-(--lab-on-accent) hover:bg-(--lab-accent-hover)",
    secondary:
      "border border-(--lab-border-strong) text-(--lab-text) hover:border-(--lab-text) hover:bg-(--lab-bg-alt)",
    inverse: "bg-[#FFFFFF] text-(--lab-accent) hover:bg-[#EAF0FD]",
    "inverse-outline":
      "border border-[#FFFFFF]/50 text-[#FFFFFF] hover:border-[#FFFFFF] hover:bg-[#FFFFFF]/10",
  } as const;
  return (
    <Link
      href={href}
      className={cn(
        "lab-nudge inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium transition-colors duration-200",
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
    <div className="lab-reveal max-w-2xl">
      <p className="text-sm font-semibold text-(--lab-accent)">{label}</p>
      <h2 id={id} className={cn(heading, "mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15]")}>
        {title}
      </h2>
      {lead ? <p className="mt-4 text-[17px] leading-relaxed text-(--lab-text-2)">{lead}</p> : null}
    </div>
  );
}

export default function MinimalCorporate() {
  return (
    <LabPage
      concept={concept}
      fontClassName={cn(plex.variable, "font-(family-name:--lab-font-body)")}
      headerHeight={72}
    >
      <header className="sticky top-0 z-40 border-b border-(--lab-border) bg-[#FFFFFF]">
        <div className={cn(container, "flex h-[72px] items-center justify-between gap-6")}>
          <Link
            href="#top"
            className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em]"
          >
            <LabMark tile="#16191F" glyph="#FFFFFF" radius={12} />
            {lab.brand.name}
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ScrollSpyLinks
              links={lab.nav}
              className="flex items-center gap-8"
              linkClassName="lab-underline py-1 text-[15px] text-(--lab-text-2) hover:text-(--lab-text) aria-[current=true]:text-(--lab-accent)"
            />
          </nav>
          <div className="flex items-center gap-5">
            <Link
              href={lab.actions.contact.href}
              className="lab-underline hidden text-[15px] text-(--lab-text-2) hover:text-(--lab-text) md:inline"
            >
              Contact
            </Link>
            <Button href={lab.actions.start.href} className="hidden h-10 text-sm sm:inline-flex">
              {lab.actions.start.label}
            </Button>
            <div className="lg:hidden">
              <LabMobileMenu
                links={lab.nav}
                action={lab.actions.start}
                triggerClassName="rounded-md"
                actionClassName="rounded-md"
                linkClassName="font-semibold"
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
              "grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]",
            )}
          >
            <div>
              <p className="text-sm font-semibold text-(--lab-accent)">{lab.hero.eyebrow}</p>
              <h1
                id="hero-title"
                className={cn(
                  heading,
                  "mt-4 max-w-[18ch] text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.08]",
                )}
              >
                {lab.hero.title}
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-(--lab-text-2)">
                {lab.hero.lead}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={lab.actions.start.href}>{lab.actions.start.label}</Button>
                <Button href={lab.actions.process.href} variant="secondary">
                  {lab.actions.process.label}
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-(--lab-border) pt-6">
                {lab.intro.principles.map((principle) => (
                  <li
                    key={principle}
                    className="flex items-center gap-2 text-[15px] text-(--lab-text-2)"
                  >
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-(--lab-surface-2) text-(--lab-accent)">
                      <Icon icon={Check} size={16} />
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-(--lab-border) bg-[#FFFFFF] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_12px_32px_-16px_rgba(16,24,40,0.16)]">
              <p className="border-b border-(--lab-border) px-6 py-4 text-sm font-semibold text-(--lab-text-2)">
                Our practices
              </p>
              <ul className="divide-y divide-(--lab-border)">
                {lab.practices.map((practice) => (
                  <li key={practice.id}>
                    <Link
                      href="#practices"
                      className="lab-nudge group flex items-start gap-4 px-6 py-5 transition-colors duration-200 hover:bg-(--lab-bg-alt)"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--lab-surface-2) text-(--lab-accent)">
                        <PracticeIcon id={practice.id} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-(--lab-text)">
                          {practice.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-(--lab-text-2)">
                          {practice.summary}
                        </span>
                      </span>
                      <Icon
                        icon={ArrowRight}
                        size={16}
                        className="lab-arrow mt-1 text-(--lab-text-3) group-hover:text-(--lab-accent)"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="intro-title" className="bg-(--lab-bg-alt)">
          <div className={cn(container, "grid gap-10 py-20 md:grid-cols-2 md:py-24")}>
            <div className="lab-reveal">
              <p className="text-sm font-semibold text-(--lab-accent)">{lab.intro.label}</p>
              <h2
                id="intro-title"
                className={cn(heading, "mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15]")}
              >
                {lab.intro.title}
              </h2>
            </div>
            <div className="lab-reveal grid gap-4 text-[17px] leading-relaxed text-(--lab-text-2)">
              {lab.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section
          id="practices"
          aria-labelledby="practices-title"
          className={cn(container, "py-20 md:py-28")}
        >
          <SectionHeader id="practices-title" {...lab.practicesIntro} />
          <ul className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-(--lab-border)">
            {lab.practices.map((practice) => (
              <li key={practice.id} className="lab-reveal lg:px-10 lg:first:pl-0 lg:last:pr-0">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-(--lab-surface-2) text-(--lab-accent)">
                  <PracticeIcon id={practice.id} />
                </span>
                <h3 className={cn(heading, "mt-5 text-xl")}>{practice.name}</h3>
                <p className="mt-3 leading-relaxed text-(--lab-text-2)">{practice.detail}</p>
                <ul className="mt-6 border-t border-(--lab-border)">
                  {practice.services.map((service) => (
                    <li
                      key={service.name}
                      className="border-b border-(--lab-border) py-3 text-[15px] text-(--lab-text)"
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" aria-labelledby="services-title" className="bg-(--lab-bg-alt)">
          <div className={cn(container, "py-20 md:py-28")}>
            <SectionHeader id="services-title" {...lab.servicesIntro} />
            <div className="mt-14 grid gap-14">
              {lab.practices.map((practice) => (
                <div
                  key={practice.id}
                  className="lab-reveal grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-12"
                >
                  <div>
                    <h3 className={cn(heading, "text-lg")}>{practice.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--lab-text-2)">
                      {practice.summary}
                    </p>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {practice.services.map((service) => (
                      <li
                        key={service.name}
                        className="rounded-lg border border-(--lab-border) bg-[#FFFFFF] p-5 transition-[border-color,box-shadow] duration-200 hover:border-(--lab-accent) hover:shadow-[0_8px_24px_-16px_rgba(30,79,216,0.45)]"
                      >
                        <h4 className="font-semibold text-(--lab-text)">{service.name}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-(--lab-text-2)">
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

        <section id="why" aria-labelledby="why-title" className={cn(container, "py-20 md:py-28")}>
          <SectionHeader id="why-title" {...lab.whyIntro} />
          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {lab.why.map((point, index) => (
              <li key={point.title} className="lab-reveal">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-(--lab-surface-2) text-(--lab-accent)">
                  <Icon icon={whyIcons[index] ?? Check} size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-(--lab-text-2)">{point.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="process" aria-labelledby="process-title" className="bg-(--lab-bg-alt)">
          <div className={cn(container, "py-20 md:py-28")}>
            <SectionHeader id="process-title" {...lab.processIntro} />
            <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {lab.process.map((step, index) => (
                <li key={step.title} className="lab-reveal border-t-2 border-(--lab-text) pt-5">
                  <span className="text-sm font-semibold text-(--lab-accent) tabular-nums">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-(--lab-text-2)">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className={cn(container, "py-20 md:py-28")}>
          <SectionHeader
            id="work-title"
            label={lab.workIntro.label}
            title={lab.workIntro.title}
            lead={lab.workIntro.lead}
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {lab.work.map((project) => (
              <li
                key={project.id}
                className="lab-reveal group grid overflow-hidden rounded-xl border border-(--lab-border) transition-[border-color,box-shadow] duration-200 hover:border-(--lab-border-strong) hover:shadow-[0_12px_32px_-20px_rgba(16,24,40,0.35)] sm:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="flex items-center bg-(--lab-bg-alt) p-6 [--art-fill:#F5F6F8] [--art-line:#CDD2DA] [--art-panel:#FFFFFF]">
                  <ProjectArt
                    kind={project.kind}
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="inline-flex rounded-full bg-(--lab-surface-2) px-2.5 py-1 text-xs font-medium text-(--lab-accent)">
                    {lab.workIntro.badge}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">
                    {project.summary}
                  </p>
                  <p className="mt-4 text-sm text-(--lab-text-3)">{project.tags.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="bg-(--lab-accent)">
          <div
            className={cn(
              container,
              "grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr]",
            )}
          >
            <div className="lab-reveal">
              <h2
                id="contact-title"
                className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-[#FFFFFF]"
              >
                {lab.contact.title}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[#FFFFFF]/90">
                {lab.contact.body}
              </p>
            </div>
            <div className="lab-reveal flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href={lab.actions.start.href} variant="inverse">
                {lab.actions.start.label}
              </Button>
              <Button href={lab.actions.contact.href} variant="inverse-outline">
                {lab.actions.contact.label}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-(--lab-text) text-[#A9AFBA]">
        <div className={cn(container, "grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
          <div>
            <p className="flex items-center gap-2.5 text-[17px] font-semibold text-[#FFFFFF]">
              <LabMark tile="#FFFFFF" glyph="#16191F" radius={12} />
              {lab.brand.name}
            </p>
            <p className="mt-4 font-medium text-[#FFFFFF]">{lab.brand.tagline}</p>
            <p className="mt-2 max-w-[34ch] text-sm">{lab.footer.note}</p>
            <p className="mt-4 text-sm">
              {lab.contact.emailLabel} <span className="text-[#FFFFFF]">{lab.contact.email}</span>
            </p>
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
            "flex flex-col gap-3 border-t border-[#FFFFFF]/10 py-6 text-sm md:flex-row md:justify-between",
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
      <h2 className="text-sm font-semibold text-[#FFFFFF]">{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="lab-underline text-sm hover:text-[#FFFFFF]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
