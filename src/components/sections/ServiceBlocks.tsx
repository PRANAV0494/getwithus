import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { homePage } from "@/content/pages";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";

/** The four home blocks and the 3D station each one belongs to. */
const blocks: readonly {
  slug: ServiceSlug;
  station: "web" | "app" | "automation" | "marketing";
}[] = [
  { slug: "web-development", station: "web" },
  { slug: "app-development", station: "app" },
  { slug: "agentic-automation", station: "automation" },
  { slug: "digital-marketing", station: "marketing" },
];

const quietLink =
  "text-fog-2 underline decoration-line-strong underline-offset-[3px] transition-colors duration-150 ease-out hover:text-fog";

/**
 * "What we do": one full-height block per service line so the camera has room to
 * travel. The block whose station is in view gets a lamp-colored rule.
 */
export default function ServiceBlocks() {
  const { services } = homePage;
  return (
    <>
      <Container className="pt-16 md:pt-24">
        <h2 className="type-h2">{services.title}</h2>
      </Container>
      {blocks.map(({ slug, station }) => {
        const page = findServicePage(slug);
        if (!page) return null;
        const titleId = `${slug}-title`;
        return (
          <Section
            key={slug}
            station={station}
            flush
            aria-labelledby={titleId}
            className="group/block flex min-h-svh items-center py-12"
          >
            <Container>
              <div className="grid max-w-[560px] gap-4 border-l-2 border-line pl-5 transition-colors duration-150 ease-out group-data-[current=true]/block:border-lamp">
                <h3 id={titleId} className="type-h3">
                  {page.name}
                </h3>
                <p className="text-fog-2">{page.summary}</p>
                <ul className="grid gap-1.5">
                  {(page.highlights ?? []).map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 before:size-1 before:shrink-0 before:-translate-y-[3px] before:rounded-full before:bg-fog-3 before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
                  <Link
                    href={page.href}
                    className="text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
                  >
                    About {page.name.toLowerCase()}
                  </Link>
                  {page.children?.map((child) => (
                    <Link key={child.slug} href={child.href} className={`type-small ${quietLink}`}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}
      <Container className="pb-16 md:pb-24">
        <p className="max-w-[560px] type-small text-fog-2">
          {services.also.prefix}{" "}
          <Link href={services.also.href} className={quietLink}>
            {services.also.label}
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
