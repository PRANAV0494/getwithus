import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/layout/JsonLd";
import ClosingCta from "@/components/sections/ClosingCta";
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
          <article aria-labelledby="study-title" className="max-w-[72ch]">
            <p className="type-label text-signal">
              <span aria-hidden="true">&gt; </span>work
            </p>
            <h1 id="study-title" className="mt-5 type-display">
              {study.title}
            </h1>
            <dl className="mt-8 grid gap-2 border-y border-line py-4 type-small">
              {[
                { term: "client", value: clientLabel(study) },
                { term: "industry", value: study.industry },
                { term: "services", value: study.services.map(serviceName).join(", ") },
              ].map((row) => (
                <div key={row.term} className="grid grid-cols-[88px_1fr] gap-3">
                  <dt className="type-label leading-5 text-fog-3">{row.term}</dt>
                  <dd className="text-fog-2">{row.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[88px_1fr] gap-3">
                <dt className="type-label leading-5 text-fog-3">date</dt>
                <dd className="text-fog-2">
                  <time dateTime={study.date}>{formatDate(study.date)}</time>
                </dd>
              </div>
            </dl>
            <p className="mt-8 type-lead text-fog-2">{study.summary}</p>
            {sections.map((section, index) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-12">
                <p className="type-label text-fog-3">
                  {String(index + 1).padStart(2, "0")} / {section.id}
                </p>
                <h2 id={section.id} className="mt-2 type-h3">
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
                <dl className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="bg-ink-1 p-5">
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
                      className="rounded-tag border border-line bg-ink-2 px-2.5 py-1 font-mono text-[0.8125rem]"
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
                className="mt-12 border border-line"
              />
            ))}
          </article>
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
