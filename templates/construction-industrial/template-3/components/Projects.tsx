'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';

interface ProjectsProps {
  onOpenModal: (key: string) => void;
}

export default function Projects({ onOpenModal }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const lenis = useLenis();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.project-card', 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#project-grid',
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"
      }
    );
  }, []);

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card: any) => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
        gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
      } else {
        card.style.display = 'none';
      }
    });

    // Notify Lenis and ScrollTrigger about DOM height change to prevent any layout scroll jump
    setTimeout(() => {
      if (lenis) {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 50);
  };

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-brand-bgPaper dark:bg-brand-black border-t border-brand-border dark:border-white/10 relative light-grid-bg-overlay" id="proyek">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-gold rounded-full"></span>
              <span className="font-mono text-xs text-brand-gold tracking-widest uppercase font-semibold">PORTFOLIO EKSEKUSI TEKNIS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-black dark:text-white leading-tight mt-3">
              Rekam Jejak Konstruksi
            </h2>
          </div>
          {/* Desktop Filter Tabs (Preserved original web design) */}
          <div className="hidden lg:inline-flex p-1.5 bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-full lg:self-auto shadow-sm">
            <button 
              type="button"
              className={`filter-tab px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeFilter === 'all' ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black' : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('all'); }}
            >
              Semua Proyek
            </button>
            <button 
              type="button"
              className={`filter-tab px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeFilter === 'komersial' ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black' : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('komersial'); }}
            >
              Komersial
            </button>
            <button 
              type="button"
              className={`filter-tab px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeFilter === 'infrastruktur' ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black' : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('infrastruktur'); }}
            >
              Infrastruktur
            </button>
            <button 
              type="button"
              className={`filter-tab px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeFilter === 'industri' ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black' : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('industri'); }}
            >
              Industri
            </button>
          </div>

          {/* Mobile Filter Tabs (Dedicated scrollable chips, isolated from web view, no jump) */}
          <div className="flex lg:hidden overflow-x-auto hide-scrollbar gap-2 pb-1 pt-0.5 w-full -mx-1 px-1">
            <button 
              type="button"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                activeFilter === 'all' 
                  ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black border-brand-black dark:border-white shadow-sm' 
                  : 'bg-white dark:bg-brand-carbon text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10 hover:border-brand-gold'
              }`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('all'); }}
            >
              Semua Proyek
            </button>
            <button 
              type="button"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                activeFilter === 'komersial' 
                  ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black border-brand-black dark:border-white shadow-sm' 
                  : 'bg-white dark:bg-brand-carbon text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10 hover:border-brand-gold'
              }`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('komersial'); }}
            >
              Komersial
            </button>
            <button 
              type="button"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                activeFilter === 'infrastruktur' 
                  ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black border-brand-black dark:border-white shadow-sm' 
                  : 'bg-white dark:bg-brand-carbon text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10 hover:border-brand-gold'
              }`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('infrastruktur'); }}
            >
              Infrastruktur
            </button>
            <button 
              type="button"
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                activeFilter === 'industri' 
                  ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black border-brand-black dark:border-white shadow-sm' 
                  : 'bg-white dark:bg-brand-carbon text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10 hover:border-brand-gold'
              }`} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); filterProjects('industri'); }}
            >
              Industri
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[520px]" id="project-grid">
          {/* Proyek 1 */}
          <div className="project-card bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[18px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between" data-category="komersial">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Menara Finansial Sudirman" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/projects/project_sudirman.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                KOMERSIAL • 64 LANTAI
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-white bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium">
                <span>Jakarta Pusat</span>
                <span>Kedalaman 48m</span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-400 font-bold uppercase tracking-wide">KLIEN: PT CIPTA PROPERTI UTAMA</span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Menara Finansial Sudirman (64 Lantai)</h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed font-normal">
                  Pondasi bore pile Ø1500mm hingga kedalaman 48 meter dengan kombinasi diaphragm wall 800mm (5 lapis basement). Hasil zero-incident dan deviasi vertikalitas di bawah 0.5%.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"></span> STATUS: SELESAI
                </span>
                <button className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-gold transition flex items-center gap-1.5" onClick={() => onOpenModal('sudirman')}>
                  <span>Spesifikasi Teknik</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Proyek 2 */}
          <div className="project-card bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[18px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between" data-category="infrastruktur">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Underground interchange station" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/projects/project_lrt.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                INFRASTRUKTUR • TRANSIT
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-white bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium">
                <span>Kawasan Transit Megapolitan</span>
                <span>Kedalaman 28m</span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-400 font-bold uppercase tracking-wide">KLIEN: KONSORSIUM INFRASTRUKTUR NASIONAL</span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Underground Interchange & Stasiun Bawah Tanah</h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed font-normal">
                  Galian basement sedalam 28 meter dengan metode Top-Down Construction, diapit oleh gedung cagar budaya dengan toleransi deformasi ketat &lt;5mm.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"></span> STATUS: SELESAI
                </span>
                <button className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-gold transition flex items-center gap-1.5" onClick={() => onOpenModal('lrt')}>
                  <span>Spesifikasi Teknik</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Proyek 3 */}
          <div className="project-card bg-white dark:bg-brand-carbon border border-neutral-300 dark:border-white/10 rounded-[18px] overflow-hidden group hover:border-brand-gold transition duration-300 shadow-md flex flex-col justify-between" data-category="industri">
            <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-brand-black/50 border-b border-neutral-200 dark:border-white/10">
              <img alt="Heavy foundation rotary drilling" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="/images/projects/project_cilegon.jpg" />
              <div className="absolute top-4 left-4 bg-brand-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white border border-white/20 font-semibold">
                INDUSTRI • HEAVY SMELTER
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-white bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium">
                <span>Cilegon, Banten</span>
                <span>1.200 Titik Pancang</span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-700 dark:text-neutral-400 font-bold uppercase tracking-wide">KLIEN: GLOBAL ENERGI MULTINASIONAL</span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Smelter & Fasilitas Kilang Pesisir Pantai</h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed font-normal">
                  Pemancangan 1.200 titik tiang pancang geser dan ground improvement jet grouting pada tanah lunak pesisir berkadar air tinggi guna menopang turbin dan silo beban ekstrem.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"></span> STATUS: SELESAI
                </span>
                <button className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-gold transition flex items-center gap-1.5" onClick={() => onOpenModal('cilegon')}>
                  <span>Spesifikasi Teknik</span>
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
