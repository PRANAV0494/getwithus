import { Inbox } from "lucide-react";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { workPage } from "@/content/pages";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: workPage.title,
  description: workPage.description,
  path: workPage.path,
});

export default function WorkPage() {
  const studies = getPublishedCaseStudies();
  return (
    <Section aria-labelledby="work-title">
      <Container>
        <h1 id="work-title" className="type-display">
          {workPage.title}
        </h1>
        <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{workPage.lead}</p>
        <div className="mt-12">
          {studies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Inbox}
              title={workPage.emptyTitle}
              action={
                <Button href={workPage.emptyAction.href}>{workPage.emptyAction.label}</Button>
              }
            >
              {workPage.emptyText}
            </EmptyState>
          )}
        </div>
      </Container>
    </Section>
  );
}
