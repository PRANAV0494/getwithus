import MegaMenu from "@/components/layout/MegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import MagneticButton from "@/components/motion/MagneticButton";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { visibleNav } from "@/config/site";
import { serviceLines } from "@/content/services/catalog";
import { getPublishedCaseStudies } from "@/features/case-studies/getPublishedCaseStudies";

/** Sticky header: logo, desktop navigation with the services mega menu, the theme switch, and the primary action. */
export default function Header() {
  const links = visibleNav(getPublishedCaseStudies().length > 0);
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-bg">
      <Container className="flex h-full items-center justify-between gap-6">
        <Logo />
        <MegaMenu services={serviceLines} links={links} />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden lg:block">
            <MagneticButton>
              <Button href="/start" size="sm">
                Start a project
              </Button>
            </MagneticButton>
          </div>
          <MobileMenu services={serviceLines} links={links} />
        </div>
      </Container>
    </header>
  );
}
