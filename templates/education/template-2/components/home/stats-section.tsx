"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";
import { stats } from "@/lib/data/stats";
import { formatID } from "@/lib/utils";

export function StatsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;

    if (reduce) {
      gsap.set(".stat-item", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.from(".stat-item", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });

          rootRef.current?.querySelectorAll<HTMLElement>(".stat-value").forEach((node) => {
            const target = Number(node.dataset.value);
            const decimals = Number(node.dataset.decimals ?? 0);
            const suffix = node.dataset.suffix ?? "";
            const state = { value: 0 };

            gsap.to(state, {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                const formatted =
                  decimals > 0
                    ? state.value.toLocaleString("id-ID", {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                      })
                    : formatID(state.value);
                node.textContent = `${formatted}${suffix}`;
              },
            });
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={rootRef} className="border-y border-line bg-surface py-10 md:py-14">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid grid-cols-2 divide-y divide-line lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item px-4 py-4 first:pl-0 last:pr-0 lg:px-8 lg:py-0">
              <span
                className="stat-value text-display-md font-semibold tabular-nums text-brand"
                data-value={stat.value}
                data-decimals={stat.decimals ?? 0}
                data-suffix={stat.suffix ?? ""}
              >
                {stat.decimals
                  ? stat.value.toLocaleString("id-ID", {
                      minimumFractionDigits: stat.decimals,
                      maximumFractionDigits: stat.decimals,
                    })
                  : formatID(stat.value)}
                {stat.suffix}
              </span>
              <p className="mt-1.5 text-meta font-semibold text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}