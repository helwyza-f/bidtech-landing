"use client";

import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Key, UserCheck, Plane, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LayananClient() {
  const t = useTranslations();
  const services = [
    { id: 1, title: t("services.selfDriveTitle"), description: t("services.selfDriveDescription"), icon: Key, iconColor: "text-amber-500" },
    { id: 2, title: t("services.driverTitle"), description: t("services.driverDescription"), icon: UserCheck, iconColor: "text-yellow-600" },
    { id: 3, title: t("services.airportTitle"), description: t("services.airportDescription"), icon: Plane, iconColor: "text-amber-600" },
    { id: 4, title: t("services.groupTitle"), description: t("services.groupDescription"), icon: ShieldCheck, iconColor: "text-amber-700" },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Gold & Dark Hero Banner with NTR Luxury Showroom Backdrop */}
        <section className="relative text-white pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden text-center border-b border-amber-500/20 bg-slate-950">
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <Image
              src="/images/background-3.webp"
              alt={t("services.heroImageAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/50 z-[1]" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl z-[2] pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
                {t("services.heroTitle")}
              </h1>
              <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                {t("services.heroDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* 4 Premium Service Cards */}
        <section className="py-20 md:py-28 bg-[#fafafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-2">
                {t("services.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {t("services.flexibleTitle")}
              </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-200 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group min-h-[380px] justify-center"
                  >
                    <div className="flex flex-col items-center">
                      {/* Icon Container */}
                      <div className="mb-6 transition-transform duration-300 group-hover:scale-110 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 shadow-inner">
                        <Icon className={`w-10 h-10 stroke-[2.2] ${service.iconColor}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed max-w-[260px]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
