import { ArrowRight, Code, FileText, RefreshCw, Rocket } from "lucide-react";
import Link from "next/link";
import ProcessStepper from "@/components/motion/ProcessStepper";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SectionIntro from "@/components/ui/SectionIntro";
import { isFilled } from "@/config/site";
import { home } from "@/content/home";
import { homePage } from "@/content/pages";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

const ICONS = [FileText, Code, Rocket, RefreshCw];

/**
 * "How a project runs" on the home page and /services: the four steps as the
 * stepper, each detail card showing the short description and what you get,
 * and a link to /process.
 */
export default function ProcessSection({
  title = homePage.process.title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const steps = processSteps.map((step, index) => {
    const StepIcon = ICONS[index] ?? FileText;
    const youGet = step.youGet.filter(isFilled);
    return {
      title: step.title,
      icon: <StepIcon strokeWidth={1.6} />,
      detail: (
        <>
          <h3 className="type-h3 text-ink">{step.title}</h3>
          <p className="mt-2 text-body">{step.short}</p>
          {youGet.length ? (
            <p className="mt-3.5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[14px] bg-accent-soft px-3.5 py-2 text-[0.875rem] text-ink">
              <span className="font-bold">{home.process.youGet}:</span>
              {youGet.join(", ")}
            </p>
          ) : null}
        </>
      ),
    };
  });

  return (
    <section
      aria-labelledby="process-title"
      className={cn("dots-bg border-y border-line bg-bg-soft py-20 md:py-[120px]", className)}
    >
      <Container>
        <SectionIntro id="process-title" title={title} lead={home.process.lead} />
        <ProcessStepper steps={steps} label={title} className="mt-16" />
        <p className="mt-10 text-center">
          <Link
            href={homePage.process.link.href}
            className="group inline-flex items-center gap-1.5 font-semibold text-accent"
          >
            {homePage.process.link.label}
            <Icon
              icon={ArrowRight}
              size={16}
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </Link>
        </p>
      </Container>
    </section>
  );
}
