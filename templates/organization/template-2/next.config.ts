import type { NextConfig } from "next";

/**
 * Static export for the CommunityPro template.
 * It is served as a sub-app under /demo/community-pro/ inside the BIDTECH site,
 * so both routes and assets are prefixed with that base path.
 */
const BASE_PATH = "/demo/community-pro";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,
    // Next.js 16 requires an explicit allowlist for <Image quality>.
    qualities: [75, 90],
  },
};

export default nextConfig;
