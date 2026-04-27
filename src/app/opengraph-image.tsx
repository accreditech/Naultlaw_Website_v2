import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pillars = ["Commercial Leasing", "TREC Defense", "Owner Disputes"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1a1209",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Monogram badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2px solid #c9a96e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c9a96e",
              fontSize: "20px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            SN
          </div>
          <span
            style={{
              color: "#c9a96e",
              fontSize: "16px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.firmName}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "52px",
              fontWeight: "700",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {siteConfig.shortBrandTone}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "22px",
              marginTop: "24px",
              marginBottom: 0,
            }}
          >
            Tennessee · Sumner County &amp; Middle Tennessee
          </p>
        </div>

        {/* Footer pillars */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(201,169,110,0.3)",
          }}
        >
          {pillars.map((pillar) => (
            <span
              key={pillar}
              style={{
                color: "#c9a96e",
                fontSize: "16px",
                letterSpacing: "0.5px",
              }}
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
