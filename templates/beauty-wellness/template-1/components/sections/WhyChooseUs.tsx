import { benefits } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function WhyChooseUs() {
  return (
    <section
      id="keunggulan"
      className="section-space overflow-hidden bg-[#0b0b0b] text-white"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Ironforce"
            title="Lebih dari sekadar tempat latihan."
            description="Kami menciptakan lingkungan yang membantu setiap member berlatih dengan lebih nyaman, terarah, dan konsisten."
            light
          />
        </Reveal>

        <div className="mt-16 border-t border-white/10">
          {benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              delay={index * 0.06}
            >
              <article className="group grid gap-5 border-b border-white/10 py-8 transition-colors duration-300 md:grid-cols-[100px_1fr_1fr] md:items-center md:py-10">
                <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]">
                  {benefit.number}
                </span>

                <h3 className="font-heading text-2xl font-semibold uppercase tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                  {benefit.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-white/50 md:justify-self-end">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}