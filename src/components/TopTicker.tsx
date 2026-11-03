import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { formatINR } from '../utils/pricing';
import { Sparkles, TrendingUp, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const TopTicker: React.FC = () => {
  const { rates, setIsAdminOpen } = useJewelry();

  const tickerItems = [
    { label: '24K Gold (99.9% Fine Bullion)', rate: rates.k24, change: '+₹35/g' },
    { label: '22K BIS 916 Hallmark Gold', rate: rates.k22, change: '+₹28/g', highlight: true },
    { label: '18K Rose & Diamond Gold', rate: rates.k18, change: '+₹22/g' },
    { label: 'Fine Silver (99.9% Purity)', rate: rates.silver, change: '+₹0.8/g' },
    { label: 'AURELIA ZERO-DEDUCTION GUARANTEE', special: '100% Exchange Value on Old Gold' },
    { label: 'GOVERNMENT BIS HUID CERTIFIED', special: '100% Tamperproof Laser Inscription' }
  ];

  return (
    <div className="bg-[#02100C] text-neutral-200 border-b border-[#D4AF37]/25 text-xs py-2 px-3 md:px-6 relative overflow-hidden z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 border-r border-[#D4AF37]/20 pr-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]"></span>
          </span>
          <span className="font-semibold tracking-wider text-[#D4AF37] uppercase text-[11px] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 inline" /> Live Bullion
          </span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="overflow-hidden flex-1 relative mask-linear">
          <div className="animate-marquee flex items-center gap-8 py-0.5">
            {/* Repeat twice for continuous loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 whitespace-nowrap text-xs text-neutral-300 hover:text-white transition-colors"
              >
                {item.special ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FFF3B0] font-medium text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-bold text-[#D4AF37]">{item.label}:</span> {item.special}
                  </span>
                ) : (
                  <>
                    <span className="font-medium text-neutral-400">{item.label}:</span>
                    <span className={`font-bold font-mono ${item.highlight ? 'text-[#FFF3B0] font-extrabold' : 'text-neutral-100'}`}>
                      {formatINR(item.rate || 0)}/g
                    </span>
                    <span className="text-emerald-400 text-[10px] bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-800/40">
                      {item.change}
                    </span>
                  </>
                )}
                <span className="text-[#D4AF37]/40 text-xs">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Admin Live Rate Edit Button */}
        <div className="flex-shrink-0 pl-3">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#9A7432]/30 hover:from-[#D4AF37]/35 hover:to-[#9A7432]/50 border border-[#D4AF37]/40 text-[#FFF3B0] font-medium text-[11px] transition-all hover:scale-105 active:scale-95 shadow-sm group"
            title="Update Live Bullion Rates (Admin PIN: 1234)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-semibold">⚡ Edit Live Rate</span>
            <span className="sm:hidden font-semibold">⚡ Rate</span>
            <span className="text-[10px] text-neutral-400 opacity-80">(Admin)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
