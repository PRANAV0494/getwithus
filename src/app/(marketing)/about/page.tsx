import { FileCheck, KeyRound, LockOpen, MonitorPlay } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/motion/MagneticButton";
import RevealText from "@/components/motion/RevealText";
import ClosingCta from "@/components/sections/ClosingCta";
import ContactDetails, { hasContactDetails } from "@/components/sections/ContactDetails";
import PageHero from "@/components/sections/PageHero";
import ModelStill from "@/components/three/ModelStill";
import WebGLModel from "@/components/three/WebGLModel";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SectionIntro from "@/components/ui/SectionIntro";
import { known } from "@/config/site";
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

const ICONS = [FileCheck, KeyRound, MonitorPlay, LockOpen];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <li className="flex gap-5 rounded-card border border-line bg-card p-6 shadow-soft">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}`}
          width={72}
          height={72}
          className="size-[72px] rounded-[18px] object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-[72px] shrink-0 place-items-center rounded-[18px] bg-accent-soft font-display text-xl font-extrabold text-accent"
        >
          {initials(member.name)}
        </span>
      )}
      <div>
        <h3 className="type-h4 text-ink">{member.name}</h3>
        <p className="text-sm font-semibold text-muted">{member.role}</p>
        <p className="mt-2 text-body">{member.bio}</p>
        {member.links?.length ? (
          <p className="mt-2 flex flex-wrap gap-x-4 type-small">
            {member.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-draw font-semibold text-accent"
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

/** /about: the "g" cube with the commitment words orbiting, what we believe, the team when there is one, and contact facts once known. */
export default function AboutPage() {
  const lead = known(aboutPage.lead) ?? aboutPage.leadFallback;
  return (
    <>
      <PageHero
        id="about-title"
        title={aboutPage.title}
        lead={lead}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: aboutPage.path },
        ]}
        actions={
          <MagneticButton>
            <Button href="/start" size="lg">
              Start a project
            </Button>
          </MagneticButton>
        }
        visual={<WebGLModel model="about-cube" still={<ModelStill model="about-cube" />} />}
      />
      <section aria-labelledby="beliefs-title" className="py-20 md:py-24">
        <Container>
          <SectionIntro id="beliefs-title" title={aboutPage.beliefsTitle} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {commitments.map((commitment, position) => {
              const CommitIcon = ICONS[position] ?? FileCheck;
              return (
                <li
                  key={commitment.text}
                  className="rounded-card border border-line bg-card p-7 shadow-soft md:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-[14px] bg-accent-soft text-accent">
                    <Icon icon={CommitIcon} size={24} />
                  </span>
                  <p className="mt-5 type-lead font-semibold text-ink">{commitment.text}</p>
                  <RevealText as="p" text={commitment.expanded} className="mt-2 text-body" />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      {team.length > 0 ? (
        <section
          aria-labelledby="team-title"
          className="border-t border-line bg-bg-soft py-20 md:py-24"
        >
          <Container>
            <SectionIntro id="team-title" title={aboutPage.teamTitle} align="left" />
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      {hasContactDetails() ? (
        <section
          aria-labelledby="about-contact-title"
          className="border-t border-line py-20 md:py-24"
        >
          <Container>
            <SectionIntro id="about-contact-title" title={aboutPage.contactTitle} align="left" />
            <div className="mt-10 max-w-xl">
              <ContactDetails />
            </div>
          </Container>
        </section>
      ) : null}
      <ClosingCta />
    </>
  );
}
