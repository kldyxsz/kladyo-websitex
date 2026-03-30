"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const chips = [
  "Cloud Migration",
  "AI & ML Integration",
  "DevOps & CI/CD",
  "Cost Optimization",
  "Managed Services",
  "Security & Compliance",
  "Data Engineering",
  "Architecture Design",
];

const services = [
  {
    title: "Migration & Modernization",
    description: "Seamlessly migrate workloads to cloud with zero downtime. Modernize legacy systems with containerization and serverless architectures.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7484ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: "AI & ML Integration",
    description: "Integrate AI-driven solutions into your infrastructure. Build intelligent automation and predictive analytics pipelines.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A98DCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01" /><path d="M15 9h.01" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    title: "DevOps & CI/CD",
    description: "Automate deployment pipelines with Kubernetes, Docker, and GitOps. Accelerate release cycles with infrastructure-as-code.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C99DBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        paddingTop: 20,
        paddingBottom: 80,
        background: "linear-gradient(180deg, #f9f8fc 0%, #fafaf9 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(90, 123, 240, 0.8)",
            textAlign: "center",
            marginBottom: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          Our Services
        </p>

        {/* Heading */}
        <h2
          style={{
            fontWeight: 700,
            color: "#1a1a2e",
            textAlign: "center",
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.2,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
          }}
          className="features-heading"
        >
          Comprehensive Cloud Services: Optimized. Secure. Scalable.
        </h2>

        {/* Description */}
        <p
          style={{
            color: "rgba(0,0,0,0.6)",
            fontSize: 16,
            textAlign: "center",
            marginTop: 12,
            marginBottom: 0,
            lineHeight: 1.6,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          Enterprise-grade solutions tailored to your cloud transformation journey.
        </p>

        {/* Chip Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginTop: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
          }}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              className="service-chip"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.55)",
                background: "rgba(0, 0, 0, 0.03)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 20,
                padding: "6px 14px",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                cursor: "default",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 48,
            height: 1,
            background: "rgba(0,0,0,0.08)",
            margin: "36px auto",
          }}
        />

        {/* Service Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              style={{
                flex: "1 1 0",
                minWidth: 200,
                padding: "24px 24px",
                textAlign: "center",
                borderRight: i < services.length - 1 ? "1px dashed rgba(0,0,0,0.1)" : "none",
                opacity: visibleCards[i] ? 1 : 0,
                transform: visibleCards[i] ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: 8,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(0, 0, 0, 0.5)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-heading {
          font-size: 36px;
        }
        @media (max-width: 640px) {
          .features-heading {
            font-size: 26px;
          }
        }
        .service-chip:hover {
          background: rgba(90, 123, 240, 0.06) !important;
          border-color: rgba(90, 123, 240, 0.15) !important;
          color: rgba(90, 123, 240, 0.8) !important;
        }
      `}</style>
    </section>
  );
}
