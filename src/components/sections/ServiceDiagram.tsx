import type { CSSProperties } from "react";
import DiagramLive from "@/components/sections/DiagramLive";
import Brackets from "@/components/ui/Brackets";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/cn";

const FIGURE_ID = "service-circuit";

/** When the current starts, after the wires have drawn in and the core has powered on. */
const FLOW_START = 1.1;
/** Seconds for one packet to travel a wire; each wire carries two at a time. */
const TRIP = 2.4;
const PACKETS = 2;

/**
 * The five service lines around the client's business, in figure order, each
 * with the wire it feeds into the core and its firing phase (clockwise from
 * web development, so the packets go round the board). Custom software sits
 * under the core.
 */
const NODES: readonly {
  slug: ServiceSlug;
  x: number;
  y: number;
  wire: string;
  port: readonly [number, number];
  phase: number;
}[] = [
  {
    slug: "web-development",
    x: 16,
    y: 24,
    wire: "M192 60 C 230 60, 244 90, 244 130",
    port: [192, 60],
    phase: 0,
  },
  {
    slug: "app-development",
    x: 16,
    y: 264,
    wire: "M192 300 C 230 300, 244 270, 244 230",
    port: [192, 300],
    phase: 0.96,
  },
  {
    slug: "agentic-automation",
    x: 368,
    y: 24,
    wire: "M368 60 C 330 60, 316 90, 316 130",
    port: [368, 60],
    phase: 0.24,
  },
  {
    slug: "digital-marketing",
    x: 368,
    y: 264,
    wire: "M368 300 C 330 300, 316 270, 316 230",
    port: [368, 300],
    phase: 0.48,
  },
  {
    slug: "custom-software",
    x: 192,
    y: 372,
    wire: "M280 372 V 230",
    port: [280, 372],
    phase: 0.72,
  },
];

const CORE = { x: 224, y: 130, width: 112, height: 100 } as const;
const CENTER = { x: CORE.x + CORE.width / 2, y: CORE.y + CORE.height / 2 } as const;
const CORE_PORTS = [
  [244, 130],
  [244, 230],
  [316, 130],
  [316, 230],
  [280, 230],
] as const;

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** A packet of data: a bright head with a halo and a short tail, riding its wire into the core. */
function Packet({ wire, begin }: { wire: string; begin: string }) {
  return (
    <g data-packet opacity={0} filter="url(#circuit-glow)">
      <path d="M-20 0 H-3" className="stroke-accent" strokeWidth={2} opacity={0.45} />
      <circle r={6} className="fill-accent" opacity={0.22} />
      <circle r={2.6} className="fill-accent" />
      <animateMotion
        dur={`${TRIP}s`}
        begin={begin}
        repeatCount="indefinite"
        rotate="auto"
        path={wire}
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.86;1"
        dur={`${TRIP}s`}
        begin={begin}
        repeatCount="indefinite"
      />
    </g>
  );
}

/**
 * Figure 01 on the home page: a live circuit. The five service lines are wired
 * to the client's business; on load the wires draw in, the boards and the core
 * power on, then current streams along every wire, each board fires packets
 * into the core in turn, the core takes them in with a ripple, and its rings
 * turn. It runs only while on screen and the tab is visible (DiagramLive), and
 * stands still under reduced motion. Decorative: the services are listed in
 * full right below it.
 */
