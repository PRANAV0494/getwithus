import type { Metadata, Viewport } from "next";
import EngineeringFinal from "@/components/design-lab/EngineeringFinal";

export const metadata: Metadata = {
  title: "Final: Modern Engineering",
  description:
    "The selected GetWithUs homepage: Modern Engineering, refined for reading, conversion, and speed.",
};

export const viewport: Viewport = { themeColor: "#0F1113", colorScheme: "dark" };

export default function FinalPage() {
  return <EngineeringFinal />;
}
