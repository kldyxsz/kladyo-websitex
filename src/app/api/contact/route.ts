import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy init: Resend is instantiated at request time, not at module load.
// This allows the build to succeed without RESEND_API_KEY in the environment.
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = process.env.RESEND_FROM ?? "noreply@kladyo.com";
const TO_EMAIL = process.env.RESEND_TO ?? "info@kladyo.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body as {
      name: string;
      email: string;
      company: string;
      message: string;
    };

    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: "Eksik alan." }, { status: 400 });
    }

    const resend = getResend();
    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Yeni İletişim Talebi — ${name} / ${company}`,
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#F5F6F8;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
            <div style="padding:18px 24px;border-bottom:1px solid #E5E7EB;background:#FFF7ED;">
              <p style="margin:0;color:#9A3412;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Kladyo</p>
              <p style="margin:6px 0 0;color:#111827;font-size:18px;font-weight:700;">Yeni İletişim Talebi</p>
            </div>
            <div style="padding:24px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;color:#6B7280;font-size:12px;width:110px;vertical-align:top;">Ad Soyad</td>
                  <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#6B7280;font-size:12px;vertical-align:top;border-top:1px solid #F3F4F6;">E-posta</td>
                  <td style="padding:10px 0;color:#111827;font-size:14px;border-top:1px solid #F3F4F6;">
                    <a href="mailto:${email}" style="color:#B45309;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#6B7280;font-size:12px;vertical-align:top;border-top:1px solid #F3F4F6;">Şirket</td>
                  <td style="padding:10px 0;color:#111827;font-size:14px;border-top:1px solid #F3F4F6;">${company}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#6B7280;font-size:12px;vertical-align:top;border-top:1px solid #F3F4F6;">Mesaj</td>
                  <td style="padding:10px 0;color:#374151;font-size:14px;line-height:1.6;border-top:1px solid #F3F4F6;">${message.replace(/\n/g, "<br/>")}</td>
                </tr>
              </table>
            </div>
            <div style="padding:14px 24px;border-top:1px solid #E5E7EB;background:#FAFAFA;">
              <p style="margin:0;color:#6B7280;font-size:12px;">Bu e-posta kladyo.com iletişim formu aracılığıyla gönderilmiştir.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (notifyError) {
      console.error("Resend notify error:", notifyError);
      return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
    }

    const { error: userError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: TO_EMAIL,
      subject: "Kladyo — İletişim talebiniz alındı",
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#F5F6F8;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
            <div style="padding:18px 24px;border-bottom:1px solid #E5E7EB;background:#FFF7ED;">
              <p style="margin:0;color:#9A3412;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Kladyo</p>
              <p style="margin:6px 0 0;color:#111827;font-size:18px;font-weight:700;">Talebiniz alındı</p>
            </div>
            <div style="padding:24px;">
              <p style="margin:0 0 10px;color:#111827;font-size:15px;line-height:1.6;">
                Merhaba ${name}, iletişim talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                Bu e-postaya cevap vererek bize doğrudan ulaşabilirsiniz.
              </p>
            </div>
            <div style="padding:14px 24px;border-top:1px solid #E5E7EB;background:#FAFAFA;">
              <p style="margin:0;color:#6B7280;font-size:12px;">Kladyo ekibi</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (userError) {
      console.error("Resend user error:", userError);
      return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "İşlem başarısız." }, { status: 500 });
  }
}
