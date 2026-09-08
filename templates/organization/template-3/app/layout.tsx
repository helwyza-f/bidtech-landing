import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DPC HKTI Kota Batam — Himpunan Kerukunan Tani Indonesia (2026–2030)',
  description:
    'Situs resmi Dewan Pimpinan Cabang HKTI Kota Batam Periode 2026–2030. Menghimpun potensi petani, memodernisasi agribisnis, dan memperjuangkan kedaulatan pangan maritim nusantara.',
  keywords: [
    'HKTI Batam',
    'DPC HKTI Kota Batam',
    'Pertanian Batam',
    'Kedaulatan Pangan',
    'Petani Batam',
    'Agribisnis Batam',
  ],
  authors: [{ name: 'DPC HKTI Kota Batam' }],
  icons: {
    icon: '/images/logo1.webp',
  },
  openGraph: {
    title: 'DPC HKTI Kota Batam — Himpunan Kerukunan Tani Indonesia',
    description:
      'Situs resmi Dewan Pimpinan Cabang HKTI Kota Batam Periode 2026–2030. Semboyan: HKTI JAYA – TANI MAKMUR.',
    url: 'https://hktibatam.id',
    siteName: 'DPC HKTI Kota Batam',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="bg-[#FAFAFA] text-hkti-slate font-sans antialiased selection:bg-hkti-gold selection:text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
