'use client';

import React, { useState } from 'react';
import { MapPin, PhoneCall, Clock, ShieldCheck, Shield, Send, Check } from 'lucide-react';
import { SITE_INFO, KECAMATAN_OPTIONS, KATEGORI_OPTIONS } from '@/constants';
import { AspirasiFormData } from '@/types';
import { FadeIn } from '@/components/ui/MotionWrapper';

interface ContactSectionProps {
  onFormSuccess: (title: string, message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onFormSuccess }) => {
  const [formData, setFormData] = useState<AspirasiFormData>({
    namaLengkap: '',
    nomorWhatsapp: '',
    kategori: '',
    kecamatan: '',
    pesanAspirasi: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate asynchronous submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onFormSuccess(
        'Pesan Berhasil Terkirim',
        `Pesan Anda telah diterima oleh Sekretariat ${SITE_INFO.name}. Tim kami akan segera menghubungi Anda.`
      );
      setFormData({
        namaLengkap: '',
        nomorWhatsapp: '',
        kategori: '',
        kecamatan: '',
        pesanAspirasi: '',
      });
    }, 1000);
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Above 2-column Grid) */}
        <FadeIn className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-hkti-forest uppercase tracking-wider mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-hkti-forest" />
            <span>KANAL KOMUNIKASI TERPADU</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkti-slate tracking-tight mb-2">
            SEKRETARIAT & HUBUNGI KAMI
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Sampaikan aspirasi kemitraan, kolaborasi program inovasi sosial, atau pertanyaan keanggotaan langsung kepada kami.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Official Secretariat Details (Col 5) */}
          <FadeIn direction="left" className="lg:col-span-5 flex flex-col justify-between gap-4">

            {/* Secretariat Address Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-hkti-forest text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Alamat Sekretariat</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Sekretariat Nasional</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {SITE_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Hotline & Contact Info Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#8C6424] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Layanan Informasi & Kemitraan</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Hotline:</span> {SITE_INFO.phone}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">Email:</span> {SITE_INFO.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Komitmen Pelayanan Card */}
            <div className="bg-hkti-forest text-white rounded-xl p-5 sm:p-6 shadow-xs flex-1 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-2 block">
                KOMITMEN PELAYANAN
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                “{SITE_INFO.slogan}”
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Sekretariat siap memfasilitasi sinergi program kepemimpinan, kemitraan strategis, dan kolaborasi inovasi generasi muda.
              </p>
            </div>

          </FadeIn>

          {/* Right Column: Interactive Aspirasi Form (Col 7) */}
          <FadeIn direction="right" className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Formulir Aspirasi & Kemitraan Tani</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Silakan isi formulir di bawah ini. Tim advokasi dan sekretariat akan menindaklanjuti dalam waktu 1×24 jam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Nama Lengkap */}
                <div>
                  <label htmlFor="namaLengkap" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="namaLengkap"
                    required
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-hkti-forest focus:border-transparent transition-all"
                  />
                </div>

                {/* Field: Nomor WhatsApp */}
                <div>
                  <label htmlFor="nomorWhatsapp" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="nomorWhatsapp"
                    required
                    value={formData.nomorWhatsapp}
                    onChange={(e) => setFormData({ ...formData, nomorWhatsapp: e.target.value })}
                    placeholder="0812-XXXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-hkti-forest focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Kategori */}
                <div>
                  <label htmlFor="kategori" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="kategori"
                    required
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-hkti-forest focus:border-transparent transition-all"
                  >
                    <option value="" disabled>Pilih Kategori Anda</option>
                    {KATEGORI_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Field: Wilayah / Provinsi */}
                <div>
                  <label htmlFor="kecamatan" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Wilayah / Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="kecamatan"
                    required
                    value={formData.kecamatan}
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-hkti-forest focus:border-transparent transition-all"
                  >
                    <option value="" disabled>Pilih Wilayah / Provinsi</option>
                    {KECAMATAN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field: Pesan Aspirasi */}
              <div>
                <label htmlFor="pesanAspirasi" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Isi Aspirasi / Kebutuhan Kemitraan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pesanAspirasi"
                  rows={4}
                  required
                  value={formData.pesanAspirasi}
                  onChange={(e) => setFormData({ ...formData, pesanAspirasi: e.target.value })}
                  placeholder="Tuliskan secara ringkas kebutuhan pupuk, bibit, pelatihan, legalitas lahan, atau rencana kemitraan agribisnis Anda..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-hkti-forest focus:border-transparent transition-all"
                />
              </div>

              {/* Submit Button & Info */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Data Anda dijaga kerahasiaannya.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-hkti-forest hover:bg-hkti-dark text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Aspirasi</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Inline Success State Container */}
            {isSuccess && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Terima Kasih! Pesan Berhasil Dikirim.</h5>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Tim Sekretariat {SITE_INFO.name} akan meninjau dan menghubungi Anda melalui WhatsApp atau Email.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </FadeIn>

        </div>

      </div>
    </section>
  );
};
