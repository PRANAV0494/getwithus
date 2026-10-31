import type { Metadata } from "next";
import DesignLabGallery from "@/components/design-lab/gallery/DesignLabGallery";

export const metadata: Metadata = {
  title: { absolute: "Design lab | GetWithUs" },
  description: "Five design directions for GetWithUs, compared, scored, and refined.",
};

export default function DesignLabPage() {
  return <DesignLabGallery />;
}
