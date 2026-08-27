import { ArrowUpRight, MessageCircle } from "lucide-react";

import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function ConversionCTA() {
  const message = encodeURIComponent(
    `Halo ${siteConfig.brand.name}, saya ingin mendapatkan informasi mengenai membership gym.`
  );

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;

  return (
    <section className="bg-white pb-[var(--section-space)]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0b0b0b] px-6 py-16 text-white sm:px-10 md:px-14 md:py-20 lg:px-20">
            {/* Decorative circle */}
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-52 size-[480px] rounded-full border border-white/[0.06]"
            />

            <div
              aria-hidden="true"
              className="absolute -right-12 -top-32 size-[320px] rounded-full border border-[var(--color-primary)]/20"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                  Start Today
                </span>

                <h2 className="mt-6 font-heading text-[clamp(3rem,6vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.065em]">
                  Siap menjadi versi
                  <br />
                  terkuat dirimu?
                </h2>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/55 md:text-base">
                  Konsultasikan target latihan Anda bersama
                  tim kami dan temukan membership yang paling
                  sesuai.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group flex min-h-16 items-center",
                  "justify-between gap-8",
                  "rounded-full bg-[var(--color-primary)]",
                  "px-7 text-sm font-semibold",
                  "transition-colors duration-300",
                  "hover:bg-[var(--color-primary-hover)]",
                  "lg:min-w-[260px]",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={18} />
                  Konsultasi Gratis
                </span>

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}