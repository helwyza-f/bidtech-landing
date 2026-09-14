const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(isStaticDemoBuild
    ? {
        output: "export",
        basePath: demoBasePath,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
