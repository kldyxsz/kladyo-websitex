export default function Signature() {
  return (
    <html>
      <head><meta charSet="UTF-8" /></head>
      <body style={{ margin: 0, padding: 40, background: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
          👇 İmzayı seç, kopyala ve Gmail&apos;e yapıştır
        </p>

        <div style={{ display: "inline-block", background: "#ffffff", padding: "24px 28px", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

          {/* Logo */}
          <div style={{ marginBottom: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Kladyo.png" alt="Kladyo" width={200} height={50} style={{ display: "block", width: 100, height: 25 }} />
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,#5371D6,#8E8BBD,transparent)", marginBottom: 16 }} />

          {/* Name & Title */}
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.3px" }}>Şiyar Tekdemir</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5371D6", textTransform: "uppercase" as const, letterSpacing: "1px", marginTop: 3 }}>
            Founder &amp; CEO
          </div>

          {/* Divider */}
          <div style={{ width: 32, height: 2, background: "#5371D6", borderRadius: 2, margin: "12px 0", opacity: 0.3 }} />

          {/* Contact */}
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.8 }}>
            <a href="mailto:siyar@kladyo.com" style={{ color: "#444", textDecoration: "none", display: "block" }}>
              ✉ siyar@kladyo.com
            </a>
            <a href="https://kladyo.com" style={{ color: "#444", textDecoration: "none", display: "block" }}>
              🌐 kladyo.com
            </a>
          </div>

        </div>
      </body>
    </html>
  );
}
