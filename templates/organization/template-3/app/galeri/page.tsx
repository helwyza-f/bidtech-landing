import type { Metadata } from 'next';
import { GaleriClient } from '@/components/sections/GaleriClient';

export const metadata: Metadata = {
  title: 'Galeri Dokumentasi Kegiatan — DPC HKTI Kota Batam (2026–2030)',
  description:
    'Arsip visual resmi rekam jejak pelantikan akbar, musyawarah cabang, konsolidasi kelembagaan tani, serta aksi kemandirian pangan maritim DPC HKTI Kota Batam Periode 2026–2030.',
  keywords: [
    'Galeri HKTI Batam',
    'Dokumentasi HKTI Batam',
    'Pelantikan HKTI Batam',
    'Petani Batam',
    'Foto Kegiatan HKTI',
    'Arsip Tani Batam',
  ],
  openGraph: {
    title: 'Galeri Dokumentasi Kegiatan — DPC HKTI Kota Batam',
    description:
      'Arsip visual resmi pelantikan, musda, dan konsolidasi kepengurusan DPC HKTI Kota Batam.',
    type: 'website',
  },
};

export default function GaleriPage() {
  return <GaleriClient />;
}
