"use client";

import { Tabs } from "radix-ui";
import type { LabPractice } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

type PracticeTabsProps = {
  practices: readonly LabPractice[];
  listClassName?: string;
  triggerClassName?: string;
  panelClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  /** Text shown before each service name, for concepts that number or tag rows. */
  marker?: "none" | "index";
};

/**
 * The services of each practice behind keyboard-accessible tabs (arrow keys move
 * between practices). Concepts supply the look through class names; active
 * triggers carry data-state="active".
 */
export default function PracticeTabs({
  practices,
  listClassName,
  triggerClassName,
  panelClassName,
  gridClassName,
  cardClassName,
  titleClassName,
  bodyClassName,
  marker = "none",
}: PracticeTabsProps) {
  return (
    <Tabs.Root defaultValue={practices[0]?.id}>
      <Tabs.List aria-label="Practices" className={listClassName}>
        {practices.map((practice) => (
          <Tabs.Trigger key={practice.id} value={practice.id} className={triggerClassName}>
            {practice.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {practices.map((practice) => (
        <Tabs.Content key={practice.id} value={practice.id} className={panelClassName}>
          <ul className={gridClassName}>
            {practice.services.map((service, index) => (
              <li key={service.name} className={cardClassName}>
                <h3 className={titleClassName}>
                  {marker === "index" ? (
                    <span className="mr-3 font-mono text-xs text-(--lab-text-3)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                  {service.name}
                </h3>
                <p className={cn("mt-2", bodyClassName)}>{service.description}</p>
              </li>
            ))}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
