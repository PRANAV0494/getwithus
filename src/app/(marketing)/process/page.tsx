import ClosingCta from "@/components/sections/ClosingCta";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { processPage } from "@/content/pages";
import { processSteps, workingTogether } from "@/content/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: processPage.title,
  description: processPage.description,
  path: processPage.path,
});

function StepList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-3 text-fog before:size-1 before:shrink-0 before:-translate-y-[3px] before:rounded-full before:bg-fog-3 before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProcessPage() {
  return (
    <>
      <Section aria-labelledby="process-title" className="pb-0 md:pb-0">
        <Container>
          <h1 id="process-title" className="type-display">
            {processPage.title}
          </h1>
          <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{processPage.lead}</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <ol className="grid gap-16">
            {processSteps.map((step, index) => {
              const id = `step-${index + 1}`;
              return (
                <li key={step.title}>
                  <section aria-labelledby={id} className="grid max-w-[68ch] gap-4">
                    <h2 id={id} className="type-h2">
                      <span className="mr-3 text-fog-2 tabular-nums" aria-hidden="true">
                        {index + 1}
                      </span>
                      {step.title}
                    </h2>
                    <p className="text-fog-2">{step.detail}</p>
                    <div className="mt-2 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="type-h4">{processPage.needFromYouTitle}</h3>
                        <StepList items={step.needFromYou} />
                      </div>
                      <div>
                        <h3 className="type-h4">{processPage.youGetTitle}</h3>
                        <StepList items={step.youGet} />
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
          <div className="grid max-w-[68ch] gap-4">
            <h2 id="working-together-title" className="type-h2">
              {processPage.workingTogetherTitle}
            </h2>
            {workingTogether.map((item) => (
              <p key={item.title} className="text-fog-2">
                <strong className="font-semibold text-fog">{item.title}.</strong> {item.text}
              </p>
            ))}
          </div>
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
