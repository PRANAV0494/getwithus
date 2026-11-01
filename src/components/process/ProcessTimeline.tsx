"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/components/motion/gsap";
import ScrambleText from "@/components/motion/ScrambleText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Step = { title: string; short: string };

/**
 * The four steps under a 1 px track. As the section scrolls in (from its top at
 * 78 percent of the viewport, over 55 percent of a viewport), a cyan fill grows
 * along the track; when it reaches a step's diamond, the diamond lights and the
 * step's text rises in. Below 860 px the track runs down the left edge. Without
 * JavaScript or under reduced motion everything is drawn and lit.
 */
export default function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = root.current;
    if (!element || reduce) return;
    const track = element.querySelector<HTMLElement>("[data-track]");
    const fill = element.querySelector<HTMLElement>("[data-fill]");
    const items = Array.from(element.querySelectorAll<HTMLElement>("[data-step]"));
    if (!track || !fill) return;
    element.dataset.armed = "";
    let cancelled = false;
    let revert = () => {};

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      let positions: number[] = [];
      let vertical = false;
      const measure = () => {
        const box = track.getBoundingClientRect();
        vertical = box.height > box.width;
        positions = items.map((item) => {
          const diamond = item.querySelector("[data-diamond]")?.getBoundingClientRect();
          if (!diamond) return 0;
          return vertical
            ? (diamond.top - box.top) / Math.max(1, box.height)
            : (diamond.left - box.left) / Math.max(1, box.width);
        });
      };
      const light = (progress: number) => {
        items.forEach((item, index) => {
          const at = positions[index] ?? 0;
          item.toggleAttribute("data-on", progress >= at + 0.01 || (progress > 0.02 && at < 0.02));
        });
      };

      const media = gsap.matchMedia(element);
      const build = (axis: "scaleX" | "scaleY") => {
        gsap.fromTo(
          fill,
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              end: () => `+=${window.innerHeight * 0.55}`,
              scrub: true,
              onRefresh: (self) => {
                measure();
                light(self.progress);
              },
              onUpdate: (self) => light(self.progress),
            },
          },
        );
      };
      media.add("(min-width: 860px)", () => build("scaleX"));
      media.add("(max-width: 859.98px)", () => build("scaleY"));
      revert = () => media.revert();
    });

    return () => {
      cancelled = true;
      revert();
      delete element.dataset.armed;
      for (const item of items) item.removeAttribute("data-on");
    };
  }, [reduce]);

  return (
    <div ref={root} className="timeline relative">
      <div
        data-track
        className="absolute top-[7px] bottom-0 left-[7px] w-px bg-line-strong min-[860px]:right-0 min-[860px]:bottom-auto min-[860px]:h-px min-[860px]:w-auto"
      >
        <div
          data-fill
          className="absolute inset-0 origin-top bg-signal shadow-[0_0_12px_var(--color-signal-glow)] min-[860px]:origin-left"
        />
      </div>
      <ol className="grid gap-11 pl-10 min-[860px]:grid-cols-4 min-[860px]:gap-8 min-[860px]:pl-0">
        {steps.map((step, index) => (
          <li key={step.title} data-step className="relative min-[860px]:pt-[42px]">
            <span
              data-diamond
              aria-hidden="true"
              className="absolute top-0 -left-10 size-[15px] min-[860px]:left-0"
            />
            <div data-text>
              <ScrambleText
                text={`step_${String(index + 1).padStart(2, "0")}`}
                className="type-label"
              />
              <h3 className="mt-2.5 mb-3 type-h3">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="text-fog-2">{step.short}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