export default function ServiceDiagram({ className }: { className?: string }) {
  return (
    <figure
      id={FIGURE_ID}
      aria-hidden="true"
      className={cn("diagram group relative border border-line bg-bg-soft p-5", className)}
    >
      <Brackets />
      <figcaption className="flex items-center justify-between gap-4 type-label text-muted">
        <span>fig. 01 / what we build around your business</span>
        <span className="flex items-center gap-2 text-amber">
          <span data-live-dot className="size-1.5 bg-amber" />
          live
        </span>
      </figcaption>
      <svg viewBox="0 0 560 460" focusable="false" fill="none" className="mt-3 h-auto w-full">
        <defs>
          <filter id="circuit-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="circuit-core">
            <rect x={CORE.x + 1} y={CORE.y + 1} width={CORE.width - 2} height={CORE.height - 2} />
          </clipPath>
        </defs>

        <circle
          data-ring="inner"
          cx={CENTER.x}
          cy={CENTER.y}
          r={74}
          className="stroke-accent"
          strokeDasharray="2 9"
          opacity={0.4}
        />
        <circle
          data-ring="outer"
          cx={CENTER.x}
          cy={CENTER.y}
          r={88}
          className="stroke-line-2"
          strokeDasharray="16 22"
        />

        {NODES.map((node, index) => (
          <g key={node.slug} style={vars({ "--i": index })}>
            <path
              data-wire-base
              d={node.wire}
              pathLength={1}
              className="stroke-line-2"
              strokeWidth={1.5}
            />
            <path
              data-wire-current
              d={node.wire}
              className="stroke-accent"
              strokeWidth={1}
              strokeDasharray="1 7"
            />
          </g>
        ))}

        {[0, TRIP / 4].map((offset) => (
          <rect
            key={offset}
            data-ripple
            x={CORE.x}
            y={CORE.y}
            width={CORE.width}
            height={CORE.height}
            rx={2}
            className="stroke-accent"
            style={vars({ "--delay": `${FLOW_START + TRIP + offset}s` })}
          />
        ))}

        <g data-core>
          <rect
            data-core-glow
            x={CORE.x}
            y={CORE.y}
            width={CORE.width}
            height={CORE.height}
            rx={2}
            className="stroke-accent"
            strokeWidth={3}
            filter="url(#circuit-glow)"
            opacity={0.3}
          />
          <rect
            x={CORE.x}
            y={CORE.y}
            width={CORE.width}
            height={CORE.height}
            rx={2}
            className="fill-card-2 stroke-accent"
          />
          <g clipPath="url(#circuit-core)">
            <path
              data-scan
              d={`M${CORE.x} ${CORE.y + 2} H${CORE.x + CORE.width}`}
              className="stroke-accent"
              strokeWidth={1.5}
              opacity={0.35}
            />
          </g>
          <text
            x={CENTER.x}
            y={CENTER.y - 4}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            className="fill-ink font-sans"
          >
            Your
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 14}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            className="fill-ink font-sans"
          >
            business
          </text>
          {CORE_PORTS.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 2.5}
              y={y - 2.5}
              width={5}
              height={5}
              className="fill-accent"
            />
          ))}
        </g>

        {NODES.map((node, index) => (
          <g key={node.slug} data-node style={vars({ "--i": index, "--phase": `${node.phase}s` })}>
            <rect
              data-node-frame
              x={node.x}
              y={node.y}
              width={176}
              height={72}
              rx={2}
              className="fill-card stroke-line-2"
            />
            <circle data-led cx={node.x + 16} cy={node.y + 20} r={3} className="fill-accent" />
            <text x={node.x + 28} y={node.y + 24} fontSize={11} className="fill-muted font-mono">
              service_{String(index + 1).padStart(2, "0")}
            </text>
            <text
              x={node.x + 14}
              y={node.y + 54}
              fontSize={16}
              fontWeight={600}
              className="fill-ink font-sans"
            >
              {findServicePage(node.slug)?.name}
            </text>
            <rect
              x={node.port[0] - 2.5}
              y={node.port[1] - 2.5}
              width={5}
              height={5}
              className="fill-accent"
            />
          </g>
        ))}

        {NODES.flatMap((node) =>
          Array.from({ length: PACKETS }, (_, packet) => {
            const begin = `${(FLOW_START + node.phase + (packet * TRIP) / PACKETS).toFixed(2)}s`;
            return <Packet key={`${node.slug}-${packet}`} wire={node.wire} begin={begin} />;
          }),
        )}
      </svg>
      <DiagramLive figureId={FIGURE_ID} />
    </figure>
  );
}
