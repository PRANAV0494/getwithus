import { heading, mono } from "@/components/design-lab/engineering/tones";
import { cn } from "@/lib/cn";

/**
 * The section opener: a monospaced index ("02 / services") in its own column on
 * wide screens, the heading, and an optional lead.
 */
export default function EngSectionHeading({
  id,
  index,
  label,
  title,
  lead,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="lab-reveal grid gap-3 md:grid-cols-[200px_1fr] md:gap-6">
      <p className={cn(mono, "pt-2 text-xs text-(--lab-text-3)")}>
        {index} / {label}
      </p>
      <div className="max-w-2xl">
        <h2 id={id} className={cn(heading, "text-[clamp(1.875rem,3.2vw,2.5rem)] leading-[1.1]")}>
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-[17px] leading-relaxed text-(--lab-text-2)">{lead}</p>
        ) : null}
      </div>
    </div>
  );
}
