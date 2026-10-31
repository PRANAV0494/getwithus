import type { Metadata, Viewport } from "next";
import HybridPremium from "@/components/design-lab/concepts/HybridPremium";

export const metadata: Metadata = {
  title: "E: Hybrid Premium",
  description:
    "Design prototype E for GetWithUs: navy bands, warm white pages, serif display, electric blue.",
};

export const viewport: Viewport = { themeColor: "#0B1631", colorScheme: "light" };

export default function HybridPremiumPage() {
  return <HybridPremium />;
}
