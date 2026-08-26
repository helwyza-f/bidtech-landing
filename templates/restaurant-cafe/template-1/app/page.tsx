import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        {/* Berikutnya: Menu, Galeri, Testimoni, Lokasi & Jam, FAQ */}
      </main>
      <Footer />
    </>
  );
}
