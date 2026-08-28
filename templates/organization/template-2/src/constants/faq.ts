/**
 * FAQ accordion entries.
 *
 * Fully translated — this file only holds the i18n key pairs and their order.
 */

import type { TranslationKey } from "@constants/translations";

export interface FaqContent {
  questionKey: TranslationKey;
  answerKey: TranslationKey;
}

export const FAQ_ITEMS: FaqContent[] = [
  { questionKey: "faq.q1.q", answerKey: "faq.q1.a" },
  { questionKey: "faq.q2.q", answerKey: "faq.q2.a" },
  { questionKey: "faq.q3.q", answerKey: "faq.q3.a" },
  { questionKey: "faq.q4.q", answerKey: "faq.q4.a" },
  { questionKey: "faq.q5.q", answerKey: "faq.q5.a" },
  { questionKey: "faq.q6.q", answerKey: "faq.q6.a" },
];
