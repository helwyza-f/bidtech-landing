'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/lib/ModalContext';
import { BRAND } from '@/lib/constants';
import { X, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

const BRANCH_PHONES: Record<string, string> = {
  'Jakarta Selatan - Tebet': '6281234567891',
  'Jakarta Barat - Puri Indah': '6281234567892',
  'Jakarta Timur - Rawamangun': '6281234567893',
  'Tangerang Selatan - BSD': '6281234567894',
  'Bekasi - Summarecon': '6281234567895',
  'Bandung - Dago': '6281234567896',
  'Surabaya - Gubeng': '6281234567897',
  'Yogyakarta - Kaliurang': '6281234567898',
  'Semarang - Candisari': '6281234567899',
  'Online Class Seluruh Indonesia': '6281234567890',
};

export default function RegisterModal() {
  const { isRegisterOpen, closeRegister, selectedProgram } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    program: selectedProgram || 'Matematika',
    branch: 'Jakarta Selatan — Tebet',
  });

  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram, isRegisterOpen]);

  if (!isRegisterOpen) return null;

  const getWaUrl = () => {
    const rawTarget = BRANCH_PHONES[formData.branch] || BRAND.whatsapp || '6281234567890';
    let targetNumber = rawTarget.replace(/\D/g, '');
    if (targetNumber.startsWith('0')) {
      targetNumber = '62' + targetNumber.slice(1);
    }

    const message =
      `Halo SmartBelajar, saya ingin mendaftar dan klaim 1x Free Trial Class untuk anak saya:\n\n` +
      `📋 *Data Pendaftaran Free Trial*:\n` +
      `• *Nama Orang Tua*: ${formData.parentName}\n` +
      `• *Nama Anak*: ${formData.childName}\n` +
      `• *Usia Anak*: ${formData.childAge} Tahun\n` +
      `• *No. Handphone/WA*: ${formData.phone}\n` +
      `• *Program Belajar*: ${formData.program}\n` +
      `• *Cabang Pilihan*: ${formData.branch}\n\n` +
      `Mohon informasi jadwal sesi kelas dan konfirmasi free trial-nya. Terima kasih!`;

    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = getWaUrl();
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      parentName: '',
      childName: '',
      childAge: '',
      phone: '',
      program: selectedProgram || 'Matematika',
      branch: 'Jakarta Selatan — Tebet',
    });
    closeRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg p-6 md:p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={submitted ? handleReset : closeRegister}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-brand-navy">Pendaftaran Disiapkan!</h3>
            <p className="text-brand-muted text-sm max-w-sm mx-auto leading-relaxed">
              Terima kasih, <strong>{formData.parentName}</strong>. Data Anda telah disiapkan dan sedang dialihkan ke WhatsApp konsultan pendidikan SmartBelajar untuk konfirmasi jadwal Free Trial ananda <strong>{formData.childName}</strong>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-extrabold rounded-full transition-all shadow-md flex items-center justify-center gap-2 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                Buka WhatsApp Sekarang
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-full transition-colors"
              >
                Selesai &amp; Tutup
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange-light text-brand-orange text-xs font-black rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                GRATIS 1x TRIAL CLASS
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-navy">
                Daftar <span className="text-brand-orange">Konsultasi Gratis</span>
              </h3>
              <p className="text-brand-muted text-sm mt-1.5">
                Konsultasikan kebutuhan belajar anak bersama Educational Consultant kami.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Nama Lengkap Orang Tua
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bunda Sarah"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Nama Anak
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kenzo"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Usia Anak
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="14"
                    required
                    placeholder="Contoh: 5"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Nomor Handphone / Kontak Aktif
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Pilihan Program Belajar
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-semibold text-brand-navy"
                >
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="English as a Foreign Language">English as a Foreign Language</option>
                  <option value="Keterampilan Memegang Pensil">Keterampilan Memegang Pensil</option>
                  <option value="Private Home Tutoring (1-on-1)">Private Home Tutoring (1-on-1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Pilih Cabang Terdekat
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-sm font-semibold text-brand-navy"
                >
                  <option value="Jakarta Selatan - Tebet">Jakarta Selatan — Tebet</option>
                  <option value="Jakarta Barat - Puri Indah">Jakarta Barat — Puri Indah</option>
                  <option value="Jakarta Timur - Rawamangun">Jakarta Timur — Rawamangun</option>
                  <option value="Tangerang Selatan - BSD">Tangerang Selatan — BSD City</option>
                  <option value="Bekasi - Summarecon">Bekasi — Summarecon</option>
                  <option value="Bandung - Dago">Bandung — Dago</option>
                  <option value="Surabaya - Gubeng">Surabaya — Gubeng</option>
                  <option value="Yogyakarta - Kaliurang">Yogyakarta — Kaliurang</option>
                  <option value="Semarang - Candisari">Semarang — Candisari</option>
                  <option value="Online Class Seluruh Indonesia">Kelas Online Seluruh Indonesia</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white font-black text-sm rounded-full shadow-orange-glow transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                Klaim 1x Free Trial Sekarang
              </button>

              <p className="text-center text-xs text-brand-muted mt-2 flex items-center justify-center gap-1.5">
                <span>💬</span> Formulir akan otomatis terhubung ke WhatsApp Customer Service.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
