'use client';

import { useEffect, useRef } from 'react';

interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  iconType: 'leaves' | 'cubes' | 'shield' | 'hand';
}

const features: FeatureItem[] = [
  {
    id: 'bahan',
    title: 'Bahan Pilihan',
    desc: 'Daun teh berkualitas dari kebun terbaik nusantara.',
    iconType: 'leaves',
  },
  {
    id: 'rasa',
    title: 'Rasa Konsisten',
    desc: 'Diseduh segar setiap 4 jam untuk rasa maksimal.',
    iconType: 'cubes',
  },
  {
    id: 'pengawet',
    title: 'Tanpa Pengawet',
    desc: 'Menggunakan bahan alami tanpa pengawet sintetis.',
    iconType: 'shield',
  },
  {
    id: 'harga',
    title: 'Harga Terjangkau',
    desc: 'Nikmat berkualitas dengan harga bersahabat.',
    iconType: 'hand',
  },
];

export default function KeunggulanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const abstractBorderRef = useRef<SVGSVGElement>(null);
  const paperTagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        // ── 1. HEADER — CLIP REVEAL (teks naik dari bawah seperti tirai)
        if (headerRef.current) {
          const children = Array.from(headerRef.current.children);
          // Bungkus setiap child dalam clip container
          children.forEach((child) => {
            const el = child as HTMLElement;
            el.style.overflow = 'hidden';
          });

          gsap.fromTo(
            children,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.14,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── 2. 4 FEATURE ITEMS — Smooth Stagger Slide dari kiri (pure transform)
        if (gridRef.current) {
          const items = Array.from(
            gridRef.current.querySelectorAll<HTMLElement>('.feature-item')
          );
          // Aktifkan GPU acceleration agar animasi tidak patah
          items.forEach((el) => {
            el.style.willChange = 'transform, opacity';
          });

          gsap.fromTo(
            items,
            { opacity: 0, x: -45 },
            {
              opacity: 1,
              x: 0,
              duration: 1.1,
              stagger: 0.16,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
              onComplete: () => {
                // Bersihkan will-change setelah animasi selesai
                items.forEach((el) => {
                  el.style.willChange = 'auto';
                });
              },
            }
          );
        }

        // ── 3. PHOTO WRAP — entrance
        if (photoWrapRef.current) {
          gsap.fromTo(
            photoWrapRef.current,
            { opacity: 0, scale: 0.88, rotation: 0 },
            {
              opacity: 1,
              scale: 1,
              rotation: 2,          // sedikit miring saat masuk
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: photoWrapRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── 4. ABSTRACT BORDER — draw-in efek (stroke dash)
        if (abstractBorderRef.current) {
          const paths = abstractBorderRef.current.querySelectorAll('path, rect, ellipse');
          paths.forEach((path) => {
            const el = path as SVGGeometryElement;
            const length = el.getTotalLength ? el.getTotalLength() : 400;
            gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(el, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: photoWrapRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            });
          });
        }

        // ── 5. PARALLAX pada gambar — bergerak lebih lambat dari scroll
        if (photoImgRef.current) {
          gsap.fromTo(
            photoImgRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4,
              },
            }
          );
        }

        // ── 6. PAPER NOTE — pop-in dengan rotasi bounce
        if (paperTagRef.current) {
          gsap.fromTo(
            paperTagRef.current,
            { opacity: 0, scale: 0.7, rotation: -14 },
            {
              opacity: 1,
              scale: 1,
              rotation: -3,
              duration: 1,
              delay: 0.5,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: photoWrapRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, []);

  const renderIcon = (type: FeatureItem['iconType']) => {
    switch (type) {
      case 'leaves':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#1F331A]" viewBox="0 0 32 32" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 28C12 28 10 18 19 11C28 4 28 4 28 4C28 4 28 13 21 22C14 31 12 28 12 28Z" />
            <path d="M12 28C12 28 7 24 6 18C5 12 9 8 9 8C9 8 13 11 14 17C14.7 21.2 12 28 12 28Z" />
            <path d="M12 28L18 16" />
          </svg>
        );
      case 'cubes':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#1F331A]" viewBox="0 0 32 32" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3L23 7L16 11L9 7L16 3Z" />
            <path d="M9 7V13L16 17V11" />
            <path d="M23 7V13L16 17" />
            <path d="M9 15L16 19L9 23L2 19L9 15Z" />
            <path d="M2 19V25L9 29V23" />
            <path d="M16 19V25L9 29" />
            <path d="M23 15L30 19L23 23L16 19L23 15Z" />
            <path d="M16 19V25L23 29V23" />
            <path d="M30 19V25L23 29" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#1F331A]" viewBox="0 0 32 32" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4L6 8V15C6 21.5 10.3 27.5 16 29C21.7 27.5 26 21.5 26 15V8L16 4Z" />
            <path d="M12 16L15 19L21 13" />
          </svg>
        );
      case 'hand':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#1F331A]" viewBox="0 0 32 32" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 17C20 17 24 13 27 7C27 7 20 7 16 11C12.5 14.5 16 19 20 17Z" />
            <path d="M16 11L23 14" />
            <path d="M4 22H11L16 25C17.5 25.8 19.5 25 20.2 23.5L21 22C21.6 20.8 22.8 20 24.2 20H28" />
            <path d="M4 22V27H11" />
          </svg>
        );
    }
  };

  return (
    <section
      id="keunggulan"
      ref={sectionRef}
      className="page-section pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16 lg:pb-20 relative w-full overflow-hidden"
      style={{
        backgroundImage: "url('/assets/background keunggulan.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F5F2EB',
      }}
    >
      <div className="container relative z-10">

        {/* ── HEADER CENTER ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <img
              src="/assets/individual/03_icon_daun_teh.webp"
              alt=""
              aria-hidden="true"
              className="w-4 h-4 object-contain -rotate-6"
            />
            <span className="font-nav text-[0.68rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#1F331A]">
              Mengapa Memilih Teh.in
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[3.25rem] text-[#1F331A] font-normal leading-[1.18] sm:leading-[1.14] tracking-tight mb-2.5 sm:mb-3">
            Lebih dari Sekadar Teh
          </h2>

          <p className="font-sans text-xs sm:text-base text-[#5C6B57] leading-relaxed max-w-xl mx-auto">
            Karena setiap tegukan kecil, membawa kebaikan besar untuk hari-harimu yang lebih baik.
          </p>
        </div>

        {/* ── MAIN CONTENT: 2 KOLOM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ── KOLOM KIRI: 4 PILAR GRID 2x2 ── */}
          <div
            ref={gridRef}
            className="lg:col-span-7 grid grid-cols-2 gap-x-3.5 sm:gap-x-8 lg:gap-x-10 gap-y-5 sm:gap-y-10 lg:gap-y-12"
          >
            {features.map((item) => (
              <div
                key={item.id}
                className="feature-item group flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4.5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full bg-[#E5E0D3]/85 border border-[#1F331A]/10 flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(31,51,26,0.06)] group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(31,51,26,0.12)] transition-all duration-300">
                  {renderIcon(item.iconType)}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-sm sm:text-lg lg:text-[1.2rem] font-bold text-[#1F331A] leading-tight mb-1 sm:mb-1.5 tracking-tight group-hover:text-[#2D4A27] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[0.72rem] sm:text-xs lg:text-[0.84rem] text-[#5C6B57] leading-relaxed max-w-[210px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── KOLOM KANAN: FOTO + ABSTRACT BORDER + PAPER TAG ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-3 sm:p-8 mt-2 sm:mt-0">

            {/* Abstract border SVG di belakang foto */}
            <svg
              ref={abstractBorderRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 sm:opacity-100"
              viewBox="0 0 420 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Border abstrak organik utama */}
              <path
                d="M30 60 Q10 20 60 10 Q180 -8 340 18 Q400 28 412 80 Q428 180 400 280 Q388 320 330 332 Q200 350 80 328 Q20 314 10 258 Q-4 180 30 60Z"
                stroke="#1F331A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.22"
              />
              {/* Border abstrak kedua (offset) */}
              <path
                d="M50 80 Q34 46 76 36 Q190 18 340 42 Q390 52 398 100 Q410 190 384 278 Q372 308 316 318 Q198 334 90 314 Q40 302 32 254 Q20 178 50 80Z"
                stroke="#5C6B57"
                strokeWidth="1.2"
                strokeDasharray="6 5"
                strokeLinecap="round"
                opacity="0.28"
              />
              {/* Aksen sudut kiri atas */}
              <path
                d="M18 40 Q8 8 48 4"
                stroke="#1F331A"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.35"
              />
              {/* Aksen sudut kanan bawah */}
              <path
                d="M390 300 Q408 330 370 338"
                stroke="#1F331A"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>

            {/* Photo Wrap — sedikit miring */}
            <div
              ref={photoWrapRef}
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none z-10 group mx-auto"
              style={{ transform: 'rotate(-2deg)' }}
            >
              {/* Backing card */}
              <div className="absolute inset-1 sm:inset-2.5 bg-[#DFDACE]/90 rounded-[1.8rem] sm:rounded-[2.6rem] transform -rotate-2 sm:-rotate-3 border border-[#1F331A]/10 transition-transform duration-500 group-hover:-rotate-4" />

              {/* Main Photo */}
              <div className="relative w-full aspect-[4/3] rounded-[1.6rem] sm:rounded-[2.4rem] overflow-hidden shadow-[0_16px_40px_-10px_rgba(31,51,26,0.22)] sm:shadow-[0_24px_60px_-12px_rgba(31,51,26,0.28)] border border-[#1F331A]/12 bg-[#E7E2D7]">
                <img
                  ref={photoImgRef}
                  src="/assets/individual/keunggulan_hands_tea.webp"
                  alt="Tangan memetik pucuk daun teh segar di perkebunan fajar"
                  className="w-full h-[115%] object-cover object-center will-change-transform"
                  style={{ marginTop: '-7.5%' }}
                />
              </div>

              {/* Paper Tag */}
              <div
                ref={paperTagRef}
                className="absolute -bottom-3 right-0 sm:-bottom-6 sm:-right-4 z-20 transform hover:rotate-0 transition-transform duration-300 select-none cursor-default"
                style={{ rotate: '-3deg' }}
              >
                <div className="relative bg-[#FCFBF8] border border-[#1F331A]/12 rounded-xl sm:rounded-2xl px-3.5 py-2 sm:px-6 sm:py-3.5 shadow-[0_8px_20px_rgba(31,51,26,0.16)] min-w-[135px] sm:min-w-[200px]">
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5E0D3] border border-[#1F331A]/25 shadow-inner block" />
                  <span className="absolute bottom-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5E0D3] border border-[#1F331A]/25 shadow-inner block" />
                  <p className="font-script text-lg sm:text-[1.85rem] text-[#1F331A] leading-none text-center font-normal">
                    Teh Baik
                  </p>
                  <p className="font-script text-lg sm:text-[1.85rem] text-[#1F331A] leading-none text-center font-normal -mt-0.5">
                    Untuk Hari Baik
                  </p>
                  <svg className="w-20 sm:w-36 h-2 sm:h-2.5 mx-auto mt-1" viewBox="0 0 140 10" fill="none">
                    <path
                      d="M2 7C45 2 95 2 138 8"
                      stroke="#1F331A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
