import type { LegalDocument } from "@/content/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  description:
    "What GetWithUs collects through its contact form and project brief, why, who receives it, how long we keep it, and how to use your rights.",
  updated: "2026-10-31",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "p",
          text: "GetWithUs is a technology agency. We build websites and mobile apps, set up agentic automation such as WhatsApp bots and calling agents, run digital marketing, and build custom software and cloud systems.",
        },
        {
          type: "p",
          text: "This website is run by [OWNER: legal entity name], whose registered address is [OWNER: registered address]. In this policy, 'GetWithUs', 'we', 'us', and 'our' refer to [OWNER: legal entity name].",
        },
        {
          type: "p",
          text: "We decide why and how the personal data described in this policy is processed, which makes us the controller of that data. You can reach us about anything in this policy at [OWNER: privacy contact email].",
        },
      ],
    },
    {
      id: "what-this-policy-covers",
      title: "What this policy covers",
      blocks: [
        {
          type: "p",
          text: "This policy covers the personal data we collect through this website: the contact form, the project brief at /start, the email verification step that follows both forms, and the admin area our team uses to read submissions.",
        },
        {
          type: "p",
          text: "It does not cover personal data we handle for clients under a project agreement. For example, when a WhatsApp bot or calling agent we build talks to a client's customers, the client decides how that data is used. That processing is covered by our agreement with the client and by the client's own privacy notice.",
        },
        {
          type: "p",
          text: "It also does not cover other websites we link to. Those sites have their own policies.",
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "Data we collect",
      blocks: [
        {
          type: "p",
          text: "We collect what you type into our forms, a small amount of technical data sent with each submission, and, for our own team members, what is needed to sign in to the admin area.",
        },
        { type: "p", text: "The contact form asks for:" },
        {
          type: "ul",
          items: [
            "Your name.",
            "Your work email address.",
            "Your company, if you give it.",
            "The services you are interested in, if you choose any. The choices are web development, app development, agentic automation, digital marketing, and custom software and cloud.",
            "Your message, which must be 20 to 2,000 characters long.",
          ],
        },
        {
          type: "p",
          text: "The contact form also contains a hidden field that people never see. It is there to catch automated spam: a person leaves it empty, while many bots fill it in. It does not collect anything about you.",
        },
        { type: "p", text: "The project brief at /start is a five-step form. It asks for:" },
        {
          type: "ul",
          items: [
            "The services you need.",
            "A description of your project.",
            "The address of your existing website or app, if you have one.",
            "Your budget range.",
            "Your timeline.",
            "Your name and work email address.",
            "Your company, if you give it.",
            "A phone or WhatsApp number, if you give one.",
            "How you heard about us, if you tell us. This is a free text field.",
          ],
        },
        {
          type: "p",
          text: "While you fill in the brief, your draft answers are kept in your browser's session storage so that refreshing the page does not lose them. Session storage is not a cookie. The draft is cleared when you confirm the brief or close the tab.",
        },
        { type: "p", text: "With each submission from either form, we also receive:" },
        {
          type: "ul",
          items: [
            "A hash of your IP address. We combine the address with a salt, a value that changes every day, and store only the resulting hash. We use it for rate limiting and to prevent abuse. We do not store your raw IP address.",
            "Your browser's user agent, which describes the browser and operating system you use.",
            "Your browser's language setting.",
            "Campaign parameters (UTM parameters), if the link that brought you to the site had them. They show, for example, which campaign or newsletter a link came from.",
            "Whether a bot check passed.",
          ],
        },
        {
          type: "p",
          text: "After you submit either form, we email you a 6-digit code. We keep a keyed hash of that code, never the code itself, together with the details needed to enforce its limits. The section on email verification explains how this works.",
        },
        {
          type: "p",
          text: "For team members who use the admin area, we keep their email address, their name, and records of their sign-in sessions.",
        },
      ],
    },
    {
      id: "why-we-collect-it",
      title: "Why we collect it and the legal basis",
      blocks: [
        {
          type: "p",
          text: "The data protection law of [OWNER: jurisdiction] applies to how we handle your data. We use your data only for the purposes below, and for each one we name the legal basis we rely on.",
        },
        {
          type: "ul",
          items: [
            "To answer your inquiry or brief, to contact you about it by email, or by phone or WhatsApp if you gave us a number, and to prepare a proposal if you asked for one. You ask us to do this, so the basis is taking steps at your request before entering into a contract.",
            "To verify your email address before a submission reaches our team, so that we reply to the person who wrote and not to someone whose address was typed in by another person. The basis is taking steps at your request before a contract, and our legitimate interest in preventing abuse.",
            "To keep the forms working and stop spam and abuse, using the hashed IP address, the hidden field, the bot check, and rate limits. The basis is our legitimate interest in keeping the website and our systems secure.",
            "To understand where inquiries come from and the context in which they were sent, using the user agent, browser language, UTM parameters, and your answer to how you heard about us. The basis is our legitimate interest in running and improving our business.",
            "To let team members sign in to the admin area and keep a record of their sessions. The basis is our legitimate interest in running our business and keeping submissions secure.",
            "To keep records or disclose information when a law requires it, for example tax and accounting rules or a valid order from a court or authority. The basis is compliance with a legal obligation, where such an obligation applies.",
          ],
        },
        {
          type: "p",
          text: "Where we rely on legitimate interests, you can object to the processing. The section on your rights explains how.",
        },
      ],
    },
    {
      id: "email-verification",
      title: "Email verification and how codes are stored",
      blocks: [
        {
          type: "p",
          text: "After you submit the contact form or the project brief, we send a 6-digit code to the email address you gave. Your submission is not passed to our team until you enter the code and your email address is verified.",
        },
        { type: "p", text: "The code is stored and limited as follows:" },
        {
          type: "ul",
          items: [
            "We never store the code in plain text. We store only a keyed hash of it (HMAC-SHA256), which lets us check the code you enter without keeping the code itself.",
            "A code expires 10 minutes after it is sent.",
            "Each code allows at most 5 attempts.",
            "You can request a new code after 60 seconds, and at most 3 times per hour.",
            "Verification records that have been used or have expired are deleted after 1 day.",
          ],
        },
        {
          type: "p",
          text: "If you do not verify your email address, the submission is never passed to our team, and it is deleted automatically after 7 days.",
        },
        {
          type: "p",
          text: "The email with the code is sent through Resend, our email delivery provider.",
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      blocks: [
        {
          type: "p",
          text: "We measure visits to the public site with [OWNER: Plausible or none], a cookieless analytics tool. It does not set cookies or store identifiers on your device.",
        },
        {
          type: "p",
          text: "We do not use advertising cookies. There are no third-party trackers on the public site, such as advertising pixels or social media tracking scripts.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "The public site sets no cookies. The draft answers in the project brief are kept in session storage, which is not a cookie and is cleared when you confirm the brief or close the tab.",
        },
        {
          type: "p",
          text: "The admin area is used only by our team. When a team member signs in, it sets these essential cookies:",
        },
        {
          type: "ul",
          items: [
            "A session cookie that keeps the team member signed in for 7 days. It is HttpOnly, so scripts on the page cannot read it. In production it is Secure, so it is sent only over encrypted connections. It is SameSite=Lax, which limits when it is sent with requests that start on other sites.",
            "Short-lived security cookies used during sign-in.",
          ],
        },
        {
          type: "p",
          text: "Team members sign in with a one-time link sent to their email address. Only addresses on our team allowlist can sign in. These cookies are needed for sign-in to work and are not used for anything else.",
        },
      ],
    },
    {
      id: "who-we-share-data-with",
      title: "Who we share data with",
      blocks: [
        {
          type: "p",
          text: "We do not sell your data, and we do not share it with advertising networks. We share it only with the service providers below, which process it to run the website and our inquiry process.",
        },
        {
          type: "ul",
          items: [
            "Resend, for email delivery. Resend sends the verification code, the confirmation email to you after you write to us, and the notification email to our team.",
            "[OWNER: hosting provider, for example Vercel], which hosts the website and runs the code that receives your submission.",
            "[OWNER: database provider, for example Neon], which stores submissions, verification records, rate-limit records, and admin accounts.",
            "Slack and WhatsApp, if we have turned these notifications on. We use them only to notify our own team about a new inquiry. A notification contains your name, your company, and the services you asked about. WhatsApp notifications are sent through Meta's WhatsApp Business Platform.",
            "Cloudflare Turnstile, if it is enabled. Turnstile is a bot check that processes browser and device signals to tell people apart from automated traffic.",
          ],
        },
        {
          type: "p",
          text: "We may also disclose data when the law requires it, for example in response to a valid order from a court or authority.",
        },
      ],
    },
    {
      id: "international-transfers",
      title: "International transfers",
      blocks: [
        {
          type: "p",
          text: "Our providers may process your data outside the country where you live. Our hosting and database run in [OWNER: data processing regions], and email delivery, notifications, and the bot check may use servers in other countries.",
        },
        {
          type: "p",
          text: "When data moves to a country whose law does not protect it to the same standard as the law where you live, we rely on safeguards that the law recognizes. These include standard contractual clauses where the law requires them, or a decision by the relevant authority that the destination country protects personal data adequately.",
        },
        {
          type: "p",
          text: "You can ask for more information about these safeguards at [OWNER: privacy contact email].",
        },
      ],
    },
    {
      id: "how-long-we-keep-data",
      title: "How long we keep data",
      blocks: [
        {
          type: "ul",
          items: [
            "Draft answers in the project brief stay only in your browser's session storage and are cleared when you confirm the brief or close the tab.",
            "Submissions that are never verified are deleted automatically after 7 days.",
            "Verification records that have been used or have expired are deleted after 1 day.",
            "Rate-limit records are deleted after 24 hours.",
            "Verified inquiries and briefs are kept until the inquiry is closed, plus [OWNER: retention period]. After that, we delete them.",
            "Admin sign-in sessions expire after 7 days.",
          ],
        },
        {
          type: "p",
          text: "If you become a client, the records for your project are kept as set out in the project agreement and for as long as tax, accounting, or other laws require.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights and how to exercise them",
      blocks: [
        {
          type: "p",
          text: "Depending on the law that applies to you, you have the right to:",
        },
        {
          type: "ul",
          items: [
            "Access the personal data we hold about you and get a copy of it.",
            "Correct data that is wrong or incomplete.",
            "Have your data deleted.",
            "Object to processing that is based on our legitimate interests.",
            "Restrict processing, for example while we check a correction you asked for.",
            "Receive the data you gave us in a structured, machine-readable format, and have it sent to another organization.",
            "Withdraw your consent at any time, where consent is the basis for processing. Withdrawing consent does not affect processing that took place before.",
            "Complain to a data protection supervisory authority, either where you live or work or in [OWNER: jurisdiction].",
          ],
        },
        {
          type: "p",
          text: "To use any of these rights, email [OWNER: privacy contact email]. Tell us which right you want to use and which email address you gave on our forms.",
        },
        {
          type: "p",
          text: "We may need to confirm your identity before we act on a request, for example by asking you to reply from the email address you used. This stops other people from getting or changing your data.",
        },
        {
          type: "p",
          text: "We reply within the time the applicable law sets. Some rights have limits. For example, we may keep data that a law requires us to hold. If we cannot do what you ask, we tell you why.",
        },
      ],
    },
    {
      id: "security-measures",
      title: "Security measures",
      blocks: [
        { type: "p", text: "We protect your data with these measures:" },
        {
          type: "ul",
          items: [
            "The website uses encrypted connections (HTTPS).",
            "Verification codes and IP addresses are stored only as hashes, never in plain text.",
            "Only team members whose email address is on our allowlist can sign in to the admin area, using a one-time link sent to that address.",
            "Access to the database is limited by access controls.",
            "Client email addresses are masked in our application logs.",
            "Every form has rate limits, which slow down automated abuse.",
          ],
        },
        {
          type: "p",
          text: "No system is completely secure. If a breach affects your personal data, we will tell you and the relevant authority where the law requires it.",
        },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          type: "p",
          text: "This website and our services are meant for businesses and the people who act for them. They are not directed at children. You must be at least [OWNER: minimum age, for example 16] years old to submit our forms.",
        },
        {
          type: "p",
          text: "We do not knowingly collect data from anyone under that age. If you believe a child has sent us their data, email [OWNER: privacy contact email] and we will delete it.",
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We update this policy when our data flows, our providers, or the law change. The last updated date on this page shows when it last changed.",
        },
        {
          type: "p",
          text: "If we make a significant change, we say so on this page. Where the law requires it, we also contact you by email.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: "For questions about this policy or your personal data, email [OWNER: privacy contact email].",
        },
        {
          type: "p",
          text: "You can also write to [OWNER: legal entity name] at [OWNER: registered address].",
        },
      ],
    },
  ],
};
