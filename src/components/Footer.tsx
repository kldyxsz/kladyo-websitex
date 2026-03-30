"use client";

import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#contact" },
  { label: "Legal", href: "#" },
  { label: "Privacy", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F7F7F7" }}>
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
                    style={{
                      fontSize: "14px",
                      color: "rgba(0,0,0,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(0,0,0,0.5)";
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
          <p
            style={{
              fontSize: "13px",
              color: "rgba(0,0,0,0.4)",
              margin: 0,
            }}
          >
            All rights reserved, 2025 Kladyo
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(0,0,0,0.4)",
              margin: 0,
            }}
          >
            Building the future of cloud infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
