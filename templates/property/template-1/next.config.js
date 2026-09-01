/** @type {import('next').NextConfig} */
const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: false, // Prevents duplicate double-invocations of GSAP / Lenis in dev mode
  transpilePackages: ["lenis"],
  images: {
    unoptimized: true, // Loads images instantly in development without local Node.js transcoding bottlenecks
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(isStaticDemoBuild
    ? { output: "export", basePath: demoBasePath, trailingSlash: true }
    : {}),
};

module.exports = nextConfig;
