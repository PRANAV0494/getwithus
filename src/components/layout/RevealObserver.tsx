"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Section reveals. Blocks marked `.reveal` that start below the fold fade up once
 * as they enter; anything already on screen when the page opens is left alone.
 * So nothing visible is ever hidden, no text rests half faded, and without
 * JavaScript or under reduced motion every block simply shows. The styles are
 * in globals.css.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-enter", "shown");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    for (const element of document.querySelectorAll<HTMLElement>(".reveal")) {
      const state = element.getAttribute("data-enter");
      if (state === "shown" || state === "static") continue;
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.setAttribute("data-enter", "static");
      } else {
        element.setAttribute("data-enter", "waiting");
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
