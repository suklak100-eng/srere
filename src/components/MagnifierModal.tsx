import React, { useState, useRef } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { calculateProductPrice, formatINR, generateWhatsAppInquiryUrl } from '../utils/pricing';
import {
  X,
  Search,
  Scale,
  Sparkles,
  MessageCircle,
  Heart,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface MagnifierModalProps {
  onBookViewingClick?: () => void;
}

export const MagnifierModal: React.FC<MagnifierModalProps> = ({ onBookViewingClick }) => {
  const {
    inspectedProduct,
    closeMagnifier,
    rates,
    settings,
    wishlist,
    toggleWishlist
  } = useJewelry();

  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  if (!inspectedProduct) return null;

  const breakdown = calculateProductPrice(inspectedProduct, rates);
  const wishlisted = wishlist.includes(inspectedProduct.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleWhatsAppClick = () => {
    const url = generateWhatsAppInquiryUrl(settings.whatsapp, inspectedProduct, breakdown);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        onClick={closeMagnifier}
        className="fixed inset-0 bg-[#040506]/90 backdrop-blur-md transition-opacity"
      />

      {/* Main Split-Screen Modal */}
      <div className="relative bg-[#0D0E11] text-neutral-200 w-full max-w-5xl rounded-3xl border border-[#C5A880]/40 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-auto">
        
        {/* Top Header Strip */}
        <div className="bg-[#08090A] px-6 py-4 flex items-center justify-between border-b border-[#C5A880]/20">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#C5A880]/15 text-[#C5A880]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-cinzel tracking-[0.25em] font-semibold text-[#FFF3B0]">
              Studio Inspection Loupe & Transparency Receipt
            </span>
          </div>

          <button
            onClick={closeMagnifier}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Left Column: Interactive Cursor Zoom Loupe */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col items-center justify-center bg-[#08090A] border-b lg:border-b-0 lg:border-r border-[#C5A880]/20 relative select-none">
            
            {/* Loupe Zoom Container */}
            <div
              ref={imgContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative w-full aspect-square max-w-[420px] rounded-2xl overflow-hidden cursor-crosshair border border-[#C5A880]/30 shadow-2xl bg-[#14171A]"
            >
              <img
                src={inspectedProduct.image}
                alt={inspectedProduct.title}
                className="w-full h-full object-cover transition-transform duration-100 ease-out pointer-events-none"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isHovering ? 'scale(2.3)' : 'scale(1)',
                }}
              />

              {/* Hover to Magnify Overlay Indicator */}
              <div
                className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#08090A]/90 border border-[#C5A880]/40 text-white text-[10px] font-cinzel font-medium backdrop-blur-md pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 shadow-md ${
                  isHovering ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Hover to Magnify Craftsmanship (2.3x Loupe)</span>
              </div>

              {/* Cursor Target Reticle indicator when hovering */}
              {isHovering && (
                <div
                  className="absolute w-12 h-12 rounded-full border border-[#C5A880] pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(197,168,128,0.6)]"
                  style={{
                    left: `${zoomPos.x}%`,
                    top: `${zoomPos.y}%`,
                  }}
                />
              )}

              {/* Corner Watermark */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#6E1024] text-white text-[9px] font-cinzel font-bold tracking-wider uppercase border border-[#C5A880]/40">
                {inspectedProduct.purity} BIS 916
              </div>
            </div>

            {/* Hint & Verification */}
            <div className="flex items-center justify-between w-full max-w-[420px] mt-4 text-[10px] text-neutral-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                HUID: {inspectedProduct.huid || 'AU-916-BIS-GOVT'}
              </span>
              <span>Micro-karigari & hallmark inspectable</span>
            </div>

          </div>

          {/* Right Column: Complete Price Transparency Receipt */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#0D0E11]">
            
            <div className="space-y-5">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span className="font-mono text-neutral-400">SKU: {inspectedProduct.sku}</span>
                  <span className="uppercase font-cinzel tracking-widest text-[#C5A880] font-semibold text-[10px]">
                    {inspectedProduct.category}
                  </span>
                </div>
                
                <h2 className="font-royal text-2xl sm:text-3xl text-white leading-tight font-normal">
                  {inspectedProduct.title}
                </h2>

                <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-sans">
                  {inspectedProduct.description}
                </p>
              </div>

              {/* Metal Specs Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#14171A] border border-[#C5A880]/20 text-center">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase font-cinzel tracking-wider block">Purity</span>
                  <span className="font-cinzel font-bold text-[#FFF3B0] text-sm">{inspectedProduct.purity} Gold</span>
                </div>
                <div className="border-x border-neutral-800">
                  <span className="text-[9px] text-neutral-400 uppercase font-cinzel tracking-wider block">Net Weight</span>
                  <span className="font-mono font-bold text-white text-sm">{inspectedProduct.netWeightGrams.toFixed(2)} g</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase font-cinzel tracking-wider block">Live Rate</span>
                  <span className="font-mono font-bold text-white text-sm">{formatINR(breakdown.rateUsed)}/g</span>
                </div>
              </div>

              {/* Price Transparency Itemized Receipt Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08090A] border border-[#C5A880]/35 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                  <span className="font-cinzel font-bold text-[#FFF3B0] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Price Transparency Receipt</span>
                  </span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded font-mono font-semibold">
                    Live Auto-Priced
                  </span>
                </div>

                {/* Line items */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>
                      Pure Gold Value ({inspectedProduct.netWeightGrams.toFixed(2)}g × {formatINR(breakdown.rateUsed)}):
                    </span>
                    <span className="font-mono font-semibold text-white">
                      {formatINR(breakdown.metalCost)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300">
                    <span>
                      Craftsmanship & Making ({inspectedProduct.makingChargePercent}%):
                    </span>
                    <span className="font-mono font-semibold text-white">
                      {formatINR(breakdown.makingCost)}
                    </span>
                  </div>

                  {inspectedProduct.stoneValue > 0 && (
                    <div className="flex items-center justify-between text-neutral-300">
                      <span>Certified Diamonds / Precious Gems:</span>
                      <span className="font-mono font-semibold text-white">
                        {formatINR(breakdown.stoneValue)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-neutral-400 pt-1 border-t border-dashed border-neutral-800">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold text-neutral-300">
                      {formatINR(breakdown.subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Government GST (3% on Metal & Karigari):</span>
                    <span className="font-mono font-semibold text-white">
                      {formatINR(breakdown.gst)}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-[#C5A880]/30 flex items-baseline justify-between bg-gradient-to-r from-[#14171A] to-[#1F2329] -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 rounded-b-2xl">
                  <div>
                    <span className="text-[9px] uppercase font-cinzel tracking-widest text-[#C5A880] font-bold block">
                      Grand Total Live Showroom Price
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FFF3B0]">
                      {formatINR(breakdown.finalPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">All taxes inclusive</span>
                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              
              {/* WhatsApp Direct Inquiry */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire & Reserve via WhatsApp Concierge</span>
              </button>

              {/* Secondary Row: Wishlist & Booking */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleWishlist(inspectedProduct.id)}
                  className={`py-2.5 px-4 rounded-full border text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                    wishlisted
                      ? 'bg-[#6E1024] text-white border-[#6E1024]'
                      : 'bg-[#14171A] hover:bg-[#1F2329] text-neutral-200 border-white/20'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                  <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    closeMagnifier();
                    if (onBookViewingClick) onBookViewingClick();
                  }}
                  className="py-2.5 px-4 rounded-full bg-[#14171A] hover:bg-[#1F2329] text-[#FFF3B0] border border-[#C5A880]/40 text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Private Salon</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
