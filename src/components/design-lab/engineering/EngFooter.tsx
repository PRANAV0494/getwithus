import Link from "next/link";
import LabFootnote from "@/components/design-lab/LabFootnote";
import LabMark from "@/components/design-lab/LabMark";
import { container, mono } from "@/components/design-lab/engineering/tones";
import { lab } from "@/content/design-lab/content";
import { cn } from "@/lib/cn";

type Column = { title: string; links: readonly { label: string; href: string }[] };

/** The carbon footer: brand line, link columns, legal links, and the prototype note. */
export default function EngFooter({ letter, name }: { letter: string; name: string }) {
  const columns: Column[] = [
    {
      title: "practices",
      links: lab.practices.map((practice) => ({
        label: practice.name,
        href: `#services-${practice.id}`,
      })),
    },
    {
      title: "company",
      links: lab.nav.map((link) => ({ label: link.label, href: `#${link.id}` })),
    },
    { title: "legal", links: lab.footer.legal },
  ];
  return (
    <footer className="border-t border-(--lab-border) bg-[#0B0D0F]">
      <div className={cn(container, "grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]")}>
        <div>
          <p className="flex items-center gap-2.5 text-[17px] font-semibold [font-stretch:92%]">
            <LabMark tile="#2CD5E6" glyph="#061417" radius={4} size={26} />
            {lab.brand.name}
          </p>
          <p className="mt-4 font-medium">{lab.brand.tagline}</p>
          <p className="mt-2 max-w-[34ch] text-sm text-(--lab-text-2)">{lab.footer.note}</p>
          <p className="mt-4 text-sm text-(--lab-text-2)">
            {lab.contact.emailLabel} <span className="text-(--lab-text)">{lab.contact.email}</span>
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className={cn(mono, "text-xs text-(--lab-text-3)")}>{column.title}</h2>
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
        <div className="flex flex-col gap-3 border-t border-(--lab-border) py-6 text-sm text-(--lab-text-3) md:flex-row md:justify-between">
          <p>{lab.footer.copyright}</p>
          <LabFootnote letter={letter} name={name} />
        </div>
      </div>
    </footer>
  );
}
