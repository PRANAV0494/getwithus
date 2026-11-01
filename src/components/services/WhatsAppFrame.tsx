import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

type WhatsAppFrameProps = {
  ref?: Ref<HTMLDivElement>;
  typing?: boolean;
  /** Fades the conversation out between loops. */
  fading?: boolean;
  children?: ReactNode;
};

/**
 * The chat window of the WhatsApp demo: header (avatar, name, status, the amber
 * "live demo" badge) and a 300 px body with messages anchored to the bottom.
 * Rendered empty as the placeholder until the demo loads, at the same size.
 * Screen readers get a one-line summary instead of the animation.
 */
export default function WhatsAppFrame({
  ref,
  typing = false,
  fading = false,
  children,
}: WhatsAppFrameProps) {
  return (
    <div ref={ref} className="mt-7 max-w-[420px] border border-line-strong bg-[#0b0f13]">
      <p className="sr-only">
        Example WhatsApp conversation: a customer asks to book a haircut on Saturday, the AI
        assistant offers three times, books 14:30 with Priya, and sets a reminder for Friday at
        18:00.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-line bg-[#10161b] px-3.5 py-3">
          <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#1f3b33] text-[0.95rem] font-semibold text-[#7ee2b8]">
            G
          </span>
          <span className="min-w-0">
            <span className="block text-[0.95rem] leading-tight font-semibold">Glow Studio</span>
            <span
              className={cn(
                "block min-h-4 text-[0.78rem] leading-snug",
                typing ? "text-[#7ee2b8]" : "text-fog-2",
              )}
            >
              {typing ? "typing…" : "AI assistant, online"}
            </span>
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 border border-amber/35 px-2 py-0.5 font-mono text-[0.72rem] text-amber">
            <span className="live-dot size-1.5 rounded-full bg-amber" />
            live demo
          </span>
        </div>
        <div
          className={cn(
            "flex h-[300px] flex-col justify-end gap-2 overflow-hidden bg-[radial-gradient(rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:14px_14px] p-3.5 transition-opacity duration-400",
            fading && "opacity-0",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
