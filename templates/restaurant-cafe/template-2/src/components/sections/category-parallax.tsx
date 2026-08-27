"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Flame, Sparkles, Utensils, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { RevealText } from "@/components/ui/reveal-text";

const moodImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
];

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  itemsCount: string;
  tag: string;
  tagIcon?: "flame" | "sparkles" | "award";
  image: string;
  priceStart: string;
  gradient: string;
  popularDish: string;
}

const categoriesData: CategoryItem[] = [
  {
    id: "pizza",
    title: "Wood-Fired Pizza",
    subtitle: "48-Hour Proofed Sourdough",
    description:
      "San Marzano D.O.P. tomatoes, fresh fior di latte, and charred blistered crust baked at 900°F.",
    itemsCount: "12 Creations",
    tag: "Wood Fired",
    tagIcon: "flame",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $14",
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    popularDish: "Margherita di Bufala",
  },
  {
    id: "burgers",
    title: "Craft Smash Burgers",
    subtitle: "100% Grass-Fed Prime Angus",
    description:
      "Double lacy-crust patties, melted aged American cheddar, and caramelized shallots on brioche.",
    itemsCount: "8 Varieties",
    tag: "Best Seller",
    tagIcon: "award",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $12",
    gradient: "from-orange-500/20 via-red-600/10 to-transparent",
    popularDish: "Truffle Smash Deluxe",
  },
  {
    id: "pasta",
    title: "Artisan Hand-Rolled Pasta",
    subtitle: "Extruded & Hand-Cut Daily",
    description:
      "Silk egg ribbons, 12-hour braised Bolognese ragù, and freshly shaved 24-month Parmigiano.",
    itemsCount: "10 Plates",
    tag: "Handmade",
    tagIcon: "sparkles",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $16",
    gradient: "from-yellow-500/20 via-amber-600/10 to-transparent",
    popularDish: "Tagliatelle al Tartufo",
  },
  {
    id: "desserts",
    title: "Dolci & Sweet Treats",
    subtitle: "Crafted In-House Daily",
    description:
      "Classic espresso-dipped savoiardi tiramisu, pistachio cannoli, and Madagascar vanilla gelato.",
    itemsCount: "6 Specialties",
    tag: "Sweet Endings",
    tagIcon: "sparkles",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $8",
    gradient: "from-pink-500/20 via-rose-600/10 to-transparent",
    popularDish: "Signature Tiramisu",
  },
  {
    id: "drinks",
    title: "Specialty Drinks & Brews",
    subtitle: "Single-Origin & Botanical",
    description:
      "Micro-lot espresso, nitro cold brews, fermented shrubs, and artisanal fruit mocktails.",
    itemsCount: "14 Drinks",
    tag: "Craft Bar",
    tagIcon: "flame",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $5",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    popularDish: "Smoked Rosemary Spritz",
  },
  {
    id: "starters",
    title: "Starters & Shared Plates",
    subtitle: "Crispy Bites & Dips",
    description:
      "Whipped ricotta crostini, blistered shishito peppers, and truffle parmesan polenta fries.",
    itemsCount: "9 Appetizers",
    tag: "For the Table",
    tagIcon: "award",
    image:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80",
    priceStart: "From $9",
    gradient: "from-amber-500/20 via-yellow-600/10 to-transparent",
    popularDish: "Whipped Ricotta Toast",
  },
];

function CategoryCard({ item, index }: { item: CategoryItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !contentRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    contentRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1.08) translate(${(x - centerX) * 0.04}px, ${(
        y - centerY
      ) * 0.04}px)`;
    }

    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (!contentRef.current || !glowRef.current) return;

    contentRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";

    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1) translate(0px, 0px)";
    }

    glowRef.current.style.opacity = "0";
  };

  const handleCardClick = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="category-card-item relative cursor-pointer select-none group perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={contentRef}
        className="relative flex h-[420px] w-full flex-col justify-between overflow-hidden rounded-[28px] bg-surface shadow-lg transition-[transform,box-shadow] duration-500 will-change-transform hover:shadow-2xl dark:bg-card md:h-[460px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Glow Spotlight */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full pointer-events-none opacity-0 z-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 90, 31, 0.35) 0%, rgba(255, 122, 61, 0.08) 50%, transparent 80%)",
            filter: "blur(20px)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Background Image with Zoom & Dark Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={imageRef}
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover object-center brightness-90 transition-transform duration-700 will-change-transform group-hover:brightness-100"
            loading="lazy"
          />
          {/* Subtle multi-layer overlay for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-10" />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 z-10", item.gradient)} />
        </div>

        {/* Card Header (Badges & Item Count) */}
        <div className="relative z-20 p-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-black/40 backdrop-blur-md text-white shadow-sm">
            {item.tagIcon === "flame" && <Flame className="size-3.5 text-brand-500 fill-brand-500" />}
            {item.tagIcon === "award" && <Award className="size-3.5 text-accent-400" />}
            {item.tagIcon === "sparkles" && <Sparkles className="size-3.5 text-brand-300" />}
            {item.tag}
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-500/90 backdrop-blur-md text-white shadow-glow">
            {item.itemsCount}
          </span>
        </div>

        {/* Card Body & Footer */}
        <div className="relative z-20 p-6 pt-0 text-white">
          <p className="text-xs uppercase tracking-widest text-brand-400 font-semibold mb-1">
            {item.subtitle}
          </p>

          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white group-hover:text-brand-300 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-medium">
                Top Pick
              </span>
              <span className="text-sm font-semibold text-white/95">
                {item.popularDish}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-brand-400">
                {item.priceStart}
              </span>
              <div className="size-9 rounded-full bg-white/10 group-hover:bg-brand-500 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryParallax() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Categories" },
    { id: "pizza", label: "Wood-Fired Pizza" },
    { id: "burgers", label: "Smash Burgers" },
    { id: "pasta", label: "Hand-Rolled Pasta" },
    { id: "desserts", label: "Dolci & Desserts" },
    { id: "drinks", label: "Craft Drinks" },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? categoriesData
      : categoriesData.filter((c) => c.id === activeFilter);

  return (
    <section
      id="categories"
      className="relative w-full bg-background py-20 md:py-28 overflow-hidden scroll-mt-20"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Utensils className="size-3.5" />
            Our Culinary Spectrum
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground text-balance mb-5 leading-tight">
            A craving for{" "}
            <DynamicTextSlider>
              <RevealText
                text="EVERY"
                textColor="text-foreground"
                overlayColor="text-brand-500"
                letterImages={moodImages}
                className="font-display"
              />
            </DynamicTextSlider>{" "}
            mood
          </h2>

          <p className="text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
            From 48-hour cold-fermented sourdough to silky hand-rolled pasta,
            explore our specialized kitchen stations crafted with obsessive precision.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-foreground text-background shadow-md scale-105"
                      : "bg-surface dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 shadow-xs"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Magnetic Cards Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filteredCategories.map((category, index) => (
            <CategoryCard key={category.id} item={category} index={index} />
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 md:mt-20 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-brand-500/10 via-orange-500/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-sm">
          <div>
            <h4 className="font-display font-bold text-xl text-foreground mb-1">
              Can't decide what to savor first?
            </h4>
            <p className="text-sm text-muted-foreground">
              Explore our full interactive tasting menu or customize your dining preferences.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("menu");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 hover:shadow-glow transition-all duration-200 cursor-pointer"
          >
            Explore Full Menu
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
