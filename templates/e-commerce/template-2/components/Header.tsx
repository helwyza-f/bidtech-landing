'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  // Lock body scroll when mobile menu or drawers are open
  useEffect(() => {
    if (mobileMenuOpen || cartOpen || wishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, cartOpen, wishlistOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.location.pathname === '/') {
        const sections = ['catalog', 'reviews'];
        let current = '';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && window.scrollY >= (element.offsetTop - 300)) {
            current = `#${section}`;
          }
        }
        if (window.scrollY < 100) current = '#catalog';
        setActiveHash((prev) => (prev !== current ? current : prev));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    let isActive = false;
    if (path === '/kisah') {
      isActive = pathname === '/kisah';
    } else if (path === '/detail') {
      isActive = pathname === '/detail' || pathname.startsWith('/product');
    } else {
      isActive = pathname === '/' && (activeHash === path.replace('/', '') || (activeHash === '' && path === '/#catalog'));
    }

    return isActive
      ? 'text-[#1a1c1c] font-semibold border-b-2 border-[#1a1c1c] pb-1 transition-all duration-300'
      : 'text-[#7e7576] font-medium border-b-2 border-transparent hover:text-[#1a1c1c] hover:border-[#1a1c1c] transition-all duration-300 pb-1';
  };

  const navItems = [
    {
      name: 'Katalog Koleksi',
      desc: '8 Varian Air Force 1 Terkurasi',
      href: '/#catalog',
      icon: 'grid_view',
      isActive: pathname === '/' && (activeHash === '#catalog' || activeHash === ''),
    },
    {
      name: 'Detail Sepatu',
      desc: "AF1 '07 Triple Black Full-Grain",
      href: '/detail',
      icon: 'straighten',
      isActive: pathname === '/detail' || pathname.startsWith('/product'),
    },
    {
      name: 'Ulasan Kolektor',
      desc: '248 Ulasan Terverifikasi NFC',
      href: '/#reviews',
      icon: 'verified',
      isActive: pathname === '/' && activeHash === '#reviews',
    },
    {
      name: 'Kisah & Warisan',
      desc: 'Bruce Kilgore & Sejarah 1982',
      href: '/kisah',
      icon: 'history_edu',
      isActive: pathname === '/kisah',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          mobileMenuOpen || !isScrolled
            ? 'bg-white border-b border-[#e2e2e2]'
            : 'bg-white/95 backdrop-blur-md border-b border-[#e2e2e2] shadow-sm'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Brand Logo Cluster */}
          <div className="flex items-baseline space-x-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[20px] font-extrabold tracking-tight text-[#1a1c1c] uppercase"
            >
              FORCEVAULT
            </Link>
            <span className="hidden lg:inline-block font-mono text-[11px] tracking-wider text-[#7e7576] uppercase">
              ARSIP RESMI SEJAK 1982
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[14px]">
            <Link href="/#catalog" className={getLinkClass('/#catalog')}>
              Katalog
            </Link>
            <Link href="/detail" className={getLinkClass('/detail')}>
              Detail Sepatu
            </Link>
            <Link href="/#reviews" className={getLinkClass('/#reviews')}>
              Ulasan
            </Link>
            <Link href="/kisah" className={getLinkClass('/kisah')}>
              Kisah
            </Link>
          </nav>

          {/* Trailing Icon Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Wishlist Button */}
            <button
              aria-label="Lihat Favorit"
              onClick={() => {
                setMobileMenuOpen(false);
                setWishlistOpen(true);
              }}
              className="text-[#1a1c1c] hover:opacity-70 transition-opacity p-2 relative flex items-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span className="absolute top-0.5 right-0.5 font-mono text-[9px] bg-[#e2e2e2] text-[#1a1c1c] px-1 h-3.5 min-w-[14px] flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Shopping Bag Button */}
            <button
              aria-label="Kantong Belanja"
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="text-[#1a1c1c] hover:opacity-70 transition-opacity p-2 relative flex items-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute top-0.5 right-0.5 font-mono text-[9px] bg-[#1a1c1c] text-white px-1 h-3.5 min-w-[14px] flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1a1c1c] p-2 flex items-center border border-[#e2e2e2] bg-[#f9f9f9] active:bg-[#e2e2e2] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 h-[calc(100dvh-4rem)] bg-white z-40 flex flex-col border-t border-[#e2e2e2] overflow-y-auto">
          {/* Top Micro Status Strip */}
          <div className="px-4 py-2.5 bg-[#f9f9f9] border-b border-[#e2e2e2] flex items-center justify-between font-mono text-[10px] text-[#7e7576] shrink-0">
            <span className="flex items-center gap-1.5 text-[#1a1c1c] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              STOK SIAP KIRIM
            </span>
            <span>PENGIRIMAN: JAKARTA PUSAT</span>
          </div>

          {/* Nav Links Stack */}
          <div className="flex-1 px-4 py-3 space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#7e7576] tracking-wider block px-1 pt-1 font-semibold">
              MENU UTAMA ARSIP
            </span>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 border transition-all ${
                  item.isActive
                    ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white shadow-sm'
                    : 'border-[#e2e2e2] bg-white text-[#1a1c1c] hover:border-[#1a1c1c]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      item.isActive ? 'text-white' : 'text-[#7e7576]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-mono text-[13px] font-bold uppercase tracking-wider">
                      {item.name}
                    </div>
                    <div
                      className={`text-[11px] ${
                        item.isActive ? 'text-white/80' : 'text-[#7e7576]'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    item.isActive ? 'text-white' : 'text-[#7e7576]'
                  }`}
                >
                  arrow_forward
                </span>
              </Link>
            ))}

            {/* Direct Quick-Action Buttons */}
            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase text-[#7e7576] tracking-wider block px-1 pb-2 font-semibold">
                AKSES CEPAT
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="p-3 border border-[#e2e2e2] bg-white text-[#1a1c1c] flex items-center justify-between hover:border-[#1a1c1c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span className="font-mono text-[11px] font-bold uppercase">Kantong</span>
                  </div>
                  <span className="font-mono text-[10px] bg-[#1a1c1c] text-white px-1.5 py-0.5 font-bold">
                    0
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWishlistOpen(true);
                  }}
                  className="p-3 border border-[#e2e2e2] bg-white text-[#1a1c1c] flex items-center justify-between hover:border-[#1a1c1c] transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    <span className="font-mono text-[11px] font-bold uppercase">Favorit</span>
                  </div>
                  <span className="font-mono text-[10px] bg-[#e2e2e2] text-[#1a1c1c] px-1.5 py-0.5 font-bold">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer Info */}
          <div className="p-4 bg-[#f9f9f9] border-t border-[#e2e2e2] space-y-2.5 font-mono text-[11px] shrink-0">
            <div className="flex items-center justify-between text-[#7e7576]">
              <span className="uppercase">MATA UANG</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrency('IDR')}
                  className={`font-bold transition-colors ${
                    currency === 'IDR' ? 'text-[#1a1c1c] underline' : 'text-[#7e7576]'
                  }`}
                >
                  IDR (Rp)
                </button>
                <span>/</span>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`font-bold transition-colors ${
                    currency === 'USD' ? 'text-[#1a1c1c] underline' : 'text-[#7e7576]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
            <div className="pt-2 border-t border-[#e2e2e2] flex items-center justify-between text-[10px] text-[#7e7576]">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                VERIFIKASI RESMI NFC
              </span>
              <span>GARANSI 14 HARI</span>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent fixed header from overlapping top content */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* Overlay Backdrop for Drawers */}
      {(cartOpen || wishlistOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] transition-opacity"
          onClick={() => {
            setCartOpen(false);
            setWishlistOpen(false);
          }}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-white z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-[#e2e2e2] mb-6 shrink-0">
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold uppercase text-[#1a1c1c] tracking-tight">
                Kantong Belanja
              </h2>
              <span className="font-mono text-[11px] text-[#7e7576]">0 PRODUK TERPILIH</span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="text-[#7e7576] hover:text-[#1a1c1c] p-2 transition-colors border border-[#e2e2e2] bg-[#f9f9f9]"
              aria-label="Tutup Kantong Belanja"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#f5f5f5] border border-[#e2e2e2] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-[#7e7576]">shopping_bag</span>
            </div>
            <h3 className="font-headline-sm text-base uppercase text-[#1a1c1c] font-bold mb-1">
              Kantong Belanja Anda Kosong
            </h3>
            <p className="font-mono text-[12px] text-[#7e7576] max-w-[260px] leading-relaxed">
              Jelajahi inventaris Nike Air Force 1 asli terverifikasi kami dan tambahkan ke koleksi Anda.
            </p>
            <Link
              href="/#catalog"
              onClick={() => setCartOpen(false)}
              className="mt-6 px-6 py-3 bg-[#1a1c1c] text-white font-mono text-[11px] uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              JELAJAHI KATALOG ARSIP →
            </Link>
          </div>

          <div className="p-4 bg-[#f9f9f9] border border-[#e2e2e2] shrink-0 font-mono text-[10px] text-[#7e7576] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1a1c1c] font-bold">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
              <span>100% PRODUK ASLI DENGAN CHIP NFC</span>
            </div>
            <p>Setiap pasang sepatu diperiksa dan disegel resmi sebelum dikirimkan ke alamat Anda.</p>
          </div>
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-white z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          wishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-[#e2e2e2] mb-6 shrink-0">
            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold uppercase text-[#1a1c1c] tracking-tight">
                Favorit Saya
              </h2>
              <span className="font-mono text-[11px] text-[#7e7576]">0 SILUET TERSIMPAN</span>
            </div>
            <button
              onClick={() => setWishlistOpen(false)}
              className="text-[#7e7576] hover:text-[#1a1c1c] p-2 transition-colors border border-[#e2e2e2] bg-[#f9f9f9]"
              aria-label="Tutup Favorit"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#f5f5f5] border border-[#e2e2e2] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-[#7e7576]">favorite</span>
            </div>
            <h3 className="font-headline-sm text-base uppercase text-[#1a1c1c] font-bold mb-1">
              Belum Ada Item Favorit
            </h3>
            <p className="font-mono text-[12px] text-[#7e7576] max-w-[260px] leading-relaxed">
              Tekan ikon hati pada produk apa pun untuk menyimpannya ke daftar pantauan pribadi Anda.
            </p>
            <Link
              href="/#catalog"
              onClick={() => setWishlistOpen(false)}
              className="mt-6 px-6 py-3 border border-[#1a1c1c] text-[#1a1c1c] font-mono text-[11px] uppercase font-bold tracking-wider hover:bg-[#f9f9f9] transition-colors w-full sm:w-auto"
            >
              LIHAT SEMUA 8 VARIAN →
            </Link>
          </div>

          <div className="p-4 bg-[#f9f9f9] border border-[#e2e2e2] shrink-0 font-mono text-[10px] text-[#7e7576]">
            <span>Favorit Anda tersimpan otomatis untuk memudahkan pemesanan kembali di masa mendatang.</span>
          </div>
        </div>
      </div>
    </>
  );
}
