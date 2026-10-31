import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BlueprintController from "@/components/sections/BlueprintController";
import BlueprintFigure from "@/components/sections/BlueprintFigure";
import { serviceIcons } from "@/components/sections/serviceIcons";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";

/** The four service lines, bottom slab first, with the short names the blueprint labels them by. */
const LINES: readonly { slug: ServiceSlug; short: string }[] = [
  { slug: "web-development", short: "web" },
  { slug: "app-development", short: "app" },
  { slug: "agentic-automation", short: "automation" },
  { slug: "digital-marketing", short: "marketing" },
];

const LIST_ID = "service-lines";
const FIGURE_ID = "service-blueprint";

/**
 * "What we do": one bracketed panel per service line, its highlights as a short
 * specification, a link to the line, and links to its products. Beside the
 * cards from 1024 px (above them, pinned, on smaller screens), figure 02, a
 * blueprint, assembles one slab per line as the cards pass, and the card whose
 * slab last docked is marked.
 */
export default function ServiceBlocks() {
  const { services } = homePage;
  const pages = LINES.map((line) => findServicePage(line.slug)).filter(
    (page) => page !== undefined,
  );
  return (
    <Section aria-labelledby="services-title" className="border-b border-line bg-ink-1/80">
      <Container>
        <SectionHeading id="services-title" index="01" label="services" title={services.title} />
        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12">
          <div className="sticky top-16 z-10 -mx-6 border-b border-line bg-ink-1 px-6 pt-3 pb-4 md:-mx-10 md:px-10 lg:static lg:order-2 lg:mx-0 lg:border-b-0 lg:bg-transparent lg:p-0">
            <BlueprintFigure
              id={FIGURE_ID}
              labels={LINES.map((line) => line.short)}
              className="lg:sticky lg:top-28"
            />
            <BlueprintController
              figureId={FIGURE_ID}
              listId={LIST_ID}
              names={pages.map((page) => page.name)}
            />
          </div>
          <ol id={LIST_ID} className="mt-6 grid gap-6 lg:order-1 lg:mt-0">
            {pages.map((page, index) => {
              const ServiceIcon = serviceIcons[page.slug];
              return (
                <li
                  key={page.slug}
                  className="reveal group relative flex flex-col border border-line bg-ink-2 p-6 transition-colors duration-200 ease-out hover:border-line-strong data-[active]:border-line-strong md:p-7"
                >
                  <Brackets />
                  <p className="flex items-center justify-between">
                    <span className="type-label text-fog-3 transition-colors duration-200 ease-out group-data-[active]:text-signal">
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
          </ol>
        </div>
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
