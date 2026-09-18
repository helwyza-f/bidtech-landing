'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Metrics from '@/components/Metrics';
import Footer from '@/components/Footer';
import TechnicalModal from '@/components/TechnicalModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Home() {
  const [modalData, setModalData] = useState<any>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // General Section Heading Animations
    gsap.utils.toArray('section:not(#beranda) h2').forEach((heading: any) => {
      gsap.fromTo(heading, 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Services onOpenModal={setModalData} />
        <Projects onOpenModal={setModalData} />
        <Metrics />
      </main>
      <Footer />
      <TechnicalModal data={modalData} onClose={() => setModalData(null)} />
    </>
  );
}
