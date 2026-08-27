'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  tag?: string;
  category?: string;
  description?: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  direction?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

// 3D Page Flip / Paper Animation Variants
const pageFlipVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.92,
    x: dir > 0 ? 50 : -50,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      rotateY: { type: 'spring', stiffness: 240, damping: 26 },
      x: { type: 'spring', stiffness: 260, damping: 28 },
      scale: { duration: 0.35, ease: 'easeOut' },
      opacity: { duration: 0.25 },
    },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.92,
    x: dir > 0 ? -50 : 50,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  }),
};

export default function GalleryModal({
  isOpen,
  item,
  direction = 0,
  onClose,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: GalleryModalProps) {
  // Keyboard navigation & escape listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="gallery-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md select-none overflow-hidden"
          onClick={onClose}
        >
          {/* Close Button Top Right */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl border border-white/15 cursor-pointer"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Prev Navigation Button */}
          {onPrev && hasPrev && (
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl border border-white/15 hidden sm:flex items-center justify-center cursor-pointer"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </motion.button>
          )}

          {/* Next Navigation Button */}
          {onNext && hasNext && (
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl border border-white/15 hidden sm:flex items-center justify-center cursor-pointer"
              aria-label="Foto Berikutnya"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </motion.button>
          )}

          {/* 3D Paper Stack Container */}
          <div
            className="relative max-w-4xl w-full flex items-center justify-center"
            style={{ perspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Paper Stack Layer 2 (Bottom back sheet) */}
            <div className="absolute inset-0 max-h-[85vh] rounded-3xl bg-[#1e2022] border border-white/10 shadow-2xl transform rotate-[2.5deg] scale-[0.97] pointer-events-none opacity-80" />

            {/* Paper Stack Layer 1 (Middle back sheet) */}
            <div className="absolute inset-0 max-h-[85vh] rounded-3xl bg-[#161819] border border-white/10 shadow-2xl transform -rotate-[2deg] scale-[0.985] pointer-events-none opacity-90" />

            {/* Main Interactive Paper Flip Card */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={item.id}
                custom={direction}
                variants={pageFlipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: 'preserve-3d' }}
                className="relative z-10 w-full max-h-[88vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/15 select-none"
              >
                {/* Subtle paper top badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-gray-300">
                  <Layers className="w-3.5 h-3.5 text-[#48B800]" />
                  <span>Dokumentasi Foto</span>
                </div>

                {/* Image Viewport with Paper Shadow */}
                <div className="relative w-full h-[52vh] sm:h-[62vh] md:h-[68vh] bg-black/60 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain object-center shadow-inner"
                    draggable={false}
                  />
                </div>

                {/* Bottom Photo Caption & Controls */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-neutral-900/90 to-neutral-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#48B800]">
                      {item.tag || 'DOKUMENTASI'}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Mobile Navigation Controls */}
                  <div className="flex items-center gap-2 sm:hidden self-end">
                    {onPrev && (
                      <button
                        onClick={onPrev}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                        aria-label="Foto Sebelumnya"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    {onNext && (
                      <button
                        onClick={onNext}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95"
                        aria-label="Foto Berikutnya"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
