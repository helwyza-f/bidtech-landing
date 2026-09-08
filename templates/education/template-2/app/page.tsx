"use client";

import { useConsultModal } from "@/components/providers/consult-modal-provider";
import { HeroSection } from "@/components/home/hero-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { CoursesSection } from "@/components/home/courses-section";
import { BootcampSection } from "@/components/home/bootcamp-section";
import { ScholarshipSection } from "@/components/home/scholarship-section";
import { MentorsSection } from "@/components/home/mentors-section";
import { AboutSection } from "@/components/home/about-section";
import { EventsSection } from "@/components/home/events-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  const { openConsult, openInterestTest } = useConsultModal();

  return (
    <main id="konten">
      <HeroSection onOpenInterestTest={openInterestTest} />
      <ProgramsSection />
      <CoursesSection />
      <BootcampSection onOpenConsult={openConsult} />
      <ScholarshipSection />
      <MentorsSection />
      <AboutSection />
      <EventsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection onOpenInterestTest={openInterestTest} />
    </main>
  );
}