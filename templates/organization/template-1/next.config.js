/** @type {import('next').NextConfig} */
const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  images: {
    unoptimized: isStaticDemoBuild,
    formats: ['image/avif', 'image/webp'],
  },
  ...(isStaticDemoBuild
    ? { output: "export", basePath: demoBasePath, trailingSlash: true }
    : {}),
};

module.exports = nextConfig;
