import type { Metadata, Viewport } from "next";
import MinimalCorporate from "@/components/design-lab/concepts/MinimalCorporate";

export const metadata: Metadata = {
  title: "B: Minimal Corporate",
  description:
    "Design prototype B for GetWithUs: white and off-white, charcoal type, royal blue, enterprise clarity.",
};

export const viewport: Viewport = { themeColor: "#FFFFFF", colorScheme: "light" };

export default function MinimalCorporatePage() {
  return <MinimalCorporate />;
}
