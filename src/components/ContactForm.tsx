"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type FormData = z.infer<typeof schema>;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontSize: 15,
  color: "#000",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 12,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "rgba(0,0,0,0.6)",
  marginBottom: 6,
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#E53935",
  marginTop: 4,
};

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Something went wrong. Please try again or email us at info@kladyo.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ paddingTop: 100, paddingBottom: 100, backgroundColor: "#fafaf9" }}
    >
      <div
        style={{
          maxWidth: 680,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Heading */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(0,0,0,0.4)",
            textAlign: "center",
            marginBottom: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          Get in Touch
        </p>
        <h2
          className="contact-heading"
          style={{
            fontWeight: 700,
            color: "#000",
            textAlign: "center",
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
        >
          Let&apos;s build something great
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(0,0,0,0.55)",
            textAlign: "center",
            marginBottom: 48,
            lineHeight: 1.6,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          Your first consultation is free. Tell us about your project and we&apos;ll
          get back to you within 24 hours.
        </p>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 20,
            padding: "40px 40px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000", marginBottom: 8 }}>
                Message sent
              </p>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", marginBottom: 24, lineHeight: 1.6 }}>
                We&apos;ll review your message and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.5)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontFamily: "inherit",
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name + Email */}
              <div className="contact-row" style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.35)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                  {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@company.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.35)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                  {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  {...register("company")}
                  type="text"
                  placeholder="Company Inc."
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
                />
                {errors.company && <p style={errorStyle}>{errors.company.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us about your project or infrastructure needs..."
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.35)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
                />
                {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
              </div>

              {/* Server error */}
              {serverError && (
                <p style={{ fontSize: 13, color: "#E53935", margin: 0 }}>{serverError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: loading ? "rgba(0,0,0,0.4)" : "#000",
                  border: "none",
                  borderRadius: 12,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1a1a1a"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#000"; }}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-heading {
          font-size: 36px;
        }
        @media (max-width: 640px) {
          .contact-heading {
            font-size: 26px;
          }
          .contact-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
