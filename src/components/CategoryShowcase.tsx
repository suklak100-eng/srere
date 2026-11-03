import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onCategorySelect: (category: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onCategorySelect }) => {
  const { products, selectedCategory } = useJewelry();

  const categories = [
    {
      name: 'Bridal Sets',
      subtitle: 'Auspicious Trousseau & Rani Haar',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80',
      purity: '22K BIS 916'
    },
    {
      name: 'Necklaces & Haar',
      subtitle: 'Polki, Temple & Filigree Chokers',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
      purity: '22K Gold'
    },
    {
      name: 'Jhumkas & Earrings',
      subtitle: 'Meenakari, Chandbalis & Studs',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      purity: '22K Gold'
    },
    {
      name: 'Bangles & Chur',
      subtitle: 'Kadas, Nakshi Bala & Bracelets',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80',
      purity: '18K & 22K'
    },
    {
      name: 'Solitaire Rings',
      subtitle: 'IGI Diamonds & Royal Cocktail Bands',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      purity: '18K Diamond'
    },
    {
      name: "Men's Royal Chains",
      subtitle: 'Cuban Links & Solid Sovereign Malas',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
      purity: '22K Solid'
    }
  ];

  const getCount = (catName: string) => {
    return products.filter((p) => p.category === catName).length;
  };

  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-[#FAF6F0] via-[#F3ECE1] to-[#FAF6F0] relative overflow-hidden">
      
      {/* Decorative Golden Arch Silhouette in background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#8A6421] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Imperial Collections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-bold text-[#041A15] tracking-tight">
            Curated Categories of Elegance
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="text-neutral-600 text-sm sm:text-base font-normal">
            Explore handcrafted heirlooms classified by ceremonial significance. Click any category to filter our live showroom inventory.
          </p>
        </div>

        {/* 6 Arch-Themed Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const count = getCount(cat.name);
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={idx}
                onClick={() => onCategorySelect(cat.name)}
                className={`group cursor-pointer flex flex-col items-center transition-all duration-500 ${
                  isSelected ? 'scale-105' : 'hover:-translate-y-2'
                }`}
              >
                {/* Arch Container with Golden Border Ring */}
                <div
                  className={`relative w-full aspect-[3/4] rounded-[100px_100px_16px_16px] p-1.5 transition-all duration-500 overflow-hidden shadow-lg ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#D4AF37] via-[#FFF3B0] to-[#8A6421] shadow-[0_15px_30px_rgba(212,175,55,0.4)]'
                      : 'bg-[#FFFFFF] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-[0_15px_30px_rgba(180,135,40,0.25)]'
                  }`}
                >
                  <div className="w-full h-full rounded-[96px_96px_12px_12px] overflow-hidden bg-neutral-900 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041A15]/85 via-black/20 to-transparent" />

                    {/* Top Purity Pill */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#FFF3B0] border border-[#D4AF37]/40 backdrop-blur-sm">
                        {cat.purity}
                      </span>
                    </div>

                    {/* Bottom Action Icon */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#D4AF37] text-[#041A15] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    {/* Item count tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] text-neutral-300 font-medium">
                        {count > 0 ? `${count} Designs` : 'View All'}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Category Title & Subtext */}
                <div className="text-center mt-3 w-full">
                  <h3
                    className={`font-royal font-bold text-base sm:text-lg transition-colors leading-tight ${
                      isSelected ? 'text-[#D4AF37] font-extrabold' : 'text-[#041A15] group-hover:text-[#9A7432]'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1 font-sans hidden sm:block">
                    {cat.subtitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick View All Pill */}
        {selectedCategory !== 'All' && (
          <div className="text-center mt-8">
            <button
              onClick={() => onCategorySelect('All')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#D4AF37] text-[#041A15] text-xs font-semibold hover:bg-[#041A15] hover:text-[#FFF3B0] transition-all shadow-sm"
            >
              <span>Showing "{selectedCategory}" — Click to Show All Collections</span>
              <span className="text-sm font-bold">✕</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
