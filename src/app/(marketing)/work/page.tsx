import { Inbox } from "lucide-react";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import PageHeader from "@/components/sections/PageHeader";
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
    <>
      <PageHeader id="work-title" label="work" title={workPage.title} lead={workPage.lead} />
      <Section>
        <Container>
          {studies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </Container>
      </Section>
    </>
  );
}
