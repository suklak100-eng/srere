import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { calculateProductPrice, formatINR } from '../utils/pricing';
import {
  X,
  Heart,
  Trash2,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    rates,
    settings,
    openMagnifier
  } = useJewelry();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const totalEstimate = savedProducts.reduce((sum, item) => {
    return sum + calculateProductPrice(item, rates).finalPrice;
  }, 0);

  const handleShareAllWhatsApp = () => {
    if (savedProducts.length === 0) return;
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    
    let msg = `*👑 ROYAL WISHLIST INQUIRY - AURELIA ROYAL JEWELS*\n\n`;
    msg += `_Hello Concierge, I have curated the following items for my upcoming showroom visit:_\n\n`;

    savedProducts.forEach((item, index) => {
      const b = calculateProductPrice(item, rates);
      msg += `*${index + 1}. ${item.title}*\n`;
      msg += `   • SKU: ${item.sku} | ${item.purity} Gold\n`;
      msg += `   • Net Weight: ${item.netWeightGrams.toFixed(2)}g\n`;
      msg += `   • Live Price: ${formatINR(b.finalPrice)}\n\n`;
    });

    msg += `*Estimated Trousseau Total:* ${formatINR(totalEstimate)}\n`;
    msg += `_Please arrange a private bridal viewing suite for these designs._`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[105] flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-[#040506]/85 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#08090A] border-l border-[#C5A880]/30 shadow-2xl z-10 flex flex-col h-full text-neutral-100">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#C5A880]/20 flex items-center justify-between bg-[#050608]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#6E1024] text-[#FFF3B0] border border-[#C5A880]/40">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                Your Royal Trousseau
              </h3>
              <p className="text-[11px] text-neutral-400">
                {savedProducts.length} Heirloom {savedProducts.length === 1 ? 'Design' : 'Designs'} Selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {savedProducts.length === 0 ? (
            <div className="text-center py-20 px-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0D0E11] border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-lg font-bold text-white">Your Selection is Empty</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Click the heart icon on any royal creation in our showcase to curate your private selection.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-2 px-5 py-2 rounded-full bg-[#C5A880] text-[#08090A] text-xs font-cinzel font-bold tracking-wider uppercase hover:bg-[#FFF3B0]"
              >
                Explore Gallery
              </button>
            </div>
          ) : (
            savedProducts.map((item) => {
              const breakdown = calculateProductPrice(item, rates);

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20 flex items-center gap-3.5 hover:border-[#C5A880] transition-all group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-[#C5A880]/30 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openMagnifier(item);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="font-mono text-[#C5A880]">{item.sku}</span>
                      <span>{item.netWeightGrams.toFixed(2)}g ({item.purity})</span>
                    </div>

                    <h5
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openMagnifier(item);
                      }}
                      className="font-royal font-medium text-sm text-white line-clamp-1 cursor-pointer group-hover:text-[#FFF3B0] transition-colors"
                    >
                      {item.title}
                    </h5>

                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-mono font-extrabold text-[#FFF3B0] text-sm">
                        {formatINR(breakdown.finalPrice)}
                      </span>

                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        title="Remove from selection"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Total & WhatsApp Inquiry */}
        {savedProducts.length > 0 && (
          <div className="p-5 border-t border-[#C5A880]/20 bg-[#050608] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400 block">
                  Curated Trousseau Total
                </span>
                <span className="font-mono text-2xl font-extrabold text-[#FFF3B0]">
                  {formatINR(totalEstimate)}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> 3% GST Inc.
              </span>
            </div>

            <button
              onClick={handleShareAllWhatsApp}
              className="w-full py-3.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Selected Items via WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
