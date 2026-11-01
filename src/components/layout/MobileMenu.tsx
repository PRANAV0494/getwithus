"use client";

import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import type { ServiceSummary } from "@/content/types";

type MobileMenuProps = {
  services: readonly ServiceSummary[];
  links: readonly { label: string; href: string }[];
};

// The sheet (a dialog with focus trap and scroll lock) is fetched on first use: desktop never needs it.
const loadSheet = () => import("@/components/ui/Sheet");
const Sheet = dynamic(loadSheet, { ssr: false });

const menuButtonClasses =
  "inline-flex h-9 items-center gap-2 rounded-control border border-line-strong px-3 type-button text-fog transition-colors duration-150 ease-out hover:border-fog-3";

/** Below 1024 px: a menu button that opens a full-height sheet with every link. */
export default function MobileMenu({ services, links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [requested, setRequested] = useState(false);
  const close = () => setOpen(false);
  const warm = () => void loadSheet();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        ref={menuButton}
        type="button"
        className={menuButtonClasses}
        aria-expanded={open}
        onPointerEnter={warm}
        onFocus={warm}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
      >
        <Icon icon={Menu} size={16} />
        Menu
      </button>
      {requested ? (
        <Sheet open={open} onOpenChange={setOpen} title="Menu" returnFocusRef={menuButton}>
          <div className="flex h-10 items-center justify-between">
            <Logo onClick={close} />
            <button type="button" className={menuButtonClasses} onClick={close}>
              <Icon icon={X} size={16} />
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="border-b border-line">
              <li className="border-t border-line">
                <Link href="/services" onClick={close} className="block py-3.5 type-h4 text-fog">
                  Services
                </Link>
                <ul className="grid gap-0.5 pb-3 pl-4">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link href={service.href} onClick={close} className="block py-2 text-fog-2">
                        {service.name}
                      </Link>
                      {service.children?.map((child) => (
                        <Link
                          key={child.slug}
                          href={child.href}
                          onClick={close}
                          className="block py-2 pl-4 text-fog-2"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              </li>
              {links.map((link) => (
                <li key={link.href} className="border-t border-line">
                  <Link href={link.href} onClick={close} className="block py-3.5 type-h4 text-fog">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8">
            <MagneticButton className="w-full">
              <Button href="/start" onClick={close} className="w-full">
                Start a project
              </Button>
            </MagneticButton>
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}
