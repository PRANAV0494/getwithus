import DeferredForm from "@/components/forms/DeferredForm";
import FormPreview from "@/components/forms/FormPreview";
import ContactDetails from "@/components/sections/ContactDetails";
import PageHeader from "@/components/sections/PageHeader";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { contactPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: contactPage.title,
  description: contactPage.description,
  path: contactPage.path,
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        id="contact-title"
        label="contact"
        title={contactPage.title}
        lead={contactPage.lead}
      />
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-20">
          <div>
            <DeferredForm form="contact">
              <FormPreview form="contact" />
            </DeferredForm>
          </div>
          <aside
            aria-labelledby="contact-details-title"
            className="group relative border border-line bg-bg-soft p-6 md:p-7"
          >
            <Brackets />
            <h2 id="contact-details-title" className="type-h4">
              {contactPage.detailsTitle}
            </h2>
            <div className="mt-6">
              <ContactDetails showBooking />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
