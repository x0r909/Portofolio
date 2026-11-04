import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Augie Aristito Sudiarto — Cyber Security Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The card is the site's hero, flattened: same ground, same phosphor, same
   window chrome. ImageResponse cannot read CSS custom properties or the
   next/font families, so the three tokens it needs are literal here —
   change them together with `:root` in globals.css. */
const BG = "#0a0e0a";
const BG_ELEV = "#101710";
const BORDER = "#1f3a1f";
const FG = "#c8f7c8";
const FG_DIM = "#6b8f6b";
const ACCENT = "#39ff14";
const CYAN = "#00e5ff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          border: `1px solid ${BORDER}`,
          padding: "0",
          fontFamily: "monospace",
        }}
      >
        {/* window title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 24px",
            borderBottom: `1px solid ${BORDER}`,
            backgroundColor: BG_ELEV,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#ff3b5c",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#ffb000",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: ACCENT,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              marginLeft: 12,
              fontSize: 22,
              color: FG_DIM,
            }}
          >
            x0r909@portfolio: ~
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "48px 64px 40px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: FG_DIM }}>
            <span style={{ color: ACCENT }}>x0r909@portfolio</span>
            <span>:~$</span>
            <span style={{ color: FG }}>&nbsp;whoami</span>
            <span style={{ color: ACCENT }}>_</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
            }}
          >
            <span
              style={{
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: "-1px",
                color: FG,
              }}
            >
              AUGIE ARISTITO
            </span>
            <span
              style={{
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: "-1px",
                color: ACCENT,
              }}
            >
              SUDIARTO
            </span>
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              lineHeight: 1.4,
              color: FG_DIM,
              maxWidth: 900,
            }}
          >
            Cybersecurity Engineering Student — Network Engineer — AI/ML
            Enthusiast
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 64px 32px",
          }}
        >
          <span style={{ fontSize: 26, color: FG_DIM }}>augie.my.id</span>
          <span
            style={{
              fontSize: 24,
              color: CYAN,
              padding: "6px 16px",
              border: `1px solid ${CYAN}`,
            }}
          >
            [ SECURE SOFTWARE ]
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
