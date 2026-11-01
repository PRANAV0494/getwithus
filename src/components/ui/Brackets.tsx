import { cn } from "@/lib/cn";

type BracketsProps = {
  /** Always signal, instead of muted until hover or active. */
  always?: boolean;
  /** Corners move 6 px outward while the parent `group` is hovered (fine pointers only). */
  spread?: boolean;
};

/**
 * Corner brackets that mark a panel's edges instead of rounded corners. Muted at
 * rest and signal on hover of the nearest `group` or while it carries
 * `data-active`, or signal always. The parent must be `relative`; the wrapper
 * takes no layout space.
 */
export default function Brackets({ always = false, spread = false }: BracketsProps) {
  const corner = cn(
    "absolute size-3 transition-[border-color,translate] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    always
      ? "border-signal"
      : "border-fog-3 group-hover:border-signal group-data-[active]:border-signal",
  );
  return (
    <span aria-hidden="true" className="contents">
      <span
        className={cn(
          corner,
          "-top-px -left-px border-t border-l",
          spread &&
            "pointer-fine:group-hover:-translate-x-1.5 pointer-fine:group-hover:-translate-y-1.5",
        )}
      />
      <span
        className={cn(
          corner,
          "-top-px -right-px border-t border-r",
          spread &&
            "pointer-fine:group-hover:translate-x-1.5 pointer-fine:group-hover:-translate-y-1.5",
        )}
      />
      <span
        className={cn(
          corner,
          "-bottom-px -left-px border-b border-l",
          spread &&
            "pointer-fine:group-hover:-translate-x-1.5 pointer-fine:group-hover:translate-y-1.5",
        )}
      />
      <span
        className={cn(
          corner,
          "-right-px -bottom-px border-r border-b",
          spread &&
            "pointer-fine:group-hover:translate-x-1.5 pointer-fine:group-hover:translate-y-1.5",
        )}
      />
    </span>
  );
}
