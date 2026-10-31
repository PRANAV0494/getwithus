import type { Metadata, Viewport } from "next";
import SystemReference from "@/components/design-lab/SystemReference";

export const metadata: Metadata = {
  title: "Design system",
  description: "Colour, type, spacing, components, and motion for the refined GetWithUs design.",
};

export const viewport: Viewport = { themeColor: "#0B1631", colorScheme: "light" };

export default function SystemPage() {
  return <SystemReference />;
}
