import MegaMenu from "@/components/layout/MegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { visibleNav } from "@/config/site";
import { serviceLines } from "@/content/services/catalog";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

/** Sticky 64 px header: logo, desktop navigation with the services mega menu, and the primary action. */
export default function Header() {
  const links = visibleNav(getPublishedCaseStudies().length > 0);
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-ink">
      <Container className="flex h-full items-center justify-between gap-6">
        <Logo />
        <MegaMenu services={serviceLines} links={links} />
        <div className="hidden lg:block">
          <Button href="/start" size="sm">
            Start a project
          </Button>
        </div>
        <MobileMenu services={serviceLines} links={links} />
      </Container>
    </header>
  );
}
