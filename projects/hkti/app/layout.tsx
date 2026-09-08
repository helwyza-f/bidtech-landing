import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { SITE_INFO } from '@/constants';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const BRAND_TITLE = 'DPC HKTI Kota Batam';
const TITLE = `${BRAND_TITLE} — Periode 2026–2030`;
const DESCRIPTION =
  'Situs resmi Dewan Pimpinan Cabang HKTI Kota Batam Periode 2026–2030. Menghimpun potensi petani, memodernisasi agribisnis, dan memperjuangkan kedaulatan pangan maritim nusantara.';
const OG_IMAGE = absoluteUrl('/images/og-image.jpg');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${BRAND_TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    'HKTI Batam',
    'DPC HKTI Kota Batam',
    'Pertanian Batam',
    'Kedaulatan Pangan',
    'Petani Batam',
    'Agribisnis Batam',
  ],
  authors: [{ name: SITE_INFO.name }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: SITE_INFO.name,
    locale: 'id_ID',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [getOrganizationSchema(), getWebSiteSchema()];

  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAFAFA] text-hkti-slate font-sans antialiased selection:bg-hkti-gold selection:text-white min-h-screen" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
