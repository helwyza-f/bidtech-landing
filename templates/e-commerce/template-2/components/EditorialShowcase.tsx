'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Spec {
  label: string;
  title: string;
  desc: string;
  img: string;
  alt: string;
}

const specs: Spec[] = [
  {
    label: 'SPESIFIKASI 01 // KULIT',
    title: 'Kulit Full-Grain 10oz',
    desc: 'Panel kulit tumbled pilihan mempertahankan integritas struktur selama puluhan tahun sembari menyesuaikan lekuk unik langkah pemakai.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlsPJ1exhZz_s_I5wriO7fpY2p3Olyp_WC25TBudComzkrUa7Mj_4nhtTR9Hc34607pkMK5oK-nn_6138lUZMdIGUtSSnOXO-1JYghRENt_lYEQhGVONX1FvYr-FB8UG7W57-RvauV9PRrp_G7jzB5nEyO7lGcC-ZvBMLs96vrhxflyTedChdpt8FB8Yf7ASr5FWfGShNAeHro7Tz0KYMrgbed0qz4U67rx2gA_n3pJzrQTt2l-Ds_',
    alt: 'Extreme macro cinematic photography of premium tumbled full-grain white leather on a sneaker upper.',
  },
  {
    label: 'SPESIFIKASI 02 // VENTILASI',
    title: 'Toe-Box Berperforasi',
    desc: 'Matriks ventilasi radial berpresisi laser dirancang khusus untuk sirkulasi termal selama 48 menit intensitas permainan lapangan keras.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2Zfntr999_VBn-YdElT9Opsh8lrFGXc7b2t5yQHC8E-IffakHkOqU6I3yMZsOHYAKVDCpyQEvKoErXDMojAYS6NlhsGorHNZjBCCCrDTGuOm5KMzpfJqTTmdMrnSoAWbh9EqdDFbsPCYmgWt2mBGwFu-Sas0UYzOzdqmF72ifND_TLrXBxBlyBt88U7ni7H5OvNEcZ7WcdfIjiSJhNQWNfMJeL7oxlbq1ueN60xud5lyOmCQVfkp',
    alt: 'Extreme close-up macro studio capture of the radial perforated toe-box on an Air Force 1 shoe.',
  },
  {
    label: 'SPESIFIKASI 03 // TRAKSI',
    title: 'Titik Pivot Konsentris',
    desc: 'Tata letak sol luar melingkar hasil inovasi Kilgore untuk memfasilitasi rotasi manuver 360 derajat tanpa slip atau kehilangan torsi.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKEPPZcJP5iZ3ncTNKx6dESD01pIVxBymA9qx4xGKc8N1Bxz54e61Ssxn6dMIH_MDTMFSy8tUDZkHe9kJ0l_gk7anOn-IcTqAqfaMAo2cly7hckEMV3a17Y8k8FOCtSLgBH8czLuclk6ktvpPCEr7jACGtGQFrVL7qAYWeLmFsVMoLKzDWpAJtSScLhWM-BWKgAm8DnxOuOB76C7z0LzOC5_sF0u6DjPbhPtrvjiyjSJYusbQLJa8L',
    alt: 'Macro detail of the Air Force 1 rubber outsole pivot-point circular tread pattern.',
  },
  {
    label: 'SPESIFIKASI 04 // PERANGKAT LOGAM',
    title: 'Deubré Baja AF-1',
    desc: 'Pelat pengunci tali sepatu dari cold-stamped stainless steel. Diukir dengan insinyia arsip AF-1 sebagai lambang keaslian kelas kolektor.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDOhzbg4jcHFyuxNH1PWNxOT424aso80QtD_CZNcNNu4M6sPZVQFUke-415Fa7wIsUPWu7a-QWLUOMM10o1U9py_kXT_F2Ed8e3lQrQJkygeW-ogxzapxfSdUfiJo9R9EGIaFg_wUfO4a7G2Cj-CzSPoQkzobFbxrsCPhmlOnAU2rwQsxC7TYA1CemvprQnhG-cCFF5OQZNRTTWNDPPHSKbpSxtGtrBl7FSsJxsHn7oYrAZ-ik0ziz',
    alt: 'Macro high contrast product photo of the stainless steel rectangular AF-1 82 deubré lace jewel.',
  },
];

export default function EditorialShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-primary text-on-primary py-24 md:py-32 border-b border-surface-container-highest">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Headline & Subtext */}
        <div className="anim-item grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-end mb-16 pb-8 border-b border-neutral-800">
          <div className="lg:col-span-8">
            <span className="font-mono-label text-mono-label text-neutral-400 uppercase tracking-widest block mb-3">
              BEDAH TEKNIS // SAINS MATERIAL
            </span>
            <h2 className="text-headline-lg md:text-[56px] md:leading-[60px] font-headline-lg font-bold tracking-tight text-on-primary uppercase">
              KEMURNIAN REKAYASA<br />DI SETIAP JAHITAN.
            </h2>
          </div>
          <div className="lg:col-span-4 text-neutral-400 font-body-md text-body-md">
            Setiap komponen Air Force 1 dirancang untuk bertahan melewati benturan fisik keras pemain basket era 1980-an sebelum bertransformasi menjadi ikon streetwear global.
          </div>
        </div>

        {/* Macro Editorial 4-Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {specs.map((s, idx) => (
            <Link
              key={idx}
              href="/kisah"
              className="anim-item border border-neutral-800 p-4 space-y-4 hover:border-neutral-600 transition-colors group block"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                  alt={s.alt}
                  src={s.img}
                />
                <span className="absolute bottom-2 left-2 font-mono-label text-[9px] bg-black text-white px-2 py-0.5 uppercase">
                  {s.label}
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary group-hover:underline">{s.title}</h3>
                <p className="font-body-sm text-body-sm text-neutral-400 mt-1">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
