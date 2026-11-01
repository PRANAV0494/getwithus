import type { ReactNode, Ref } from "react";

/**
 * The terminal window: title bar and a body at least 360 px tall that announces
 * new lines politely. Rendered empty as the placeholder until the terminal
 * loads, at the same size.
 */
export default function TerminalFrame({
  ref,
  children,
}: {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}) {
  return (
    <div
      ref={ref}
      className="relative max-w-[880px] border border-line-strong bg-[#0a0d10] shadow-[0_30px_80px_rgb(0_0_0/0.45)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-fog-3">
        {[0, 1, 2].map((dot) => (
          <span key={dot} aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        ))}
        <span className="ml-2.5 font-mono text-[0.8125rem]">getwithus: start_project</span>
      </div>
      <div
        aria-live="polite"
        className="min-h-[360px] px-6 pt-[26px] pb-[30px] font-mono text-[0.9375rem]"
      >
        {children}
      </div>
    </div>
  );
}
