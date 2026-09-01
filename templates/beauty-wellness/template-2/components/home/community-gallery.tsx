"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

const images = [
  {
    src: "/images/community/product-closeup.webp",
    alt: "Barrier Reset Serum in warm morning light",
  },
  {
    src: "/images/community/bathroom-shelf.webp",
    alt: "Chulla products on a warm stone bathroom shelf",
  },
  {
    src: "/images/community/skin-lifestyle.webp",
    alt: "Natural skin in soft morning light",
  },
  {
    src: "/images/community/serum-texture-lifestyle.webp",
    alt: "Barrier Reset Serum and translucent serum texture",
  },
  {
    src: "/images/community/community-campaign.webp",
    alt: "Chulla skincare routine in a warm interior",
  },
  {
    src: "/images/community/packaging-detail.webp",
    alt: "Close detail of Chulla Barrier Reset Serum packaging",
  },
] as const;

export function CommunityGallery() {
  const railRef = useRef<HTMLDivElement>(null);

  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const didDrag = useRef(false);

  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const resumeTimer =
    useRef<number | null>(null);

  const [selected, setSelected] =
    useState<number | null>(null);

  const reduceMotion = useReducedMotion();

  const repeatedImages = [
    ...images,
    ...images,
    ...images,
  ];

  const clearResumeTimer =
    useCallback(() => {
      if (resumeTimer.current !== null) {
        window.clearTimeout(
          resumeTimer.current
        );

        resumeTimer.current = null;
      }
    }, []);

  const pause = useCallback(() => {
    clearResumeTimer();
    isPaused.current = true;
  }, [clearResumeTimer]);

  const resumeLater =
    useCallback(() => {
      clearResumeTimer();

      resumeTimer.current =
        window.setTimeout(() => {
          if (!isDragging.current) {
            isPaused.current = false;
          }
        }, 850);
    }, [clearResumeTimer]);

  useLayoutEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    const moveToMiddleCopy = () => {
      const loopWidth =
        rail.scrollWidth / 3;

      if (loopWidth > 0) {
        rail.scrollLeft = loopWidth;
      }
    };

    const frame =
      window.requestAnimationFrame(
        moveToMiddleCopy
      );

    if (reduceMotion) {
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const tick = () => {
      const loopWidth =
        rail.scrollWidth / 3;

      if (!loopWidth) return;

      if (
        !isPaused.current &&
        !isDragging.current
      ) {
        rail.scrollLeft +=
          0.32 *
          gsap.ticker.deltaRatio(60);
      }

      if (
        rail.scrollLeft <
        loopWidth * 0.5
      ) {
        rail.scrollLeft += loopWidth;
      } else if (
        rail.scrollLeft >
        loopWidth * 1.5
      ) {
        rail.scrollLeft -= loopWidth;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      gsap.ticker.remove(tick);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (selected === null) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSelected(null);
      }

      if (event.key === "ArrowLeft") {
        setSelected((current) => {
          if (current === null) return null;

          return (
            current -
            1 +
            images.length
          ) % images.length;
        });
      }

      if (event.key === "ArrowRight") {
        setSelected((current) => {
          if (current === null) return null;

          return (
            current + 1
          ) % images.length;
        });
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [selected]);

  const previousImage = () => {
    setSelected((current) => {
      if (current === null) return null;

      return (
        current -
        1 +
        images.length
      ) % images.length;
    });
  };

  const nextImage = () => {
    setSelected((current) => {
      if (current === null) return null;

      return (
        current + 1
      ) % images.length;
    });
  };

  return (
    <>
      <div
        ref={railRef}
        className="communityRail"
        role="region"
        aria-label="Chulla community gallery"
        onPointerEnter={() => {
          pause();
        }}
        onPointerLeave={() => {
          if (!isDragging.current) {
            resumeLater();
          }
        }}
        onPointerDown={(event) => {
          /*
           * Touch tetap memakai native
           * horizontal scrolling.
           */
          if (
            event.pointerType === "touch"
          ) {
            pause();
            return;
          }

          if (
            event.pointerType === "mouse" &&
            event.button !== 0
          ) {
            return;
          }

          const rail = railRef.current;

          if (!rail) return;

          pause();

          isDragging.current = true;
          didDrag.current = false;

          dragStartX.current =
            event.clientX;

          dragStartScroll.current =
            rail.scrollLeft;

          rail.setPointerCapture(
            event.pointerId
          );

          rail.classList.add(
            "is-dragging"
          );
        }}
        onPointerMove={(event) => {
          if (!isDragging.current) {
            return;
          }

          const rail = railRef.current;

          if (!rail) return;

          const delta =
            event.clientX -
            dragStartX.current;

          if (Math.abs(delta) > 5) {
            didDrag.current = true;
          }

          rail.scrollLeft =
            dragStartScroll.current -
            delta;
        }}
        onPointerUp={(event) => {
          const rail = railRef.current;

          if (!rail) return;

          isDragging.current = false;

          rail.classList.remove(
            "is-dragging"
          );

          if (
            rail.hasPointerCapture(
              event.pointerId
            )
          ) {
            rail.releasePointerCapture(
              event.pointerId
            );
          }

          resumeLater();
        }}
        onPointerCancel={() => {
          isDragging.current = false;

          railRef.current?.classList.remove(
            "is-dragging"
          );

          resumeLater();
        }}
        onWheel={() => {
          pause();
          resumeLater();
        }}
        onTouchEnd={() => {
          resumeLater();
        }}
      >
        {repeatedImages.map(
          (image, index) => {
            const originalIndex =
              index % images.length;

            return (
              <button
                type="button"
                key={`${image.src}-${index}`}
                className={`communityRail__item communityRail__item--${originalIndex + 1}`}
                aria-label={`Open image ${originalIndex + 1} of ${images.length}`}
                onClick={() => {
                  if (didDrag.current) {
                    didDrag.current = false;
                    return;
                  }

                  setSelected(
                    originalIndex
                  );
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            );
          }
        )}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="communityLightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Community image preview"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.24,
            }}
            onMouseDown={(event) => {
              if (
                event.currentTarget ===
                event.target
              ) {
                setSelected(null);
              }
            }}
          >
            <button
              type="button"
              className="communityLightbox__close"
              aria-label="Close image preview"
              onClick={() => {
                setSelected(null);
              }}
            >
              <X
                size={24}
                strokeWidth={1.4}
              />
            </button>

            <button
              type="button"
              className="communityLightbox__nav communityLightbox__nav--prev"
              aria-label="Previous image"
              onClick={previousImage}
            >
              <ChevronLeft
                size={30}
                strokeWidth={1.25}
              />
            </button>

            <div className="communityLightbox__frame">
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.img
                  key={selected}
                  src={
                    images[selected].src
                  }
                  alt={
                    images[selected].alt
                  }
                  initial={{
                    opacity: 0,
                    scale: reduceMotion
                      ? 1
                      : 0.975,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: reduceMotion
                      ? 1
                      : 1.015,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.32,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                />
              </AnimatePresence>

              <div className="communityLightbox__meta">
                <span>
                  {String(
                    selected + 1
                  ).padStart(2, "0")}
                  {" / "}
                  {String(
                    images.length
                  ).padStart(2, "0")}
                </span>

                <span>@chullaskin</span>
              </div>
            </div>

            <button
              type="button"
              className="communityLightbox__nav communityLightbox__nav--next"
              aria-label="Next image"
              onClick={nextImage}
            >
              <ChevronRight
                size={30}
                strokeWidth={1.25}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}