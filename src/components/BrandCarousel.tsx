"use client";

import Image from "next/image";

const brands = [
  { name: "AWS", image: "/images/aws.png" },
  { name: "Azure", image: "/images/azure.png" },
  { name: "Docker", image: "/images/docker.png" },
  { name: "Google Cloud", image: "/images/gcp.png" },
  { name: "Kubernetes", image: "/images/kubernetes.png" },
  { name: "Snowflake", image: "/images/snowflake.png" },
  { name: "Terraform", image: "/images/terraform.png" },
];

export default function BrandCarousel() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f9f8fc 0%, #fafaf9 100%)",
        paddingTop: 0,
        paddingBottom: 60,
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: -70,
      }}
    >
      {/* Centered container with max-width constraint */}
      <div
        style={{
          position: "relative",
          maxWidth: 950,
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: 12,
          background: "transparent",
          padding: 20,
        }}
      >
        {/* Mask gradient container with strong fade effect */}
        <div
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 99%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 99%, transparent 100%)",
            overflow: "hidden",
          }}
        >
          {/* Scrolling wrapper - adjusted gap and sizing for 4 visible logos */}
          <div
            style={{
              display: "flex",
              gap: 90,
              animation: "scroll 50s linear infinite",
              width: "fit-content",
              animationPlayState: "running",
            }}
          >
            {/* First set of logos */}
            {brands.map((brand, i) => (
              <div
                key={`first-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 80,
                  height: 70,
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={65}
                  height={65}
                  style={{
                    objectFit: "contain",
                    filter: "brightness(0.85) contrast(1.15)",
                  }}
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {brands.map((brand, i) => (
              <div
                key={`second-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 80,
                  height: 70,
                  opacity: 0.5,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={65}
                  height={65}
                  style={{
                    objectFit: "contain",
                    filter: "brightness(0.85) contrast(1.15)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: scroll"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
