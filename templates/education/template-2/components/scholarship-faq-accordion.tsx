"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import type { ScholarshipFaq } from "@/lib/data/scholarship";

type ScholarshipFaqAccordionProps = {
  faqs: ScholarshipFaq[];
};

/**
 * Accordion FAQ terpisah dari FaqSection homepage — dipakai di halaman
 * /beasiswa (server component) sehingga interaktivitasnya perlu
 * dibungkus client component sendiri. Pola animasi disamakan dengan
 * FaqSection supaya konsisten secara motion di seluruh situs.
 */
export function ScholarshipFaqAccordion({ faqs }: ScholarshipFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.question} className="py-5">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="group flex w-full items-center justify-between gap-4 rounded text-left focus-visible:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base font-bold text-foreground transition-colors group-hover:text-brand sm:text-lg">
                {faq.question}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-brand/40 group-hover:text-brand">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-1 pr-8 pt-3.5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}