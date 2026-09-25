import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "BidTech - Business Innovative Digital Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #07130b 0%, #0c2617 50%, #051008 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(95,201,74,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(95,201,74,0.15)",
              border: "1px solid rgba(95,201,74,0.35)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#5fc94a",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#8ee67b",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Software House Indonesia
            </span>
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#94a3b8",
            }}
          >
            Jakarta • Batam
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "76px",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                color: "#ffffff",
              }}
            >
              BID
            </span>
            <span
              style={{
                fontSize: "76px",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                color: "#5fc94a",
              }}
            >
              TECH
            </span>
          </div>

          <div
            style={{
              fontSize: "34px",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.2,
            }}
          >
            Business Innovative Digital Solutions
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            Website Development, Mobile Apps (Android & iOS), dan Custom Business Systems (ERP & CRM) untuk akselerasi pertumbuhan bisnis Anda.
          </div>
        </div>

        {/* Bottom Feature Tags & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Website Development", "Mobile Applications", "Custom ERP / CRM", "Template Catalog"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#5fc94a",
              letterSpacing: "0.5px",
            }}
          >
            bidtech.co.id
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
