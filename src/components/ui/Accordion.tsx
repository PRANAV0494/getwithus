"use client";

import { Plus } from "lucide-react";
import { Accordion as RadixAccordion } from "radix-ui";
import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type AccordionItem = { id: string; question: string; answer: ReactNode };

type AccordionProps = { items: readonly AccordionItem[]; className?: string };

/** Questions that expand to answers. Each trigger sits in an h3, so FAQs keep a heading outline. */
export default function Accordion({ items, className }: AccordionProps) {
  return (
    <RadixAccordion.Root type="multiple" className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id} className="border-b border-line">
          <RadixAccordion.Header className="m-0">
            <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left type-h4 text-ink transition-colors duration-150 ease-out hover:text-accent">
              {item.question}
              <Icon
                icon={Plus}
                size={20}
                className="shrink-0 text-accent transition-transform duration-200 ease-out group-data-[state=open]:rotate-45"
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="max-w-[68ch] pb-5 text-body">{item.answer}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
