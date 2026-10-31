import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import SkipLink from "@/components/layout/SkipLink";
import Toast from "@/components/ui/Toast";
import { site } from "@/config/site";
import "@/styles/globals.css";

// Archivo carries every word people read; the width axis gives headings their 92% width.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

// JetBrains Mono is only for small labels, ids, and specifications (and identifiers in the admin).
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-jetbrains",
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
  themeColor: "#0F1113",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // [OWNER: change lang if the primary language of the site is not English]
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <SkipLink />
        {children}
        <Toast />
      </body>
    </html>
  );
}
