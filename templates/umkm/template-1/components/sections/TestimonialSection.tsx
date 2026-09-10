'use client';

import { useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote: '"Rasa lemonnya bukan kaleng-kaleng atau sirup sintetis. Benar-benar asam segar buah asli yang pas banget dipadu sama wangi teh tubruknya."',
    avatar: 'RN',
    name: 'Rian Nugraha',
    role: 'Pelanggan Setia',
    stars: 5,
  },
  {
    id: 2,
    quote: '"Tenggorokan nggak gatal sama sekali! Biasanya sensitif sama teh pinggir jalan, tapi Teh.in beneran kerasa manisnya murni gula tebu."',
    avatar: 'DK',
    name: 'Dina Kusuma',
    role: 'Pencinta Teh Sehat',
    stars: 5,
  },
  {
    id: 3,
    quote: '"Pesen lewat WhatsApp pelayanannya cepat dan ramah. Kemasan cup-nya rapi, es batunya higienis bening. Teman kerja di kantor pada ikut ketagihan!"',
    avatar: 'FW',
    name: 'Fajar Wicaksono',
    role: 'Order Kantor',
    stars: 5,
  },
  {
    id: 4,
    quote: '"Rasanya autentik banget! Seperti teh buatan rumah tapi lebih segar. Jadi minuman favorit tiap hari."',
    avatar: 'SA',
    name: 'Sinta A.',
    role: 'Pelanggan Setia',
    stars: 5,
  },
  {
    id: 5,
    quote: '"Pilihan menunya banyak dan semuanya enak. Packaging-nya juga keren! Teh.in selalu jadi pilihan utama saat kerja."',
    avatar: 'RM',
    name: 'Rizky M.',
    role: 'Pelanggan Setia',
    stars: 5,
  },
  {
    id: 6,
    quote: '"Teh.in selalu jadi teman di setiap aktivitas. Segar, alami, dan bikin semangat! Highly recommended!"',
    avatar: 'DL',
    name: 'Dewi L.',
    role: 'Pelanggan Setia',
    stars: 5,
  },
];

// Duplikat untuk seamless loop
const doubled = [...testimonials, ...testimonials];

