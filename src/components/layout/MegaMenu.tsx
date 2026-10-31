"use client";

import {
  Bot,
  ChevronDown,
  Globe,
  Megaphone,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import Icon from "@/components/ui/Icon";
import type { ServiceSlug, ServiceSummary } from "@/content/types";
import { cn } from "@/lib/cn";

const serviceIcons: Partial<Record<ServiceSlug, LucideIcon>> = {
  "web-development": Globe,
  "app-development": Smartphone,
  "agentic-automation": Bot,
  "digital-marketing": Megaphone,
  "custom-software": Server,
};

const navLinkClasses =
  "inline-flex h-9 items-center gap-1.5 rounded-control px-3 type-button text-fog-2 transition-colors duration-150 ease-out hover:bg-ink-3 hover:text-fog data-[state=open]:bg-ink-3 data-[state=open]:text-fog";

type MegaMenuProps = {
  services: readonly ServiceSummary[];
  links: readonly { label: string; href: string }[];
};

/**
 * Desktop navigation. "Services" opens a two-column panel on hover (120 ms
 * intent delay), click, or Enter; Escape and moving focus out of the panel close it.
 */
export default function MegaMenu({ services, links }: MegaMenuProps) {
  return (
    <NavigationMenu.Root
      delayDuration={120}
      aria-label="Primary"
      className="relative hidden lg:block"
    >
      <NavigationMenu.List className="flex items-center gap-1">
        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className={cn(navLinkClasses, "group")}>
            Services
            <Icon
              icon={ChevronDown}
              size={16}
              className="transition-transform duration-150 ease-out group-data-[state=open]:rotate-180"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-[calc(100%+10px)] left-0 w-[720px] rounded-card border border-line bg-ink-2 p-4 data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {services.map((service) => {
                const ServiceIcon = serviceIcons[service.slug];
                return (
                  <li key={service.slug}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={service.href}
                        className="grid grid-cols-[16px_1fr] gap-3 rounded-control px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-ink-3"
                      >
                        {ServiceIcon ? (
                          <Icon icon={ServiceIcon} size={16} className="mt-1 text-fog-2" />
                        ) : (
                          <span />
                        )}
                        <span>
                          <span className="block type-h4 text-fog">{service.name}</span>
                          <span className="mt-0.5 block type-small text-fog-2">
                            {service.menuDescription}
                          </span>
                        </span>
                      </Link>
                    </NavigationMenu.Link>
                    {service.children?.length ? (
                      <ul className="grid gap-0.5 pr-3 pb-1.5 pl-10">
                        {service.children.map((child) => (
                          <li key={child.slug}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={child.href}
                                className="block rounded-tag px-2 py-1 type-small text-fog-2 transition-colors duration-150 ease-out hover:bg-ink-3 hover:text-fog"
                              >
                                {child.name}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="mt-2.5 border-t border-line px-3 pt-3">
              <NavigationMenu.Link asChild>
                <Link
                  href="/services"
                  className="type-small text-lamp transition-colors duration-150 ease-out hover:text-lamp-2"
                >
                  All services
                </Link>
              </NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        {links.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link asChild>
              <Link href={link.href} className={navLinkClasses}>
                {link.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
