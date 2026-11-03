import React, { useState } from 'react';
import { useJewelry } from '../context/JewelryContext';
import {
  Crown,
  Search,
  Heart,
  KeyRound,
  MessageCircle,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const {
    wishlist,
    setIsWishlistOpen,
    setIsAdminOpen,
    settings,
    searchQuery,
    setSearchQuery
  } = useJewelry();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hello Concierge at ${settings.showroomName}, I would like to book an appointment and view your signature bridal collection.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#041A15]/92 backdrop-blur-xl border-b border-[#D4AF37]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Royal Insignia */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#9A7432] via-[#D4AF37] to-[#8A6421] shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-6 h-6 text-[#041A15] stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#041A15] animate-ping" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-royal text-2xl sm:text-3xl font-bold tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5B7] via-[#D4AF37] to-[#AA771C] group-hover:opacity-95 transition-opacity">
                AURELIA
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  Royal Jewels
                </span>
                <span className="text-[#D4AF37]/50 text-[9px]">•</span>
                <span className="text-[9px] tracking-wider text-neutral-400 uppercase hidden sm:inline">
                  Est. 1998 • BIS 916
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Collection
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Bridal Vault
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Gold Calculator
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Exchange Old Gold
            </button>
            <button
              onClick={() => handleNavClick('vip-visit')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#FFF3B0] hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF3B0] hover:after:w-full after:transition-all"
            >
              Book VIP Visit
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input / Expandable */}
            <div className="relative">
              {isSearchExpanded ? (
                <div className="flex items-center bg-[#07261F] border border-[#D4AF37]/40 rounded-full px-3 py-1.5 shadow-inner">
                  <Search className="w-4 h-4 text-[#D4AF37] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Rani Haar, Solitaire..."
                    className="bg-transparent text-xs text-white placeholder-neutral-400 focus:outline-none w-36 sm:w-48 font-sans"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="text-neutral-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2.5 rounded-full text-neutral-300 hover:text-[#D4AF37] hover:bg-[#07261F]/60 transition-colors border border-transparent hover:border-[#D4AF37]/30"
                  aria-label="Search catalog"
                  title="Search jewelry"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wishlist Button with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-neutral-300 hover:text-[#D4AF37] hover:bg-[#07261F]/60 transition-colors border border-transparent hover:border-[#D4AF37]/30"
              aria-label="Open Wishlist"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7B112C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#D4AF37]/50 shadow-sm animate-scale">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07261F]/80 hover:bg-[#0B362C] border border-[#D4AF37]/30 text-neutral-300 hover:text-[#FFF3B0] text-xs font-medium transition-all"
              title="Admin Portal (Default PIN: 1234)"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-neutral-400 font-mono">1234</span>
            </button>

            {/* WhatsApp Showroom CTA */}
            <button
              onClick={openWhatsApp}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold tracking-wide shadow-[0_4px_15px_rgba(5,150,105,0.3)] transition-all hover:scale-105 active:scale-95 border border-emerald-400/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200 fill-emerald-200/20" />
              <span>WhatsApp Showroom</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#D4AF37]/20 bg-[#041A15]/98 px-2 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#D4AF37]/20">
              <button
                onClick={() => handleNavClick('catalog')}
                className="text-left px-3 py-2 text-sm text-neutral-200 hover:text-[#D4AF37] rounded-lg hover:bg-[#07261F]"
              >
                Collection
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className="text-left px-3 py-2 text-sm text-neutral-200 hover:text-[#D4AF37] rounded-lg hover:bg-[#07261F]"
              >
                Bridal Vault
              </button>
              <button
                onClick={() => handleNavClick('calculator')}
                className="text-left px-3 py-2 text-sm text-neutral-200 hover:text-[#D4AF37] rounded-lg hover:bg-[#07261F]"
              >
                Live Gold Calculator
              </button>
              <button
                onClick={() => handleNavClick('vip-visit')}
                className="text-left px-3 py-2 text-sm text-[#FFF3B0] font-semibold rounded-lg hover:bg-[#07261F]"
              >
                Book VIP Visit
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#07261F] border border-[#D4AF37]/30 text-neutral-200 text-xs font-medium"
              >
                <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                Admin Portal (PIN: 1234)
              </button>
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Showroom Concierge
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
