import DeferredForm from "@/components/forms/DeferredForm";
import FormPreview from "@/components/forms/FormPreview";
import PageHeader from "@/components/sections/PageHeader";
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
    <>
      <PageHeader
        id="start-title"
        label="start a project"
        title={startPage.title}
        lead={startPage.lead}
      />
      <Section>
        <Container>
          <div className="max-w-[880px]">
            <DeferredForm form="brief">
              <FormPreview form="brief" />
            </DeferredForm>
          </div>
        </Container>
      </Section>
    </>
  );
}
