"use client";

import Link from "next/link";

import { ArrowUpRight, BarChart3, Code2, PenTool } from "lucide-react";
import { motion } from "motion/react";

import { programs } from "@/lib/data/home";


const icons = [Code2, PenTool, BarChart3];


export function ProgramsSection() {
  return (
    <section id="program" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1240px]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid gap-6 lg:grid-cols-[1.05fr_.7fr] lg:items-end lg:gap-20"
        >
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.08em] text-blue-600">
              Learning Paths
            </span>

            <h2 className="max-w-[650px] text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-[#151922] md:text-5xl">
              Pilih skill yang ingin{" "}
              <span className="text-blue-600">
                kamu upgrade.
              </span>
            </h2>
          </div>

          <p className="max-w-[480px] text-sm leading-7 text-[#687083] md:text-base">
            Program pembelajaran Nivora dirancang untuk membantu kamu berkembang dari pemahaman konsep hingga kemampuan yang bisa diterapkan dalam project nyata.
          </p>
        </motion.div>


        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = icons[index] ?? Code2;

            return (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex min-h-[390px] flex-col rounded-[28px] border border-[#e5e9f3] bg-gradient-to-b from-white to-[#fbfcff] p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(31,50,112,.10)]"
              >

                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-[#a7afbe]">
                    {program.number}
                  </span>

                  <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-blue-600">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                </div>


                <div className="mt-auto">
                  <span className="text-[11px] font-bold text-blue-600">
                    {program.meta}
                  </span>

                  <h3 className="mt-3 max-w-[280px] text-2xl font-medium leading-tight tracking-[-0.03em] text-[#151922]">
                    {program.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#687083]">
                    {program.description}
                  </p>
                </div>


                <Link
                  href="#kursus"
                  className="mt-7 flex items-center justify-between border-t border-[#e5e9f3] pt-5 text-xs font-bold text-[#151922] transition-colors group-hover:text-blue-600"
                >
                  Explore program
                  <ArrowUpRight size={18} />
                </Link>

              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}