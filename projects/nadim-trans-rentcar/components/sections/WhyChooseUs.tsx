"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { WHY_CHOOSE_US_FEATURES } from "@/constants/features";

export default function WhyChooseUs() {
  const t = useTranslations();

  return (
    <section id="why-choose-us" className="relative w-full py-12 sm:py-16 md:py-20 bg-white flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Real Office & Fleet Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px]">
              {/* Photo Frame */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl ring-1 ring-amber-500/20 -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-900">
                  <Image
                    src="/images/nadimtrans.webp"
                  alt="PT. Nadim Auto Transindo Batam"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-slate-950 px-6 py-5 sm:px-7 sm:py-6 rounded-2xl shadow-xl shadow-amber-500/30 z-10 border border-amber-300/40">
                <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-900 mt-1 whitespace-nowrap">
                  {t("home.legalFleet")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">
              {t("home.whyEyebrow")}
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.18] mb-6 sm:mb-8">
              {t("home.whyTitle")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {WHY_CHOOSE_US_FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.titleKey}
                    className="group flex flex-col items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-slate-950 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t(feature.titleKey)}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
