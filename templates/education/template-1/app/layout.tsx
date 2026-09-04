import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '@/styles/globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScroll';
import { ModalProvider } from '@/lib/ModalContext';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmartBelajar — Bimbingan Belajar Anak Usia 4-12 Tahun Terpercaya',
  description:
    'SmartBelajar menghadirkan bimbingan belajar anak dengan metode fun-learning interaktif, pendidik bersertifikasi psikologi anak, dan kurikulum terpersonalisasi untuk Calistung, Logika Matematika, English for Kids, dan Sains.',
  keywords: [
    'bimbel anak',
    'bimbingan belajar anak',
    'calistung ceria',
    'les membaca anak',
    'matematika kreatif',
    'english for kids',
    'smartbelajar',
    'les privat anak tk sd',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="font-nunito bg-white text-brand-navy antialiased selection:bg-brand-orange selection:text-white">
        <SmoothScrollProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
