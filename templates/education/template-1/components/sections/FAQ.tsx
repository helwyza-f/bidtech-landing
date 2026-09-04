'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '@/lib/ModalContext';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQ() {
  const { openRegister } = useModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
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

  const faqs = [
    {
      q: 'Berapa usia minimal anak untuk mulai belajar di SmartBelajar?',
      a: 'Usia minimal untuk program Calistung Ceria adalah 4 tahun (usia PAUD/TK A). Kami juga menyediakan program bertingkat hingga usia 12 tahun untuk Logika Matematika, English for Kids, dan Sains Eksperimen.',
    },
    {
      q: 'Bagaimana cara mendaftar dan mengikuti 1x Free Trial Class?',
      a: 'Sangat mudah! Anda cukup mengklik tombol "Daftar Sekarang" atau "Klaim Free Trial", isi nama dan usia anak, lalu pilih cabang terdekat. Tim Educational Consultant kami akan segera menghubungi Anda untuk menentukan jadwal kelas uji coba gratis.',
    },
    {
      q: 'Berapa jumlah maksimal murid dalam satu sesi kelas?',
      a: 'Demi memastikan perhatian optimal untuk setiap anak, kami membatasi maksimal 5-6 anak per kelas untuk program reguler. Guru dapat memantau ritme pemahaman setiap anak secara intensif.',
    },
    {
      q: 'Apakah orang tua diperbolehkan mendampingi anak selama kelas?',
      a: 'Pada 1-2 pertemuan pertama saat masa adaptasi, orang tua diperbolehkan mendampingi di dalam kelas. Setelah anak merasa nyaman dan percaya diri dengan guru serta teman-temannya, orang tua dapat menunggu di lounge tunggu yang nyaman sambil memantau laporan.',
    },
    {
      q: 'Bagaimana jika anak berhalangan hadir karena sakit atau bepergian?',
      a: 'Kami menyediakan fasilitas Reschedule / Make-up Class gratis. Cukup informasikan kepada admin cabang minimal 2 jam sebelum kelas dimulai untuk menjadwalkan sesi pengganti.',
    },
    {
      q: 'Apakah tersedia pilihan les privat 1-on-1 ke rumah atau kelas online?',
      a: 'Ya, kami melayani program Private Home Tutoring (guru datang ke rumah) untuk wilayah Jabodetabek, Bandung, dan Surabaya, serta Kelas Interaktif Online bagi murid di seluruh kota Indonesia.',
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-light text-brand-orange text-xs font-black">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            Pertanyaan yang <span className="text-brand-orange">Sering Diajukan</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-medium">
            Temukan jawaban lengkap seputar metode belajar, jadwal, dan pendaftaran kelas SmartBelajar.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`faq-item rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-brand-cream/40 border-amber-300/80 shadow-soft'
                    : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-black text-brand-navy leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-brand-orange text-white rotate-180'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-brand-muted leading-relaxed font-medium animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-brand-sky/60 border border-brand-blue/20 text-center space-y-3">
          <h4 className="text-lg font-black text-brand-navy">Masih memiliki pertanyaan lain?</h4>
          <p className="text-sm text-brand-muted max-w-md mx-auto">
            Tim konsultan pendidikan kami siap membantu menjawab pertanyaan dan memberikan rekomendasi program terbaik.
          </p>
          <button
            onClick={() => openRegister()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-black rounded-full shadow-sm transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            Konsultasi dengan Kami
          </button>
        </div>

      </div>
    </section>
  );
}
