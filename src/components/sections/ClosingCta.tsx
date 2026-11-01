import MagneticButton from "@/components/motion/MagneticButton";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { closingCta } from "@/content/pages";
import { cn } from "@/lib/cn";

/** "Tell us what you need": the closing call to action across the site, in a signal-bracketed panel. */
export default function ClosingCta({ className }: { className?: string }) {
  return (
    <Section aria-labelledby="closing-cta-title" className={cn(className)}>
      <Container>
        <div className="reveal relative border border-line-strong bg-ink-2 px-6 py-12 md:px-12 md:py-14">
          <Brackets always />
          <p className="type-label text-fog-3">next step</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <h2 id="closing-cta-title" className="max-w-[20ch] type-h2">
              {closingCta.title}
            </h2>
            <div>
              <p className="type-lead text-fog-2">{closingCta.text}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <MagneticButton>
                  <Button href={closingCta.primary.href}>{closingCta.primary.label}</Button>
                </MagneticButton>
                <Button href={closingCta.secondary.href} variant="secondary">
                  {closingCta.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
