import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { formatINR } from '../utils/pricing';
import { TrendingUp, SlidersHorizontal, ShieldCheck, Sparkles } from 'lucide-react';

export const TopTicker: React.FC = () => {
  const { rates, setIsAdminOpen } = useJewelry();

  const tickerItems = [
    { label: '24K Pure Bullion (99.9%)', rate: rates.k24, change: '+₹35/g' },
    { label: '22K BIS 916 Hallmark Gold', rate: rates.k22, change: '+₹28/g', highlight: true },
    { label: '18K Rose & Diamond Alloy', rate: rates.k18, change: '+₹22/g' },
    { label: 'Fine Silver (99.9%)', rate: rates.silver, change: '+₹0.8/g' },
    { label: 'Aurelia 0% Exchange Guarantee', note: '100% Value on Old Gold Exchange' },
    { label: 'BIS HUID Certified', note: '100% Govt Laser Inscription' }
  ];

  return (
    <div className="bg-[#050608] text-neutral-300 border-b border-[#C5A880]/20 text-[11px] py-2 px-3 sm:px-6 relative overflow-hidden z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Live Status Beacon */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 border-r border-[#C5A880]/20 pr-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-cinzel tracking-[0.2em] text-[#C5A880] uppercase text-[10px] font-semibold flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-[#C5A880]" />
            Live Bullion Desk
          </span>
        </div>

        {/* Marquee Track */}
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-marquee flex items-center gap-8 py-0.5">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 whitespace-nowrap text-[11px] tracking-wide text-neutral-300 hover:text-white transition-colors"
              >
                {item.note ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#FFF3B0] text-[10px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                    <span className="text-[#C5A880] font-semibold">{item.label}:</span> {item.note}
                  </span>
                ) : (
                  <>
                    <span className="text-neutral-400 font-light">{item.label}:</span>
                    <span className={`font-mono font-bold ${item.highlight ? 'text-[#FFF3B0] font-extrabold' : 'text-neutral-100'}`}>
                      {formatINR(item.rate || 0)}/g
                    </span>
                    <span className="text-emerald-400 text-[9px] bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-800/40">
                      {item.change}
                    </span>
                  </>
                )}
                <span className="text-[#C5A880]/40 text-xs ml-3">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Admin Live Rate Edit Trigger */}
        <div className="flex-shrink-0 pl-2">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D0E11] hover:bg-[#14171A] border border-[#C5A880]/35 text-[#FFF3B0] text-[10px] tracking-wider uppercase font-semibold transition-all hover:scale-105 active:scale-95 group shadow-sm"
            title="Edit Live Rates (Admin PIN: 1234)"
          >
            <Sparkles className="w-3 h-3 text-[#C5A880] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">⚡ Edit Live Rate</span>
            <span className="sm:hidden">Rate</span>
            <span className="text-[9px] text-neutral-400 opacity-70 font-mono">(Admin)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
