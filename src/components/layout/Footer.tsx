import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { known, site, visibleNav } from "@/config/site";
import { serviceLines } from "@/content/services/catalog";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

const linkClasses = "link-draw text-body transition-colors duration-150 ease-out hover:text-ink";
const subLinkClasses =
  "link-draw text-[0.8125rem] text-muted transition-colors duration-150 ease-out hover:text-ink";
const headingClasses = "mb-4 type-label text-muted";

/** Site footer: brand, tagline, and contact details, then service, company, and legal links under monospaced titles. */
export default function Footer() {
  const email = known(site.contact.email);
  const phone = known(site.contact.phone);
  const city = known(site.contact.city);
  const owner = known(site.legalEntity) ?? site.name;
  const companyLinks = [
    ...visibleNav(getPublishedCaseStudies().length > 0),
    { label: "Start a project", href: "/start" },
  ];

  return (
    <footer className="border-t border-line bg-bg-soft pt-16 pb-8 text-body">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="grid content-start gap-4">
            <Logo />
            <p className="font-medium text-ink">{site.tagline}</p>
            <p className="max-w-[36ch]">{site.footerDescription}</p>
            {email || phone || city ? (
              <address className="grid gap-1 type-small not-italic">
                {email ? (
                  <a href={`mailto:${email}`} className={linkClasses}>
                    {email}
                  </a>
                ) : null}
                {phone ? <span>{phone}</span> : null}
                {city ? <span>{city}</span> : null}
              </address>
            ) : null}
          </div>
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className={headingClasses}>
              Services
            </h2>
            <ul className="grid gap-2 type-small">
              {serviceLines.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} className={linkClasses}>
                    {service.name}
                  </Link>
                  {service.children?.length ? (
                    <ul
                      aria-label={`${service.name} products`}
                      className="mt-2 ml-1 grid gap-1.5 border-l border-line pl-3"
                    >
                      {service.children.map((child) => (
                        <li key={child.slug}>
                          <Link href={child.href} className={subLinkClasses}>
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={headingClasses}>
              Company
            </h2>
            <ul className="grid gap-2 type-small">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className={headingClasses}>
              Legal
            </h2>
            <ul className="grid gap-2 type-small">
              <li>
                <Link href="/privacy" className={linkClasses}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClasses}>
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-line pt-6 type-small text-muted">
          © {site.copyrightYear} {owner}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
