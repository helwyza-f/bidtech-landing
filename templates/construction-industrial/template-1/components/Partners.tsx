"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".partner-logo", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.from(".cert-badge", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      x: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-on-secondary-fixed text-surface border-y border-outline-variant/20 py-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-12 opacity-80">
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">COZYNEST</span>
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">ENERGETIX</span>
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">NEXATECH</span>
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">LUXEAURA</span>
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">DIGIMINDS</span>
            <span className="partner-logo font-headline-sm text-headline-sm uppercase tracking-widest text-surface-dim">BUILDPRO</span>
          </div>
          <div className="h-8 w-[1px] bg-secondary hidden lg:block"></div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="cert-badge border border-secondary px-3 py-1.5 rounded-full flex items-center gap-2 text-surface hover:bg-surface/10 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary-container text-sm">verified</span>
              <span className="font-label-technical text-label-technical uppercase">TERSertifikasi LPJK</span>
            </div>
            <div className="cert-badge border border-secondary px-3 py-1.5 rounded-full flex items-center gap-2 text-surface hover:bg-surface/10 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary-container text-sm">shield</span>
              <span className="font-label-technical text-label-technical uppercase">KEPATUHAN K3 SMK3</span>
            </div>
            <div className="cert-badge border border-secondary px-3 py-1.5 rounded-full flex items-center gap-2 text-surface hover:bg-surface/10 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary-container text-sm">fact_check</span>
              <span className="font-label-technical text-label-technical uppercase">ISO 45001</span>
            </div>
            <div className="cert-badge border border-secondary px-3 py-1.5 rounded-full flex items-center gap-2 text-surface hover:bg-surface/10 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary-container text-sm">workspace_premium</span>
              <span className="font-label-technical text-label-technical uppercase">ISO 9001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
