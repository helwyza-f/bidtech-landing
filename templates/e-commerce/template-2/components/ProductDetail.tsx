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
  const [selectedAngle, setSelectedAngle] = useState<'0°' | '90°' | '180°' | '270°' | '360°'>('0°');
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
      label: 'PROFIL UTAMA',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2stY4B_rq1dZGDwnXYrSuSMMyv2mpySsD_KpAv_BMgHxVeMhYsQfVdKEzTEeBBwnHKVepvThxDqwxcg_ZMA_6Esx_sohBu-7ii5Yx2QYbnvMiiAQw_sfz1fwg41xCCMwPKxym1U0ztycPvCSsx0DcLpP82TLYMcq8pQJYA1kWpbDKQ5MkQIs-Ay1A77L6AOVKxMbEm7FKhxbdvLL9JKCkjcj5pJ8eKwhK_7ywbK0rPq5zrAvDacS',
    },
    {
      label: 'SUDUT LATERAL',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0L5OOr9oHf7I4Z2sJG4DU_MN_upyPffCxHRAg8r3UDEVON3ihQDxvzXd9YBgPJO39huthO1k9uMJufcoU6UXwHZQZ2tVUKkjrk3Cjw3dfpVDq_pBu8pxUhisi76tpAlQsLatRB-3bkanQzsmdOMfWaNUQzqMvdIw8tGid_3MS3F8uh-373kLrZ0r4WR_OlPgGdLp0yO6eG21OuipNRHIH-xBdjZJzUiqqgRI1MTbOYD5a1zjMLqI5',
    },
    {
      label: 'OUTSOLE TRACTION',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqqRGUraQGnRBcovs-Lz5-22WgxDbh-_RGRpO6RB1ju8c2Dbkm8tul4fSWpXG0muHe8bX11X3uPZzvOwjNqxkQo_699nlYYza7DRZI5RJLA6zSZpiXqH3YvPIztu_J12ALVs1BcoCcN_6whyDUzrliZ7Ni5MX9Ec_SMZLwAEwbu9b9EWihSz_eD26v0wUHaTEvW35aLQQmc7XjtXDxI1aNCSOnJ-LHqLUFn3dWJOun2TN9ua6gyQO7',
    },
    {
      label: 'DETAIL STRAP',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM9dHL_A-raV5DV2bRyBLWsVHOTDoUmQlAaE4BdRUhrg-ksEQ6ItqbM1McM4adECo218ZkxhZZC09MwYnH_QVXnixQna9fJH9j0wXlbxs_lx0_OoNdoSzR8V9DKG_Dq1KvXVMC8Cbou9RaWg_XCw_7V7jgETwTPlIuWzX5q0OkfUrs3HBK3IGKWA2Eu_VSCRqVKw48Rx-BdevU_NiOGvZj99SsMQ0MuFLTPjrFQ4BaY5oMN948uLHh',
    },
    {
      label: 'ARSIP KOTAK',
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
    <div ref={containerRef} className="bg-surface text-primary">
      {/* Toast Notification */}
      {addedToCart && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-6 py-4 border border-surface-container-highest shadow-2xl flex items-center space-x-4 animate-bounce">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <div>
            <p className="font-headline-sm text-sm uppercase">BERHASIL DITAMBAHKAN KE TAS!</p>
            <p className="font-mono-label text-xs text-inverse-primary">
              1x Nike Air Force 1 '07 Triple Black ({selectedSize})
            </p>
          </div>
        </div>
      )}

      {/* Top Status & Breadcrumb Bar */}
      <div className="border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-3 flex flex-wrap justify-between items-center text-mono-label font-mono-label text-secondary uppercase">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-primary transition-colors">Katalog</Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-primary transition-colors">Siluet Spesial</Link>
            <span>/</span>
            <span className="text-primary font-bold">ENCAPS-2024</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-primary font-semibold">● STOK TERSEDIA (SHIPMENT READY)</span>
            <span>DIKIRIM DARI: JAKARTA PUSAT</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase (Split Layout) */}
      <section className="border-b border-surface-container-highest">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* Left Column: Product Gallery & 360 Viewer */}
            <div className="pdetail-anim lg:col-span-7 space-y-4">
              {/* Main Image Stage */}
              <div className="border border-surface-container-highest bg-surface-container-lowest p-4 relative">
                {/* Top Badge Overlay */}
                <div className="flex justify-between items-center mb-2 font-mono-spec text-mono-spec">
                  <span className="bg-surface border border-surface-container-highest px-2.5 py-1 text-secondary uppercase">
                    SPESIFIKASI ARSIP // KULIT FULL-GRAIN 10OZ
                  </span>
                  <span className="text-secondary font-mono-label text-mono-label uppercase">
                    PEMUTAR 360° SENSIS
                  </span>
                </div>

                {/* Big Preview Frame */}
                <div className="aspect-[4/3] bg-surface-container relative overflow-hidden border border-surface-container-highest flex items-center justify-center group">
                  <img
                    src={galleryImages[selectedThumb].url}
                    alt="Nike Air Force 1 '07 Triple Black Detail View"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Archival Overlay Marker */}
                  <div className="absolute top-4 left-4 bg-primary text-on-primary font-mono-label text-mono-label px-2.5 py-1 uppercase">
                    ForceVault — Nike Air Force 1 '07 Triple Black
                  </div>

                  {/* Interactive Angle Switcher Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md border border-surface-container-highest px-4 py-2 flex items-center space-x-3">
                    <span className="font-mono-label text-mono-label text-secondary uppercase text-[10px] hidden sm:inline-block">
                      ROTASI SUDUT:
                    </span>
                    {(['0°', '90°', '180°', '270°', '360°'] as const).map((angle, idx) => (
                      <button
                        key={angle}
                        onClick={() => {
                          setSelectedAngle(angle);
                          setSelectedThumb(idx % galleryImages.length);
                        }}
                        className={`font-mono-spec text-xs px-2 py-0.5 border transition-all ${
                          selectedAngle === angle
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface text-secondary border-surface-container-highest hover:text-primary'
                        }`}
                      >
                        {angle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gallery Caption */}
                <div className="flex justify-between items-center mt-3 font-mono-spec text-mono-spec text-secondary">
                  <span>SUDUT FOTOGRAFI: {selectedAngle} // MULTI-SUDUT PANDANG</span>
                  <span>KLIK UNTUK MEMPERBESAR</span>
                </div>
              </div>

              {/* 5 Thumbnails Grid */}
              <div className="grid grid-cols-5 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`border p-1 bg-surface-container-lowest transition-all relative overflow-hidden ${
                      selectedThumb === idx
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-surface-container-highest hover:border-primary/50'
                    }`}
                  >
                    <div className="aspect-square bg-surface-container overflow-hidden">
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-mono-label text-[9px] text-secondary uppercase block text-center mt-1 truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Specification & Purchase Form */}
            <div className="pdetail-anim lg:col-span-5 space-y-6">
              {/* Product Metadata & Title Header */}
              <div className="border border-surface-container-highest bg-surface-container-lowest p-6 space-y-4">
                <div className="flex items-center justify-between font-mono-spec text-mono-spec">
                  <span className="text-secondary uppercase">NOMOR ARSIP // AF1-07-3K</span>
                  <span className="text-primary font-bold">SKU: 315122-001</span>
                </div>

                <div className="space-y-1">
                  <h1 className="font-headline-lg text-[32px] md:text-[38px] text-primary tracking-tighter uppercase leading-none font-extrabold">
                    NIKE AIR FORCE 1 '07 TRIPLE BLACK
                  </h1>
                  <p className="font-body-md text-secondary leading-normal">
                    Standar Hitam Minimalis Monokromatik. Kulit Full-Grain Hitam Pekat.
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 border border-surface-container-highest bg-surface space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono-label text-mono-label text-secondary uppercase">HARGA ARSIP (TERMASUK PAJAK &amp; SERTIFIKAT NFC)</span>
                    <span className="font-headline-lg text-[28px] text-primary font-extrabold">
                      Rp 1.799.000
                    </span>
                  </div>
                  <p className="font-mono-spec text-mono-spec text-secondary">
                    Atau cicilan Rp 299.833 / bln tanpa bunga dengan <strong className="text-primary underline cursor-pointer">Vault-InstalPay</strong>
                  </p>
                </div>

                {/* Size Matrix Selector */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center font-mono-spec text-mono-spec">
                    <span className="text-primary font-semibold uppercase">MATRIKS UKURAN (US PRIA)</span>
                    <span className="text-secondary underline cursor-pointer uppercase">Panduan Ukuran &amp; Fit</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((sizeObj) => (
                      <button
                        key={sizeObj.label}
                        onClick={() => setSelectedSize(sizeObj.label)}
                        className={`p-2.5 font-mono-spec text-xs border text-center transition-all ${
                          selectedSize === sizeObj.label
                            ? 'bg-primary text-on-primary border-primary font-bold'
                            : 'bg-surface text-primary border-surface-container-highest hover:border-primary'
                        }`}
                      >
                        <div className="font-bold">{sizeObj.label}</div>
                        {sizeObj.isRare && (
                          <span className="text-[9px] text-amber-500 uppercase block leading-none mt-0.5">
                            TERAKHIR
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center font-mono-spec text-mono-spec text-secondary pt-1">
                    <span>MEMILIKI FIT SKALA NORMAL (TRUE TO SIZE)</span>
                    <span className="text-primary font-bold">STOK PASTI: 8 PASANG</span>
                  </div>
                </div>

                {/* Quantity & Add to Cart Controls */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-surface-container-highest bg-surface h-[52px]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono-spec font-bold text-primary">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-full flex items-center justify-center font-bold text-primary hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>

                    {/* Main CTA Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-[52px] bg-primary text-on-primary font-headline-sm text-sm uppercase tracking-wider font-bold hover:bg-black/80 transition-colors flex items-center justify-center space-x-2 px-4"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      <span>+ TAMBAH KE TAS — RP {(1799000 * quantity).toLocaleString('id-ID')}</span>
                    </button>

                    {/* Bookmark Favorite */}
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`w-[52px] h-[52px] border border-surface-container-highest flex items-center justify-center transition-colors ${
                        isFavorited ? 'bg-primary text-on-primary' : 'bg-surface text-primary hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined">{isFavorited ? 'bookmark_added' : 'bookmark'}</span>
                    </button>
                  </div>

                  {/* Instant Checkout Button */}
                  <button className="w-[100%] h-[48px] border border-primary bg-surface-container-lowest text-primary font-mono-spec text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center space-x-2">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    <span>PEMBAYARAN INSTAN VAULT (QRIS / KARTU / APPLE PAY)</span>
                  </button>
                </div>

                {/* Authenticity & Guarantee Badges */}
                <div className="border-t border-surface-container-highest pt-4 space-y-3 font-mono-spec text-mono-spec">
                  <div className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                    <div>
                      <span className="text-primary font-bold uppercase block">100% OTENTIK DENGAN CHIP NFC VAULT</span>
                      <span className="text-secondary text-xs">
                        Setiap pasang didaftarkan langsung ke buku besar digital dan disematkan tag kriptografi tanpa sentuh untuk verifikasi otentisitas.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                    <div>
                      <span className="text-primary font-bold uppercase block">PENGIRIMAN EKSPRES TERKONTROL SUHU</span>
                      <span className="text-secondary text-xs">
                        Dikemas ganda dengan lapisan pelindung anti-kelembaban khusus. Dikirim dalam 4 jam untuk Jabodetabek, Bali, dan seluruh Indonesia.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">published_with_changes</span>
                    <div>
                      <span className="text-primary font-bold uppercase block">GARANSI TUKAR UKURAN ARSIP 14 HARI</span>
                      <span className="text-secondary text-xs">
                        Sepatu belum dipakai dengan tag lengkap dapat ditukar ukuran secara mudah tanpa kendala apa pun.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: SKEMA STRUKTURAL BRUCE KILGORE 1982 */}
      <section className="border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <div className="flex justify-between items-center pb-4 border-b border-surface-container-highest mb-12">
            <span className="font-mono-spec text-mono-spec text-primary tracking-widest uppercase font-bold">
              DOKUMEN // SKEMA STRUKTURAL
            </span>
            <span className="font-mono-label text-mono-label text-secondary uppercase">
              KLASIFIKASI SPESIFIKASI: VAULT PERMANEN KLASIK
            </span>
          </div>

          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter">
              SKEMA STRUKTURAL BRUCE KILGORE 1982
            </h2>
          </div>

          {/* 4 Architectural Spec Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            <div className="border border-surface-container-highest bg-surface p-6 space-y-4">
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block">
                01 // BAHAN ATAS
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                Kulit Full-Grain Hitam 10oz
              </h3>
              <p className="font-body-md text-secondary leading-relaxed">
                Dibuat dari kulit sapi premium full-grain 10-ounce hitam pekat tebal bertekstur dengan lapisan jahitan rantai ganda yang presisi. Mikro-pori pada toebox menghasilkan sirkulasi udara optimal tanpa mengorbankan integritas bentuk.
              </p>
              <div className="pt-4 border-t border-surface-container-highest font-mono-spec text-mono-spec text-secondary space-y-1">
                <div className="flex justify-between"><span>KEKETATAN:</span><span className="text-primary">HIGH-TENSILE THREAD</span></div>
                <div className="flex justify-between"><span>PENGATURAN WARNA:</span><span className="text-primary">MATTE BLACK DYEING</span></div>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface p-6 space-y-4">
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block">
                02 // BANTALAN
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                Bantalan Udara Nike Air Terkapsul
              </h3>
              <p className="font-body-md text-secondary leading-relaxed">
                Kantung nitrogen bertekanan yang diintegrasikan langsung ke dalam rongga tumit berbahan getah polyurethane padat. Dirancang meredam benturan ekstrem lapangan basket, dikompresikan untuk kenyamanan harian seumur hidup.
              </p>
              <div className="pt-4 border-t border-surface-container-highest font-mono-spec text-mono-spec text-secondary space-y-1">
                <div className="flex justify-between"><span>TEKANAN PSI:</span><span className="text-primary">20 PSI TERTERA</span></div>
                <div className="flex justify-between"><span>MIDSOLE DROP:</span><span className="text-primary">16.5 MM OFFSET</span></div>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface p-6 space-y-4">
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block">
                03 // OUTSOLE
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                Pola Poros Lingkaran Konsentris
              </h3>
              <p className="font-body-md text-secondary leading-relaxed">
                Cangkupan karet tebal pekat non-marking yang menempatkan lingkaran konsentris di bagian bantalan depan dan tumit. Bagian tepi diperkuat gerigi melintang di tumpuan depan untuk ketahanan jangka panjang.
              </p>
              <div className="pt-4 border-t border-surface-container-highest font-mono-spec text-mono-spec text-secondary space-y-1">
                <div className="flex justify-between"><span>SENYAWAKARET:</span><span className="text-primary">SOLID BLACK RUBBER</span></div>
                <div className="flex justify-between"><span>DENGAN GRIP:</span><span className="text-primary">MULTI-ARAH</span></div>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface p-6 space-y-4">
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block">
                04 // DEUBRÉ (TALIBOX)
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                Deubré Baja Hitam AF-1
              </h3>
              <p className="font-body-md text-secondary leading-relaxed">
                Metak berlapis baja nirkarat bertuliskan gravir tajam 'AF-1' dan '82'. Dilengkapi tali bertenun hitam 100% serat katun tebal yang dipintal.
              </p>
              <div className="pt-4 border-t border-surface-container-highest font-mono-spec text-mono-spec text-secondary space-y-1">
                <div className="flex justify-between"><span>TANGKAT LOGO:</span><span className="text-primary">ZINC ANTI-KOROSI</span></div>
                <div className="flex justify-between"><span>PINJITAN:</span><span className="text-primary">CORRECTED MATTE</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: KRITIK & ULASAN KOLEKTOR */}
      <section className="border-b border-surface-container-highest bg-surface">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-surface-container-highest">
            <span className="font-mono-spec text-mono-spec text-primary tracking-widest uppercase font-bold">
              KRITIK &amp; ULASAN KOLEKTOR
            </span>
            <span className="font-mono-label text-mono-label text-secondary uppercase">
              248 ULASAN VERIFIKASI CHIP NFC
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-surface-container-highest bg-surface-container-lowest p-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="font-headline-lg text-[64px] font-extrabold text-primary leading-none">4.9</span>
                <div>
                  <div className="flex text-amber-500 text-lg">★★★★★</div>
                  <span className="font-mono-spec text-mono-spec text-secondary uppercase block mt-1">
                    BERDASARKAN 248 ULASAN
                  </span>
                </div>
              </div>
              <button className="px-6 py-3 bg-primary text-on-primary font-headline-sm text-xs uppercase font-bold tracking-wider hover:bg-black/80 transition-colors">
                KIRIM ULASAN ARSIP
              </button>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-8 space-y-2 font-mono-spec text-mono-spec text-secondary">
              {[
                { star: 5, pct: '94%', width: 'w-[94%]' },
                { star: 4, pct: '5%', width: 'w-[5%]' },
                { star: 3, pct: '1%', width: 'w-[1%]' },
                { star: 2, pct: '0%', width: 'w-[0%]' },
                { star: 1, pct: '0%', width: 'w-[0%]' },
              ].map((bar) => (
                <div key={bar.star} className="flex items-center space-x-4">
                  <span className="w-20">BINTANG {bar.star}</span>
                  <div className="flex-1 h-2 bg-surface-container border border-surface-container-highest overflow-hidden">
                    <div className={`h-full bg-primary ${bar.width}`}></div>
                  </div>
                  <span className="w-12 text-right">{bar.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            <div className="border border-surface-container-highest bg-surface-container-lowest p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-mono-spec">
                  <div>
                    <span className="text-primary font-bold uppercase block">R. HERMAWAN</span>
                    <span className="text-secondary text-xs">PEMBELI TERVERIFIKASI // JAKARTA SELATAN</span>
                  </div>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold uppercase text-primary">
                  Warna hitam pekat sempurna, chip NFC langsung terbaca.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Sepatu sampai dalam kondisi double-box rapi dengan segel verifikasi lengkap. Chip NFC ForceVault langsung terverifikasi di iPhone lengkap dengan histori nomor seri pabrikan. Tekstur kulit CW2288 ini sangat lembut dan matte mewah."
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-highest flex justify-between font-mono-label text-mono-label text-secondary">
                <span>UKURAN: US 9.5</span>
                <span className="text-primary font-bold">VERIFIED VAULT PURCHASE</span>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface-container-lowest p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-mono-spec">
                  <div>
                    <span className="text-primary font-bold uppercase block">D. HENDRA</span>
                    <span className="text-secondary text-xs">KOLEKTOR ARSIP // BANDUNG</span>
                  </div>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold uppercase text-primary">
                  Siluet monokrom terbaik sepanjang masa.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Triple Black AF1 adalah puncak siluet streetwear mutlak. Menggabungkan ukuran normal (TTS) dan rasa fleksibilitas fleksibel tanpa terurai. Sangat tangguh dipakai beraktivitas di berbagai kondisi."
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-highest flex justify-between font-mono-label text-mono-label text-secondary">
                <span>UKURAN: US 9.0</span>
                <span className="text-primary font-bold">VERIFIED VAULT PURCHASE</span>
              </div>
            </div>

            <div className="border border-surface-container-highest bg-surface-container-lowest p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start font-mono-spec text-mono-spec">
                  <div>
                    <span className="text-primary font-bold uppercase block">M. KUSUMA</span>
                    <span className="text-secondary text-xs">PEMBELI TERVERIFIKASI // SURABAYA</span>
                  </div>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold uppercase text-primary">
                  Pengiriman ekspres tiba kurang dari 24 jam.
                </h4>
                <p className="font-body-md text-secondary text-xs leading-relaxed">
                  "Kardus luar ForceVault tebal box dengan segel pengatur kelembapan arsip. Sudut box sepatu tidak penyok sama sekali tanpa cacat sedikit pun. Standar penanganan profesional kelas satu untuk para kolektor."
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-highest flex justify-between font-mono-label text-mono-label text-secondary">
                <span>UKURAN: US 10.0</span>
                <span className="text-primary font-bold">VERIFIED VAULT SHIPMENT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: REKOMENDASI SILUET SEJENIS */}
      <section className="border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-surface-container-highest">
            <span className="font-mono-spec text-mono-spec text-primary tracking-widest uppercase font-bold">
              REKOMENDASI SILUET SEJENIS
            </span>
            <Link href="/#catalog" className="font-mono-label text-mono-label text-primary hover:underline uppercase">
              Lihat Semua Siluet →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
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
                desc: 'Tali Pergelangan Mid',
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
                desc: 'Outsole Lug / Pinggiran Bergigi',
                price: 'Rp 2.199.000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa8SKM4Da2Z-eGHFs-HiXzSgn2suLZIxpjAeiwkbQ5yZQGxbNrjVXyBt7OXwK_zmRuF4mU8Y5R-KPibDDTC8fzxDB-FrB1yMd7w8dCmG3UV13A9v4LeETmzk9Ssgj-IN5g1Jsvqnjyah9FUO0Ei2Z44cFKgrmKdXmQ7COMsOSKxIsJBX5piImlau_lZgewPTAEnvMxGTxtaatg190T6t3MwK2DaJiBChg6JGpozVUaAc9bv4ZztFVN',
              },
            ].map((prod) => (
              <Link
                key={prod.sku}
                href="/product/1"
                className="border border-surface-container-highest bg-surface p-4 block group hover:border-primary transition-all"
              >
                <div className="aspect-square bg-surface-container mb-3 overflow-hidden relative border border-surface-container-highest">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-surface font-mono-label text-[10px] text-primary uppercase px-2 py-0.5 border border-surface-container-highest">
                    {prod.badge}
                  </span>
                </div>
                <span className="font-mono-spec text-[11px] text-secondary uppercase block">SKU: {prod.sku}</span>
                <h4 className="font-headline-sm text-sm text-primary uppercase font-bold mt-1 group-hover:underline">
                  {prod.name}
                </h4>
                <p className="font-mono-label text-xs text-secondary mt-0.5">{prod.desc}</p>
                <div className="mt-3 pt-3 border-t border-surface-container-highest flex justify-between font-mono-spec text-xs">
                  <span className="text-secondary uppercase">HARGA</span>
                  <span className="text-primary font-bold">{prod.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
