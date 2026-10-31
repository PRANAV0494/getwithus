import Brackets from "@/components/design-lab/engineering/Brackets";
import { mono } from "@/components/design-lab/engineering/tones";
import { cn } from "@/lib/cn";

const NODES = [
  { id: "practice_01", name: "Digital Engineering", x: 24, y: 28 },
  { id: "practice_02", name: "Digital Growth", x: 24, y: 276 },
  { id: "practice_03", name: "AI & Automation", x: 340, y: 152 },
] as const;

const PATHS = [
  "M192 66 C 216 66, 204 172, 226 172",
  "M192 314 C 216 314, 204 208, 226 208",
  "M306 190 L 340 190",
  "M108 104 L 108 276",
];

const sans = "font-(family-name:--lab-font-body)";
const monoFont = "font-(family-name:--lab-font-mono)";

/**
 * Figure 01: the three practices connected to the client's business. Data
 * pulses travel the connections three times when the page opens, then stop.
 * Decorative: the same facts are in the text beside it.
 */
export default function SystemDiagram({ className }: { className?: string }) {
  return (
    <figure
      className={cn("group relative border border-(--lab-border) bg-(--lab-bg-alt) p-5", className)}
    >
      <Brackets />
      <figcaption className={cn(mono, "text-[11px] text-(--lab-text-3)")}>
        fig. 01 / how the practices connect
      </figcaption>
      <svg
        viewBox="0 0 520 380"
        aria-hidden="true"
        focusable="false"
        className="mt-3 h-auto w-full"
      >
        {PATHS.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#353C44" strokeWidth={1.5} />
            <path
              d={d}
              fill="none"
              stroke="#2CD5E6"
              strokeWidth={2}
              strokeDasharray="8 112"
              className="lab-motion [animation:lab-dash_3.2s_linear_3]"
            />
          </g>
        ))}
        <rect x={226} y={142} width={80} height={96} rx={2} fill="#1D2126" stroke="#2CD5E6" />
        <text
          x={266}
          y={186}
          textAnchor="middle"
          fill="#E6E9EC"
          fontSize={13}
          fontWeight={600}
          className={sans}
        >
          Your
        </text>
        <text
          x={266}
          y={204}
          textAnchor="middle"
          fill="#E6E9EC"
          fontSize={13}
          fontWeight={600}
          className={sans}
        >
          business
        </text>
        {NODES.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={168}
              height={76}
              rx={2}
              fill="#171A1E"
              stroke="#353C44"
            />
            <circle cx={node.x + 16} cy={node.y + 20} r={3} fill="#2CD5E6" />
            <text x={node.x + 28} y={node.y + 24} fill="#848D98" fontSize={11} className={monoFont}>
              {node.id}
            </text>
            <text
              x={node.x + 14}
              y={node.y + 54}
              fill="#E6E9EC"
              fontSize={16}
              fontWeight={600}
              className={sans}
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
