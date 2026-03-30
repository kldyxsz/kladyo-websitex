import Image from "next/image";
import {
  Zap,
  Globe,
  Clock,
  Users,
  TrendingUp,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Scale",
    description: "Infrastructure expertise across AWS, Azure, and GCP for businesses worldwide.",
  },
  {
    icon: Clock,
    title: "Rapid Deployment",
    description: "From assessment to production in weeks, not months. Agile methodology.",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "Certified cloud architects and AI engineers assigned to your project.",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Average 30% cost reduction with transparent reporting and optimization.",
  },
  {
    icon: Zap,
    title: "Zero Downtime",
    description: "Seamless migrations and updates with no interruption to your business.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock monitoring and incident response for peace of mind.",
  },
];

export default function WhyKladyo() {
  return (
    <section id="why-kladyo" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0C0C0F]" />
      <div className="absolute inset-0 bg-grid-fine opacity-40" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF9900]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag tag-orange mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
            Why Kladyo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
            You Focus on Code.{" "}
            <span className="gradient-text">We Handle the Cloud.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            In today&apos;s fast-moving landscape, managing infrastructure
            shouldn&apos;t slow you down. We take care of your cloud so your
            team can ship faster.
          </p>
        </div>

        {/* Infrastructure image */}
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-16 border border-white/[0.06]">
          <Image
            src="/images/hero-server.jpeg"
            alt="Data center infrastructure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0F]/50 via-transparent to-[#0C0C0F]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-white/80 text-sm font-medium max-w-md">
              Enterprise-grade infrastructure managed by certified cloud architects.
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className="w-11 h-11 bg-[#FF9900]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF9900]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#FF9900]" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#FF9900]/15">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900]/[0.04] via-transparent to-[#8B5CF6]/[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-[#0C0C0F]/80 pointer-events-none" />

          <div className="relative p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
              Stop managing servers. Start shipping products.
            </h3>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Book a free discovery call and let us map out how we can modernise
              your infrastructure without disrupting your workflow.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 glass-btn-solid px-8 py-3.5 rounded-xl text-sm"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
