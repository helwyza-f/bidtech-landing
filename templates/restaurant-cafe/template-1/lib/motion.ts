import type { Variants } from 'motion/react';

/* ─────────────────────────────────────────────────────────────
   KAMUS ANIMASI
   Semua angka animasi di template ini HARUS diambil dari sini.
   Kalau tiap komponen bikin durasi & easing sendiri, hasilnya
   terasa "acak". Satu sumber = satu karakter gerak.
   ───────────────────────────────────────────────────────────── */

/** Kurva bezier. Format: [x1, y1, x2, y2] — sama persis dengan CSS cubic-bezier(). */
export const ease = {
  /** Expo-out: melesat di awal, mendarat pelan. Kurva andalan untuk UI masuk. */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Untuk gerakan yang berangkat DAN berhenti (accordion, tab indicator). */
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  /** Sedikit melewati target lalu balik — untuk badge/ikon yang ingin terasa "pop". */
  back: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

/** Durasi dalam detik. Aturan praktis: makin besar elemennya, makin lama. */
export const duration = {
  fast: 0.25,   // hover, warna, ikon kecil
  base: 0.6,    // reveal elemen biasa
  slow: 0.9,    // heading besar, gambar hero
};

/** Spring untuk apa pun yang mengikuti kursor/drag — di sana durasi tidak relevan. */
export const spring = {
  soft: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 0.6 },
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
};

/* ── Variants: "resep" animasi yang bisa dipakai berkali-kali ────────────── */

/** Naik + memudar. Dipakai oleh <Reveal />. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/**
 * Induk yang mengatur giliran anak-anaknya.
 * Anak TIDAK perlu delay manual — cukup jadi anak dari variant ini.
 */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Kata yang terbit dari balik garis (dipakai <SplitWords />). */
export const wordRise: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Ambang default IntersectionObserver: animasi jalan saat 25% elemen terlihat. */
export const viewport = { once: true, amount: 0.25 } as const;
