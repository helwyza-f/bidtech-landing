import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Workflow from '@/components/Workflow';
import Safety from '@/components/Safety';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Workflow />
        <Safety />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
