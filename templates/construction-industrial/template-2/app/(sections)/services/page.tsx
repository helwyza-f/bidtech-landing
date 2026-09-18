import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata = {
  title: `Katalog Armada & Spesifikasi — ${COMPANY_INFO.name}`,
  description: `Daftar lengkap armada alat berat, truk tambang CAT 797F, excavator crawler, dan crane all-terrain.`,
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 min-h-screen bg-slate-50">
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold uppercase tracking-wider text-orange-600 mb-4">
              <span>SPESIFIKASI & SEWA</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading uppercase tracking-tight text-slate-950 mb-6">
              Katalog Lengkap <br />
              <span className="text-orange-600">Armada Alat Berat</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Jelajahi armada kami lengkap dengan rincian teknis, daya mesin, kapasitas tonase, dan panduan biaya sewa proyek.
            </p>
          </div>
        </section>

        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
