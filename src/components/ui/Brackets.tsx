import { cn } from "@/lib/cn";

/**
 * Corner brackets that mark a panel's edges instead of rounded corners. Muted at
 * rest and signal on hover of the nearest `group` or while it carries
 * `data-active`, or signal always. The parent must be `relative`; the wrapper
 * takes no layout space.
 */
export default function Brackets({ always = false }: { always?: boolean }) {
  const corner = cn(
    "absolute size-3 transition-colors duration-200 ease-out",
    always
      ? "border-signal"
      : "border-fog-3 group-hover:border-signal group-data-[active]:border-signal",
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
