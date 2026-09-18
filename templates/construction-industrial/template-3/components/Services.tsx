import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface ServicesProps {
  onOpenModal: (key: string) => void;
}

export default function Services({ onOpenModal }: ServicesProps) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('#layanan .grid > div', 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#layanan .grid',
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-brand-surfaceMuted dark:bg-brand-black border-t border-brand-border dark:border-white/10 relative" id="layanan">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-gold rounded-full"></span>
              <span className="font-mono text-xs text-brand-gold tracking-widest uppercase font-semibold">SPESIALISASI SUB-STRUKTUR</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-black dark:text-white leading-tight mt-3">
              Solusi Geoteknik & Rekayasa Tanah Dalam
            </h2>
            <p className="text-neutral-800 dark:text-neutral-300 text-sm md:text-base leading-relaxed mt-4 font-normal">
              Penguasaan metodologi mutakhir deep foundation, pengendalian air tanah bertekanan tinggi, dan stabilitas galian dalam pada kondisi stratigrafi tanah ekstrem di seluruh Indonesia.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-800 dark:text-neutral-300 bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 px-4 py-2 rounded-full shadow-sm font-semibold">
              ISO 9001:2015 & K3 Certified Fleet
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Layanan 1 */}
          <div className="bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[20px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Hydraulic rotary drilling rig deep underground excavation" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/services/bore_pile.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                RIG: BAUER BG-36V
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Torsi: 400 kNm</span>
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Slurry: Bentonite/Polymer</span>
              </div>
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-sandLight dark:bg-brand-gold/10 text-neutral-900 dark:text-brand-gold border border-brand-sandDark dark:border-brand-gold/20">
                    Diameter Ø800 - 2500mm
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-neutral-300 border border-neutral-300 dark:border-white/20">
                    Kedalaman s/d 60m
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mt-2">
                  Bore Pile Diameter Besar & Deep Foundation
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-relaxed">
                  Penjelasan mendalam mengenai pengeboran tanah hingga kedalaman 60m+ dengan metode slurry bentonite/polimer, torsi rig hingga 400 kNm untuk menembus lapisan batuan keras dan tanah alluvial tanpa memicu vibrasi destruktif pada struktur di sekitarnya.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-500 font-semibold">Standar: ASTM D4945 / CSL Verified</span>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-gold transition" onClick={() => onOpenModal('bore-pile')}>
                  <span>Detail Teknis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Layanan 2 */}
          <div className="bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[20px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Excavation site with diaphragm retaining wall and secant pile shoring" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/services/retaining_wall.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                SHORING & BASEMENT RETAINING
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Steel Strutting</span>
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Prestressed Ground Anchor</span>
              </div>
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-sandLight dark:bg-brand-gold/10 text-neutral-900 dark:text-brand-gold border border-brand-sandDark dark:border-brand-gold/20">
                    Tebal 600 - 1200mm
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-neutral-300 border border-neutral-300 dark:border-white/20">
                    Torsi Tinggi
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    Zero Lateral Movement
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mt-2">
                  Dinding Penahan Tanah (Diaphragm Wall & Secant Pile)
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-relaxed">
                  Penjelasan sistem penahan galian dalam (deep basement) terintegrasi sistem strutting baja dan tie-back ground anchor untuk mitigasi pergerakan tanah di area perkotaan padat dengan pengawasan inklinometer otomatis waktu nyata.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-500 font-semibold">Kedap Air & Daya Dukung Tinggi</span>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-gold transition" onClick={() => onOpenModal('retaining-wall')}>
                  <span>Detail Teknis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Layanan 3 */}
          <div className="bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[20px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="High pressure jet grouting machinery and soil stabilization" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/services/jet_grouting.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                SOIL STABILIZATION & UNDERPINNING
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Triplex Grout Pump</span>
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Anti-Heave Plug</span>
              </div>
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-sandLight dark:bg-brand-gold/10 text-neutral-900 dark:text-brand-gold border border-brand-sandDark dark:border-brand-gold/20">
                    Tekanan 400 Bar
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-neutral-300 border border-neutral-300 dark:border-white/20">
                    Column Ø1.5m - 2.5m
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mt-2">
                  High-Pressure Jet Grouting & Soil Improvement
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-relaxed">
                  Penjelasan stabilisasi tanah lunak dan pembuatan bottom plug anti-heave dengan injeksi semen tekanan tinggi hingga 400 bar, meningkatkan kuat geser tanah dan impermeabilitas secara masif pada formasi lempung dan pasir lepas.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-500 font-semibold">Kuat Tekan s/d 15 MPa</span>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-gold transition" onClick={() => onOpenModal('jet-grouting')}>
                  <span>Detail Teknis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Layanan 4 */}
          <div className="bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[20px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Deep basement dewatering well system and pumps" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/services/dewatering.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                HYDROGEOLOGY CONTROL
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Multi-Stage Submersible</span>
                <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">Recharge Well System</span>
              </div>
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-sandLight dark:bg-brand-gold/10 text-neutral-900 dark:text-brand-gold border border-brand-sandDark dark:border-brand-gold/20">
                    Discharge 150 L/s
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-neutral-300 border border-neutral-300 dark:border-white/20">
                    Automated Piezometer
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mt-2">
                  Deep Basement Dewatering & Groundwater Control
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm leading-relaxed">
                  Penjelasan penurunan muka air tanah terencana (deep well system & recharge wells) untuk menjaga stabilitas dasar galian tanpa menyebabkan amblesan (settlement) bangunan sekitar melalui pemantauan digital 24/7.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-500 font-semibold">Zero Surrounding Settlement</span>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-gold transition" onClick={() => onOpenModal('dewatering')}>
                  <span>Detail Teknis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
