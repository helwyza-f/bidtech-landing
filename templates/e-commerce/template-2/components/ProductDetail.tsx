'use client';

import React, { useState, useRef } from 'react';
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
  const [selectedSize, setSelectedSize] = useState('US 9.0');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
    { label: 'US 7.0', isRare: false },
    { label: 'US 7.5', isRare: false },
    { label: 'US 8.0', isRare: false },
    { label: 'US 8.5', isRare: false },
    { label: 'US 9.0', isRare: true },
    { label: 'US 9.5', isRare: false },
    { label: 'US 10.0', isRare: false },
    { label: 'US 10.5', isRare: false },
    { label: 'US 11.0', isRare: false },
    { label: 'US 11.5', isRare: false },
    { label: 'US 12.0', isRare: false },
    { label: 'US 13.0', isRare: false },
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div ref={containerRef} className="bg-surface text-primary pb-16 lg:pb-0">
      {/* Toast Notification */}
      {addedToCart && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-primary text-on-primary px-5 py-3.5 border border-surface-container-highest shadow-2xl flex items-center space-x-3 animate-bounce">
          <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
          <span className="font-mono-spec text-xs uppercase font-bold">Produk berhasil masuk ke kantong</span>
        </div>
      )}

      {/* Top Status & Breadcrumb Bar */}
      <div className="border-b border-surface-container-highest bg-surface-container-lowest">
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

      {/* Main Product Showcase (Split Layout) */}
      <section className="border-b border-surface-container-highest">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-margin-desktop py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-desktop items-start">
            {/* Left Column: Product Gallery */}
            <div className="pdetail-anim lg:col-span-7 space-y-3 sm:space-y-4">
              {/* Main Image Stage */}
              <div className="border border-surface-container-highest bg-surface-container-lowest p-2.5 sm:p-4">
                {/* Big Preview Frame */}
                <div className="aspect-[4/3] bg-surface-container relative overflow-hidden border border-surface-container-highest flex items-center justify-center group">
                  <img
                    src={galleryImages[selectedThumb].url}
                    alt="Nike Air Force 1 '07 Triple Black Detail View"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* 5 Thumbnails Grid */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`border p-1 bg-surface-container-lowest transition-all relative overflow-hidden rounded-sm ${
                      selectedThumb === idx
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-surface-container-highest hover:border-primary/50'
                    }`}
                  >
                    <div className="aspect-square bg-surface-container overflow-hidden">
                      <img src={img.url} alt={img.fullLabel} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] text-secondary uppercase block text-center mt-1 font-semibold">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Specification & Purchase Form */}
            <div className="pdetail-anim lg:col-span-5 space-y-4 sm:space-y-6">
              {/* Product Metadata & Title Header */}
              <div className="border border-surface-container-highest bg-surface-container-lowest p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between font-mono-spec text-xs">
                  <span className="text-secondary uppercase">EDISI RESMI // AF1-07-3K</span>
                  <span className="text-primary font-bold">SKU: 315122-001</span>
                </div>

                <div className="space-y-1">
                  <h1 className="font-headline-lg text-[26px] sm:text-[32px] md:text-[38px] text-primary tracking-tighter uppercase leading-tight font-extrabold">
                    NIKE AIR FORCE 1 '07 TRIPLE BLACK
                  </h1>
                  <p className="font-body-md text-xs sm:text-body-md text-secondary leading-relaxed">
                    Standar Hitam Minimalis Monokromatik. Dibuat dengan Kulit Full-Grain Hitam Pekat Premium.
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3.5 sm:p-4 border border-surface-container-highest bg-surface space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono-label text-[10px] sm:text-mono-label text-secondary uppercase">
                      HARGA RESMI (TERMASUK PAJAK &amp; NFC)
                    </span>
                    <span className="font-headline-lg text-2xl sm:text-[28px] text-primary font-extrabold">
                      Rp 1.799.000
                    </span>
                  </div>
                  <p className="font-mono-spec text-[11px] sm:text-mono-spec text-secondary">
                    Atau cicilan Rp 299.833 / bln tanpa bunga dengan <strong className="text-primary underline cursor-pointer">Vault-Pay</strong>
                  </p>
                </div>

                {/* Size Matrix Selector */}
                <div className="space-y-2.5 sm:space-y-3 pt-1">
                  <div className="flex justify-between items-center font-mono-spec text-xs">
                    <span className="text-primary font-bold uppercase">PILIH UKURAN (US PRIA)</span>
                    <span className="text-secondary underline cursor-pointer uppercase text-[11px]">Panduan Ukuran</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {sizes.map((sizeObj) => (
                      <button
                        key={sizeObj.label}
                        onClick={() => setSelectedSize(sizeObj.label)}
                        className={`p-2 sm:p-2.5 font-mono-spec text-xs border text-center transition-all ${
                          selectedSize === sizeObj.label
                            ? 'bg-primary text-on-primary border-primary font-bold shadow-sm'
                            : 'bg-surface text-primary border-surface-container-highest hover:border-primary'
                        }`}
                      >
                        <div className="font-bold">{sizeObj.label}</div>
                        {sizeObj.isRare && (
                          <span className="text-[8px] sm:text-[9px] text-amber-500 uppercase block leading-none mt-0.5 font-semibold">
                            TERAKHIR
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center font-mono-spec text-[10px] sm:text-mono-spec text-secondary pt-1">
                    <span>UKURAN PAS STANDAR (TRUE TO SIZE)</span>
                    <span className="text-primary font-bold">STOK TERSEDIA: 8 PASANG</span>
                  </div>
                </div>

                {/* Quantity & Add to Cart Controls */}
                <div className="space-y-2.5 sm:space-y-3 pt-2">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-surface-container-highest bg-surface h-[46px] sm:h-[52px]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 sm:w-10 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 sm:w-10 text-center font-mono-spec font-bold text-primary text-xs sm:text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 sm:w-10 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Main CTA Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-[46px] sm:h-[52px] bg-primary text-on-primary font-headline-sm text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-black/80 transition-colors flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 active:scale-95 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_bag</span>
                      <span>+ TAMBAH KE TAS</span>
                      <span className="hidden xs:inline sm:inline text-white/80">— Rp {(1799000 * quantity).toLocaleString('id-ID')}</span>
                    </button>

                    {/* Bookmark Favorite */}
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`w-[46px] sm:w-[52px] h-[46px] sm:h-[52px] border border-surface-container-highest flex items-center justify-center transition-colors shrink-0 ${
                        isFavorited ? 'bg-primary text-on-primary' : 'bg-surface text-primary hover:bg-surface-container'
                      }`}
                      aria-label="Simpan Favorit"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{isFavorited ? 'bookmark_added' : 'bookmark'}</span>
                    </button>
                  </div>

                  {/* Instant Checkout Button */}
                  <button className="w-full h-[42px] sm:h-[48px] border border-primary bg-surface-container-lowest text-primary font-mono-spec text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center space-x-2 active:scale-95">
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">bolt</span>
                    <span>BAYAR INSTAN (QRIS / KARTU / E-WALLET)</span>
                  </button>
                </div>

                {/* Authenticity & Guarantee Badges */}
                <div className="border-t border-surface-container-highest pt-3 sm:pt-4 space-y-2.5 sm:space-y-3 font-mono-spec text-mono-spec">
                  <div className="flex items-start space-x-2.5 sm:space-x-3">
                    <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">verified</span>
                    <div>
                      <span className="text-primary font-bold uppercase block text-xs">100% PRODUK ASLI DENGAN CHIP NFC</span>
                      <span className="text-secondary text-[11px] sm:text-xs leading-relaxed">
                        Tiap pasang terdaftar langsung ke sistem digital dan dilengkapi tag verifikasi NFC tanpa sentuh untuk jaminan keaslian.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 sm:space-x-3">
                    <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">local_shipping</span>
                    <div>
                      <span className="text-primary font-bold uppercase block text-xs">PENGIRIMAN EKSPRES &amp; AMAN BERGARANSI</span>
                      <span className="text-secondary text-[11px] sm:text-xs leading-relaxed">
                        Kemasan box ganda dengan proteksi anti-lembab. Pengiriman cepat ke seluruh kota di Indonesia.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 sm:space-x-3">
                    <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">published_with_changes</span>
                    <div>
                      <span className="text-primary font-bold uppercase block text-xs">GARANSI TUKAR UKURAN 14 HARI</span>
                      <span className="text-secondary text-[11px] sm:text-xs leading-relaxed">
                        Sepatu belum dipakai dengan kondisi tag utuh dapat ditukar ukuran secara mudah dan cepat.
                      </span>
                    </div>
                  </div>
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

      {/* Sticky Bottom Action Bar for Mobile View */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container-highest px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl">
        <div className="flex flex-col pr-2">
          <span className="text-[10px] font-mono-spec text-secondary uppercase truncate max-w-[150px]">AF1 Triple Black</span>
          <span className="font-headline-sm text-sm font-extrabold text-primary">Rp 1.799.000</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-10 h-10 border border-surface-container-highest flex items-center justify-center transition-colors rounded-sm active:scale-95 ${
              isFavorited ? 'bg-primary text-on-primary' : 'bg-surface text-primary'
            }`}
            aria-label="Simpan Favorit"
          >
            <span className="material-symbols-outlined text-[18px]">{isFavorited ? 'bookmark_added' : 'bookmark'}</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="h-10 px-5 bg-primary text-on-primary font-headline-sm text-xs uppercase font-bold tracking-wider flex items-center space-x-1.5 active:scale-95 shadow-md rounded-sm"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            <span>+ Beli</span>
          </button>
        </div>
      </div>
    </div>
  );
}
