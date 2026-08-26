import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Team from '@/components/sections/Team';
import Programs from '@/components/sections/Programs';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Beranda */}
      <Hero />

      {/* 2. Tentang Kami */}
      <About />

      {/* 3. Pengurus & Tim */}
      <Team />

      {/* 4. Program */}
      <Programs limit={3} showFilters={false} showViewAllButton={true} />

      {/* 5. Galeri */}
      <Gallery />

      {/* 6. Testimoni */}
      <Testimonials />

      {/* 7. Hubungi Kami */}
      <Contact />
    </main>
  );
}
