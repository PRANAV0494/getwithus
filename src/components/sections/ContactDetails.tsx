import Button from "@/components/ui/Button";
import { site } from "@/config/site";
import { contactPage } from "@/content/pages";

const linkClasses = "text-ink transition-colors duration-150 ease-out hover:text-accent";

/** Email, phone and WhatsApp, office, and (when configured) a scheduling link. */
export default function ContactDetails({ showBooking = false }: { showBooking?: boolean }) {
  return (
    <address className="grid gap-5 not-italic">
      <div>
        <p className="type-label text-muted">Email</p>
        <a href={`mailto:${site.contact.email}`} className={linkClasses}>
          {site.contact.email}
        </a>
      </div>
      <div>
        <p className="type-label text-muted">Phone and WhatsApp</p>
        <p className="text-ink">{site.contact.phone}</p>
      </div>
      <div>
        <p className="type-label text-muted">Office</p>
        <p className="text-ink">{site.contact.address}</p>
      </div>
      {showBooking && site.schedulingUrl ? (
        <div>
          <Button
            href={site.schedulingUrl}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactPage.bookCall}
          </Button>
        </div>
      ) : null}
    </address>
  );
}
