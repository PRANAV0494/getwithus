import type { Metadata, Viewport } from "next";
import HybridFinal from "@/components/design-lab/HybridFinal";

export const metadata: Metadata = {
  title: "E refined: Hybrid Premium homepage",
  description:
    "An alternative GetWithUs homepage: Hybrid Premium refined with the structure of Minimal Corporate.",
};

export const viewport: Viewport = { themeColor: "#0B1631", colorScheme: "light" };

export default function HybridFinalPage() {
  return <HybridFinal />;
}
