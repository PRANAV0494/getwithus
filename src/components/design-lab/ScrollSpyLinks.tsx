"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type ScrollSpyLinksProps = {
  links: readonly { id: string; label: string }[];
  className?: string;
  linkClassName?: string;
};

/**
 * In-page navigation that marks the section currently in the middle of the
 * viewport with aria-current, so each concept can style the active link.
 */
export default function ScrollSpyLinks({ links, className, linkClassName }: ScrollSpyLinksProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [links]);

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            aria-current={active === link.id ? "true" : undefined}
            className={cn(linkClassName)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
