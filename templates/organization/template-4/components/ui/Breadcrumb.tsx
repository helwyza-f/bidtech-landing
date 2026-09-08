import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full bg-[#F0F5FA] border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-hkti-forest text-slate-600 transition-colors"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Beranda</span>
        </Link>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-hkti-forest text-slate-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-hkti-forest font-bold">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
