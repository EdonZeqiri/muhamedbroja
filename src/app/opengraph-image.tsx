import { ImageResponse } from "next/og";

export const alt = "Dr. Muhamed Broja - Shkrime Islame";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1D1D1F 0%, #2a2a2c 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Decorative top line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#c29464",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />
        <span
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "#c29464",
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          MB
        </span>
        <span
          style={{
            fontSize: 42,
            color: "#ffffff",
            marginTop: 24,
            fontWeight: 400,
            letterSpacing: 1,
          }}
        >
          Dr. Muhamed Broja
        </span>
        <span
          style={{
            fontSize: 22,
            color: "#999999",
            marginTop: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Shkrime, Ligjerata dhe Mësime Islame
        </span>
        {/* Decorative bottom line */}
        <div
          style={{
            width: 50,
            height: 2,
            background: "#c29464",
            borderRadius: 2,
            marginTop: 40,
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
