'use client';
import { useState } from 'react';
import { ArrowRight, Crosshair, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const heroShowcases = [
  {
    step: "01 ——— 02 ——— 03",
    title: "Menara Finansial Sudirman (64 Lantai)",
    desc: "Pondasi bored pile Ø1500mm hingga kedalaman 48 meter dengan kombinasi diaphragm wall 800mm."
  },
  {
    step: "02 ——— 01 ——— 03",
    title: "Jembatan Maritim Selat Madura Extension",
    desc: "Tiang bor offshore Ø2000mm dengan permanent steel casing pada zona pasang surut salinitas tinggi."
  },
  {
    step: "03 ——— 01 ——— 02",
    title: "Kilang Petrokimia Cilegon Heavy Smelter",
    desc: "Soil improvement 850 titik jet grouting 400 Bar menjamin zero settlement pada turbin 250MW."
  }
];

export default function Hero() {
  const [currentHeroStep, setCurrentHeroStep] = useState(0);

  const updateHeroCard = (index: number) => {
    setCurrentHeroStep((index + heroShowcases.length) % heroShowcases.length);
  };

  useGSAP(() => {
    gsap.from(".hero-content > *", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out"
    });

    gsap.from(".hero-showcase", {
      scale: 0.96,
      opacity: 0,
      duration: 1.1,
      delay: 0.2,
      ease: "power3.out"
    });
  }, []);

  const data = heroShowcases[currentHeroStep];

  return (
    <section className="relative hero-gradient text-brand-black dark:text-white min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20 grid-bg-overlay flex items-center overflow-hidden border-b border-brand-border dark:border-white/10" id="beranda">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,450 C300,320 600,600 1000,420 C1300,280 1500,480 1600,450" fill="none" stroke="#000" strokeDasharray="6 6" strokeWidth="1.2"></path>
          <path d="M-100,550 C250,420 750,700 1100,520 C1350,380 1550,550 1600,520" fill="none" stroke="#000" strokeDasharray="6 6" strokeWidth="1.2"></path>
          <path d="M-100,650 C200,520 850,800 1200,620 C1400,480 1600,600 1650,580" fill="none" stroke="#000" strokeDasharray="4 4" strokeWidth="1.2"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        <div className="lg:col-span-7 space-y-8 hero-content">
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tighter leading-[1.08] text-brand-black dark:text-white">
            Pondasi kokoh, tanpa kekacauan operasional.
          </h1>
          <p className="text-lg lg:text-xl font-normal text-neutral-700 dark:text-neutral-300 max-w-xl leading-relaxed">
            Setiap proyek megah berdiri di atas fondasi yang presisi, pemancangan andal, dan eksekusi teknik tanpa kompromi.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a className="inline-flex items-center gap-2 bg-brand-black dark:bg-white text-white dark:text-brand-black px-7 py-3.5 rounded-full font-medium text-sm tracking-wide shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition" href="#kontak">
              <span>Jadwalkan Konsultasi</span>
              <span>📞</span>
            </a>
            <a className="inline-flex items-center gap-2 bg-white/70 dark:bg-brand-carbon/70 border border-brand-black dark:border-white text-brand-black dark:text-white px-7 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white dark:hover:bg-brand-carbon transition" href="#proyek">
              <span>Lihat Portofolio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-6 border-t border-black/15 dark:border-white/15 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-brand-black dark:text-white">48m+</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">Bore Pile Depth</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-brand-black dark:text-white">400 Bar</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">Jet Grout Capacity</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold tracking-tight text-brand-black dark:text-white">ISO 9001</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">K3 Safety Certified</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative hero-showcase">
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative h-[480px] sm:h-[540px] rounded-[20px] bg-neutral-900 overflow-hidden border border-black/10 dark:border-white/10 card-shadow group">
              <img alt="Pondasi rotary drilling rig machine Bauer on construction foundation site" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPIAkDoEGcFKi--1OgAPVOtSnW-o0X3JStdoAg6IZ996o9hyUgdCupBmYwQ4ikbeFxOCkEiMA57wbil57_ILj2334tvj61pc60yPGqQsn2IwLYKlQbA5JYl8Pwh7GhLUDPdT-GJ69CNYmb_7wmiHwOGu2mwNAhNmX68r1i9T5FKxdoYr64nw26i9AixnUn8dV-IFxU0Ap0XuJo1b18RupTCcnQOrCt2hVULkBDzrix5a0jwUyeSEGC" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15"></div>
              <div className="absolute top-5 left-5 bg-white/90 dark:bg-brand-carbon/90 backdrop-blur-md border border-white/40 dark:border-white/10 text-brand-black dark:text-white font-mono text-[11px] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm font-semibold">
                <Crosshair className="w-3.5 h-3.5 text-brand-gold" />
                <span>GEOTECH RIG: BAUER BG-36V</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-brand-carbon/95 backdrop-blur-xl border border-black/10 dark:border-white/10 p-5 rounded-2xl text-brand-black dark:text-white card-shadow">
                <div className="flex items-center justify-between text-xs font-mono text-brand-gold font-bold pb-2 border-b border-neutral-200 dark:border-white/10">
                  <span className="tracking-wide">PROYEK UNGGULAN TERKINI</span>
                  <span className="tracking-widest text-neutral-500">{data.step}</span>
                </div>
                <div className="mt-3">
                  <h4 className="font-bold text-base tracking-tight text-brand-black dark:text-white">{data.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">{data.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-white/10">
                  <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 font-medium">STATUS: SELESAI (ZERO INCIDENT)</span>
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 flex items-center justify-center text-brand-black dark:text-white transition border border-neutral-200 dark:border-white/10" onClick={() => updateHeroCard(currentHeroStep - 1)}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 flex items-center justify-center text-brand-black dark:text-white transition border border-neutral-200 dark:border-white/10" onClick={() => updateHeroCard(currentHeroStep + 1)}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
