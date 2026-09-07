import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { partners } from "@/lib/data/partners";

function PartnerRow() {
  return (
    <div className="flex items-center gap-14 sm:gap-20">
      {partners.map((partner) => (
        <Image
          key={partner.name}
          src={partner.logo}
          alt={partner.name}
          width={120}
          height={32}
          className="h-6 w-auto shrink-0 object-contain brightness-0 opacity-100 invert transition-all hover:opacity-70 hover:grayscale-0 sm:h-7"
        />
      ))}
    </div>
  );
}

/**
 * Marquee mitra ringkas — dipakai di dalam Hero (bukan section terpisah)
 * untuk menghemat tinggi halaman, menggantikan baris statistik teks.
 */
export function PartnersMarquee() {
  return (
    <Marquee
      ariaLabel="Mitra dan hiring partner Nivora Academy"
      className="py-1"
      trackClassName="pl-0"
    >
      <PartnerRow />
      <div aria-hidden="true">
        <PartnerRow />
      </div>
    </Marquee>
  );
}