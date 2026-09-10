import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import KeunggulanSection from '@/components/sections/KeunggulanSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import LocationSection from '@/components/sections/LocationSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <MenuSection />
      <KeunggulanSection />
      <TestimonialSection />
      <LocationSection />
      <Footer />
    </>
  );
}

