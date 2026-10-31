import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Swaps the label for a spinner of the same width and disables the button. */
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonElementProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type AnchorElementProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

type ButtonProps = ButtonElementProps | AnchorElementProps;

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control border type-button transition-colors duration-150 ease-out disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-signal text-ink hover:bg-signal-2 active:bg-signal-2 disabled:bg-ink-3 disabled:text-fog-3",
  secondary:
    "border-line-strong bg-transparent text-fog hover:border-fog-3 hover:bg-ink-3 disabled:text-fog-3",
  ghost: "border-transparent bg-transparent text-fog-2 hover:bg-ink-3 disabled:text-fog-3",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5",
  md: "h-11 px-[18px]",
  lg: "h-12 px-6",
};

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * The one button. Renders a `<button>`, or a link when `href` is passed. Hover
 * changes background or border color only; nothing moves.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", loading = false, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const label = loading ? (
    <>
      <span className="invisible inline-flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 inline-flex items-center justify-center">
        <LoaderCircle size={16} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
        <span className="sr-only">Working</span>
      </span>
    </>
  ) : (
    children
  );

  if (props.href !== undefined) {
    const {
      href,
      variant: _v,
      size: _s,
      loading: _l,
      className: _c,
      children: _ch,
      ...rest
    } = props;
    if (isInternal(href)) {
      return (
        <Link href={href} className={classes} {...rest}>
          {label}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {label}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    loading: _l,
    className: _c,
    children: _ch,
    type = "button",
    disabled,
    ...rest
  } = props;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {label}
    </button>
  );
}
