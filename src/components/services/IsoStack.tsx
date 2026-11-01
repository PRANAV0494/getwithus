"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { onFrame } from "@/components/motion/frame";
import { loadGsap } from "@/components/motion/gsap";
import ScrambleText from "@/components/motion/ScrambleText";
import {
  CENTER_X,
  FACE_MATRIX,
  LABEL_X,
  LABEL_Y,
  LEFT_FACE,
  leaderPoints,
  plateGap,
  plateY,
  RIGHT_FACE,
  TOP_FACE,
  VIEW,
} from "@/components/services/isoStackGeometry";
import Brackets from "@/components/ui/Brackets";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** What lies on each plate, in flat coordinates on its top face, bottom plate first. */
const CONTENT: readonly ReactNode[] = [
  // Web: a browser wireframe that draws itself.
  <>
    <rect
      className="draw"
      pathLength={1}
      x={-62}
      y={-58}
      width={124}
      height={116}
      rx={4}
      style={delay(0)}
    />
    <line className="draw" pathLength={1} x1={-62} y1={-42} x2={62} y2={-42} style={delay(0.25)} />
    <circle className="fillc" cx={-54} cy={-50} r={2.2} />
    <circle className="fillc" cx={-46} cy={-50} r={2.2} />
    <circle className="fillc" cx={-38} cy={-50} r={2.2} />
    <rect
      className="draw"
      pathLength={1}
      x={-52}
      y={-32}
      width={62}
      height={8}
      style={delay(0.4)}
    />
    <rect
      className="draw"
      pathLength={1}
      x={-52}
      y={-18}
      width={40}
      height={5}
      style={delay(0.5)}
    />
    <rect
      className="draw"
      pathLength={1}
      x={-52}
      y={-4}
      width={104}
      height={38}
      style={delay(0.6)}
    />
    <rect
      className="draw"
      pathLength={1}
      x={-52}
      y={42}
      width={30}
      height={8}
      style={delay(0.75)}
    />
    <rect
      className="draw"
      pathLength={1}
      x={-15}
      y={42}
      width={30}
      height={8}
      style={delay(0.85)}
    />
    <rect className="draw" pathLength={1} x={22} y={42} width={30} height={8} style={delay(0.95)} />
  </>,
  // App: two phone screens slide in.
  <>
    <g className="phone" style={delay(0)}>
      <rect x={-60} y={-62} width={50} height={98} rx={8} />
      <line x1={-42} y1={-54} x2={-28} y2={-54} />
      <rect x={-52} y={-44} width={34} height={22} rx={2} />
      <line x1={-52} y1={-14} x2={-18} y2={-14} />
      <line x1={-52} y1={-6} x2={-28} y2={-6} />
      <rect x={-52} y={18} width={34} height={9} rx={4} />
    </g>
    <g className="phone" style={delay(0.18)}>
      <rect x={8} y={-30} width={50} height={98} rx={8} />
      <line x1={26} y1={-22} x2={40} y2={-22} />
      <circle cx={33} cy={0} r={11} />
      <line x1={16} y1={22} x2={50} y2={22} />
      <line x1={16} y1={30} x2={42} y2={30} />
      <rect x={16} y={48} width={34} height={9} rx={4} />
    </g>
  </>,
  // Automation: chat bubbles pop in over a voice waveform.
  <>
    <rect className="bub" x={-62} y={-62} width={70} height={17} rx={6} style={delay(0)} />
    <rect className="bub out" x={-6} y={-38} width={68} height={17} rx={6} style={delay(0.3)} />
    <rect className="bub" x={-62} y={-14} width={52} height={17} rx={6} style={delay(0.6)} />
    {[10, 18, 26, 34, 22, 40, 30, 40, 22, 34, 26, 18, 10].map((height, index) => (
      <rect
        key={index}
        className="wave"
        x={-60 + index * 10}
        y={44 - height / 2}
        width={4}
        height={height}
        rx={2}
        style={delay(index * 0.07)}
      />
    ))}
  </>,
  // Marketing: bars rise from the baseline, then the trend line draws.
  <>
    <line x1={-62} y1={62} x2={62} y2={62} />
    <line x1={-62} y1={-62} x2={-62} y2={62} />
    {[30, 46, 40, 72, 104].map((height, index) => (
      <rect
        key={index}
        className={cn("bar", index === 4 && "hl")}
        x={-50 + index * 22}
        y={62 - height}
        width={14}
        height={height}
        style={delay(index * 0.1)}
      />
    ))}
    <polyline
      className="draw"
      pathLength={1}
      points="-43,26 -21,10 1,16 23,-16 45,-48"
      style={delay(0.55)}
    />
  </>,
  // Custom software and cloud: a cloud draws, then three server units slide in under it.
  <>
    <path
      className="draw"
      pathLength={1}
      d="M-34 -24 a12 12 0 0 1 4 -23 a20 20 0 0 1 37 -6 a14 14 0 0 1 21 13 a10 10 0 0 1 -2 16 Z"
      style={delay(0)}
    />
    <line className="draw" pathLength={1} x1={0} y1={-24} x2={0} y2={-8} style={delay(0.45)} />
    {[-8, 16, 40].map((y, index) => (
      <g key={y} className="unit" style={delay(0.2 + index * 0.14)}>
        <rect x={-50} y={y} width={100} height={18} rx={2} />
        <circle className="fillc" cx={-40} cy={y + 9} r={2.2} />
        <circle className="fillc" cx={-32} cy={y + 9} r={2.2} />
        <line x1={-20} y1={y + 9} x2={38} y2={y + 9} />
      </g>
    ))}
  </>,
];

type LayerState = "active" | "done" | "ghost";
const stateOf = (index: number, active: number): LayerState =>
  index === active ? "active" : index < active ? "done" : "ghost";

