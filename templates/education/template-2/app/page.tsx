"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ConsultModal, type ConsultModalType } from "@/components/ui/consult-modal";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { PartnersSection } from "@/components/home/partners-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { CoursesSection } from "@/components/home/courses-section";
import { MethodSection } from "@/components/home/method-section";
import { BootcampSection } from "@/components/home/bootcamp-section";
import { ScholarshipSection } from "@/components/home/scholarship-section";
import { MentorsSection } from "@/components/home/mentors-section";
import { CareerSection } from "@/components/home/career-section";
import { AboutSection } from "@/components/home/about-section";
import { EventsSection } from "@/components/home/events-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ConsultModalType>("konsultasi");

  const openConsult = () => {
    setModalType("konsultasi");
    setModalOpen(true);
  };

  const openInterestTest = () => {
    setModalType("tes-minat");
    setModalOpen(true);
  };

  return (
    <div className="bg-background text-foreground antialiased selection:bg-brand/15 selection:text-foreground">
      <SiteHeader onOpenConsult={openConsult} />

      <main id="konten">
        <HeroSection onOpenConsult={openConsult} onOpenInterestTest={openInterestTest} />
        <StatsSection />
        <PartnersSection />
        <ProgramsSection />
        <CoursesSection onOpenConsult={openConsult} />
        <MethodSection />
        <BootcampSection onOpenConsult={openConsult} />
        <ScholarshipSection onOpenConsult={openConsult} />
        <MentorsSection />
        <CareerSection />
        <AboutSection onOpenConsult={openConsult} />
        <EventsSection onOpenConsult={openConsult} />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection onOpenInterestTest={openInterestTest} />
      </main>

      <SiteFooter />

      <ConsultModal open={modalOpen} type={modalType} onClose={() => setModalOpen(false)} />
    </div>
  );
}
