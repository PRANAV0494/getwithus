import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

/**
 * GSAP and ScrollTrigger, loaded once and on demand from client code only, with
 * the plugin registered. Nothing imports gsap statically, so it stays out of
 * every page's initial JavaScript.
 */
export type GsapKit = { gsap: typeof Gsap; ScrollTrigger: typeof ScrollTriggerType };

let kit: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  kit ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return kit;
}
