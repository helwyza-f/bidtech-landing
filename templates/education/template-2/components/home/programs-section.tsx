"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { programs } from "@/lib/data/programs";

/**
 * Desktop/tablet (md ke atas): layout editorial horizontal-row, gambar
 * besar bergantian kiri-kanan seperti spread majalah.
 * Mobile (di bawah md): slider horizontal menampilkan semua 4 jalur
 * tanpa show-more (jumlahnya memang tetap 4).
 */
export function ProgramsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduce) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(".program-row");

        rows.forEach((row) => {
          const image = row.querySelector<HTMLElement>(".program-image");
          const copy = row.querySelectorAll<HTMLElement>(".program-copy > *");

          gsap.set(image, { clipPath: "inset(0 0 100% 0)" });
          gsap.set(copy, { y: 24, opacity: 0 });

          ScrollTrigger.create({
            trigger: row,
            start: "top 78%",
            once: true,
            onEnter: () => {
              gsap.to(image, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power4.out" });
              gsap.to(copy, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.15 });
            },
          });

          gsap.to(image, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section id="program" ref={rootRef}>
      <div className="mb-8 grid gap-4 sm:mb-10 md:mb-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
        <h2 className="text-2xl font-semibold leading-[1.08] text-foreground sm:text-display-lg">
          Pilih jalur yang sesuai tujuan kariermu
        </h2>
        <p className="text-sm text-muted sm:text-body-lg lg:max-w-[46ch]">
          Empat jalur spesialisasi, tiap jalur dirancang berjenjang dari fundamental sampai
          project akhir berstandar industri.
        </p>
      </div>

      {/* Desktop/tablet: baris editorial bergantian kiri-kanan */}
      <div className="hidden divide-y divide-line border-y border-line md:block">
        {programs.map((program, idx) => {
          const reversed = idx % 2 === 1;
          return (
            <div
              key={program.slug}
              className="program-row grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
            >
              <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
                <div className="program-image relative aspect-[4/3] w-full overflow-hidden rounded-panel bg-brand-soft">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                    {program.classCount} kelas terpadu
                  </span>
                </div>
              </div>

              <div className={`program-copy lg:col-span-7 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
                <h3 className="font-display text-3xl italic leading-[1.05] text-foreground lg:text-4xl">
                  {program.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted lg:mt-4 lg:text-base">
                  {program.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 lg:mt-5">
                  {program.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-pill border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href="#kursus"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand lg:mt-6"
                >
                  <span>Lihat kurikulum jalur</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: slider menampilkan semua 4 jalur */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:hidden">
        {programs.map((program, i) => (
          <motion.article
            key={program.slug}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="w-[80vw] max-w-[320px] shrink-0 snap-start"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panel bg-brand-soft">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                {program.classCount} kelas terpadu
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-display text-2xl italic leading-[1.05] text-foreground">{program.title}</h3>
              <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted">{program.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {program.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-pill border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href="#kursus"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand"
              >
                <span>Lihat kurikulum jalur</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}