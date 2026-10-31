import Link from "next/link";
import ClosingCta from "@/components/sections/ClosingCta";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { servicesPage } from "@/content/pages";
import { serviceLinePages } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: servicesPage.title,
  description: servicesPage.description,
  path: servicesPage.path,
});

export default function ServicesPage() {
  return (
    <>
      <Section aria-labelledby="services-title">
        <Container>
          <h1 id="services-title" className="type-display">
            {servicesPage.title}
          </h1>
          <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{servicesPage.lead}</p>
          <ul aria-label={servicesPage.listTitle} className="mt-12 border-b border-line">
            {serviceLinePages.map((page) => (
              <li
                key={page.slug}
                className="grid gap-5 border-t border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
              >
                <div>
                  <h2 className="type-h3">
                    <Link
                      href={page.href}
                      className="transition-colors duration-150 ease-out hover:text-lamp"
                    >
                      {page.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-fog-2">{page.summary}</p>
                  {page.children?.length ? (
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 type-small">
                      {page.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={child.href}
                          className="text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </p>
                  ) : null}
                </div>
                <ul className="grid content-start gap-1.5">
                  {(page.highlights ?? []).map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 before:size-1 before:shrink-0 before:-translate-y-[3px] before:rounded-full before:bg-fog-3 before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <ProcessSteps title={servicesPage.processTitle} className="pt-0 md:pt-0" />
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
