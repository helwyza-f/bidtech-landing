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
    initials: "SM",
    color: "#053f5c",
  },
  {
    nameKey: "testimonials.t2.name",
    roleKey: "testimonials.t2.role",
    textKey: "testimonials.t2.text",
    initials: "FS",
    color: "#059669",
  },
  {
    nameKey: "testimonials.t3.name",
    roleKey: "testimonials.t3.role",
    textKey: "testimonials.t3.text",
    initials: "LH",
    color: "#0284c7",
  },
];
