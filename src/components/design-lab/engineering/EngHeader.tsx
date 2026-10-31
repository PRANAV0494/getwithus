import Link from "next/link";
import LabMark from "@/components/design-lab/LabMark";
import ScrollSpyLinks from "@/components/design-lab/ScrollSpyLinks";
import EngButton from "@/components/design-lab/engineering/EngButton";
import EngMobileMenu from "@/components/design-lab/engineering/EngMobileMenu";
import { container } from "@/components/design-lab/engineering/tones";
import { cn } from "@/lib/cn";

/**
 * The sticky graphite navigation: wordmark, in-page links with scroll spy and a
 * cyan active state, one primary action, and the phone menu below 1024 px.
 */
export default function EngHeader({
  brand,
  links,
  action,
}: {
  brand: string;
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-(--lab-border) bg-(--lab-bg)">
      <div className={cn(container, "flex h-16 items-center justify-between gap-6")}>
        <Link
          href="#top"
          className="flex items-center gap-2.5 text-[17px] font-semibold [font-stretch:92%]"
        >
          <LabMark tile="#2CD5E6" glyph="#061417" radius={4} size={26} />
          {brand}
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ScrollSpyLinks
            links={links}
            className="flex items-center gap-7"
            linkClassName="lab-underline py-1 text-[15px] text-(--lab-text-2) hover:text-(--lab-text) aria-[current=true]:text-(--lab-accent)"
          />
        </nav>
        <div className="flex items-center gap-3">
          <EngButton href={action.href} size="sm" className="hidden sm:inline-flex">
            {action.label}
          </EngButton>
          <div className="lg:hidden">
            <EngMobileMenu links={links} action={action} />
          </div>
        </div>
      </div>
    </header>
  );
}
