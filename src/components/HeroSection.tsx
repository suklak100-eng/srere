import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { formatINR } from '../utils/pricing';
import {
  Sparkles,
  ShieldCheck,
  Scale,
  Award,
  ArrowRight,
  Calculator,
  Gem,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCalculatorClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCalculatorClick,
}) => {
  const { rates } = useJewelry();

  // Dynamic live price calculation for hero arch preview
  const heroWeight = 42.80;
  const heroMaking = 0.14;
  const heroBaseCost = heroWeight * rates.k22;
  const heroTotalWithMaking = heroBaseCost * (1 + heroMaking);
  const heroFinalEstimate = Math.round(heroTotalWithMaking * 1.03);

  return (
    <section className="relative min-h-[92vh] bg-[#041A15] overflow-hidden pt-10 pb-20 md:py-20 flex items-center">
      
      {/* Background Radial Champagne Spotlight */}
      <div className="absolute inset-0 hero-radial-spotlight pointer-events-none" />

      {/* Decorative Golden Ambient Circles */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/15 blur-[130px] pointer-events-none" />

      {/* Delicate Royal Filigree Pattern overlay (subtle SVG grid) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #D4AF37 2%, transparent 0%), radial-gradient(circle at 75px 75px, #D4AF37 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Royal Editorial Copy & Badges */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Glowing Hallmark Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#07261F]/90 border border-[#D4AF37]/50 shadow-[0_0_18px_rgba(212,175,55,0.25)] text-neutral-200 text-xs sm:text-sm font-medium backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="tracking-wide">
                100% BIS 916 HUID HALLMARKED • IGI CERTIFIED DIAMONDS
              </span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.3rem] font-royal font-bold text-white leading-[1.08] tracking-tight">
              Timeless Heritage,{' '}
              <br className="hidden sm:inline" />
              Forged in <span className="gold-foil-text font-royal italic font-bold">Pure Royalty.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              Step into an imperial legacy of high jewelry inspired by royal Indian dynasties and Parisian ateliers. Featuring our industry-first{' '}
              <strong className="text-[#FFF3B0] font-semibold">Live Bullion Pricing Engine</strong>, zero old-gold exchange deduction, and master-crafted bridal heirlooms.
            </p>

            {/* Live Today's Snapshot Quick Bar */}
            <div className="w-full max-w-xl p-3.5 rounded-2xl bg-[#07261F]/70 border border-[#D4AF37]/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Live 22K BIS 916</div>
                  <div className="font-mono font-bold text-[#FFF3B0] text-sm">{formatINR(rates.k22)}/g</div>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-[#D4AF37]/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">24K Fine Bullion</div>
                  <div className="font-mono font-bold text-[#FFF3B0] text-sm">{formatINR(rates.k24)}/g</div>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-[#D4AF37]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>0% Exchange Deduction</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="btn-luxury-gold px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-3 transition-all"
              >
                <span>Explore Royal Collection</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onCalculatorClick}
                className="px-6 py-4 rounded-full text-sm font-medium tracking-wide text-neutral-200 hover:text-white bg-[#07261F]/80 hover:bg-[#0B362C] border border-[#D4AF37]/40 backdrop-blur-md flex items-center justify-center gap-2.5 transition-all shadow-lg hover:border-[#D4AF37]"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>Live Gold Price Calculator</span>
              </button>
            </div>

            {/* 3 Glassmorphic Trust Cards at Bottom */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 w-full max-w-xl">
              <div className="p-3 sm:p-4 rounded-xl bg-[#07261F]/60 border border-[#D4AF37]/20 backdrop-blur-sm hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-royal text-xl sm:text-2xl font-bold text-[#FFF3B0]">15,000+</div>
                <div className="text-[11px] sm:text-xs text-neutral-300 mt-0.5">Happy Brides Adorned</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-[#07261F]/60 border border-[#D4AF37]/20 backdrop-blur-sm hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-royal text-xl sm:text-2xl font-bold text-[#FFF3B0]">Karatmeter</div>
                <div className="text-[11px] sm:text-xs text-neutral-300 mt-0.5">Live Spectrometer Test</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-[#07261F]/60 border border-[#D4AF37]/20 backdrop-blur-sm hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-royal text-xl sm:text-2xl font-bold text-[#FFF3B0]">100% HUID</div>
                <div className="text-[11px] sm:text-xs text-neutral-300 mt-0.5">Govt Verified Laser ID</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Arch Showcase with Rotating Halo Ring */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            
            {/* Rotating Dashed Golden Halo Ring Behind Arch */}
            <div className="halo-ring absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border-2 border-dashed border-[#D4AF37]/35 pointer-events-none" />
            <div className="absolute w-[300px] sm:w-[390px] h-[300px] sm:h-[390px] rounded-full border border-[#D4AF37]/15 pointer-events-none" />

            {/* Grand Arch Frame */}
            <div className="hero-float relative z-10 w-[290px] sm:w-[350px] h-[430px] sm:h-[510px] rounded-[220px_220px_24px_24px] p-2 bg-gradient-to-b from-[#FFF3B0] via-[#D4AF37] to-[#8A6421] shadow-[0_25px_60px_-15px_rgba(212,175,55,0.45)]">
              
              <div className="w-full h-full rounded-[215px_215px_20px_20px] overflow-hidden bg-[#07261F] relative group">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
                  alt="Aurelia Royal Kundan Bridal Rani Haar"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="eager"
                />

                {/* Subtle Gradient Shade at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041A15]/90 via-transparent to-black/20" />

                {/* Watermark Crest */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-80">
                  <div className="inline-flex items-center gap-1 text-[11px] tracking-[0.25em] uppercase text-[#FFF3B0] font-royal font-semibold bg-[#041A15]/70 px-3 py-1 rounded-full border border-[#D4AF37]/40 backdrop-blur-md">
                    <span>👑 Haute Joaillerie</span>
                  </div>
                </div>

              </div>

              {/* Overlapping Floating Glassmorphic Card: Top-Right */}
              <div className="absolute -top-4 -right-4 sm:-right-8 p-3 sm:p-3.5 rounded-2xl bg-[#07261F]/90 border border-[#D4AF37]/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-[210px] transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      Signature Masterpiece
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      Royal Bridal Sitahar
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-neutral-300 font-mono flex items-center justify-between border-t border-[#D4AF37]/20 pt-1.5">
                  <span>Weight: <strong>42.80g</strong></span>
                  <span className="text-[#FFF3B0] font-bold">22K BIS 916</span>
                </div>
              </div>

              {/* Overlapping Floating Glassmorphic Card: Bottom-Left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 p-3 sm:p-4 rounded-2xl bg-[#041A15]/95 border border-[#D4AF37]/60 shadow-[0_20px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl min-w-[230px] transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Showroom Estimate</span>
                  </div>
                  <span className="text-[9px] text-[#D4AF37] font-mono">3% GST Inc.</span>
                </div>
                <div className="mt-1 font-mono text-xl font-extrabold text-[#FFF3B0]">
                  {formatINR(heroFinalEstimate)}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center justify-between">
                  <span>Auto-calculated in real time</span>
                  <span className="text-[#D4AF37]">Tap to view →</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

