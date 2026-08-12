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
          background: "#1f38a8",
          color: "#f8f8f6",
          fontFamily: "serif",
          fontSize: 120,
          paddingRight: 22,
        }}
      >
        J
      </div>
    ),
    { ...size },
  );
}
