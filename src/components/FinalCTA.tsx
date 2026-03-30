"use client";

import Image from "next/image";
import { useRef } from "react";

export default function FinalCTA() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translateY(-2px)";
      btnRef.current.style.boxShadow =
        "0 8px 24px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)";
    }
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translateY(0)";
      btnRef.current.style.boxShadow = "none";
    }
  };

  return (
    <section
      id="contact"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
      className="flex flex-col items-center px-6 overflow-hidden"
    >
      <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
        {/* Large heading */}
        <h2
          style={{
            fontWeight: 700,
            color: "#000",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: 0,
          }}
          className="text-[32px] md:text-[48px]"
        >
          Ready to modernize your infrastructure?
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontSize: "24px",
            color: "#007AFF",
            fontWeight: 600,
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Let&apos;s talk.
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "17px",
            color: "rgba(0,0,0,0.6)",
            maxWidth: "520px",
            marginTop: "16px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Book a free consultation with our cloud architects. No pressure, no
          commitments — just honest advice on how to move forward.
        </p>

        {/* CTA Button */}
        <div style={{ marginTop: "32px" }}>
          <button
            ref={btnRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="rounded-xl cursor-pointer"
            style={{
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: "15px",
              color: "#fff",
              backgroundColor: "#000",
              border: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Schedule a Call
          </button>
        </div>
      </div>

      {/* Gradient divider */}
      <div
        style={{
          marginTop: "80px",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <Image
          src="/portal-assets/gradient-divider.webp"
          alt=""
          width={2000}
          height={276}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
