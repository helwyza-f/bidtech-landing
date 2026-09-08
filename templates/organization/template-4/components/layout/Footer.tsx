import React from 'react';
import Link from 'next/link';
import { SITE_INFO, NAV_ITEMS } from '@/constants';
import { getAssetPath } from '@/lib/utils';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F0F5FA] text-slate-700 border-t border-slate-200/90 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200/80">
          
          {/* Left Brand & Mission Column (Col 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Official Organization Logo */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <img
                  src={getAssetPath('/images/logo.webp')}
                  alt="Logo Organisasi"
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-hkti-forest uppercase leading-tight">
                  {SITE_INFO.name}
                </span>
                <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">
                  DEWAN PIMPINAN PUSAT
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              {SITE_INFO.description}
            </p>

            {/* Slogan Badge Pill */}
            <div className="pt-1">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#E2EEF8] text-hkti-forest text-xs font-extrabold tracking-wide border border-[#CFE1F2]">
                “{SITE_INFO.slogan}”
              </span>
            </div>
          </div>

          {/* Center Quick Links Column (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-base font-bold text-slate-900 tracking-tight">Tautan Cepat</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-hkti-forest transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Secretariat Address Column (Col 4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-base font-bold text-slate-900 tracking-tight">Sekretariat & Alamat</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {SITE_INFO.address}
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-1">
              <p>
                <strong className="font-bold text-slate-900">Email:</strong> {SITE_INFO.email}
              </p>
              <p>
                <strong className="font-bold text-slate-900">Layanan:</strong> {SITE_INFO.hours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Motto */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 {SITE_INFO.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-medium text-slate-600">
            Semboyan Perjuangan: <strong className="text-slate-800">“{SITE_INFO.slogan}”</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};
