export default function Signature() {
  return (
    <html>
      <head><meta charSet="UTF-8" /></head>
      <body style={{ margin: 0, padding: 40, background: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
          👇 İmzayı seç (gradient çizgiden logoya kadar), kopyala, Gmail&apos;e yapıştır
        </p>

        <div style={{ display: "inline-block", background: "#fff", padding: "20px 24px", borderRadius: 12 }}>
          <div style={{ width: 200, height: 2, background: "linear-gradient(90deg,#5371D6,#8E8BBD,transparent)", marginBottom: 16, borderRadius: 2 }} />
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.2px" }}>Şiyar Tekdemir</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5371D6", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: 3 }}>Founder &amp; CEO</div>
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <a href="mailto:siyar@kladyo.com" style={{ color: "#555", textDecoration: "none" }}>siyar@kladyo.com</a>
            {" · "}
            <a href="https://kladyo.com" style={{ color: "#555", textDecoration: "none" }}>kladyo.com</a>
          </div>
          <div style={{ marginTop: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Kladyo.png" alt="Kladyo" height={28} style={{ display: "block" }} />
          </div>
        </div>
      </body>
    </html>
  );
}
