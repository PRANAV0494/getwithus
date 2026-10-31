import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

type ProcessStepsProps = {
  title: string;
  link?: { label: string; href: string };
  /** The monospaced section index, for example "02". */
  index?: string;
  className?: string;
};

/** The four steps as a pipeline: numbered, because they are a sequence. */
export default function ProcessSteps({ title, link, index, className }: ProcessStepsProps) {
  return (
    <Section aria-labelledby="process-steps-title" className={className}>
      <Container>
        <SectionHeading id="process-steps-title" index={index} label="process" title={title} />
        <ol className="mt-12 grid lg:grid-cols-4">
          {processSteps.map((step, position) => (
            <li
              key={step.title}
              className="reveal relative border-l border-line-strong pb-9 pl-6 last:pb-0 lg:border-t lg:border-l-0 lg:pt-6 lg:pr-6 lg:pb-0 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 -left-[5px] size-[9px] rotate-45 border border-signal bg-ink lg:-top-[5px] lg:left-0"
              />
              <p className="type-label text-signal">step_{String(position + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 type-h4">
                <span className="sr-only">Step {position + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-fog-2">{step.short}</p>
            </li>
          ))}
        </ol>
        {link ? (
          <p className="mt-10">
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 font-medium text-signal transition-colors duration-150 ease-out hover:text-signal-2"
            >
              {link.label}
              <Icon icon={ArrowRight} size={16} />
            </Link>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
