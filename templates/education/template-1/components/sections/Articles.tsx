'use client';

import React, { useEffect, useRef } from 'react';
import { BookOpen, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Articles() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.article-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const articles = [
    {
      title: '5 Cara Menyenangkan Menumbuhkan Minat Baca Anak Sejak Dini',
      excerpt:
        'Membaca bukan sekadar mengeja kata. Temukan metode dongeng multisensori yang membuat anak penasaran membuka buku sendiri tanpa disuruh.',
      category: 'Tips Parenting',
      date: '28 Februari 2026',
      readTime: '4 Menit Baca',
      tagColor: 'bg-brand-orange text-white',
    },
    {
      title: 'Kesiapan Masuk SD: Aspek Kognitif & Emosional yang Perlu Diperhatikan',
      excerpt:
        'Bukan hanya calistung, kesiapan mental seperti fokus, kemandirian memakai sepatu, dan kemampuan mengantri jauh lebih krusial untuk anak.',
      category: 'Kesiapan Sekolah',
      date: '15 Februari 2026',
      readTime: '6 Menit Baca',
      tagColor: 'bg-brand-blue text-white',
    },
    {
      title: 'Mengapa Belajar Matematika Sebaiknya Dimulai dari Benda Konkret?',
      excerpt:
        'Mengenal metode CPA (Concrete-Pictorial-Abstract) yang membantu otak anak memahami logika angka sebelum mengenal simbol rumus.',
      category: 'Metode Edukasi',
      date: '02 Februari 2026',
      readTime: '5 Menit Baca',
      tagColor: 'bg-emerald-600 text-white',
    },
  ];

  return (
    <section id="artikel" ref={sectionRef} className="py-20 md:py-28 bg-brand-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky text-brand-blue text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            BLOG &amp; TIPS PARENTING
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            Inspirasi &amp; Edukasi untuk <span className="text-brand-orange">Tumbuh Kembang Anak</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-medium">
            Kumpulan artikel dan panduan praktis dari para psikolog anak serta praktisi pendidikan SmartBelajar.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.title}
              className="article-card p-7 md:p-8 rounded-4xl bg-white border border-slate-200/80 shadow-soft hover:shadow-float hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-black px-3 py-1 rounded-full ${art.tagColor}`}>
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-brand-navy group-hover:text-brand-orange transition-colors duration-200 mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed font-medium mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-brand-orange">
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Artikel Lengkap
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </span>
                <span className="text-slate-400 font-semibold">{art.readTime}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
