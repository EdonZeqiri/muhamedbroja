import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1D1D1F",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 700,
            color: "#c29464",
            fontFamily: "Georgia, serif",
            letterSpacing: -4,
          }}
        >
          MB
        </span>
      </div>
    ),
    { ...size }
  );
}
