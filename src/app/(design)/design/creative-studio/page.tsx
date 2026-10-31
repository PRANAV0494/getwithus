import type { Metadata, Viewport } from "next";
import CreativeStudio from "@/components/design-lab/concepts/CreativeStudio";

export const metadata: Metadata = {
  title: "C: Creative Digital Studio",
  description:
    "Design prototype C for GetWithUs: black and paper, oversized type, lime highlights.",
};

export const viewport: Viewport = { themeColor: "#0B0B0A", colorScheme: "dark" };

export default function CreativeStudioPage() {
  return <CreativeStudio />;
}
