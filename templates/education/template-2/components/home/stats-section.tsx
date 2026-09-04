"use client";

import { motion } from "motion/react";

import { stats } from "@/lib/data/home";


export function StatsSection() {
  return (
    <section className="border-y border-[#e5e9f3] bg-white">
      <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1240px] grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className={`
              relative flex flex-col items-center justify-center px-5 py-8 text-center
              ${index !== stats.length - 1 ? "lg:border-r lg:border-[#e5e9f3]" : ""}
              ${index < 2 ? "max-lg:border-b max-lg:border-[#e5e9f3]" : ""}
            `}
          >
            <strong className="text-3xl font-semibold tracking-[-0.04em] text-blue-600 md:text-4xl">
              {stat.value}
            </strong>

            <span className="mt-3 text-xs font-medium text-[#687083] md:text-sm">
              {stat.label}
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}