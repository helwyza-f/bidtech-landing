'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpecItem {
  label: string;
  val: string;
}

interface Epoch {
  era: string;
  year: string;
  title: string;
  desc: string;
  specs: SpecItem[];
  img: string;
}

const epochs: Epoch[] = [
  {
    era: 'ERA 01',
    year: '1982',
    title: "OG High '82",
    desc: 'Model fondasi kreasi Bruce Kilgore. Sepatu basket pertama dengan teknologi encapsulated air di tumit untuk meredam benturan optimal.',
    specs: [
      { label: 'TALI:', val: 'Propriosepsi' },
      { label: 'STRAP:', val: 'Pergelangan' },
      { label: 'TITIK PIVOT:', val: 'Lingkaran Konsentris' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4tvgbI9x7K_cN4xeFGE7LxuiMJskIbXZvsweRIkSMIjwXYPCF8Zo8PQtJ9lTitTzEjwpfkWmsuyveGfjh4yNDylKyGrA32IH6oEXnxouKM5Te2vVXe10lIsO4yvb-CbrllpZJhOmMMmUU0QadAg0llt88xgnmzxyNxM0Iop6bj4460C4oV8ZX5ADkXe8XCA8DGGV1caAwga5-kxGEwFCnf-j3Tbeadm5JZvEajS130LrQY-WOrMJi',
  },
  {
    era: 'ERA 02',
    year: '1994',
    title: 'Debut AF1 Mid',
    desc: 'Transisi dari lapangan kayu ke trotoar kota metropolitan. Siluet mid-top menghadirkan strap terintegrasi dan logo Swoosh jewel yang ikonik.',
    specs: [
      { label: 'POTONGAN:', val: 'Tinggi Kerah 3/4' },
      { label: 'SWOOSH:', val: 'Jewel & Leather' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVMXUQxGO-YtITCPYEGoTfMoWIHdKPWP83Sk8pOaU1oNmSOjvHKAm3RoLoO6QSUg7kWdidzLA_X4R_u8Gp0EtzIb2KCOMJUhksW25CJ3FdqSH-RIA8m-UVJVFQg9HvBdWTJF00p2DmGUsGDgYRl-xWQ5xy6eFJwBt02i65hbP_ISVYenuFRwe9hhzzIxewMQIIpsuXRXfHhF9GahwA6SXu3s0U8ancUtHnEnncLDYPrnL_NC-eekt',
  },
  {
    era: 'ERA 03',
    year: '2007',
    title: "Remaster AF1 '07 Low",
    desc: "Tolok ukur edisi Ulang Tahun ke-25. Pola cetakan diperbarui, panel kulit full-grain 10oz disempurnakan, serta deubré persegi baja nirkarat AF-1 '82.",
    specs: [
      { label: 'KULIT:', val: '10oz Full-Grain' },
      { label: 'DEUBRÉ:', val: "Baja Nirkarat AF-1 '82" },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJvfaged1HhqM-9jZpH9GW7oSrZXEnDsh7gBpdb-j9ryzFuKnutLQgCDaffHeUl2aPn8SYoIf1a1gkxoq6XGzpopkEQYQX1N6RMdOjKJM1ltj7nQfQzVeVM5godiDcPempKooeM3GfMVe5Aqk6zEGhncAGB-PtvvyfGn_0Lc8_qRMR-niGb7BmyYp1SsLzFnb_FuF7K2oHLobZPEdK8sx2W6jreQINv07cuDbZQS4qv80wGZxjpyTm',
  },
  {
    era: 'ERA 04',
    year: '2019+',
    title: 'Dekonstruksi Modern',
    desc: 'Era eksplorasi geometri modular. Memperkenalkan lapisan berlapis Shadow, busa drop-in React, dan kaset tumit asimetris Fontanka yang berani.',
    specs: [
      { label: 'INOVASI:', val: 'Busa Drop-in React' },
      { label: 'GEOMETRI:', val: 'Terkonstruksi Ulang' },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVC8xr5OQDgKZBLi7N43w26TPPeK0UWpvHf0nvVmcc9KdwbGtEnkNcJSAsl-0rrXZ9rJiLsrZ718UKeF60RR6XoGaOvR-DAIF-kRWxFE-wmUwjxUJ0DZIykvKm9-KYwP_KXmTXVY1yP2F2ZWs3O31n5XgWJctR9050jl4Ci-SThxIlzm_QtwplFqWR16TgGgAS1i1-N6nj3ixJGjhS7h6fo7WkBoCjweH5NcQ-d_tc6FjLfygdeXG3',
  },
];

export default function SilhouetteArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.epoch-card',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white border-b border-[#e2e2e2]" id="silhouette-archive">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-[#e2e2e2]">
          <span className="font-mono text-[11px] text-[#7e7576] uppercase tracking-widest block mb-2 font-semibold">
            GENEALOGI // 1982 — SEKARANG
          </span>
          <h2 className="text-[36px] md:text-[44px] font-extrabold tracking-tight text-[#1a1c1c] uppercase leading-tight">
            VAULT SILUET — 42 TAHUN BENTUK &amp; FUNGSI
          </h2>
          <p className="text-[14px] text-[#7e7576] mt-2">
            Empat era penting geometri desain, inovasi struktural, dan adaptasi performa lapangan basket.
          </p>
        </div>

        {/* 4-Column Epoch Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {epochs.map((e, idx) => (
            <Link
              key={idx}
              href="/kisah"
              className="epoch-card border border-[#e2e2e2] p-5 sm:p-6 flex flex-col justify-between hover:border-[#1a1c1c] hover:-translate-y-1 transition-all duration-300 group bg-white block"
            >
              <div>
                {/* Era & Year Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#e2e2e2]">
                  <span className="font-mono text-[11px] text-[#7e7576] uppercase tracking-wider group-hover:text-[#1a1c1c] transition-colors">{e.era}</span>
                  <span className="font-mono text-[12px] text-[#1a1c1c] font-bold">{e.year}</span>
                </div>

                {/* Epoch Image Preview */}
                <div className="py-6 border-b border-[#e2e2e2]">
                  <div className="w-full h-40 bg-[#ebebeb] border border-[#e2e2e2] flex items-center justify-center p-3 overflow-hidden">
                    <img
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
                      alt={e.title}
                      src={e.img}
                    />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="pt-4 space-y-2">
                  <h3 className="text-[18px] font-bold text-[#1a1c1c] leading-snug group-hover:underline">{e.title}</h3>
                  <p className="text-[13px] text-[#7e7576] leading-relaxed">{e.desc}</p>
                </div>
              </div>

              {/* Specs at bottom */}
              <div className="mt-6 pt-4 border-t border-[#e2e2e2] font-mono text-[11px] space-y-1.5">
                {e.specs.map((s, sIdx) => (
                  <div key={sIdx} className="flex justify-between items-center">
                    <span className="text-[#7e7576] uppercase">{s.label}</span>
                    <span className="text-[#1a1c1c] font-bold">{s.val}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
