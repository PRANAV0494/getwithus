import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { serviceName } from "@/content/services/catalog";
import type { CaseStudy } from "@/content/types";
import { clientLabel } from "@/features/case-studies/labels";

/** A case study in a list: title, client, industry, services, summary. */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="relative rounded-card border border-line bg-ink-2 p-6 transition-colors duration-150 ease-out hover:border-line-strong">
      <h3 className="type-h4">
        <Link
          href={`/work/${study.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {study.title}
        </Link>
      </h3>
      <p className="mt-1 type-small text-fog-2">
        {clientLabel(study)}, {study.industry}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services">
        {study.services.map((slug) => (
          <li key={slug}>
            <Badge>{serviceName(slug)}</Badge>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-fog-2">{study.summary}</p>
    </article>
  );
}
