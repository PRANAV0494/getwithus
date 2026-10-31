import { Bot, Globe, Megaphone, Server, Smartphone, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/content/types";

/** The icon for each service line, shared by the mega menu and the home page. */
export const serviceIcons: Partial<Record<ServiceSlug, LucideIcon>> = {
  "web-development": Globe,
  "app-development": Smartphone,
  "agentic-automation": Bot,
  "digital-marketing": Megaphone,
  "custom-software": Server,
};
