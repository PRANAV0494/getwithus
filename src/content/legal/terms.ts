import type { LegalDocument } from "@/content/types";

export const termsOfService: LegalDocument = {
  title: "Terms and conditions",
  description:
    "The terms for using the GetwithUs website and its forms, and how they relate to the signed agreement that governs every project.",
  updated: "2026-10-31",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: "GetwithUs is a technology agency. We offer web development, app development, agentic automation including WhatsApp bots and calling agents, digital marketing, and custom software and cloud work.",
        },
        {
          type: "p",
          text: "This website is run by [OWNER: legal entity name], whose registered address is [OWNER: registered address]. In these terms, 'GetwithUs', 'we', 'us', and 'our' refer to [OWNER: legal entity name]. 'You' means anyone who uses the website.",
        },
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance",
      blocks: [
        {
          type: "p",
          text: "By using this website, you agree to these terms. If you do not agree, do not use the website.",
        },
        {
          type: "p",
          text: "If you use the website for a company or other organisation, you confirm that you are allowed to accept these terms on its behalf.",
        },
        {
          type: "p",
          text: "Our privacy policy, linked at the bottom of every page, explains how we handle the personal data you give us through the website. It is a separate document.",
        },
      ],
    },
    {
      id: "use-of-the-website",
      title: "Use of the website",
      blocks: [
        {
          type: "p",
          text: "You may use the website to learn about our services and to contact us. When you use it, you must not:",
        },
        {
          type: "ul",
          items: [
            "Break the law, or help anyone else break it.",
            "Send spam, or submit our forms automatically or in bulk.",
            "Try to get around the rate limits, the bot check, or the email verification on our forms.",
            "Submit another person's details, or an email address you do not control.",
            "Try to get into the admin area, our systems, or other people's data without permission.",
            "Send malicious code, or do anything that could disable, overload, or damage the website.",
            "Scrape the website in a way that puts heavy load on it.",
          ],
        },
        {
          type: "p",
          text: "We may limit or block access to the website or its forms for anyone who breaks these rules. We may also change, suspend, or remove any part of the website at any time.",
        },
      ],
    },
    {
      id: "submissions-through-our-forms",
      title: "Submissions through our forms",
      blocks: [
        {
          type: "p",
          text: "When you send the contact form or the project brief, you confirm that:",
        },
        {
          type: "ul",
          items: [
            "The information you give is accurate, and it is yours to share.",
            "The email address you give is one you use and can receive email at.",
            "You are at least [OWNER: minimum age, for example 16] years old.",
          ],
        },
        {
          type: "p",
          text: "Do not include passwords, payment card details, or other sensitive information in a form.",
        },
        {
          type: "p",
          text: "After you submit, we email a 6-digit code to the address you gave. The code expires after 10 minutes. Your submission reaches our team only after you enter the code and your email address is verified. If you do not verify it, the submission is not passed to our team and is deleted automatically after 7 days.",
        },
        {
          type: "p",
          text: "We aim to reply to verified submissions within [OWNER: response time]. We usually reply by email. If you gave us a phone or WhatsApp number, we may contact you there instead. We may not reply to submissions that look like spam or that break these terms.",
        },
        {
          type: "p",
          text: "Sending a form does not create a contract or oblige either side to anything. We decide which projects we take on, and we may decline any project.",
        },
      ],
    },
    {
      id: "proposals-and-project-agreements",
      title: "Proposals and project agreements",
      blocks: [
        {
          type: "p",
          text: "Nothing on this website is an offer to provide services. Descriptions of our services, our process, timelines, and any prices on the website are general information. They do not bind us or you.",
        },
        {
          type: "p",
          text: "Every project is governed by a signed scope of work or master services agreement. That agreement sets out what we deliver, the price, and the other terms of the work. A proposal or estimate becomes binding only when both sides sign the agreement it belongs to.",
        },
        {
          type: "p",
          text: "If a signed project agreement conflicts with these terms, the project agreement takes precedence. These terms cover your use of the website. The project agreement covers the work.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property in the website",
      blocks: [
        {
          type: "p",
          text: "We or our licensors own the website and its content, including the text, design, graphics, logos, and code. The GetwithUs name and logo belong to us.",
        },
        {
          type: "p",
          text: "You may view the website, save or print pages for your own reference, and share links to it. You may not copy, republish, sell, or adapt its content without our written permission. You may not use our name or logo in a way that suggests we endorse you or work with you, unless we agree to it in writing.",
        },
        {
          type: "p",
          text: "Who owns the work we create for clients is set by the project agreement, not by these terms.",
        },
      ],
    },
    {
      id: "third-party-links-and-services",
      title: "Third-party links and services",
      blocks: [
        {
          type: "p",
          text: "The website may link to other websites and services. We do not control them, and we are not responsible for their content, their availability, or how they handle your data. Their own terms and privacy policies apply.",
        },
        {
          type: "p",
          text: "Some parts of the website rely on third-party services. Resend delivers our emails, and Cloudflare Turnstile, if it is enabled, checks that a form is sent by a person. Our privacy policy lists these services and what they receive.",
        },
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      blocks: [
        {
          type: "p",
          text: "We provide the website as it is and as available. We work to keep it accurate and running, but we do not promise that it will always be available, free of errors, or free of harmful components, or that its content is complete or up to date.",
        },
        {
          type: "p",
          text: "Content on the website describes our services and how we usually work. It does not take your specific situation into account, so check with us before you rely on it for a decision.",
        },
        {
          type: "p",
          text: "To the extent the law allows, we exclude all warranties and conditions about the website that are not set out in these terms.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "Nothing in these terms limits or excludes any liability that the law does not allow us to limit or exclude, such as liability for fraud, or for death or personal injury caused by negligence.",
        },
        { type: "p", text: "Subject to that, and to the extent the law allows:" },
        {
          type: "ul",
          items: [
            "We are not liable for loss or damage that arises from your use of the website, from being unable to use it, or from relying on its content.",
            "We are not liable for indirect or consequential loss, or for loss of profit, revenue, business, data, or goodwill.",
            "We are not liable for loss caused by events outside our reasonable control, such as failures of third-party services or networks.",
          ],
        },
        {
          type: "p",
          text: "The website is free to use. Our liability for project work is set by the signed project agreement, not by these terms.",
        },
        {
          type: "p",
          text: "If you use the website as a consumer, the law where you live may give you rights that these terms cannot change.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          type: "p",
          text: "If you break these terms or the law when you use the website, and someone makes a claim against us because of it, you agree to cover the losses, damages, and reasonable costs, including reasonable legal fees, that we incur as a result. This applies to the extent the law allows.",
        },
      ],
    },
    {
      id: "governing-law-and-venue",
      title: "Governing law and venue",
      blocks: [
        {
          type: "p",
          text: "These terms, and any dispute or claim that arises from them or from your use of the website, are governed by the law of [OWNER: jurisdiction].",
        },
        {
          type: "p",
          text: "The courts of [OWNER: venue, for example a city] have exclusive jurisdiction over those disputes. If you use the website as a consumer and the law where you live lets you bring a claim in your local courts, you keep that right.",
        },
        {
          type: "p",
          text: "Before you start legal proceedings, contact us at [OWNER: hello@domain] so that we can try to resolve the issue.",
        },
        {
          type: "p",
          text: "If a court decides that any part of these terms cannot be enforced, the rest of the terms still apply.",
        },
      ],
    },
    {
      id: "changes-to-these-terms",
      title: "Changes to these terms",
      blocks: [
        {
          type: "p",
          text: "We may change these terms, for example when the website or the law changes. The last updated date on this page shows when they last changed.",
        },
        {
          type: "p",
          text: "Changes apply from the date we publish them. If you keep using the website after that, the updated terms apply to you. Changes to these terms do not change a signed project agreement.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: "For questions about these terms, email [OWNER: hello@domain].",
        },
        {
          type: "p",
          text: "You can also write to [OWNER: legal entity name] at [OWNER: registered address].",
        },
        {
          type: "p",
          text: "For questions about your personal data, read our privacy policy or email [OWNER: privacy contact email].",
        },
      ],
    },
  ],
};
