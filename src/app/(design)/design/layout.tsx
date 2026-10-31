import type { Metadata } from "next";
import "@/styles/design-lab.css";

/**
 * The design lab: five isolated website directions and the gallery that compares
 * them. Static, never indexed, and not linked from the production site.
 */
export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: { default: "Design lab", template: "%s | GetWithUs design lab" },
  robots: { index: false, follow: false },
};

export default function DesignLabLayout({ children }: LayoutProps<"/design">) {
  return children;
}
