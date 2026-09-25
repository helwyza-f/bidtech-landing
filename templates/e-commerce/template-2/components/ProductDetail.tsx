'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductDetailProps {
  id?: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState('27.0 cm');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeModal, setActiveModal] = useState<'authenticity' | 'shipping' | 'sizeChart' | null>(null);

  useEffect(() => {
    if (activeModal) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const prevBodyPosition = document.body.style.position;
      const prevBodyTop = document.body.style.top;
      const prevBodyWidth = document.body.style.width;
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveModal(null);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.position = prevBodyPosition;
        document.body.style.top = prevBodyTop;
        document.body.style.width = prevBodyWidth;
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.scrollTo(0, scrollY);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModal]);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.pdetail-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  const galleryImages = [
    {
      label: 'Utama',
      fullLabel: 'Profil Utama',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2stY4B_rq1dZGDwnXYrSuSMMyv2mpySsD_KpAv_BMgHxVeMhYsQfVdKEzTEeBBwnHKVepvThxDqwxcg_ZMA_6Esx_sohBu-7ii5Yx2QYbnvMiiAQw_sfz1fwg41xCCMwPKxym1U0ztycPvCSsx0DcLpP82TLYMcq8pQJYA1kWpbDKQ5MkQIs-Ay1A77L6AOVKxMbEm7FKhxbdvLL9JKCkjcj5pJ8eKwhK_7ywbK0rPq5zrAvDacS',
    },
    {
      label: 'Samping',
      fullLabel: 'Sudut Lateral',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0L5OOr9oHf7I4Z2sJG4DU_MN_upyPffCxHRAg8r3UDEVON3ihQDxvzXd9YBgPJO39huthO1k9uMJufcoU6UXwHZQZ2tVUKkjrk3Cjw3dfpVDq_pBu8pxUhisi76tpAlQsLatRB-3bkanQzsmdOMfWaNUQzqMvdIw8tGid_3MS3F8uh-373kLrZ0r4WR_OlPgGdLp0yO6eG21OuipNRHIH-xBdjZJzUiqqgRI1MTbOYD5a1zjMLqI5',
    },
    {
      label: 'Sol',
      fullLabel: 'Sol & Traksi',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqqRGUraQGnRBcovs-Lz5-22WgxDbh-_RGRpO6RB1ju8c2Dbkm8tul4fSWpXG0muHe8bX11X3uPZzvOwjNqxkQo_699nlYYza7DRZI5RJLA6zSZpiXqH3YvPIztu_J12ALVs1BcoCcN_6whyDUzrliZ7Ni5MX9Ec_SMZLwAEwbu9b9EWihSz_eD26v0wUHaTEvW35aLQQmc7XjtXDxI1aNCSOnJ-LHqLUFn3dWJOun2TN9ua6gyQO7',
    },
    {
      label: 'Detail',
      fullLabel: 'Detail Material',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM9dHL_A-raV5DV2bRyBLWsVHOTDoUmQlAaE4BdRUhrg-ksEQ6ItqbM1McM4adECo218ZkxhZZC09MwYnH_QVXnixQna9fJH9j0wXlbxs_lx0_OoNdoSzR8V9DKG_Dq1KvXVMC8Cbou9RaWg_XCw_7V7jgETwTPlIuWzX5q0OkfUrs3HBK3IGKWA2Eu_VSCRqVKw48Rx-BdevU_NiOGvZj99SsMQ0MuFLTPjrFQ4BaY5oMN948uLHh',
    },
    {
      label: 'Box',
      fullLabel: 'Box Kemasan',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2N2GBocv5tZgmiv8M2fsLHzBkNuPJbaW9qXbsAKMiq6XimsUB1hyEMi6KAeSaRTORH-aa0b7fKCqbg34rNaMvhMgpXf_GYJzfnGIz-YzCFpPl3BSYR8oRgu4uUWfQ0FYSezpfYEHp_IM1nv0uKUKKspCm8mkW8EN3fQZeRhryWLGiCqR8wtww9C01iD4OrTD34QSVrxBYG3grb5hi3kusmRYMjZI8E2zulzkyS5yPctuS335t4gf',
    },
  ];

  const sizes = [
    { cm: '25.0', eu: '40', us: '7.0', uk: '6.0', isRare: false },
    { cm: '25.5', eu: '40.5', us: '7.5', uk: '6.5', isRare: false },
    { cm: '26.0', eu: '41', us: '8.0', uk: '7.0', isRare: false },
    { cm: '26.5', eu: '42', us: '8.5', uk: '7.5', isRare: false },
    { cm: '27.0', eu: '42.5', us: '9.0', uk: '8.0', isRare: true },
    { cm: '27.5', eu: '43', us: '9.5', uk: '8.5', isRare: false },
    { cm: '28.0', eu: '44', us: '10.0', uk: '9.0', isRare: false },
    { cm: '28.5', eu: '44.5', us: '10.5', uk: '9.5', isRare: false },
    { cm: '29.0', eu: '45', us: '11.0', uk: '10.0', isRare: false },
    { cm: '29.5', eu: '45.5', us: '11.5', uk: '10.5', isRare: false },
    { cm: '30.0', eu: '46', us: '12.0', uk: '11.0', isRare: false },
    { cm: '31.0', eu: '47.5', us: '13.0', uk: '12.0', isRare: false },
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div ref={containerRef} className="bg-surface text-primary pb-28 sm:pb-16 lg:pb-0">
      {/* Toast Notification */}
      {addedToCart && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-primary text-on-primary px-5 py-3.5 border border-surface-container-highest shadow-2xl flex items-center space-x-3 animate-bounce">
          <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
          <span className="font-mono-spec text-xs uppercase font-bold">Produk berhasil masuk ke kantong</span>
        </div>
      )}

      {/* Top Status & Breadcrumb Bar (Desktop Only) */}
      <div className="hidden sm:block border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-margin-desktop py-2.5 sm:py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] sm:text-mono-label font-mono-label text-secondary uppercase">
          <div className="flex items-center space-x-2 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Katalog</Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-primary transition-colors">Koleksi Spesial</Link>
            <span>/</span>
            <span className="text-primary font-bold">AF1 Triple Black</span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4 text-[10px] sm:text-mono-label">
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              STOK SIAP KIRIM
            </span>
            <span className="text-secondary">PENGIRIMAN: JAKARTA PUSAT</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase (Kick Avenue Clean Style for Mobile) */}
      <section className="border-b border-surface-container-highest">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-margin-desktop py-3 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-gutter-desktop items-start">
            {/* Left Column: Product Gallery */}
            <div className="pdetail-anim lg:col-span-7 space-y-3 sm:space-y-4">
              {/* Main Image Stage */}
              <div className="border-0 sm:border border-surface-container-highest bg-white sm:bg-surface-container-lowest p-0 sm:p-4 rounded-none sm:rounded-sm">
                {/* Big Preview Frame */}
                <div className="aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center group">
                  <img
                    src={galleryImages[selectedThumb].url}
                    alt="Nike Air Force 1 '07 Triple Black Detail View"
                    className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Slider progress bar indicator (like Kick Avenue) */}
                <div className="flex items-center gap-1.5 mt-3 sm:hidden px-2">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        selectedThumb === idx ? 'bg-primary flex-1' : 'bg-surface-container-highest w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails row / variants (Kick Avenue style on mobile) */}
              <div className="flex items-center gap-2 sm:grid sm:grid-cols-5 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`shrink-0 w-16 sm:w-auto border p-1 bg-surface-container-lowest transition-all relative overflow-hidden rounded ${
                      selectedThumb === idx
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-surface-container-highest hover:border-primary/50'
                    }`}
                  >
                    <div className="aspect-square bg-surface-container overflow-hidden rounded-sm">
                      <img src={img.url} alt={img.fullLabel} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] text-secondary uppercase text-center mt-1 font-semibold hidden sm:block">
                      {img.label}
                    </span>
                    {selectedThumb === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-1 block sm:hidden"></span>
                    )}
                  </button>
                ))}
                {/* Variants indicator on mobile */}
                <div className="sm:hidden shrink-0 flex flex-col items-center justify-center w-16 h-16 border border-dashed border-surface-container-highest rounded text-secondary text-[10px] font-mono-spec">
                  <span className="font-bold text-primary">5</span>
                  <span className="text-[9px]">Sudut &gt;</span>
                </div>
              </div>
            </div>

            {/* Right Column: Specification & Purchase Form */}
            <div className="pdetail-anim lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="border-0 sm:border border-surface-container-highest bg-transparent sm:bg-surface-container-lowest p-0 sm:p-6 space-y-4 sm:space-y-5">
                {/* Price & Title (Kick Avenue Clean Hierarchy) */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                      Rp 1.799.000
                    </div>
                    <span className="hidden sm:inline-block font-mono-spec text-[11px] text-secondary uppercase">
                      SKU: 315122-001
                    </span>
                  </div>

                  <h1 className="text-lg sm:text-2xl lg:text-[28px] font-bold text-primary tracking-tight leading-snug">
                    Nike Air Force 1 &apos;07 Triple Black
                  </h1>

                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    Standar Hitam Minimalis Monokromatik. Dibuat dengan Kulit Full-Grain Hitam Pekat Premium.
                  </p>
                </div>

                {/* Kick Avenue Style Trust & Shipping Badges (Harmonized Palette) */}
                <div className="space-y-2 pt-1">
                  {/* 100% Authentic Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('authenticity')}
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-white border border-surface-container-highest rounded-md sm:rounded-sm text-xs hover:border-primary transition-all text-left group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-primary text-lg">verified</span>
                      <span className="text-primary font-medium text-xs">
                        <strong className="font-bold">FORCEVAULT</strong> 100% Authentic Guaranteed
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                  </button>

                  {/* Shipping Info Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('shipping')}
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-white border border-surface-container-highest rounded-md sm:rounded-sm text-[11px] sm:text-xs hover:border-primary transition-all text-left group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5 text-secondary">
                      <span className="flex items-center gap-1.5 text-primary font-medium">
                        <span className="text-primary font-bold">⚡ Ekspres</span> Kirim hari ini
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-primary">🚚 Standar</span> 2–3 Hari
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-base group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                  </button>
                </div>

                {/* Size Matrix Selector (Asian/Indonesian CM Standard) */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex justify-between items-center font-mono-spec text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold uppercase">PILIH UKURAN (PANJANG KAKI / CM)</span>
                      <span className="text-[11px] bg-surface-container px-2 py-0.5 rounded font-bold text-primary">
                        {selectedSize}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('sizeChart')}
                      className="text-secondary underline cursor-pointer uppercase text-[11px] hover:text-primary transition-colors"
                    >
                      Panduan Ukuran
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {sizes.map((sizeObj) => {
                      const sizeLabel = `${sizeObj.cm} cm`;
                      const isSelected = selectedSize === sizeLabel;
                      return (
                        <button
                          key={sizeObj.cm}
                          onClick={() => setSelectedSize(sizeLabel)}
                          className={`py-2 px-1 font-mono-spec border text-center transition-all rounded-sm ${
                            isSelected
                              ? 'bg-primary text-on-primary border-primary font-bold shadow-md scale-[1.02]'
                              : 'bg-white text-primary border-surface-container-highest hover:border-primary'
                          }`}
                        >
                          <div className="font-bold text-xs sm:text-sm">{sizeObj.cm} cm</div>
                          <div className={`text-[9px] uppercase mt-0.5 ${isSelected ? 'text-white/80' : 'text-secondary'}`}>
                            EU {sizeObj.eu}
                          </div>
                          {sizeObj.isRare ? (
                            <span className="text-[8px] text-amber-500 uppercase block leading-none mt-1 font-semibold">
                              TERAKHIR
                            </span>
                          ) : (
                            <span className={`text-[8px] block leading-none mt-1 ${isSelected ? 'text-white/60' : 'text-secondary/50'}`}>
                              Tersedia
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center font-mono-spec text-[10px] sm:text-mono-spec text-secondary pt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">check</span>
                      Ukuran Pas Standar (True to Size)
                    </span>
                    <span className="text-primary font-bold">Stok: 8 Pasang</span>
                  </div>
                </div>

                {/* Quantity & CTA Buttons for Desktop */}
                <div className="hidden sm:block space-y-2.5 sm:space-y-3 pt-2">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-surface-container-highest bg-surface h-[48px]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container text-sm"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono-spec font-bold text-primary text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Main CTA Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-[48px] bg-primary text-on-primary font-headline-sm text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-black/80 transition-colors flex items-center justify-center space-x-2 px-4 active:scale-95 shadow-sm rounded-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      <span>+ TAMBAH KE TAS</span>
                      <span className="text-white/80">— Rp {(1799000 * quantity).toLocaleString('id-ID')}</span>
                    </button>

                    {/* Bookmark Favorite */}
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`w-[48px] h-[48px] border border-surface-container-highest flex items-center justify-center transition-colors shrink-0 rounded-sm ${
                        isFavorited ? 'bg-primary text-on-primary' : 'bg-surface text-primary hover:bg-surface-container'
                      }`}
                      aria-label="Simpan Favorit"
                    >
                      <span className="material-symbols-outlined text-[20px]">{isFavorited ? 'bookmark_added' : 'bookmark'}</span>
                    </button>
                  </div>

                  {/* Instant Checkout Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-[46px] border border-primary bg-surface-container-lowest text-primary font-mono-spec text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center space-x-2 active:scale-95 rounded-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    <span>BAYAR INSTAN (QRIS / KARTU / E-WALLET)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: KRITIK & ULASAN KOLEKTOR */}
      <section className="border-b border-surface-container-highest bg-surface">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-margin-desktop py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 pb-3 sm:pb-4 border-b border-surface-container-highest">
            <span className="font-mono-spec text-xs sm:text-mono-spec text-primary tracking-widest uppercase font-bold">
              ULASAN PEMBELI &amp; KOLEKTOR
            </span>
            <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary uppercase">
              248 ULASAN TERVERIFIKASI CHIP NFC
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center border border-surface-container-highest bg-surface-container-lowest p-5 sm:p-8">
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="font-headline-lg text-4xl sm:text-[64px] font-extrabold text-primary leading-none">4.9</span>
                <div>
                  <div className="flex text-amber-500 text-base sm:text-lg">★★★★★</div>
                  <span className="font-mono-spec text-[10px] sm:text-mono-spec text-secondary uppercase block mt-1">
                    BERDASARKAN 248 ULASAN
                  </span>
                </div>
              </div>
              <button className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-on-primary font-headline-sm text-xs uppercase font-bold tracking-wider hover:bg-black/80 transition-colors">
                TULIS ULASAN PRODUK
              </button>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-8 space-y-2 font-mono-spec text-xs sm:text-mono-spec text-secondary">
              {[
                { star: 5, pct: '94%', width: 'w-[94%]' },
                { star: 4, pct: '5%', width: 'w-[5%]' },
                { star: 3, pct: '1%', width: 'w-[1%]' },
                { star: 2, pct: '0%', width: 'w-[0%]' },
                { star: 1, pct: '0%', width: 'w-[0%]' },
              ].map((bar) => (
                <div key={bar.star} className="flex items-center space-x-3 sm:space-x-4">
                  <span className="w-16 sm:w-20 text-[11px] sm:text-xs">BINTANG {bar.star}</span>
                  <div className="flex-1 h-2 bg-surface-container border border-surface-container-highest overflow-hidden">
                    <div className={`h-full bg-primary ${bar.width}`}></div>
                  </div>
                  <span className="w-10 sm:w-12 text-right text-[11px] sm:text-xs">{bar.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-gutter-desktop">
            <div className="border border-surface-container-highest bg-surface-container-lowest p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-xs">
                  <div>
                    <span className="text-primary font-bold uppercase block">R. HERMAWAN</span>
                    <span className="text-secondary text-[10px] sm:text-xs">PEMBELI TERVERIFIKASI // JAKARTA</span>
                  </div>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-xs sm:text-sm font-bold uppercase text-primary">
                  Warna hitam pekat sempurna, chip NFC langsung terbaca.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Sepatu sampai dalam kondisi double-box rapi dengan segel verifikasi lengkap. Chip NFC ForceVault langsung terverifikasi di iPhone lengkap dengan histori nomor seri pabrikan. Tekstur kulit CW2288 ini sangat lembut dan matte mewah."
                </p>
              </div>
              <div className="pt-3 border-t border-surface-container-highest flex justify-between font-mono-label text-[10px] sm:text-mono-label text-secondary">
                <span>UKURAN: US 9.5</span>
                <span className="text-primary font-bold">VERIFIED PURCHASE</span>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface-container-lowest p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-xs">
                  <div>
                    <span className="text-primary font-bold uppercase block">D. HENDRA</span>
                    <span className="text-secondary text-[10px] sm:text-xs">KOLEKTOR ARSIP // BANDUNG</span>
                  </div>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-xs sm:text-sm font-bold uppercase text-primary">
                  Siluet monokrom terbaik sepanjang masa.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Triple Black AF1 adalah puncak siluet streetwear mutlak. Menggabungkan ukuran normal (TTS) dan rasa fleksibilitas fleksibel tanpa terurai. Sangat tangguh dipakai beraktivitas di berbagai kondisi."
                </p>
              </div>
              <div className="pt-3 border-t border-surface-container-highest flex justify-between font-mono-label text-[10px] sm:text-mono-label text-secondary">
                <span>UKURAN: US 9.0</span>
                <span className="text-primary font-bold">VERIFIED PURCHASE</span>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface-container-lowest p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-xs">
                  <div>
                    <span className="text-primary font-bold uppercase block">M. KUSUMA</span>
                    <span className="text-secondary text-[10px] sm:text-xs">PEMBELI TERVERIFIKASI // SURABAYA</span>
                  </div>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-xs sm:text-sm font-bold uppercase text-primary">
                  Pengiriman ekspres tiba kurang dari 24 jam.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Kardus luar ForceVault tebal dengan segel pengatur kelembapan arsip. Sudut box sepatu tidak penyok sama sekali tanpa cacat sedikit pun. Standar penanganan profesional kelas satu untuk para kolektor."
                </p>
              </div>
              <div className="pt-3 border-t border-surface-container-highest flex justify-between font-mono-label text-[10px] sm:text-mono-label text-secondary">
                <span>UKURAN: US 10.0</span>
                <span className="text-primary font-bold">VERIFIED SHIPMENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: REKOMENDASI SILUET SEJENIS */}
      <section className="border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-margin-desktop py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
          <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-surface-container-highest">
            <span className="font-mono-spec text-xs sm:text-mono-spec text-primary tracking-widest uppercase font-bold">
              REKOMENDASI SILUET TERKAIT
            </span>
            <Link href="/#catalog" className="font-mono-label text-[11px] sm:text-mono-label text-primary hover:underline uppercase font-bold">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter-desktop">
            {[
              {
                sku: 'CW2288-111',
                badge: 'LOW KLASIK',
                name: "AF1 '07 Triple White",
                desc: 'Kulit Putih Full-Grain',
                price: 'Rp 1.549.000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqqRGUraQGnRBcovs-Lz5-22WgxDbh-_RGRpO6RB1ju8c2Dbkm8tul4fSWpXG0muHe8bX11X3uPZzvOwjNqxkQo_699nlYYza7DRZI5RJLA6zSZpiXqH3YvPIztu_J12ALVs1BcoCcN_6whyDUzrliZ7Ni5MX9Ec_SMZLwAEwbu9b9EWihSz_eD26v0wUHaTEvW35aLQQmc7XjtXDxI1aNCSOnJ-LHqLUFn3dWJOun2TN9ua6gyQO7',
              },
              {
                sku: 'CW2289-001',
                badge: 'POTONGAN MID',
                name: "AF1 '07 Mid Triple Black",
                desc: 'Tali Kerah Mid Empuk',
                price: 'Rp 1.799.000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2stY4B_rq1dZGDwnXYrSuSMMyv2mpySsD_KpAv_BMgHxVeMhYsQfVdKEzTEeBBwnHKVepvThxDqwxcg_ZMA_6Esx_sohBu-7ii5Yx2QYbnvMiiAQw_sfz1fwg41xCCMwPKxym1U0ztycPvCSsx0DcLpP82TLYMcq8pQJYA1kWpbDKQ5MkQIs-Ay1A77L6AOVKxMbEm7FKhxbdvLL9JKCkjcj5pJ8eKwhK_7ywbK0rPq5zrAvDacS',
              },
              {
                sku: 'FB8883-001',
                badge: 'EDISI SPESIAL',
                name: "AF1 '07 Drill Dark Stucco",
                desc: 'Kulit Suede / Kanvas',
                price: 'Rp 1.849.000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0L5OOr9oHf7I4Z2sJG4DU_MN_upyPffCxHRAg8r3UDEVON3ihQDxvzXd9YBgPJO39huthO1k9uMJufcoU6UXwHZQZ2tVUKkjrk3Cjw3dfpVDq_pBu8pxUhisi76tpAlQsLatRB-3bkanQzsmdOMfWaNUQzqMvdIw8tGid_3MS3F8uh-373kLrZ0r4WR_OlPgGdLp0yO6eG21OuipNRHIH-xBdjZJzUiqqgRI1MTbOYD5a1zjMLqI5',
              },
              {
                sku: 'DB4109-001',
                badge: 'PREMIUM LUXE',
                name: 'AF1 Luxe Black Gum',
                desc: 'Outsole Lug Bergigi',
                price: 'Rp 2.199.000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa8SKM4Da2Z-eGHFs-HiXzSgn2suLZIxpjAeiwkbQ5yZQGxbNrjVXyBt7OXwK_zmRuF4mU8Y5R-KPibDDTC8fzxDB-FrB1yMd7w8dCmG3UV13A9v4LeETmzk9Ssgj-IN5g1Jsvqnjyah9FUO0Ei2Z44cFKgrmKdXmQ7COMsOSKxIsJBX5piImlau_lZgewPTAEnvMxGTxtaatg190T6t3MwK2DaJiBChg6JGpozVUaAc9bv4ZztFVN',
              },
            ].map((prod) => (
              <Link
                key={prod.sku}
                href="/product/1"
                className="border border-surface-container-highest bg-surface p-2.5 sm:p-4 block group hover:border-primary transition-all"
              >
                <div className="aspect-square bg-surface-container mb-2 sm:mb-3 overflow-hidden relative border border-surface-container-highest">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-surface font-mono-label text-[9px] sm:text-[10px] text-primary uppercase px-1.5 sm:px-2 py-0.5 border border-surface-container-highest">
                    {prod.badge}
                  </span>
                </div>
                <span className="font-mono-spec text-[10px] sm:text-[11px] text-secondary uppercase block truncate">SKU: {prod.sku}</span>
                <h4 className="font-headline-sm text-xs sm:text-sm text-primary uppercase font-bold mt-1 group-hover:underline line-clamp-1">
                  {prod.name}
                </h4>
                <p className="font-mono-label text-[11px] sm:text-xs text-secondary mt-0.5 truncate">{prod.desc}</p>
                <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-3 border-t border-surface-container-highest flex justify-between font-mono-spec text-xs">
                  <span className="text-secondary uppercase text-[10px] sm:text-xs">HARGA</span>
                  <span className="text-primary font-bold">{prod.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Bar for Mobile View (Kick Avenue Style) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container-highest px-4 py-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] flex items-center gap-2.5 shadow-2xl">
        {/* Bookmark with Counter (Kick Avenue Style) */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="flex flex-col items-center justify-center min-w-[50px] h-[46px] border border-surface-container-highest rounded-md bg-white hover:bg-surface transition-colors active:scale-95 shrink-0"
          aria-label="Simpan Favorit"
        >
          <span className={`material-symbols-outlined text-[20px] leading-none ${isFavorited ? 'text-primary' : 'text-secondary'}`}>
            {isFavorited ? 'bookmark_added' : 'bookmark'}
          </span>
          <span className="text-[10px] font-mono-spec text-secondary font-bold leading-none mt-0.5">
            {isFavorited ? '392' : '391'}
          </span>
        </button>

        {/* Secondary: + Tas */}
        <button
          onClick={handleAddToCart}
          className="h-[46px] px-4 border border-surface-container-highest bg-white text-primary font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface active:scale-95 transition-all flex items-center justify-center shrink-0"
        >
          + Tas
        </button>

        {/* Primary: Beli Sekarang (Kick Avenue Style) */}
        <button
          onClick={handleAddToCart}
          className="flex-1 h-[46px] bg-primary text-on-primary font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black/90 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
        >
          <span>Beli ({selectedSize})</span>
          <span className="text-white/70">•</span>
          <span>Rp 1.799.000</span>
        </button>
      </div>

      {/* Bottom Sheet Detail Modal (Authenticity / Shipping / Size Chart) */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 touch-none"
          onTouchMove={(e) => {
            if (e.target === e.currentTarget) e.preventDefault();
          }}
        >
          {/* Backdrop Overlay (No Blur Filter) */}
          <div
            onClick={() => setActiveModal(null)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/60 transition-opacity"
            aria-hidden="true"
          />

          {/* Sheet Container */}
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Mobile Drag Indicator */}
            <div className="w-10 h-1 bg-surface-container-highest rounded-full mx-auto mt-3 mb-1 shrink-0 sm:hidden" />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-container-highest">
              <h3 className="text-base font-bold text-primary tracking-tight">
                {activeModal === 'shipping'
                  ? 'Metode Pengiriman'
                  : activeModal === 'authenticity'
                  ? 'Jaminan Keaslian'
                  : 'Panduan Ukuran (Size Chart)'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full border border-surface-container-highest flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                aria-label="Tutup Detail"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Modal Body: Shipping Method Details */}
            {activeModal === 'shipping' && (
              <div className="p-5 space-y-4">
                {/* Item 1: Express */}
                <div className="flex items-start space-x-3.5 pb-4 border-b border-surface-container-highest">
                  <div className="w-8 h-8 rounded-full bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-primary text-sm">Ekspres</div>
                    <p className="text-secondary text-xs leading-relaxed">
                      Produk siap dikirim langsung dari ruang arsip ForceVault Jakarta.
                    </p>
                    <div className="text-[11px] font-mono-spec text-secondary pt-0.5">
                      Kirim hari kerja yang sama (pesanan sebelum 15:00 WIB)
                    </div>
                  </div>
                </div>

                {/* Item 2: Standard */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-primary text-sm">Standar</div>
                    <p className="text-secondary text-xs leading-relaxed">
                      Pengiriman reguler berasuransi penuh dengan proteksi kemasan double-box.
                    </p>
                    <div className="text-[11px] font-mono-spec text-secondary pt-0.5">
                      Estimasi 2–4 hari kerja (Seluruh Indonesia)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Authenticity Details */}
            {activeModal === 'authenticity' && (
              <div className="p-5 space-y-4">
                {/* Item 1: Authenticity */}
                <div className="flex items-start space-x-3.5 pb-4 border-b border-surface-container-highest">
                  <div className="w-8 h-8 rounded-full bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-primary text-sm">100% Produk Asli</div>
                    <p className="text-secondary text-xs leading-relaxed">
                      Diperiksa langsung oleh kurator spesialis pada material, jahitan, dan nomor seri.
                    </p>
                    <div className="text-[11px] font-mono-spec text-secondary pt-0.5">
                      Garansi pengembalian dana 100% jika terbukti tidak orisinal
                    </div>
                  </div>
                </div>

                {/* Item 2: NFC Tag */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">nfc</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-primary text-sm">Sertifikat Digital NFC</div>
                    <p className="text-secondary text-xs leading-relaxed">
                      Dilengkapi hangtag chip NFC resmi yang tertaut dengan database arsip.
                    </p>
                    <div className="text-[11px] font-mono-spec text-secondary pt-0.5">
                      Dapat dipindai langsung menggunakan smartphone
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Size Chart Table (Matching Reference Image) */}
            {activeModal === 'sizeChart' && (
              <div className="p-4 sm:p-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-secondary font-mono-spec">
                  <span>KONVERSI UKURAN: AF1 '07</span>
                  <span className="text-primary font-bold">TRUE TO SIZE</span>
                </div>

                <div className="border border-surface-container-highest rounded-md overflow-hidden max-h-[50vh] overflow-y-auto">
                  <table className="w-full text-center text-xs">
                    <thead className="bg-surface-container font-mono-spec font-bold text-primary sticky top-0 border-b border-surface-container-highest">
                      <tr>
                        <th className="py-2.5 px-3">US</th>
                        <th className="py-2.5 px-3">EU</th>
                        <th className="py-2.5 px-3">UK</th>
                        <th className="py-2.5 px-3 bg-surface-container-high text-primary font-extrabold">CM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest/60 font-mono-spec text-secondary">
                      {sizes.map((s) => {
                        const sizeLabel = `${s.cm} cm`;
                        const isCurrent = selectedSize === sizeLabel;
                        return (
                          <tr
                            key={s.cm}
                            onClick={() => {
                              setSelectedSize(sizeLabel);
                              setActiveModal(null);
                            }}
                            className={`cursor-pointer transition-colors hover:bg-surface-container/60 ${
                              isCurrent ? 'bg-primary/5 font-bold text-primary' : ''
                            }`}
                          >
                            <td className="py-2.5 px-3">{s.us}</td>
                            <td className="py-2.5 px-3">{s.eu}</td>
                            <td className="py-2.5 px-3">{s.uk}</td>
                            <td className={`py-2.5 px-3 font-bold text-primary ${isCurrent ? 'bg-primary/10' : ''}`}>
                              {s.cm}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-secondary leading-relaxed pt-0.5">
                  💡 <strong>Tips:</strong> Ukur panjang telapak kaki dari tumit sampai ujung jari terpanjang dalam sentimeter (CM).
                </p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-4 border-t border-surface-container-highest bg-surface-container-lowest">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full h-10 bg-primary text-on-primary font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black/90 active:scale-95 transition-all flex items-center justify-center"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
