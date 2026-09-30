import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ByteSpace — Learn to build, one lesson at a time.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#fdf6ef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#16211b" }}>ByteSpace</span>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff7a59",
              display: "flex",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: "#16211b",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Learn to build, one lesson at a time.
        </span>
        <span
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#4a554d",
            maxWidth: 780,
          }}
        >
          Stream, learn, and level up with hundreds of expert-led courses across design, code,
          and business.
        </span>
      </div>
    ),
    { ...size }
  );
}
