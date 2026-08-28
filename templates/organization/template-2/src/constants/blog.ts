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
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk artikel contoh",
    href: "#",
  },
  {
    titleKey: "blog.a5.title",
    dateKey: "blog.a5.date",
    excerptKey: "blog.a5.excerpt",
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk artikel contoh",
    href: "#",
  },
  {
    titleKey: "blog.a6.title",
    dateKey: "blog.a6.date",
    excerptKey: "blog.a6.excerpt",
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk artikel contoh",
    href: "#",
  },
];
