import Image from "next/image";
import ContactDetails from "@/components/sections/ContactDetails";
import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
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
          className="size-16 border border-line object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-16 place-items-center border border-line bg-card font-mono text-body"
        >
          {initials(member.name)}
        </span>
      )}
      <div>
        <h3 className="type-h4">{member.name}</h3>
        <p className="type-label text-muted">{member.role}</p>
        <p className="mt-2 max-w-[60ch] text-body">{member.bio}</p>
        {member.links?.length ? (
          <p className="mt-2 flex flex-wrap gap-x-4 type-small">
            {member.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-draw text-accent transition-colors duration-150 ease-out hover:text-accent"
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
      <PageHeader id="about-title" label="about" title={aboutPage.title} lead={aboutPage.lead} />
      <Section aria-labelledby="beliefs-title">
        <Container>
          <SectionHeading
            id="beliefs-title"
            index="01"
            label="beliefs"
            title={aboutPage.beliefsTitle}
          />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
            {commitments.map((commitment, position) => (
              <li key={commitment.text} className="reveal bg-bg-soft p-6 md:p-7">
                <p className="type-label text-accent">
                  commit_{String(position + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 type-h4">{commitment.text}</p>
                <p className="mt-2 text-body">{commitment.expanded}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      {team.length > 0 ? (
        <Section aria-labelledby="team-title" className="pt-0 md:pt-0">
          <Container>
            <SectionHeading id="team-title" index="02" label="team" title={aboutPage.teamTitle} />
            <ul className="mt-10 max-w-[72ch] border-b border-line md:ml-[224px]">
              {team.map((member) => (
                <TeamRow key={member.name} member={member} />
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <Section aria-labelledby="about-contact-title" className="pt-0 md:pt-0">
        <Container>
          <SectionHeading
            id="about-contact-title"
            index={team.length > 0 ? "03" : "02"}
            label="contact"
            title={aboutPage.contactTitle}
          />
          <div className="reveal mt-10 md:ml-[224px]">
            <ContactDetails />
          </div>
        </Container>
      </Section>
    </>
  );
}
