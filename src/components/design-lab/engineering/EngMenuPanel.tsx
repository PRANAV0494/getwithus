"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useRef, type RefObject } from "react";
import Icon from "@/components/ui/Icon";
import { mono } from "@/components/design-lab/engineering/tones";
import { cn } from "@/lib/cn";

type EngMenuPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
  /** The menu button, which gets focus back when the menu is dismissed. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

/**
 * The phone menu, loaded on first use. Radix Dialog traps focus and closes on
 * Escape. Dismissing it returns focus to the menu button; choosing a link closes
 * it and leaves focus with the destination.
 */
export default function EngMenuPanel({
  open,
  onOpenChange,
  links,
  action,
  returnFocusRef,
}: EngMenuPanelProps) {
  const viaLink = useRef(false);
  const choose = () => {
    viaLink.current = true;
    onOpenChange(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!viaLink.current) returnFocusRef.current?.focus();
            viaLink.current = false;
          }}
          className="lab-menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto bg-(--lab-bg) px-6 pt-4 pb-8 text-(--lab-text)"
        >
          <div className="flex h-10 items-center justify-between">
            <Dialog.Title className={cn(mono, "text-xs text-(--lab-text-3)")}>menu</Dialog.Title>
            <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-[2px] border border-(--lab-border-strong)">
              <Icon icon={X} size={20} label="Close menu" />
            </Dialog.Close>
          </div>
          <nav aria-label="Primary" className="mt-8">
            <ol>
              {links.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={choose}
                    className="flex items-baseline gap-4 border-b border-(--lab-border) py-4 text-2xl font-semibold [font-stretch:92%]"
                  >
                    <span aria-hidden="true" className={cn(mono, "text-xs text-(--lab-accent)")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <a
            href={action.href}
            className="mt-10 inline-flex h-13 items-center justify-center rounded-[2px] bg-(--lab-accent) px-6 font-medium text-(--lab-on-accent)"
          >
            {action.label}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
