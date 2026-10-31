import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import LabPage from "@/components/design-lab/LabPage";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
import { systemFonts } from "@/components/design-lab/hybrid/fonts";
import PracticeCard from "@/components/design-lab/hybrid/PracticeCard";
import SectionHeading from "@/components/design-lab/hybrid/SectionHeading";
import SystemButton from "@/components/design-lab/hybrid/SystemButton";
import SystemFooter from "@/components/design-lab/hybrid/SystemFooter";
import SystemHeader from "@/components/design-lab/hybrid/SystemHeader";
import SystemSection from "@/components/design-lab/hybrid/SystemSection";
import { container, navyTone, serif } from "@/components/design-lab/hybrid/tones";
import WorkCard from "@/components/design-lab/hybrid/WorkCard";
import { lab } from "@/content/design-lab/content";
import { systemPage } from "@/content/design-lab/hybrid-system";
import { cn } from "@/lib/cn";

/*
 * The refined homepage: Hybrid Premium (E) for voice and credibility, with the
 * clarity and restraint of Minimal Corporate (B). Built only from the design
 * system in src/components/design-lab/system and src/content/design-lab/system.ts.
 */

export default function HybridFinal() {
  return (
    <LabPage concept={systemPage} fontClassName={systemFonts} headerHeight={72}>
      <SystemHeader brand={lab.brand.name} links={lab.nav} action={lab.actions.start} />

      <main id="content" tabIndex={-1} className="outline-none">
        <section
          id="top"
          aria-labelledby="hero-title"
          className={cn(navyTone, "relative overflow-hidden")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#22305C55_1px,transparent_1px)] bg-size-[calc(100%/6)_100%]"
          />
          <div className={cn(container, "relative pt-16 pb-8 md:pt-24")}>
            <p className="text-sm font-medium text-(--lab-accent-text)">{lab.hero.eyebrow}</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <h1
                id="hero-title"
                className={cn(serif, "text-[clamp(2.75rem,5.6vw,4.75rem)] leading-none")}
              >
                {lab.hero.title}
              </h1>
              <div>
                <p className="max-w-[56ch] text-[17px] leading-relaxed text-(--lab-text-2) md:text-lg">
                  {lab.hero.lead}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <SystemButton href={lab.actions.start.href} variant="inverse">
                    {lab.actions.start.label}
                  </SystemButton>
                  <SystemButton
                    href={lab.actions.process.href}
                    variant="text"
                    className="self-center sm:self-auto"
                  >
                    {lab.actions.process.label}
                  </SystemButton>
                </div>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                  {lab.intro.principles.map((principle) => (
                    <li
                      key={principle}
                      className="flex items-center gap-2 text-sm text-(--lab-text-2)"
                    >
                      <Icon icon={Check} size={16} className="text-(--lab-accent-text)" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ul className="mt-16 grid border-t border-(--lab-border) lg:grid-cols-3">
              {lab.practices.map((practice) => (
                <li
                  key={practice.id}
                  className="border-b border-(--lab-border) last:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
                >
                  <Link
                    href={`#services-${practice.id}`}
                    className="lab-nudge group flex min-h-12 items-start gap-4 py-6 lg:px-6 lg:first:pl-0"
                  >
                    <PracticeIcon id={practice.id} className="mt-1.5 text-(--lab-accent-text)" />
                    <span className="flex-1">
                      <span className={cn(serif, "block text-[1.625rem] leading-tight")}>
                        {practice.name}
                      </span>
                      <span className="mt-1 block text-sm text-(--lab-text-2)">
                        {practice.summary}
                      </span>
                    </span>
                    <Icon
                      icon={ArrowUpRight}
                      size={20}
                      className="lab-arrow mt-1.5 text-(--lab-accent-text)"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SystemSection labelledBy="intro-title">
          <div className="lab-reveal grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
            <p className="text-sm font-medium text-(--lab-text-2)">{lab.intro.label}</p>
            <div className="max-w-4xl">
              <h2
                id="intro-title"
                className={cn(serif, "text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.04]")}
              >
                {lab.intro.title}
              </h2>
              <div className="mt-6 grid gap-6 text-[17px] leading-relaxed text-(--lab-text-2) md:grid-cols-2">
                {lab.intro.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </SystemSection>

        <SystemSection id="practices" labelledBy="practices-title" tone="white">
          <SectionHeading id="practices-title" {...lab.practicesIntro} />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {lab.practices.map((practice) => (
              <li key={practice.id}>
                <PracticeCard practice={practice} />
              </li>
            ))}
          </ul>
          <div className="lab-reveal mt-10 flex flex-col gap-4 rounded-xl border border-(--lab-border) bg-(--lab-bg) p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="text-[17px]">
              <span className="font-medium">Not sure which practice you need?</span>{" "}
              <span className="text-(--lab-text-2)">
                Describe the problem and we will propose a plan.
              </span>
            </p>
            <SystemButton href={lab.actions.start.href}>{lab.actions.start.label}</SystemButton>
          </div>
        </SystemSection>

        <SystemSection id="services" labelledBy="services-title">
          <SectionHeading id="services-title" {...lab.servicesIntro} />
          <div className="mt-12 grid gap-10">
            {lab.practices.map((practice) => (
              <div
                key={practice.id}
                id={`services-${practice.id}`}
                className="lab-reveal grid scroll-mt-28 gap-4 border-t border-(--lab-border) pt-8 md:grid-cols-[200px_1fr] md:gap-10"
              >
                <h3 className={cn(serif, "text-[1.75rem] leading-tight")}>{practice.name}</h3>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {practice.services.map((service) => (
                    <li key={service.name} className="group border-b border-(--lab-border) py-5">
                      <h4 className="flex items-start justify-between gap-3 font-semibold">
                        {service.name}
                        <Icon
                          icon={ArrowRight}
                          size={16}
                          className="mt-1 -translate-x-1 text-(--lab-accent) opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
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
        </SystemSection>

        <SystemSection id="why" labelledBy="why-title" tone="navy">
          <SectionHeading id="why-title" {...lab.whyIntro} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2 lg:grid-cols-3">
            {lab.why.map((point) => (
              <li key={point.title} className="lab-reveal bg-(--lab-bg) p-7 md:p-8">
                <Icon icon={Check} size={20} className="text-(--lab-accent-text)" />
                <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-(--lab-text-2)">{point.body}</p>
              </li>
            ))}
          </ul>
        </SystemSection>

        <SystemSection id="process" labelledBy="process-title">
          <SectionHeading id="process-title" {...lab.processIntro} />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {lab.process.map((step, index) => (
              <li
                key={step.title}
                className="lab-reveal border-t border-(--lab-border-strong) pt-5"
              >
                <span
                  aria-hidden="true"
                  className={cn(serif, "block text-[2.75rem] leading-none text-(--lab-accent)")}
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">{step.body}</p>
              </li>
            ))}
          </ol>
        </SystemSection>

        <SystemSection id="work" labelledBy="work-title" tone="white">
          <SectionHeading
            id="work-title"
            label={lab.workIntro.label}
            title={lab.workIntro.title}
            lead={lab.workIntro.lead}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-6">
            {lab.work.map((project, index) => {
              const wide = index === 0 || index === 3;
              return (
                <li key={project.id} className={wide ? "md:col-span-4" : "md:col-span-2"}>
                  <WorkCard project={project} badge={lab.workIntro.badge} wide={wide} />
                </li>
              );
            })}
          </ul>
        </SystemSection>

        <SystemSection
          id="contact"
          labelledBy="contact-title"
          tone="navy"
          className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end"
        >
          <h2
            id="contact-title"
            className={cn(serif, "lab-reveal text-[clamp(2.5rem,5vw,4.25rem)] leading-none")}
          >
            {lab.contact.title}
          </h2>
          <div className="lab-reveal">
            <p className="text-[17px] leading-relaxed text-(--lab-text-2)">{lab.contact.body}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <SystemButton href={lab.actions.start.href} variant="inverse">
                {lab.actions.start.label}
              </SystemButton>
              <SystemButton
                href={lab.actions.contact.href}
                variant="text"
                className="self-center sm:self-auto"
              >
                {lab.actions.contact.label}
              </SystemButton>
            </div>
            <p className="mt-6 text-sm text-(--lab-text-2)">
              {lab.contact.emailLabel}{" "}
              <span className="text-(--lab-text)">{lab.contact.email}</span>
            </p>
          </div>
        </SystemSection>
      </main>

      <SystemFooter letter="E" name="Hybrid Premium refined (alternative)" />
    </LabPage>
  );
}
