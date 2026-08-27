import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { locations } from "@/data/home";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Locations() {
  return (
    <section
      id="lokasi"
      className="section-space bg-[#f4f2ee]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Bersama Ahlinya"
            title="Temukan cabang terdekat."
            description="Pilih lokasi Ironforce yang paling nyaman dan mulai perjalanan latihan Anda."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal
              key={location.slug}
              delay={(index % 3) * 0.07}
            >
              <article className="group overflow-hidden rounded-[1.4rem] border border-black/[0.07] bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={location.image}
                    alt={`Cabang ${location.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {location.city}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold uppercase tracking-[-0.035em]">
                    {location.name}
                  </h3>

                  <div className="mt-4 flex gap-3 text-black/50">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                    />

                    <p className="text-sm leading-6">
                      {location.address}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-black/[0.07] pt-5">
                    <Link
                      href={`/lokasi/${location.slug}`}
                      className="group/link flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em]"
                    >
                      Lihat Detail

                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}