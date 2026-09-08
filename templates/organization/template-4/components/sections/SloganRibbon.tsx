import React from 'react';
import { Flag, CheckCircle2, Users } from 'lucide-react';
import { SITE_INFO } from '@/constants';

export const SloganRibbon: React.FC = () => {
  return (
    <aside className="bg-[#904D00] text-white border-y border-[#783F00] py-3.5 px-4 sm:px-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-amber-100 flex-shrink-0" />
          <span>
            SEMBOYAN: <strong className="tracking-wide">“{SITE_INFO.slogan}”</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-amber-100 text-xs">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Kemandirian Bangsa</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>Soliditas Pemuda & Kader</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
