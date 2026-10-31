import Brackets from "@/components/ui/Brackets";
import { findServicePage } from "@/content/services";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/cn";

/** The four service lines around the client's business, in figure order. */
const NODES: readonly { slug: ServiceSlug; x: number; y: number }[] = [
  { slug: "web-development", x: 16, y: 24 },
  { slug: "app-development", x: 16, y: 304 },
  { slug: "agentic-automation", x: 368, y: 24 },
  { slug: "digital-marketing", x: 368, y: 304 },
];

const PATHS = [
  "M192 60 C 230 60, 244 110, 244 150",
  "M192 340 C 230 340, 244 290, 244 250",
  "M368 60 C 330 60, 316 110, 316 150",
  "M368 340 C 330 340, 316 290, 316 250",
];

/**
 * Figure 01 on the home page: the service lines connected to the client's
 * business. Data pulses travel each connection three times on load, then stop
 * (and never move under reduced motion). Decorative: the services are listed
 * in full right below it.
 */
export default function ServiceDiagram({ className }: { className?: string }) {
  return (
    <figure
      aria-hidden="true"
      className={cn("group relative border border-line bg-ink-1 p-5", className)}
    >
      <Brackets />
      <figcaption className="type-label text-fog-3">
        fig. 01 / what we build around your business
      </figcaption>
      <svg viewBox="0 0 560 400" focusable="false" className="mt-3 h-auto w-full">
        {PATHS.map((d) => (
          <g key={d}>
            <path d={d} fill="none" className="stroke-line-strong" strokeWidth={1.5} />
            <path
              d={d}
              fill="none"
              className="stroke-signal motion-safe:[animation:pulse-travel_3.2s_linear_3]"
              strokeWidth={2}
              strokeDasharray="8 112"
            />
          </g>
        ))}
        <rect
          x={224}
          y={150}
          width={112}
          height={100}
          rx={2}
          className="fill-ink-3 stroke-signal"
        />
        <text
          x={280}
          y={196}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          className="fill-fog font-sans"
        >
          Your
        </text>
        <text
          x={280}
          y={214}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          className="fill-fog font-sans"
        >
          business
        </text>
        {NODES.map((node, index) => (
          <g key={node.slug}>
            <rect
              x={node.x}
              y={node.y}
              width={176}
              height={72}
              rx={2}
              className="fill-ink-2 stroke-line-strong"
            />
            <circle cx={node.x + 16} cy={node.y + 20} r={3} className="fill-signal" />
            <text x={node.x + 28} y={node.y + 24} fontSize={11} className="fill-fog-3 font-mono">
              service_{String(index + 1).padStart(2, "0")}
            </text>
            <text
              x={node.x + 14}
              y={node.y + 54}
              fontSize={16}
              fontWeight={600}
              className="fill-fog font-sans"
            >
              {findServicePage(node.slug)?.name}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
