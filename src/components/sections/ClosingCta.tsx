import type { ReactNode } from "react";
import OnScreen from "@/components/motion/OnScreen";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { closingCta } from "@/content/pages";
import { cn } from "@/lib/cn";

function Orb({ className }: { className?: string }) {
  return (
    <OnScreen aria-hidden className={cn("cta-orb", className)}>
      <span>
        <b />
      </span>
      <span>
        <b />
      </span>
      <span />
    </OnScreen>
  );
}

/**
 * "Tell us what you need": the closing call to action across the site, as a
 * dark rounded band with slowly turning rings and a breathing glow. The home
 * page passes the terminal, which takes the right column; elsewhere the rings
 * do.
 */
export default function ClosingCta({
  terminal,
  className,
}: {
  terminal?: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby="closing-cta-title" className={cn("pb-24 md:pb-[110px]", className)}>
      <Container>
        <div className="relative isolate overflow-hidden rounded-[36px] bg-cta px-7 py-14 text-cta-ink sm:px-[clamp(28px,6vw,90px)] md:py-20">
          {terminal ? (
            <div className="pointer-events-none absolute -top-28 -right-28 -z-10 w-[420px] opacity-60">
              <Orb />
            </div>
          ) : null}
          <div
            className={cn(
              "grid items-center gap-10",
              terminal
                ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
            )}
          >
            <div>
              <h2
                id="closing-cta-title"
                className="font-display text-[clamp(2.375rem,5vw,4rem)] leading-[1.04] font-extrabold tracking-[-0.03em]"
              >
                {closingCta.title}
              </h2>
              <p className="mt-[18px] max-w-[30em] text-lg text-cta-body">{closingCta.text}</p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button href={closingCta.primary.href} size="lg">
                  {closingCta.primary.label}
                </Button>
                {closingCta.secondary ? (
                  <Button href={closingCta.secondary.href} variant="inverse" size="lg">
                    {closingCta.secondary.label}
                  </Button>
                ) : null}
              </div>
            </div>
            {terminal ?? <Orb className="mx-auto max-w-[200px] lg:max-w-[320px]" />}
          </div>
        </div>
      </Container>
    </section>
  );
}
