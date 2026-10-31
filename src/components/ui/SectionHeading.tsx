import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  /** The monospaced label, for example "services". Shown as "01 / services" when an index is given. */
  label: string;
  index?: string;
  title: string;
  lead?: ReactNode;
  className?: string;
};

/**
 * The section opener of the Modern Engineering system: a monospaced index in its
 * own column from 768 px, the heading, and an optional lead.
 */
export default function SectionHeading({
  id,
  label,
  index,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("reveal grid gap-3 md:grid-cols-[200px_1fr] md:gap-6", className)}>
      <p className="pt-2 type-label text-fog-3">{index ? `${index} / ${label}` : label}</p>
      <div className="max-w-2xl">
        <h2 id={id} className="type-h2">
          {title}
        </h2>
        {lead ? <div className="mt-4 type-lead text-fog-2">{lead}</div> : null}
      </div>
    </div>
  );
}
