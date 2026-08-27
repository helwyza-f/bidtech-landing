import { Quote, Star } from "lucide-react";

import { testimonials } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section
      id="testimoni"
      className="section-space bg-white"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="Testimoni Member"
                title="Pengalaman nyata dari member."
                description="Cerita dari mereka yang telah menjadikan latihan sebagai bagian dari gaya hidup."
              />

              <Quote
                size={80}
                strokeWidth={1}
                className="mt-10 hidden text-[var(--color-primary)] opacity-20 lg:block"
              />
            </div>
          </Reveal>

          <div className="border-t border-black/[0.08]">
            {testimonials.map((testimonial, index) => (
              <Reveal
                key={testimonial.name}
                delay={index * 0.08}
              >
                <article className="border-b border-black/[0.08] py-10 md:py-14">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map(
                      (_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={15}
                          fill="currentColor"
                          strokeWidth={1}
                          className="text-[var(--color-primary)]"
                        />
                      )
                    )}
                  </div>

                  <blockquote className="mt-7 max-w-4xl font-heading text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.045em]">
                    “{testimonial.quote}”
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-[#0b0b0b] font-heading text-sm font-bold text-white">
                      {testimonial.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.06em]">
                        {testimonial.name}
                      </p>

                      <p className="mt-1 text-xs text-black/45">
                        {testimonial.membership}
                      </p>
                    </div>
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