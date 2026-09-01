"use client";

import { useLayoutEffect } from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomeMotionController() {
  useLayoutEffect(() => {
    const reduced =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduced) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /*
       * ---------------------------------
       * SMALL / EDITORIAL ENTRANCES
       * ---------------------------------
       */

      gsap.utils
        .toArray<HTMLElement>(
          [
            ".sectionHeader",
            ".manifestoGrid",
            ".officialStoresGrid",
            ".newsletterGrid",
          ].join(", ")
        )
        .forEach((element) => {
          gsap.from(
            element.children,
            {
              y: 24,
              opacity: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",

              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true,
              },
            }
          );
        });

      gsap.from(
        ".productGrid--featured .productCard",
        {
          y: 28,
          opacity: 0,
          stagger: 0.09,
          duration: 0.75,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".productGrid--featured",
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.from(".concernTile", {
        clipPath:
          "inset(0 100% 0 0)",
        stagger: 0.07,
        duration: 0.85,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".concernGrid",
          start: "top 80%",
          once: true,
        },
      });

      /*
       * ---------------------------------
       * DESKTOP SCROLL CHOREOGRAPHY
       * ---------------------------------
       */

      mm.add(
        "(min-width: 1024px)",
        () => {
          /*
           * SIGNATURE STORY
           *
           * Tidak lagi pin 900px.
           * Animation selesai ketika
           * section masih jelas berada
           * di viewport.
           */

          const signature =
            gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                trigger:
                  ".signatureStory",

                start: "top 78%",
                end: "top 18%",

                scrub: 0.55,
              },
            });

          signature
            .fromTo(
              ".signatureStory__product",
              {
                y: 32,
                scale: 0.94,
                rotate: -1.5,
              },
              {
                y: -8,
                scale: 1,
                rotate: 0,
                duration: 1,
              }
            )
            .fromTo(
              ".signatureStory__texture",
              {
                x: 45,
                scale: 1.06,
                opacity: 0.25,
                clipPath:
                  "inset(0 100% 0 0)",
              },
              {
                x: 0,
                scale: 1,
                opacity: 0.82,
                clipPath:
                  "inset(0 0% 0 0)",
                duration: 1,
              },
              0.12
            )
            .to(
              ".signatureStory__ghost",
              {
                xPercent: -5,
                opacity: 0.14,
                duration: 1,
              },
              0
            );

          /*
           * ROUTINE
           *
           * Seluruh sequence selesai
           * sebelum section hampir
           * keluar viewport.
           */

          const products =
            gsap.utils.toArray<HTMLElement>(
              "[data-routine-product]"
            );

          const steps =
            gsap.utils.toArray<HTMLElement>(
              "[data-routine-step]"
            );

          if (
            products.length !== 4 ||
            steps.length !== 4
          ) {
            return;
          }

          gsap.set(steps, {
            opacity: 0.46,
          });

          const routine =
            gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                trigger:
                  ".routineSection",

                start: "top 78%",
                end: "top 8%",

                scrub: 0.55,
              },
            });

          /*
           * 01 — CLEANSE
           */

          routine
            .fromTo(
              products[0],
              {
                y: 52,
                scale: 0.94,
                opacity: 0,
              },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.7,
              },
              0
            )
            .to(
              steps[0],
              {
                opacity: 1,
                duration: 0.35,
              },
              0
            );

          /*
           * 02 — TREAT
           */

          routine
            .to(
              products[0],
              {
                x: -12,
                scale: 0.97,
                opacity: 0.34,
                duration: 0.42,
              },
              0.68
            )
            .to(
              steps[0],
              {
                opacity: 0.46,
                duration: 0.25,
              },
              0.68
            )
            .fromTo(
              products[1],
              {
                y: 54,
                scale: 0.94,
                opacity: 0,
              },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.65,
              },
              0.7
            )
            .to(
              steps[1],
              {
                opacity: 1,
                duration: 0.35,
              },
              0.7
            );

          /*
           * 03 — MOISTURIZE
           */

          routine
            .to(
              products[1],
              {
                x: -8,
                scale: 0.97,
                opacity: 0.34,
                duration: 0.42,
              },
              1.38
            )
            .to(
              steps[1],
              {
                opacity: 0.46,
                duration: 0.25,
              },
              1.38
            )
            .fromTo(
              products[2],
              {
                y: 40,
                scale: 0.92,
                opacity: 0,
              },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.62,
              },
              1.4
            )
            .to(
              steps[2],
              {
                opacity: 1,
                duration: 0.35,
              },
              1.4
            );

          /*
           * 04 — PROTECT
           */

          routine
            .to(
              products[2],
              {
                x: -6,
                scale: 0.96,
                opacity: 0.34,
                duration: 0.4,
              },
              2.05
            )
            .to(
              steps[2],
              {
                opacity: 0.46,
                duration: 0.25,
              },
              2.05
            )
            .fromTo(
              products[3],
              {
                x: 42,
                y: 18,
                scale: 0.94,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.62,
              },
              2.07
            )
            .to(
              steps[3],
              {
                opacity: 1,
                duration: 0.35,
              },
              2.07
            );

          /*
           * FINAL ROUTINE FAMILY
           *
           * Ini terjadi sebelum akhir
           * ScrollTrigger, bukan saat
           * user sudah keluar section.
           */

          routine
            .to(
              products,
              {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.45,
              },
              2.72
            )
            .to(
              steps,
              {
                opacity: 1,
                duration: 0.4,
              },
              2.72
            );
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return null;
}