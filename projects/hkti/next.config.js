/** @type {import('next').NextConfig} */
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

// Production ships as a static export served from a VPS (no Node server),
// so `output: "export"` stays on for every build. Only the demo build (Bidtech's
// own template gallery) needs a basePath.
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: demoBasePath,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
