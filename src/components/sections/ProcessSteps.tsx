import { ArrowRight } from "lucide-react";
import Link from "next/link";
import GridSpotlight from "@/components/motion/GridSpotlight";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

type ProcessStepsProps = {
  title: string;
  link?: { label: string; href: string };
  /** The monospaced section index, for example "02". */
  index?: string;
  className?: string;
};

/** The four steps on a timeline that fills as the section scrolls in: numbered, because they are a sequence. */
export default function ProcessSteps({ title, link, index, className }: ProcessStepsProps) {
  return (
    <Section aria-labelledby="process-steps-title" className={cn("relative isolate", className)}>
      <GridSpotlight />
      <Container>
        <SectionHeading id="process-steps-title" index={index} label="process" title={title} />
        <div className="mt-12">
          <ProcessTimeline
            steps={processSteps.map((step) => ({ title: step.title, short: step.short }))}
          />
        </div>
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
