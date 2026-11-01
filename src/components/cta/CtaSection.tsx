import type { ComponentProps } from "react";
import type TerminalCta from "@/components/cta/TerminalCta";
import TerminalCtaLazy from "@/components/cta/TerminalCtaLazy";
import GridSpotlight from "@/components/motion/GridSpotlight";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { known, RESPONSE_TIME, site } from "@/config/site";
import { closingCta } from "@/content/pages";

/**
 * The home page's closing section: "Tell us what you need" over the terminal
 * form, with an email link under it as a fallback (left out until the owner
 * supplies the address).
 */
export default function CtaSection({
  action,
}: {
  action: ComponentProps<typeof TerminalCta>["action"];
}) {
  const email = known(site.contact.email);
  return (
    <Section aria-labelledby="closing-cta-title" className="relative isolate pb-24 md:pb-36">
      <GridSpotlight />
      <Container>
        <SectionHeading id="closing-cta-title" label="next step" title={closingCta.title} />
        <div className="mt-12">
          <TerminalCtaLazy action={action} responseTime={RESPONSE_TIME} />
        </div>
        {email ? (
          <p className="mt-6 type-small text-fog-2">
            Rather write?{" "}
            <a href={`mailto:${email}`} className="link-draw text-signal hover:text-signal-2">
              Email us
            </a>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
