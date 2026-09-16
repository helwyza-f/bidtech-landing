import type { Metadata } from 'next';
import '../styles/globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'ELEVASI — Rekayasa Struktural & Konstruksi Umum',
  description: 'Rekayasa Struktural & Konstruksi Umum',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface antialiased font-body-md selection:bg-primary-container selection:text-on-secondary-fixed">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
