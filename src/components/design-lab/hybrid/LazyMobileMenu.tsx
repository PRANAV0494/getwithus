"use client";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

// The dialog code is fetched on first use (warmed on hover or focus): desktop visitors never download it.
const loadPanel = () => import("@/components/design-lab/hybrid/MobileMenuPanel");
const MobileMenuPanel = dynamic(loadPanel, { ssr: false });

/** The phone menu button. Keeps the menu's dialog out of the initial JavaScript. */
export default function LazyMobileMenu({
  links,
  action,
}: {
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const warm = () => void loadPanel();

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerEnter={warm}
        onFocus={warm}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-(--lab-border-strong) px-4 text-sm font-medium"
      >
        <Icon icon={Menu} size={20} />
        Menu
      </button>
      {requested ? (
        <MobileMenuPanel
          open={open}
          onOpenChange={setOpen}
          links={links}
          action={action}
          returnFocusRef={button}
        />
      ) : null}
    </>
  );
}
