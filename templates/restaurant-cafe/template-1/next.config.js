/** @type {import('next').NextConfig} */
const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lenis"],
  images: {
    formats: ['image/avif', 'image/webp'],
    ...(isStaticDemoBuild
      ? { loader: "custom", loaderFile: "./lib/demo-image-loader.js" }
      : { unoptimized: false }),
  },
  ...(isStaticDemoBuild
    ? { output: "export", basePath: demoBasePath, trailingSlash: true }
    : {}),
};

module.exports = nextConfig;
