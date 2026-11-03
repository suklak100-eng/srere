import React from 'react';
import { Sparkles, Shield, Compass, HeartHandshake, Eye } from 'lucide-react';

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
    <section className="py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#8A6421] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Master Atelier Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-bold text-[#041A15] tracking-tight">
            The Haute Joaillerie Code
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="text-neutral-600 text-sm sm:text-base font-normal">
            Where ancestral craftsmanship meets contemporary metallurgical purity. No shortcuts, no artificial alloys—only masterworks built to be handed down for generations.
          </p>
        </div>

        {/* 4 Atelier Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-luxury hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#D4AF37]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FAF6F0] text-[#7B112C] border border-[#D4AF37]/25">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-royal font-bold text-xl text-[#041A15] group-hover:text-[#9A7432] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-[#8A6421] mt-1 font-sans">
                  {pillar.subtitle}
                </div>

                <p className="text-xs text-neutral-600 mt-3 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#9A7432] font-semibold">
                <span>BIS 916 Standard</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner with CTA */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#041A15] border-2 border-[#D4AF37]/40 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#D4AF37]/15 to-transparent pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left z-10">
            <span className="text-xs font-mono font-bold text-[#D4AF37] tracking-widest uppercase">
              Bespoke Bridal Consultations
            </span>
            <h3 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Designing Your Custom Family Heirloom?
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl font-sans">
              Collaborate directly with our master sketch artists and karigars. Provide your antique gold or choose our 24K bullion to craft one-of-a-kind wedding jewelry.
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="btn-luxury-gold px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap z-10 flex-shrink-0"
          >
            Explore Showcase
          </button>
        </div>

      </div>
    </section>
  );
};
