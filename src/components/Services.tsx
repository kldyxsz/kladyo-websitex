import {
  Lightbulb,
  CloudUpload,
  BrainCircuit,
  Code2,
  RefreshCcw,
  TrendingDown,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

const featured = [
  {
    icon: Lightbulb,
    title: "Cloud Strategy & Consulting",
    description:
      "We assess your infrastructure, identify opportunities, and craft a cloud roadmap tailored to your business goals. From initial audit to final deployment plan.",
    tags: ["AWS", "Azure", "GCP"],
    accent: "from-[#FF9900]/8 to-transparent",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions & Intelligent Automation",
    description:
      "From smart chatbots to predictive analytics, we embed AI into your workflows to drive efficiency and insight. Custom models, seamless integration.",
    tags: ["ML/AI", "NLP", "Automation"],
    accent: "from-[#8B5CF6]/8 to-transparent",
  },
];

const services = [
  {
    icon: CloudUpload,
    title: "Cloud Migration",
    description:
      "Move your workloads to the cloud seamlessly. Zero downtime, validated testing, clear rollback plan.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    hoverBg: "group-hover:bg-blue-500/15",
  },
  {
    icon: Code2,
    title: "Modern App Development",
    description:
      "Cloud-native, scalable applications designed for performance and rapid iteration.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    hoverBg: "group-hover:bg-cyan-500/15",
  },
  {
    icon: RefreshCcw,
    title: "Legacy Modernisation",
    description:
      "Refactor outdated systems into modern, cloud-ready platforms without disruption.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    hoverBg: "group-hover:bg-purple-500/15",
  },
  {
    icon: TrendingDown,
    title: "FinOps & Optimisation",
    description:
      "Cut cloud costs by up to 30% with right-sizing and continuous spend analysis.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    hoverBg: "group-hover:bg-emerald-500/15",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Identity management, threat detection, and regulatory compliance frameworks.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    hoverBg: "group-hover:bg-rose-500/15",
  },
  {
    icon: ClipboardCheck,
    title: "Architecture Review",
    description:
      "Evaluate your setup against industry standards for reliability and performance.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    hoverBg: "group-hover:bg-amber-500/15",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#09090B]" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF9900]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 tag tag-orange mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF9900] rounded-full" />
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
            End-to-End Cloud &{" "}
            <span className="gradient-text">AI Solutions</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From strategy to execution, we deliver tailored cloud solutions that
            help enterprises scale faster, reduce costs, and stay ahead.
          </p>
        </div>

        {/* Featured cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featured.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="gradient-border rounded-2xl p-8 lg:p-10 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} pointer-events-none`} />
                <div className="relative">
                  <div className="w-14 h-14 bg-[#FF9900]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF9900]/15 transition-colors">
                    <Icon className="w-7 h-7 text-[#FF9900]" />
                  </div>
                  <h3 className="text-white font-bold text-xl lg:text-2xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-zinc-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regular cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="gradient-border rounded-2xl p-6 group"
              >
                <div className={`w-11 h-11 ${service.bg} ${service.hoverBg} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className={`w-5 h-5 ${service.color}`} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
