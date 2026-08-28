"use client";

import { TextMarquee } from '@/components/ui/text-marquee'

export function BrandMarquee() {
  return (
    <section className="relative w-full bg-background py-6 sm:py-8 md:py-10 overflow-hidden border-y border-border flex flex-col gap-3 sm:gap-4 md:gap-5">
      <TextMarquee
        baseVelocity={-0.8}
        scrollDependent
        delay={200}
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold italic tracking-[-0.02em] leading-normal text-foreground py-0.5"
      >
        Wood-fired · Hand-rolled · Locally sourced ·
      </TextMarquee>
      <TextMarquee
        baseVelocity={0.8}
        scrollDependent
        delay={200}
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-[-0.02em] leading-normal text-gradient-brand py-0.5"
      >
        Better food · For more people · Since day one ·
      </TextMarquee>
    </section>
  )
}
