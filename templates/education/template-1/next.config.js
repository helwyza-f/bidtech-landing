/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents duplicate Lenis / GSAP initialization in dev
  transpilePackages: ['lenis', 'lucide-react'],
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
