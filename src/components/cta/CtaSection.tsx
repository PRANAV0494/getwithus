import type { ComponentProps } from "react";
import type TerminalCta from "@/components/cta/TerminalCta";
import TerminalCtaLazy from "@/components/cta/TerminalCtaLazy";
import ClosingCta from "@/components/sections/ClosingCta";
import { RESPONSE_TIME } from "@/config/site";

/**
 * The home page's closing band: "Tell us what you need" with the terminal form
 * in its right column. The terminal stays wired to `submitBrief`, which only
 * logs the brief until the owner connects it (docs/build-final-plan.md,
 * decision 5).
 */
export default function CtaSection({
  action,
}: {
  action: ComponentProps<typeof TerminalCta>["action"];
}) {
  return <ClosingCta terminal={<TerminalCtaLazy action={action} responseTime={RESPONSE_TIME} />} />;
}
