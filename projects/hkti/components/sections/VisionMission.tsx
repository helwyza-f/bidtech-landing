'use client';

import React from 'react';
import {
  GraduationCap,
  ClipboardCheck,
  Users,
} from 'lucide-react';
import { SITE_INFO } from '@/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export const VisionMission: React.FC = () => {
  return (
    <section id="visi-misi" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Main Centered Header: PEDOMAN ORGANISASI - VISI DAN MISI (Matching Screenshot 1:1) */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-hkti-forest text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            PEDOMAN ORGANISASI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            VISI DAN MISI
          </h2>
          <p className="text-xs sm:text-sm font-bold text-hkti-forest tracking-wider uppercase mt-2">
            DPC HIMPUNAN KERUKUNAN TANI INDONESIA (HKTI) KOTA BATAM PERIODE 2026–2030
          </p>
        </FadeIn>

        {/* 2. Featured Visi Utama Card (Matching Screenshot 1:1) */}
        <FadeIn delay={0.1} className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs mb-14 sm:mb-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Light Blue Box with Solid Green Lightbulb Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#EAF2FD] border border-blue-100/60 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#064E3B] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 17h4v1h-4v-1zm1 2h2v1h-2v-1z" />
            </svg>
          </div>

          {/* Visi Quote Content */}
          <div className="text-center sm:text-left flex-1">
            <div className="mb-2">
              <span className="text-xs sm:text-sm font-bold text-[#904D00] tracking-wide">
                HKTI Batam 2026–2030
              </span>
            </div>
            <p className="text-base sm:text-lg lg:text-[19px] font-bold text-slate-800 leading-relaxed">
              {SITE_INFO.visiUtama}
            </p>
          </div>
        </FadeIn>

        {/* 3. Subheader for 3-Column Bento Cards: Visi, Misi dan Tujuan */}
        <FadeIn delay={0.15} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#0B3B24] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-[#0B3B24]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2518] tracking-tight">
              Visi, Misi dan Tujuan
            </h3>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide sm:text-right pl-11 sm:pl-0">
            Prioritas Kerja 2026–2030
          </span>
        </FadeIn>

        {/* 3-Column Bento Cards Grid (Visi, Misi, Tujuan) with Prominent Hover Effects */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {/* Card 1: Visi */}
          <StaggerItem className="h-full">
            <div className="group h-full bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-2xl hover:shadow-emerald-950/15 hover:border-emerald-600 hover:ring-4 hover:ring-emerald-500/10 transition-all duration-300 ease-out hover:-translate-y-3 flex flex-col justify-between cursor-pointer">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#064E3B] tracking-tight group-hover:text-hkti-forest transition-colors">
                    Visi
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-115 group-hover:bg-emerald-100 group-hover:rotate-6 transition-all duration-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Paragraphs */}
                <div className="space-y-4 text-slate-700 text-[13.5px] sm:text-sm leading-relaxed text-justify sm:text-left group-hover:text-slate-900 transition-colors">
                  <p>
                    Memperkuat persatuan dan kelembagaan petani melalui pembinaan organisasi yang berkelanjutan, meningkatkan pengetahuan, keterampilan, kapasitas, dan kesejahteraan petani melalui pendidikan serta pendampingan, sekaligus mendorong penggunaan teknologi dan inovasi pertanian yang sesuai dengan kebutuhan daerah.
                  </p>
                  <p>
                    HKTI Kota Batam juga berkomitmen memperjuangkan hak dan kepentingan petani, meningkatkan produktivitas serta nilai ekonomi hasil pertanian, memperluas kemitraan dengan pemerintah, dunia usaha, perguruan tinggi, lembaga keuangan, dan komunitas, serta mendorong keterlibatan generasi muda dalam pengembangan sektor pertanian.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: Misi (Featured Solid Dark Green Card with Glowing Hover) */}
          <StaggerItem className="h-full">
            <div className="group h-full bg-[#054026] text-white rounded-3xl p-7 sm:p-8 border border-emerald-500/30 shadow-md hover:shadow-2xl hover:shadow-emerald-950/50 hover:border-emerald-400 hover:ring-4 hover:ring-emerald-400/20 hover:bg-[#043720] transition-all duration-300 ease-out hover:-translate-y-3 flex flex-col justify-between cursor-pointer">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-200 transition-colors">
                    Misi
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-115 group-hover:bg-white/20 group-hover:rotate-6 transition-all duration-300">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-white/95 text-[13.5px] sm:text-sm leading-relaxed text-justify sm:text-left group-hover:text-white transition-colors">
                  <p>
                    Mewujudkan HKTI Kota Batam sebagai organisasi petani yang profesional, mandiri, bersatu, berdaya saing, dan berintegritas dalam memperjuangkan kepentingan petani serta mendorong terciptanya sektor pertanian yang modern, produktif, berkelanjutan, dan mampu memberikan manfaat nyata bagi kesejahteraan masyarakat Kota Batam.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: Tujuan */}
          <StaggerItem className="h-full">
            <div className="group h-full bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-2xl hover:shadow-emerald-950/15 hover:border-emerald-600 hover:ring-4 hover:ring-emerald-500/10 transition-all duration-300 ease-out hover:-translate-y-3 flex flex-col justify-between cursor-pointer">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#064E3B] tracking-tight group-hover:text-hkti-forest transition-colors">
                    Tujuan
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-115 group-hover:bg-emerald-100 group-hover:rotate-6 transition-all duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-3 text-slate-700 text-[13.5px] sm:text-sm leading-relaxed text-justify sm:text-left group-hover:text-slate-900 transition-colors">
                  <p>
                    Membangun ekosistem pertanian Kota Batam yang kuat, inklusif, dan berkelanjutan dengan menjadikan petani sebagai pelaku utama pembangunan daerah. Melalui penguatan kelembagaan, peningkatan kualitas sumber daya manusia, pemanfaatan teknologi, dan perluasan akses pasar, HKTI Kota Batam bertujuan untuk:
                  </p>
                  <ul className="space-y-2 text-slate-700 list-disc list-outside pl-4 text-[13.5px] sm:text-sm">
                    <li>Meningkatkan kesejahteraan dan kemandirian petani.</li>
                    <li>Memperkuat ketahanan serta ketersediaan pangan daerah.</li>
                    <li>Meningkatkan produktivitas dan nilai jual hasil pertanian.</li>
                    <li>Memberikan perlindungan dan pendampingan kepada petani.</li>
                  </ul>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
};

