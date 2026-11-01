import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/motion/TiltCard";
import ScrambleText from "@/components/motion/ScrambleText";
import { serviceIcons } from "@/components/sections/serviceIcons";
import IsoStack from "@/components/services/IsoStack";
import WhatsAppDemoLazy from "@/components/services/WhatsAppDemoLazy";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { homePage } from "@/content/pages";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";

/** The five service lines, bottom plate first, with the short names the stack labels them by. */
const LINES: readonly { slug: ServiceSlug; short: string }[] = [
  { slug: "web-development", short: "web" },
  { slug: "app-development", short: "app" },
  { slug: "agentic-automation", short: "automation" },
  { slug: "digital-marketing", short: "marketing" },
  { slug: "custom-software", short: "custom" },
];

const SECTION_ID = "services";
const LIST_ID = "service-lines";

/**
 * "What we do": one tilting, bracketed card per service line (the agentic
 * automation card carries a live WhatsApp demo), beside figure 02, the
 * isometric stack, pinned beside the cards from 900 px and under the header
 * below that. The card nearest the reading line is active in both.
 */
export default function ServiceBlocks() {
  const { services } = homePage;
  const lines = LINES.flatMap((line) => {
    const page = findServicePage(line.slug);
    return page ? [{ ...line, page }] : [];
  });
  return (
    <Section
      id={SECTION_ID}
      aria-labelledby="services-title"
      className="border-b border-line bg-ink-1/80"
    >
      <Container>
        <SectionHeading id="services-title" index="01" label="services" title={services.title} />
        <div className="mt-12 min-[900px]:grid min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:items-start min-[900px]:gap-14">
          <div className="sticky top-16 z-10 -mx-6 bg-ink px-6 pt-2.5 pb-3.5 min-[900px]:top-24 min-[900px]:order-2 min-[900px]:mx-0 min-[900px]:bg-transparent min-[900px]:p-0 md:-mx-10 md:px-10">
            <IsoStack
              names={lines.map((line) => line.page.name)}
              labels={lines.map((line) => line.short)}
              listId={LIST_ID}
              sectionId={SECTION_ID}
            />
          </div>
          <ol
            id={LIST_ID}
            className="mt-5 grid gap-8 min-[900px]:order-1 min-[900px]:mt-0 min-[900px]:pb-[22vh]"
          >
            {lines.map(({ slug, page }, index) => {
              const ServiceIcon = serviceIcons[slug];
              return (
                <li key={slug} className="reveal">
                  <TiltCard
                    maxDeg={2}
                    data-service-card=""
                    className="flex flex-col border border-line bg-ink-2 p-6 hover:border-line-strong data-[active]:border-line-strong data-[active]:bg-ink-3 md:p-9"
                  >
                    <Brackets spread />
                    <p className="flex items-center justify-between">
                      <ScrambleText
                        text={`service_${String(index + 1).padStart(2, "0")}`}
                        className="type-label text-fog-3 transition-colors duration-300 group-data-[active]:text-signal"
                      />
                      {ServiceIcon ? (
                        <span className="inline-flex size-[50px] items-center justify-center bg-signal-tint text-signal">
                          <Icon icon={ServiceIcon} size={24} />
                        </span>
                      ) : null}
                    </p>
                    <h3 className="mt-7 type-h3">{page.name}</h3>
                    <p className="mt-3.5 text-fog-2">{page.summary}</p>
                    {slug === "agentic-automation" ? <WhatsAppDemoLazy /> : null}
                    <ul className="mt-6 grid gap-2 border-t border-line pt-6">
                      {(page.highlights ?? []).map((item) => (
                        <li key={item} className="flex gap-3">
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
                  </TiltCard>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
