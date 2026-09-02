import type { NextConfig } from "next";

const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    // Next.js 16 requires an explicit allowlist for <Image quality>.
    qualities: [75, 90],
  },
  ...(isStaticDemoBuild
    ? {
        output: "export",
        basePath: demoBasePath,
        assetPrefix: demoBasePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