/** Share of the viewport height where the reading line sits. */
const READING_LINE = 0.45;

/** Where a plate rests before any scroll: together, with the first plate active. */
const restingY = (index: number) => plateY(index, plateGap(0), index === 0);

type IsoStackProps = {
  /** Service names, bottom plate first, for the caption. */
  names: readonly string[];
  /** Short labels, bottom plate first. */
  labels: readonly string[];
  /** The list whose items hold the service cards (each marked data-service-card), in plate order. */
  listId: string;
  /** The section whose scroll spreads the stack apart. */
  sectionId: string;
  className?: string;
};

/**
 * Figure 02: the service lines as an isometric stack of plates beside the
 * cards. The card nearest the reading line (45 percent down the viewport) is
 * active: its plate lifts, turns cyan, and plays its drawing; plates below it
 * are done (drawings at 55 percent), plates above it are ghosts. Scrolling
 * through the section spreads the stack apart and back together (a scrubbed
 * ScrollTrigger), with positions eased so it feels weighted. Under reduced
 * motion the stack holds a medium spread and only the active plate changes.
 */
export default function IsoStack({ names, labels, listId, sectionId, className }: IsoStackProps) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const layers = useRef<(SVGGElement | null)[]>([]);
  const leaders = useRef<(SVGPolylineElement | null)[]>([]);
  const kick = useRef<() => void>(() => {});
  const reduce = useReducedMotion();

  // Card states follow the active plate.
  useEffect(() => {
    activeRef.current = active;
    const cards = document.querySelectorAll<HTMLElement>(`#${listId} [data-service-card]`);
    cards.forEach((card, index) => card.toggleAttribute("data-active", index === active));
    kick.current();
  }, [active, listId]);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const list = document.getElementById(listId);
    if (!section || !list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-service-card]"));
    const current = labels.map((_, index) => restingY(index));
    const progress = { t: 0 };
    let stopLoop: (() => void) | null = null;
    let cancelled = false;
    let revert = () => {};

    const pickActive = () => {
      const viewport = window.innerHeight;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const centre = rect.top + Math.min(rect.height, viewport * 0.6) / 2;
        const distance = Math.abs(centre - viewport * READING_LINE);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      if (best !== activeRef.current) setActive(best);
    };

    const step = () => {
      const gap = reduce ? 24 + 54 * 0.55 : plateGap(progress.t);
      let moving = false;
      current.forEach((y, index) => {
        const target = plateY(index, gap, index === activeRef.current);
        const next = reduce ? target : y + (target - y) * 0.14;
        if (Math.abs(target - next) > 0.05) moving = true;
        current[index] = Math.abs(target - next) > 0.05 ? next : target;
        layers.current[index]?.setAttribute(
          "transform",
          `translate(${CENTER_X},${current[index].toFixed(2)})`,
        );
        leaders.current[index]?.setAttribute("points", leaderPoints(current[index], index));
      });
      if (!moving && stopLoop) {
        stopLoop();
        stopLoop = null;
      }
    };
    kick.current = () => {
      stopLoop ??= onFrame(step);
    };

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const context = gsap.context(() => {
        if (!reduce) {
          gsap.to(progress, {
            t: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 55%",
              end: () => `+=${Math.max(1, section.offsetHeight - window.innerHeight * 0.3)}`,
              scrub: true,
            },
            onUpdate: () => kick.current(),
          });
        }
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: pickActive,
          onRefresh: pickActive,
        });
      });
      revert = () => context.revert();
      pickActive();
      kick.current();
    });

    return () => {
      cancelled = true;
      revert();
      stopLoop?.();
      kick.current = () => {};
      for (const card of cards) card.removeAttribute("data-active");
    };
  }, [listId, sectionId, labels, reduce]);

  return (
    <div className={cn("relative border border-line bg-bg-soft p-3 min-[900px]:p-[22px]", className)}>
      <Brackets />
      <p className="mb-2 min-h-[22px] type-label text-body min-[900px]:mb-4">
        fig. 02 / <ScrambleText text={names[active] ?? ""} className="text-ink" />
      </p>
      <div className="border border-line bg-bg-soft">
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          role="img"
          aria-label={`Isometric stack of ${labels.length} service layers: ${labels.join(", ")}`}
          className="iso block h-auto max-h-[34vh] w-full min-[900px]:max-h-none"
        >
          {CONTENT.slice(0, labels.length).map((content, index) => (
            <g
              key={labels[index]}
              ref={(element) => {
                layers.current[index] = element;
              }}
              data-layer={index}
              data-state={stateOf(index, active)}
              transform={`translate(${CENTER_X},${restingY(index)})`}
            >
              <polygon className="side" points={LEFT_FACE} />
              <polygon className="side" points={RIGHT_FACE} />
              <polygon className="top" points={TOP_FACE} />
              <g className="content" transform={FACE_MATRIX}>
                {content}
              </g>
            </g>
          ))}
          <g>
            {labels.map((label, index) => (
              <g key={label} className="leader" data-active={index === active ? "" : undefined}>
                <polyline
                  ref={(element) => {
                    leaders.current[index] = element;
                  }}
                  points={leaderPoints(restingY(index), index)}
                />
                <text x={LABEL_X} y={(LABEL_Y[index] ?? 0) + 4}>
                  {String(index + 1).padStart(2, "0")} / {label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <ol
        aria-hidden="true"
        className="mt-4 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}
      >
        {labels.map((label, index) => (
          <li
            key={label}
            data-on={index <= active ? "" : undefined}
            className="progress-seg h-0.5 overflow-hidden bg-line-2"
          />
        ))}
      </ol>
    </div>
  );
}
