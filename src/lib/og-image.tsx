import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { MARK_GLYPH_PATH, MARK_RADIUS_RATIO } from "@/lib/brand";

// Read once at module scope; the font does not depend on the request.
const bricolageExtraBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/BricolageGrotesque-ExtraBold.ttf"),
);

// The light theme's tokens (tokens.css), as solid colours.
const BG = "#FFFFFF";
const SOFT = "#F4F7F9";
const INK = "#0F1B2D";
const BODY = "#46515F";
const ACCENT = "#0E7C86";
const ACCENT_INK = "#FFFFFF";

export const ogImageSize = { width: 1200, height: 630 };

/**
 * The Open Graph card in the light design: brand mark and wordmark, an
 * optional kicker, and the page title in Bricolage Grotesque on white, with
 * one accent bar. Solid colours only, no photos.
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
        background: BG,
        borderBottom: `16px solid ${SOFT}`,
        padding: 80,
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="60" height="60" viewBox="0 0 64 64">
          <rect width="64" height="64" rx={64 * MARK_RADIUS_RATIO * 4} fill={ACCENT} />
          <path d={MARK_GLYPH_PATH} fill={ACCENT_INK} />
        </svg>
        <span style={{ fontSize: 38, color: INK, letterSpacing: "-0.02em" }}>{site.wordmark}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {kicker ? <span style={{ fontSize: 30, color: BODY }}>{kicker}</span> : null}
        <span
          style={{
            fontSize: 76,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            color: INK,
            maxWidth: 1000,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{ display: "flex", width: 120, height: 8, borderRadius: 4, background: ACCENT }}
      />
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { name: "Bricolage Grotesque", data: bricolageExtraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
