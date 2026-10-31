import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { serviceIcons } from "@/components/sections/serviceIcons";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";

const LINES: readonly ServiceSlug[] = [
  "web-development",
  "app-development",
  "agentic-automation",
  "digital-marketing",
];

/**
 * "What we do": one bracketed panel per service line with its highlights as a
 * short specification, a link to the line, and links to its products.
 */
export default function ServiceBlocks() {
  const { services } = homePage;
  return (
    <Section aria-labelledby="services-title" className="border-b border-line bg-ink-1/80">
      <Container>
        <SectionHeading id="services-title" index="01" label="services" title={services.title} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {LINES.map((slug, index) => {
            const page = findServicePage(slug);
            if (!page) return null;
            const ServiceIcon = serviceIcons[slug];
            return (
              <li
                key={slug}
                className="reveal group relative flex flex-col border border-line bg-ink-2 p-6 transition-colors duration-200 ease-out hover:border-line-strong md:p-7"
              >
                <Brackets />
                <p className="flex items-center justify-between">
                  <span className="type-label text-fog-3">
                    service_{String(index + 1).padStart(2, "0")}
                  </span>
                  {ServiceIcon ? (
                    <span className="inline-flex size-10 items-center justify-center rounded-control bg-signal-tint text-signal">
                      <Icon icon={ServiceIcon} size={20} />
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-6 type-h3">{page.name}</h3>
                <p className="mt-3 text-fog-2">{page.summary}</p>
                <ul className="mt-5 grid gap-2 border-t border-line pt-5">
                  {(page.highlights ?? []).map((item) => (
                    <li key={item} className="flex gap-3 type-small">
                      <span aria-hidden="true" className="font-mono text-signal">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-6">
                  <Link
                    href={page.href}
                    className="inline-flex items-center gap-2 font-medium text-signal transition-colors duration-150 ease-out hover:text-signal-2"
                  >
                    About {page.name.toLowerCase()}
                    <Icon icon={ArrowRight} size={16} />
                  </Link>
                  {page.children?.map((child) => (
                    <Link
                      key={child.slug}
                      href={child.href}
                      className="link-draw type-small text-fog-2 hover:text-fog"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="reveal mt-8 type-small text-fog-2">
          {services.also.prefix}{" "}
          <Link href={services.also.href} className="link-draw text-fog hover:text-signal">
            {services.also.label}
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
