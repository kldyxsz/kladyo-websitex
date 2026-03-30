"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

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

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch {
      setServerError("Something went wrong. Please try again or email us at info@kladyo.com.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 100,
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 101,
          width: "90%",
          maxWidth: 500,
          backgroundColor: "#fff",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            zIndex: 102,
            color: "rgba(0,0,0,0.6)",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(0,0,0,0.6)";
          }}
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div style={{ padding: "40px 32px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", paddingTop: 20, paddingBottom: 20 }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#000",
                  marginBottom: 8,
                }}
              >
                Thank you!
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                We&apos;ll be in touch soon
              </p>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#000",
                  margin: "0 0 8px 0",
                  paddingRight: 32,
                }}
              >
                Unlock Your Cloud Strategy
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.55)",
                  marginBottom: 32,
                }}
              >
                Tell us about your cloud needs and we'll get back to you with personalized solutions.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    {...register("name")}
                    placeholder="John Doe"
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? "#E53935" : "rgba(0,0,0,0.12)",
                    }}
                  />
                  {errors.name && <div style={errorStyle}>{errors.name.message}</div>}
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      ...inputStyle,
                      borderColor: errors.email ? "#E53935" : "rgba(0,0,0,0.12)",
                    }}
                  />
                  {errors.email && <div style={errorStyle}>{errors.email.message}</div>}
                </div>

                {/* Company */}
                <div>
                  <label style={labelStyle}>Company</label>
                  <input
                    {...register("company")}
                    placeholder="Your Company"
                    style={{
                      ...inputStyle,
                      borderColor: errors.company ? "#E53935" : "rgba(0,0,0,0.12)",
                    }}
                  />
                  {errors.company && <div style={errorStyle}>{errors.company.message}</div>}
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your cloud infrastructure needs..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      borderColor: errors.message ? "#E53935" : "rgba(0,0,0,0.12)",
                      resize: "none",
                    } as React.CSSProperties}
                  />
                  {errors.message && <div style={errorStyle}>{errors.message.message}</div>}
                </div>

                {/* Server Error */}
                {serverError && (
                  <div style={errorStyle}>{serverError}</div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#fff",
                    backgroundColor: loading ? "rgba(0,0,0,0.5)" : "#000",
                    border: "none",
                    borderRadius: 12,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    marginTop: 8,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#1a1a1a";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#000";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
