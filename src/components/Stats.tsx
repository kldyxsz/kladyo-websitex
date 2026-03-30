"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Cloud Migrations", description: "Successfully completed" },
  { value: 99.9, suffix: "%", label: "Uptime SLA", description: "Guaranteed availability" },
  { value: 30, suffix: "%", label: "Cost Reduction", description: "Average savings" },
  { value: 10, suffix: "+", label: "Countries", description: "Global presence" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const start = performance.now();
          const isFloat = value % 1 !== 0;

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * value;
            setDisplay(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
      {display}
      <span className="text-[#FF9900]">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090B]" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF9900]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-white font-semibold text-sm mt-2">{stat.label}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
