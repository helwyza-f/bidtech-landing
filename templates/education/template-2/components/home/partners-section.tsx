"use client";

import Image from "next/image";

import { motion } from "motion/react";

import { partners } from "@/lib/data/partners";


const marqueePartners = [
  ...partners,
  ...partners,
];


export function PartnersSection() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Trusted By
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#151922] md:text-5xl">
            Dipercaya oleh{" "}
            <span className="text-blue-600">
              industri digital
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#687083] md:text-base">
            Belajar dengan materi yang relevan dengan kebutuhan industri modern.
          </p>
        </motion.div>


        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent md:w-40" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent md:w-40" />


          <motion.div
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex w-max items-center gap-6"
          >
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex h-24 w-44 items-center justify-center rounded-3xl bg-white"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={50}
                  className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}