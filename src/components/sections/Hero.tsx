import RevealOnce from "@/components/sections/RevealOnce";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { homePage } from "@/content/pages";

/** Home hero: one calm heading over the 3D scene, copy in the left column. */
export default function Hero() {
  const { hero } = homePage;
  return (
    <Section
      station="hero"
      flush
      aria-labelledby="hero-title"
      className="flex min-h-svh items-center py-12"
    >
      <Container>
        <RevealOnce className="grid max-w-[560px] gap-5">
          <h1 id="hero-title" className="type-display">
            {hero.title}
          </h1>
          <p className="max-w-[68ch] type-lead text-fog-2">{hero.lead}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
        </RevealOnce>
      </Container>
    </Section>
  );
}
