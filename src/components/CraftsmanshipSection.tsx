import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CraftsmanshipSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const pillars = [
    {
      title: 'Kundan & Jadau Karigari',
      subtitle: 'Pure 24K Foil Embedding',
      desc: 'Each uncut polki diamond is seated on pure refined 24K gold leaf foils, reflecting candlelight with unmatched celestial luminescence.',
      tag: 'Heritage Rajasthan'
    },
    {
      title: 'Vibrant Benarasi Meenakari',
      subtitle: 'Hand-Fired Glass Enamel',
      desc: 'Reverse sides of our royal necklaces are hand-painted with pulverized ruby, emerald, and lapis pigments fired at 850°C for eternal brilliance.',
      tag: 'Imperial Atelier'
    },
    {
      title: 'Nakshi & Temple Repoussé',
      subtitle: 'Sculpted Solid 22K Gold',
      desc: 'Master artisans hammer auspicious Lakshmi, makara, and floral temple vines into solid 22K sheets using centuries-old repoussé techniques.',
      tag: 'Sacred Iconography'
    },
    {
      title: 'Laser HUID Inscription',
      subtitle: 'Tamperproof Traceability',
      desc: 'Every single piece carries the 6-character alphanumeric Bureau of Indian Standards HUID code verifiable on the National BIS Care app.',
      tag: '100% Guaranteed'
    }
  ];

  return (
    <section className="py-24 bg-[#08090A] relative overflow-hidden border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-cinzel font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Master Atelier Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-light text-white tracking-tight">
            The Haute Joaillerie Code
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto my-3" />
          <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-md mx-auto leading-relaxed">
            Where ancestral craftsmanship meets contemporary metallurgical purity. No shortcuts, no artificial alloys—only masterworks built to be handed down for generations.
          </p>
        </div>

        {/* 4 Atelier Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20 hover:-translate-y-2 hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-xs font-bold text-[#C5A880]">
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] font-cinzel uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-[#14171A] text-[#FFF3B0] border border-[#C5A880]/30">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-royal text-xl text-white group-hover:text-[#FFF3B0] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <div className="text-xs font-cinzel text-[#C5A880] mt-1">
                  {pillar.subtitle}
                </div>

                <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-cinzel text-[#C5A880] tracking-wider uppercase font-semibold">
                <span>BIS 916 Standard</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner with CTA */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#0D0E11] border border-[#C5A880]/40 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C5A880]/15 to-transparent pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left z-10">
            <span className="text-[10px] font-cinzel font-bold text-[#C5A880] tracking-[0.25em] uppercase">
              Bespoke Bridal Consultations
            </span>
            <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl text-white font-light">
              Designing Your Custom Family Heirloom?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl font-sans">
              Collaborate directly with our master sketch artists and karigars. Provide your antique gold or choose our 24K bullion to craft one-of-a-kind wedding jewelry.
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="btn-luxury-gold px-8 py-4 rounded-full text-xs font-cinzel font-bold uppercase tracking-[0.16em] whitespace-nowrap z-10 flex-shrink-0"
          >
            Explore Showcase
          </button>
        </div>

      </div>
    </section>
  );
};
