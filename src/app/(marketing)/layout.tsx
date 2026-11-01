import UtmCapture from "@/components/forms/UtmCapture";
import Footer from "@/components/layout/Footer";
import GridBackdrop from "@/components/layout/GridBackdrop";
import Header from "@/components/layout/Header";
import RevealObserver from "@/components/layout/RevealObserver";
import SmoothScroll from "@/components/motion/SmoothScroll";

/**
 * Every marketing page is fully static: built from src/content and src/config only.
 * `navigation` makes the build fail if any page in this group reads request data.
 */
export const ensureStatic = "navigation";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <GridBackdrop />
      <Header />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <UtmCapture />
      <RevealObserver />
      <SmoothScroll />
    </>
  );
}
