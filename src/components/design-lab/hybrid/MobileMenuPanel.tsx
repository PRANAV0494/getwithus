"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useRef, type RefObject } from "react";
import Icon from "@/components/ui/Icon";
import { navyTone, serif } from "@/components/design-lab/hybrid/tones";
import { cn } from "@/lib/cn";

type MobileMenuPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
  /** The menu button, which gets focus back when the menu is dismissed. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

/**
 * The phone menu itself, loaded on first use. Radix Dialog traps focus, closes
 * on Escape, and returns focus to the menu button; choosing a link leaves focus
 * with the destination.
 */
export default function MobileMenuPanel({
  open,
  onOpenChange,
  links,
  action,
  returnFocusRef,
}: MobileMenuPanelProps) {
  const viaLink = useRef(false);
  const close = () => {
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
          className={cn(
            navyTone,
            "lab-menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto px-6 pt-4 pb-8",
          )}
        >
          <div className="flex h-10 items-center justify-between">
            <Dialog.Title className="text-sm font-medium text-(--lab-text-2)">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-lg border border-(--lab-border-strong)">
              <Icon icon={X} size={20} label="Close menu" />
            </Dialog.Close>
          </div>
          <nav aria-label="Primary" className="mt-8">
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    className={cn(
                      serif,
                      "block border-b border-(--lab-border) py-4 text-[2.25rem] leading-tight",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={action.href}
            className="mt-10 inline-flex h-13 items-center justify-center rounded-lg bg-[#FFFFFF] px-6 font-medium text-[#0B1631]"
          >
            {action.label}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
