import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { closingCta } from "@/content/pages";
import { cn } from "@/lib/cn";

/** "Tell us what you need": the closing call to action used across the site. */
export default function ClosingCta({ className }: { className?: string }) {
  return (
    <Section aria-labelledby="closing-cta-title" className={cn("bg-ink", className)}>
      <Container>
        <div className="grid max-w-[560px] gap-4">
          <h2 id="closing-cta-title" className="type-h2">
            {closingCta.title}
          </h2>
          <p className="type-lead text-fog-2">{closingCta.text}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={closingCta.primary.href}>{closingCta.primary.label}</Button>
            <Button href={closingCta.secondary.href} variant="secondary">
              {closingCta.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
