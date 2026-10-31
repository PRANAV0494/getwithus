import DeferredForm from "@/components/forms/DeferredForm";
import FormPreview from "@/components/forms/FormPreview";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { startPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: startPage.title,
  description: startPage.description,
  path: startPage.path,
});

export default function StartPage() {
  return (
    <Section aria-labelledby="start-title">
      <Container>
        <h1 id="start-title" className="type-display">
          {startPage.title}
        </h1>
        <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{startPage.lead}</p>
        <div className="mt-10 max-w-[880px]">
          <DeferredForm form="brief">
            <FormPreview form="brief" />
          </DeferredForm>
        </div>
      </Container>
    </Section>
  );
}
