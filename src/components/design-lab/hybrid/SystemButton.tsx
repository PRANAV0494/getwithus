import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "inverse" | "outline" | "text";

const VARIANTS: Record<Variant, string> = {
  primary:
    "h-12 rounded-lg bg-(--lab-accent) px-6 text-(--lab-on-accent) hover:bg-(--lab-accent-hover)",
  inverse: "h-12 rounded-lg bg-[#FFFFFF] px-6 text-[#0B1631] hover:bg-[#E6ECFF]",
  outline:
    "h-12 rounded-lg border border-(--lab-border-strong) px-6 text-(--lab-text) hover:border-(--lab-text)",
  text: "lab-underline h-auto py-1 text-(--lab-text)",
};

/**
 * The design system's one button: a link styled as primary (blue), inverse
 * (white, for navy sections), outline, or text. The arrow moves on hover; the
 * button never does.
 */
export default function SystemButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "lab-nudge inline-flex items-center justify-center gap-2 text-[15px] font-medium whitespace-nowrap transition-colors duration-200",
        VARIANTS[variant],
        size === "sm" && variant !== "text" && "h-10 px-5 text-sm",
        className,
      )}
    >
      {children}
      <Icon icon={ArrowRight} size={16} className="lab-arrow" />
    </Link>
  );
}
