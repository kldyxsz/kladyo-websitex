import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kladyo | Cloud & AI Infrastructure for the Future",
  description:
    "Kladyo delivers end-to-end cloud infrastructure, AI integration, and DevOps solutions. Cloud migration, cost optimization, managed services, and 24/7 expert support for growing businesses.",
  keywords:
    "cloud solutions, AI infrastructure, DevOps, cloud migration, cost optimization, managed services, Kladyo",
  authors: [{ name: "Kladyo" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
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
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
