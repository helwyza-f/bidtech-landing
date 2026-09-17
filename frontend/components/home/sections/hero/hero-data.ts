// konten statis untuk 3 hero; path asset mengikuti struktur public/images/*

export type DecorativeIconName =
  | "trending-up"
  | "globe"
  | "smartphone"
  | "bell"
  | "users"
  | "search-check";

// union bertanda membuat variasi kartu gagal di pemeriksaan tipe, bukan render kosong diam-diam
export type DecorativeCardBase = {
  id: string;
  /** class posisi Tailwind untuk kartu absolute */
  position: string;
  /** posisi layer: nilai front di atas model, behind diselipkan di balik siluet */
  zLayer: "front" | "behind";
};

export type PillCardData = DecorativeCardBase & {
  kind: "pill";
  icon: DecorativeIconName;
  label: string;
  /** varian tampilan: "pill" untuk badge horizontal, "card" untuk kartu flex-col */
  variant?: "pill" | "card";
};

export type ChartPanelCardData = DecorativeCardBase & {
  kind: "chart-panel";
  label: string;
};

export type StoreBadgesCardData = DecorativeCardBase & {
  kind: "store-badges";
  label: string;
};

export type AvatarStackCardData = DecorativeCardBase & {
  kind: "avatar-stack";
  label: string;
  avatarSrcs: string[]; // path foto asli; jumlah render mengikuti data
  metric: { value: number; suffix?: string };
};

export type MetricPanelCardData = DecorativeCardBase & {
  kind: "metric-panel";
  label: string;
  metric: { value: number; delta?: string; suffix?: string; prefix?: string };
};

export type ThumbnailCardData = DecorativeCardBase & {
  kind: "thumbnail";
  label: string;
  thumbnailSrc: string;
  metric: { value: number; suffix?: string };
};

