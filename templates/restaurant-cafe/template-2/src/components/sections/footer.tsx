"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  ArrowUp,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Utensils,
  CheckCircle2,
  Calendar,
  Flame,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { RevealText } from "@/components/ui/reveal-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const culinaryImages = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const linksGridRef = useRef<HTMLDivElement>(null);
  const megaTextRef = useRef<HTMLHeadingElement>(null);

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeString, setTimeString] = useState("");

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Hero CTA Reveal
      if (heroCtaRef.current) {
        gsap.from(heroCtaRef.current, {
          scrollTrigger: {
            trigger: heroCtaRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      // Feature Info Cards Stagger
      if (cardsGridRef.current) {
        gsap.from(cardsGridRef.current.children, {
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          stagger: 0.14,
          duration: 0.85,
          ease: "power3.out",
        });
      }

      // Links & Newsletter Stagger
      if (linksGridRef.current) {
        gsap.from(linksGridRef.current.children, {
          scrollTrigger: {
            trigger: linksGridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Mega Background Kinetic Text Parallax Scrub
      if (megaTextRef.current) {
        gsap.fromTo(
          megaTextRef.current,
          { y: 70, opacity: 0.12 },
          {
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1.2,
            },
            y: -20,
            opacity: 0.4,
            ease: "none",
          }
        );
      }
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, "top 80px");
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2800);
  };

  const navLinks = [
    { label: "Our Specialties", href: "#categories" },
    { label: "Signature Dishes", href: "#dishes" },
    { label: "Interactive Menu", href: "#menu" },
    { label: "Our Story & Quality", href: "#story" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-screen bg-white dark:bg-[#0a0a0d] text-foreground dark:text-white pt-20 md:pt-32 pb-12 overflow-hidden flex flex-col justify-between transition-colors duration-300"
    >
      {/* Dynamic Ambient Backdrops */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[170px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="container-app relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Hero Statement & Major Call to Action */}
        <div ref={heroCtaRef} className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <p className="text-eyebrow mb-4 tracking-widest text-brand-500">
            Experience The Obsession
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground dark:text-white leading-tight text-balance mb-6">
            Crafted for people who{" "}
            <DynamicTextSlider>
              <RevealText
                text="CARE"
                textColor="text-foreground dark:text-white"
                overlayColor="text-brand-500"
                letterImages={culinaryImages}
                className="font-display"
              />
            </DynamicTextSlider>{" "}
            about great food.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            From our 900°F wood-fired ovens to silky daily hand-rolled pasta,
            we invite you to experience dining without compromises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              onClick={(e) => handleNavClick(e, "#menu")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-base shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Utensils className="size-4.5" />
              Explore Full Menu
              <ArrowRight className="size-4.5" />
            </a>

            <a
              href="tel:+1234567890"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-foreground dark:text-white font-semibold text-base backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Calendar className="size-4 text-brand-500" />
              Reserve A Table
            </a>
          </div>
        </div>

        {/* 3 Bento-Style Atmosphere Cards */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto w-full mb-16 md:mb-24"
        >
          {/* Card 1: Flagship Location */}
          <div className="relative rounded-[28px] bg-neutral-50 dark:bg-gradient-to-br dark:from-[#16161a] dark:to-[#111114] p-7 md:p-8 shadow-sm dark:shadow-xl overflow-hidden group hover:bg-neutral-100 dark:hover:bg-[#1a1a1f] transition-all duration-300">
            <div className="size-11 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5 text-brand-500">
              <MapPin className="size-5" />
            </div>
            <h4 className="font-display font-bold text-xl text-foreground dark:text-white mb-2">
              Downtown Flagship
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
              742 Gourmet Avenue, Downtown Culinary District. Complimentary valet parking available.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Today: 10:00 AM – 11:30 PM
            </div>
          </div>

          {/* Card 2: Culinary Craft */}
          <div className="relative rounded-[28px] bg-neutral-50 dark:bg-gradient-to-br dark:from-[#16161a] dark:to-[#111114] p-7 md:p-8 shadow-sm dark:shadow-xl overflow-hidden group hover:bg-neutral-100 dark:hover:bg-[#1a1a1f] transition-all duration-300">
            <div className="size-11 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5 text-brand-500">
              <Flame className="size-5" />
            </div>
            <h4 className="font-display font-bold text-xl text-foreground dark:text-white mb-2">
              Artisan Technique
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
              48-hour cold fermentation, imported Italian flour, grass-fed Angus beef, and bronze-die extruded pasta.
            </p>
            <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">
              Zero Artificial Preservatives · 100% Scratch
            </span>
          </div>

          {/* Card 3: Private Dining & Tasting Table */}
          <div className="relative rounded-[28px] bg-neutral-50 dark:bg-gradient-to-br dark:from-[#16161a] dark:to-[#111114] p-7 md:p-8 shadow-sm dark:shadow-xl overflow-hidden group hover:bg-neutral-100 dark:hover:bg-[#1a1a1f] transition-all duration-300">
            <div className="size-11 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5 text-brand-500">
              <Clock className="size-5" />
            </div>
            <h4 className="font-display font-bold text-xl text-foreground dark:text-white mb-2">
              Hours & Inquiries
            </h4>
            <div className="space-y-1 text-xs md:text-sm text-foreground/80 dark:text-gray-300 mb-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mon – Thu</span>
                <span>10:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between font-semibold text-brand-500">
                <span>Fri – Sat</span>
                <span>10:00 AM – 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span>11:00 AM – 09:30 PM</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground block truncate">
              Direct Concierge: +1 (555) 890-3421
            </span>
          </div>
        </div>

        {/* 4 Columns: Navigation, Socials, Newsletter */}
        <div
          ref={linksGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-14 pt-4 border-t border-border/40 dark:border-white/5"
        >
          {/* Brand Info */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display font-black text-2xl md:text-3xl tracking-tight text-foreground dark:text-white hover:text-brand-500 transition-colors inline-block mb-3"
            >
              Deny Restaurant<span className="text-brand-500">.</span>
            </a>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
              Modern artisanal bistro celebrating wood-fired sourdough pizza, smash burgers, and fresh pasta.
            </p>
            <div className="text-xs text-muted-foreground">
              Local Kitchen Time: <span className="text-foreground dark:text-gray-300 font-mono font-semibold">{timeString || "11:55 AM"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground dark:text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs md:text-sm text-muted-foreground hover:text-brand-500 transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="size-1 rounded-full bg-brand-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Ecosystem */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground dark:text-white mb-4">
              Social Community
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Follow our daily kitchen specials, behind-the-scenes dough fermentation, and secret off-menu drops.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaInstagram className="size-4.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaTiktok className="size-4.5" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="size-10 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
              >
                <FaWhatsapp className="size-4.5" />
              </a>
            </div>
          </div>

          {/* Tasting Club Newsletter */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground dark:text-white mb-4">
              The Tasting Club
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Subscribe to receive weekly chef notes, private tasting invitations, and special perks.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>You're enrolled in the Tasting Club!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 text-foreground dark:text-white text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition-all duration-200 cursor-pointer"
                >
                  Join Tasting Table
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mega Giant Brand Kinetic Text */}
        <div className="relative py-2 text-center select-none overflow-hidden pointer-events-none">
          <h2
            ref={megaTextRef}
            className="font-display font-black text-[11vw] leading-[0.8] tracking-[-0.05em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-black/10 via-black/5 to-transparent dark:from-white/20 dark:via-white/10 to-transparent will-change-transform"
          >
            DENY RESTAURANT
          </h2>
        </div>

        {/* Bottom Utility Bar & GSAP Back to Top */}
        <div className="pt-6 border-t border-border/40 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Deny Restaurant. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-500 transition-colors">Terms of Dining</a>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-brand-500 text-foreground dark:text-white hover:text-white font-semibold transition-all duration-300 cursor-pointer shadow-xs"
          >
            <span>Back to top</span>
            <div className="size-6 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
