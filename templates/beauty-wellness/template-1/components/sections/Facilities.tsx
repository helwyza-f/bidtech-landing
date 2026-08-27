import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { facilities } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Facilities() {
  return (
    <section
      id="fasilitas"
      className="section-space bg-[var(--background)] pt-32 md:pt-40"
    >
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Fasilitas Unggulan"
              title="Semua yang Anda butuhkan untuk berkembang."
              description="Setiap area dirancang untuk memberikan pengalaman latihan yang nyaman, aman, dan maksimal."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="#membership"
              className="group inline-flex items-center gap-3 text-sm font-semibold"
            >
              Lihat Membership

              <span className="flex size-10 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {facilities.map((facility, index) => {
            const layout =
              facility.size === "large"
                ? "lg:col-span-8 lg:row-span-2"
                : facility.size === "wide"
                  ? "lg:col-span-8"
                  : "lg:col-span-4";

            const height =
              facility.size === "large"
                ? "min-h-[420px] lg:min-h-[620px]"
                : "min-h-[320px] lg:min-h-[300px]";

            return (
              <Reveal
                key={facility.title}
                delay={index * 0.07}
                className={layout}
              >
                <article
                  className={[
                    "group relative h-full overflow-hidden",
                    "rounded-[1.4rem] bg-black text-white",
                    height,
                  ].join(" ")}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes={
                      facility.size === "large"
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <div className="mb-3 h-px w-8 bg-[var(--color-primary)] transition-all duration-500 group-hover:w-14" />

                    <h3 className="max-w-lg font-heading text-xl font-semibold uppercase leading-tight tracking-[-0.035em] sm:text-2xl">
                      {facility.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                      {facility.description}
                    </p>
                  </div>

                  <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-md transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]">
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}