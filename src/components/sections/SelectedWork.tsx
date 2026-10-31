import Link from "next/link";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { homePage } from "@/content/pages";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

/** Up to three published case studies. Renders nothing at all while there are none. */
export default function SelectedWork() {
  const studies = getPublishedCaseStudies().slice(0, 3);
  if (studies.length === 0) return null;

  return (
    <Section aria-labelledby="selected-work-title" className="bg-ink pt-0 md:pt-0">
      <Container>
        <h2 id="selected-work-title" className="type-h2">
          {homePage.work.title}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href={homePage.work.link.href}
            className="text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
          >
            {homePage.work.link.label}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
