import React, { useState } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { formatINR } from '../utils/pricing';
import {
  Sparkles,
  ShieldCheck,
  Search,
  Maximize2,
  Award,
  Layers,
  ArrowRight,
  Eye
} from 'lucide-react';

export const KarigariStudio: React.FC<{ onInspectOpen: () => void }> = ({ onInspectOpen }) => {
  const { rates } = useJewelry();
  const [activePerspective, setActivePerspective] = useState<0 | 1 | 2>(0);

  const perspectives = [
    {
      title: 'Studio Frontal Silhouette',
      label: 'Macro Silhouette',
      subtitle: 'Sculpted in Solid 22K BIS 916 Gold',
      desc: 'Observed under calibrated 5500K daylight salon lighting. Notice the balanced cascading weight distribution and hand-strung basra pearl counterweights.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      badge: '22K BIS 916 • 46.50g',
      inspectionNote: 'Laser verified weight and tensile structural integrity.'
    },
    {
      title: 'Micro-Karigari & 24K Foil Jadau',
      label: 'Kundan Karigari',
      subtitle: 'Pure Refined 24K Gold Foil Cavity',
      desc: 'Macro inspection reveals how each uncut polki gemstone is encapsulated in pure 24K gold foil, catching candlelight to create the signature celestial glow.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
      badge: 'Handcrafted Foil Jadau',
      inspectionNote: 'Hand-fired crimson and peacock meenakari enamel backing.'
    },
    {
      title: 'Government BIS 916 HUID Assay',
      label: 'Hallmark Laser ID',
      subtitle: 'Tamperproof National Laser Verification',
      desc: 'Laser-inscribed 6-digit alphanumeric unique identification verifiable directly on the Bureau of Indian Standards BIS Care national portal.',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=85',
      badge: 'BIS-MH-MUM-916',
      inspectionNote: 'Zero synthetic alloys. 100% metallurgical gold purity.'
    }
  ];

  const current = perspectives[activePerspective];

  return (
    <section className="py-24 bg-[#050608] relative overflow-hidden border-t border-b border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-cinzel font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Interactive Karigari Salon</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-light text-white tracking-tight">
            The Studio Inspection Atelier
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto my-3" />
          <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-md mx-auto leading-relaxed">
            Switch between calibrated perspectives to inspect raw metallurgical karigari, hand-laid 24K gold foil, and laser HUID assay marks.
          </p>
        </div>

        {/* Studio Viewer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0D0E11] p-6 sm:p-10 rounded-3xl border border-[#C5A880]/30 shadow-2xl">
          
          {/* Left: Perspective Image Stage */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C5A880]/35 bg-black shadow-2xl group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108"
              />

              {/* Reticle Overlay */}
              <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#08090A]/85 border border-[#C5A880]/40 text-[#FFF3B0] text-[10px] font-cinzel font-bold tracking-wider uppercase backdrop-blur-md">
                {current.badge}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300 bg-[#08090A]/80 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-[#C5A880]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  {current.inspectionNote}
                </span>
                <span className="font-mono text-neutral-400 text-[10px]">5500K True Light</span>
              </div>
            </div>

            {/* 3 Interactive Angle Selector Pills */}
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {perspectives.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePerspective(idx as any)}
                  className={`py-3 px-2 rounded-xl text-center text-xs font-cinzel tracking-wider uppercase transition-all ${
                    activePerspective === idx
                      ? 'bg-[#C5A880] text-[#08090A] font-bold shadow-lg'
                      : 'bg-[#14171A] hover:bg-[#1F2329] text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="block text-[10px] opacity-75">View 0{idx + 1}</span>
                  <span className="font-semibold block truncate">{p.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right: Technical Atelier Receipt */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Atelier Perspective 0{activePerspective + 1}
              </span>
              <h3 className="font-royal text-2xl sm:text-3xl text-white font-light">
                {current.title}
              </h3>
              <div className="text-xs font-cinzel text-[#FFF3B0] font-semibold">
                {current.subtitle}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {current.desc}
            </p>

            {/* Quality Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#14171A] border border-[#C5A880]/20">
                <span className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400 block">Karat Precision</span>
                <span className="font-cinzel font-bold text-white text-sm">22 Karat (91.6%)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14171A] border border-[#C5A880]/20">
                <span className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400 block">Hallmarking Body</span>
                <span className="font-cinzel font-bold text-white text-sm">BIS Govt Certified</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onInspectOpen}
                className="btn-luxury-gold w-full py-3.5 px-6 rounded-full text-xs font-cinzel font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#08090A]" />
                <span>Open 2.3x Magnifier Loupe Modal</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
