import DeferredForm from "@/components/forms/DeferredForm";
import FormPreview from "@/components/forms/FormPreview";
import ContactDetails, { hasContactDetails } from "@/components/sections/ContactDetails";
import PageHero from "@/components/sections/PageHero";
import ModelStill from "@/components/three/ModelStill";
import WebGLModel from "@/components/three/WebGLModel";
import Container from "@/components/ui/Container";
import { contactPage } from "@/content/pages";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: contactPage.title,
  description: contactPage.description,
  path: contactPage.path,
});

/** /contact: the paper plane around the envelope, the contact form, and the other ways to reach us once known. */
export default function ContactPage() {
  const details = hasContactDetails(true);
  return (
    <>
      <PageHero
        id="contact-title"
        title={contactPage.title}
        lead={contactPage.lead}
        crumbs={[
          { name: "Home", path: "/" },
          { name: contactPage.title, path: contactPage.path },
        ]}
        visual={<WebGLModel model="paper-plane" still={<ModelStill model="paper-plane" />} />}
      />
      <section aria-label="Contact form" className="py-16 md:py-20">
        <Container
          className={cn(
            "grid items-start gap-10",
            details && "lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:gap-14",
          )}
        >
          <div
            className={cn(
              "rounded-panel border border-line bg-card p-6 shadow-soft md:p-10",
              !details && "mx-auto w-full max-w-[720px]",
            )}
          >
            <DeferredForm form="contact">
              <FormPreview form="contact" />
            </DeferredForm>
          </div>
          {details ? (
            <aside
              aria-labelledby="contact-details-title"
              className="rounded-card border border-line bg-bg-soft p-7"
            >
              <h2 id="contact-details-title" className="type-h4 text-ink">
                {contactPage.detailsTitle}
              </h2>
              <div className="mt-6">
                <ContactDetails showBooking />
              </div>
            </aside>
          ) : null}
        </Container>
      </section>
    </>
  );
}
