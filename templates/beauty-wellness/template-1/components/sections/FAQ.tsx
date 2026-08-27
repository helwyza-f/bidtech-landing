"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { faqs } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);

  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="section-space bg-[#f4f2ee]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="FAQ"
                title="Pertanyaan yang sering ditanyakan."
                description="Informasi dasar yang perlu Anda ketahui sebelum mulai berlatih."
              />
            </div>
          </Reveal>

          <div className="border-t border-black/10">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <Reveal
                  key={faq.question}
                  delay={index * 0.05}
                >
                  <article className="border-b border-black/10">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          isOpen ? null : index
                        )
                      }
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-8 py-7 text-left md:py-8"
                    >
                      <span className="font-heading text-lg font-semibold tracking-[-0.025em] md:text-xl">
                        {faq.question}
                      </span>

                      <span
                        className={cn(
                          "flex size-10 shrink-0",
                          "items-center justify-center",
                          "rounded-full border border-black/10",
                          "transition-all duration-300",
                          isOpen &&
                            "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        )}
                      >
                        <Plus
                          size={17}
                          className={cn(
                            "transition-transform duration-300",
                            isOpen && "rotate-45"
                          )}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  height: 0,
                                  opacity: 0,
                                }
                          }
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: shouldReduceMotion
                              ? 0
                              : 0.4,
                            ease: [
                              0.22, 1, 0.36, 1,
                            ],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-8 pr-12 text-sm leading-7 text-black/55 md:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}