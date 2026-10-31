import DeferredForm from "@/components/forms/DeferredForm";
import FormPreview from "@/components/forms/FormPreview";
import ContactDetails from "@/components/sections/ContactDetails";
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
    <Section aria-labelledby="contact-title">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h1 id="contact-title" className="type-display">
            {contactPage.title}
          </h1>
          <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{contactPage.lead}</p>
          <div className="mt-10">
            <DeferredForm form="contact">
              <FormPreview form="contact" />
            </DeferredForm>
          </div>
        </div>
        <aside aria-labelledby="contact-details-title" className="lg:pt-3">
          <h2 id="contact-details-title" className="type-h4">
            {contactPage.detailsTitle}
          </h2>
          <div className="mt-6">
            <ContactDetails showBooking />
          </div>
        </aside>
      </Container>
    </Section>
  );
}
