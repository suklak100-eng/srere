import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import {
  Grid,
  TrendingUp,
  Calculator,
  MessageCircle
} from 'lucide-react';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate }) => {
  const { settings, setIsAdminOpen } = useJewelry();

  const handleWhatsApp = () => {
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hello Concierge at ${settings.showroomName}, I am viewing your royal jewelry website and have an inquiry.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08090A]/95 backdrop-blur-xl border-t border-[#C5A880]/25 px-3 py-2 shadow-[0_-10px_25px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-4 gap-1 items-center text-center">
        
        {/* Tab 1: Catalog */}
        <button
          onClick={() => onNavigate('catalog')}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-[#C5A880] active:scale-95 transition-all"
        >
          <Grid className="w-4 h-4 text-[#C5A880]" />
          <span className="text-[9px] font-cinzel font-medium tracking-wider uppercase mt-1">Catalog</span>
        </button>

        {/* Tab 2: Gold Rate */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-[#C5A880] active:scale-95 transition-all"
        >
          <TrendingUp className="w-4 h-4 text-[#FFF3B0]" />
          <span className="text-[9px] font-cinzel font-medium tracking-wider uppercase mt-1">Rate</span>
        </button>

        {/* Tab 3: Calculator */}
        <button
          onClick={() => onNavigate('calculator')}
          className="flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-[#C5A880] active:scale-95 transition-all"
        >
          <Calculator className="w-4 h-4 text-[#C5A880]" />
          <span className="text-[9px] font-cinzel font-medium tracking-wider uppercase mt-1">Calculator</span>
        </button>

        {/* Tab 4: WhatsApp Us */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 text-emerald-400 hover:text-emerald-300 active:scale-95 transition-all"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[9px] font-semibold tracking-wider uppercase mt-1">WhatsApp</span>
        </button>

      </div>
    </div>
  );
};
