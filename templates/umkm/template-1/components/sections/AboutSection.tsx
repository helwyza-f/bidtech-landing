'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgFrameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── 1. EFEK DARI KECIL KE BESAR SAAT BERADA DI SECTION TERSEBUT ──
        if (imgFrameRef.current && sectionRef.current) {
          gsap.fromTo(
            imgFrameRef.current,
            {
              scale: 0.88,
              opacity: 0.85,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── 2. EFEK PARALAKS KETIKA DI-SCROLL UNTUK GAMBAR ──
        if (imgRef.current && sectionRef.current) {
          gsap.fromTo(
            imgRef.current,
            {
              yPercent: -12,
              scale: 1.18,
            },
            {
              yPercent: 12,
              scale: 1.18,
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

        // ── 3. ANIMASI TEKS SCRIPT PADA GAMBAR ──
        gsap.fromTo(
          '.about-script-badge',
          { opacity: 0, scale: 0.88, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.25,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // ── 4. STAGGERED REVEAL KONTEN TEKS KANAN ──
        if (sectionRef.current) {
          gsap.fromTo(
            '.about-text-content > *',
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="page-section pt-10 sm:pt-16 lg:pt-22 pb-10 sm:pb-16 lg:pb-20 relative w-full overflow-hidden"
      style={{ background: 'rgba(235, 230, 218, 0.45)' }}
    >
      <div className="container">
        {/* Open Canvas Layout (Bersih Tanpa Card Pembungkus & Tanpa Daun Mengambang) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* ── KOLOM KIRI: Foto Mandiri Berbingkai Lengkung dengan Zoom & Parallax ── */}
          <div
            ref={imgFrameRef}
            className="relative w-full h-[230px] sm:h-[340px] lg:h-[540px] rounded-[1.6rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_12px_36px_-10px_rgba(45,74,39,0.18)] border border-[#2D4A27]/10 will-change-transform"
          >
            {/* Gambar berparalaks saat di-scroll */}
            <img
              ref={imgRef}
              src="/assets/about brand.webp"
              alt="Perkebunan Teh Pilihan Nusantara"
              className="w-full h-full object-cover object-center will-change-transform"
            />

            {/* Script Text Overlay "Dari Alam untuk Hari yang Lebih Baik" */}
            <div className="about-script-badge absolute left-4 sm:left-10 lg:left-12 bottom-4 sm:bottom-10 lg:bottom-14 z-10 select-none">
              <div className="relative inline-block transform -rotate-[5deg]">
                <p
                  className="font-script text-white text-2xl sm:text-4xl lg:text-[3.25rem] leading-[1.12]"
                  style={{
                    textShadow: '0 3px 14px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.75)',
                  }}
                >
                  Dari Alam<br />
                  untuk Hari<br />
                  yang Lebih Baik
                </p>
                <svg
                  className="w-32 sm:w-52 lg:w-64 h-3 sm:h-3.5 mt-1"
                  viewBox="0 0 240 14"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))' }}
                >
                  <path
                    d="M2 9C70 2 170 2 238 11"
                    stroke="#ffffff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ── KOLOM KANAN: Konten Cerita Bersih & Elegan ── */}
          <div className="relative flex flex-col justify-center py-2 sm:py-4 lg:py-6">
            <div className="about-text-content relative z-10 max-w-xl">
              {/* Tagline "TENTANG KAMI" dengan Icon Daun */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <img
                  src="/assets/individual/03_icon_daun_teh.webp"
                  alt="Daun Teh"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
                <span
                  className="font-nav text-[0.68rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-brand-dark)' }}
                >
                  Tentang Kami
                </span>
              </div>

              {/* Garis Pembatas Halus di Bawah Tagline */}
              <div
                className="w-8 sm:w-10 h-[1.5px] mb-3 sm:mb-5"
                style={{ backgroundColor: 'rgba(45, 74, 39, 0.28)' }}
              />

              {/* Judul Utama H2 */}
              <h2
                className="font-serif text-2xl sm:text-4xl lg:text-[2.85rem] font-normal leading-[1.18] sm:leading-[1.16] mb-3 sm:mb-5 tracking-tight"
                style={{ color: 'var(--color-brand-dark)' }}
              >
                Perpaduan Alami<br />
                yang Penuh Cerita
              </h2>

              {/* Paragraf Deskripsi */}
              <p
                className="font-sans text-[0.84rem] sm:text-[0.98rem] leading-relaxed sm:leading-[1.75] max-w-lg mb-5 sm:mb-8"
                style={{ color: 'var(--color-olive)' }}
              >
                Kami percaya teh yang baik berasal dari alam yang terjaga. Di kebun-kebun pilihan, kami merawat setiap daun dengan penuh perhatian untuk menghasilkan rasa yang murni, segar, dan bermakna bagi setiap momen Anda.
              </p>

              {/* Tombol CTA "Tentang Kami →" */}
              <div>
                <a
                  href="#keunggulan"
                  className="inline-flex items-center gap-2 text-white font-nav text-xs sm:text-sm font-bold px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
                  style={{
                    backgroundColor: 'var(--color-brand-dark)',
                  }}
                >
                  <span>Tentang Kami</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
