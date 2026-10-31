import Link from "next/link";
import Brackets from "@/components/ui/Brackets";
import { serviceName } from "@/content/services/catalog";
import type { CaseStudy } from "@/content/types";
import { clientLabel } from "@/features/case-studies/labels";

/** A case study in a list, as a short specification sheet: title, summary, then client, industry, and services. */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const rows = [
    { term: "client", value: clientLabel(study) },
    { term: "industry", value: study.industry },
    { term: "services", value: study.services.map(serviceName).join(", ") },
  ];
  return (
    <article className="reveal group relative flex h-full flex-col border border-line bg-ink-2 p-6 transition-colors duration-200 ease-out hover:border-line-strong">
      <Brackets />
      <h3 className="type-h3">
        <Link
          href={`/work/${study.slug}`}
          className="transition-colors duration-150 ease-out group-hover:text-signal after:absolute after:inset-0 after:content-['']"
        >
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 mb-5 text-fog-2">{study.summary}</p>
      <dl className="mt-auto grid gap-2 border-t border-line pt-4 type-small">
        {rows.map((row) => (
          <div key={row.term} className="grid grid-cols-[88px_1fr] gap-3">
            <dt className="type-label leading-5 text-fog-3">{row.term}</dt>
            <dd className="text-fog-2">{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
