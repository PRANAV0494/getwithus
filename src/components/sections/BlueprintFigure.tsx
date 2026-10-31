import {
  BAR_SIZE,
  BARS,
  barHeights,
  boxFaces,
  faceTransform,
  iso,
  LIFT,
  polygon,
  polyline,
  SLAB,
  slabBase,
  slabTop,
  trendPath,
  VIEW,
} from "@/components/sections/blueprintGeometry";
import Brackets from "@/components/ui/Brackets";
import { cn } from "@/lib/cn";

const { size, thickness } = SLAB;

/** The flat drawing on each slab's top face, in a 200 x 200 square. */
function Motif({ index }: { index: number }) {
  if (index === 0) {
    // Web: a browser window with its page.
    return (
      <>
        <rect x={24} y={24} width={152} height={152} rx={6} />
        <path d="M24 48 H176 M40 88 H120 M40 100 H144" />
        <circle cx={38} cy={36} r={3} />
        <circle cx={50} cy={36} r={3} />
        <circle cx={62} cy={36} r={3} />
        <rect x={40} y={62} width={120} height={14} rx={2} />
        <rect x={40} y={118} width={52} height={40} rx={2} />
        <rect x={102} y={118} width={58} height={40} rx={2} />
      </>
    );
  }
  if (index === 1) {
    // App: two phones in sync.
    return (
      <>
        <rect x={36} y={28} width={56} height={104} rx={10} />
        <rect x={108} y={64} width={56} height={104} rx={10} />
        <path d="M54 40 H74 M56 120 H72 M126 76 H146 M128 156 H144" />
        <path d="M92 70 C 104 70, 98 104, 108 104" strokeDasharray="3 4" />
      </>
    );
  }
  if (index === 2) {
    // Automation: an agent connected to the tools around it.
    const nodes = [
      [40, 46],
      [100, 28],
      [158, 44],
      [44, 156],
      [156, 154],
    ] as const;
    return (
      <>
        <path d={nodes.map(([x, y]) => `M100 100 L${x} ${y}`).join(" ")} />
        {nodes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={6} className="fill-ink-2" />
        ))}
        <circle cx={100} cy={100} r={16} className="fill-ink-2" />
        <rect x={93} y={93} width={14} height={14} rx={2} />
      </>
    );
  }
  // Marketing: the axes the chart stands on.
  return <path d="M28 28 V172 H172 M28 64 H34 M28 100 H34 M28 136 H34" />;
}

/** One slab, drawn docked; the controller lifts it into place with a transform. */
function Slab({ index, label }: { index: number; label: string }) {
  const base = slabBase(index);
  const top = slabTop(index);
  const faces = boxFaces(0, 0, size, size, base, thickness);
  const [cornerX, cornerY] = iso(size, top, 0);
  const legs =
    index > 0
      ? [iso(size, base, 0), iso(size, base, size), iso(0, base, size)]
          .map(([x, y]) => `M${x} ${y} V${y + SLAB.step - thickness}`)
          .join(" ")
      : null;
  return (
    <g
      data-layer={index}
      data-state="waiting"
      style={{ transform: `translate(0px, ${-LIFT[index]}px)` }}
      stroke="currentColor"
    >
      {legs ? <path d={legs} /> : null}
      <path d={faces.right} className="fill-ink-1" />
      <path d={faces.front} className="fill-ink-0" />
      <path d={faces.top} className="fill-ink-2" />
      <g transform={faceTransform(top)}>
        <Motif index={index} />
      </g>
      {index === BARS.length - 1 ? <Chart /> : null}
      <g className="max-lg:hidden">
        <path d={`M${cornerX} ${cornerY} H${cornerX + 27}`} />
        <text
          x={cornerX + 33}
          y={cornerY + 5}
          fontSize={15}
          stroke="none"
          fill="currentColor"
          className="font-mono"
        >
          {String(index + 1).padStart(2, "0")} / {label}
        </text>
      </g>
    </g>
  );
}

/** The marketing slab's bars and trend line, flat until it docks. */
function Chart() {
  const heights = barHeights(0);
  const top = slabTop(BARS.length - 1);
  return (
    <>
      {BARS.map((bar, index) => {
        const faces = boxFaces(bar.x, bar.z, BAR_SIZE, BAR_SIZE, top, heights[index]);
        return (
          <g key={bar.x} data-bar={index}>
            <path data-face="right" d={faces.right} className="fill-ink-1" />
            <path data-face="front" d={faces.front} className="fill-ink-0" />
            <path data-face="top" d={faces.top} className="fill-ink-3" />
          </g>
        );
      })}
      <path data-trend d={trendPath(heights)} opacity={0} />
    </>
  );
}

/** Where each slab lands: a dashed outline of its top face, fading as the slab arrives. */
function Ghost({ index }: { index: number }) {
  const y = slabTop(index);
  return (
    <path
      data-ghost={index}
      d={polygon([iso(0, y, 0), iso(size, y, 0), iso(size, y, size), iso(0, y, size)])}
      className="text-line-strong"
      stroke="currentColor"
      strokeDasharray="4 5"
    />
  );
}

const FLOOR = (() => {
  const lines: string[] = [];
  for (let t = -20; t <= 220; t += 20) {
    lines.push(polyline([iso(t, 0, -20), iso(t, 0, 220)]));
    lines.push(polyline([iso(-20, 0, t), iso(220, 0, t)]));
  }
  return lines.join(" ");
})();

const UPLINK = (() => {
  const from = iso(size / 2, slabTop(BARS.length - 1), size / 2);
  const to = iso(size / 2, slabTop(BARS.length - 1) + 150, size / 2);
  return { d: polyline([from, to]), node: to };
})();

type BlueprintFigureProps = {
  id: string;
  /** Short names of the four slabs, bottom first, for the labels. */
  labels: readonly string[];
  className?: string;
};

/**
 * Figure 02 on the home page: an isometric blueprint of the four service lines
 * as slabs that assemble into one stack, the client's business, as the cards
 * pass (BlueprintController drives it). Rendered here in its starting state, so
 * without JavaScript it is a still drawing. Decorative: the cards carry the content.
 */
export default function BlueprintFigure({ id, labels, className }: BlueprintFigureProps) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className={cn("blueprint group relative border border-line bg-ink-2 p-3 lg:p-4", className)}
    >
      <Brackets />
      <p data-caption className="type-label text-fog-3">
        fig. 02 / your business
      </p>
      <div className="mt-3 border border-line bg-ink">
        <svg
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          fill="none"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block h-auto max-h-[22svh] w-full lg:max-h-none"
        >
          <g className="max-lg:[transform:translateX(85px)]">
            <path d={FLOOR} className="text-line" stroke="currentColor" strokeWidth={1} />
            {labels.map((label, index) => (
              <g key={label}>
                <Ghost index={index} />
                <Slab index={index} label={label} />
              </g>
            ))}
            <g data-uplink className="text-signal" stroke="currentColor">
              <path d={UPLINK.d} className="text-line-strong" strokeDasharray="2 4" />
              <path data-uplink-pulse d={UPLINK.d} strokeWidth={2} strokeDasharray="8 112" />
              <circle cx={UPLINK.node[0]} cy={UPLINK.node[1]} r={5} className="fill-ink" />
            </g>
          </g>
        </svg>
      </div>
      <ol className="mt-3 grid grid-cols-4 gap-1.5">
        {labels.map((label) => (
          <li key={label} className="h-0.5 overflow-hidden bg-line">
            <span
              data-progress
              className="block h-full origin-left bg-signal"
              style={{ transform: "scaleX(0)" }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
