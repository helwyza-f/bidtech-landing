import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Fleet from '@/components/Fleet';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Fleet />
      <About />
      <FAQ />
      <Footer />
    </main>
  );
}
