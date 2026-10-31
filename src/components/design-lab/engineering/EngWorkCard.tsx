import ProjectArt from "@/components/design-lab/ProjectArt";
import Brackets from "@/components/design-lab/engineering/Brackets";
import { heading, mono } from "@/components/design-lab/engineering/tones";
import { lab, type LabProject } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/** A concept project as a specification sheet: schematic, title, summary, and a status, practice, and scope table. */
export default function EngWorkCard({ project, badge }: { project: LabProject; badge: string }) {
  const practices = project.practices
    .map((id) => lab.practices.find((practice) => practice.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  return (
    <article
      aria-labelledby={`work-${project.id}`}
      className="lab-reveal group relative h-full border border-(--lab-border) bg-(--lab-surface) transition-colors duration-200 hover:border-(--lab-border-strong)"
    >
      <Brackets />
      <div className="border-b border-(--lab-border) bg-(--lab-bg) p-6 [--art-fill:#1D2126] [--art-line:#353C44] [--art-panel:#171A1E] md:p-8">
        <ProjectArt
          kind={project.kind}
          className="mx-auto max-w-[420px] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-6">
        <h3 id={`work-${project.id}`} className={cn(heading, "text-xl")}>
          {project.title}
        </h3>
        <p className="mt-2 leading-relaxed text-(--lab-text-2)">{project.summary}</p>
        <dl className="mt-5 grid gap-2 border-t border-(--lab-border) pt-4 text-sm">
          <div className="grid grid-cols-[96px_1fr] gap-3">
            <dt className={cn(mono, "text-xs leading-5 text-(--lab-text-3)")}>status</dt>
            <dd className="text-(--lab-accent)">{badge}</dd>
          </div>
          <div className="grid grid-cols-[96px_1fr] gap-3">
            <dt className={cn(mono, "text-xs leading-5 text-(--lab-text-3)")}>practice</dt>
            <dd className="text-(--lab-text-2)">{practices}</dd>
          </div>
          <div className="grid grid-cols-[96px_1fr] gap-3">
            <dt className={cn(mono, "text-xs leading-5 text-(--lab-text-3)")}>scope</dt>
            <dd className="text-(--lab-text-2)">{project.tags.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
