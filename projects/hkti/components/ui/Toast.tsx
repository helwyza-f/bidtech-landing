'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  duration = 4000,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const icons = {
    success: <Check className="w-4 h-4 text-white" />,
    info: <Info className="w-4 h-4 text-white" />,
    warning: <AlertTriangle className="w-4 h-4 text-white" />,
  };

  const bgColors = {
    success: 'bg-emerald-600',
    info: 'bg-sky-600',
    warning: 'bg-amber-600',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className={`w-7 h-7 rounded-full ${bgColors[type]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              {icons[type]}
            </div>
            <div>
              <h6 className="text-sm font-bold text-white">{title}</h6>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
