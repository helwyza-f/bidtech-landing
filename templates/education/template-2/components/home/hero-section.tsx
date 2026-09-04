"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  BookOpenCheck,
  Play,
  Star,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { heroData } from "@/lib/data/home";
import { nivoraAssets } from "@/lib/data/asset-paths";


gsap.registerPlugin(ScrollTrigger);


export function HeroSection() {

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();


  useEffect(() => {

    if (!sectionRef.current || reduceMotion) return;


    const ctx = gsap.context(() => {

      gsap.from(".hero-reveal", {
        y:40,
        opacity:0,
        stagger:.12,
        duration:.8,
        ease:"power3.out",
      });


      gsap.to(imageRef.current,{
        y:50,
        scrollTrigger:{
          trigger:sectionRef.current,
          start:"top top",
          end:"bottom top",
          scrub:1.4,
        },
      });


    }, sectionRef);


    return () => ctx.revert();


  },[reduceMotion]);


  return (

    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#fafbff] pt-28 pb-20 md:pt-32 md:pb-28"
    >

      <div className="pointer-events-none absolute right-[-200px] top-32 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px]" />


      <div className="mx-auto grid w-[calc(100%-32px)] max-w-[1240px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">


        {/* CONTENT */}

        <div className="relative z-10">

          <h1 className="text-[42px] font-semibold leading-[1] tracking-[-0.05em] text-[#151922] sm:text-5xl lg:text-[62px]">

            <span className="hero-reveal block">
              Upgrade{" "}
              <span className="font-serif text-[1.35em] italic font-normal">
                Skill,
              </span>
            </span>


            <span className="hero-reveal mt-3 block">
              Tanpa Hilang{" "}
              <span className="text-blue-600">
                Arah.
              </span>
            </span>

          </h1>



          <p className="hero-reveal mt-6 max-w-lg text-sm leading-7 text-[#687083] md:text-base">
            {heroData.description}
          </p>



          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href={heroData.primaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.25)] transition hover:bg-blue-700"
            >
              {heroData.primaryCta.label}

              <ArrowUpRight size={17}/>
            </Link>



            <Link
              href={heroData.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-[#151922]"
            >

              <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-blue-600">
                <Play size={12} fill="currentColor"/>
              </span>

              {heroData.secondaryCta.label}

            </Link>

          </div>

        </div>





        {/* VISUAL */}

        <div className="relative flex h-[430px] items-end justify-center md:h-[560px]">


          <div className="absolute bottom-10 h-[300px] w-[300px] rounded-full bg-blue-100 md:h-[520px] md:w-[520px]" />



          <div
            ref={imageRef}
            className="relative z-10 h-[390px] w-[270px] sm:h-[470px] sm:w-[350px] md:h-[580px] md:w-[430px]"
          >

            <Image
              src={nivoraAssets.hero.learner}
              alt="Learner Nivora Academy"
              fill
              priority
              sizes="(max-width:640px) 270px, (max-width:1024px) 350px, 430px"
              className="object-contain"
            />

          </div>




          {/* CARD */}

          <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:.6}}
            className="absolute right-0 top-12 z-20 w-[170px] rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur md:right-4"
          >

            <BookOpenCheck
              size={20}
              className="text-blue-600"
            />

            <p className="mt-3 text-[11px] text-slate-500">
              Progress Belajar
            </p>

            <strong className="text-sm">
              Advanced React
            </strong>

            <div className="mt-3 h-1 rounded-full bg-slate-200">
              <div className="h-full w-[78%] rounded-full bg-blue-600"/>
            </div>

          </motion.div>




          <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:.8}}
            className="absolute bottom-10 left-0 z-20 w-[155px] rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur md:left-4"
          >

            <div className="flex items-center gap-2">
              <Star
                size={18}
                fill="currentColor"
                className="text-yellow-500"
              />

              <strong>
                4.9
              </strong>

            </div>

            <p className="mt-2 text-xs text-slate-500">
              Rating learner
            </p>

          </motion.div>


        </div>


      </div>

    </section>

  );
}