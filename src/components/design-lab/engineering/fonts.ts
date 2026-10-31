import { Archivo, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/cn";

/* The two families of the engineering system. Imported only by the routes that use them. */

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--lab-font-body",
  display: "swap",
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--lab-font-mono",
  display: "swap",
});

export const engineeringFonts = cn(
  archivo.variable,
  jetbrains.variable,
  "font-(family-name:--lab-font-body)",
);
