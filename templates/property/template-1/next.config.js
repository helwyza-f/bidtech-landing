/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents duplicate double-invocations of GSAP / Lenis in dev mode
  images: {
    unoptimized: true, // Loads images instantly in development without local Node.js transcoding bottlenecks
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
