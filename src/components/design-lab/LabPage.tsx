import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LabPageProps = {
  concept: {
    slug: string;
    scheme: "dark" | "light" | "mixed";
    canvas: string;
    vars: Readonly<Record<`--${string}`, string>>;
  };
  /** next/font classes for the concept's families. */
  fontClassName: string;
  /** Height of the concept's sticky header, so in-page links land below it. */
  headerHeight: number;
  className?: string;
  children: ReactNode;
};

/**
 * The root of a design-lab concept: its CSS variables, fonts, and the page-level
 * settings (canvas colour, colour scheme, smooth in-page scrolling) that must sit
 * on <html>. Those go in a style element that leaves with the page.
 */
export default function LabPage({
  concept,
  fontClassName,
  headerHeight,
  className,
  children,
}: LabPageProps) {
  const scheme = concept.scheme === "light" ? "light" : "dark";
  const htmlRules = `html{background-color:${concept.canvas};color-scheme:${scheme};scroll-padding-top:${headerHeight + 16}px}@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}`;
  return (
    <div
      data-lab={concept.slug}
      className={cn("min-h-svh", fontClassName, className)}
      style={concept.vars as CSSProperties}
    >
      <style>{htmlRules}</style>
      {children}
    </div>
  );
}
