import React, { useState, useRef } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { calculateProductPrice, formatINR, generateWhatsAppInquiryUrl } from '../utils/pricing';
import {
  X,
  Search,
  ShieldCheck,
  Scale,
  Sparkles,
  MessageCircle,
  Heart,
  Calendar,
  CheckCircle2,
  Info,
  Maximize2
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
        className="fixed inset-0 bg-[#02100C]/85 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Main Split-Screen Modal */}
      <div className="relative bg-[#FAF6F0] w-full max-w-5xl rounded-3xl border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(4,26,21,0.6)] overflow-hidden z-10 animate-scale my-auto">
        
        {/* Top Header Strip */}
        <div className="bg-[#041A15] px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFF3B0]">
              Haute Joaillerie Inspection & Transparency Receipt
            </span>
          </div>

          <button
            onClick={closeMagnifier}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Left Column: Interactive Cursor Zoom Loupe */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col items-center justify-center bg-white border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20 relative select-none">
            
            {/* Loupe Zoom Container */}
            <div
              ref={imgContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative w-full aspect-square max-w-[420px] rounded-2xl overflow-hidden cursor-crosshair border border-[#D4AF37]/35 shadow-lg bg-neutral-50"
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
                className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[#041A15]/85 border border-[#D4AF37]/50 text-white text-[11px] font-medium backdrop-blur-md pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 shadow-md ${
                  isHovering ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>🔍 Hover to Magnify Craftsmanship (2.3x Loupe)</span>
              </div>

              {/* Cursor Target Reticle indicator when hovering */}
              {isHovering && (
                <div
                  className="absolute w-12 h-12 rounded-full border border-[#D4AF37] pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                  style={{
                    left: `${zoomPos.x}%`,
                    top: `${zoomPos.y}%`,
                  }}
                />
              )}

              {/* Corner Watermark */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#7B112C] text-white text-[10px] font-bold tracking-wider uppercase border border-[#D4AF37]/40">
                {inspectedProduct.purity} BIS 916
              </div>
            </div>

            {/* Hint & Verification */}
            <div className="flex items-center justify-between w-full max-w-[420px] mt-4 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                HUID: {inspectedProduct.huid || 'BIS-916-AU-VERIFIED'}
              </span>
              <span className="text-neutral-400">Micro-faceting & hand engraving inspectable</span>
            </div>

          </div>

          {/* Right Column: Complete Price Transparency Receipt */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF6F0]">
            
            <div className="space-y-5">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span className="font-mono text-neutral-600">SKU: {inspectedProduct.sku}</span>
                  <span className="uppercase tracking-widest text-[#9A7432] font-semibold text-[10px]">
                    {inspectedProduct.category}
                  </span>
                </div>
                
                <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#041A15] leading-tight">
                  {inspectedProduct.title}
                </h2>

                <p className="text-xs text-neutral-600 mt-2 leading-relaxed font-sans">
                  {inspectedProduct.description}
                </p>
              </div>

              {/* Metal Specs Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white border border-[#D4AF37]/25 shadow-sm text-center">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Purity</span>
                  <span className="font-royal font-bold text-[#041A15] text-base">{inspectedProduct.purity} Gold</span>
                </div>
                <div className="border-x border-neutral-100">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Net Weight</span>
                  <span className="font-mono font-bold text-[#041A15] text-base">{inspectedProduct.netWeightGrams.toFixed(2)} g</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Live Bullion Rate</span>
                  <span className="font-mono font-bold text-[#041A15] text-base">{formatINR(breakdown.rateUsed)}/g</span>
                </div>
              </div>

              {/* Price Transparency Itemized Receipt Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4AF37]/40 shadow-luxury space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                  <span className="font-bold text-[#041A15] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Price Transparency Receipt</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold">
                    Live Auto-Priced
                  </span>
                </div>

                {/* Line items */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>
                      Pure Gold Value ({inspectedProduct.netWeightGrams.toFixed(2)}g × {formatINR(breakdown.rateUsed)}):
                    </span>
                    <span className="font-mono font-semibold text-neutral-800">
                      {formatINR(breakdown.metalCost)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-600">
                    <span>
                      Craftsmanship & Making Charges ({inspectedProduct.makingChargePercent}%):
                    </span>
                    <span className="font-mono font-semibold text-neutral-800">
                      {formatINR(breakdown.makingCost)}
                    </span>
                  </div>

                  {inspectedProduct.stoneValue > 0 && (
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Certified Diamonds / Precious Gems:</span>
                      <span className="font-mono font-semibold text-neutral-800">
                        {formatINR(breakdown.stoneValue)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-neutral-500 pt-1 border-t border-dashed border-neutral-200">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold text-neutral-700">
                      {formatINR(breakdown.subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-600">
                    <span>Government GST (3% on Bullion & Making):</span>
                    <span className="font-mono font-semibold text-neutral-800">
                      {formatINR(breakdown.gst)}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t-2 border-[#D4AF37]/30 flex items-baseline justify-between bg-gradient-to-r from-[#FAF6F0] to-[#F3ECE1] -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 rounded-b-2xl">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8A6421] font-bold block">
                      Grand Total Live Showroom Price
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#041A15]">
                      {formatINR(breakdown.finalPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-medium">All taxes inclusive</span>
                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              
              {/* WhatsApp Direct Inquiry */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Inquire & Reserve via WhatsApp Concierge</span>
              </button>

              {/* Secondary Row: Wishlist & Booking */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleWishlist(inspectedProduct.id)}
                  className={`py-2.5 px-4 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    wishlisted
                      ? 'bg-[#7B112C] text-white border-[#7B112C]'
                      : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    closeMagnifier();
                    if (onBookViewingClick) onBookViewingClick();
                  }}
                  className="py-2.5 px-4 rounded-full bg-[#041A15] hover:bg-[#07261F] text-[#FFF3B0] border border-[#D4AF37]/50 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Private Lounge</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
