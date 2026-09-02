/**
 * Blog / activity articles — render-only data for the Blog section.
 * Each entry keeps image + alt here and points at the i18n keys for its text.
 */
import type { TranslationKey } from "@constants/translations";

export interface ArticleContent {
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  excerptKey: TranslationKey;
  image: string;
  alt: string;
  href?: string;
}

export const BLOG_ARTICLES: ArticleContent[] = [
  {
    titleKey: "blog.a4.title",
    dateKey: "blog.a4.date",
    excerptKey: "blog.a4.excerpt",
    image: "/img/gambar aksi 1.png",
    alt: "Dokumentasi Peresmian Sentra Olahan Pangan Mandiri untuk Ibu-Ibu Rumah Tangga",
    href: "#",
  },
  {
    titleKey: "blog.a2.title",
    dateKey: "blog.a2.date",
    excerptKey: "blog.a2.excerpt",
    image: "/img/gambar aksi 2.png",
    alt: "Dokumentasi Pekan Bhakti Nusantara & Jambore Relawan Nasional",
    href: "#",
  },
  {
    titleKey: "blog.a6.title",
    dateKey: "blog.a6.date",
    excerptKey: "blog.a6.excerpt",
    image: "/img/gambar aksi 3.png",
    alt: "Dokumentasi Presentasi Laporan Akuntabilitas dan Transparansi Donasi Publik 2025",
    href: "#",
  },
];
