import { cn } from "@/lib/cn";
import { serif } from "@/components/design-lab/hybrid/tones";

/**
 * The editorial section opener: a quiet label in its own column on wide
 * screens, the serif heading, and an optional lead.
 */
export default function SectionHeading({
  id,
  label,
  title,
  lead,
  className,
}: {
  id: string;
  label: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "lab-reveal grid gap-4 border-t border-(--lab-border) pt-8 md:grid-cols-[200px_1fr] md:gap-10",
        className,
      )}
    >
      <p className="text-sm font-medium text-(--lab-text-2)">{label}</p>
      <div className="max-w-3xl">
        <h2 id={id} className={cn(serif, "text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.04]")}>
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-(--lab-text-2)">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  );
}
