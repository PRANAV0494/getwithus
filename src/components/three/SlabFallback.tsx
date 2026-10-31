import { cn } from "@/lib/cn";

/**
 * Static stand-in for the 3D scene when WebGL 2 is unavailable or the scene
 * failed: the slab outline in line color at 20 percent opacity. Decorative only.
 */
export default function SlabFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 360"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("text-fog opacity-20", className)}
    >
      <path d="M120 150 L420 60 L560 130 L260 220 Z" />
      <path d="M120 150 L120 190 L260 260 L560 170 L560 130" />
      <path d="M260 220 L260 260" />
      <path
        d="M160 160 L440 76M200 170 L470 88M240 182 L500 100M280 194 L530 112"
        strokeOpacity={0.6}
      />
    </svg>
  );
}
