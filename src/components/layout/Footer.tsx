import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { site, visibleNav } from "@/config/site";
import { serviceLines } from "@/content/services/catalog";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

const linkClasses = "link-draw text-fog-2 transition-colors duration-150 ease-out hover:text-fog";
const headingClasses = "mb-4 type-label text-fog-3";

/** Site footer: brand, tagline, and contact details, then service, company, and legal links under monospaced titles. */
export default function Footer() {
  const companyLinks = [
    ...visibleNav(getPublishedCaseStudies().length > 0),
    { label: "Start a project", href: "/start" },
  ];

  return (
    <footer className="border-t border-line bg-ink-0 pt-16 pb-8 text-fog-2">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="grid content-start gap-4">
            <Logo />
            <p className="font-medium text-fog">{site.tagline}</p>
            <p className="max-w-[36ch]">{site.footerDescription}</p>
            <address className="grid gap-1 type-small not-italic">
              <a href={`mailto:${site.contact.email}`} className={linkClasses}>
                {site.contact.email}
              </a>
              <span>{site.contact.phone}</span>
              <span>{site.contact.city}</span>
            </address>
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
                    <ul className="mt-2 grid gap-2 pl-3.5">
                      {service.children.map((child) => (
                        <li key={child.slug}>
                          <Link href={child.href} className={linkClasses}>
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
        <p className="mt-12 border-t border-line pt-6 type-small text-fog-3">
          © {site.copyrightYear} {site.legalEntity}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
