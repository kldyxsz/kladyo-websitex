import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

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

    const supabase = getSupabase();
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, company, message });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Kayıt başarısız." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "İşlem başarısız." }, { status: 500 });
  }
}
