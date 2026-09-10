'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Layer 1 (background landscape) — slow parallax
        if (layer1Ref.current && footerRef.current) {
          gsap.fromTo(layer1Ref.current,
            { y: 60 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }

        // Layer 2 (foreground tea leaves) — faster parallax for 3D depth
        if (layer2Ref.current && footerRef.current) {
          gsap.fromTo(layer2Ref.current,
            { y: 80 },
            {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      }, footerRef);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-canvas">

      {/* ── LAYER 1: Landscape Background ── */}
      <div ref={layer1Ref} className="footer-bg-layer">
        <img src="/footer layer 1.webp" alt="Pemandangan Kebun Teh Nusantara" />
        <div className="footer-bg-overlay" />
      </div>

      {/* ── LAYER 2: Tea Leaves Foreground ── */}
      <div ref={layer2Ref} className="footer-leaf-layer">
        <img src="/footer layer 2.webp" alt="Daun Teh Segar" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">

            {/* Col 1: Brand */}
            <div className="footer-brand-col">
              <Link href="#beranda" className="footer-logo-wrap">
                <img
                  src="/assets/individual/02_logo_teh_in.webp"
                  alt="Teh.in"
                  className="footer-logo"
                />
              </Link>
              <p className="footer-brand-desc">
                Menghadirkan kesegaran teh asli dari alam Nusantara untuk hari yang lebih baik.
              </p>
              <p className="footer-script-left">
                Lebih dari<br />Sekadar Teh <i className="ph-fill ph-leaf" />
              </p>
            </div>

            {/* Col 2: Menu */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Menu</h4>
              <nav className="footer-nav-links">
                <Link href="#beranda">Beranda</Link>
                <Link href="#menu">Menu Favorit</Link>
                <Link href="#keunggulan">Keunggulan</Link>
                <Link href="#testimoni">Testimoni</Link>
                <Link href="#lokasi">Lokasi &amp; Kontak</Link>
              </nav>
            </div>

            {/* Col 3: Dukungan */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Dukungan</h4>
              <nav className="footer-nav-links">
                <a href="#">Pertanyaan Umum</a>
                <a href="#">Kebijakan Privasi</a>
                <a href="#">Syarat &amp; Ketentuan</a>
                <a href="#">Hubungi Kami</a>
              </nav>
            </div>

            {/* Col 4: Berlangganan */}
            <div className="footer-subscribe-col">
              <h4 className="footer-col-title">Berlangganan</h4>
              <div className="footer-subscribe-bar" />
              <p className="footer-subscribe-desc">
                Dapatkan informasi promo, menu terbaru dan cerita menarik dari Teh.in
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Teh.in,%20saya%20mau%20berlangganan"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-btn"
              >
                <i className="ph ph-whatsapp-logo" />
                <span>Pesan via WhatsApp</span>
                <i className="ph ph-caret-right" />
              </a>
            </div>

            {/* Col 5: Script Quote */}
            <div className="footer-script-col">
              <p className="footer-script-right">
                Secangkir<br />Teh,<br />Sejuta Cerita <i className="ph-fill ph-leaf" />
              </p>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom-bar">
          <div className="container footer-bottom-inner">
            <p className="footer-copyright">© 2024 Teh.in. Semua Hak Dilindungi.</p>
            <div className="footer-tagline-pills">
              <span><i className="ph-fill ph-leaf" /> 100% Teh Asli</span>
              <span className="sep">|</span>
              <span>Dari Alam Nusantara</span>
              <span className="sep">|</span>
              <span>Untuk Hari yang Lebih Baik</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
