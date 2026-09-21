"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { HERO_TIMINGS, type HeroSlide } from "./hero-data";
import { useTypewriter } from "./use-typewriter";

export type HeroPhase = "boot" | "intro" | "idle" | "outro" | "enter";

type DecorativeAnimRequest = { slideId: string; direction: "in" | "out" } | null;

// mengatur siklus hero penuh; animasi kartu dipicu useLayoutEffect agar ref DOM pasti siap
export function useHeroOrchestrator(slides: HeroSlide[]) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("boot");
  const [decorativesVisible, setDecorativesVisible] = useState(false);
  const [decorativeAnimRequest, setDecorativeAnimRequest] = useState<DecorativeAnimRequest>(null);

  const modelRef = useRef<HTMLDivElement | null>(null);
  const decorativeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runTransitionRef = useRef<(() => Promise<void>) | null>(null);
  // di-resolve setelah layout effect benar-benar memulai animasi GSAP pending
  const decorativeAnimResolveRef = useRef<(() => void) | null>(null);

  const registerDecorative = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) decorativeRefs.current.set(id, el);
    else decorativeRefs.current.delete(id);
  }, []);

  const { displayText: titleText, cursorVisible, type, untype } = useTypewriter({
    typeMsPerChar: HERO_TIMINGS.typeMsPerChar,
    untypeMsPerChar: HERO_TIMINGS.untypeMsPerChar,
    cursorHoldMs: HERO_TIMINGS.cursorBlinkVisibleAfterType,
  });

  const currentSlide = slides[slideIndex];

  // primitive animasi

  const riseModelUp = useCallback(() => {
    if (!modelRef.current) return Promise.resolve();
    return new Promise<void>((resolve) => {
      gsap.fromTo(
        modelRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: HERO_TIMINGS.modelRiseDuration / 1000,
          ease: "power3.out",
          onComplete: resolve,
        }
      );
    });
  }, []);

  const sinkModelDown = useCallback(() => {
    if (!modelRef.current) return Promise.resolve();
    return new Promise<void>((resolve) => {
      gsap.to(modelRef.current, {
        yPercent: 30,
        opacity: 0,
        duration: HERO_TIMINGS.modelSinkDuration / 1000,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  }, []);

  const fadeSubtitle = useCallback((direction: "in" | "out") => {
    if (!subtitleRef.current) return Promise.resolve();
    return new Promise<void>((resolve) => {
      gsap.to(subtitleRef.current, {
        opacity: direction === "in" ? 1 : 0,
        y: direction === "in" ? 0 : 8,
        duration: HERO_TIMINGS.subtitleFade / 1000,
        ease: "power1.out",
        onComplete: resolve,
      });
    });
  }, []);

  // request animasi kartu menunggu layout effect agar DOM sudah commit sebelum promise selesai
  const requestDecorativeAnim = useCallback((slideId: string, direction: "in" | "out") => {
    if (direction === "in") setDecorativesVisible(true);
    return new Promise<void>((resolve) => {
      decorativeAnimResolveRef.current = resolve;
      setDecorativeAnimRequest({ slideId, direction });
    });
  }, []);

  // satu-satunya tempat GSAP menyentuh kartu dekoratif; selalu berjalan setelah commit React
  useLayoutEffect(() => {
    if (!decorativeAnimRequest) return;
    const { slideId, direction } = decorativeAnimRequest;
    const slide = slides.find((s) => s.id === slideId);
    if (!slide) {
      decorativeAnimResolveRef.current?.();
      decorativeAnimResolveRef.current = null;
      queueMicrotask(() => setDecorativeAnimRequest(null));
      return;
    }

    const targets = slide.decoratives
      .map((d) => decorativeRefs.current.get(d.id))
      .filter((el): el is HTMLDivElement => Boolean(el));

    const resolveAndClear = () => {
      decorativeAnimResolveRef.current?.();
      decorativeAnimResolveRef.current = null;
      queueMicrotask(() => setDecorativeAnimRequest(null));
    };

    if (targets.length === 0) {
      // tidak ada target kartu untuk slide/pass ini, jadi tidak ada yang dianimasikan
      if (direction === "out") {
        queueMicrotask(() => setDecorativesVisible(false));
      }
      resolveAndClear();
      return;
    }

    if (direction === "in") {
      // penghitung angka berjalan terpisah; pilah per kind agar tipe metric tetap tepat
      slide.decoratives.forEach((d) => {
        const metric =
          d.kind === "avatar-stack" || d.kind === "metric-panel" || d.kind === "thumbnail"
            ? d.metric
            : null;
        if (!metric) return;

        const el = decorativeRefs.current.get(d.id);
        const numEl = el?.querySelector<HTMLElement>("[data-metric-value]");
        if (!numEl) return;

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: metric.value,
          duration: (HERO_TIMINGS.decorativePopDuration / 1000) * HERO_TIMINGS.countUpMultiplier,
          ease: "power1.out",
          onUpdate: () => {
            const prefix = "prefix" in metric ? metric.prefix ?? "" : "";
            const suffix = metric.suffix ?? "";
            numEl.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`;
          },
        });
      });

      gsap.fromTo(
        targets,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: HERO_TIMINGS.decorativePopDuration / 1000,
          ease: "back.out(1.7)",
          stagger: HERO_TIMINGS.decorativesStagger / 1000,
          onComplete: resolveAndClear,
        }
      );
    } else {
      gsap.to(targets, {
        scale: 0.4,
        opacity: 0,
        duration: HERO_TIMINGS.decorativePopDuration / 1000,
        ease: "power2.in",
        stagger: HERO_TIMINGS.decorativesStagger / 1000,
        onComplete: () => {
          setDecorativesVisible(false);
          resolveAndClear();
        },
      });
    }
  }, [decorativeAnimRequest, slides]);

  // urutan animasi

  // kartu mulai pop sedikit sebelum model selesai naik agar transisi terasa menyatu
  const riseModelThenPopDecoratives = useCallback(
    (slideId: string) => {
      const leadMs = HERO_TIMINGS.decorativePopLeadBeforeModelSettles;
      const risePromise = riseModelUp();
      const decorativesPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          requestDecorativeAnim(slideId, "in").then(resolve);
        }, Math.max(HERO_TIMINGS.modelRiseDuration - leadMs, 0));
      });
      return Promise.all([risePromise, decorativesPromise]);
    },
    [riseModelUp, requestDecorativeAnim]
  );

  const scheduleNextCycle = useCallback(() => {
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    const idleDuration =
      HERO_TIMINGS.cycleDuration -
      HERO_TIMINGS.decorativePopDuration * 2 -
      HERO_TIMINGS.modelSinkDuration -
      HERO_TIMINGS.modelRiseDuration -
      HERO_TIMINGS.subtitleFade * 2;
    cycleTimerRef.current = setTimeout(() => {
      runTransitionRef.current?.();
    }, Math.max(idleDuration, 5000));
  }, []);

  const runIntro = useCallback(async () => {
    setPhase("intro");
    // saat mount pertama, judul, subtitle, dan model mulai bersama; kartu sedikit terlambat
    await Promise.all([
      new Promise<void>((resolve) => type(currentSlide.title, resolve)),
      fadeSubtitle("in"),
      riseModelThenPopDecoratives(currentSlide.id),
    ]);

    setPhase("idle");
    scheduleNextCycle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, type, fadeSubtitle, riseModelThenPopDecoratives]);

  const runTransition = useCallback(async () => {
    setPhase("outro");
    // outro mengecilkan kartu dulu, lalu model turun, lalu judul dihapus bersama fade subtitle
    await requestDecorativeAnim(currentSlide.id, "out");
    await sinkModelDown();
    await Promise.all([
      new Promise<void>((resolve) => untype(resolve)),
      fadeSubtitle("out"),
    ]);

    const nextIndex = (slideIndex + 1) % slides.length;
    setSlideIndex(nextIndex);
    const nextSlide = slides[nextIndex];

    // entrance slide berikutnya meniru intro pertama agar ritmenya konsisten
    setPhase("enter");
    await Promise.all([
      new Promise<void>((resolve) => type(nextSlide.title, resolve)),
      fadeSubtitle("in"),
      riseModelThenPopDecoratives(nextSlide.id),
    ]);

    setPhase("idle");
    scheduleNextCycle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    slideIndex,
    currentSlide,
    requestDecorativeAnim,
    sinkModelDown,
    untype,
    fadeSubtitle,
    type,
    riseModelThenPopDecoratives,
    slides,
  ]);

  useLayoutEffect(() => {
    runTransitionRef.current = runTransition;
  }, [runTransition]);

  // boot

  useLayoutEffect(() => {
    if (phase !== "boot") return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) void runIntro();
    });
    return () => {
      cancelled = true;
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    phase,
    currentSlide,
    titleText,
    cursorVisible,
    decorativesVisible,
    modelRef,
    subtitleRef,
    registerDecorative,
  };
}
