/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const isStaticDemoBuild = process.env.BUILD_STATIC_DEMO === "true";
const demoBasePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";

// Peta ID lama (sebelum migrasi ke slug SEO-friendly) -> slug baru.
// Dipakai untuk redirect 301 permanen supaya URL lama (mis. /kendaraan/12) yang
// sudah terindeks Google atau dibagikan tetap jalan, tidak jadi broken link/404.
const LEGACY_VEHICLE_ID_TO_SLUG = {
  1: "alphard-gen-3-all-in",
  2: "hiace-commuter-all-in",
  3: "hiace-premio-vip-all-in",
  4: "toyota-fortuner-gr-sport",
  5: "toyota-innova-zenix",
  6: "toyota-innova-reborn",
  7: "hyundai-stargazer",
  8: "toyota-new-avanza",
  9: "daihatsu-new-xenia",
  10: "toyota-raize",
  11: "daihatsu-rocky",
  12: "honda-new-brio",
  13: "toyota-new-agya",
  14: "toyota-new-calya",
  15: "daihatsu-new-ayla",
  16: "alphard-gen-4-all-in",
  17: "hiace-premio-basic-all-in",
  18: "mitsubishi-xpander",
  19: "honda-new-hrv",
  20: "toyota-hiace-luxury-all-in",
  21: "isuzu-elf-long-all-in",
  22: "medium-bus-34-seat-all-in",
  23: "big-bus-50-seat-all-in",
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  output: isStaticDemoBuild ? "export" : "standalone",
  ...(isStaticDemoBuild ? { basePath: demoBasePath, trailingSlash: true } : {}),
  async redirects() {
    return Object.entries(LEGACY_VEHICLE_ID_TO_SLUG).flatMap(([id, slug]) => [
      {
        source: `/kendaraan/${id}`,
        destination: `/kendaraan/${slug}`,
        permanent: true,
      },
      {
        source: `/en/kendaraan/${id}`,
        destination: `/en/kendaraan/${slug}`,
        permanent: true,
      },
    ]);
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
