const partners = [
  { name: "Amazon Web Services", short: "AWS" },
  { name: "Microsoft Azure", short: "Azure" },
  { name: "Google Cloud", short: "GCP" },
  { name: "Kubernetes", short: "K8s" },
  { name: "Terraform", short: "Terraform" },
  { name: "Docker", short: "Docker" },
  { name: "OpenAI", short: "OpenAI" },
  { name: "Datadog", short: "Datadog" },
];

export default function TechPartners() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090B]" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mb-10">
          Technologies We Work With
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 sm:gap-x-14">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-300 cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#FF9900]/20 group-hover:bg-[#FF9900]/[0.04] transition-all duration-300">
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-[#FF9900] transition-colors duration-300">
                  {partner.short.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium hidden sm:inline">{partner.name}</span>
              <span className="text-sm font-medium sm:hidden">{partner.short}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
