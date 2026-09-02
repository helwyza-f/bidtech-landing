/**
 * Program cards.
 *
 * Render-only data for the Programs section: image + alt here, i18n keys for the
 * translated text.
 */

import type { TranslationKey } from "@constants/translations";

export interface ProgramContent {
  badgeKey: TranslationKey;
  titleKey: TranslationKey;
  scheduleKey: TranslationKey;
  descKey: TranslationKey;
  image: string;
  alt: string;
}

export const PROGRAMS: ProgramContent[] = [
  {
    badgeKey: "program.monthly.badge",
    titleKey: "program.monthly.title",
    scheduleKey: "program.monthly.schedule",
    descKey: "program.monthly.desc",
    image: "/img/gambar1.png",
    alt: "Dokumentasi Aksi Dapur Pangan & Pos Sehat Keliling Warga",
  },
  {
    badgeKey: "program.triwulan.badge",
    titleKey: "program.triwulan.title",
    scheduleKey: "program.triwulan.schedule",
    descKey: "program.triwulan.desc",
    image: "/img/gambar2.png",
    alt: "Dokumentasi Mobil Ambulans & Pos Sehat Keliling Pedesaan",
  },
  {
    badgeKey: "program.tahunan.badge",
    titleKey: "program.tahunan.title",
    scheduleKey: "program.tahunan.schedule",
    descKey: "program.tahunan.desc",
    image: "/img/gambar3.png",
    alt: "Dokumentasi Pekan Bhakti Nusantara & Jambore Relawan Se-Indonesia",
  },
];
