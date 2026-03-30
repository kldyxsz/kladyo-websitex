"use client";

import { useEffect, useRef, useState } from "react";

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <div
        style={{
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Heading */}
        <h2
          className="pricing-heading"
          style={{
            fontWeight: 700,
            color: "#000",
            textAlign: "center",
            letterSpacing: "-0.02em",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Transparent pricing, no surprises.
        </h2>

        {/* Main text */}
        <p
          style={{
            fontSize: 18,
            color: "rgba(0,0,0,0.75)",
            textAlign: "center",
            maxWidth: 640,
            marginTop: 24,
            marginBottom: 0,
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Every project is unique, so we offer flexible engagement models — from fixed-price
          projects to monthly retainers. We&apos;ll scope your needs and provide a clear proposal
          before any work begins. Starting from{" "}
          <strong style={{ color: "#007AFF", fontWeight: 700 }}>$5,000/month</strong>{" "}
          for managed services.
        </p>

        {/* Small note */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(0,0,0,0.4)",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.18s, transform 0.6s ease 0.18s",
          }}
        >
          Custom enterprise plans available for larger deployments.
        </p>

        {/* Comparison line */}
        <p
          style={{
            fontSize: 16,
            color: "rgba(0,0,0,0.6)",
            textAlign: "center",
            maxWidth: 600,
            marginTop: 24,
            marginBottom: 0,
            lineHeight: 1.7,
            fontStyle: "italic",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
          }}
        >
          While other consultancies lock you into rigid contracts with hidden fees, we believe in
          earning your trust month by month.
        </p>
      </div>

      <style jsx>{`
        .pricing-heading {
          font-size: 40px;
        }
        @media (max-width: 640px) {
          .pricing-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
