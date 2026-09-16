import React from 'react';
import Header from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: "Nike Air Force 1 '07 Triple Black — FORCEVAULT",
  description: 'Arsip & Spesifikasi Struktural Resmi Nike Air Force 1 07 Triple Black.',
};

export function generateStaticParams() {
  return [{ id: '1' }];
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <ProductDetail id={params.id} />
      </main>
      <Footer />
    </>
  );
}
