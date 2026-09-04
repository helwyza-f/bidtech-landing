'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useModal } from '@/lib/ModalContext';
import { Play, GraduationCap, Star, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function Hero() {
  const { openRegister } = useModal();
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── ENTRANCE ANIMATIONS ─────────────────────────────────────────────

      // 1. SplitText / Word Stagger untuk Headline H1
      gsap.fromTo(
        '.hero-word',
        { y: 35, opacity: 0, rotation: 3, transformOrigin: 'left bottom' },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          clearProps: 'all',
        }
      );

      // 2. Teks Pendukung (Deskripsi, Tombol CTA, Spiral Doodle)
      gsap.fromTo(
        '.hero-sub-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.35,
          clearProps: 'all',
        }
      );

      // 2. Image Wrap Scale Entrance
      gsap.fromTo(
        '.hero-image-wrap',
        { scale: 0.94, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.2)',
          delay: 0.15,
          clearProps: 'transform,opacity',
        }
      );

      // 2b. Character Pop-Up & Elastic Landing (Opsi 1)
      gsap.fromTo(
        '.hero-character-inner',
        { y: 75, scale: 0.88, opacity: 0, transformOrigin: '50% 100%' },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'back.out(1.65)',
          delay: 0.2,
          onComplete: () => {
            // Idle floating / breathing halus setelah mendarat
            gsap.to('.hero-character-inner', {
              y: -7,
              duration: 3.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        }
      );

      // 3. Floating Badge Bounce Masuk (sinkron setelah karakter mendarat)
      gsap.fromTo(
        '.floating-badge',
        { y: 25, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: 'back.out(1.5)',
          delay: 0.65,
          clearProps: 'transform,opacity',
        }
      );

      // 4. Star Particle Burst (joyful explosion)
      gsap.fromTo(
        '.hero-star-particle',
        { scale: 0, opacity: 0, rotation: -30 },
        {
          scale: 1,
          opacity: 1,
          rotation: 'random(-20, 20)',
          duration: 0.5,
          ease: 'back.out(2.2)',
          stagger: { each: 0.08, from: 'random' },
          delay: 0.7,
          clearProps: 'transform',
        }
      );

      // 5. Yellow Doodle Loop SVG Draw-in
      const doodlePath = document.querySelector<SVGPathElement>('#hero-doodle-loop path');
      if (doodlePath) {
        const doodleLen = doodlePath.getTotalLength();
        gsap.fromTo(
          doodlePath,
          { strokeDasharray: doodleLen, strokeDashoffset: doodleLen },
          { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut', delay: 0.6 }
        );
      }

      // 6. Squiggly Underline Draw-in (di bawah kata "terbaik")
      const underlinePath = document.querySelector<SVGPathElement>('#hero-underline path');
      if (underlinePath) {
        const underlineLen = underlinePath.getTotalLength();
        gsap.set(underlinePath, { strokeDasharray: underlineLen, strokeDashoffset: underlineLen });
        gsap.to(underlinePath, {
          strokeDashoffset: 0,
          duration: 0.75,
          ease: 'power2.out',
          delay: 0.9,
        });
      }

      // ─── IDLE / LOOP ANIMATIONS ──────────────────────────────────────────

      // 7. Paper Plane Flight Entrance along Loop-de-loop Path + Flight Trail (Mode B)
      const flightMaskPath = document.querySelector<SVGPathElement>('#flight-mask-path');
      if (flightMaskPath) {
        const trailLen = flightMaskPath.getTotalLength();
        gsap.set(flightMaskPath, { strokeDasharray: trailLen, strokeDashoffset: trailLen });
        gsap.set('#hero-paper-plane-carrier', { opacity: 0, scale: 0 });

        const flightTl = gsap.timeline({
          delay: 0.5,
          onComplete: () => {
            // Mode B: Setelah mendarat di ujung kurva, mulai animasi melayang santai (idle float) permanen
            gsap.to('#hero-paper-plane-bobber', {
              y: -5,
              x: 3,
              rotation: -4,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        });

        // Pesawat muncul dan scale up di awal lintasan
        flightTl.to(
          '#hero-paper-plane-carrier',
          { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' },
          0
        );

        // Pesawat terbang mengikuti alur garis lengkung (loop-de-loop)
        flightTl.to(
          '#hero-paper-plane-carrier',
          {
            motionPath: {
              path: '#flight-trail-path',
              align: '#flight-trail-path',
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
            },
            duration: 3.2,
            ease: 'power1.inOut',
          },
          0
        );

        // Garis putus-putus terbuka sinkron tepat di belakang ekor pesawat
        flightTl.to(
          flightMaskPath,
          {
            strokeDashoffset: 0,
            duration: 3.2,
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 8. Spiral Doodle Breathing
      gsap.to('#spiral-doodle', {
        rotation: 5,
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 9. Floating Badge Idle Float
      gsap.to('.floating-badge', {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });

      // 10. CTA Button Shimmer Glow Pulse
      if (magneticBtnRef.current) {
        gsap.to(magneticBtnRef.current, {
          boxShadow: '0 0 28px 10px rgba(249, 115, 22, 0.5)',
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      }

      // 12. Scroll Parallax — Subtle Depth pada Visual Foto & Blob (Teks tetap natural tanpa fade/drift)
      gsap.to('.hero-img-scroll', {
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
      gsap.to('.blob-hero-blue', {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
        },
      });
    }, heroRef);

    // 13. Mouse Parallax 3D — Desktop Only
    const handleParallax = (e: MouseEvent) => {
      if (!heroRef.current || window.innerWidth < 768) return;
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      gsap.to('.hero-img-scroll', { x: dx * 10, y: dy * 6, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.blob-hero-blue', { x: dx * -16, y: dy * -10, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.blob-hero-orange', { x: dx * 13, y: dy * 8, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
      gsap.to('.floating-badge', { x: dx * -6, y: dy * -4, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
    };

    const heroEl = heroRef.current;
    heroEl?.addEventListener('mousemove', handleParallax);

    return () => {
      ctx.revert();
      heroEl?.removeEventListener('mousemove', handleParallax);
    };
  }, []);

  // Magnetic Button Logic for Primary CTA
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.28,
      y: y * 0.28,
      scale: 1.04,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-28 pb-20 md:pt-36 md:pb-28 bg-white overflow-hidden"
    >
      {/* 1. Watermark Dotted Grid Kiri Atas */}
      <div
        className="absolute top-20 left-4 w-52 h-52 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#0284C7 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* 2. Blob Kuning Lembut Kiri Bawah */}
      <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-brand-yellow/15 rounded-full blob-why-orange blur-xl pointer-events-none -z-0" />

      {/* 3. Jejak Pesawat Kertas Melengkung & Bintang Pastel */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Bintang Pastel Kiri Atas */}
        <div className="absolute top-28 left-8 lg:left-24 text-slate-300 animate-pulse text-xl">
          ★
        </div>

        {/* Jejak Pesawat Kertas & Pesawat Kertas Terbang (Mode B: Entrance Flight + Idle Float) */}
        <div className="absolute top-20 left-[42%] hidden lg:block opacity-85 pointer-events-none z-10">
          <svg width="240" height="110" viewBox="0 0 240 110" fill="none" className="overflow-visible">
            <defs>
              <mask id="flight-trail-mask">
                <path
                  id="flight-mask-path"
                  d="M10,80 C60,80 90,15 150,20 C180,22 195,45 180,65 C165,75 140,55 160,35 C180,15 205,25 218,28"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
              </mask>
            </defs>

            {/* Garis putus-putus jejak terbang yang dibuka secara sinkron oleh mask */}
            <path
              id="flight-trail-path"
              d="M10,80 C60,80 90,15 150,20 C180,22 195,45 180,65 C165,75 140,55 160,35 C180,15 205,25 218,28"
              stroke="#94A3B8"
              strokeWidth="1.8"
              strokeDasharray="5 5"
              strokeLinecap="round"
              fill="none"
              mask="url(#flight-trail-mask)"
            />

            {/* Pesawat Kertas: carrier bergerak di alur path, bobber mengayun santai */}
            <g id="hero-paper-plane-carrier">
              <g id="hero-paper-plane-bobber">
                <g transform="rotate(47)">
                  <svg x="-12" y="-12" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634L21.044 2.32c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-6.054-2.685z"
                      fill="#0284C7"
                    />
                  </svg>
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Bintang Kuning Kanan Atas */}
        <div className="absolute top-36 right-10 text-brand-yellow/90 text-2xl">
          ★
        </div>
      </div>

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Kolom Teks Hero (Kiri - 6 cols) */}
          <div className="hero-left-col lg:col-span-6 space-y-6 text-center lg:text-left z-10">

            {/* Headline H1 dengan SplitText / Word Stagger */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] 2xl:text-[66px] font-black text-brand-navy leading-[1.12] tracking-tight">
              <span className="hero-word inline-block">Temukan</span>{' '}
              <span className="hero-word inline-block">potensi</span><br />
              {/* Wrapper relative untuk squiggly underline */}
              <span className="hero-word relative inline-block">
                <span className="text-brand-blue">terbaik</span>
                {/* Squiggly Underline SVG Draw-in */}
                <svg
                  id="hero-underline"
                  className="absolute -bottom-2 left-0 w-full overflow-visible"
                  viewBox="0 0 130 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2,8 C18,2 34,13 50,7 C66,1 82,13 98,7 C110,3 120,9 128,6"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{' '}
              <span className="hero-word inline-block">anak</span>{' '}
              <span className="hero-word inline-block">Anda</span>
            </h1>

            {/* Deskripsi */}
            <p className="hero-sub-anim text-sm sm:text-base xl:text-lg text-brand-muted leading-relaxed font-normal max-w-lg xl:max-w-xl mx-auto lg:mx-0">
              SmartBelajar membantu anak mengembangkan kemampuan belajar mandiri dalam Matematika dan Membaca sejak usia dini, untuk bekal masa depan yang lebih baik.
            </p>

            {/* Tombol Aksi Hero dengan Efek Magnetik */}
            <div className="hero-sub-anim flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                ref={magneticBtnRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => openRegister()}
                className="inline-flex items-center gap-2 px-7 py-3.5 xl:px-8 xl:py-4 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm sm:text-base xl:text-lg font-extrabold rounded-full shadow-orange-glow transition-colors duration-200"
              >
                <span>Daftar Sekarang</span>
                <span>→</span>
              </button>

              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3.5 xl:px-5 xl:py-4 text-brand-blue hover:text-sky-700 text-sm sm:text-base xl:text-lg font-bold transition-all hover:bg-sky-50 rounded-full group"
              >
                <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-white ml-0.5" />
                </div>
                <span>Lihat Video</span>
              </button>
            </div>

            {/* Spiral Doodle Kuning di Bawah Tombol */}
            <div className="hero-sub-anim pt-2 flex justify-center lg:justify-start">
              <svg
                id="spiral-doodle"
                className="w-16 h-8 text-brand-yellow/80 transform origin-center"
                viewBox="0 0 100 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <path d="M10,25 C30,40 50,5 70,25 C80,35 95,20 98,15" />
              </svg>
            </div>
          </div>

          {/* Kolom Visual Anak & Blobs (Kanan - 6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
            <div className="hero-image-wrap relative w-full max-w-md sm:max-w-lg xl:max-w-xl 2xl:max-w-2xl flex justify-center">

              {/* Organic Blobs di Belakang Foto — morphing organik via native CSS */}
              <div className="absolute -top-6 left-4 sm:left-6 w-72 h-80 sm:w-80 sm:h-96 xl:w-[380px] xl:h-[450px] 2xl:w-[430px] 2xl:h-[500px] bg-[#7DD3FC]/80 blob-hero-blue -z-10" />
              <div className="absolute top-24 sm:top-32 -right-4 sm:-right-8 w-60 h-60 sm:w-72 sm:h-72 xl:w-[320px] xl:h-[320px] 2xl:w-[360px] 2xl:h-[360px] bg-brand-orange blob-hero-orange -z-10 opacity-95" />

              {/* Star Particles — aksen dekoratif minimalis di sekitar foto */}
              <span className="hero-star-particle absolute top-4 left-10 text-brand-yellow text-base pointer-events-none z-20 select-none">✦</span>
              <span className="hero-star-particle absolute top-12 right-6 text-sky-400 text-sm pointer-events-none z-20 select-none">★</span>
              <span className="hero-star-particle absolute bottom-36 right-4 text-brand-yellow/90 text-sm pointer-events-none z-20 select-none">✦</span>

              {/* Yellow Doodle Loop — SVG Draw-in Animasi */}
              <div className="absolute -top-4 right-1/4 pointer-events-none opacity-80 text-brand-yellow">
                <svg id="hero-doodle-loop" className="w-16 h-16 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                  <path d="M20,50 Q40,10 70,30 T60,80" />
                </svg>
              </div>

              {/* Foto Anak — wrapper hero-img-scroll untuk parallax, hero-character-inner untuk entrance pop-up & idle floating */}
              <div className="hero-img-scroll relative z-10 flex justify-center items-end">
                <div className="hero-character-inner relative flex justify-center items-end">
                  <Image
                    src="/images/hero.webp"
                    alt="Anak laki-laki ceria belajar dengan buku di SmartBelajar"
                    width={600}
                    height={540}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                    className="w-[340px] sm:w-[430px] xl:w-[500px] 2xl:w-[560px] h-auto object-contain drop-shadow-sm select-none"
                  />
                </div>
              </div>

              {/* Floating Academic Trust Card */}
              <div className="floating-badge absolute bottom-4 left-0 sm:-left-4 md:-left-8 xl:-left-10 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 xl:p-5 rounded-2xl shadow-float border border-slate-100/90 max-w-[240px] sm:max-w-[265px] xl:max-w-[290px]">
                {/* Yellow star mini badge at top right */}
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-brand-yellow rounded-full flex items-center justify-center text-white shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 text-brand-blue flex items-center justify-start">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <p className="text-[13px] xl:text-[14px] font-bold text-brand-navy leading-snug">
                    Prestasi akademis anak Anda dimulai di sini bersama <span className="font-extrabold text-brand-navy">SmartBelajar</span>.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Popup */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              aria-label="Tutup Video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src=""
                title="SmartBelajar Fun Learning Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
