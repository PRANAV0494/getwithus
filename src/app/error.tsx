"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { logger } from "@/lib/logger";

type ErrorPageProps = { error: unknown; retry: () => void };

function digestOf(error: unknown): string | undefined {
  if (error instanceof Error && "digest" in error && typeof error.digest === "string")
    return error.digest;
  return undefined;
}

/**
 * Route-level error page. Server errors carry a digest that also appears in the
 * server log; client errors get a short reference generated here and logged.
 */
export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const digest = digestOf(error);
  // Error boundaries render on the client only, so a random fallback ID cannot cause a hydration mismatch.
  const [reference] = useState(() => digest ?? crypto.randomUUID().slice(0, 8));

  useEffect(() => {
    logger.error("Render error shown to user", { reference, error });
  }, [reference, error]);

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <Container className="py-24">
        <p className="type-label text-accent">error</p>
        <h1 className="mt-5 type-display">Something went wrong</h1>
        <p className="mt-4 max-w-[52ch] type-lead text-body">
          This page could not load. Try again, and if it keeps happening, contact us with the
          reference below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={retry}>Try again</Button>
          <Button href="/" variant="secondary">
            Go to home
          </Button>
        </div>
        <p className="mt-6 type-small text-body">
          Reference: <span className="font-mono text-ink">{reference}</span>
        </p>
      </Container>
    </main>
  );
}
