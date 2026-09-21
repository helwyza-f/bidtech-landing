import type { Metadata } from 'next';
import '../styles/globals.css';
import { COMPANY_INFO } from '@/lib/constants';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: `PT Afindo Construction — Rekayasa Sub-Struktur & Konstruksi Deep Foundation`,
  description: 'Pondasi kokoh, tanpa kekacauan operasional. Setiap proyek megah berdiri di atas fondasi yang presisi, pemancangan andal, dan eksekusi teknik tanpa kompromi.',
  keywords: [
    'rekayasa sub-struktur',
    'konstruksi pondasi',
    'deep foundation',
    'bore pile',
    'geoteknik',
    'jet grouting',
    'dewatering'
  ],
  openGraph: {
    title: `PT Afindo Construction — Rekayasa Sub-Struktur & Konstruksi Deep Foundation`,
    description: 'Pondasi kokoh, tanpa kekacauan operasional. Setiap proyek megah berdiri di atas fondasi yang presisi, pemancangan andal, dan eksekusi teknik tanpa kompromi.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body className="bg-brand-bgPaper dark:bg-brand-black text-brand-black dark:text-white font-sans antialiased selection:bg-brand-sandDark selection:text-brand-black overflow-x-hidden transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
