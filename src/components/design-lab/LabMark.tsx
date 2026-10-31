import { MARK_GLYPH_PATH } from "@/lib/brand";
import { cn } from "@/lib/cn";

type LabMarkProps = {
  /** Fill of the tile and of the glyph. */
  tile: string;
  glyph: string;
  /** Corner radius in the mark's 64 unit box. */
  radius?: number;
  size?: number;
  className?: string;
};

/** The "g" mark recoloured for a concept. Decorative: the wordmark beside it carries the name. */
export default function LabMark({ tile, glyph, radius = 14, size = 28, className }: LabMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <rect width={64} height={64} rx={radius} fill={tile} />
      <path d={MARK_GLYPH_PATH} fill={glyph} />
    </svg>
  );
}
