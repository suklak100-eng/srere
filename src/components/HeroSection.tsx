import React, { useState, useEffect } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { formatINR } from '../utils/pricing';
import {
  Sparkles,
  ShieldCheck,
  Scale,
  ArrowRight,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Gem,
  Award,
  Clock
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCalculatorClick: () => void;
  onInspectItem: (sku: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCalculatorClick,
  onInspectItem
}) => {
  const { rates } = useJewelry();
  const [activeSlide, setActiveSlide] = useState(0);

  const signaturePieces = [
    {
      sku: 'ARJ-101',
      title: 'The Maharani Kundan Rani Haar',
      subtitle: '22K BIS 916 Hallmark • 46.50g • Handcrafted Jadau Enamel',
      purity: '22K',
      weight: 46.50,
      making: 14,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      tag: 'Imperial Bridal Heirloom',
      rate: rates.k22
    },
    {
      sku: 'ARJ-103',
      title: 'The Imperial Solitaire Diamond Ring',
      subtitle: '18K Gold • 5.80g • 1.25ct Triple Excellent IGI Certified',
      purity: '18K',
      weight: 5.80,
      making: 15,
      stone: 45000,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      tag: 'Haute Solitaire Atelier',
      rate: rates.k18
    },
    {
      sku: 'ARJ-110',
      title: 'The Basra Pearl & Satlada Seven-Layer Haar',
      subtitle: '22K BIS 916 Gold • 54.20g • Seven Cascading Seed Pearl Tiers',
      purity: '22K',
      weight: 54.20,
      making: 15,
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=85',
      tag: 'Royal Dynasty Legacy',
      rate: rates.k22
    }
  ];

  // Auto rotate slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % signaturePieces.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [signaturePieces.length]);

  const currentPiece = signaturePieces[activeSlide];
  
  // Calculate live estimate for current piece
  const metalCost = currentPiece.weight * currentPiece.rate;
  const makingCost = metalCost * (currentPiece.making / 100);
  const stoneCost = currentPiece.stone || 0;
  const subtotal = metalCost + makingCost + stoneCost;
  const finalEstimate = Math.round(subtotal * 1.03);

  return (
    <section className="relative min-h-[95vh] bg-[#08090A] overflow-hidden flex flex-col justify-between pt-8 pb-16">
      
      {/* Background Lighting & Depth */}
      <div className="absolute inset-0 champagne-glow-hero pointer-events-none" />
      <div className="absolute inset-0 editorial-vignette pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-[#C5A880]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-emerald-950/25 blur-[160px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Top Maison Identity Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#14171A] border border-[#C5A880]/35 text-[#C5A880] text-[10px] font-cinzel font-semibold uppercase tracking-[0.28em] shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
                Maison de Haute Joaillerie • Est. 1998
              </span>
              <span className="px-3 py-1 rounded-full bg-[#6E1024]/60 border border-[#C5A880]/30 text-[#FFF3B0] text-[10px] font-cinzel font-bold tracking-wider uppercase">
                BIS 916 Hallmark
              </span>
            </div>

            {/* Editorial Heading */}
            <div className="space-y-2">
              <span className="text-[11px] font-cinzel uppercase tracking-[0.38em] text-[#C5A880] block font-semibold">
                Haute Joaillerie & Imperial Trousseau
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] font-royal font-light text-white leading-[1.05] tracking-tight">
                Timeless Heritage,{' '}
                <br className="hidden sm:inline" />
                Forged in <span className="gold-foil-text font-royal italic font-bold">Pure Royalty.</span>
              </h1>
            </div>

            {/* Editorial Subtext */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-normal leading-relaxed">
              Step into an imperial realm where royal Indian dynastic karigari harmonizes with Parisian gemological precision. Featuring real-time{' '}
              <strong className="text-[#FFF3B0] font-semibold">Live Bullion Auto-Pricing</strong>, 100% zero-deduction old gold trade-ins, and bespoke bridal masterworks.
            </p>

            {/* Live Today's Snapshot Quick Bar */}
            <div className="w-full max-w-xl p-4 rounded-2xl bg-[#0D0E11]/90 border border-[#C5A880]/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs shadow-2xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/20">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400">Live 22K BIS 916</div>
                  <div className="font-mono font-bold text-[#FFF3B0] text-sm">{formatINR(rates.k22)}/g</div>
                </div>
              </div>
              
              <div className="h-6 w-[1px] bg-[#C5A880]/20 hidden sm:block" />
              
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/20">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400">24K Pure Bullion</div>
                  <div className="font-mono font-bold text-[#FFF3B0] text-sm">{formatINR(rates.k24)}/g</div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-[#C5A880]/20 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>0% Deduction</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="btn-luxury-gold px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-3 transition-all font-cinzel"
              >
                <span>Explore Royal Collection</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onCalculatorClick}
                className="btn-luxury-outline px-7 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 transition-all font-cinzel"
              >
                <Calculator className="w-4 h-4 text-[#C5A880]" />
                <span>Live Gold Calculator</span>
              </button>
            </div>

            {/* 3 Museum Trust Cards at Bottom */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 w-full max-w-xl">
              <div className="p-3.5 rounded-xl bg-[#0D0E11]/85 border border-[#C5A880]/20 backdrop-blur-sm hover:border-[#C5A880]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3B0]">15,000+</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Happy Brides Adorned</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0D0E11]/85 border border-[#C5A880]/20 backdrop-blur-sm hover:border-[#C5A880]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3B0]">Karatmeter</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Live Spectrometer Test</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0D0E11]/85 border border-[#C5A880]/20 backdrop-blur-sm hover:border-[#C5A880]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF3B0]">100% HUID</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Govt Verified Laser ID</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Flagship Showcase Carousel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            
            {/* Celestial Rotating Halo Ring */}
            <div className="halo-ring absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-dashed border-[#C5A880]/30 pointer-events-none" />
            <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full border border-[#C5A880]/15 pointer-events-none" />

            {/* Arch Museum Pedestal */}
            <div className="hero-float relative z-10 w-[300px] sm:w-[370px] h-[450px] sm:h-[530px] rounded-[220px_220px_24px_24px] p-2 bg-gradient-to-b from-[#FFF3B0] via-[#C5A880] to-[#8A6421] shadow-[0_25px_65px_-15px_rgba(197,168,128,0.5)]">
              
              <div
                onClick={() => onInspectItem(currentPiece.sku)}
                className="w-full h-full rounded-[215px_215px_20px_20px] overflow-hidden bg-[#0D0E11] relative group cursor-pointer"
              >
                <img
                  src={currentPiece.image}
                  alt={currentPiece.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                />

                {/* Shading Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090A]/95 via-transparent to-black/35" />

                {/* Top Badge */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-[#FFF3B0] font-cinzel font-semibold bg-[#08090A]/85 px-4 py-1.5 rounded-full border border-[#C5A880]/40 backdrop-blur-md shadow-lg">
                    <span>👑 {currentPiece.tag}</span>
                  </div>
                </div>

                {/* Tap to inspect hover banner */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#08090A]/90 px-4 py-2 rounded-full border border-[#C5A880] text-xs font-cinzel text-[#FFF3B0] tracking-wider uppercase backdrop-blur-md shadow-2xl">
                  🔍 Click to Inspect Studio Loupe
                </div>

              </div>

              {/* Floating Glassmorphic Card: Top-Right */}
              <div className="absolute -top-4 -right-4 sm:-right-8 p-3.5 sm:p-4 rounded-2xl bg-[#0D0E11]/95 border border-[#C5A880]/50 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl max-w-[220px]">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#C5A880]/20 text-[#C5A880]">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[9px] font-bold text-[#C5A880] font-cinzel uppercase tracking-wider">
                      Masterwork
                    </div>
                    <div className="text-xs font-semibold text-white truncate max-w-[140px]">
                      {currentPiece.title}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-neutral-300 font-mono flex items-center justify-between border-t border-[#C5A880]/20 pt-1.5">
                  <span>Weight: <strong>{currentPiece.weight.toFixed(2)}g</strong></span>
                  <span className="text-[#FFF3B0] font-bold">{currentPiece.purity} BIS 916</span>
                </div>
              </div>

              {/* Floating Glassmorphic Card: Bottom-Left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 p-3.5 sm:p-4 rounded-2xl bg-[#08090A]/95 border border-[#C5A880]/50 shadow-[0_20px_45px_rgba(0,0,0,0.8)] backdrop-blur-xl min-w-[240px]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Showroom Price</span>
                  </div>
                  <span className="text-[9px] text-[#C5A880] font-mono">3% GST Inc.</span>
                </div>
                <div className="mt-1 font-mono text-2xl font-extrabold text-[#FFF3B0]">
                  {formatINR(finalEstimate)}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center justify-between">
                  <span>Auto-calculated in real time</span>
                  <span className="text-[#C5A880]">Inspect →</span>
                </div>
              </div>

            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-4 mt-10 z-20">
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev === 0 ? signaturePieces.length - 1 : prev - 1))
                }
                className="p-2.5 rounded-full bg-[#14171A] hover:bg-[#1F2329] border border-[#C5A880]/30 text-[#C5A880] hover:text-white transition-all"
                aria-label="Previous Creation"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {signaturePieces.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeSlide === idx ? 'w-8 bg-[#C5A880]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % signaturePieces.length)
                }
                className="p-2.5 rounded-full bg-[#14171A] hover:bg-[#1F2329] border border-[#C5A880]/30 text-[#C5A880] hover:text-white transition-all"
                aria-label="Next Creation"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
