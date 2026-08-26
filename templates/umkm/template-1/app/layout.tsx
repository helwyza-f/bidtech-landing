import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Template Name',
  description: 'Template description',
  keywords: ['keyword1', 'keyword2'],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
