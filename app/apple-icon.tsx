import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16211b",
        }}
      >
        <span
          style={{
            fontSize: 104,
            fontWeight: 700,
            color: "#fdf6ef",
            lineHeight: 1,
          }}
        >
          B
        </span>
        <span
          style={{
            position: "absolute",
            right: 30,
            bottom: 34,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#ff7a59",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
