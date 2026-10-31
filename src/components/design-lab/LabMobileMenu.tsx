"use client";

import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type LabMobileMenuProps = {
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
  triggerClassName?: string;
  panelClassName?: string;
  linkClassName?: string;
  actionClassName?: string;
};

/**
 * The phone menu for every concept: a full-screen panel on Radix Dialog, so
 * focus is trapped, Escape closes it, and choosing a link closes it too.
 */
export default function LabMobileMenu({
  links,
  action,
  triggerClassName,
  panelClassName,
  linkClassName,
  actionClassName,
}: LabMobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border border-(--lab-border-strong) px-4 text-sm font-medium",
          triggerClassName,
        )}
      >
        <Icon icon={Menu} size={20} />
        Menu
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "lab-menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto bg-(--lab-bg) px-6 pt-4 pb-8 text-(--lab-text)",
            panelClassName,
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-medium text-(--lab-text-2)">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-full border border-(--lab-border-strong)">
              <Icon icon={X} size={20} label="Close menu" />
            </Dialog.Close>
          </div>
          <nav aria-label="Primary" className="mt-10">
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <Dialog.Close asChild>
                    <a
                      href={`#${link.id}`}
                      className={cn(
                        "block border-b border-(--lab-border) py-4 text-2xl font-semibold",
                        linkClassName,
                      )}
                    >
                      {link.label}
                    </a>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={action.href}
            className={cn(
              "mt-10 inline-flex h-13 items-center justify-center rounded-full bg-(--lab-accent) px-6 font-semibold text-(--lab-on-accent)",
              actionClassName,
            )}
          >
            {action.label}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
