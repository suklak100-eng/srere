import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { Sparkles, CheckCircle2, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useJewelry();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[9999] flex flex-col gap-3 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
            toast.type === 'gold'
              ? 'bg-[#08090A]/95 border-[#C5A880] text-white shadow-[0_10px_30px_rgba(197,168,128,0.25)]'
              : toast.type === 'success'
              ? 'bg-[#0D0E11]/95 border-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
              : 'bg-[#14171A]/95 border-[#C5A880]/40 text-white'
          }`}
        >
          <div className="mt-0.5 flex-shrink-0">
            {toast.type === 'gold' ? (
              <div className="p-1.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/40">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            ) : toast.type === 'success' ? (
              <div className="p-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40">
                <Info className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="flex-1 pr-2">
            <h4 className="font-cinzel font-bold text-xs text-[#FFF3B0] tracking-wider uppercase">
              {toast.title}
            </h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed font-sans">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
