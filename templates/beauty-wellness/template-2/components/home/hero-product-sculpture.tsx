"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroProductSculpture() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-hero-reveal]", { opacity: 1, y: 0 });
        return;
      }

      const introSeen = sessionStorage.getItem("chulla-intro-seen");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (!introSeen) {
        tl.fromTo(".heroStage__ghost", { opacity: 0, letterSpacing: "0.1em" }, { opacity: 0.17, letterSpacing: "0em", duration: 0.65 })
          .fromTo(".heroProduct--cleanser", { x: 26, y: 14, scale: 0.97, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.75 }, 0.28)
          .fromTo(".heroProduct--cream", { y: 24, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.72 }, 0.36)
          .fromTo(".heroProduct--serum", { y: 34, scale: 0.93, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.82 }, 0.42)
          .fromTo(".heroStage__shadow", { opacity: 0, scaleX: 0.78 }, { opacity: 0.28, scaleX: 1, duration: 0.5 }, 0.62)
          .fromTo("[data-hero-reveal]", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, stagger: 0.07 }, 0.58);
        sessionStorage.setItem("chulla-intro-seen", "1");
      } else {
        tl.fromTo(".heroStage", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 })
          .fromTo("[data-hero-reveal]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05 }, 0.08);
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
        const stage = element.querySelector<HTMLElement>(".heroStage");
        if (!stage) return;

        const serumX = gsap.quickTo(".heroProduct--serum", "x", { duration: 0.55, ease: "power3.out" });
        const serumY = gsap.quickTo(".heroProduct--serum", "y", { duration: 0.55, ease: "power3.out" });
        const cleanerX = gsap.quickTo(".heroProduct--cleanser", "x", { duration: 0.7, ease: "power3.out" });
        const cleanerY = gsap.quickTo(".heroProduct--cleanser", "y", { duration: 0.7, ease: "power3.out" });
        const creamX = gsap.quickTo(".heroProduct--cream", "x", { duration: 0.6, ease: "power3.out" });
        const creamY = gsap.quickTo(".heroProduct--cream", "y", { duration: 0.6, ease: "power3.out" });
        const textureX = gsap.quickTo(".heroStage__texture", "x", { duration: 0.5, ease: "power3.out" });
        const textureY = gsap.quickTo(".heroStage__texture", "y", { duration: 0.5, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const bounds = stage.getBoundingClientRect();
          const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
          const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
          serumX(nx * 16); serumY(ny * 12);
          cleanerX(nx * 8); cleanerY(ny * 7);
          creamX(nx * 11); creamY(ny * 8);
          textureX(nx * 20); textureY(ny * 14);
        };

        const onLeave = () => {
          serumX(0); serumY(0); cleanerX(0); cleanerY(0); creamX(0); creamY(0); textureX(0); textureY(0);
        };

        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);

        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top+=110",
            end: "bottom top+=180",
            scrub: 0.6,
          },
        })
          .to(".heroCopy", { y: -18 }, 0)
          .to(".heroStage__products", { y: "-3vh", scale: 1.012 }, 0)
          .to(".heroStage__macro", { y: "1.5vh" }, 0);

        return () => {
          stage.removeEventListener("pointermove", onMove);
          stage.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="heroSection">
      <div className="heroGrid shell">
        <div className="heroCopy">
          <span className="eyebrow" data-hero-reveal>Daily skin essentials</span>
          <h1 data-hero-reveal>Skin, in its <em>own rhythm.</em></h1>
          <p data-hero-reveal>
            Thoughtful formulas built around comfort, clarity, and everyday consistency.
          </p>
          <div className="heroActions" data-hero-reveal>
            <Link className="button button--dark" href="/products">
              <span>Explore products</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link className="textLink" href="/our-approach">
              <span>Our approach</span>
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
          <a className="heroStoreNote" href="#official-stores" data-hero-reveal>
            <div className="flex flex-row gap-2 items-center">
              <span>Available via Chulla Official Stores</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </div>
          </a>
        </div>

        <div className="heroStage" aria-label="Chulla product sculpture featuring Barrier Reset Serum, Dew Barrier Cream and Cloud Milk Cleanser">
          <div className="heroStage__macro" aria-hidden="true" />
          <div className="heroStage__ghost" aria-hidden="true">CHULLA</div>
          <div className="heroStage__orb heroStage__orb--one" aria-hidden="true" />
          <div className="heroStage__orb heroStage__orb--two" aria-hidden="true" />
          <div className="heroStage__platform" aria-hidden="true" />
          <div className="heroStage__shadow" aria-hidden="true" />

          <div className="heroStage__products">
            <figure className="heroProduct heroProduct--cleanser">
              <img src="/images/products/cleanser_transparent_2.webp" alt="Cloud Milk Cleanser" />
            </figure>
            <figure className="heroProduct heroProduct--cream">
              <img src="/images/products/moisturizer_transparent_2.webp" alt="Dew Barrier Cream" />
            </figure>
            <figure className="heroProduct heroProduct--serum">
              <img src="/images/products/serum_transparent_2.webp" alt="Barrier Reset Serum" />
            </figure>
          </div>

          <div className="heroStage__texture hidden" aria-hidden="true">
            <img src="/images/hero/serum-smear_transparent.webp" alt="" />
          </div>

          <div className="heroCallout heroCallout--one">
            <span>01 — Barrier support</span>
            <strong>Ceramides + Panthenol</strong>
          </div>
          <div className="heroCallout heroCallout--two">
            <span>02 — Daily comfort</span>
            <strong>Lightweight textures</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
