import type { Metadata, Viewport } from "next";
import HybridSystemReference from "@/components/design-lab/HybridSystemReference";

export const metadata: Metadata = {
  title: "Hybrid Premium design system",
  description: "Colour, type, spacing, components, and motion for the Hybrid Premium alternative.",
};

export const viewport: Viewport = { themeColor: "#0B1631", colorScheme: "light" };

export default function HybridSystemPage() {
  return <HybridSystemReference />;
}
