import { site } from "@/config/site";
import type { FaqItem, ServicePage } from "@/content/types";
import { absoluteUrl } from "@/lib/seo";

type Thing = { "@context"?: "https://schema.org"; "@type": string } & Record<string, unknown>;

export type JsonLdData = Thing | readonly Thing[];

/** The organization behind the site. `sameAs` lists only real profiles from site config. */
export function organizationJsonLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalEntity,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.contact.email,
      telephone: site.contact.phone,
    },
    ...(site.social.length ? { sameAs: site.social.map((link) => link.href) } : {}),
  };
}

/** The website itself. */
export function websiteJsonLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

/** A service page, offered by the organization. */
export function serviceJsonLd(page: ServicePage): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.summary,
    url: absoluteUrl(page.href),
    serviceType: page.name,
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };
}

/** FAQPage built from the same question list the page renders. */
export function faqJsonLd(faqs: readonly FaqItem[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Breadcrumbs for nested pages. The first item should be the home page. */
export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
