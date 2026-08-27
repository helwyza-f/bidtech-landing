"use client";

import { TextMarquee } from '@/components/ui/text-marquee'

export function BrandMarquee() {
  return (
    <section className="relative w-full bg-background py-5 md:py-7 overflow-hidden border-y border-border">
      <TextMarquee
        baseVelocity={-0.8}
        scrollDependent
        delay={200}
        className="text-[4vw]! font-display font-bold italic tracking-[-0.04em] leading-[90%] text-foreground"
      >
        Wood-fired · Hand-rolled · Locally sourced ·
      </TextMarquee>
      <TextMarquee
        baseVelocity={0.8}
        scrollDependent
        delay={200}
        className="text-[4vw]! font-display font-bold tracking-[-0.04em] leading-[90%] text-gradient-brand"
      >
        Better food · For more people · Since day one ·
      </TextMarquee>
    </section>
  )
}
