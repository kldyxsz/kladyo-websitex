"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Mail, MapPin } from "lucide-react";

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

export default function ContactForm() {
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
      if (!res.ok) throw new Error("server_error");
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Submission failed. Please try again or email us at info@kladyo.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#09090B]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9900]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 tag tag-orange mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
            Contact Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Let&apos;s Build Together
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Your first consultation is free. Tell us about your project and we&apos;ll
            get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF9900]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Email Us</p>
                  <a
                    href="mailto:info@kladyo.com"
                    className="text-zinc-400 text-sm hover:text-[#FF9900] transition-colors"
                  >
                    info@kladyo.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF9900]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Headquarters</p>
                  <p className="text-zinc-400 text-sm">Istanbul, Turkey</p>
                  <p className="text-zinc-500 text-xs mt-1">Serving clients globally</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                We respond to every inquiry within 24 hours. Whether you need a
                quick assessment or a full cloud strategy, we&apos;re here to help
                you take the next step.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center p-12 glass-strong rounded-2xl border-[#FF9900]/10">
                <CheckCircle2 className="w-14 h-14 text-[#FF9900] mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">
                  Message Sent Successfully
                </h3>
                <p className="text-zinc-400 text-sm max-w-xs">
                  Our team will review and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#FF9900] text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-strong rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1.5 font-medium">
                      Full Name <span className="text-[#FF9900]">*</span>
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FF9900]/50 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-300 mb-1.5 font-medium">
                      Email <span className="text-[#FF9900]">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FF9900]/50 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1.5 font-medium">
                    Company <span className="text-[#FF9900]">*</span>
                  </label>
                  <input
                    {...register("company")}
                    type="text"
                    placeholder="Company Inc."
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FF9900]/50 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1.5 font-medium">
                    Message <span className="text-[#FF9900]">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your project or infrastructure needs..."
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FF9900]/50 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {serverError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    <p className="text-red-400 text-sm">{serverError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 glass-btn-solid py-3.5 rounded-xl disabled:opacity-60"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
