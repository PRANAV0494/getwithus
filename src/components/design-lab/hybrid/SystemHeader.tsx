import Link from "next/link";
import LabMark from "@/components/design-lab/LabMark";
import ScrollSpyLinks from "@/components/design-lab/ScrollSpyLinks";
import LazyMobileMenu from "@/components/design-lab/hybrid/LazyMobileMenu";
import SystemButton from "@/components/design-lab/hybrid/SystemButton";
import { container, navyTone } from "@/components/design-lab/hybrid/tones";
import { cn } from "@/lib/cn";

type SystemHeaderProps = {
  brand: string;
  links: readonly { id: string; label: string }[];
  action: { label: string; href: string };
};

/**
 * The sticky navy navigation: wordmark, in-page links with scroll spy and a
 * drawn underline, one primary action, and the phone menu below 1024 px.
 */
export default function SystemHeader({ brand, links, action }: SystemHeaderProps) {
  return (
    <header className={cn(navyTone, "sticky top-0 z-40 border-b border-(--lab-border)")}>
      <div className={cn(container, "flex h-[72px] items-center justify-between gap-6")}>
        <Link href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold">
          <LabMark tile="#FFFFFF" glyph="#0B1631" radius={10} />
          {brand}
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ScrollSpyLinks
            links={links}
            className="flex items-center gap-8"
            linkClassName="lab-underline py-1 text-[15px] text-(--lab-text-2) hover:text-(--lab-text) aria-[current=true]:text-(--lab-text)"
          />
        </nav>
        <div className="flex items-center gap-3">
          <SystemButton
            href={action.href}
            variant="inverse"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {action.label}
          </SystemButton>
          <div className="lg:hidden">
            <LazyMobileMenu links={links} action={action} />
          </div>
        </div>
      </div>
    </header>
  );
}
