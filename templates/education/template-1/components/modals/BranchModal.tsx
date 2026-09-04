'use client';

import React, { useState } from 'react';
import { useModal } from '@/lib/ModalContext';
import { X, MapPin, Search, Phone, ExternalLink, MessageCircle } from 'lucide-react';

const BRANCHES = [
  {
    city: 'Jakarta Selatan',
    name: 'Cabang Tebet Barat',
    address: 'Jl. Tebet Barat Dalam Raya No. 45, Tebet, Jakarta Selatan',
    phone: '0812-3456-7891',
    mapsUrl: 'https://maps.google.com/?q=Tebet+Jakarta+Selatan',
  },
  {
    city: 'Jakarta Barat',
    name: 'Cabang Puri Kencana',
    address: 'Ruko Puri Niaga Blok A2 No. 8, Puri Indah, Kembangan, Jakarta Barat',
    phone: '0812-3456-7892',
    mapsUrl: 'https://maps.google.com/?q=Puri+Indah+Jakarta+Barat',
  },
  {
    city: 'Jakarta Timur',
    name: 'Cabang Rawamangun',
    address: 'Jl. Pemuda No. 12, Rawamangun, Pulo Gadung, Jakarta Timur',
    phone: '0812-3456-7893',
    mapsUrl: 'https://maps.google.com/?q=Rawamangun+Jakarta+Timur',
  },
  {
    city: 'Tangerang Selatan',
    name: 'Cabang BSD City',
    address: 'Ruko Golden Boulevard Blok W No. 15, Serpong, Tangerang Selatan',
    phone: '0812-3456-7894',
    mapsUrl: 'https://maps.google.com/?q=BSD+City+Tangerang+Selatan',
  },
  {
    city: 'Bekasi',
    name: 'Cabang Summarecon Bekasi',
    address: 'Ruko Sinpasa Commercial Blok A-12, Summarecon, Bekasi Utara',
    phone: '0812-3456-7895',
    mapsUrl: 'https://maps.google.com/?q=Summarecon+Bekasi',
  },
  {
    city: 'Bandung',
    name: 'Cabang Dago Atas',
    address: 'Jl. Ir. H. Juanda No. 182, Dago, Coblong, Kota Bandung',
    phone: '0812-3456-7896',
    mapsUrl: 'https://maps.google.com/?q=Dago+Bandung',
  },
  {
    city: 'Surabaya',
    name: 'Cabang Gubeng Kertajaya',
    address: 'Jl. Kertajaya Indah No. 56, Gubeng, Surabaya',
    phone: '0812-3456-7897',
    mapsUrl: 'https://maps.google.com/?q=Kertajaya+Surabaya',
  },
  {
    city: 'Yogyakarta',
    name: 'Cabang Kaliurang KM 5',
    address: 'Jl. Kaliurang KM 5.2 No. 20, Sleman, DI Yogyakarta',
    phone: '0812-3456-7898',
    mapsUrl: 'https://maps.google.com/?q=Kaliurang+Yogyakarta',
  },
];

export default function BranchModal() {
  const { isBranchOpen, closeBranch, openRegister } = useModal();
  const [search, setSearch] = useState('');

  if (!isBranchOpen) return null;

  const filtered = BRANCHES.filter(
    (b) =>
      b.city.toLowerCase().includes(search.toLowerCase()) ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl p-6 md:p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBranch}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue-light/20 text-brand-blue text-xs font-black rounded-full mb-2">
            <MapPin className="w-3.5 h-3.5" />
            24 CABANG DI KOTA BESAR
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-brand-navy">
            Temukan <span className="text-brand-blue">Cabang SmartBelajar</span>
          </h3>
          <p className="text-brand-muted text-sm mt-1">
            Kunjungi learning center ramah anak kami atau jadwalkan trial class di lokasi terdekat.
          </p>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama kota, cabang, atau wilayah (misal: Tebet, Bandung, BSD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm font-medium"
            />
          </div>
        </div>

        {/* Branch List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-brand-muted text-sm">
              Tidak ditemukan cabang dengan kata kunci &quot;{search}&quot;. Coba cari kota lain atau daftar kelas online.
            </div>
          ) : (
            filtered.map((branch) => (
              <div
                key={branch.name}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-brand-sky/40 hover:border-brand-blue/30 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-brand-blue text-white">
                      {branch.city}
                    </span>
                    <h4 className="font-extrabold text-brand-navy text-sm">{branch.name}</h4>
                  </div>
                  <p className="text-xs text-brand-muted mt-1.5 leading-relaxed max-w-md">
                    {branch.address}
                  </p>
                  <p className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    {branch.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-brand-blue bg-white rounded-xl border border-slate-200 hover:border-brand-blue transition-colors text-xs font-bold flex items-center gap-1"
                    title="Buka Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Maps
                  </a>
                  <button
                    onClick={() => {
                      closeBranch();
                      openRegister(branch.name);
                    }}
                    className="px-3.5 py-2 text-xs font-extrabold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-xl shadow-sm transition-all hover:scale-105"
                  >
                    Trial di Sini
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
