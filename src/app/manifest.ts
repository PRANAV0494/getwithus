import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const INK = "#0F1113";
const SIGNAL = "#2CD5E6";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.footerDescription,
    start_url: "/",
    display: "standalone",
    background_color: INK,
    theme_color: SIGNAL,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
