import type { Metadata, Viewport } from "next";
import EngineeringSystemReference from "@/components/design-lab/EngineeringSystemReference";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Colour, type, spacing, components, and motion for the selected Modern Engineering design.",
};

export const viewport: Viewport = { themeColor: "#0F1113", colorScheme: "dark" };

export default function SystemPage() {
  return <EngineeringSystemReference />;
}
