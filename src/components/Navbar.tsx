"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);


  // Colors for hero navbar (always white/light)
  const textColor = "rgba(255,255,255,0.85)";
  const textHoverColor = "#fff";

  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 64,
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo - white version on hero, orange version on scroll */}
        <a
          href="#"
          aria-label="Kladyo home"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
            position: "relative",
            height: 32,
            width: 130,
          }}
        >
          {/* White logo for hero */}
          <Image
            src="/images/kladyo-logo.png"
            alt="Kladyo"
            width={140}
            height={36}
            priority
            style={{
              height: 32,
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link, i) => (
              <li key={link.label}>
                {i === 0 ? (
                  /* First link (Services) with pill highlight */
                  <a
                    href={link.href}
                    style={{
                      fontWeight: 500,
                      fontSize: 15,
                      color: "#fff",
                      textDecoration: "none",
                      padding: "8px 18px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.15)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="nav-link-item"
                    style={{
                      fontWeight: 500,
                      fontSize: 15,
                      color: textColor,
                      textDecoration: "none",
                      padding: "8px 18px",
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = textHoverColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = textColor; }}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="nav-hamburger"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            borderRadius: 8,
            padding: 0,
            transition: "color 0.35s ease",
          }}
        >
          {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="nav-mobile-menu"
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          background: "rgba(247,247,247,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxHeight: mobileOpen ? 320 : 0,
          transition: "max-height 0.28s ease",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: "8px 24px 16px" }}>
          {navLinks.map((link) => (
            <li key={link.label} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "13px 0",
                  fontWeight: 500,
                  fontSize: 15,
                  color: "rgba(0,0,0,0.75)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .nav-desktop { display: flex; align-items: center; gap: 32px; }
        .nav-hamburger { display: none !important; }
        .nav-mobile-menu { display: none; }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: inline-flex !important; }
          .nav-mobile-menu { display: block !important; }
        }
      `}</style>
    </header>
  );
}
