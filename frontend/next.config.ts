import type { NextConfig } from "next";

import { backendUrl } from "./lib/config";

const nextConfig: NextConfig = {
  output: "standalone",
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      {
        source: "/demo/:template",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/index.txt",
      },
      {
        source: "/demo/:template/",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/index.txt",
      },
      {
        source: "/demo/:template/:path*/",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/:path*/index.txt",
      },
      {
        source: "/demo/:template/:path*.txt",
        destination: "/demo/:template/:path*/index.txt",
      },
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
