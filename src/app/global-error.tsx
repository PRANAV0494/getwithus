"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

type GlobalErrorProps = { error: unknown; retry: () => void };

// The root layout may have failed, so global styles and fonts are not guaranteed: inline styles only.
const colors = { ink: "#0B0E13", fog: "#E6E9EE", fog2: "#9AA3B2", lamp: "#F0B35A" };

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  const digest =
    error instanceof Error && "digest" in error && typeof error.digest === "string"
      ? error.digest
      : undefined;

  useEffect(() => {
    logger.error("Root layout error shown to user", { reference: digest, error });
  }, [digest, error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: colors.ink,
          color: colors.fog,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          colorScheme: "dark",
        }}
      >
        <title>Something went wrong</title>
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px" }}>
          <h1
            style={{
              fontSize: 32,
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: 16,
              maxWidth: "52ch",
              fontSize: 17,
              lineHeight: 1.55,
              color: colors.fog2,
            }}
          >
            The site could not load. Try again, and if it keeps happening, contact us with the
            reference below.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              marginTop: 32,
              height: 44,
              padding: "0 18px",
              border: 0,
              borderRadius: 6,
              background: colors.lamp,
              color: colors.ink,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {digest ? (
            <p style={{ marginTop: 24, fontSize: 14, color: colors.fog2 }}>
              Reference: <span style={{ color: colors.fog }}>{digest}</span>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
