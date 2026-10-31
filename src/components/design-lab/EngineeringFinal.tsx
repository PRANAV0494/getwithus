import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import LabPage from "@/components/design-lab/LabPage";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
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
import { engineeringPage } from "@/content/design-lab/engineering-system";
import { cn } from "@/lib/cn";

/*
 * The final homepage: Modern Engineering (concept D), refined. Built only from
 * the engineering design system in src/components/design-lab/engineering and
 * src/content/design-lab/engineering-system.ts.
 */

export default function EngineeringFinal() {
  return (
    <LabPage
      concept={engineeringPage}
      fontClassName={engineeringFonts}
      headerHeight={64}
      className="isolate"
    >
      <GridBackdrop />
      <EngHeader brand={lab.brand.name} links={lab.nav} action={lab.actions.start} />

      <main id="content" tabIndex={-1} className="outline-none">
        <section id="top" aria-labelledby="hero-title" className="border-b border-(--lab-border)">
          <div
            className={cn(
              container,
              "grid items-center gap-12 pt-14 pb-12 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]",
            )}
          >
            <div>
              <p className="font-(family-name:--lab-font-mono) text-[13px] text-(--lab-accent)">
                &gt; {lab.hero.eyebrow}
              </p>
              <h1
                id="hero-title"
                className={cn(heading, "mt-5 text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.04]")}
              >
                {lab.hero.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-(--lab-text-2) md:text-lg">
                {lab.hero.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EngButton href={lab.actions.start.href}>{lab.actions.start.label}</EngButton>
                <EngButton href={lab.actions.process.href} variant="secondary">
                  {lab.actions.process.label}
                </EngButton>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-(--lab-border) pt-6">
                {lab.intro.principles.map((principle) => (
                  <li
                    key={principle}
                    className="flex items-center gap-2 text-sm text-(--lab-text-2)"
                  >
                    <Icon icon={Check} size={16} className="text-(--lab-accent)" />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <SystemDiagram className="hidden sm:block" />
          </div>
          <div className={container}>
            <ul className="grid border-t border-(--lab-border) lg:grid-cols-3">
              {lab.practices.map((practice, index) => (
                <li
                  key={practice.id}
                  className="border-b border-(--lab-border) last:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
                >
                  <Link
                    href={`#services-${practice.id}`}
                    className="lab-nudge group flex min-h-12 items-start gap-4 py-5 lg:px-6 lg:first:pl-0"
                  >
                    <PracticeIcon id={practice.id} className="mt-0.5 text-(--lab-accent)" />
                    <span className="flex-1">
                      <span className={cn(mono, "block text-[11px] text-(--lab-text-3)")}>
                        practice_{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block font-semibold [font-stretch:92%]">
                        {practice.name}
                      </span>
                      <span className="mt-1 block text-sm text-(--lab-text-2)">
                        {practice.summary}
                      </span>
                    </span>
                    <Icon
                      icon={ArrowUpRight}
                      size={20}
                      className="lab-arrow mt-0.5 text-(--lab-text-3) group-hover:text-(--lab-accent)"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EngSection labelledBy="intro-title">
          <EngSectionHeading id="intro-title" index="00" label="about" title={lab.intro.title} />
          <div className="lab-reveal mt-8 grid gap-6 md:grid-cols-[200px_1fr]">
            <span aria-hidden="true" />
            <div className="grid max-w-3xl gap-6 text-[17px] leading-relaxed text-(--lab-text-2) md:grid-cols-2">
              {lab.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </EngSection>

        <EngSection id="practices" labelledBy="practices-title" tone="raised">
          <EngSectionHeading
            id="practices-title"
            index="01"
            label="practices"
            title={lab.practicesIntro.title}
            lead={lab.practicesIntro.lead}
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {lab.practices.map((practice, index) => (
              <li key={practice.id}>
                <EngPracticeCard practice={practice} index={index} />
              </li>
            ))}
          </ul>
          <div className="lab-reveal group relative mt-8 flex flex-col gap-4 border border-(--lab-border) bg-(--lab-surface) p-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <Brackets />
            <p className="text-[17px]">
              <span className="font-semibold">Not sure which practice you need?</span>{" "}
              <span className="text-(--lab-text-2)">
                Describe the problem and we will propose a plan.
              </span>
            </p>
            <EngButton href={lab.actions.start.href}>{lab.actions.start.label}</EngButton>
          </div>
        </EngSection>

        <EngSection id="services" labelledBy="services-title">
          <EngSectionHeading
            id="services-title"
            index="02"
            label="services"
            title={lab.servicesIntro.title}
            lead={lab.servicesIntro.lead}
          />
          <div className="mt-12 grid gap-12 md:ml-[224px]">
            {lab.practices.map((practice) => (
              <div
                key={practice.id}
                id={`services-${practice.id}`}
                className="lab-reveal scroll-mt-24"
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-(--lab-border) pb-3">
                  <h3 className={cn(heading, "text-xl")}>{practice.name}</h3>
                  <p className={cn(mono, "text-xs text-(--lab-text-3)")}>
                    {String(practice.services.length).padStart(2, "0")} services
                  </p>
                </div>
                <ul className="mt-4 grid gap-px border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2">
                  {practice.services.map((service) => (
                    <li
                      key={service.name}
                      className="relative bg-(--lab-surface) p-5 transition-colors duration-200 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-(--lab-accent) before:transition-transform before:duration-200 hover:bg-(--lab-surface-2) hover:before:scale-y-100"
                    >
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-(--lab-text-2)">
                        {service.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </EngSection>

        <EngSection id="why" labelledBy="why-title" tone="raised">
          <EngSectionHeading
            id="why-title"
            index="03"
            label="why getwithus"
            title={lab.whyIntro.title}
            lead={lab.whyIntro.lead}
          />
          <ul className="mt-12 grid gap-px border border-(--lab-border) bg-(--lab-border) sm:grid-cols-2 lg:grid-cols-3">
            {lab.why.map((point, index) => (
              <li key={point.title} className="lab-reveal bg-(--lab-bg) p-6 md:p-7">
                <p className={cn(mono, "text-[11px] text-(--lab-accent)")}>
                  commit_{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-(--lab-text-2)">{point.body}</p>
              </li>
            ))}
          </ul>
        </EngSection>

        <EngSection id="process" labelledBy="process-title">
          <EngSectionHeading
            id="process-title"
            index="04"
            label="process"
            title={lab.processIntro.title}
            lead={lab.processIntro.lead}
          />
          <ol className="mt-12 grid lg:grid-cols-6">
            {lab.process.map((step, index) => (
              <li
                key={step.title}
                className="lab-reveal relative border-l border-(--lab-border-strong) pb-9 pl-6 last:pb-0 lg:border-t lg:border-l-0 lg:pt-6 lg:pr-5 lg:pb-0 lg:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[5px] size-[9px] rotate-45 border border-(--lab-accent) bg-(--lab-bg) lg:-top-[5px] lg:left-0"
                />
                <p className={cn(mono, "text-[11px] text-(--lab-accent)")}>
                  step_{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">{step.body}</p>
              </li>
            ))}
          </ol>
        </EngSection>

        <EngSection id="work" labelledBy="work-title" tone="raised">
          <EngSectionHeading
            id="work-title"
            index="05"
            label="selected work"
            title={lab.workIntro.title}
            lead={lab.workIntro.lead}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {lab.work.map((project) => (
              <li key={project.id}>
                <EngWorkCard project={project} badge={lab.workIntro.badge} />
              </li>
            ))}
          </ul>
        </EngSection>

        <EngSection id="contact" labelledBy="contact-title">
          <div className="lab-reveal group relative border border-(--lab-border-strong) bg-(--lab-surface) px-6 py-12 md:px-12 md:py-14">
            <Brackets always />
            <p className={cn(mono, "text-xs text-(--lab-text-3)")}>06 / next step</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <h2
                id="contact-title"
                className={cn(
                  heading,
                  "max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.06]",
                )}
              >
                {lab.contact.title}
              </h2>
              <div>
                <p className="text-[17px] leading-relaxed text-(--lab-text-2)">
                  {lab.contact.body}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <EngButton href={lab.actions.start.href}>{lab.actions.start.label}</EngButton>
                  <EngButton href={lab.actions.contact.href} variant="secondary">
                    {lab.actions.contact.label}
                  </EngButton>
                </div>
                <p className="mt-5 text-sm text-(--lab-text-3)">
                  {lab.contact.emailLabel}{" "}
                  <span className="text-(--lab-text-2)">{lab.contact.email}</span>
                </p>
              </div>
            </div>
          </div>
        </EngSection>
      </main>

      <EngFooter letter="D" name="Modern Engineering, final" />
    </LabPage>
  );
}
