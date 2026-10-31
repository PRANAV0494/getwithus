import JsonLd from "@/components/layout/JsonLd";
import ClosingCta from "@/components/sections/ClosingCta";
import Commitments from "@/components/sections/Commitments";
import Hero from "@/components/sections/Hero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import SelectedWork from "@/components/sections/SelectedWork";
import ServiceBlocks from "@/components/sections/ServiceBlocks";
import { site } from "@/config/site";
import { homePage } from "@/content/pages";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${site.name}: software your business runs on`,
  description: site.description,
  path: homePage.path,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <Hero />
      <ServiceBlocks />
      <ProcessSteps index="02" title={homePage.process.title} link={homePage.process.link} />
      <Commitments index="03" />
      <SelectedWork index="04" />
      <ClosingCta />
    </>
  );
}
