import Container from "@/components/ui/Container";
import Prose from "@/components/ui/Prose";
import Section from "@/components/ui/Section";
import type { LegalDocument } from "@/content/types";
import { formatDate } from "@/lib/dates";

/** A legal page: heading, last-updated date, a sticky table of contents on desktop, and the text. */
export default function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <Section aria-labelledby="legal-title">
      <Container>
        <p className="type-label text-signal">
          <span aria-hidden="true">&gt; </span>legal
        </p>
        <h1 id="legal-title" className="mt-5 type-display">
          {document.title}
        </h1>
        <p className="mt-4 type-label text-fog-3">
          Last updated <time dateTime={document.updated}>{formatDate(document.updated)}</time>
        </p>
        <div className="mt-12 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-labelledby="legal-contents"
            className="border-l border-line pl-5 lg:sticky lg:top-24 lg:self-start"
          >
            <h2 id="legal-contents" className="type-label text-fog-3">
              Contents
            </h2>
            <ol className="mt-3 grid gap-2 type-small">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="link-draw text-fog-2 transition-colors duration-150 ease-out hover:text-fog"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Prose>
            {document.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.blocks.map((block, index) =>
                  block.type === "p" ? (
                    <p key={index}>{block.text}</p>
                  ) : (
                    <ul key={index}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </Prose>
        </div>
      </Container>
    </Section>
  );
}
