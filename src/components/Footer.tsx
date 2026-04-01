"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#", comingSoon: true },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [shaking, setShaking] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleBlogClick(e: React.MouseEvent) {
    e.preventDefault();
    if (shaking) return;
    setShaking(true);
    setShowToast(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <footer style={{ backgroundColor: "#F7F7F7", position: "relative" }}>
      {/* Toast */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: showToast ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
          opacity: showToast ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: "none",
          zIndex: 9999,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "12px",
          padding: "12px 20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontSize: "14px",
          color: "#000",
          whiteSpace: "nowrap",
        }}
      >
        ✍️ We&apos;re thrilled to share our insights — blog coming soon!
      </div>

      {/* Section divider line */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.08)",
          width: "100%",
        }}
      />

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
              style={{
                height: 28,
                width: "auto",
                filter: "invert(1)",
              }}
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
                    onClick={link.comingSoon ? handleBlogClick : undefined}
                    style={{
                      fontSize: "14px",
                      color: "rgba(0,0,0,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "inline-block",
                      animation: link.comingSoon && shaking ? "footerShake 0.6s ease" : "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.5)";
                    }}
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
