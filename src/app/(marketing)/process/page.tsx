import { Check, Code, FileText, RefreshCw, Rocket } from "lucide-react";
import type { CSSProperties } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import ProcessStepper from "@/components/motion/ProcessStepper";
import ClosingCta from "@/components/sections/ClosingCta";
import PageHero from "@/components/sections/PageHero";
import ModelStill from "@/components/three/ModelStill";
import WebGLModel from "@/components/three/WebGLModel";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";
import { isFilled } from "@/config/site";
import { processPage } from "@/content/pages";
import { processSteps, sampleWeek, workingTogether } from "@/content/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: processPage.title,
  description: processPage.description,
  path: processPage.path,
});

const ICONS = [FileText, Code, Rocket, RefreshCw];

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-[18px] bg-bg-soft p-5">
      <h4 className="text-sm font-bold text-ink">{title}</h4>
      <ul className="mt-3 grid gap-2.5">
        {items.filter(isFilled).map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.9375rem] text-body">
            <Check
              size={16}
              strokeWidth={2.6}
              className="mt-1 shrink-0 text-ok"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** /process: the four platforms model, the large stepper with every step's detail, a sample week, and how we work together. */
export default function ProcessPage() {
  const steps = processSteps.map((step, index) => {
    const StepIcon = ICONS[index] ?? FileText;
    return {
      title: step.title,
      icon: <StepIcon strokeWidth={1.6} />,
      detail: (
        <>
          <h3 className="type-h3 text-ink">{step.title}</h3>
          <p className="mt-2 text-body">{step.detail}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <List title={processPage.needFromYouTitle} items={step.needFromYou} />
            <List title={processPage.youGetTitle} items={step.youGet} />
          </div>
        </>
      ),
    };
  });

  return (
    <>
      <PageHero
        id="process-title"
        title={processPage.title}
        lead={processPage.lead}
        crumbs={[
          { name: "Home", path: "/" },
          { name: processPage.title, path: processPage.path },
        ]}
        actions={
          <MagneticButton>
            <Button href="/start" size="lg">
              Start a project
            </Button>
          </MagneticButton>
        }
        visual={<WebGLModel model="process-path" still={<ModelStill model="process-path" />} />}
      />
      <section
        aria-labelledby="steps-title"
        className="dots-bg border-b border-line bg-bg-soft py-20 md:py-24"
      >
        <Container>
          <SectionIntro
            id="steps-title"
            title="Four steps, the same every time"
            lead="Select a step for what happens, what we need from you, and what you get."
          />
          <ProcessStepper
            steps={steps}
            label={processPage.title}
            className="mt-14 [&_.stepper-detail]:max-w-[900px]"
          />
        </Container>
      </section>
      <section aria-labelledby="week-title" className="py-20 md:py-24">
        <Container>
          <SectionIntro
            id="week-title"
            title="A sample week"
            lead="Building happens in weekly increments, and every week ends with something you can open on your own phone."
          />
          <ol
            className="week-strip reveal mt-12 grid gap-3 md:grid-cols-5"
            style={{ "--n": sampleWeek.length } as CSSProperties}
          >
            {sampleWeek.map((day, index) => (
              <li
                key={day.day}
                style={{ "--i": index } as CSSProperties}
                className="week-day rounded-card border border-line bg-card p-5 shadow-soft data-[last]:border-accent"
                data-last={index === sampleWeek.length - 1 ? "" : undefined}
              >
                <p className="text-sm font-bold text-accent">{day.day}</p>
                <p className="mt-2 text-ink">{day.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section
        aria-labelledby="working-together-title"
        className="border-t border-line bg-bg-soft py-20 md:py-24"
      >
        <Container>
          <SectionIntro id="working-together-title" title={processPage.workingTogetherTitle} />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {workingTogether.map((item) => (
              <li
                key={item.title}
                className="rounded-card border border-line bg-card p-7 shadow-soft"
              >
                <h3 className="type-h4 text-ink">{item.title}</h3>
                <p className="mt-2 text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ClosingCta className="pt-20 md:pt-24" />
    </>
  );
}
