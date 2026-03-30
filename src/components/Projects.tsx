"use client";

const services = [
  {
    title: "Migration & Modernization",
    description: "Seamlessly migrate workloads to cloud with zero downtime. Modernize legacy systems with containerization and serverless architectures.",
  },
  {
    title: "AI & ML Integration",
    description: "Integrate AI-driven solutions into your infrastructure. Build intelligent automation and predictive analytics pipelines.",
  },
  {
    title: "DevOps & CI/CD",
    description: "Automate deployment pipelines with Kubernetes, Docker, and GitOps. Accelerate release cycles with infrastructure-as-code.",
  },
];

export default function Projects() {
  return (
    <section
      id="services"
      style={{ paddingTop: 20, paddingBottom: 80 }}
      className="w-full"
    >
      <div style={{ maxWidth: 1200 }} className="mx-auto px-6">
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
              style={{
                flex: "1 1 0",
                minWidth: 200,
                padding: "32px 28px",
                textAlign: "center",
                borderRight: i < services.length - 1 ? "1px dashed rgba(0,0,0,0.12)" : "none",
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: 10,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.55)",
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
    </section>
  );
}
