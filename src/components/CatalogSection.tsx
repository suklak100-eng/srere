import React, { useMemo } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { calculateProductPrice, formatINR, generateWhatsAppInquiryUrl } from '../utils/pricing';
import {
  Heart,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  MessageCircle,
  Eye,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { JewelryItem } from '../types/jewelry';

export const CatalogSection: React.FC = () => {
  const {
    products,
    rates,
    wishlist,
    toggleWishlist,
    isWishlisted,
    openMagnifier,
    settings,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedPurity,
    setSelectedPurity,
    selectedWeightRange,
    setSelectedWeightRange,
    sortBy,
    setSortBy
  } = useJewelry();

  const categories = [
    'All',
    'Bridal Sets',
    'Necklaces & Haar',
    'Jhumkas & Earrings',
    'Bangles & Chur',
    'Solitaire Rings',
    "Men's Royal Chains",
    'Gold Coins & Bullion'
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // Purity filter
        if (selectedPurity !== 'All' && item.purity !== selectedPurity) {
          return false;
        }
        // Weight filter
        if (selectedWeightRange === 'under-10' && item.netWeightGrams >= 10) return false;
        if (selectedWeightRange === '10-25' && (item.netWeightGrams < 10 || item.netWeightGrams > 25)) return false;
        if (selectedWeightRange === '25-plus' && item.netWeightGrams <= 25) return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchSku = item.sku.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          if (!matchTitle && !matchSku && !matchCat && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = calculateProductPrice(a, rates).finalPrice;
        const priceB = calculateProductPrice(b, rates).finalPrice;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'weight-asc') return a.netWeightGrams - b.netWeightGrams;
        if (sortBy === 'weight-desc') return b.netWeightGrams - a.netWeightGrams;
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        }
        return 0;
      });
  }, [products, rates, selectedCategory, selectedPurity, selectedWeightRange, searchQuery, sortBy]);

  const handleWhatsAppReserve = (item: JewelryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const breakdown = calculateProductPrice(item, rates);
    const url = generateWhatsAppInquiryUrl(settings.whatsapp, item, breakdown);
    window.open(url, '_blank');
  };

  return (
    <section id="catalog" className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D4AF37]/25 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B112C]/10 border border-[#7B112C]/20 text-[#7B112C] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Joaillerie Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-bold text-[#041A15]">
              The Sovereign Showcase
            </h2>
            <p className="text-neutral-600 text-sm mt-1 max-w-xl">
              Showing <strong>{filteredProducts.length}</strong> masterworks with 100% transparent live gold rate auto-pricing.
            </p>
          </div>

          {/* Quick Rate Banner Reminder */}
          <div className="p-3 rounded-xl bg-white border border-[#D4AF37]/35 shadow-sm flex items-center gap-3 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <span className="text-neutral-500 text-[11px] block">Live Pricing Basis:</span>
              <span className="font-mono font-bold text-[#041A15]">
                22K BIS 916: {formatINR(rates.k22)}/g
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/30 shadow-luxury mb-10 space-y-4">
          
          {/* Row 1: Search & Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, SKU, gem..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Purity Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">Purity:</span>
              <select
                value={selectedPurity}
                onChange={(e) => setSelectedPurity(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none font-medium"
              >
                <option value="All">All Purities</option>
                <option value="22K">22K BIS 916 Hallmark</option>
                <option value="18K">18K Rose & Diamond</option>
                <option value="24K">24K 99.9% Pure Bullion</option>
              </select>
            </div>

            {/* Weight Range Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">Weight:</span>
              <select
                value={selectedWeightRange}
                onChange={(e) => setSelectedWeightRange(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none font-medium"
              >
                <option value="All">All Weights</option>
                <option value="under-10">Under 10 grams (Delicate)</option>
                <option value="10-25">10g to 25g (Occasion Wear)</option>
                <option value="25-plus">25g+ (Heavy Bridal Heirlooms)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none font-medium text-neutral-800"
              >
                <option value="featured">Royal Curated (Featured)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight-asc">Weight: Lightest First</option>
                <option value="weight-desc">Weight: Heaviest First</option>
              </select>
            </div>

          </div>

          {/* Row 2: Category Scrollable Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar">
            <span className="text-xs text-neutral-400 font-medium whitespace-nowrap hidden sm:inline mr-1">
              Category:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    active
                      ? 'bg-[#041A15] text-[#FFF3B0] shadow-md border border-[#D4AF37]'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D4AF37]/25 p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37] mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-royal text-2xl font-bold text-[#041A15]">No Masterpieces Found</h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto">
              We couldn't find items matching your search criteria. Try clearing some filters or searching for terms like "Rani Haar", "Polki", or "Solitaire".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPurity('All');
                setSelectedWeightRange('All');
                setSearchQuery('');
              }}
              className="mt-6 px-5 py-2.5 rounded-full bg-[#041A15] text-[#FFF3B0] text-xs font-semibold hover:bg-[#07261F] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((item) => {
              const breakdown = calculateProductPrice(item, rates);
              const wishlisted = isWishlisted(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => openMagnifier(item)}
                  className="jewelry-card flex flex-col justify-between group cursor-pointer"
                >
                  {/* Top Image Wrap with Mandatory Light Glint and Zoom Engine */}
                  <div className="jewelry-card-img-wrap aspect-[4/4.2] bg-neutral-100 w-full relative">
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      className="jewelry-card-img w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    {/* Dark gradient for top badges */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges Row */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10 pointer-events-none">
                      
                      {/* Left: Velvet Ruby Purity Pill */}
                      <div className="flex flex-col gap-1 items-start">
                        <span className="px-2.5 py-1 rounded-md bg-[#7B112C] text-[#FFF3B0] text-[10px] font-bold tracking-wider uppercase border border-[#D4AF37]/50 shadow-md">
                          {item.purity} BIS 916
                        </span>
                        
                        {item.stoneValue > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-[#041A15]/80 text-[#FFF3B0] text-[9px] font-semibold border border-[#D4AF37]/30 backdrop-blur-sm">
                            Diamonds / Gems
                          </span>
                        )}
                      </div>

                      {/* Right: Net Weight Pill & Wishlist Button */}
                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        <span className="px-2 py-1 rounded-md bg-[#041A15]/85 text-white text-[10px] font-mono font-bold border border-white/20 backdrop-blur-sm flex items-center gap-1">
                          <Scale className="w-3 h-3 text-[#D4AF37]" />
                          {item.netWeightGrams.toFixed(2)}g
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(item.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                            wishlisted
                              ? 'bg-[#7B112C] text-white border border-[#D4AF37]'
                              : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-[#7B112C] border border-white/40'
                          }`}
                          aria-label="Save to Wishlist"
                          title="Save to Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                    </div>

                    {/* Sold out overlay if disabled in admin */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-10">
                        <span className="px-4 py-1.5 rounded-full bg-[#7B112C] text-white text-xs font-bold uppercase tracking-widest border border-red-300">
                          Reserved / Sold Out
                        </span>
                      </div>
                    )}

                    {/* Mandatory Slide-up Quick Action Drawer inside Card on Hover */}
                    <div className="card-hover-drawer absolute bottom-0 left-0 right-0 p-3 bg-[#041A15]/95 backdrop-blur-md border-t border-[#D4AF37]/40 z-20 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMagnifier(item);
                        }}
                        className="flex-1 py-2 px-2.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 border border-[#D4AF37]/50 text-[#FFF3B0] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Inspect & Price</span>
                      </button>

                      <button
                        onClick={(e) => handleWhatsAppReserve(item, e)}
                        className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
                        title="WhatsApp Concierge"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reserve</span>
                      </button>
                    </div>

                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* SKU & Category Row */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                        <span className="font-mono font-medium tracking-wide text-neutral-500">{item.sku}</span>
                        <span className="text-[10px] uppercase tracking-wider text-[#9A7432] font-semibold">
                          {item.category}
                        </span>
                      </div>

                      {/* Royal Title */}
                      <h3 className="font-royal font-bold text-lg text-[#041A15] group-hover:text-[#9A7432] transition-colors line-clamp-1 leading-snug">
                        {item.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Breakdown */}
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      
                      {/* Price Header */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium block">
                            Live Showroom Price
                          </span>
                          <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#041A15]">
                            {formatINR(breakdown.finalPrice)}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Live Rate
                          </span>
                        </div>
                      </div>

                      {/* Mini Breakdown Line */}
                      <div className="mt-2 text-[10px] text-neutral-500 flex items-center justify-between font-mono bg-[#FAF6F0] p-1.5 rounded-lg border border-[#D4AF37]/20">
                        <span>Gold: {formatINR(breakdown.metalCost)}</span>
                        <span>•</span>
                        <span>Making: {item.makingChargePercent}%</span>
                        <span>•</span>
                        <span>3% GST</span>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
