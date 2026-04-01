import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5371D6",
};

export const metadata: Metadata = {
  title: "Kladyo | Cloud & AI Infrastructure for the Future",
  description:
    "Kladyo delivers end-to-end cloud infrastructure, AI integration, and DevOps solutions. Cloud migration, cost optimization, managed services, and 24/7 expert support for growing businesses.",
  keywords:
    "cloud solutions, AI infrastructure, DevOps, cloud migration, cost optimization, managed services, Kladyo",
  authors: [{ name: "Kladyo" }],
  icons: {
    icon: [{ url: "/kladyoicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/kladyoicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Kladyo | Cloud & AI Infrastructure for the Future",
    description:
      "End-to-end cloud infrastructure, AI integration, and DevOps solutions for growing businesses.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kladyo | Cloud & AI Infrastructure for the Future",
    description:
      "End-to-end cloud infrastructure, AI integration, and DevOps solutions for growing businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
