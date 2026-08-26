import type { NextConfig } from "next";

import { backendUrl } from "./lib/config";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      { source: "/demo/:template", destination: "/demo/:template/index.html" },
      { source: "/demo/:template/", destination: "/demo/:template/index.html" },
      {
        source: "/demo/:template/:path*/",
        destination: "/demo/:template/:path*/index.html",
      },
    ];
  },
};

export default nextConfig;
