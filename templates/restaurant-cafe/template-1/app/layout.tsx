import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SmoothScroll from '@/components/SmoothScroll';
import { BRAND } from '@/lib/constants';
import '../styles/globals.css';

/**
 * next/font/local: font di-host sendiri, di-inline sebagai CSS variable,
 * dan Next otomatis menyisipkan `font-display: swap` + preload.
 * Hasilnya nol layout shift dan nol request ke server pihak ketiga.
 *
 * File ini variable font (satu file untuk semua ketebalan 200-800),
 * jadi cukup satu unduhan untuk seluruh halaman.
 */
const jakarta = localFont({
  src: '../public/fonts/PlusJakartaSans-VariableFont_wght.ttf',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
});

const siteUrl = 'https://chefstable.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: [{ url: '/assets/banner-1024.webp', width: 1024, height: 576 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
