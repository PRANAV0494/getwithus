import Image from "next/image";
import ContactDetails from "@/components/sections/ContactDetails";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { commitments } from "@/content/commitments";
import { aboutPage } from "@/content/pages";
import { team } from "@/content/team";
import type { TeamMember } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: aboutPage.title,
  description: aboutPage.description,
  path: aboutPage.path,
});

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TeamRow({ member }: { member: TeamMember }) {
  return (
    <li className="grid grid-cols-[64px_1fr] gap-5 border-t border-line py-6">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}`}
          width={64}
          height={64}
          className="size-16 rounded-card object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-16 place-items-center rounded-card bg-ink-2 type-h4 text-fog-2"
        >
          {initials(member.name)}
        </span>
      )}
      <div>
        <h3 className="type-h4">{member.name}</h3>
        <p className="type-small text-fog-2">{member.role}</p>
        <p className="mt-2 max-w-[60ch] text-fog-2">{member.bio}</p>
        {member.links?.length ? (
          <p className="mt-2 flex flex-wrap gap-x-4 type-small">
            {member.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <Section aria-labelledby="about-title" className="pb-0 md:pb-0">
        <Container>
          <h1 id="about-title" className="type-display">
            {aboutPage.title}
          </h1>
          <p className="mt-5 max-w-[68ch] type-lead text-fog-2">{aboutPage.lead}</p>
        </Container>
      </Section>
      <Section aria-labelledby="beliefs-title">
        <Container>
          <div className="grid max-w-[68ch] gap-6">
            <h2 id="beliefs-title" className="type-h2">
              {aboutPage.beliefsTitle}
            </h2>
            {commitments.map((commitment) => (
              <p key={commitment.text} className="border-l-2 border-line pl-5 text-fog">
                {commitment.text} <span className="text-fog-2">{commitment.expanded}</span>
              </p>
            ))}
          </div>
        </Container>
      </Section>
      {team.length > 0 ? (
        <Section aria-labelledby="team-title" className="pt-0 md:pt-0">
          <Container>
            <h2 id="team-title" className="type-h2">
              {aboutPage.teamTitle}
            </h2>
            <ul className="mt-8 max-w-[68ch] border-b border-line">
              {team.map((member) => (
                <TeamRow key={member.name} member={member} />
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <Section aria-labelledby="about-contact-title" className="pt-0 md:pt-0">
        <Container>
          <h2 id="about-contact-title" className="type-h2">
            {aboutPage.contactTitle}
          </h2>
          <div className="mt-8">
            <ContactDetails />
          </div>
        </Container>
      </Section>
    </>
  );
}