// Warna avatar berdasarkan inisial
const avatarColors: Record<string, string> = {
  RN: '#2D4A27',
  DK: '#5C6B57',
  FW: '#1F331A',
  SA: '#3D5C38',
  RM: '#4A6B44',
  DL: '#7A9B74',
};

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── 1. Header entrance
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current.children,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // ── 2. Marquee infinite scroll (Desktop Only)
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          if (trackRef.current) {
            const track = trackRef.current;
            const totalWidth = track.scrollWidth / 2;

            const tween = gsap.to(track, {
              x: -totalWidth,
              duration: 28,
              ease: 'none',
              repeat: -1,
              modifiers: {
                x: gsap.utils.unitize((x: number | string) => {
                  const num = typeof x === 'string' ? parseFloat(x) : x;
                  return num % totalWidth;
                }),
              },
            });

            animRef.current = tween;

            const container = track.parentElement;
            if (container) {
              const handleEnter = () => tween.pause();
              const handleLeave = () => tween.resume();
              container.addEventListener('mouseenter', handleEnter);
              container.addEventListener('mouseleave', handleLeave);
              return () => {
                container.removeEventListener('mouseenter', handleEnter);
                container.removeEventListener('mouseleave', handleLeave);
              };
            }
          }
        });

        // ── 3. Partikel daun — float animasi
        if (particlesRef.current) {
          const leaves = particlesRef.current.querySelectorAll<HTMLElement>('.leaf-particle');
          leaves.forEach((leaf) => {
            const dur = 3.5 + Math.random() * 3.5;
            const yAmp = 12 + Math.random() * 14;
            const rotAmp = 8 + Math.random() * 14;
            const delay = Math.random() * 2;

            gsap.to(leaf, {
              y: -yAmp,
              rotation: `+=${rotAmp}`,
              duration: dur,
              delay,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });

            gsap.to(leaf, {
              opacity: parseFloat(leaf.style.opacity || '0.5') * 0.7,
              duration: dur * 0.8,
              delay: delay + 0.3,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          });
        }
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="testimoni"
      ref={sectionRef}
      className="page-section pt-10 sm:pt-16 lg:pt-24 pb-10 sm:pb-16 lg:pb-24 relative w-full overflow-hidden"
      style={{ background: 'rgba(235, 230, 218, 0.45)' }}
    >
      {/* ── PARTIKEL DAUN MELAYANG ── */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
        {/* Daun besar kiri atas */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-16 sm:w-28 object-contain"
          style={{ top: '4%', left: '2%', opacity: 0.18, rotate: '-30deg' }}
        />
        {/* Daun sedang kanan atas */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-12 sm:w-20 object-contain hidden sm:block"
          style={{ top: '6%', right: '4%', opacity: 0.15, rotate: '20deg' }}
        />
        {/* Daun kecil kiri tengah */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-8 sm:w-12 object-contain hidden md:block"
          style={{ top: '40%', left: '1%', opacity: 0.12, rotate: '60deg' }}
        />
        {/* Daun kanan tengah bawah */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-14 sm:w-24 object-contain"
          style={{ bottom: '8%', right: '2%', opacity: 0.18, rotate: '-15deg' }}
        />
        {/* Daun kecil kanan atas tengah */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-10 object-contain hidden md:block"
          style={{ top: '18%', right: '14%', opacity: 0.1, rotate: '45deg' }}
        />
        {/* Daun kecil kiri bawah */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-10 sm:w-16 object-contain hidden sm:block"
          style={{ bottom: '12%', left: '6%', opacity: 0.14, rotate: '-55deg' }}
        />
        {/* Daun tengah atas */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-8 object-contain hidden lg:block"
          style={{ top: '10%', left: '45%', opacity: 0.09, rotate: '10deg' }}
        />
        {/* Daun tengah kanan */}
        <img src="/assets/individual/03_icon_daun_teh.webp" alt=""
          className="leaf-particle absolute w-10 sm:w-14 object-contain hidden md:block"
          style={{ top: '55%', right: '8%', opacity: 0.13, rotate: '80deg' }}
        />

        {/* Titik dekoratif */}
        <span className="absolute w-2 h-2 rounded-full bg-[#1F331A]/10 hidden sm:block" style={{ top: '20%', left: '18%' }} />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#5C6B57]/15 hidden sm:block" style={{ top: '70%', right: '20%' }} />
        <span className="absolute w-2.5 h-2.5 rounded-full bg-[#D4A843]/10" style={{ bottom: '20%', left: '30%' }} />
        <span className="absolute w-1 h-1 rounded-full bg-[#1F331A]/20 hidden sm:block" style={{ top: '35%', right: '35%' }} />
      </div>

      {/* Subtle top/bottom edge fade */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-[#EBE6DA]/80 to-transparent z-10 pointer-events-none" />

      <div className="container relative z-10">
        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-14 px-2">
          <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-3 select-none">
            <img
              src="/assets/individual/03_icon_daun_teh.webp"
              alt=""
              aria-hidden="true"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain -rotate-6"
            />
            <span className="font-nav text-[0.68rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#1F331A]">
              Testimoni
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[3rem] text-[#1F331A] font-normal leading-[1.15] tracking-tight mb-2 sm:mb-3">
            Apa Kata Mereka?
          </h2>

          <p className="font-sans text-xs sm:text-base text-[#5C6B57] leading-relaxed max-w-xl mx-auto">
            Cerita nyata dari pelanggan yang telah merasakan kesegaran Teh.in dalam setiap tegukan.
          </p>
        </div>
      </div>

      {/* ── MOBILE TRACK (Native smooth touch swipe, 1 set of items) ── */}
      <div className="md:hidden w-full relative z-10">
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-3 px-4 py-2 no-scrollbar">
          {testimonials.map((testi) => (
            <div
              key={`mobile-${testi.id}`}
              className="flex-shrink-0 w-[82vw] max-w-[290px] snap-center bg-white/85 backdrop-blur-sm border border-[#1F331A]/10 rounded-2xl p-4 shadow-[0_6px_20px_rgba(31,51,26,0.06)] flex flex-col justify-between gap-3 select-none"
            >
              {/* Quote */}
              <div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: testi.stars }).map((_, i) => (
                    <span key={i} className="text-[#D4A843] text-sm leading-none">★</span>
                  ))}
                </div>
                <p className="font-sans text-[0.8rem] text-[#3A4A36] leading-relaxed line-clamp-4">
                  {testi.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#1F331A]/8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm"
                  style={{ backgroundColor: avatarColors[testi.avatar] ?? '#2D4A27' }}
                >
                  {testi.avatar}
                </div>
                <div>
                  <div className="font-serif text-[0.84rem] font-semibold text-[#1F331A] leading-tight">
                    {testi.name}
                  </div>
                  <div className="font-sans text-[0.68rem] text-[#5C6B57] leading-tight mt-0.5">
                    {testi.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe indicator */}
        <div className="flex items-center justify-center gap-2 mt-2.5 select-none">
          <span className="text-[0.68rem] font-medium text-[#5C6B57] bg-white/60 px-3 py-0.5 rounded-full border border-[#1F331A]/8">
            ← Geser untuk ulasan lainnya →
          </span>
        </div>
      </div>

      {/* ── DESKTOP MARQUEE TRACK (full width, GSAP continuous loop) ── */}
      <div className="hidden md:block w-full overflow-hidden relative z-10">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#EBE6DA]/80 to-transparent z-20 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#EBE6DA]/80 to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 py-4 w-max"
          style={{ willChange: 'transform' }}
        >
          {doubled.map((testi, idx) => (
            <div
              key={`${testi.id}-${idx}`}
              className="testi-card-marquee flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[360px] bg-white/80 backdrop-blur-sm border border-[#1F331A]/10 rounded-[1.6rem] p-5 sm:p-6 shadow-[0_8px_28px_rgba(31,51,26,0.08)] flex flex-col justify-between gap-4 hover:shadow-[0_16px_40px_rgba(31,51,26,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-default select-none"
            >
              {/* Quote */}
              <div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testi.stars }).map((_, i) => (
                    <span key={i} className="text-[#D4A843] text-base leading-none">★</span>
                  ))}
                </div>
                <p className="font-sans text-[0.82rem] sm:text-[0.88rem] text-[#3A4A36] leading-relaxed">
                  {testi.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#1F331A]/8">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0 shadow-sm"
                  style={{ backgroundColor: avatarColors[testi.avatar] ?? '#2D4A27' }}
                >
                  {testi.avatar}
                </div>
                <div>
                  <div className="font-serif text-[0.9rem] font-semibold text-[#1F331A] leading-tight">
                    {testi.name}
                  </div>
                  <div className="font-sans text-[0.72rem] text-[#5C6B57] leading-tight mt-0.5">
                    {testi.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
