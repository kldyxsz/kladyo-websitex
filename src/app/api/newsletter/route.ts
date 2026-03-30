import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
const FROM_EMAIL = process.env.RESEND_FROM ?? "noreply@kladyo.com";
const TO_EMAIL = process.env.RESEND_TO ?? "info@kladyo.com";

function isAlreadyExistsError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const anyErr = error as {
    message?: string;
    name?: string;
    code?: string | number;
    status?: number;
    statusCode?: number;
  };
  const status = anyErr.statusCode ?? anyErr.status;
  if (status === 409) return true;
  const msg = `${anyErr.message ?? ""} ${anyErr.name ?? ""} ${anyErr.code ?? ""}`.toLowerCase();
  return msg.includes("already") || msg.includes("exists") || msg.includes("duplicate");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    const resend = getResend();
    let alreadyExists = false;
    if (AUDIENCE_ID) {
      const { error: audienceError } = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });

      if (audienceError) {
        alreadyExists = isAlreadyExistsError(audienceError);
        if (!alreadyExists) {
          console.error("Resend contacts error:", audienceError);
          return NextResponse.json({ error: "Kayıt başarısız." }, { status: 500 });
        }
      }
    } else {
      console.warn("RESEND_AUDIENCE_ID is not set — skipping contact creation.");
    }

    const { error: notifyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: "Yeni Newsletter Kaydı",
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#F5F6F8;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
            <div style="padding:18px 24px;border-bottom:1px solid #E5E7EB;background:#FFF7ED;">
              <p style="margin:0;color:#9A3412;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Kladyo</p>
              <p style="margin:6px 0 0;color:#111827;font-size:18px;font-weight:700;">Newsletter Kaydı</p>
            </div>
            <div style="padding:24px;">
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                Yeni kayıt: <a href="mailto:${email}" style="color:#B45309;text-decoration:none;">${email}</a>
              </p>
            </div>
            <div style="padding:14px 24px;border-top:1px solid #E5E7EB;background:#FAFAFA;">
              <p style="margin:0;color:#6B7280;font-size:12px;">kladyo.com newsletter formu</p>
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
      subject: "Kladyo — Newsletter kaydınız alındı",
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head><meta charset="UTF-8" /></head>
        <body style="margin:0;padding:0;background:#F5F6F8;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:560px;margin:32px auto;background:#ffffff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
            <div style="padding:18px 24px;border-bottom:1px solid #E5E7EB;background:#FFF7ED;">
              <p style="margin:0;color:#9A3412;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Kladyo</p>
              <p style="margin:6px 0 0;color:#111827;font-size:18px;font-weight:700;">Newsletter Kaydınız Alındı</p>
            </div>
            <div style="padding:24px;">
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                Newsletter kaydınız başarıyla alındı. Güncellemeler için bizimle kalın.
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

    const message = alreadyExists
      ? "Bu e-posta zaten kayıtlı. Güncel kalmak için bizimle kalın."
      : "Kaydınız başarıyla alındı.";

    return NextResponse.json({ success: true, message, alreadyExists }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "İşlem başarısız." }, { status: 500 });
  }
}
