"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Discovery & Assessment",
    description:
      "We audit your current infrastructure, identify bottlenecks, and map out a strategy tailored to your goals.",
  },
  {
    title: "Architecture Design",
    description:
      "Our team designs a cloud-native architecture that's scalable, secure, and optimized for your workloads.",
  },
  {
    title: "Migration & Implementation",
    description:
      "We execute the migration with zero downtime, handling every detail from data transfer to DNS cutover.",
  },
  {
    title: "Optimization & Automation",
    description:
      "CI/CD pipelines, auto-scaling, cost optimization — we automate everything to keep your systems lean.",
  },
  {
    title: "Ongoing Support & Monitoring",
    description:
      "24/7 monitoring, incident response, and continuous improvement. We're always in your corner.",
  },
];

export default function HowItWorks() {
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
        }}
      >
        {/* Heading */}
        <h2
          className="hiw-heading"
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
          How we work
        </h2>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: 48,
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              visible={visible}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hiw-heading {
          font-size: 40px;
        }
        @media (max-width: 640px) {
          .hiw-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
  visible: boolean;
  delay: number;
}

function Step({ number, title, description, isLast, visible, delay }: StepProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {/* Left: Number + connector line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {number}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            style={{
              width: 1,
              flexGrow: 1,
              minHeight: 32,
              backgroundColor: "rgba(0,0,0,0.1)",
              marginTop: 4,
              marginBottom: 4,
            }}
          />
        )}
      </div>

      {/* Right: Text */}
      <div
        style={{
          paddingBottom: isLast ? 0 : 32,
          paddingTop: 8,
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#000",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 15,
            color: "rgba(0,0,0,0.6)",
            marginTop: 4,
            marginBottom: 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
