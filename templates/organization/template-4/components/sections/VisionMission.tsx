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
            {SITE_INFO.name} • {SITE_INFO.period.toUpperCase()}
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
                {SITE_INFO.name} • {SITE_INFO.period}
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
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2518] tracking-tight">
              Visi, Misi dan Tujuan
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0B3B24]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3B24] tracking-wide uppercase">
              Arah Strategis & Kelembagaan
            </span>
          </div>
        </FadeIn>

        {/* 4. Three Cards Bento Grid: Visi, Misi, Tujuan */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
                  {SITE_INFO.visi.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
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
                  <p>{SITE_INFO.misi}</p>
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
                  <p>{SITE_INFO.tujuan.lead}</p>
                  <ul className="space-y-2 text-slate-700 list-disc list-outside pl-4 text-[13.5px] sm:text-sm">
                    {SITE_INFO.tujuan.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
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
