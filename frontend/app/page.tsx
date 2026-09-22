"use client";

import { HeroSection } from "@/components/home/sections/hero/hero-section";
import { TemplatePreviewSection } from "@/components/home/sections/template-preview-section";
import { TutorialSection } from "@/components/home/sections/tutorial-section";
import { ServicesSection } from "@/components/home/sections/services-section";
import { MitraSection } from "@/components/home/sections/mitra-section";
import { ContactSection } from "@/components/home/sections/contact-section";
import { CtoSection } from "@/components/home/sections/cto-section";

export default function Home() {
  return (
    <main className="landing-shell relative overflow-hidden bg-white">
      <HeroSection />
      <TemplatePreviewSection />
      <TutorialSection />
      <ServicesSection />
      <MitraSection />
      <ContactSection />
      <CtoSection />
    </main>
  );
}
