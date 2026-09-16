"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'komersial-1',
    category: 'Komersial',
    title: 'METRO SKYLINE TOWER - JAKARTA CBD',
    description: 'Pembangunan menara komersial 54 lantai dengan spesifikasi ketahanan seismik Zona 4. Menggunakan struktur rangka baja komposit mutakhir dan fasad kaca efisien energi untuk mencapai standar arsitektur modern.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92KJumX-8-uPVWGsmkq1BbkttIHpCYiwoLmOQpIABTQZyFZfyWvGFrIymJ6wfMZm9lXSBeRvIX5izxCDZJGt_oBDsGD4mgqI0lF5ihF3kDbMofkI5Br7RLBiOcAF1odJXmtNt85y97Hvvz86_G9Kp9yTrmYZJ33Feo4ckSFWJWpm9aLeENsAVsemGntZUlQ3ROE8oEN429AhjPce2njoGmVZ_j7H7-QYok5ipwAv8vHWdiSY9llRTCQ',
    mainBadge: 'SEKTOR 04 — CRANE RIG #2 AKTIF',
    coordinates: 'LAT: -6.2146° S | LON: 106.8182° E | DATUM WGS84',
    phases: [
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8U0kC3izCa6bkzzC04P28CACllPfjxQgHB7-1SNmuVrMyDvlkY8CpBWcV12zmju9eA5zyV5arASN3kVoaOT1TYjPfMXVOom_Zn4lGVz2lvB_fFGP25ldt3UMoTRfiXZiTylwW_S_nmt46pfGS6FMBUWGzi3X56J1ciFdBwvnsC7pGHhDxUvvWRIFSu7K9_O8fpkWy_pCex_feNXojSHDO6lM5ikkvdDH2isxgdliv86XYXb7M2GHfQ', label: 'FASE 01 — BORED PILE 80M & SLURRY WALL', icon: 'construction' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdsq1Fwa1VPOw8FbtvOGCDutZbdjCsZo2708OiboHea_Yd7u6-mtR9p0rZPylDvr7xpP9Joeqq9DBsBq0QonYrKsj6b6hUaHuXMuspMkK5BvwGi27X-kMKd8b2WmNEfTTATLk5RF5RxmOGOp8dx4lBofJdsFOkuZAUVnlnkWWQWXXgIO8wiCKdibuA9FiQMMHm3Fi4BH2mxGxByCH9aC4XLZ7ywwwfbyswYjMJ3VbkrsF_e4ZZ9-tbWg', label: 'FASE 02 — OUTRIGGER TRUSS BELT LANTAI 28', icon: 'architecture' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA', label: 'FASE 03 — PEMASANGAN CURTAIN WALL DOUBLE-GLAZED', icon: 'domain' },
    ]
  },
  {
    id: 'industrial-1',
    category: 'Industrial',
    title: 'PUSAT LOGISTIK ALPHA - SURABAYA',
    description: 'Konstruksi fasilitas distribusi raksasa seluas 85.000 m² dengan spesifikasi lantai super-flat post-tensioned tanpa sambungan untuk menahan beban dinamis hingga 12 ton/m².',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8U0kC3izCa6bkzzC04P28CACllPfjxQgHB7-1SNmuVrMyDvlkY8CpBWcV12zmju9eA5zyV5arASN3kVoaOT1TYjPfMXVOom_Zn4lGVz2lvB_fFGP25ldt3UMoTRfiXZiTylwW_S_nmt46pfGS6FMBUWGzi3X56J1ciFdBwvnsC7pGHhDxUvvWRIFSu7K9_O8fpkWy_pCex_feNXojSHDO6lM5ikkvdDH2isxgdliv86XYXb7M2GHfQ',
    mainBadge: 'SEKTOR 02 — PENGECORAN LANTAI AKTIF',
    coordinates: 'LAT: -7.2146° S | LON: 112.8182° E | DATUM WGS84',
    phases: [
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdsq1Fwa1VPOw8FbtvOGCDutZbdjCsZo2708OiboHea_Yd7u6-mtR9p0rZPylDvr7xpP9Joeqq9DBsBq0QonYrKsj6b6hUaHuXMuspMkK5BvwGi27X-kMKd8b2WmNEfTTATLk5RF5RxmOGOp8dx4lBofJdsFOkuZAUVnlnkWWQWXXgIO8wiCKdibuA9FiQMMHm3Fi4BH2mxGxByCH9aC4XLZ7ywwwfbyswYjMJ3VbkrsF_e4ZZ9-tbWg', label: 'FASE 01 — PREPARASI SUBGRADE & PEMADATAN', icon: 'engineering' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92KJumX-8-uPVWGsmkq1BbkttIHpCYiwoLmOQpIABTQZyFZfyWvGFrIymJ6wfMZm9lXSBeRvIX5izxCDZJGt_oBDsGD4mgqI0lF5ihF3kDbMofkI5Br7RLBiOcAF1odJXmtNt85y97Hvvz86_G9Kp9yTrmYZJ33Feo4ckSFWJWpm9aLeENsAVsemGntZUlQ3ROE8oEN429AhjPce2njoGmVZ_j7H7-QYok5ipwAv8vHWdiSY9llRTCQ', label: 'FASE 02 — PEMASANGAN TULANGAN BAJA', icon: 'handyman' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA', label: 'FASE 03 — PENGECORAN BETON POST-TENSIONED', icon: 'precision_manufacturing' },
    ]
  },
  {
    id: 'infrastruktur-1',
    category: 'Infrastruktur',
    title: 'HANGAR AERO LOGISTIK - BATAM',
    description: 'Pembangunan fasilitas hangar bentang lebar tanpa pilar pendukung tengah. Rangka baja struktural tubular dikembangkan untuk menahan cuaca ekstrem di pesisir.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdsq1Fwa1VPOw8FbtvOGCDutZbdjCsZo2708OiboHea_Yd7u6-mtR9p0rZPylDvr7xpP9Joeqq9DBsBq0QonYrKsj6b6hUaHuXMuspMkK5BvwGi27X-kMKd8b2WmNEfTTATLk5RF5RxmOGOp8dx4lBofJdsFOkuZAUVnlnkWWQWXXgIO8wiCKdibuA9FiQMMHm3Fi4BH2mxGxByCH9aC4XLZ7ywwwfbyswYjMJ3VbkrsF_e4ZZ9-tbWg',
    mainBadge: 'SEKTOR 01 — EREKSI ATAP BAJA AKTIF',
    coordinates: 'LAT: 1.1234° N | LON: 104.0123° E | DATUM WGS84',
    phases: [
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92KJumX-8-uPVWGsmkq1BbkttIHpCYiwoLmOQpIABTQZyFZfyWvGFrIymJ6wfMZm9lXSBeRvIX5izxCDZJGt_oBDsGD4mgqI0lF5ihF3kDbMofkI5Br7RLBiOcAF1odJXmtNt85y97Hvvz86_G9Kp9yTrmYZJ33Feo4ckSFWJWpm9aLeENsAVsemGntZUlQ3ROE8oEN429AhjPce2njoGmVZ_j7H7-QYok5ipwAv8vHWdiSY9llRTCQ', label: 'FASE 01 — INSTALASI KOLOM UTAMA', icon: 'foundation' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA', label: 'FASE 02 — PERAKITAN TRUSS BAJA TUBULAR', icon: 'account_tree' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8U0kC3izCa6bkzzC04P28CACllPfjxQgHB7-1SNmuVrMyDvlkY8CpBWcV12zmju9eA5zyV5arASN3kVoaOT1TYjPfMXVOom_Zn4lGVz2lvB_fFGP25ldt3UMoTRfiXZiTylwW_S_nmt46pfGS6FMBUWGzi3X56J1ciFdBwvnsC7pGHhDxUvvWRIFSu7K9_O8fpkWy_pCex_feNXojSHDO6lM5ikkvdDH2isxgdliv86XYXb7M2GHfQ', label: 'FASE 03 — EREKSI TANDEM LIFT ATAP', icon: 'precision_manufacturing' },
    ]
  },
  {
    id: 'residensial-1',
    category: 'Residensial',
    title: 'ELEVASI RESIDENCE - BALI',
    description: 'Kompleks hunian vertikal eksklusif yang memadukan keamanan struktural anti-gempa tinggi dengan estetika arsitektur organik berbasis lingkungan lokal.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA',
    mainBadge: 'SEKTOR 03 — FINISHING AKTIF',
    coordinates: 'LAT: -8.3405° S | LON: 115.0920° E | DATUM WGS84',
    phases: [
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdsq1Fwa1VPOw8FbtvOGCDutZbdjCsZo2708OiboHea_Yd7u6-mtR9p0rZPylDvr7xpP9Joeqq9DBsBq0QonYrKsj6b6hUaHuXMuspMkK5BvwGi27X-kMKd8b2WmNEfTTATLk5RF5RxmOGOp8dx4lBofJdsFOkuZAUVnlnkWWQWXXgIO8wiCKdibuA9FiQMMHm3Fi4BH2mxGxByCH9aC4XLZ7ywwwfbyswYjMJ3VbkrsF_e4ZZ9-tbWg', label: 'FASE 01 — STRUKTUR BAWAH & PONDASI', icon: 'foundation' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8U0kC3izCa6bkzzC04P28CACllPfjxQgHB7-1SNmuVrMyDvlkY8CpBWcV12zmju9eA5zyV5arASN3kVoaOT1TYjPfMXVOom_Zn4lGVz2lvB_fFGP25ldt3UMoTRfiXZiTylwW_S_nmt46pfGS6FMBUWGzi3X56J1ciFdBwvnsC7pGHhDxUvvWRIFSu7K9_O8fpkWy_pCex_feNXojSHDO6lM5ikkvdDH2isxgdliv86XYXb7M2GHfQ', label: 'FASE 02 — PEMASANGAN PRECAST', icon: 'construction' },
      { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD92KJumX-8-uPVWGsmkq1BbkttIHpCYiwoLmOQpIABTQZyFZfyWvGFrIymJ6wfMZm9lXSBeRvIX5izxCDZJGt_oBDsGD4mgqI0lF5ihF3kDbMofkI5Br7RLBiOcAF1odJXmtNt85y97Hvvz86_G9Kp9yTrmYZJ33Feo4ckSFWJWpm9aLeENsAVsemGntZUlQ3ROE8oEN429AhjPce2njoGmVZ_j7H7-QYok5ipwAv8vHWdiSY9llRTCQ', label: 'FASE 03 — INSTALASI UTILITAS', icon: 'electrical_services' },
    ]
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const projectDisplayRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Komersial');
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  const categories = ['Komersial', 'Industrial', 'Infrastruktur', 'Residensial'];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const newProject = projectsData.find(p => p.category === category);
    if (newProject) {
      setActiveProject(newProject);
      
      // Animate project change
      gsap.fromTo(projectDisplayRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  };

  useGSAP(() => {
    gsap.from(".project-layout", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-space-2xl bg-surface border-b border-outline-variant overflow-hidden" id="projects">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-3 uppercase">
              SOROTAN PORTOFOLIO
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase text-on-surface">
              PROYEK REKAYASA UNGGULAN
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-label-caps text-label-caps px-5 py-2 rounded-full uppercase transition-all hover:scale-105 active:scale-95 shadow-sm border ${
                  activeCategory === cat 
                    ? 'bg-primary-container text-on-secondary-fixed border-primary-container font-bold' 
                    : 'border-outline-variant text-secondary hover:border-on-surface hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Layout (like screenshot) */}
        <div className="project-layout" ref={projectDisplayRef}>
          <div className="mb-6 max-w-3xl">
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-bold uppercase">{activeProject.title}</h3>
            <p className="font-body-md text-body-md text-secondary">
              {activeProject.description}
            </p>
          </div>

          <div className="bg-surface-container-low p-2 md:p-4 border border-outline-variant/30 rounded-sm">
            {/* Main Hero Image */}
            <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] overflow-hidden bg-surface-container mb-4">
              <img className="w-full h-full object-cover" src={activeProject.mainImage} alt={activeProject.title} />
              
              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 bg-on-secondary-fixed text-surface px-4 py-2 flex items-center gap-2 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-technical text-label-technical uppercase font-bold tracking-widest">{activeProject.mainBadge}</span>
              </div>

              {/* Bottom Right Coordinates */}
              <div className="absolute bottom-4 right-4 bg-surface text-on-surface px-4 py-2 shadow-md hidden md:block">
                <span className="font-label-technical text-label-technical font-bold">{activeProject.coordinates}</span>
              </div>
            </div>

            {/* 3 Phases */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeProject.phases.map((phase, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden group bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={phase.image} alt={phase.label} />
                  
                  {/* Bottom Bar overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-on-secondary-fixed/90 text-surface p-3 flex justify-between items-center transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <span className="font-label-technical text-label-technical uppercase truncate pr-4" title={phase.label}>
                      {phase.label}
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-sm flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {phase.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
