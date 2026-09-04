"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { faqs } from "@/lib/data/faq";
import { whatsappLink } from "@/lib/data/site";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section className="border-t border-line bg-surface">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="text-display-lg font-semibold leading-tight text-foreground">
            Pertanyaan yang sering masuk
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Kami menjawab setiap keraguan secara transparan tanpa klaim berlebihan, karena
            keberhasilan belajar dimulai dari ekspektasi yang jujur.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl border border-line bg-background p-6">
            <h3 className="text-sm font-bold text-foreground">Masih ada hal yang ingin ditanyakan?</h3>
            <p className="text-xs leading-relaxed text-muted">
              Tim konselor akademik kami siap membantu menganalisis latar belakang dan memilih
              program yang paling tepat.
            </p>
            <a
              href={whatsappLink("Halo Nivora, saya mau konsultasi program")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 pt-1 text-xs font-bold text-brand hover:underline"
            >
              <MessageCircle size={15} />
              <span>Chat dengan tim konselor via WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-7">
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
      </div>
    </Section>
  );
}
