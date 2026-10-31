"use client";

import { Toaster } from "sonner";

/**
 * The toast region, themed to the brand tokens. Trigger toasts with `toast()`
 * from "sonner"; the text uses the same verb as the control that caused it.
 */
export default function Toast() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      gap={8}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[min(356px,calc(100vw-32px))] items-start gap-3 rounded-card border border-line-strong bg-ink-3 p-4 type-small text-fog",
          title: "font-medium text-fog",
          description: "mt-0.5 text-fog-2",
          success: "[&_[data-icon]]:text-ok",
          error: "[&_[data-icon]]:text-err",
          icon: "mt-0.5 shrink-0",
        },
      }}
    />
  );
}
