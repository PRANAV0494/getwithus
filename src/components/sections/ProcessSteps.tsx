import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

type ProcessStepsProps = {
  title: string;
  link?: { label: string; href: string };
  /** On the home page this section starts the closing 3D station. */
  station?: "close";
  className?: string;
};

/** The four steps in compact form: numbered, because they are a sequence. */
export default function ProcessSteps({ title, link, station, className }: ProcessStepsProps) {
  return (
    <Section
      station={station}
      aria-labelledby="process-steps-title"
      className={cn("bg-ink", className)}
    >
      <Container>
        <div className="max-w-[560px]">
          <h2 id="process-steps-title" className="type-h2">
            {title}
          </h2>
          <ol className="mt-10 grid gap-7">
            {processSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[32px_1fr] items-start gap-4">
                <span aria-hidden="true" className="pt-0.5 font-semibold text-fog-2 tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 type-h4">{step.title}</h3>
                  <p className="text-fog-2">{step.short}</p>
                </div>
              </li>
            ))}
          </ol>
          {link ? (
            <p className="mt-8">
              <Link
                href={link.href}
                className="text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
              >
                {link.label}
              </Link>
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
