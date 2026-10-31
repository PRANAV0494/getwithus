import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { MARK_GLYPH_PATH, MARK_RADIUS_RATIO } from "@/lib/brand";

// Read once at module scope; the font does not depend on the request.
const schibstedSemiBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/SchibstedGrotesk-SemiBold.ttf"),
);

const INK = "#0B0E13";
const FOG = "#E6E9EE";
const FOG_2 = "#9AA3B2";
const LAMP = "#F0B35A";

export const ogImageSize = { width: 1200, height: 630 };

/**
 * The Open Graph card: brand mark and wordmark, an optional kicker, and the page
 * title in Schibsted Grotesk on ink, with a single lamp accent. No photos.
 */
export function renderOgImage({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        padding: 80,
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="56" height="56" viewBox="0 0 64 64">
          <rect width="64" height="64" rx={64 * MARK_RADIUS_RATIO} fill={LAMP} />
          <path d={MARK_GLYPH_PATH} fill={INK} />
        </svg>
        <span style={{ fontSize: 34, color: FOG, letterSpacing: "-0.02em" }}>{site.wordmark}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {kicker ? <span style={{ fontSize: 28, color: FOG_2 }}>{kicker}</span> : null}
        <span
          style={{
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: FOG,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: "flex", width: 96, height: 6, borderRadius: 3, background: LAMP }} />
    </div>,
    {
      ...ogImageSize,
      fonts: [{ name: "Schibsted Grotesk", data: schibstedSemiBold, weight: 600, style: "normal" }],
    },
  );
}
