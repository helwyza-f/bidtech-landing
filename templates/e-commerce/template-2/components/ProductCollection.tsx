'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FilterCategory = 'all' | 'low' | 'mid-high' | 'women' | 'special';

interface Product {
  sku: string;
  badge: string;
  name: string;
  desc: string;
  price: string;
  img: string;
  categories: FilterCategory[];
}

const products: Product[] = [
  {
    sku: 'CW2288-111',
    badge: 'IKON',
    name: "Nike Air Force 1 '07 Triple White",
    desc: 'Triple White / Full Grain Leather',
    price: 'Rp 1.549.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqqRGUraQGnRBcovs-Lz5-22WgxDbh-_RGRpO6RB1ju8c2Dbkm8tul4fSWpXG0muHe8bX11X3uPZzvOwjNqxkQo_699nlYYza7DRZI5RJLA6zSZpiXqH3YvPIztu_J12ALVs1BcoCcN_6whyDUzrliZ7Ni5MX9Ec_SMZLwAEwbu9b9EWihSz_eD26v0wUHaTEvW35aLQQmc7XjtXDxI1aNCSOnJ-LHqLUFn3dWJOun2TN9ua6gyQO7',
    categories: ['all', 'low'],
  },
  {
    sku: 'FB8883-001',
    badge: 'BARU',
    name: "Nike Air Force 1 '07 LV8",
    desc: 'Dark Stucco / Neutral Canvas',
    price: 'Rp 1.829.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0L5OOr9oHf7I4Z2sJG4DU_MN_upyPffCxHRAg8r3UDEVON3ihQDxvzXd9YBgPJO39huthO1k9uMJufcoU6UXwHZQZ2tVUKkjrk3Cjw3dfpVDq_pBu8pxUhisi76tpAlQsLatRB-3bkanQzsmdOMfWaNUQzqMvdIw8tGid_3MS3F8uh-373kLrZ0r4WR_OlPgGdLp0yO6eG21OuipNRHIH-xBdjZJzUiqqgRI1MTbOYD5a1zjMLqI5',
    categories: ['all', 'low', 'special'],
  },
  {
    sku: 'CI0919-120',
    badge: 'WANITA',
    name: 'Nike Air Force 1 Shadow',
    desc: 'Pastel Layered / Dual Swoosh',
    price: 'Rp 1.909.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa8SKM4Da2Z-eGHFs-HiXzSgn2suLZIxpjAeiwkbQ5yZQGxbNrjVXyBt7OXwK_zmRuF4mU8Y5R-KPibDDTC8fzxDB-FrB1yMd7w8dCmG3UV13A9v4LeETmzk9Ssgj-IN5g1Jsvqnjyah9FUO0Ei2Z44cFKgrmKdXmQ7COMsOSKxIsJBX5piImlau_lZgewPTAEnvMxGTxtaatg190T6t3MwK2DaJiBChg6JGpozVUaAc9bv4ZztFVN',
    categories: ['all', 'women'],
  },
  {
    sku: 'DB4109-001',
    badge: 'KULIT PREMIUM',
    name: 'Nike Air Force 1 Luxe',
    desc: 'Black Gum / Sol Lug Tangguh',
    price: 'Rp 2.199.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI2stY4B_rq1dZGDwnXYrSuSMMyv2mpySsD_KpAv_BMgHxVeMhYsQfVdKEzTEeBBwnHKVepvThxDqwxcg_ZMA_6Esx_sohBu-7ii5Yx2QYbnvMiiAQw_sfz1fwg41xCCMwPKxym1U0ztycPvCSsx0DcLpP82TLYMcq8pQJYA1kWpbDKQ5MkQIs-Ay1A77L6AOVKxMbEm7FKhxbdvLL9JKCkjcj5pJ8eKwhK_7ywbK0rPq5zrAvDacS',
    categories: ['all', 'special'],
  },
  {
    sku: 'CW2289-001',
    badge: 'MID KLASIK',
    name: "Nike Air Force 1 '07 Mid",
    desc: 'Triple Black / Tali Kerah Empuk',
    price: 'Rp 1.799.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-m6i9KeH7U2L7Fg3VJmaoYj5Ql1D7TDf80VfgLpr1gqxc3sWkybYNMr8NJSSdh9C7k3Wl1aAuCYTxD7ZKkJm3KoC7B6DeanS5v_0-0ly7vXIlLEhLSZT3idmal-3qC6PTbccTocfeyYdT3WElYYoTzccQtLbNouYdIzEcMnO8oFn4fobIThDbPcyZRp8uyJHqqZTDwmGDSVsUc-UgZIPCCdOLA0IdOOexpEm-FyQHjMCGtCGsi2J',
    categories: ['all', 'mid-high'],
  },
  {
    sku: 'DH7615-101',
    badge: 'BANTALAN TEKNO',
    name: 'Nike Air Force 1 React',
    desc: 'White Cyan / Bantalan Drop-in React',
    price: 'Rp 2.099.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbeY8bYcE5qWxaeE_qNgkpu_Yqkhd_Mdy4ImpvfTa3KbUZLMkoDt7N2yIXiMmIg5YBUUtSxz-yxAPY37ScBEVPa-_i3WI6_exrqgO11MzoFe4qB65Ev5eAYwNazvVsRgetWOjXKPZXzdLO8-sSH538LSunhe7G3XR1akCe1cZHEWff2M82fqrXxUZzUsOkdeWnZ55K24EXxci3x4g65HtRUU97wmN3KaDdu5uYQQ67MNIAPPGpxkWI',
    categories: ['all', 'low', 'special'],
  },
  {
    sku: 'DM0209-100',
    badge: 'OG HIGH',
    name: "Nike Air Force 1 High '07",
    desc: 'Vintage Sail / Kerah Ankle Tinggi',
    price: 'Rp 2.249.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhNt4nxRw6pX8GpzLvaF2zGO98_ZBdKUlEDnI_tMhOl74GpKMV65Y1rQD8lzJe4R0R3T80du5EBJmd7PVlsdtqpXyb5X90HAdzEsJlDMwuCg28Vnndb2XZ7oN7sHPE1o-nPKjWZyn2UnbjwnUmZsZRI9yqraOhJd1F5k4BPMuH0YOsX9sgqEgpboq80q_-xs2gxaxRGKGYh6w4r7GoB5VwrtxnFdWQhVb4xSblgSCb0bnaUToe8l0q',
    categories: ['all', 'mid-high'],
  },
  {
    sku: 'DA7024-101',
    badge: 'EKSPERIMENTAL',
    name: 'Nike Air Force 1 Fontanka',
    desc: 'Triple White / Kaset Tumit React',
    price: 'Rp 1.999.000',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTfI9i_U_6iQX6LDKyc8aud6CJZV1-Hp6DcUR3dShAan3lv15cRtirLXopPBqsiEPJqxW3DgwLVtIZRVVjpYqyYzQRFfBKnO2D66qx5FrP1MpIKcdE-j1wxkZrC0rSaPwsqsE2N6tK8F1Pz-ghBl_QxnfFvPSN1TXwRN4e5mvRI7rhbJYCMaV9AEd9-_v8e9oq3BXC8iSELn_CJm8NLKZhVNKGaPJ_hvNRXUrZkKKDR_u6AUMyMdqf',
    categories: ['all', 'women', 'special'],
  },
];

