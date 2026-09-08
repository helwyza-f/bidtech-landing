import type { Metadata } from 'next';
import { GaleriClient } from '@/components/sections/GaleriClient';
import { absoluteUrl } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/schema';

const TITLE = 'Galeri Dokumentasi Kegiatan';
const DESCRIPTION =
  'Arsip visual resmi rekam jejak pelantikan akbar, musyawarah cabang, konsolidasi kelembagaan tani, serta aksi kemandirian pangan maritim DPC HKTI Kota Batam Periode 2026–2030.';
const OG_IMAGE = absoluteUrl('/images/og-image.jpg');

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Galeri HKTI Batam',
    'Dokumentasi HKTI Batam',
    'Pelantikan HKTI Batam',
    'Petani Batam',
    'Foto Kegiatan HKTI',
    'Arsip Tani Batam',
  ],
  alternates: {
    canonical: '/galeri',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/galeri',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function GaleriPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', path: '/' },
    { name: 'Galeri', path: '/galeri' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GaleriClient />
    </>
  );
}
