import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import PracticeIcon from "@/components/design-lab/PracticeIcon";
import { serif } from "@/components/design-lab/hybrid/tones";
import type { LabPractice } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/**
 * A practice at a glance: what it is and who it helps, with one link to its
 * services below. The services themselves are listed once, in the services
 * section, so the page never says the same thing twice.
 */
export default function PracticeCard({ practice }: { practice: LabPractice }) {
  return (
    <article
      aria-labelledby={`practice-${practice.id}`}
      className="lab-reveal group relative flex h-full flex-col rounded-xl border border-(--lab-border) bg-(--lab-bg) p-7 transition-colors duration-200 hover:border-(--lab-border-strong) md:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-0.5 origin-left scale-x-0 bg-(--lab-accent) transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-[#E8EEFD] text-(--lab-accent)">
        <PracticeIcon id={practice.id} size={20} />
      </span>
      <h3
        id={`practice-${practice.id}`}
        className={cn(serif, "mt-6 text-[1.75rem] leading-[1.15]")}
      >
        {practice.name}
      </h3>
      <p className="mt-3 font-medium text-(--lab-text)">{practice.summary}</p>
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
