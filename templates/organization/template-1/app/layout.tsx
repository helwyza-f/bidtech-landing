import type { Metadata } from 'next';
import '../styles/globals.css';
import { ORGANIZATION } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: `${ORGANIZATION.name} - ${ORGANIZATION.tagline}`,
  description: ORGANIZATION.description,
  keywords: [
    'Yayasan Sosial',
    'Organisasi Nirlaba Indonesia',
    'Pendidikan Pelosok',
    'Pemberdayaan Masyarakat',
    'Lingkungan Hidup',
    'Donasi Indonesia',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased selection:bg-blue-500 selection:text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
