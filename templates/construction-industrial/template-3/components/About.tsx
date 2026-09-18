'use client';
import { Layers, Cpu, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function About() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const counters = gsap.utils.toArray('.counter-number');
    counters.forEach((counter: any) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const start = parseFloat(counter.getAttribute('data-start') || '0');
      
      const obj = { val: start };
      
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          counter.innerText = Math.ceil(obj.val);
        }
      });
    });
  }, []);

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-brand-bgPaper dark:bg-brand-black border-t border-brand-border dark:border-white/10 relative light-grid-bg-overlay" id="tentang">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-gold rounded-full"></span>
              <span className="font-mono text-xs text-brand-gold tracking-widest uppercase font-semibold">TENTANG PT AFINDO CONSTRUCTION</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-black dark:text-white leading-[1.15]">
              Presisi geoteknik di kedalaman bumi yang paling menantang.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
              Didirikan oleh konsorsium insinyur geoteknik senior, PT Afindo Construction memadukan perhitungan matematis tanah canggih dengan armada hidraulik generasi terbaru. Kami meniadakan kegagalan sub-struktur sebelum lantai dasar mulai dibangun.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 p-6 rounded-[16px] hover:border-brand-gold/70 dark:hover:border-brand-gold/70 transition-all duration-300 card-shadow">
            <div className="w-10 h-10 rounded-full bg-brand-sandLight/40 dark:bg-brand-gold/10 border border-brand-sandDark/40 dark:border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold tracking-wider">PILAR 01</span>
            <h3 className="text-lg font-bold text-brand-black dark:text-white mt-1">Geoteknik Terpadu</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">Analisis stratigrafi tanah menggunakan pemodelan 3D Finite Element Method untuk beban dinamis dan statis.</p>
          </div>
          <div className="bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 p-6 rounded-[16px] hover:border-brand-gold/70 dark:hover:border-brand-gold/70 transition-all duration-300 card-shadow">
            <div className="w-10 h-10 rounded-full bg-brand-sandLight/40 dark:bg-brand-gold/10 border border-brand-sandDark/40 dark:border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold tracking-wider">PILAR 02</span>
            <h3 className="text-lg font-bold text-brand-black dark:text-white mt-1">Armada Mutakhir</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">Didukung rig pengeboran Bauer & Casagrande berkapasitas torsi tinggi dengan sensor kedalaman real-time.</p>
          </div>
          <div className="bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 p-6 rounded-[16px] hover:border-brand-gold/70 dark:hover:border-brand-gold/70 transition-all duration-300 card-shadow">
            <div className="w-10 h-10 rounded-full bg-brand-sandLight/40 dark:bg-brand-gold/10 border border-brand-sandDark/40 dark:border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold tracking-wider">PILAR 03</span>
            <h3 className="text-lg font-bold text-brand-black dark:text-white mt-1">Zero Incident K3</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">Protokol keselamatan berlapis dengan sertifikasi SMK3 dan ISO 45001 dalam lingkungan perkotaan padat.</p>
          </div>
          <div className="bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 p-6 rounded-[16px] hover:border-brand-gold/70 dark:hover:border-brand-gold/70 transition-all duration-300 card-shadow">
            <div className="w-10 h-10 rounded-full bg-brand-sandLight/40 dark:bg-brand-gold/10 border border-brand-sandDark/40 dark:border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold tracking-wider">PILAR 04</span>
            <h3 className="text-lg font-bold text-brand-black dark:text-white mt-1">Kepastian Jadwal</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">Sistem logistik beton dan fabrikasi rebar terpadu 24/7 demi garansi ketepatan durasi proyek 100%.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-carbon border border-brand-border dark:border-white/10 rounded-[18px] p-8 lg:p-12 card-shadow">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-white/10">
            <div className="sm:px-6 first:pl-0">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-brand-black dark:text-white tracking-tight"><span className="counter-number" data-target="150" data-start="0">0</span>+</div>
              <div className="text-sm font-semibold text-brand-gold mt-2 uppercase tracking-wide font-mono">Proyek Selesai</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Mega gedung komersial, jembatan, bendungan, dan pabrik.</p>
            </div>
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-brand-black dark:text-white tracking-tight"><span className="counter-number" data-target="48" data-start="0">0</span>m+</div>
              <div className="text-sm font-semibold text-brand-gold mt-2 uppercase tracking-wide font-mono">Kedalaman Maksimal</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Penetrasi lapisan batuan keras dan tanah alluvial basah.</p>
            </div>
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-brand-red tracking-tight"><span className="counter-number" data-target="0" data-start="100">100</span>%</div>
              <div className="text-sm font-semibold text-brand-gold mt-2 uppercase tracking-wide font-mono">Insiden Keselamatan</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Rekam jejak 2,400,000+ jam kerja tanpa kecelakaan fatal.</p>
            </div>
            <div className="pt-6 sm:pt-0 sm:px-6">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-brand-black dark:text-white tracking-tight"><span className="counter-number" data-target="100" data-start="0">0</span>%</div>
              <div className="text-sm font-semibold text-brand-gold mt-2 uppercase tracking-wide font-mono">Tepat Waktu</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Eksekusi sesuai jadwal tanpa denda keterlambatan kontrak.</p>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-brand-gold" />
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">SERTIFIKASI RESMI TERAKREDITASI:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <span className="px-3 py-1 bg-brand-surfaceMuted dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-full font-medium">ISO 9001:2015 Quality</span>
              <span className="px-3 py-1 bg-brand-surfaceMuted dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-full font-medium">ISO 14001:2015 Environment</span>
              <span className="px-3 py-1 bg-brand-surfaceMuted dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-full font-medium">ISO 45001:2018 Safety</span>
              <span className="px-3 py-1 bg-brand-surfaceMuted dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-full font-medium">SMK3 Kemnaker RI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
