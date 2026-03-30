"use client";

import { useEffect, useRef, useState } from "react";

export default function Branding() {
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
      id="about"
      ref={sectionRef}
      style={{ paddingTop: 100, paddingBottom: 100, backgroundColor: "#fafaf9" }}
    >
      <div
        style={{
          maxWidth: 1200,
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
          className="branding-heading"
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
          Why businesses choose Kladyo
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontSize: 17,
            color: "rgba(0,0,0,0.6)",
            textAlign: "center",
            maxWidth: 640,
            marginTop: 16,
            marginBottom: 0,
            lineHeight: 1.6,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          We don&apos;t just set up infrastructure — we become your long-term technology partner.
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: "rgba(0,0,0,0.6)",
            textAlign: "center",
            maxWidth: 720,
            marginTop: 24,
            marginBottom: 0,
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          From startups launching their first cloud environment to enterprises managing complex
          multi-cloud architectures, Kladyo brings deep expertise and a hands-on approach. We work
          alongside your team to design, build, and maintain systems that are secure, scalable, and
          cost-effective. Our engineers hold certifications across AWS, Azure, and GCP, and we bring
          real-world experience from hundreds of successful deployments.
        </p>

      </div>

      <style jsx>{`
        .branding-heading {
          font-size: 40px;
        }
        @media (max-width: 640px) {
          .branding-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}

