import type { ArtKind } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

/*
 * Hand-drawn interface schematics for the concept projects: no screenshots of
 * real products, no stock imagery. Colours come from four variables a concept
 * can set on any ancestor: --art-panel, --art-line, --art-fill, --art-accent.
 */

const panel = "var(--art-panel, var(--lab-surface))";
const line = "var(--art-line, var(--lab-border-strong))";
const fill = "var(--art-fill, var(--lab-surface-2))";
const accent = "var(--art-accent, var(--lab-accent))";

function Bars({ x, y, widths }: { x: number; y: number; widths: readonly number[] }) {
  return (
    <>
      {widths.map((width, index) => (
        <rect key={index} x={x} y={y + index * 12} width={width} height={5} rx={2.5} fill={line} />
      ))}
    </>
  );
}

function App() {
  const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      <rect x={232} y={40} width={110} height={196} rx={18} fill={fill} stroke={line} />
      <Bars x={248} y={64} widths={[60, 42]} />
      <rect x={248} y={96} width={78} height={30} rx={8} fill={accent} />
      <Bars x={248} y={140} widths={[70, 54, 64, 40]} />
      <rect
        x={58}
        y={24}
        width={150}
        height={212}
        rx={20}
        fill={panel}
        stroke={line}
        strokeWidth={1.5}
      />
      <rect x={110} y={34} width={46} height={6} rx={3} fill={line} />
      <Bars x={76} y={58} widths={[72, 48]} />
      {slots.map((slot) => {
        const col = slot % 3;
        const row = Math.floor(slot / 3);
        const active = slot === 4 || slot === 9;
        return (
          <rect
            key={slot}
            x={76 + col * 40}
            y={92 + row * 30}
            width={34}
            height={22}
            rx={6}
            fill={active ? accent : fill}
            stroke={active ? "none" : line}
          />
        );
      })}
      <rect x={76} y={214} width={114} height={12} rx={6} fill={line} />
    </>
  );
}

function Site() {
  return (
    <>
      <rect
        x={40}
        y={24}
        width={320}
        height={212}
        rx={12}
        fill={panel}
        stroke={line}
        strokeWidth={1.5}
      />
      <line x1={40} y1={50} x2={360} y2={50} stroke={line} />
      {[56, 70, 84].map((cx) => (
        <circle key={cx} cx={cx} cy={37} r={4} fill={line} />
      ))}
      <rect x={120} y={31} width={160} height={12} rx={6} fill={fill} />
      <Bars x={62} y={72} widths={[140, 104]} />
      <rect x={62} y={100} width={64} height={18} rx={9} fill={accent} />
      <rect x={232} y={66} width={106} height={66} rx={8} fill={fill} stroke={line} />
      {[0, 1, 2].map((card) => (
        <g key={card}>
          <rect
            x={62 + card * 94}
            y={150}
            width={84}
            height={66}
            rx={8}
            fill={fill}
            stroke={line}
          />
          <Bars x={72 + card * 94} y={164} widths={[52, 36]} />
          <rect
            x={72 + card * 94}
            y={196}
            width={30}
            height={8}
            rx={4}
            fill={card === 1 ? accent : line}
          />
        </g>
      ))}
    </>
  );
}

function Chat() {
  const bubbles = [
    { side: "left", width: 150, y: 52 },
    { side: "right", width: 120, y: 88 },
    { side: "left", width: 170, y: 124 },
    { side: "right", width: 96, y: 160 },
  ] as const;
  return (
    <>
      <rect
        x={70}
        y={20}
        width={260}
        height={220}
        rx={16}
        fill={panel}
        stroke={line}
        strokeWidth={1.5}
      />
      <circle cx={96} cy={38} r={8} fill={accent} />
      <rect x={112} y={34} width={70} height={8} rx={4} fill={line} />
      <line x1={70} y1={56} x2={330} y2={56} stroke={line} />
      {bubbles.map((bubble) => (
        <rect
          key={bubble.y}
          x={bubble.side === "left" ? 88 : 312 - bubble.width}
          y={bubble.y + 12}
          width={bubble.width}
          height={24}
          rx={12}
          fill={bubble.side === "right" ? accent : fill}
          stroke={bubble.side === "right" ? "none" : line}
        />
      ))}
      <rect x={88} y={208} width={190} height={18} rx={9} fill={fill} stroke={line} />
      <circle cx={296} cy={217} r={9} fill={accent} />
    </>
  );
}

function Dashboard() {
  const bars = [46, 70, 54, 88, 64, 96, 78];
  return (
    <>
      <rect
        x={30}
        y={22}
        width={340}
        height={216}
        rx={12}
        fill={panel}
        stroke={line}
        strokeWidth={1.5}
      />
      <rect x={30} y={22} width={70} height={216} rx={12} fill={fill} />
      <Bars x={44} y={44} widths={[40, 32, 36, 28]} />
      {[0, 1, 2].map((card) => (
        <g key={card}>
          <rect
            x={116 + card * 82}
            y={40}
            width={72}
            height={48}
            rx={8}
            fill={fill}
            stroke={line}
          />
          <rect x={126 + card * 82} y={52} width={34} height={6} rx={3} fill={line} />
          <rect
            x={126 + card * 82}
            y={66}
            width={card === 0 ? 46 : 38}
            height={10}
            rx={3}
            fill={card === 0 ? accent : line}
          />
        </g>
      ))}
      <rect x={116} y={104} width={236} height={116} rx={8} fill={fill} stroke={line} />
      {bars.map((height, index) => (
        <rect
          key={index}
          x={132 + index * 30}
          y={206 - height}
          width={16}
          height={height}
          rx={3}
          fill={index === 5 ? accent : line}
        />
      ))}
    </>
  );
}

const ART = { app: App, site: Site, chat: Chat, dashboard: Dashboard } as const;

/** A decorative schematic of a concept project's interface. Hidden from assistive technology. */
export default function ProjectArt({ kind, className }: { kind: ArtKind; className?: string }) {
  const Art = ART[kind];
  return (
    <svg
      viewBox="0 0 400 260"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-auto w-full", className)}
    >
      <Art />
    </svg>
  );
}
