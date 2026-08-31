"use client";

import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  isOpen: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

export default function Toast({ isOpen, message, subMessage, onClose }: ToastProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#0A0A0A] text-white border border-[#262626] rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">{message}</h4>
            {subMessage && (
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{subMessage}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Close Notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
