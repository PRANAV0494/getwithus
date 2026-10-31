import { Check } from "lucide-react";
import RevealOnce from "@/components/sections/RevealOnce";
import ServiceDiagram from "@/components/sections/ServiceDiagram";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { site } from "@/config/site";
import { homePage } from "@/content/pages";

/**
 * Home hero: the brand line, one statement, the lead, two actions, and three
 * commitments on the left; the service diagram on the right (from 640 px).
 */
export default function Hero() {
  const { hero } = homePage;
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid items-center gap-12 pt-14 pb-14 md:pt-20 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <RevealOnce className="grid gap-5">
          <p className="font-mono text-[0.8125rem] text-signal">&gt; {site.tagline}</p>
          <h1 id="hero-title" className="type-display">
            {hero.title}
          </h1>
          <p className="max-w-[56ch] type-lead text-fog-2">{hero.lead}</p>
          <div className="mt-2 grid gap-7">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              <Button href={hero.secondary.href} variant="secondary">
                {hero.secondary.label}
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-6">
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-2 type-small text-fog-2">
                  <Icon icon={Check} size={16} className="text-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnce>
        <ServiceDiagram className="hidden sm:block" />
      </Container>
    </section>
  );
}
