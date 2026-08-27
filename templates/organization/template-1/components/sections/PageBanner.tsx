'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#0D4D44] flex items-center justify-center text-center overflow-hidden">
      {/* Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      />
      
      {/* Gradient Overlay for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D4D44]/50 to-[#072C27]/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
        >
          {title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm font-medium"
        >
          <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Beranda
          </Link>
          
          {breadcrumbs.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link href={item.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-semibold">{item.label}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

