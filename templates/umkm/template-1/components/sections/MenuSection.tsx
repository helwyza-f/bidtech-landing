'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ShoppingCart, Check, X, MessageCircle, Star } from 'lucide-react';

interface SizeOption { label: string; ml: number; extra: number; }
interface AddonOption { id: string; label: string; price: number; }
interface DrinkItem {
  id: number;
  tag: string;
  name: string;
  tagline: string;
  desc: string;
  basePrice: number;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  sizes: SizeOption[];
  addons: AddonOption[];
}

const drinks: DrinkItem[] = [
  {
    id: 1,
    tag: 'Teh Original',
    name: 'Original Tea',
    tagline: 'Segar Alami, Bikin Semangat',
    desc: 'Kesegaran teh asli pegunungan dengan rasa autentik tanpa campuran apapun. Murni dari pucuk daun teh pilihan.',
    basePrice: 12000,
    price: 'Rp 12.000',
    rating: 4.9,
    reviews: 214,
    image: '/assets/teh_in_6_minuman_clean/01_original_tea.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'gula', label: 'Extra Gula Aren', price: 3000 },
      { id: 'es', label: 'Extra Es Batu', price: 0 },
    ],
  },
  {
    id: 2,
    tag: 'Teh Hijau',
    name: 'Matcha Latte',
    tagline: 'Creamy, Lembut, Bikin Nagih',
    desc: 'Perpaduan teh hijau pilihan grade premium dengan susu creamy segar yang menghasilkan cita rasa kaya dan mellow.',
    basePrice: 16000,
    price: 'Rp 16.000',
    rating: 4.8,
    reviews: 187,
    image: '/assets/teh_in_6_minuman_clean/02_matcha_latte.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'susu', label: 'Extra Susu', price: 3000 },
      { id: 'boba', label: 'Extra Boba', price: 4000 },
    ],
  },
  {
    id: 3,
    tag: 'Teh Susu',
    name: 'Milk Tea',
    tagline: 'Manis Alami, Bikin Hati Adem',
    desc: 'Rasa teh yang kuat berpadu boba kenyal & susu lembut. Memberikan sensasi kenyang dan segar sekaligus.',
    basePrice: 15000,
    price: 'Rp 15.000',
    rating: 4.8,
    reviews: 192,
    image: '/assets/teh_in_6_minuman_clean/03_milk_tea.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'gula', label: 'Extra Gula Aren', price: 3000 },
      { id: 'susu', label: 'Extra Milk', price: 3000 },
    ],
  },
  {
    id: 4,
    tag: 'Teh Citrus',
    name: 'Lemon Tea',
    tagline: 'Segar Asam, Bikin Melek',
    desc: 'Kesegaran teh alami dengan perasan lemon segar murni. Cocok untuk menemani hari yang panas dan aktivitas padat.',
    basePrice: 14000,
    price: 'Rp 14.000',
    rating: 4.7,
    reviews: 163,
    image: '/assets/teh_in_6_minuman_clean/04_lemon_tea.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'lemon', label: 'Extra Lemon', price: 2000 },
      { id: 'madu', label: 'Extra Madu', price: 3000 },
    ],
  },
  {
    id: 5,
    tag: 'Teh Buah',
    name: 'Strawberry Tea',
    tagline: 'Manis Asam, Bikin Ceria',
    desc: 'Perpaduan teh dan buah stroberi segar yang manis asam. Warna merah alami yang menggoda selera.',
    basePrice: 15000,
    price: 'Rp 15.000',
    rating: 4.8,
    reviews: 148,
    image: '/assets/teh_in_6_minuman_clean/05_strawberry_tea.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'strawberry', label: 'Extra Strawberry', price: 4000 },
      { id: 'susu', label: 'Extra Susu', price: 3000 },
    ],
  },
  {
    id: 6,
    tag: 'Teh Buah',
    name: 'Peach Tea',
    tagline: 'Floral Harum, Bikin Tenang',
    desc: 'Aroma floral teh berpadu manis harum buah persik segar. Pilihan sempurna untuk relaksasi dan me-time.',
    basePrice: 15000,
    price: 'Rp 15.000',
    rating: 4.9,
    reviews: 201,
    image: '/assets/teh_in_6_minuman_clean/06_peach_tea.webp',
    sizes: [
      { label: 'Reguler', ml: 350, extra: 0 },
      { label: 'Large', ml: 500, extra: 3000 },
      { label: 'Jumbo', ml: 700, extra: 6000 },
    ],
    addons: [
      { id: 'peach', label: 'Extra Peach', price: 4000 },
      { id: 'madu', label: 'Extra Madu', price: 3000 },
    ],
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scriptAccentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>({});
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const getCardStep = () => {
    if (!cardsContainerRef.current) return 280;
    const children = cardsContainerRef.current.children;
    if (children.length >= 2) {
      const step = (children[1] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;
      if (step > 0) return step;
    }
    const first = children[0] as HTMLElement | null;
    return first ? first.offsetWidth + 20 : 280;
  };

  const handleCardsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const step = getCardStep();
    if (step <= 0) return;
    const index = Math.round(target.scrollLeft / step);
    setActiveCardIndex(Math.min(drinks.length - 1, Math.max(0, index)));
  };

  const scrollToCard = (index: number) => {
    if (!cardsContainerRef.current) return;
    const target = cardsContainerRef.current;
    const step = getCardStep();
    target.scrollTo({
      left: Math.max(0, index) * step,
      behavior: 'smooth',
    });
    setActiveCardIndex(index);
  };

  const handleAddToCart = (id: number) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1400);
  };

  const openModal = useCallback((drink: DrinkItem) => {
    setSelectedDrink(drink);
    setQty(1);
    setSelectedSize(0);
    setSelectedAddons([]);
  }, []);

  const closeModal = useCallback(() => {
    if (!modalRef.current || !modalCardRef.current) return;
    import('gsap').then(({ default: gsap }) => {
      gsap.to(modalCardRef.current, { scale: 0.88, opacity: 0, y: 20, duration: 0.28, ease: 'power3.in' });
      gsap.to(modalRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => setSelectedDrink(null) });
    });
  }, []);

  useEffect(() => {
    if (!selectedDrink || !modalRef.current || !modalCardRef.current) return;
    import('gsap').then(({ default: gsap }) => {
      gsap.fromTo(modalRef.current!, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(modalCardRef.current!, { scale: 0.88, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: 0.42, ease: 'back.out(1.5)' });
    });
  }, [selectedDrink]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calcTotal = (drink: DrinkItem) => {
    const sizeExtra = drink.sizes[selectedSize]?.extra ?? 0;
    const addonTotal = drink.addons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((s, a) => s + a.price, 0);
    return (drink.basePrice + sizeExtra + addonTotal) * qty;
  };

  const getWaLink = (drink: DrinkItem) => {
    const size = drink.sizes[selectedSize];
    const addons = drink.addons.filter((a) => selectedAddons.includes(a.id));
    const total = calcTotal(drink).toLocaleString('id-ID');
    const addonStr = addons.length ? `\nTambahan: ${addons.map((a) => a.label).join(', ')}` : '';
    const msg = encodeURIComponent(
      `Halo Teh.in! Saya mau order:\n*${drink.name}* (${size.label} ${size.ml}ml) x${qty}${addonStr}\nTotal: Rp ${total}\n\nMohon konfirmasi pesanan. Terima kasih! 🍃`
    );
    return `https://wa.me/6281234567890?text=${msg}`;
  };

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        // ── 0. PARALLAX UNTUK BACKGROUND DARI HERO SECTION ──
        if (bgParallaxRef.current) {
          gsap.fromTo(
            bgParallaxRef.current,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        // ── MASTER ENTRANCE TIMELINE (SCROLLTRIGGER) ──
        const masterTL = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. Header reveal (tag, title, subtitle)
        if (headerRef.current) {
          masterTL.fromTo(
            headerRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
            },
            0
          );
        }

        // 2. Handwriting script accent reveal with slight rotation pop
        if (scriptAccentRef.current) {
          masterTL.fromTo(
            scriptAccentRef.current,
            { scale: 0.8, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: -4,
              duration: 1,
              ease: 'back.out(1.7)',
            },
            0.15
          );
        }

        // 3. 6 Pillar cards — Scale + Blur Pop
        if (cardsContainerRef.current) {
          const cards = cardsContainerRef.current.querySelectorAll('.pillar-card');
          const cartBtns = cardsContainerRef.current.querySelectorAll('.cart-btn');

          masterTL.fromTo(
            cards,
            { scale: 0.75, opacity: 0, filter: 'blur(14px)' },
            {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.7,
              stagger: 0.07,
              ease: 'expo.out',
            },
            0.1
          );

          // 4. Floating cart buttons pop in with bounce
          masterTL.fromTo(
            cartBtns,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: 'back.out(2)',
            },
            0.35
          );
        }

        // 6. Footer button & stamp reveal
        if (footerRef.current) {
          masterTL.fromTo(
            footerRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            0.9
          );
        }
      }, sectionRef);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 relative w-full overflow-hidden bg-[#F5F2EB] scroll-mt-20"
    >
      {/* ── LAYER 1: BACKGROUND DARI HERO SECTION (WALL, PODIUM & DAPPLED LIGHT) ── */}
      <div
        ref={bgParallaxRef}
        className="absolute -inset-y-12 inset-x-0 w-full h-[115%] pointer-events-none z-0 overflow-hidden select-none"
      >
        <img
          src="/assets/background.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Soft overlay gradient untuk menjaga kontras teks dan kartu tetap jernih */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EB]/75 via-[#F5F2EB]/55 to-[#F5F2EB]/80" />
      </div>


      <div className="container relative z-20">
        {/* ── HEADER CONTAINER DENGAN AKSEN SCRIPT KANAN ATAS ── */}
        <div className="relative max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          {/* Aksen Script Kanan Atas: "Lebih dari Sekadar Teh 🍃" */}
          <div
            ref={scriptAccentRef}
            className="hidden md:flex absolute right-0 top-0 flex-col items-end pointer-events-none select-none -rotate-3"
          >
            <span className="font-script text-[2.2rem] lg:text-[2.6rem] text-[#5C6B57] leading-none tracking-normal">
              Lebih dari
            </span>
            <span className="font-script text-[2.2rem] lg:text-[2.6rem] text-[#5C6B57] leading-none tracking-normal -mt-1">
              Sekadar Teh
            </span>
            <img
              src="/assets/individual/03_icon_daun_teh.webp"
              alt=""
              aria-hidden="true"
              className="w-5 h-5 object-contain mt-1.5 mr-2 -rotate-12 opacity-85"
            />
          </div>

          {/* Header Tengah: Tag, Title, Subtitle */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto">
            {/* Tag Tengah dengan Garis Horisontal: — 🍃 MENU PILIHAN — */}
            <div className="inline-flex items-center justify-center gap-2.5 mb-2.5">
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#1F331A]/35"></span>
              <img
                src="/assets/individual/03_icon_daun_teh.webp"
                alt="Daun Teh"
                className="w-4 h-4 object-contain"
              />
              <span className="font-nav text-[0.72rem] sm:text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#1F331A]">
                Menu Pilihan
              </span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-[#1F331A]/35"></span>
            </div>

            {/* Judul Utama */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] text-[#1F331A] font-normal leading-[1.15] tracking-tight mb-2.5">
              Nikmat di Setiap Tegukan
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#5C6B57] leading-relaxed max-w-xl mx-auto">
              Berbagai varian minuman teh yang dibuat dari daun teh berkualitas, untuk menemani setiap momen Anda.
            </p>
          </div>
        </div>

        {/* ── SHOWCASE 6 PILAR MINUMAN (HORIZONTAL SNAP SLIDER DI MOBILE, GRID 6-KOLOM DI DESKTOP) ── */}
        <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          <div
            ref={cardsContainerRef}
            onScroll={handleCardsScroll}
            className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 md:gap-3.5 lg:gap-4.5 items-stretch overflow-x-auto md:overflow-visible pb-4 pt-1 px-4 sm:px-6 md:px-0 no-scrollbar snap-x snap-mandatory"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '1.25rem',
              scrollPaddingRight: '1.25rem',
            }}
          >
            {drinks.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="pillar-card group relative flex flex-col justify-between rounded-[1.85rem] sm:rounded-[2.1rem] overflow-hidden bg-[#ECE8DF]/80 border border-[#1F331A]/12 shadow-[0_10px_26px_rgba(31,51,26,0.08)] hover:shadow-[0_22px_45px_-10px_rgba(31,51,26,0.22)] transition-all duration-500 hover:-translate-y-2 select-none cursor-pointer w-[72vw] max-w-[265px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink md:snap-align-none"
              >
                {/* Foto Bersih Minuman High-Res (Clean Studio) */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[10/17] overflow-hidden bg-gradient-to-b from-[#FAF8F3]/60 via-[#EAE6DD]/40 to-[#E4DFD3]/80">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft bottom vignette agar foto menyatu harmonis dengan lekukan kartu */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1F331A]/20 via-transparent to-transparent pointer-events-none" />

                  {/* ── MOBILE INFO OVERLAY (Selalu tampil di mobile agar pengunjung tahu nama & harga minuman) ── */}
                  <div className="md:hidden absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end pt-8 select-none">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[0.58rem] uppercase tracking-wider text-[#85D472] font-bold">
                        {item.tag}
                      </span>
                      <span className="text-[0.62rem] text-white/75 font-semibold flex items-center gap-0.5">
                        ★ {item.rating}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-1">
                      <div className="min-w-0 flex-1 pr-1">
                        <h3 className="font-serif text-[0.88rem] sm:text-base font-bold text-white leading-tight truncate drop-shadow-sm">
                          {item.name}
                        </h3>
                        <div className="font-serif text-xs sm:text-sm font-bold text-[#F3CE85] mt-0.5">
                          {item.price}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md shrink-0 border border-white/20 active:scale-90 ${
                          addedItems[item.id]
                            ? 'bg-[#2D4A27] text-white scale-105'
                            : 'bg-[#1F331A] text-white hover:bg-[#2D4A27]'
                        }`}
                        aria-label={`Pesan ${item.name}`}
                      >
                        {addedItems[item.id] ? (
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <ShoppingCart className="w-3.5 h-3.5 stroke-[2]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tombol Lingkaran Hijau Desktop (Hanya Tampil di Desktop saat Idle) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item);
                    }}
                    className={`cart-btn hidden md:flex absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full items-center justify-center transition-all duration-300 shadow-[0_6px_16px_rgba(31,51,26,0.32)] active:scale-90 group-hover:opacity-0 group-hover:scale-75 group-hover:pointer-events-none ${
                      addedItems[item.id]
                        ? 'bg-[#2D4A27] text-white scale-110 shadow-[0_0_18px_rgba(45,74,39,0.5)]'
                        : 'bg-[#1F331A] hover:bg-[#2D4A27] text-white hover:scale-110'
                    }`}
                    aria-label={`Pesan ${item.name}`}
                  >
                    {addedItems[item.id] ? (
                      <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                    ) : (
                      <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                    )}
                  </button>

                  {/* ── FULL CARD BLACK BLUR BOTTOM DRAWER REVEAL (HANYA AKTIF DI DESKTOP HOVER) ── */}
                  <div className="card-drawer-overlay hidden md:flex absolute inset-0 z-20 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-black/75 backdrop-blur-md p-3.5 sm:p-4 flex-col justify-between rounded-[1.85rem] sm:rounded-[2.1rem] will-change-transform pointer-events-none group-hover:pointer-events-auto border border-white/10 select-none">
                    {/* Header Drawer: Badge Varian & Tagline */}
                    <div className="flex items-center justify-between shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-[0.6rem] sm:text-[0.66rem] tracking-wider uppercase font-semibold text-[#E6E1D5]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#85D472] inline-block animate-pulse" />
                        Teh Pilihan
                      </span>
                      <span className="text-[0.65rem] text-white/50 font-serif">
                        0{item.id}
                      </span>
                    </div>

                    {/* Area Tengah: Judul & Deskripsi Lengkap Sangat Jelas Terbaca */}
                    <div className="my-auto py-1">
                      <h3 className="font-serif text-[1rem] sm:text-[1.14rem] lg:text-[1.12rem] xl:text-[1.18rem] font-bold text-white leading-snug tracking-tight drop-shadow-sm">
                        {item.name}
                      </h3>
                      <div className="w-7 h-[1.5px] bg-[#E8C882]/80 my-1.5 sm:my-2 rounded-full" />
                      <p className="font-sans text-[0.7rem] sm:text-[0.76rem] text-white/85 leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* Footer Drawer: Harga & Tombol Pesan Interaktif */}
                    <div className="pt-2 sm:pt-2.5 border-t border-white/20 flex items-center justify-between shrink-0">
                      <div className="flex flex-col">
                        <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wider text-white/60 font-nav font-medium">
                          Harga
                        </span>
                        <span className="font-serif text-sm sm:text-[0.95rem] lg:text-[1.05rem] font-bold text-[#F3CE85] tracking-tight">
                          {item.price}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item.id);
                        }}
                        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-nav text-[0.7rem] sm:text-xs font-bold flex items-center gap-1.5 transition-all duration-300 shadow-md ${
                          addedItems[item.id]
                            ? 'bg-[#2D4A27] text-white scale-105 border border-[#85D472]/40'
                            : 'bg-white text-[#1F331A] hover:bg-[#F5F2EB] hover:scale-105 active:scale-95'
                        }`}
                        aria-label={`Pesan ${item.name}`}
                      >
                        {addedItems[item.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Masuk</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 stroke-[2]" />
                            <span>Pesan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── INDIKATOR DOTS, NAVIGASI & HINT GESER DI MOBILE ── */}
          <div className="flex md:hidden flex-col items-center gap-3 mt-4 mb-2 select-none px-4">
            {/* Dots & Nav Buttons */}
            <div className="flex items-center justify-center gap-3">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
                disabled={activeCardIndex === 0}
                aria-label="Minuman sebelumnya"
                className={`w-8 h-8 rounded-full border border-[#1F331A]/20 flex items-center justify-center transition-all duration-200 ${
                  activeCardIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-[#1F331A]/50 bg-white/40'
                    : 'bg-white text-[#1F331A] shadow-sm hover:bg-[#1F331A] hover:text-white active:scale-90'
                }`}
              >
                <span className="text-sm font-bold leading-none">‹</span>
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5 px-1">
                {drinks.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToCard(i)}
                    aria-label={`Lihat minuman ${i + 1}: ${item.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeCardIndex === i
                        ? 'w-7 bg-[#2D4A27]'
                        : 'w-2 bg-[#1F331A]/25 hover:bg-[#1F331A]/40'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => scrollToCard(Math.min(drinks.length - 1, activeCardIndex + 1))}
                disabled={activeCardIndex === drinks.length - 1}
                aria-label="Minuman selanjutnya"
                className={`w-8 h-8 rounded-full border border-[#1F331A]/20 flex items-center justify-center transition-all duration-200 ${
                  activeCardIndex === drinks.length - 1
                    ? 'opacity-30 cursor-not-allowed text-[#1F331A]/50 bg-white/40'
                    : 'bg-white text-[#1F331A] shadow-sm hover:bg-[#1F331A] hover:text-white active:scale-90'
                }`}
              >
                <span className="text-sm font-bold leading-none">›</span>
              </button>
            </div>

            {/* Helper Text */}
            <div className="flex items-center gap-1.5 text-[0.72rem] text-[#5C6B57] font-medium">
              <span>Geser ke samping untuk menu lainnya</span>
              <span className="text-[#2D4A27] font-bold">({activeCardIndex + 1}/{drinks.length})</span>
            </div>
          </div>
        </div>

        {/* ── FOOTER SECTION: TOMBOL OUTLINE LIHAT SEMUA MENU & STEMPEL KANAN BAWAH ── */}
        <div
          ref={footerRef}
          className="relative mt-10 sm:mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-center"
        >
          {/* Tombol Outline Kapsul Tengah */}
          <a
            href="#menu"
            className="inline-flex items-center gap-2.5 border border-[#1F331A] bg-transparent hover:bg-[#1F331A] text-[#1F331A] hover:text-white px-8 py-3 rounded-full font-nav text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_2px_8px_rgba(31,51,26,0.06)] group"
          >
            <span>Lihat Semua Menu</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>

          {/* Stempel Teks Kanan Bawah: "TEH BAIK UNTUK HARI BAIK 🍃" */}
          <div className="mt-6 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 flex items-center gap-1.5 text-right select-none opacity-80">
            <div className="flex flex-col text-right font-nav text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#1F331A] leading-tight">
              <span>Teh Baik</span>
              <span>Untuk Hari Baik</span>
            </div>
            <img
              src="/assets/individual/03_icon_daun_teh.webp"
              alt=""
              aria-hidden="true"
              className="w-4 h-4 object-contain -rotate-12"
            />
          </div>
        </div>
      </div>

      {/* ── SILUET ORGANIK GELOMBANG LEMBUT DI DASAR SECTION ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 sm:h-18 lg:h-24 pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 75% 100% at 50% 120%, rgba(235, 230, 218, 0.95), transparent 70%)',
        }}
      />
      {/* ── MODAL DETAIL MINUMAN (2-KOLOM SEPERTI REFERENSI) ── */}
      {selectedDrink && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5"
          style={{ backgroundColor: 'rgba(10,16,10,0.78)', backdropFilter: 'blur(10px)' }}
          onClick={closeModal}
        >
          <div
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] w-full max-w-[820px] flex flex-col sm:flex-row"
            style={{ maxHeight: '92vh' }}
          >
            {/* ─ KIRI: FOTO ─ */}
            <div className="relative sm:w-[42%] bg-gradient-to-br from-[#2D4A27] via-[#1F331A] to-[#3A5C34] flex items-center justify-center overflow-hidden shrink-0 h-44 sm:h-auto sm:min-h-[260px]">
              <img
                src={selectedDrink.image}
                alt={selectedDrink.name}
                className="w-full h-full object-cover object-center max-h-44 sm:max-h-[480px]"
              />
              {/* Overlay gradient bawah */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F331A]/80 via-transparent to-transparent" />
              {/* Tagline kiri bawah */}
              <div className="absolute bottom-3 sm:bottom-5 left-4 sm:left-5 select-none">
                {selectedDrink.tagline.split(',').map((line, i) => (
                  <span key={i} className="font-script text-[1.1rem] sm:text-[1.3rem] text-white/90 leading-tight block">
                    {line.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* ─ KANAN: DETAIL ─ */}
            <div className="flex-1 flex flex-col overflow-y-auto" style={{ maxHeight: '92vh' }}>
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-[#1F331A]/8 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE6DA] font-nav text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#1F331A]">
                  {selectedDrink.tag}
                </span>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-[#F0EDE8] hover:bg-[#1F331A] hover:text-white flex items-center justify-center text-[#1F331A] transition-all duration-200"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Konten scroll */}
              <div className="flex flex-col gap-4 px-5 sm:px-6 py-4">
                {/* Nama + rating */}
                <div>
                  <h3 className="font-serif text-[1.5rem] sm:text-[1.8rem] text-[#1F331A] font-normal leading-tight tracking-tight">
                    {selectedDrink.name}
                  </h3>
                  <p className="font-sans text-[0.82rem] text-[#5C6B57] leading-relaxed mt-1.5">
                    {selectedDrink.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(selectedDrink.rating)
                            ? 'fill-[#D4A843] stroke-[#D4A843]'
                            : 'fill-[#E5DFD0] stroke-[#E5DFD0]'
                        }`}
                      />
                    ))}
                    <span className="font-sans text-[0.75rem] font-semibold text-[#1F331A] ml-0.5">
                      {selectedDrink.rating}
                    </span>
                    <span className="font-sans text-[0.72rem] text-[#5C6B57]">
                      ({selectedDrink.reviews} ulasan)
                    </span>
                  </div>
                </div>

                {/* Ukuran */}
                <div>
                  <div className="font-nav text-[0.68rem] uppercase tracking-[0.14em] text-[#5C6B57] font-semibold mb-2">Ukuran</div>
                  <div className="flex gap-2">
                    {selectedDrink.sizes.map((size, i) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(i)}
                        className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all duration-200 min-w-[68px] ${
                          selectedSize === i
                            ? 'border-[#1F331A] bg-[#1F331A] text-white'
                            : 'border-[#1F331A]/15 bg-[#F5F2EB] text-[#1F331A] hover:border-[#1F331A]/40'
                        }`}
                      >
                        <span className="font-nav text-[0.72rem] font-bold">{size.label}</span>
                        <span className={`font-sans text-[0.62rem] mt-0.5 ${ selectedSize === i ? 'text-white/70' : 'text-[#5C6B57]' }`}>
                          {size.ml} ml
                        </span>
                        {size.extra > 0 && (
                          <span className={`font-nav text-[0.6rem] font-semibold ${ selectedSize === i ? 'text-[#E8C882]' : 'text-[#8C6B2A]' }`}>
                            +Rp {size.extra.toLocaleString('id-ID')}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tambahan */}
                <div>
                  <div className="font-nav text-[0.68rem] uppercase tracking-[0.14em] text-[#5C6B57] font-semibold mb-2">Tambahan</div>
                  <div className="flex flex-col gap-2">
                    {selectedDrink.addons.map((addon) => (
                      <label
                        key={addon.id}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            onClick={() => toggleAddon(addon.id)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                              selectedAddons.includes(addon.id)
                                ? 'bg-[#1F331A] border-[#1F331A]'
                                : 'border-[#1F331A]/25 bg-white group-hover:border-[#1F331A]/50'
                            }`}
                          >
                            {selectedAddons.includes(addon.id) && (
                              <Check className="w-3 h-3 text-white stroke-[3]" />
                            )}
                          </div>
                          <span className="font-sans text-[0.85rem] text-[#1F331A]">{addon.label}</span>
                        </div>
                        <span className="font-sans text-[0.82rem] font-semibold text-[#5C6B57]">
                          {addon.price > 0 ? `+Rp ${addon.price.toLocaleString('id-ID')}` : 'Gratis'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Harga total */}
                <div className="pt-1">
                  <div className="font-nav text-[0.62rem] uppercase tracking-[0.14em] text-[#5C6B57]">Harga</div>
                  <div className="font-serif text-[1.6rem] font-bold text-[#1F331A] leading-none mt-0.5">
                    Rp {calcTotal(selectedDrink).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Footer: qty + tombol — sticky bawah */}
              <div className="mt-auto px-5 sm:px-6 py-4 border-t border-[#1F331A]/8 flex items-center justify-between gap-3 shrink-0 bg-white">
                {/* Qty */}
                <div className="flex items-center gap-3 bg-[#F0EDE8] rounded-full px-3 py-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-[#1F331A] text-lg leading-none hover:bg-[#1F331A] hover:text-white transition-all duration-200 shadow-sm"
                  >−</button>
                  <span className="font-serif text-[1.1rem] font-semibold text-[#1F331A] min-w-[1.6rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-[#1F331A] text-lg leading-none hover:bg-[#1F331A] hover:text-white transition-all duration-200 shadow-sm"
                  >+</button>
                </div>

                {/* Tombol Order */}
                <a
                  href={getWaLink(selectedDrink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1F331A] hover:bg-[#2D4A27] text-white font-nav text-sm font-bold px-5 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-[0_6px_20px_rgba(31,51,26,0.3)] active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Tambah ke Keranjang</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
