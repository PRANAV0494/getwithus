import Link from "next/link";
import { site } from "@/config/site";
import { MARK_GLYPH_PATH, MARK_RADIUS_RATIO } from "@/lib/brand";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Where the logo links. Pass `null` to render it without a link. */
  href?: string | null;
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
};

/** The brand mark (signal tile with the glyph) and the wordmark. */
export default function Logo({ href = "/", showWordmark = true, className, onClick }: LogoProps) {
  const content = (
    <>
      <svg viewBox="0 0 64 64" width={24} height={24} aria-hidden="true" focusable="false">
        <rect width="64" height="64" rx={64 * MARK_RADIUS_RATIO} className="fill-accent" />
        <path d={MARK_GLYPH_PATH} className="fill-accent-ink" />
      </svg>
      {showWordmark ? (
        <span className="text-[1.125rem] leading-none font-semibold tracking-[-0.01em] text-ink [font-stretch:92%]">
          {site.wordmark}
        </span>
      ) : null}
    </>
  );

  const classes = cn("inline-flex items-center gap-2.5 rounded-tag", className);

  if (href === null) {
    return (
      <span className={classes} role="img" aria-label={site.name}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={`${site.name} home`} onClick={onClick}>
      {content}
    </Link>
  );
}
