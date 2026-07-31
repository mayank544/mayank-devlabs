import { ImageResponse } from "next/og";

export const alt =
  "Mayank DevLabs - Mayank Kumar Full-Stack Developer Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #020403 0%, #07110d 55%, #020706 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "460px",
            height: "460px",
            right: "-100px",
            top: "-120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,170,0.25) 0%, rgba(0,255,170,0) 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "330px",
            height: "330px",
            left: "-100px",
            bottom: "-120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,180,255,0.18) 0%, rgba(0,180,255,0) 70%)",
          }}
        />

        <div
          style={{
            margin: "42px",
            padding: "58px 64px",
            width: 1116,
            height: 546,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(0,255,170,0.32)",
            borderRadius: "28px",
            background: "rgba(4, 10, 8, 0.78)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "25px",
              letterSpacing: "7px",
              color: "#00ffaa",
            }}
          >
            MAYANK DEVLABS
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: 800,
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              MAYANK KUMAR
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "22px",
                fontSize: "31px",
                color: "#a8b8b1",
                letterSpacing: "3px",
              }}
            >
              FULL-STACK DEVELOPER
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "26px",
                fontSize: "21px",
                color: "#00ffaa",
                letterSpacing: "2px",
              }}
            >
              MERN · NEXT.JS · AI · CYBERSECURITY
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              color: "#82918b",
            }}
          >
            <span>Modern digital experiences.</span>
            <span>mayank-devlabs.netlify.app</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}