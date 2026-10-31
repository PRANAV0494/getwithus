import { cn } from "@/lib/cn";

/**
 * Corner brackets that mark a panel's edges instead of rounded corners. They
 * turn cyan when the nearest `group` is hovered. Place inside a relative parent.
 */
export default function Brackets({ always = false }: { always?: boolean }) {
  const corner = cn(
    "absolute size-3 transition-colors duration-200",
    always ? "border-(--lab-accent)" : "border-(--lab-text-3) group-hover:border-(--lab-accent)",
  );
  return (
    <span aria-hidden="true" className="contents">
      <span className={cn(corner, "-top-px -left-px border-t border-l")} />
      <span className={cn(corner, "-top-px -right-px border-t border-r")} />
      <span className={cn(corner, "-bottom-px -left-px border-b border-l")} />
      <span className={cn(corner, "-right-px -bottom-px border-r border-b")} />
    </span>
  );
}
