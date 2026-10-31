"use client";

import { useEffect } from "react";
import {
  BAR_SIZE,
  BARS,
  barHeights,
  boxFaces,
  LIFT,
  slabTop,
  trendPath,
} from "@/components/sections/blueprintGeometry";

/** Share of a card's height over which its slab docks once the card reaches the reading line. */
const RAMP = 0.6;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (t: number) => t * t * (3 - 2 * t);

type BlueprintControllerProps = {
  /** The figure rendered by BlueprintFigure. */
  figureId: string;
  /** The list whose items are the service cards, in slab order. */
  listId: string;
  /** Service names, in the same order, for the caption. */
  names: readonly string[];
};

/**
 * Drives figure 02 from scroll: as each service card passes the reading line,
 * its slab drops into place (scrubbing both ways), the card is marked active,
 * and the caption and progress bars follow. Once all four have docked the
 * figure is marked complete and its uplink pulses three times. Under reduced
 * motion slabs are either waiting or docked, never in between.
 */
export default function BlueprintController({ figureId, listId, names }: BlueprintControllerProps) {
  useEffect(() => {
    const figure = document.getElementById(figureId);
    const list = document.getElementById(listId);
    if (!figure || !list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const slabs = Array.from(figure.querySelectorAll<SVGGElement>("[data-layer]"));
    const ghosts = Array.from(figure.querySelectorAll<SVGPathElement>("[data-ghost]"));
    const bars = Array.from(figure.querySelectorAll<SVGGElement>("[data-bar]"));
    const trend = figure.querySelector<SVGPathElement>("[data-trend]");
    const caption = figure.querySelector<HTMLElement>("[data-caption]");
    const progress = Array.from(figure.querySelectorAll<HTMLElement>("[data-progress]"));
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = -2;
    let growth = -1;

    const grow = (docked: number) => {
      const heights = barHeights(docked);
      const key = heights.reduce((sum, height) => sum + height, 0);
      if (key === growth) return;
      growth = key;
      const top = slabTop(BARS.length - 1);
      bars.forEach((bar, index) => {
        const { x, z } = BARS[index];
        const faces = boxFaces(x, z, BAR_SIZE, BAR_SIZE, top, heights[index]);
        for (const face of bar.querySelectorAll<SVGPathElement>("[data-face]")) {
          const name = face.dataset.face as keyof typeof faces;
          face.setAttribute("d", faces[name]);
        }
      });
      if (trend) {
        trend.setAttribute("d", trendPath(heights));
        trend.setAttribute("opacity", String(clamp((docked - 0.6) / 0.4)));
      }
    };

    const write = () => {
      frame = 0;
      // Beside the cards, the reading line sits just above the middle of the screen. Above
      // them (phones and tablets), it sits in the middle of what the pinned figure leaves visible.
      const top = wide.matches ? 0 : figure.getBoundingClientRect().bottom;
      const line = top + (window.innerHeight - top) * 0.45;
      let position = 0;
      let last = 0;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const share = clamp((line - rect.top) / (rect.height * RAMP));
        position += share;
        const docked = reduce.matches ? (share >= 0.5 ? 1 : 0) : ease(share);
        const slab = slabs[index];
        if (slab) {
          slab.style.transform = `translate(0px, ${-(1 - docked) * (LIFT[index] ?? 0)}px)`;
          slab.dataset.state = docked >= 0.999 ? "docked" : docked <= 0.001 ? "waiting" : "moving";
        }
        ghosts[index]?.style.setProperty("opacity", String(1 - docked));
        progress[index]?.style.setProperty("transform", `scaleX(${share})`);
        last = docked;
      });
      grow(last);
      figure.toggleAttribute("data-complete", last >= 0.999);

      const next = position < 0.5 ? -1 : Math.min(cards.length - 1, Math.round(position) - 1);
      if (next !== active) {
        active = next;
        cards.forEach((card, index) => card.toggleAttribute("data-active", index === next));
        if (caption)
          caption.textContent = `fig. 02 / ${next === -1 ? "your business" : names[next]}`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
      reduce.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
      for (const card of cards) card.removeAttribute("data-active");
    };
  }, [figureId, listId, names]);

  return null;
}
