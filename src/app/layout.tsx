import type { Metadata, Viewport } from "next";
import { Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import "@/styles/globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-schibsted",
});

// Geist Mono is used only for identifiers in the admin area; it is not preloaded on public pages.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: software your business runs on`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0E13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // [OWNER: change lang if the primary language of the site is not English]
  return (
    <html lang="en" className={`${schibsted.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