export type DecorativeCard =
  | PillCardData
  | ChartPanelCardData
  | StoreBadgesCardData
  | AvatarStackCardData
  | MetricPanelCardData
  | ThumbnailCardData;

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  modelSrc: string;
  modelAlt: string;
  decoratives: DecorativeCard[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Bisnis Maju Tanpa Website? Kehilangan Peluang!",
    subtitle:
      "8 dari 10 bisnis penyewaan mobil yang memiliki website, punya pelanggan lebih banyak 80% daripada yang belum punya website bisnis.",
    modelSrc: "/images/hero/model-3.webp",
    modelAlt: "Pengusaha memegang laptop dengan gestur semangat, varian kedua",
    decoratives: [
      {
        id: "h3-pelanggan",
        kind: "metric-panel",
        position: "left-1 top-4 xs:left-2 xs:top-8 sm:left-14 sm:top-12",
        zLayer: "front",
        label: "Pelanggan Baru",
        metric: { value: 236, delta: "+100%" },
      },
      {
        id: "h3-jangkau",
        kind: "pill",
        variant: "card",
        position: "right-0 top-20 xs:top-24 sm:-right-4 sm:top-24",
        zLayer: "front",
        icon: "users",
        label: "Menjangkau Lebih Banyak Pelanggan",
      },
      {
        id: "h3-google",
        kind: "pill",
        variant: "card",
        position: "right-1 top-44 xs:right-2 sm:-right-6 sm:top-58",
        zLayer: "behind",
        icon: "search-check",
        label: "Mudah Ditemukan di Google",
      },
      {
        id: "h3-design",
        kind: "thumbnail",
        position: "left-1 bottom-4 xs:left-2 sm:-left-4 sm:bottom-4",
        zLayer: "front",
        thumbnailSrc: "/images/design_thumbnail/rentcar.webp",
        label: "Puluhan Design Siap Pakai",
        metric: { value: 25, suffix: "+" },
      },
    ],
  },
  {
    id: "hero-2",
    title: "Efisensikan Kerja Tim Kantormu Dengan Aplikasi.",
    subtitle:
      "Aplikasi CRM, ERP dan Company Profile, meningkatkan peluang usaha ke 200% calon customer baru. Dan meningkatkan efisensi bisnis hingga 4x lipat.",
    modelSrc: "/images/hero/model-2.webp",
    modelAlt: "Pengguna tersenyum sambil memegang ponsel",
    decoratives: [
      {
        id: "h2-store",
        kind: "store-badges",
        position: "right-0 top-2 xs:right-2 sm:right-16",
        zLayer: "behind",
        label: "Aplikasi Mobile dapat Tersedia di:",
      },
      {
        id: "h2-team",
        kind: "avatar-stack",
        position: "left-1 bottom-24 xs:left-2 sm:-left-4 sm:bottom-32",
        zLayer: "front",
        avatarSrcs: [
          "/images/hero/avatar-1.webp",
          "/images/hero/avatar-2.webp",
          "/images/hero/avatar-3.webp",
          "/images/hero/avatar-4.webp",
        ],
        label: "Semua Tim Bekerja Dalam Satu Sistem",
        metric: { value: 10, suffix: "+" },
      },
      {
        id: "h2-transaksi",
        kind: "pill",
        variant: "card",
        position: "right-1 top-40 xs:right-2 sm:-right-8 sm:top-52",
        zLayer: "front",
        icon: "smartphone",
        label: "Transaksi Sejauh Satu Sentuhan",
      },
      {
        id: "h2-notif",
        kind: "pill",
        variant: "pill",
        position: "right-1 bottom-4 xs:right-2 sm:-right-4 sm:bottom-14",
        zLayer: "front",
        icon: "bell",
        label: "Notifikasi Langsung, Repeat Order Naik",
      },
    ],
  },
  {
    id: "hero-3",
    title: "Peluang Lebih Besar, Dengan Website Lebih Professional!",
    subtitle:
      "Bisnis tanpa aplikasi dan website, dapat kehilangan profit hingga 20% setiap tahunnya.",
    modelSrc: "/images/hero/model-1.webp",
    modelAlt: "Pengusaha memegang laptop dengan gestur semangat",
    decoratives: [
      {
        id: "h1-proses-cepat",
        kind: "pill",
        variant: "pill",
        position: "right-1 top-4 xs:right-2 sm:right-16 sm:top-8",
        zLayer: "front",
        icon: "trending-up",
        label: "Proses Lebih Cepat",
      },
      {
        id: "h1-jangkauan",
        kind: "pill",
        variant: "pill",
        position: "right-0 top-28 xs:right-1 sm:-right-2 sm:top-36",
        zLayer: "front",
        icon: "globe",
        label: "Jangkauan Bisnis Luas",
      },
      {
        id: "h1-omset",
        kind: "chart-panel",
        position: "left-1 bottom-6 xs:left-2 sm:bottom-14",
        zLayer: "front",
        label: "Pantau dan Catat Omset Usaha",
      },
    ],
  },
];

// blob kanan statis dipakai semua slide; beda dari blob kiri yang morphing
export const HERO_RIGHT_BLOB_SRC = "/images/hero/blob-1.webp";

// isi path SVG custom di sini untuk mengganti ikon bawaan react-icons
export type CustomIconKey = DecorativeIconName | "apple-store" | "google-play";

export const CUSTOM_ICON_OVERRIDES: Partial<Record<CustomIconKey, string>> = {};

// anggaran timing (ms) sebagai satu sumber untuk hook orkestrasi
export const HERO_TIMINGS = {
  cycleDuration: 10_000,

  blobFadeIn: 900,

  typeMsPerChar: 20,
  untypeMsPerChar: 10,
  cursorBlinkVisibleAfterType: 2000,

  subtitleFade: 350,

  modelRiseDuration: 700,
  modelSinkDuration: 600,

  decorativesStagger: 60,
  decorativePopDuration: 450,
  decorativePopLeadBeforeModelSettles: 200,
  countUpMultiplier: 2,

  floatAmplitude: 8,
  floatDuration: 3.2,

  blobSpeedMultiplier: 0.1,
  blobLayers: [
    { morphDuration: 18, driftDuration: 23 },
    { morphDuration: 14, driftDuration: 19 },
    { morphDuration: 11, driftDuration: 15 },
  ],
} as const;
