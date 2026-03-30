"use client";

import Image from "next/image";
import { useRef } from "react";

export default function FounderMemo() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotate(0deg)";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotate(-2deg)";
    }
  };

  return (
    <section
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
      className="flex justify-center px-6"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          maxWidth: "700px",
          width: "100%",
          padding: "48px",
          transform: "rotate(-2deg)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Opening */}
        <p
          style={{
            fontStyle: "italic",
            fontSize: "16px",
            color: "rgba(0,0,0,0.6)",
            marginBottom: "24px",
          }}
        >
          A note from our team,
        </p>

        {/* Body paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            We started Kladyo because we saw too many businesses struggling with
            outdated infrastructure and overpaying for cloud services they
            didn&apos;t fully understand.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            The cloud should be an accelerator, not a burden. But without the
            right expertise, it becomes exactly that — complex, expensive, and
            fragile.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            That&apos;s why we built Kladyo. A team of engineers who genuinely
            care about your success, who speak your language, and who treat your
            infrastructure as if it were our own.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            We&apos;re not here to sell you services you don&apos;t need.
            We&apos;re here to help you build something that lasts.
          </p>
        </div>

        {/* Signature */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Image
            src="/portal-assets/avatar.webp"
            alt="The Kladyo Team"
            width={500}
            height={500}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              objectFit: "cover",
            }}
          />
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: "16px",
                color: "#000",
                margin: 0,
              }}
            >
              The Kladyo Team
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(0,0,0,0.5)",
                margin: 0,
              }}
            >
              Cloud & AI Engineers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
