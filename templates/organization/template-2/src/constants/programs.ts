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
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk program pertama",
  },
  {
    badgeKey: "program.triwulan.badge",
    titleKey: "program.triwulan.title",
    scheduleKey: "program.triwulan.schedule",
    descKey: "program.triwulan.desc",
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk program kedua",
  },
  {
    badgeKey: "program.tahunan.badge",
    titleKey: "program.tahunan.title",
    scheduleKey: "program.tahunan.schedule",
    descKey: "program.tahunan.desc",
    image: "/img/placeholder.svg",
    alt: "Gambar placeholder untuk program ketiga",
  },
];
