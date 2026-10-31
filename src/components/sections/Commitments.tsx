import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { commitments } from "@/content/commitments";
import { homePage } from "@/content/pages";

/** "What you can hold us to": a plain list, no cards. */
export default function Commitments() {
  return (
    <Section aria-labelledby="commitments-title" className="bg-ink pt-0 md:pt-0">
      <Container>
        <div className="max-w-[560px]">
          <h2 id="commitments-title" className="type-h2">
            {homePage.commitments.title}
          </h2>
          <ul className="mt-8 grid gap-4">
            {commitments.map((commitment) => (
              <li key={commitment.text} className="border-l-2 border-line pl-5 text-fog">
                {commitment.text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
