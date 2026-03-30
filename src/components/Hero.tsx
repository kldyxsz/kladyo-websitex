"use client";

import { useEffect, useState, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  flickerSpeed: number;
  flickerPhase: number;
  driftX: number;
  driftY: number;
  pulseAmp: number;
  pulseSpeed: number;
  twinkleChance: number;
  twinkleTimer: number;
  isTwinkling: boolean;
}

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const stars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.6 + 0.2,
        flickerSpeed: Math.random() * 0.04 + 0.01,
        flickerPhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.08,
        pulseAmp: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        twinkleChance: Math.random() * 0.003,
        twinkleTimer: 0,
        isTwinkling: false,
      });
    }

    let frame: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const s of stars) {
        s.x += s.driftX;
        s.y += s.driftY;

        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;

        const wave1 = Math.sin(t * s.flickerSpeed + s.flickerPhase);
        const wave2 = Math.sin(t * s.flickerSpeed * 2.7 + s.flickerPhase * 1.3);
        const wave3 = Math.sin(t * s.pulseSpeed + s.flickerPhase * 0.7);
        const flicker = (wave1 * 0.3 + wave2 * 0.2 + wave3 * s.pulseAmp) * 0.5 + 0.5;

        if (!s.isTwinkling && Math.random() < s.twinkleChance) {
          s.isTwinkling = true;
          s.twinkleTimer = 30;
        }

        let opacity = s.baseOpacity * flicker;
        let radius = s.r;

        if (s.isTwinkling) {
          const progress = s.twinkleTimer / 30;
          const twinkleIntensity = Math.sin(progress * Math.PI);
          opacity = Math.min(1, opacity + twinkleIntensity * 0.8);
          radius = s.r + twinkleIntensity * 1.2;
          s.twinkleTimer -= 1;
          if (s.twinkleTimer <= 0) s.isTwinkling = false;
        }

        if (opacity > 0.5 || s.isTwinkling) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 3);
          glow.addColorStop(0, `rgba(200,220,255,${opacity * 0.3})`);
          glow.addColorStop(1, "rgba(200,220,255,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

const ROTATING_LINES = [
  "Modernize legacy systems",
  "Automate cloud operations",
  "Scale with confidence",
  "Unify fragmented platforms",
  "Build on resilient infrastructure",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % ROTATING_LINES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "70vh",
        background: "linear-gradient(180deg, #5371D6 0%, #8E8BBD 50%, #f9f8fc 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Stars */}
      <Stars />

      {/* Shooting star */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "18%",
          width: 120,
          height: 1,
          background: "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)",
          transform: "rotate(-55deg)",
          zIndex: 2,
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 860,
          paddingTop: "120px",
          paddingBottom: "160px",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 20,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            digital transformation partner
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s",
              textAlign: "center",
              margin: "0 0 24px 0",
              textShadow: "0 3px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            Build what matters.
            <br />
            <span
              style={{
                color: "#FFFFFF",
                display: "inline",
                whiteSpace: "nowrap",
              }}
            >
              Kladyo will handle the rest.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "0.01em",
              marginBottom: 40,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 40px",
            }}
          >
            The resilient infrastructure for unlimited scale. Powered by specialized expertise.
          </p>

          {/* CTA Button */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Primary CTA - Single Button */}
            <a
              href="#contact"
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
                background: "#8B1538",
                padding: "16px 48px",
                borderRadius: "12px",
                border: "none",
                boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 6px 20px rgba(139, 21, 56, 0.25)",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 12px 28px rgba(139, 21, 56, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 6px 20px rgba(139, 21, 56, 0.25)";
              }}
            >
              Unlock Your Cloud Strategy
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
