import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import JsonLd from "@/components/layout/JsonLd";
import ClosingCta from "@/components/sections/ClosingCta";
import StationObject from "@/components/three/StationObject";
import Accordion from "@/components/ui/Accordion";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import type { ServicePage } from "@/content/types";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/json-ld";

type BlockSpec = { id: string; label: string; title: string; body: ReactNode };

/** One part of the page: the monospaced index in its own column from 768 px, then the heading and body. */
function Block({ index, block }: { index: number; block: BlockSpec }) {
  return (
    <section
      aria-labelledby={block.id}
      className="reveal grid gap-3 border-t border-line pt-8 first:border-t-0 first:pt-0 md:grid-cols-[200px_1fr] md:gap-6"
    >
      <p className="pt-1 type-label text-muted">
        {String(index + 1).padStart(2, "0")} / {block.label}
      </p>
      <div className="min-w-0">
        <h2 id={block.id} className="type-h3">
          {block.title}
        </h2>
        <div className="mt-5">{block.body}</div>
      </div>
    </section>
  );
}

/** A specification list: one ruled row per item with a monospaced prefix. */
function SpecList({
  items,
  prefix,
}: {
  items: readonly string[];
  prefix: (index: number) => string;
}) {
  return (
    <ul className="max-w-[72ch] border-t border-line">
      {items.map((item, index) => (
        <li
          key={item}
          className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-b border-line py-3"
        >
          <span aria-hidden="true" className="type-label text-accent">
            {prefix(index)}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The shared layout of every service page: breadcrumb, heading, lead, products,
 * and the station panel, then What you get, How we work on this, Tools we use,
 * How it is priced, Questions, and the closing call to action, each with a
 * monospaced index. Content comes from src/content/services.
 */
export default function ServicePageLayout({ page }: { page: ServicePage }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    ...(page.parent ? [{ name: page.parent.name, path: page.parent.href }] : []),
    { name: page.name, path: page.href },
  ];

  const note: BlockSpec | null = page.note
    ? {
        id: "note",
        label: "note",
        title: page.note.title,
        body: <p className="max-w-[68ch] text-body">{page.note.body}</p>,
      }
    : null;

  const blocks: BlockSpec[] = [
    {
      id: "what-you-get",
      label: "scope",
      title: "What you get",
      body: <SpecList items={page.whatYouGet} prefix={() => "+"} />,
    },
    ...(note && page.note?.placement === "afterWhatYouGet" ? [note] : []),
    {
      id: "how-we-work",
      label: "process",
      title: "How we work on this",
      body: (
        <ol className="max-w-[72ch] border-t border-line">
          {page.howWeWork.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-b border-line py-3"
            >
              <span aria-hidden="true" className="type-label text-accent">
                step_{pad(index)}
              </span>
              {step}
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "tools",
      label: "stack",
      title: "Tools we use",
      body: (
        <ul className="flex max-w-[72ch] flex-wrap gap-2">
          {page.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-tag border border-line bg-card px-2.5 py-1 font-mono text-[0.8125rem] text-ink"
            >
              {tool}
            </li>
          ))}
        </ul>
      ),
    },
    ...(note && page.note?.placement === "afterTools" ? [note] : []),
    {
      id: "pricing",
      label: "pricing",
      title: "How it is priced",
      body: <p className="max-w-[68ch] type-lead text-body">{page.pricing}</p>,
    },
    {
      id: "questions",
      label: "faq",
      title: "Questions",
      body: (
        <Suspense>
          <Accordion
            className="max-w-[72ch]"
            items={page.faqs.map((faq, index) => ({
              id: `faq-${index}`,
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </Suspense>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={[serviceJsonLd(page), faqJsonLd(page.faqs), breadcrumbJsonLd(crumbs)]} />
      <Section aria-labelledby="service-title" className="border-b border-line">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 type-label text-muted">
            <ol className="flex flex-wrap gap-x-2">
              {crumbs.slice(1, -1).map((crumb) => (
                <li key={crumb.path} className="after:ml-2 after:content-['/']">
                  <Link href={crumb.path} className="link-draw hover:text-ink">
                    {crumb.name}
                  </Link>
                </li>
              ))}
              <li aria-current="page" className="text-accent">
                {page.name}
              </li>
            </ol>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-14">
            <div className="reveal">
              <h1 id="service-title" className="max-w-[16ch] type-display">
                {page.name}
              </h1>
              <p className="mt-6 max-w-[60ch] type-lead text-body">{page.lead}</p>
              {page.products?.length ? (
                <ul className="mt-8 grid max-w-[64ch] gap-px border border-line bg-line">
                  {page.products.map((product, index) => (
                    <li key={product.name} className="bg-bg-soft p-5">
                      <p className="type-label text-muted">product_{pad(index)}</p>
                      {product.href ? (
                        <Link
                          href={product.href}
                          className="mt-2 inline-flex items-center gap-2 type-h4 text-accent transition-colors duration-150 ease-out hover:text-accent"
                        >
                          {product.name}
                          <Icon icon={ArrowRight} size={16} />
                        </Link>
                      ) : (
                        <p className="mt-2 type-h4">{product.name}</p>
                      )}
                      <p className="mt-1 text-body">{product.description}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div aria-hidden="true" className="group relative border border-line bg-bg-soft p-4">
              <Brackets />
              <p className="mb-3 type-label text-muted">fig. 01 / {page.name}</p>
              {/* Each Suspense boundary hydrates as its own unit, so the page never pays for every island in one long task. */}
              <Suspense>
                <StationObject station={page.station} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-14">
          {blocks.map((block, index) => (
            <Block key={block.id} index={index} block={block} />
          ))}
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
