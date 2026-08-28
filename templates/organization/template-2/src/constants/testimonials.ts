/**
 * Testimonials.
 *
 * Render-only data for the Testimonials section: avatar initials + colour here,
 * i18n keys for the translated text.
 */

import type { TranslationKey } from "@constants/translations";

export interface TestimonialContent {
  nameKey: TranslationKey;
  roleKey: TranslationKey;
  textKey: TranslationKey;
  initials: string;
  color: string;
}

export const TESTIMONIALS: TestimonialContent[] = [
  {
    nameKey: "testimonials.t1.name",
    roleKey: "testimonials.t1.role",
    textKey: "testimonials.t1.text",
    initials: "N1",
    color: "#053f5c",
  },
  {
    nameKey: "testimonials.t2.name",
    roleKey: "testimonials.t2.role",
    textKey: "testimonials.t2.text",
    initials: "N2",
    color: "#a5dded",
  },
  {
    nameKey: "testimonials.t3.name",
    roleKey: "testimonials.t3.role",
    textKey: "testimonials.t3.text",
    initials: "N3",
    color: "#f1f5f9",
  },
];
