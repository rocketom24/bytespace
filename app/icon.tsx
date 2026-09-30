import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontSize: 20,
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
            right: 5,
            bottom: 6,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#ff7a59",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
