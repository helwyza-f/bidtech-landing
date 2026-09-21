import type { Metadata } from 'next';
import '../styles/globals.css';
import { COMPANY_INFO } from '@/lib/constants';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} — ${COMPANY_INFO.tagline}`,
  description: COMPANY_INFO.description,
  keywords: [
    'sewa alat berat',
    'dump truck tambang',
    'cat 797f',
    'excavator 30 ton',
    'crane all terrain',
    'kontraktor infrastruktur',
    'jaya wijaya group',
  ],
  openGraph: {
    title: `${COMPANY_INFO.name} — ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-sans selection:bg-orange-600 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
