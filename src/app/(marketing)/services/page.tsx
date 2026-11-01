import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ClosingCta from "@/components/sections/ClosingCta";
import PageHeader from "@/components/sections/PageHeader";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { serviceIcons } from "@/components/sections/serviceIcons";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
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
      <PageHeader
        id="services-title"
        label="services"
        title={servicesPage.title}
        lead={servicesPage.lead}
      />
      <Section>
        <Container>
          <ul aria-label={servicesPage.listTitle} className="border-b border-line">
            {serviceLinePages.map((page, index) => {
              const ServiceIcon = serviceIcons[page.slug];
              return (
                <li
                  key={page.slug}
                  className="reveal grid gap-5 border-t border-line py-8 md:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
                >
                  <p className="flex items-center gap-3 type-label text-muted md:items-start md:pt-1.5">
                    {ServiceIcon ? (
                      <Icon icon={ServiceIcon} size={16} className="text-accent" />
                    ) : null}
                    service_{String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="type-h3">
                      <Link
                        href={page.href}
                        className="group inline-flex items-center gap-2 transition-colors duration-150 ease-out hover:text-accent"
                      >
                        {page.name}
                        <Icon
                          icon={ArrowRight}
                          size={20}
                          className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-1"
                        />
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-[60ch] text-body">{page.summary}</p>
                    {page.children?.length ? (
                      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 type-small">
                        {page.children.map((child) => (
                          <Link
                            key={child.slug}
                            href={child.href}
                            className="link-draw text-accent transition-colors duration-150 ease-out hover:text-accent"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </p>
                    ) : null}
                  </div>
                  <ul className="grid content-start gap-2">
                    {(page.highlights ?? []).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="font-mono text-accent">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
      <ProcessSteps title={servicesPage.processTitle} className="pt-0 md:pt-0" />
      <ClosingCta className="pt-0 md:pt-0" />
    </>
  );
}
