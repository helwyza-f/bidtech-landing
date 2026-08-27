import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { trainers } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Trainers() {
  return (
    <section
      id="trainer"
      className="section-space bg-white"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="Pelatih Profesional"
                title="Latihan bersama ahlinya."
                description="Dapatkan arahan yang lebih terukur bersama trainer yang memahami tujuan dan kemampuan Anda."
              />

              <div className="mt-8 hidden lg:block">
                <span className="block font-heading text-[7rem] font-bold leading-none tracking-[-0.08em] text-black/[0.035]">
                  01—02
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {trainers.map((trainer, index) => (
              <Reveal
                key={trainer.name}
                delay={index * 0.1}
              >
                <article className="group relative min-h-[540px] overflow-hidden rounded-[1.4rem] bg-black text-white md:min-h-[620px]">
                  <Image
                    src={trainer.image}
                    alt={`${trainer.name}, ${trainer.specialty}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-[var(--color-primary)]">
                    <ArrowUpRight size={17} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {trainer.specialty}
                    </span>

                    <h3 className="mt-2 font-heading text-3xl font-semibold uppercase leading-none tracking-[-0.055em] md:text-4xl">
                      {trainer.name}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-6 text-white/55">
                      {trainer.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}