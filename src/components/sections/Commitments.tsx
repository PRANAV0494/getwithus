import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { commitments } from "@/content/commitments";
import { homePage } from "@/content/pages";

/** "What you can hold us to": the commitments as a datasheet, one cell each. */
export default function Commitments({ index }: { index?: string }) {
  return (
    <Section aria-labelledby="commitments-title" className="border-y border-line bg-ink-1/80">
      <Container>
        <SectionHeading
          id="commitments-title"
          index={index}
          label="commitments"
          title={homePage.commitments.title}
        />
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {commitments.map((commitment, position) => (
            <li key={commitment.text} className="reveal bg-ink p-6 md:p-7">
              <p className="type-label text-signal">
                commit_{String(position + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 type-lead text-fog">{commitment.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
