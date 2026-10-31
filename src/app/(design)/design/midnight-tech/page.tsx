import type { Metadata, Viewport } from "next";
import MidnightTech from "@/components/design-lab/concepts/MidnightTech";

export const metadata: Metadata = {
  title: "A: Midnight Tech",
  description:
    "Design prototype A for GetWithUs: deep navy, electric blue, centered statement hero.",
};

export const viewport: Viewport = { themeColor: "#060A18", colorScheme: "dark" };

export default function MidnightTechPage() {
  return <MidnightTech />;
}
