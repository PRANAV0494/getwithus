"use client";

import { RadioGroup as RadixRadioGroup } from "radix-ui";
import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type RadioOption = { value: string; label: string; description?: string };

type RadioGroupProps = Omit<ComponentProps<typeof RadixRadioGroup.Root>, "children"> & {
  options: readonly RadioOption[];
};

/** A vertical list of choices, one selectable. Arrow keys move between options. */
export default function RadioGroup({ options, className, ...props }: RadioGroupProps) {
  const baseId = useId();
  return (
    <RadixRadioGroup.Root className={cn("grid gap-2", className)} {...props}>
      {options.map((option, index) => {
        const itemId = `${baseId}-${index}`;
        return (
          <div
            key={option.value}
            className="flex items-start gap-3 rounded-control border border-line bg-ink-2 px-4 py-3 transition-colors duration-150 ease-out hover:border-line-strong has-data-[state=checked]:border-signal"
          >
            <RadixRadioGroup.Item
              id={itemId}
              value={option.value}
              className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink transition-colors duration-150 ease-out data-[state=checked]:border-signal"
            >
              <RadixRadioGroup.Indicator className="block size-2 rounded-full bg-signal" />
            </RadixRadioGroup.Item>
            <label htmlFor={itemId} className="flex-1 cursor-pointer text-fog">
              {option.label}
              {option.description ? (
                <span className="mt-0.5 block type-small text-fog-2">{option.description}</span>
              ) : null}
            </label>
          </div>
        );
      })}
    </RadixRadioGroup.Root>
  );
}
