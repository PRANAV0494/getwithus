import ClosingCta from "@/components/sections/ClosingCta";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processPage } from "@/content/pages";
import { processSteps, workingTogether } from "@/content/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: processPage.title,
  description: processPage.description,
  path: processPage.path,
});

const pad = (index: number) => String(index + 1).padStart(2, "0");

function StepList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-fog">
          <span aria-hidden="true" className="font-mono text-signal">
            +
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        id="process-title"
        label="process"
        title={processPage.title}
        lead={processPage.lead}
      />
      <Section>
        <Container>
          <ol className="grid gap-14">
            {processSteps.map((step, index) => {
              const id = `step-${index + 1}`;
              return (
                <li key={step.title}>
                  <section
                    aria-labelledby={id}
                    className="reveal grid gap-3 border-t border-line pt-8 md:grid-cols-[200px_1fr] md:gap-6 [li:first-child>&]:border-t-0 [li:first-child>&]:pt-0"
                  >
                    <p className="flex items-center gap-3 pt-1 type-label text-signal md:items-start">
                      <span
                        aria-hidden="true"
                        className="size-2.5 rotate-45 border border-signal bg-ink md:mt-1"
                      />
                      step_{pad(index)}
                    </p>
                    <div className="grid max-w-[72ch] gap-4">
                      <h2 id={id} className="type-h2">
                        <span className="sr-only">Step {index + 1}: </span>
                        {step.title}
                      </h2>
                      <p className="text-fog-2">{step.detail}</p>
                      <div className="mt-2 grid gap-px border border-line bg-line sm:grid-cols-2">
                        <div className="bg-ink-1 p-5">
                          <h3 className="type-label text-fog-3">{processPage.needFromYouTitle}</h3>
                          <StepList items={step.needFromYou} />
                        </div>
                        <div className="bg-ink-1 p-5">
                          <h3 className="type-label text-fog-3">{processPage.youGetTitle}</h3>
                          <StepList items={step.youGet} />
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>
      <Section aria-labelledby="working-together-title" className="pt-0 md:pt-0">
        <Container>
          <SectionHeading
            id="working-together-title"
            label="working together"
            title={processPage.workingTogetherTitle}
          />
          <dl className="mt-10 grid gap-px border border-line bg-line md:ml-[224px] lg:grid-cols-3">
            {workingTogether.map((item) => (
              <div key={item.title} className="reveal bg-ink p-6">
                <dt className="type-h4">{item.title}</dt>
                <dd className="mt-2 text-fog-2">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
