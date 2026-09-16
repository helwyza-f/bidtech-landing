import React from 'react';
import Header from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: "Detail Produk — FORCEVAULT",
  description: 'Spesifikasi & Pembelian Resmi Nike Air Force 1.',
};

export default function DetailPage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <ProductDetail id="1" />
      </main>
      <Footer />
    </>
  );
}
