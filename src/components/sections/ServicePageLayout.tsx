import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import JsonLd from "@/components/layout/JsonLd";
import ClosingCta from "@/components/sections/ClosingCta";
import StationObject from "@/components/three/StationObject";
import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { ServicePage } from "@/content/types";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/json-ld";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="type-h3">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid max-w-[68ch] gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-3 before:size-1 before:shrink-0 before:-translate-y-[3px] before:rounded-full before:bg-fog-3 before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The shared layout of every service page: heading, lead, and station panel,
 * then What you get, How we work on this, Tools we use, How it is priced,
 * Questions, and the closing call to action. Content comes from src/content/services.
 */
export default function ServicePageLayout({ page }: { page: ServicePage }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    ...(page.parent ? [{ name: page.parent.name, path: page.parent.href }] : []),
    { name: page.name, path: page.href },
  ];
  const note = page.note ? (
    <Block id="note" title={page.note.title}>
      <p className="max-w-[68ch] text-fog-2">{page.note.body}</p>
    </Block>
  ) : null;

  return (
    <>
      <JsonLd data={[serviceJsonLd(page), faqJsonLd(page.faqs), breadcrumbJsonLd(crumbs)]} />
      <Section aria-labelledby="service-title" className="pb-0 md:pb-0">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 type-small text-fog-2">
            <ol className="flex flex-wrap gap-x-2">
              {crumbs.slice(1, -1).map((crumb) => (
                <li key={crumb.path} className="after:ml-2 after:text-fog-3 after:content-['/']">
                  <Link
                    href={crumb.path}
                    className="transition-colors duration-150 ease-out hover:text-fog"
                  >
                    {crumb.name}
                  </Link>
                </li>
              ))}
              <li aria-current="page" className="text-fog">
                {page.name}
              </li>
            </ol>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
            <div>
              <h1 id="service-title" className="type-display">
                {page.name}
              </h1>
              <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{page.lead}</p>
              {page.products?.length ? (
                <ul className="mt-8 grid max-w-[68ch] gap-4">
                  {page.products.map((product) => (
                    <li key={product.name} className="border-l-2 border-line pl-5">
                      {product.href ? (
                        <Link
                          href={product.href}
                          className="font-medium text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
                        >
                          {product.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-fog">{product.name}</span>
                      )}
                      <p className="mt-1 text-fog-2">{product.description}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {/* Each Suspense boundary hydrates as its own unit, so the page never pays for every island in one long task. */}
            <Suspense>
              <StationObject station={page.station} />
            </Suspense>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-14">
          <Block id="what-you-get" title="What you get">
            <BulletList items={page.whatYouGet} />
          </Block>
          {page.note?.placement === "afterWhatYouGet" ? note : null}
          <Block id="how-we-work" title="How we work on this">
            <ol className="grid max-w-[68ch] gap-3">
              {page.howWeWork.map((step, index) => (
                <li key={step} className="grid grid-cols-[32px_1fr] items-baseline gap-4">
                  <span aria-hidden="true" className="font-semibold text-fog-2 tabular-nums">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Block>
          <Block id="tools" title="Tools we use">
            <ul className="flex max-w-[68ch] flex-wrap gap-2">
              {page.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-tag border border-line bg-ink-2 px-2.5 py-1 type-small text-fog"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Block>
          {page.note?.placement === "afterTools" ? note : null}
          <Block id="pricing" title="How it is priced">
            <p className="max-w-[68ch] text-fog-2">{page.pricing}</p>
          </Block>
          <Block id="questions" title="Questions">
            <Suspense>
              <Accordion
                className="max-w-[68ch]"
                items={page.faqs.map((faq, index) => ({
                  id: `faq-${index}`,
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />
            </Suspense>
          </Block>
        </Container>
      </Section>
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
