import Link from "next/link";
import LabFootnote from "@/components/design-lab/LabFootnote";
import LabMark from "@/components/design-lab/LabMark";
import { container, navyTone, serif } from "@/components/design-lab/system/tones";
import { lab } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

type Column = { title: string; links: readonly { label: string; href: string }[] };

/** The navy footer: brand line, link columns, legal links, and the prototype note. */
export default function SystemFooter({ letter, name }: { letter: string; name: string }) {
  const columns: Column[] = [
    {
      title: "Practices",
      links: lab.practices.map((practice) => ({
        label: practice.name,
        href: `#services-${practice.id}`,
      })),
    },
    {
      title: "Company",
      links: lab.nav.map((link) => ({ label: link.label, href: `#${link.id}` })),
    },
    { title: "Legal", links: lab.footer.legal },
  ];
  return (
    <footer className={cn(navyTone, "border-t border-(--lab-border) [--lab-bg:#08112A]")}>
      <div className={cn(container, "grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
        <div>
          <p className="flex items-center gap-2.5 text-[17px] font-semibold">
            <LabMark tile="#FFFFFF" glyph="#0B1631" radius={10} />
            {lab.brand.name}
          </p>
          <p className={cn(serif, "mt-5 text-3xl leading-tight")}>{lab.brand.tagline}</p>
          <p className="mt-3 max-w-[34ch] text-sm text-(--lab-text-2)">{lab.footer.note}</p>
          <p className="mt-4 text-sm text-(--lab-text-2)">
            {lab.contact.emailLabel} <span className="text-(--lab-text)">{lab.contact.email}</span>
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 grid gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="lab-underline text-sm text-(--lab-text-2) hover:text-(--lab-text)"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={container}>
        <div className="flex flex-col gap-3 border-t border-(--lab-border) py-6 text-sm text-(--lab-text-2) md:flex-row md:justify-between">
          <p>{lab.footer.copyright}</p>
          <LabFootnote letter={letter} name={name} />
        </div>
      </div>
    </footer>
  );
}
