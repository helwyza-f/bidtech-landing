"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Users,
  Gauge,
  Briefcase,
  Search,
  SlidersHorizontal,
  Star,
  Fuel,
  Zap,
  ShieldCheck,
  Check,
  ChevronRight,
} from "lucide-react";


import { ALL_CARS, CATEGORIES, type Car } from "@/lib/data";

export default function KendaraanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");


  const filteredAndSortedCars = useMemo(() => {
    let result = ALL_CARS.filter((car) => {
      const matchesCategory =
        selectedCategory === "Semua" || car.category === selectedCategory;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Header />

      <main className="min-h-screen pt-20 bg-gray-50/50">


        <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">Katalog Kendaraan</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Pilihan Armada Terbaik
              </h1>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Temukan kendaraan sempurna untuk setiap perjalanan bisnis, liburan keluarga,
                maupun kebutuhan personal dengan standar kenyamanan tertinggi.
              </p>
            </motion.div>
          </div>
        </section>


        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">


              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>


              <div className="flex items-center gap-3 w-full md:w-auto">

                <div className="relative flex-grow md:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari mobil..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>


                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Urutkan kendaraan"
                    className="py-2 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="popular">Terpopuler</option>
                    <option value="price-low">Harga: Termurah</option>
                    <option value="price-high">Harga: Tertinggi</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-gray-500 font-medium">
                Menampilkan <span className="text-gray-900 font-bold">{filteredAndSortedCars.length}</span> kendaraan
              </p>
            </div>


            {filteredAndSortedCars.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Tidak Ada Mobil yang Cocok
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("Semua");
                    setSearchQuery("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/kendaraan/${car.id}`} className="block relative h-60 bg-gray-100 overflow-hidden cursor-pointer">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <span className="inline-flex items-center rounded-lg bg-blue-600/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                            {car.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-gray-800">
                            {car.rating}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            ({car.reviews})
                          </span>
                        </div>
                      </Link>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Link href={`/kendaraan/${car.id}`} className="block">
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {car.name}
                            </h2>
                            <p className="text-gray-500 text-sm">{car.type}</p>
                          </Link>
                          <div className="text-right">
                            <span className="text-lg font-extrabold text-blue-600">
                              Rp {car.priceFormatted}
                            </span>
                            <span className="text-xs text-gray-500 block">/ hari</span>
                          </div>
                        </div>


                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 mb-6 bg-gray-50/70 rounded-xl px-3">
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-gray-600 font-medium">
                              {car.specs.seats} Kursi
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center border-x border-gray-200">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-gray-600 font-medium">
                              {car.specs.luggage} Tas
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Gauge className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-gray-600 font-medium truncate max-w-[80px]">
                              {car.specs.transmission}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="px-6 pb-6 pt-0">
                      <Link href={`/kendaraan/${car.id}`} className="block w-full">
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                          Sewa Sekarang
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
