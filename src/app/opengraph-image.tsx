import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Augie Aristito Sudiarto — Cyber Security Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFDC58",
          border: "2px solid #000",
          padding: "56px 64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "auto",
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#E63946",
              border: "2px solid #000",
            }}
          />
          <span
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#FF8A3D",
              border: "2px solid #000",
            }}
          />
          <span
            style={{
              width: 20,
              height: 20,
              backgroundColor: "#86EFAC",
              border: "2px solid #000",
            }}
          />
          <span
            style={{
              marginLeft: 12,
              fontSize: 28,
              fontWeight: 700,
              color: "#000",
            }}
          >
            augie@secure:~
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              color: "#000",
            }}
          >
            AUGIE ARISTITO
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              color: "#000",
            }}
          >
            SUDIARTO
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              fontWeight: 700,
              color: "#000",
            }}
          >
            Cybersecurity Engineering Student — Full Stack Developer — Network
            Engineer — AI/ML Enthusiast
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#000",
            }}
          >
            augie.my.id
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#000",
              padding: "8px 24px",
              border: "2px solid #000",
              boxShadow: "6px 6px 0 0 #000",
            }}
          >
            SECURE SOFTWARE
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
