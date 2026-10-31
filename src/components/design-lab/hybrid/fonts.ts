import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/cn";

/* The two families of the design system. Imported only by the routes that use them. */

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--lab-font-display",
  display: "swap",
});

const text = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--lab-font-body",
  display: "swap",
});

export const systemFonts = cn(
  display.variable,
  text.variable,
  "font-(family-name:--lab-font-body)",
);
