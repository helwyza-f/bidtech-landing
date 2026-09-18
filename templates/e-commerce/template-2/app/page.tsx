import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCollection from '@/components/ProductCollection';
import EditorialShowcase from '@/components/EditorialShowcase';
import CollectorReviews from '@/components/CollectorReviews';
import BrandStory from '@/components/BrandStory';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductCollection />
        <EditorialShowcase />
        <CollectorReviews />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
