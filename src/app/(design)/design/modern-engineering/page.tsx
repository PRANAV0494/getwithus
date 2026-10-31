import type { Metadata, Viewport } from "next";
import ModernEngineering from "@/components/design-lab/concepts/ModernEngineering";

export const metadata: Metadata = {
  title: "D: Modern Engineering",
  description:
    "Design prototype D for GetWithUs: graphite, cyan, a visible grid, and a live system diagram.",
};

export const viewport: Viewport = { themeColor: "#0F1113", colorScheme: "dark" };

export default function ModernEngineeringPage() {
  return <ModernEngineering />;
}
