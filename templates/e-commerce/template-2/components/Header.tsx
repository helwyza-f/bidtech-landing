'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      if (window.location.pathname === '/') {
        const sections = ['catalog', 'silhouette-archive', 'reviews'];
        let current = '';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && window.scrollY >= (element.offsetTop - 300)) {
            current = `#${section}`;
          }
        }
        if (window.scrollY < 100) current = '#catalog';
        setActiveHash(prev => prev !== current ? current : prev);
      }
    };
    
    // initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (path: string) => {
    let isActive = false;
    if (path === '/kisah') {
      isActive = pathname === '/kisah';
    } else {
      isActive = pathname === '/' && (activeHash === path.replace('/', '') || (activeHash === '' && path === '/#catalog'));
    }

    return isActive
      ? "text-[#1a1c1c] font-semibold border-b-2 border-[#1a1c1c] pb-1 transition-all duration-300"
      : "text-[#7e7576] font-medium border-b-2 border-transparent hover:text-[#1a1c1c] hover:border-[#1a1c1c] transition-all duration-300 pb-1";
  };

  return (
    <header className={`sticky top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-lg border-b border-[#e2e2e2]/50 shadow-sm' : 'bg-white border-b border-[#e2e2e2]'}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Brand Logo Cluster */}
        <div className="flex items-baseline space-x-3">
          <Link
            href="/"
            className="text-[20px] font-extrabold tracking-tight text-[#1a1c1c] uppercase"
          >
            FORCEVAULT
          </Link>
          <span className="hidden lg:inline-block font-mono text-[11px] tracking-wider text-[#7e7576] uppercase">
            ARSIP RESMI SEJAK 1982
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[14px]">
          <Link href="/#catalog" className={getLinkClass('/#catalog')}>
            Katalog
          </Link>
          <Link href="/#silhouette-archive" className={getLinkClass('/#silhouette-archive')}>
            Arsip Siluet
          </Link>
          <Link href="/#reviews" className={getLinkClass('/#reviews')}>
            Ulasan
          </Link>
          <Link href="/kisah" className={getLinkClass('/kisah')}>
            Kisah
          </Link>
        </nav>

        {/* Trailing Icon Actions */}
        <div className="flex items-center space-x-5">
          {/* Wishlist */}
          <button
            aria-label="Lihat Favorit"
            onClick={() => setWishlistOpen(true)}
            className="text-[#1a1c1c] hover:opacity-70 transition-opacity p-1 relative flex items-center"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            <span className="absolute -top-1 -right-1.5 font-mono text-[9px] bg-[#e2e2e2] text-[#1a1c1c] px-1 h-3.5 flex items-center justify-center font-bold">
              0
            </span>
          </button>

          {/* Shopping Bag */}
          <button
            aria-label="Kantong Belanja"
            onClick={() => setCartOpen(true)}
            className="text-[#1a1c1c] hover:opacity-70 transition-opacity p-1 relative flex items-center"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="absolute -top-1 -right-1.5 font-mono text-[9px] bg-[#1a1c1c] text-white px-1 h-3.5 flex items-center justify-center font-bold">
              0
            </span>
          </button>

          {/* Mobile Menu trigger */}
          <button
            aria-label="Buka Menu Navigasi"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1a1c1c] p-1 flex items-center"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full border-t border-[#e2e2e2] bg-white px-4 py-4 space-y-3 shadow-xl">
          <Link
            href="/#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-mono text-sm uppercase text-[#1a1c1c] border-b border-[#e2e2e2]"
          >
            Katalog
          </Link>
          <Link
            href="/#silhouette-archive"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-mono text-sm uppercase text-[#7e7576] hover:text-[#1a1c1c] border-b border-[#e2e2e2]"
          >
            Arsip Siluet
          </Link>
          <Link
            href="/#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-mono text-sm uppercase text-[#7e7576] hover:text-[#1a1c1c] border-b border-[#e2e2e2]"
          >
            Ulasan
          </Link>
          <Link
            href="/kisah"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-mono text-sm uppercase text-[#7e7576] hover:text-[#1a1c1c]"
          >
            Kisah
          </Link>
        </div>
      )}

      {/* Overlay Backdrop */}
      {(cartOpen || wishlistOpen) && (
        <div 
          className="fixed top-0 left-0 w-full h-[100dvh] bg-black/40 backdrop-blur-sm z-[90] transition-opacity"
          onClick={() => { setCartOpen(false); setWishlistOpen(false); }}
        ></div>
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] bg-white z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="font-headline-sm text-headline-sm uppercase text-[#1a1c1c] tracking-tighter">Kantong Belanja</h2>
            <button onClick={() => setCartOpen(false)} className="text-[#7e7576] hover:text-[#1a1c1c] transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[48px] text-[#e2e2e2] mb-4">shopping_bag</span>
            <p className="font-mono-spec text-mono-spec text-[#7e7576] uppercase">Keranjang Anda masih kosong</p>
            <button onClick={() => setCartOpen(false)} className="mt-6 px-6 py-3 bg-[#1a1c1c] text-white font-mono-label uppercase text-[12px] hover:bg-[#333] transition-colors tracking-widest">Mulai Belanja</button>
          </div>
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] bg-white z-[100] transform transition-transform duration-300 ease-in-out shadow-2xl ${wishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="font-headline-sm text-headline-sm uppercase text-[#1a1c1c] tracking-tighter">Favorit Saya</h2>
            <button onClick={() => setWishlistOpen(false)} className="text-[#7e7576] hover:text-[#1a1c1c] transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[48px] text-[#e2e2e2] mb-4">favorite</span>
            <p className="font-mono-spec text-mono-spec text-[#7e7576] uppercase">Belum ada item favorit</p>
            <button onClick={() => setWishlistOpen(false)} className="mt-6 px-6 py-3 border border-[#1a1c1c] text-[#1a1c1c] font-mono-label uppercase text-[12px] hover:bg-[#f9f9f9] transition-colors tracking-widest">Jelajahi Katalog</button>
          </div>
        </div>
      </div>
    </header>
  );
}
