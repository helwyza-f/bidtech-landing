"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";

interface FooterProps {
  lang: "en" | "id";
}

export default function Footer({ lang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        {/* Brand Headline & Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <h3 className="text-sm font-black tracking-widest uppercase text-white">
              BUILDINGBLOCKS
            </h3>
            <p className="text-neutral-400 max-w-xs leading-relaxed">
              {lang === "en" ? "We design. We build. We inspire." : "Kami merancang. Kami membangun. Kami menginspirasi."}
            </p>
            <p className="text-neutral-500 text-[11px] pt-4 font-mono">
              © {new Date().getFullYear()} BuildingBlocks. All rights reserved.
            </p>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block">
              {lang === "en" ? "Company" : "Perusahaan"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#philosophy" className="hover:text-white transition-colors">{lang === "en" ? "About Us" : "Tentang Kami"}</Link></li>
              <li><Link href="#philosophy" className="hover:text-white transition-colors">{lang === "en" ? "Our Team" : "Tim Kami"}</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">{lang === "en" ? "Careers" : "Karir"}</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">{lang === "en" ? "News" : "Berita"}</Link></li>
            </ul>
          </div>

          {/* Column 2: Properties */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block">
              {lang === "en" ? "Properties" : "Properti"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#properties" className="hover:text-white transition-colors">{lang === "en" ? "All Properties" : "Semua Properti"}</Link></li>
              <li><Link href="#properties" className="hover:text-white transition-colors">{lang === "en" ? "Villas" : "Vila"}</Link></li>
              <li><Link href="#properties" className="hover:text-white transition-colors">{lang === "en" ? "Apartments" : "Apartemen"}</Link></li>
              <li><Link href="#properties" className="hover:text-white transition-colors">{lang === "en" ? "Penthouses" : "Penthouse"}</Link></li>
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block">
              {lang === "en" ? "Locations" : "Lokasi"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="#locations" className="hover:text-white transition-colors">Dubai</Link></li>
              <li><Link href="#locations" className="hover:text-white transition-colors">Zurich</Link></li>
              <li><Link href="#locations" className="hover:text-white transition-colors">Singapore</Link></li>
              <li><Link href="#locations" className="hover:text-white transition-colors">Jakarta</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-3">
            <span className="font-bold tracking-wider uppercase text-neutral-300 block">
              {lang === "en" ? "Follow Us" : "Ikuti Kami"}
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Instagram className="w-3 h-3" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Youtube className="w-3 h-3" /> YouTube
                </a>
              </li>
              <li>
                <a href="https://wa.me/923199492066" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-neutral-900 flex items-center justify-between text-neutral-500 text-[11px] font-mono">
          <div>
            ARCHITECTURAL DESIGN SYSTEM • SWISS GRID SPECIFICATION
          </div>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
