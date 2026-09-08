'use client';

import React from 'react';
import { Users, Lightbulb, TrendingUp, Shield, Award, ArrowRight, BadgeCheck } from 'lucide-react';
import { PILLARS } from '@/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export const Pillars: React.FC = () => {
  const getPillarIcon = (iconName: string, theme?: 'forest' | 'amber') => {
    const iconColor = theme === 'amber' ? 'text-[#904D00]' : 'text-hkti-forest';
    switch (iconName) {
      case 'Users':
        return <Users className={`w-6 h-6 ${iconColor}`} />;
      case 'Lightbulb':
        return <Lightbulb className={`w-6 h-6 ${iconColor}`} />;
      case 'TrendingUp':
        return <TrendingUp className={`w-6 h-6 ${iconColor}`} />;
      case 'Shield':
        return <Shield className={`w-6 h-6 ${iconColor}`} />;
      case 'Award':
        return <Award className={`w-6 h-6 text-amber-600`} />;
      default:
        return <Users className={`w-6 h-6 ${iconColor}`} />;
    }
  };

  return (
    <section id="pilar" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-hkti-forest uppercase tracking-wider mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-hkti-forest inline-block" />
              <span>HALUAN STRATEGIS ORGANISASI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkti-slate tracking-tight uppercase">
              5 PILAR ARAH PERJUANGAN
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed">
            Fondasi terpadu Aliansi Kepemimpinan Indonesia dalam mewujudkan transformasi sosial, kepemimpinan progresif, dan integritas bangsa.
          </p>
        </FadeIn>

        {/* 5 Pillar Cards Grid with Stagger Animation */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
        >
          {PILLARS.map((pillar) => {
            const isAmber = pillar.theme === 'amber';
            const topBorderColor = isAmber
              ? pillar.isPinnacle
                ? 'border-t-[#C26D00]'
                : 'border-t-[#904D00]'
              : 'border-t-hkti-forest';
            
            const numberBg = isAmber
              ? 'bg-amber-50 text-amber-900 border border-amber-200/60'
              : 'bg-slate-100 text-slate-800 border border-slate-200/60';
              
            const footerColor = isAmber
              ? pillar.isPinnacle
                ? 'text-amber-600'
                : 'text-[#904D00]'
              : 'text-hkti-forest';

            return (
              <StaggerItem key={pillar.id}>
                <div
                  className={`h-full group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 border-t-4 ${topBorderColor} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    {/* Top Row: Number Pill & Raw Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-lg ${numberBg}`}>
                        {pillar.number}
                      </span>
                      <div className="transition-transform group-hover:scale-110 duration-200">
                        {getPillarIcon(pillar.iconName, pillar.theme)}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
                      {pillar.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Card Footer Phase / Pinnacle */}
                  <div className={`mt-6 pt-2 flex items-center text-xs font-semibold ${footerColor}`}>
                    {pillar.isPinnacle ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span>{pillar.phaseLabel}</span>
                        <BadgeCheck className="w-4 h-4 text-amber-600" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer">
                        <span>{pillar.phaseLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
