"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#", comingSoon: "blog" },
  { label: "Careers", href: "#", comingSoon: "careers" },
  { label: "Contact", href: "#contact" },
];

const toastMessages: Record<string, string> = {
  blog: "✍️ Big ideas brewing — blog dropping soon!",
  careers: "🚀 Think you've got what it takes? Drop your CV at info@kladyo.com — we dare you!",
};

export default function Footer() {
  const [shaking, setShaking] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function handleSpecialLink(e: React.MouseEvent, key: string) {
    e.preventDefault();
    if (shaking) return;
    setShaking(key);
    setToast(key);
    setTimeout(() => setShaking(null), 600);
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <footer style={{ backgroundColor: "#F7F7F7", position: "relative" }}>
      {/* Glass Toast */}
      <div
        style={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: toast ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(16px) scale(0.97)",
          opacity: toast ? 1 : 0,
          transition: "opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: "none",
          zIndex: 9999,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "18px",
          padding: "14px 22px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset",
          fontSize: "14px",
          fontWeight: 500,
          color: "rgba(0,0,0,0.8)",
          maxWidth: "calc(100vw - 48px)",
          textAlign: "center",
        }}
      >
        {toast ? toastMessages[toast] : ""}
      </div>

      {/* Section divider line */}
      <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)", width: "100%" }} />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "48px",
          paddingBottom: "48px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {/* Main row */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
          {/* Logo */}
          <a
            href="#"
            aria-label="Kladyo home"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <Image
              src="/images/kladyo-logo.png"
              alt="Kladyo"
              width={140}
              height={36}
              style={{ height: 28, width: "auto", filter: "invert(1)" }}
            />
          </a>

          {/* Nav links */}
          <nav>
            <ul
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:flex-nowrap md:gap-6"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={link.comingSoon ? (e) => handleSpecialLink(e, link.comingSoon!) : undefined}
                    style={{
                      fontSize: "14px",
                      color: "rgba(0,0,0,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "inline-block",
                      animation: shaking === link.comingSoon ? "footerShake 0.6s ease" : "none",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#000"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.5)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center"
          style={{ marginTop: "24px" }}
        >
          <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.4)", margin: 0 }}>
            All rights reserved, 2025 Kladyo
          </p>
          <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.4)", margin: 0 }}>
            Building the future of cloud infrastructure.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes footerShake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-6px); }
          30%  { transform: translateX(6px); }
          45%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px); }
          75%  { transform: translateX(-3px); }
          90%  { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </footer>
  );
}
