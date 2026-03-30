import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next/Image optimization is handled by Cloudflare's edge cache
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
