import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
import Brackets from "@/components/design-lab/engineering/Brackets";
import { heading, mono } from "@/components/design-lab/engineering/tones";
import type { LabPractice } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/**
 * A practice at a glance: what it is and who it helps, with one link to its
 * services. The services are listed once, in the services section.
 */
export default function EngPracticeCard({
  practice,
  index,
}: {
  practice: LabPractice;
  index: number;
}) {
  return (
    <article
      aria-labelledby={`practice-${practice.id}`}
      className="lab-reveal group relative flex h-full flex-col border border-(--lab-border) bg-(--lab-surface) p-6 transition-colors duration-200 hover:border-(--lab-border-strong) md:p-7"
    >
      <Brackets />
      <p className="flex items-center justify-between">
        <span className={cn(mono, "text-xs text-(--lab-text-3)")}>
          practice_{String(index + 1).padStart(2, "0")}
        </span>
        <span className="inline-flex size-10 items-center justify-center rounded-[2px] bg-[#0E2A2E] text-(--lab-accent)">
          <PracticeIcon id={practice.id} />
        </span>
      </p>
      <h3 id={`practice-${practice.id}`} className={cn(heading, "mt-6 text-2xl")}>
        {practice.name}
      </h3>
      <p className="mt-3 font-medium">{practice.summary}</p>
      <p className="mt-3 leading-relaxed text-(--lab-text-2)">{practice.detail}</p>
      <a
        href={`#services-${practice.id}`}
        className="lab-nudge mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-(--lab-accent) hover:text-(--lab-accent-hover)"
      >
        {practice.services.length} services in {practice.short}
        <Icon icon={ArrowRight} size={16} className="lab-arrow" />
      </a>
    </article>
  );
}