export default function ProductCollection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (sku: string) => {
    setFavorites((prev) => ({ ...prev, [sku]: !prev[sku] }));
  };

  const handleFilterChange = (cat: FilterCategory) => {
    if (cat === activeFilter) return;
    setActiveFilter(cat);
  };

  useGSAP(
    () => {
      // Entrance animation on scroll
      gsap.fromTo(
        '.anim-item',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  // GSAP animation on filter change
  useGSAP(
    () => {
      if (gridRef.current && activeFilter) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 20, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
        );
      }
    },
    { dependencies: [activeFilter], scope: gridRef }
  );

  const filteredProducts = products.filter((p) => p.categories.includes(activeFilter));

  const filterButtons: { label: string; value: FilterCategory }[] = [
    { label: 'SEMUA VARIAN (8)', value: 'all' },
    { label: 'KLASIK RENDAH', value: 'low' },
    { label: 'MID & HIGH', value: 'mid-high' },
    { label: 'KOLEKSI WANITA', value: 'women' },
    { label: 'EDISI SPESIAL', value: 'special' },
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white border-b border-[#e2e2e2]" id="catalog">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#e2e2e2]">
          <div className="anim-item">
            <span className="font-mono text-[11px] text-[#7e7576] uppercase tracking-wider block mb-1">
              INDEKS INVENTARIS // PERILISAN 2024
            </span>
            <h2 className="text-[36px] md:text-[44px] font-extrabold tracking-tight text-[#1a1c1c] uppercase leading-tight">
              KOLEKSI LENGKAP<br className="sm:hidden" /> VAULT
            </h2>
            <p className="text-[14px] text-[#7e7576] mt-2">
              Inventaris dikurasi secara presisi. 100% edisi Air Force 1 asli terverifikasi.
            </p>
          </div>
          {/* Filter Tabs */}
          <div className="anim-item flex flex-wrap gap-2 mt-6 md:mt-0">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilterChange(btn.value)}
                className={`h-9 px-4 font-mono text-[11px] font-bold uppercase tracking-wider border transition-all duration-200 ${
                  activeFilter === btn.value
                    ? 'bg-[#1a1c1c] text-white border-[#1a1c1c] shadow-sm'
                    : 'bg-white text-[#1a1c1c] border-[#e2e2e2] hover:border-[#1a1c1c]'
                }`}
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const isFav = !!favorites[p.sku];
            return (
              <div
                key={p.sku}
                className="product-card group bg-white border border-[#e2e2e2] hover:border-[#1a1c1c] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Card Top SKU & Badge */}
                <div className="p-3.5 flex items-center justify-between border-b border-[#e2e2e2]">
                  <span className="font-mono text-[11px] text-[#7e7576] uppercase tracking-wider">
                    SKU: {p.sku}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-white border border-[#e2e2e2] uppercase text-[#1a1c1c] font-bold">
                    {p.badge}
                  </span>
                </div>

                {/* Card Image Area */}
                <div className="p-6 bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden h-52 border-b border-[#e2e2e2]">
                  <Link href="/product/1" className="w-full h-full flex items-center justify-center">
                    <img
                      className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
                      alt={p.name}
                      src={p.img}
                    />
                  </Link>
                  <button
                    aria-label="Simpan ke favorit"
                    onClick={() => toggleFavorite(p.sku)}
                    className="absolute top-3 right-3 text-[#7e7576] hover:text-[#1a1c1c] transition-colors p-1 z-10"
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform active:scale-125 ${isFav ? 'material-symbols-fill text-[#ba1a1a]' : ''}`}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card Content & Price */}
                <div className="p-4 bg-white flex flex-col justify-between flex-1">
                  <Link href="/product/1" className="block">
                    <h3 className="text-[15px] font-bold text-[#1a1c1c] leading-snug hover:underline">{p.name}</h3>
                    <p className="font-mono text-[11px] text-[#7e7576] mt-1">{p.desc}</p>
                  </Link>
                  <div className="mt-4 pt-3 border-t border-[#e2e2e2] flex items-center justify-between">
                    <span className="font-mono text-[13px] font-bold text-[#1a1c1c]">{p.price}</span>
                    <Link
                      href="/product/1"
                      className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1a1c1c] hover:underline underline-offset-4 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      TAMBAH KE KANTONG →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Micro Banner */}
        <div className="mt-10 p-4 border border-[#e2e2e2] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex items-center space-x-2 text-[#1a1c1c] font-bold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>JAMINAN VAULT: SETIAP PASANG TERVERIFIKASI SERIAL RFID SEBELUM DIRILIS DARI BRANKAS.</span>
          </div>
          <span className="text-[#7e7576] tracking-wider">
            SINKRONISASI BUKU BESAR // INVENTARIS REAL-TIME
          </span>
        </div>
      </div>
    </section>
  );
}
