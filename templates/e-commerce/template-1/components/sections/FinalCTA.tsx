"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal on scroll
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Breathing glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.85,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-ink-900 overflow-hidden relative">
      {/* Decorative Animated Glow */}
      <div 
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle at center, rgba(217, 164, 65, 0.22), transparent 60%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-[36px] md:text-[52px] font-bold text-white leading-[1.1] tracking-[-0.03em] mb-6">
          Siap Menemukan <span className="text-gold-500">Smartphone Impianmu?</span>
        </h2>
        <p className="text-txt-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Konsultasikan kebutuhan smartphone kamu bersama tim KONTERKU. Kami siap memberikan rekomendasi terbaik.
        </p>
        
        <a
          href="https://wa.me/123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center rounded-xl bg-gold-500 px-8 py-4 text-base font-bold text-ink-900 shadow-sm hover:bg-gold-600 transition-all hover:-translate-y-1 hover:shadow-soft-hover"
        >
          Chat WhatsApp Sekarang <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
