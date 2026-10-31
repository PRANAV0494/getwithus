import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you asked for does not exist or has moved.",
};

/** The one centered page on the site. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="content" tabIndex={-1} className="outline-none">
        <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
          <p className="type-label text-signal">error 404</p>
          <h1 className="mt-5 type-display">Page not found</h1>
          <p className="mt-4 max-w-[48ch] type-lead text-fog-2">
            The page you asked for does not exist or has moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Go to home</Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
