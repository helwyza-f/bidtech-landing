import type { Metadata } from 'next';
import { GaleriClient } from '@/components/sections/GaleriClient';

export const metadata: Metadata = {
  title: 'Galeri Dokumentasi Kegiatan — Aliansi Kepemimpinan Indonesia (2026–2030)',
  description:
    'Arsip visual resmi rekam jejak kongres nasional, seminar kepemimpinan, konsolidasi pemuda, serta aksi inovasi sosial Aliansi Kepemimpinan Indonesia Periode 2026–2030.',
  keywords: [
    'Galeri Kepemimpinan Indonesia',
    'Dokumentasi Pemuda Indonesia',
    'Kongres Nasional',
    'Inovasi Sosial',
    'Foto Kegiatan Pemuda',
    'Arsip Kepemimpinan',
  ],
  openGraph: {
    title: 'Galeri Dokumentasi Kegiatan — Aliansi Kepemimpinan Indonesia',
    description:
      'Arsip visual resmi kongres nasional, konsolidasi, dan inovasi kepemimpinan Aliansi Kepemimpinan Indonesia.',
    type: 'website',
  },
};

export default function GaleriPage() {
  return <GaleriClient />;
}
