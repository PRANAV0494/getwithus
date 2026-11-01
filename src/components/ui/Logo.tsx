import Link from "next/link";
import { site } from "@/config/site";
import { MARK_GLYPH_PATH } from "@/lib/brand";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Where the logo links. Pass `null` to render it without a link. */
  href?: string | null;
  showWordmark?: boolean;
  /** "lg" in the site header and footer, "md" in the admin. */
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const SIZES = {
  md: { mark: 28, radius: 8, text: "text-[1.125rem]" },
  lg: { mark: 36, radius: 10, text: "text-[1.375rem]" },
} as const;

/** The brand mark (the glyph on an accent tile with rounded corners) and the wordmark. */
export default function Logo({
  href = "/",
  showWordmark = true,
  size = "lg",
  className,
  onClick,
}: LogoProps) {
  const { mark, radius, text } = SIZES[size];
  const content = (
    <>
      <svg
        viewBox="0 0 64 64"
        width={mark}
        height={mark}
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect width="64" height="64" rx={(radius / mark) * 64} className="fill-accent" />
        <path d={MARK_GLYPH_PATH} className="fill-accent-ink" />
      </svg>
      {showWordmark ? (
        <span
          className={cn(
            "font-display leading-none font-extrabold tracking-[-0.02em] text-ink",
            text,
          )}
        >
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
