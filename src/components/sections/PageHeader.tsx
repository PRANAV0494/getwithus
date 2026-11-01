import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  id: string;
  /** The monospaced path above the heading, for example "services". */
  label: string;
  title: string;
  lead?: ReactNode;
  className?: string;
};

/** The opening of an inner page: a signal prompt line, the page heading, and its lead, ruled off below. */
export default function PageHeader({ id, label, title, lead, className }: PageHeaderProps) {
  return (
    <Section aria-labelledby={id} className={cn("border-b border-line", className)}>
      <Container>
        <p className="type-label text-accent">
          <span aria-hidden="true">&gt; </span>
          {label}
        </p>
        <h1 id={id} className="mt-5 max-w-[20ch] type-display">
          {title}
        </h1>
        {lead ? <div className="mt-6 max-w-[62ch] type-lead text-body">{lead}</div> : null}
      </Container>
    </Section>
  );
}
