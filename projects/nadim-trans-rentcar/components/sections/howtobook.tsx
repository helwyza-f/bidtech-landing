"use client";

import { Search, Calendar, Key } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowToBook() {
  const t = useTranslations();
  const steps = [
    { number: "01", title: t("home.steps.chooseTitle"), description: t("home.steps.chooseDescription"), icon: Search },
    { number: "02", title: t("home.steps.dateTitle"), description: t("home.steps.dateDescription"), icon: Calendar },
    { number: "03", title: t("home.steps.confirmTitle"), description: t("home.steps.confirmDescription"), icon: Key },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-[#121214] text-white flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase mb-4">
            {t("home.howEyebrow")}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t("home.howTitle")}
          </h2>
        </div>

        {/* Steps Grid Container */}
        <div className="relative">
          {/* Connecting Line between steps (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] bg-zinc-800 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#18181b] border border-zinc-800 flex items-center justify-center text-zinc-300 transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400 group-hover:text-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/20 shadow-xl">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
