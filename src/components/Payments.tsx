"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const cloudIcons = [
  { src: "/portal-assets/payment-icons-1.png", width: 145, height: 145 },
  { src: "/portal-assets/payment-icons-2.png", width: 145, height: 145 },
  { src: "/portal-assets/payment-icons-3.png", width: 145, height: 145 },
  { src: "/portal-assets/payment-icons-4.png", width: 145, height: 145 },
];

const flags = [
  { src: "/portal-assets/flag-1.png", width: 80, height: 58 },
  { src: "/portal-assets/flag-2.png", width: 80, height: 58 },
  { src: "/portal-assets/flag-3.png", width: 80, height: 58 },
];

const statusPills = [
  { dot: "bg-green-500", bar: "bg-green-500/20", label: "Provisioned" },
  { dot: "bg-blue-500", bar: "bg-blue-500/20", label: "Syncing" },
  { dot: "bg-purple-500", bar: "bg-purple-500/20", label: "Deployed" },
];

export default function Payments() {
  const [serverAnimation, setServerAnimation] = useState(null);
  const [analyticsAnimation, setAnalyticsAnimation] = useState(null);

  useEffect(() => {
    fetch("/images/Server.json")
      .then((res) => res.json())
      .then((data) => setServerAnimation(data));
  }, []);

  useEffect(() => {
    fetch("/images/Business Analytics.json")
      .then((res) => res.json())
      .then((data) => setAnalyticsAnimation(data));
  }, []);

  return (
    <section className="w-full py-[100px]" style={{ backgroundColor: "#fafaf9" }}>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2
          className="text-center font-bold text-black"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.2 }}
        >
          Built on the platforms you trust.
          <br />
          Optimized by experts who care.
        </h2>

        <div className="mt-[60px] grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Card 1 */}
          <div className="group flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-[#F7F7F7] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div>
              <h3 className="text-[20px] font-semibold text-black leading-snug mb-3">
                Multi-cloud expertise across all major providers
              </h3>
              <p className="text-[14px] text-black/55 leading-relaxed">
                Design, migrate, and optimize workloads across AWS, Azure, and Google Cloud with a strategy tailored to your business.
              </p>
            </div>
            {serverAnimation && (
              <div className="h-32 w-32 mx-auto">
                <Lottie animationData={serverAnimation} loop={true} />
              </div>
            )}
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-[#F7F7F7] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div>
              <h3 className="text-[20px] font-semibold text-black leading-snug mb-3">
                Real-time dashboards &amp; intelligent alerting
              </h3>
              <p className="text-[14px] text-black/55 leading-relaxed">
                Gain visibility into performance, cost and health.
              </p>
            </div>
            {analyticsAnimation && (
              <div className="h-40 w-full flex items-center justify-center mt-3 overflow-hidden">
                <div style={{ width: "100%", height: "100%", maxHeight: "160px" }}>
                  <Lottie animationData={analyticsAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            )}
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-[#F7F7F7] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div>
              <h3 className="text-[20px] font-semibold text-black leading-snug mb-3">
                Kubernetes &amp; container orchestration
              </h3>
              <p className="text-[14px] text-black/55 leading-relaxed">
                Deploy, scale, and manage containerized applications with secure, reliable orchestration built for modern cloud environments.
              </p>
            </div>
            <div className="flex items-center">
              <span className="rounded-lg bg-gray-200 px-4 py-2 font-mono text-[14px] text-gray-700">
                kubectl apply -f deploy.yaml
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group flex flex-col gap-6 rounded-2xl border border-black/[0.06] bg-[#F7F7F7] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div>
              <h3 className="text-[20px] font-semibold text-black leading-snug mb-3">
                Terraform, Ansible &amp; Infrastructure as Code
              </h3>
              <p className="text-[14px] text-black/55 leading-relaxed">
                Standardize provisioning, reduce manual work, and ship faster with automated infrastructure and repeatable deployment workflows.
              </p>
            </div>
            <div className="flex flex-1 items-end">
              <div className="flex gap-2">
                {statusPills.map((pill, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${pill.bar}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${pill.dot}`} />
                    <span className="text-[12px] font-medium text-black/60">
                      {pill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p
          className="mt-12 text-center text-[18px]"
          style={{ color: "rgba(0,0,0,0.6)" }}
        >
          Enterprise-grade infrastructure, startup-friendly approach.
        </p>
      </div>
    </section>
  );
}
