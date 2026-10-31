import ProjectArt from "@/components/design-lab/ProjectArt";
import { serif } from "@/components/design-lab/system/tones";
import type { LabProject } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/** A concept project: schematic, an unmissable "concept" label, title, summary, and scope. */
export default function WorkCard({
  project,
  badge,
  wide = false,
}: {
  project: LabProject;
  badge: string;
  wide?: boolean;
}) {
  return (
    <article
      aria-labelledby={`work-${project.id}`}
      className="lab-reveal group flex h-full flex-col overflow-hidden rounded-xl border border-(--lab-border) bg-(--lab-bg) transition-colors duration-200 hover:border-(--lab-border-strong)"
    >
      <div className="flex flex-1 items-center bg-[#EFEDE6] p-6 [--art-fill:#F7F6F2] [--art-line:#C9C6BC] [--art-panel:#FFFFFF] md:p-8">
        <ProjectArt
          kind={project.kind}
          className={cn(
            "mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]",
            wide ? "max-w-[440px]" : "max-w-[300px]",
          )}
        />
      </div>
      <div className="p-6">
        <p className="inline-flex rounded-full bg-[#E8EEFD] px-2.5 py-1 text-xs font-medium text-(--lab-accent)">
          {badge}
        </p>
        <h3 id={`work-${project.id}`} className={cn(serif, "mt-3 text-[1.625rem] leading-tight")}>
          {project.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-(--lab-text-2)">{project.summary}</p>
        <p className="mt-4 text-sm text-(--lab-text-3)">{project.tags.join(", ")}</p>
      </div>
    </article>
  );
}
