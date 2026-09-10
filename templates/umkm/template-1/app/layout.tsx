import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://tehin.id'),
  title: 'Teh.in — Kesegaran Teh Asli Nusantara',
  description: 'Diseduh segar setiap 4 jam dari pucuk daun teh pegunungan nusantara dengan perasan lemon murni dan gula tebu asli. Nikmati kesegaran alami yang bikin semangat balik lagi!',
  keywords: [
    'teh asli',
    'es teh nusantara',
    'teh lemon segar',
    'minuman umkm',
    'teh.in',
    'teh melati',
    'franchise teh',
    'minuman segar batam',
  ],
  authors: [{ name: 'Teh.in Indonesia' }],
  openGraph: {
    title: 'Teh.in — Kesegaran Teh Asli Nusantara',
    description: 'Kesegaran teh asli pegunungan nusantara yang diseduh segar setiap 4 jam. 100% gula tebu murni tanpa pemanis buatan.',
    url: 'https://tehin.id',
    siteName: 'Teh.in Indonesia',
    images: [
      {
        url: '/assets/individual/01_teh_in_minuman_tatakan_buah.webp',
        width: 1200,
        height: 630,
        alt: 'Teh.in Es Teh Lemon Segar',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/assets/individual/03_icon_daun_teh.webp',
  },
};

export const viewport: Viewport = {
  themeColor: '#2D4A27',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:wght@600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
