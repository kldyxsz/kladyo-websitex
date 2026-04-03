export default function Signature() {
  return (
    <html>
      <head><meta charSet="UTF-8" /></head>
      <body style={{ margin: 0, padding: 40, background: "#f0f0f0", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
          👇 İmzayı seç, kopyala ve Gmail / Outlook&apos;a yapıştır
        </p>

        {/* Signature — Outlook compatible, table-based */}
        <table cellPadding={0} cellSpacing={0} border={0} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", borderCollapse: "collapse" }}>
          <tbody>
            {/* Logo */}
            <tr>
              <td style={{ paddingBottom: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://kladyo.com/Kladyo.png" alt="Kladyo" width={100} height={25} style={{ display: "block", border: 0 }} />
              </td>
            </tr>

            {/* Divider */}
            <tr>
              <td style={{ paddingBottom: 14 }}>
                <table cellPadding={0} cellSpacing={0} border={0} style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ backgroundColor: "#5371D6", height: 2, fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            {/* Name */}
            <tr>
              <td style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", paddingBottom: 3 }}>
                Şiyar Tekdemir
              </td>
            </tr>

            {/* Title */}
            <tr>
              <td style={{ fontSize: 11, fontWeight: 600, color: "#5371D6", textTransform: "uppercase" as const, letterSpacing: 1, paddingBottom: 12 }}>
                Founder &amp; CEO · Kladyo
              </td>
            </tr>

            {/* Email */}
            <tr>
              <td style={{ fontSize: 12, paddingBottom: 4 }}>
                ✉&nbsp;
                <a href="mailto:siyar@kladyo.com" style={{ color: "#444", textDecoration: "none" }}>
                  siyar@kladyo.com
                </a>
              </td>
            </tr>

            {/* Website */}
            <tr>
              <td style={{ fontSize: 12 }}>
                🌐&nbsp;
                <a href="https://kladyo.com" style={{ color: "#5371D6", textDecoration: "none" }}>
                  kladyo.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>

      </body>
    </html>
  );
}
