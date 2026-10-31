import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/layout/JsonLd";
import ClosingCta from "@/components/sections/ClosingCta";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { workPage } from "@/content/pages";
import { serviceName } from "@/content/services/catalog";
import {
  caseStudyParams,
  findPublishedCaseStudy,
} from "@/features/case-studies/getPublishedCaseStudies";
import { clientLabel } from "@/features/case-studies/labels";
import { formatDate } from "@/lib/dates";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudyParams();
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = findPublishedCaseStudy((await params).slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    ownImage: true,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = findPublishedCaseStudy((await params).slug);
  if (!study) notFound();

  const sections = [
    { id: "problem", title: "The problem", text: study.problem },
    { id: "work", title: "The work", text: study.work },
    { id: "outcome", title: "The outcome", text: study.outcome },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: workPage.title, path: workPage.path },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      <Section>
        <Container>
          <article aria-labelledby="study-title" className="max-w-[68ch]">
            <h1 id="study-title" className="type-display">
              {study.title}
            </h1>
            <p className="mt-4 text-fog-2">
              {clientLabel(study)}, {study.industry},{" "}
              <time dateTime={study.date}>{formatDate(study.date)}</time>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services">
              {study.services.map((slug) => (
                <li key={slug}>
                  <Badge>{serviceName(slug)}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-8 type-lead text-fog-2">{study.summary}</p>
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-12">
                <h2 id={section.id} className="type-h3">
                  {section.title}
                </h2>
                <p className="mt-4 text-fog-2">{section.text}</p>
              </section>
            ))}
            {study.metricsApproved && study.metrics.length > 0 ? (
              <section aria-labelledby="results" className="mt-12">
                <h2 id="results" className="type-h3">
                  Results
                </h2>
                <dl className="mt-4 grid gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="border-l-2 border-line pl-5">
                      <dt className="text-fog-2">{metric.label}</dt>
                      <dd className="type-h4 text-fog">{metric.value}</dd>
                      <dd className="type-small text-fog-2">Source: {metric.source}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            {study.stack.length > 0 ? (
              <section aria-labelledby="stack" className="mt-12">
                <h2 id="stack" className="type-h3">
                  Stack
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-tag border border-line bg-ink-2 px-2.5 py-1 type-small"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {study.images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 68ch, 100vw"
                className="mt-12 rounded-card border border-line"
              />
            ))}
          </article>
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
