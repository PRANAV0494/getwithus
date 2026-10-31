import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

const VARIANTS: Record<Variant, string> = {
  primary:
    "h-12 rounded-[2px] bg-(--lab-accent) px-5 text-(--lab-on-accent) hover:bg-(--lab-accent-hover)",
  secondary:
    "h-12 rounded-[2px] border border-(--lab-border-strong) bg-(--lab-surface) px-5 text-(--lab-text) hover:border-(--lab-accent)",
  text: "lab-underline h-auto py-1 text-(--lab-text)",
};

/**
 * The engineering system's button: a link styled as primary (cyan), secondary
 * (outlined panel), or text. Square corners; the arrow extends on hover and the
 * button itself never moves.
 */
export default function EngButton({
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
        "lab-nudge inline-flex items-center justify-center gap-2.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200",
        VARIANTS[variant],
        size === "sm" && variant !== "text" && "h-10 px-4 text-sm",
        className,
      )}
    >
      {children}
      <Icon icon={ArrowRight} size={16} className="lab-arrow" />
    </Link>
  );
}
