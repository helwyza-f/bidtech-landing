'use client';

import Link from 'next/link';
import { SOCIAL_LINKS, ORGANIZATION, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A3C34] text-gray-200 pt-16 pb-10 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/"} className="flex items-center gap-2.5 group shrink-0">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/images/logo.webp"}
                  alt="BIDTECH Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </a>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {ORGANIZATION.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SOCIAL_LINKS.website}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Website"
              >
                <svg className="w-3.5 h-3.5 fill-current" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.947v1.986c0 .59-.477 1.067-1.067 1.067s-1.067-.477-1.067-1.067v-1.986c-2.316-.363-4.133-2.18-4.496-4.496h1.986c.59 0 1.067-.477 1.067-1.067s-.477-1.067-1.067-1.067h-1.986c.363-2.316 2.18-4.133 4.496-4.496v1.986c0 .59.477 1.067 1.067 1.067s1.067-.477 1.067-1.067v-1.986c2.316.363 4.133 2.18 4.496 4.496h-1.986c-.59 0-1.067.477-1.067 1.067s.477 1.067 1.067 1.067h1.986c-.363 2.316-2.18 4.133-4.496 4.496z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" width="14" height="14" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              NAVIGASI
            </h4>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ikut Terlibat */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              IKUT TERLIBAT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#kontak" className="text-gray-300 hover:text-white transition-colors">
                  Jadi Relawan
                </Link>
              </li>
              <li>
                <Link href="/#kontak" className="text-gray-300 hover:text-white transition-colors">
                  Donasi
                </Link>
              </li>
              <li>
                <Link href="/#kontak" className="text-gray-300 hover:text-white transition-colors">
                  Kemitraan
                </Link>
              </li>
              <li>
                <Link href="/#kontak" className="text-gray-300 hover:text-white transition-colors">
                  Karir & Magang
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Berita / Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              BERITA
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Dapatkan berita terbaru dan laporan program sosial bulanan langsung ke email Anda.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#E05A47] hover:bg-[#CF4D3B] text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} BIDTECH. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
