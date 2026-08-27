"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getCarById, getRelatedCars } from "@/lib/data";
import {
  Users,
  Gauge,
  Briefcase,
  Fuel,
  Zap,
  ShieldCheck,
  Check,
  ChevronRight,
  Star,
  Calendar,
  Clock,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Car as CarIcon,
  Sparkles,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";

export default function VehicleDetailClient({ id }: { id: string }) {
  const car = getCarById(id || "1");

  const [selectedImage, setSelectedImage] = useState<string>(car?.image || "/images/car-1.jpg");
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "terms">("overview");
  const [driverOption, setDriverOption] = useState<"with-driver" | "self-drive">("self-drive");
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!car) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto">
            <CarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kendaraan Tidak Ditemukan</h1>
            <p className="text-gray-600 text-sm mb-6">
              Maaf, data kendaraan yang Anda cari tidak tersedia atau telah dihapus dari armada kami.
            </p>
            <Link href="/kendaraan">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold">
                Kembali ke Daftar Kendaraan
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];
  const relatedCars = getRelatedCars(car.id, car.category, 3);

  const driverCostPerDay = driverOption === "with-driver" ? 250000 : 0;
  const totalCost = (car.price + driverCostPerDay) * rentalDays;
  const totalCostFormatted = new Intl.NumberFormat("id-ID").format(totalCost);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookedSuccess(true);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Halo Rentcar, saya tertarik untuk menyewa unit:\n` +
      `- Kendaraan: ${car.name} (${car.category})\n` +
      `- Paket: ${driverOption === "with-driver" ? "Dengan Supir" : "Lepas Kunci"}\n` +
      `- Durasi: ${rentalDays} Hari\n` +
      `- Estimasi Total: Rp ${totalCostFormatted}\n` +
      `Mohon info ketersediaan unit untuk tanggal terkait. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 sm:pt-28 pb-20 bg-[#F8FAFC]">
        {/* Breadcrumb & Navigation Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href="/kendaraan" className="hover:text-blue-600 transition-colors font-medium">
                Kendaraan
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                {car.name}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2.5 rounded-full border transition-all ${
                  isLiked
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
                aria-label="Simpan favorit"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${car.name} - Rentcar`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Tautan berhasil disalin ke clipboard!");
                  }
                }}
                className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all"
                aria-label="Bagikan"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Photos, Specs, Description, Features (8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              
              {/* Photo Showcase & Thumbnails */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/80 shadow-sm"
              >
                {/* Main Large Display Image */}
                <div className="relative h-64 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={selectedImage || car.image}
                    alt={car.name}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                      {car.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm text-gray-900 shadow-md">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{car.rating}</span>
                      <span className="text-gray-400 font-normal">({car.reviews} ulasan)</span>
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === img
                            ? "border-blue-600 ring-2 ring-blue-600/30 scale-[1.02]"
                            : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"
                        }`}
                      >
                        <Image src={img} alt={`${car.name} - ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Title & Key Highlights */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                      {car.type}
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {car.name}
                    </h1>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-500 block">Tarif Sewa Harian</span>
                    <div className="flex items-baseline gap-1 sm:justify-end">
                      <span className="text-2xl sm:text-3xl font-black text-blue-600">
                        Rp {car.priceFormatted}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">/ 24 Jam</span>
                    </div>
                  </div>
                </div>

                {/* Specs Grid Bar */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Spesifikasi Utama
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Users className="w-5 h-5 text-blue-600 mb-2" />
                      <span className="text-xs text-gray-500">Kapasitas</span>
                      <span className="font-bold text-gray-900 text-sm">{car.specs.seats} Penumpang</span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600 mb-2" />
                      <span className="text-xs text-gray-500">Bagasi</span>
                      <span className="font-bold text-gray-900 text-sm">{car.specs.luggage} Koper Besar</span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Gauge className="w-5 h-5 text-blue-600 mb-2" />
                      <span className="text-xs text-gray-500">Transmisi</span>
                      <span className="font-bold text-gray-900 text-sm truncate max-w-full">
                        {car.specs.transmission}
                      </span>
                    </div>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                      <Fuel className="w-5 h-5 text-blue-600 mb-2" />
                      <span className="text-xs text-gray-500">Bahan Bakar</span>
                      <span className="font-bold text-gray-900 text-sm truncate max-w-full">
                        {car.specs.fuel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Performance Specs if available */}
                {(car.specs.engine || car.specs.power || car.specs.acceleration) && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {car.specs.engine && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">Mesin:</span>
                        <span className="font-semibold text-gray-900">{car.specs.engine}</span>
                      </div>
                    )}
                    {car.specs.power && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">Tenaga Maksimal:</span>
                        <span className="font-semibold text-gray-900">{car.specs.power}</span>
                      </div>
                    )}
                    {car.specs.acceleration && (
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                        <span className="text-gray-500 block mb-0.5">Akselerasi:</span>
                        <span className="font-semibold text-gray-900">{car.specs.acceleration}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tabs Navigation for Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
                <div className="flex border-b border-gray-200 gap-6">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-4 text-sm font-bold transition-all relative ${
                      activeTab === "overview" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Deskripsi & Kenyamanan
                    {activeTab === "overview" && (
                      <motion.div
                        layoutId="activeDetailTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                      />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-4 text-sm font-bold transition-all relative ${
                      activeTab === "features" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Fitur & Fasilitas
                    {activeTab === "features" && (
                      <motion.div
                        layoutId="activeDetailTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                      />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("terms")}
                    className={`pb-4 text-sm font-bold transition-all relative ${
                      activeTab === "terms" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Syarat & Ketentuan
                    {activeTab === "terms" && (
                      <motion.div
                        layoutId="activeDetailTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                      {car.description}
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-3">Keuntungan Sewa di Rentcar:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {car.included.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Features */}
                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-600 text-xs sm:text-sm mb-4">
                      Dilengkapi dengan deretan fitur canggih untuk menjamin kenyamanan dan keamanan tingkat tinggi:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {car.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm font-semibold text-gray-800"
                        >
                          <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab 3: Terms */}
                {activeTab === "terms" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-900 space-y-1">
                        <span className="font-bold block">Dokumen Wajib Diverifikasi:</span>
                        <p>Pastikan Anda menyiapkan identitas resmi sebelum melakukan serah terima kendaraan.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {car.terms.map((term, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{term}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Booking / Reservation Form (4-5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xl shadow-blue-600/5">
                  <div className="pb-5 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 block mb-1">Total Estimasi Sewa</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-blue-600">
                        Rp {totalCostFormatted}
                      </span>
                      <span className="text-xs text-gray-500">({rentalDays} Hari)</span>
                    </div>
                  </div>

                  {/* Form Options */}
                  <div className="py-5 space-y-4 border-b border-gray-100">
                    {/* Driver Options Toggle */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Opsi Pengemudi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDriverOption("self-drive")}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            driverOption === "self-drive"
                              ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          Lepas Kunci
                        </button>
                        <button
                          type="button"
                          onClick={() => setDriverOption("with-driver")}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                            driverOption === "with-driver"
                              ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          + Supir (+250rb/hr)
                        </button>
                      </div>
                    </div>

                    {/* Rental Duration Counter */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">
                        Durasi Sewa (Hari)
                      </label>
                      <div className="flex items-center justify-between border border-gray-200 rounded-xl p-1.5 bg-gray-50">
                        <button
                          type="button"
                          onClick={() => setRentalDays((prev) => Math.max(1, prev - 1))}
                          className="w-10 h-10 rounded-lg bg-white border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors text-lg"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-sm text-gray-900">
                          {rentalDays} Hari
                        </span>
                        <button
                          type="button"
                          onClick={() => setRentalDays((prev) => prev + 1)}
                          className="w-10 h-10 rounded-lg bg-white border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-2 pt-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Sewa Mobil ({rentalDays}x)</span>
                        <span className="font-semibold text-gray-900">
                          Rp {new Intl.NumberFormat("id-ID").format(car.price * rentalDays)}
                        </span>
                      </div>
                      {driverOption === "with-driver" && (
                        <div className="flex justify-between text-blue-600">
                          <span>Jasa Supir ({rentalDays}x)</span>
                          <span className="font-semibold">
                            Rp {new Intl.NumberFormat("id-ID").format(driverCostPerDay * rentalDays)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-emerald-600">
                        <span>Asuransi Komprehensif</span>
                        <span className="font-bold">Gratis</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 space-y-3">
                    <Button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Pesan Sekarang (Formulir)
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleWhatsAppBooking}
                      className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 font-bold h-12 rounded-2xl transition-all inline-flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>Chat WhatsApp Cepat</span>
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Transaksi 100% Aman</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Konfirmasi Instan</span>
                    </div>
                  </div>
                </div>

                {/* Assistance Box */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/15">
                  <h4 className="font-bold text-base mb-1">Butuh Bantuan Khusus?</h4>
                  <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                    Ingin sewa jangka panjang, sewa bulanan perusahaan, atau mobil pengantin? Hubungi tim support VIP kami.
                  </p>
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors"
                  >
                    <span>Hubungi Tim Support</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Related Recommended Vehicles */}
          {relatedCars.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    Pilihan Serupa
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Rekomendasi Kendaraan Lainnya
                  </h2>
                </div>
                <Link
                  href="/kendaraan"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <span>Lihat Semua Armada</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedCars.map((relCar) => (
                  <div
                    key={relCar.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={relCar.image}
                          alt={relCar.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-white/95 text-blue-600 shadow-sm">
                            {relCar.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base">
                              {relCar.name}
                            </h3>
                            <p className="text-xs text-gray-500">{relCar.type}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-blue-600">
                              Rp {relCar.priceFormatted}
                            </span>
                            <span className="text-[10px] text-gray-400 block">/ hari</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2.5 border-y border-gray-100 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <span>{relCar.specs.seats} Kursi</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            <span>{relCar.specs.luggage} Tas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5 text-blue-600" />
                            <span className="truncate max-w-[70px]">{relCar.specs.transmission}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link href={`/kendaraan/${relCar.id}`}>
                        <Button className="w-full bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 transition-all font-semibold rounded-xl text-xs h-10 shadow-sm">
                          Sewa Sekarang
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Booking Form */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
              >
                {!isBookedSuccess ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Formulir Pemesanan
                      </h3>
                      <button
                        onClick={() => setIsBookingModalOpen(false)}
                        aria-label="Tutup popup"
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image src={car.image} alt={car.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{car.name}</h4>
                        <span className="text-xs text-blue-600 font-semibold">
                          Rp {totalCostFormatted} / {rentalDays} Hari ({driverOption === "with-driver" ? "Dengan Supir" : "Lepas Kunci"})
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Masukkan nama sesuai KTP"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Nomor WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Tanggal Mulai Sewa
                        </label>
                        <input
                          type="date"
                          required
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-sm"
                        />
                      </div>

                      <div className="pt-2 flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsBookingModalOpen(false)}
                          className="flex-1 rounded-xl h-12"
                        >
                          Batal
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-12 shadow-md shadow-blue-600/30"
                        >
                          Konfirmasi Booking
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Pemesanan Terkirim!</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                      Terima kasih, <strong>{customerName || "Pelanggan"}</strong>. Permintaan sewa unit <strong>{car.name}</strong> telah kami terima. Tim kami akan segera menghubungi WhatsApp <strong>{customerPhone}</strong> dalam 10 menit.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => {
                          setIsBookingModalOpen(false);
                          setIsBookedSuccess(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-11 font-semibold"
                      >
                        Selesai
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
