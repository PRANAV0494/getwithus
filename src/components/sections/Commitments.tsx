import ScrambleText from "@/components/motion/ScrambleText";
import TiltCard from "@/components/motion/TiltCard";
import Brackets from "@/components/ui/Brackets";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { commitments } from "@/content/commitments";
import { homePage } from "@/content/pages";

/**
 * "What you can hold us to": the commitments as four tilting cards, each with a
 * large outlined number standing forward of the card and its text forward of
 * the surface, so the tilt reads as depth.
 */
export default function Commitments({ index }: { index?: string }) {
  return (
    <Section aria-labelledby="commitments-title" className="border-y border-line bg-bg-soft/80">
      <Container>
        <SectionHeading
          id="commitments-title"
          index={index}
          label="commitments"
          title={homePage.commitments.title}
        />
        <ul className="mt-12 grid gap-5 [perspective:1200px] sm:grid-cols-2">
          {commitments.map((commitment, position) => {
            const number = String(position + 1).padStart(2, "0");
            return (
              <li key={commitment.text} className="reveal">
                <TiltCard
                  maxDeg={4}
                  className="h-full min-h-[200px] border border-line bg-card px-9 py-[34px] hover:border-line-2 hover:bg-card-2"
                >
                  <Brackets spread />
                  <span
                    aria-hidden="true"
                    className="ghost-number pointer-events-none absolute top-2.5 right-[26px] text-[96px] leading-none font-bold tracking-[-0.06em] text-transparent select-none"
                  >
                    {number}
                  </span>
                  <ScrambleText text={`commit_${number}`} className="type-label text-accent" />
                  <p className="relative mt-4 max-w-[30ch] [transform:translateZ(20px)] type-lead text-ink">
                    {commitment.text}
                  </p>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
