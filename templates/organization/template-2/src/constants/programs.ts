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
    image: "/img/program-monthly.svg",
    alt: "Ilustrasi rapat program bulanan",
  },
  {
    badgeKey: "program.triwulan.badge",
    titleKey: "program.triwulan.title",
    scheduleKey: "program.triwulan.schedule",
    descKey: "program.triwulan.desc",
    image: "/img/program-quarterly.svg",
    alt: "Ilustrasi workshop program triwulan",
  },
  {
    badgeKey: "program.tahunan.badge",
    titleKey: "program.tahunan.title",
    scheduleKey: "program.tahunan.schedule",
    descKey: "program.tahunan.desc",
    image: "/img/program-annual.svg",
    alt: "Ilustrasi acara program tahunan",
  },
];
