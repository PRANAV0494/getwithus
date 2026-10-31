import Link from "next/link";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

/** Up to three published case studies. Renders nothing at all while there are none. */
export default function SelectedWork({ index }: { index?: string }) {
  const studies = getPublishedCaseStudies().slice(0, 3);
  if (studies.length === 0) return null;

  return (
    <Section aria-labelledby="selected-work-title">
      <Container>
        <SectionHeading
          id="selected-work-title"
          index={index}
          label="selected work"
          title={homePage.work.title}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href={homePage.work.link.href}
            className="text-signal transition-colors duration-150 ease-out hover:text-signal-2"
          >
            {homePage.work.link.label}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
