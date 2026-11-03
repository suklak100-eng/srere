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
      subtitle: 'Imperial Trousseau & Sitahar',
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
      subtitle: 'Meenakari, Chandbalis & Drops',
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
    <section id="categories" className="py-24 bg-[#0B0C0E] relative overflow-hidden border-t border-b border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-cinzel font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Curated Universes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-light text-white tracking-tight">
            The Haute Joaillerie Universes
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto my-3" />
          <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-md mx-auto leading-relaxed">
            Conceived as legendary artistic movements. Select a universe to filter our live showroom inventory.
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
                  className={`relative w-full aspect-[3/4.2] rounded-[100px_100px_14px_14px] p-1.5 transition-all duration-500 overflow-hidden shadow-lg ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#C5A880] via-[#FFF3B0] to-[#8A6421] shadow-[0_15px_30px_rgba(197,168,128,0.35)]'
                      : 'bg-[#14171A] border border-[#C5A880]/25 hover:border-[#C5A880] hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  <div className="w-full h-full rounded-[96px_96px_10px_10px] overflow-hidden bg-neutral-900 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090A]/95 via-black/20 to-transparent" />

                    {/* Top Purity Pill */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[8px] font-cinzel font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 text-[#FFF3B0] border border-[#C5A880]/40 backdrop-blur-sm">
                        {cat.purity}
                      </span>
                    </div>

                    {/* Bottom Action Icon */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#C5A880] text-[#08090A] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    {/* Item count tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] text-neutral-300 font-medium font-cinzel">
                        {count > 0 ? `${count} Pieces` : 'View All'}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Category Title & Subtext */}
                <div className="text-center mt-3.5 w-full">
                  <h3
                    className={`font-royal font-medium text-base sm:text-lg transition-colors leading-tight ${
                      isSelected ? 'text-[#C5A880] font-bold' : 'text-neutral-200 group-hover:text-[#FFF3B0]'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1 font-sans hidden sm:block">
                    {cat.subtitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Reset Filter Pill */}
        {selectedCategory !== 'All' && (
          <div className="text-center mt-10">
            <button
              onClick={() => onCategorySelect('All')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#14171A] border border-[#C5A880] text-[#FFF3B0] text-xs font-cinzel tracking-wider uppercase hover:bg-[#C5A880] hover:text-[#08090A] transition-all shadow-md"
            >
              <span>Showing: {selectedCategory} — View All Creations</span>
              <span className="text-sm font-bold">✕</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
