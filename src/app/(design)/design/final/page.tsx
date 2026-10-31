import type { Metadata, Viewport } from "next";
import FinalHomepage from "@/components/design-lab/FinalHomepage";

export const metadata: Metadata = {
  title: "Final: refined homepage",
  description:
    "The recommended GetWithUs homepage: Hybrid Premium refined with the structure of Minimal Corporate.",
};

export const viewport: Viewport = { themeColor: "#0B1631", colorScheme: "light" };

export default function FinalPage() {
  return <FinalHomepage />;
}
