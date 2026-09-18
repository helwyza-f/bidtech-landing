import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata = {
  title: `Hubungi Kami — ${COMPANY_INFO.name}`,
  description: `Konsultasi pengadaan sewa armada alat berat dan estimasi tender dengan ${COMPANY_INFO.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-28 min-h-screen bg-slate-50">
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold uppercase tracking-wider text-orange-600 mb-4">
              <span>HUBUNGI DISPATCHER</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-heading uppercase tracking-tight text-slate-950 mb-6">
              Konsultasi & <br />
              <span className="text-orange-600">Pengajuan Tender</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Hubungi tim kami melalui hotline 24 jam, WhatsApp, atau kirimkan rincian kebutuhan armada via formulir resmi di bawah ini.
            </p>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
