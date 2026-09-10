'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactItems = [
  {
    id: 'alamat',
    icon: MapPin,
    label: 'Alamat',
    value: 'Jl. Melati No. 27,\nBandung, Jawa Barat 40123',
  },
  {
    id: 'telepon',
    icon: Phone,
    label: 'Telepon',
    value: '+62 812 3456 7890',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'halo@tehin.id',
  },
  {
    id: 'jam',
    icon: Clock,
    label: 'Jam Operasional',
    value: 'Senin – Minggu\n08.00 – 20.00 WIB',
  },
];


const GMAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985055427993!2d107.61847731477405!3d-6.914744194991698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7aa2c5df7c3%3A0x99c0e7248cce1a5f!2sGedung%20Sate!5e0!3m2!1sid!2sid!4v1694000000000!5m2!1sid!2sid';
const GMAPS_LINK = 'https://maps.google.com/?q=Jl.+Melati+No.+27+Bandung';

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const triggerCfg = {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        };

        if (leftRef.current) {
          gsap.fromTo(
            Array.from(leftRef.current.children),
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 1.0, stagger: 0.12, ease: 'power3.out', scrollTrigger: triggerCfg }
          );
        }

        if (mapRef.current) {
          gsap.fromTo(
            mapRef.current,
            { opacity: 0, scale: 0.93, y: 24 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: triggerCfg }
          );
        }
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="w-full relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16 lg:pb-20"
      style={{ background: 'rgba(235, 230, 218, 0.45)' }}
    >
      {/* Dekorasi daun kiri bawah */}
      <img
        src="/assets/individual/03_icon_daun_teh.webp"
        alt="" aria-hidden="true"
        className="absolute -bottom-4 -left-4 w-28 sm:w-44 opacity-15 rotate-12 pointer-events-none select-none"
      />
      {/* Script accent kanan atas */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 -rotate-6 select-none pointer-events-none hidden md:block">
        <span className="font-script text-[1.5rem] sm:text-[1.8rem] text-[#5C6B57]/70 leading-none block">Segar di</span>
        <span className="font-script text-[1.5rem] sm:text-[1.8rem] text-[#5C6B57]/70 leading-none block -mt-1">Setiap Langkah</span>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">

          {/* ── KIRI ── */}
          <div ref={leftRef} className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-5">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 select-none">
              <img src="/assets/individual/03_icon_daun_teh.webp" alt="" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain -rotate-6" />
              <span className="font-nav text-[0.68rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#1F331A]">
                Lokasi &amp; Kontak
              </span>
            </div>

            {/* Judul */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.8rem] text-[#1F331A] font-normal leading-[1.15] tracking-tight">
              Kunjungi Kami <span className="hidden sm:inline"><br /></span>atau Hubungi Langsung
            </h2>

            {/* Deskripsi */}
            <p className="font-sans text-xs sm:text-[0.9rem] text-[#5C6B57] leading-relaxed max-w-sm">
              Kami selalu terbuka untuk cerita, pertanyaan, dan saran dari kamu. Yuk, terhubung dengan Teh.in dan rasakan kesegarannya lebih dekat!
            </p>

            {/* Grid 2x2 kontak */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 sm:gap-3 bg-white/75 backdrop-blur-sm border border-[#1F331A]/10 rounded-xl sm:rounded-2xl p-2.5 sm:px-3.5 sm:py-3 shadow-[0_3px_12px_rgba(31,51,26,0.05)] hover:shadow-[0_8px_22px_rgba(31,51,26,0.1)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1F331A] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-nav text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.1em] text-[#5C6B57] font-bold mb-0.5 truncate">
                        {item.label}
                      </div>
                      <div className="font-sans text-[0.72rem] sm:text-[0.82rem] text-[#1F331A] font-medium leading-snug break-words whitespace-pre-line">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tombol Maps + Script accent */}
            <div className="flex items-center gap-4 flex-wrap pt-1 sm:pt-0">
              <a
                href={GMAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1F331A] hover:bg-[#2D4A27] text-white font-nav text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_6px_20px_rgba(31,51,26,0.28)]"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>Buka Google Maps</span>
                <span>→</span>
              </a>
              <div className="-rotate-3 select-none hidden sm:block">
                <span className="font-script text-[1.4rem] sm:text-[1.7rem] text-[#5C6B57] leading-none block">Lebih dekat</span>
                <span className="font-script text-[1.4rem] sm:text-[1.7rem] text-[#5C6B57] leading-none block -mt-1">dengan Teh.in</span>
              </div>
            </div>

          </div>

          {/* ── KANAN: PETA ── */}
          <div ref={mapRef} className="lg:col-span-7 flex flex-col gap-0 mt-2 lg:mt-0">
            {/* Map container */}
            <div
              className="relative h-[220px] sm:h-[320px] lg:h-[360px] rounded-t-[1.5rem] sm:rounded-t-[2.2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(31,51,26,0.22)] border border-b-0 border-[#1F331A]/10"
            >
              <iframe
                src={GMAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Teh.in di Google Maps"
                className="w-full h-full"
              />
            </div>

            {/* Bottom bar dalam peta */}
            <div className="bg-white/90 backdrop-blur-sm border border-t-0 border-[#1F331A]/10 rounded-b-[1.5rem] sm:rounded-b-[2.2rem] p-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_12px_30px_-8px_rgba(31,51,26,0.16)]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1F331A] flex items-center justify-center shrink-0">
                  <img src="/assets/individual/03_icon_daun_teh.webp" alt="" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain invert" />
                </div>
                <div>
                  <div className="font-serif text-[0.82rem] sm:text-[0.88rem] font-semibold text-[#1F331A] leading-tight">
                    Mudah ditemukan, selalu segar
                  </div>
                  <div className="font-sans text-[0.66rem] sm:text-[0.72rem] text-[#5C6B57] leading-snug mt-0.5">
                    Kunjungi kedai kami dan rasakan teh autentik langsung.
                  </div>
                </div>
              </div>
              <a
                href={GMAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1F331A] hover:bg-[#2D4A27] text-white font-nav text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md whitespace-nowrap shrink-0"
              >
                <Send className="w-3 h-3 shrink-0" />
                <span>Rute Sekarang</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
