import React from 'react';
import Header from '@/components/Header';
import StoryPage from '@/components/StoryPage';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'Kisah & Warisan — FORCEVAULT',
  description: 'Rekam jejak arsitektural lengkap lahirnya siluet ikonik Nike Air Force 1 dari tahun 1982 hingga saat ini.',
};

export default function KisahPage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <StoryPage />
      </main>
      <Footer />
    </>
  );
}
