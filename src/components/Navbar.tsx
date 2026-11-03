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
  Sparkles
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
      `Bonjour Aurelia Concierge, I would like to arrange a private high-jewelry viewing or bridal consultation.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#08090A]/90 backdrop-blur-xl border-b border-[#C5A880]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Imperial Emblem */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2 rounded-lg bg-gradient-to-br from-[#9A7432] via-[#C5A880] to-[#8A6421] shadow-[0_0_15px_rgba(197,168,128,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-5 h-5 text-[#08090A] stroke-[2.2]" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3B0] via-[#C5A880] to-[#DFBA73] group-hover:opacity-95 transition-opacity">
                AURELIA
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[9px] tracking-[0.3em] text-[#C5A880] uppercase font-semibold">
                  Royal Jewels
                </span>
                <span className="text-[#C5A880]/40 text-[8px]">•</span>
                <span className="text-[8px] tracking-wider text-neutral-400 uppercase hidden sm:inline">
                  BIS 916 Hallmark
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Haute Joaillerie Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-300 hover:text-[#C5A880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all"
            >
              High Jewelry
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-300 hover:text-[#C5A880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all"
            >
              Bridal Universes
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-300 hover:text-[#C5A880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Bullion Calculator
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-300 hover:text-[#C5A880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all"
            >
              0% Old Gold Exchange
            </button>
            <button
              onClick={() => handleNavClick('vip-visit')}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#FFF3B0] hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF3B0] hover:after:w-full after:transition-all"
            >
              Private Salon
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input */}
            <div className="relative">
              {isSearchExpanded ? (
                <div className="flex items-center bg-[#14171A] border border-[#C5A880]/40 rounded-full px-3 py-1.5 shadow-inner">
                  <Search className="w-3.5 h-3.5 text-[#C5A880] mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Rani Haar, Solitaire..."
                    className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-36 sm:w-44 font-sans"
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
                  className="p-2.5 rounded-full text-neutral-300 hover:text-[#C5A880] hover:bg-[#14171A] transition-colors border border-transparent hover:border-[#C5A880]/30"
                  aria-label="Search"
                  title="Search creations"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Wishlist Button with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-neutral-300 hover:text-[#C5A880] hover:bg-[#14171A] transition-colors border border-transparent hover:border-[#C5A880]/30"
              aria-label="Saved creations"
              title="Saved creations"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6E1024] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#C5A880]/40 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14171A] hover:bg-[#1F2329] border border-[#C5A880]/30 text-neutral-300 hover:text-[#FFF3B0] text-xs transition-all"
              title="Admin Portal (PIN: 1234)"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] font-medium tracking-wide">Admin</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-black/50 text-neutral-400 font-mono">1234</span>
            </button>

            {/* WhatsApp Concierge CTA */}
            <button
              onClick={openWhatsApp}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#14171A] hover:bg-[#1F2329] text-[#FFF3B0] hover:text-white text-xs font-semibold tracking-wider uppercase border border-[#C5A880]/50 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Concierge</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-[#C5A880] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#C5A880]/20 bg-[#08090A]/98 px-2 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#C5A880]/20">
              <button
                onClick={() => handleNavClick('catalog')}
                className="text-left px-3 py-2 text-xs uppercase tracking-wider text-neutral-200 hover:text-[#C5A880] rounded-lg hover:bg-[#14171A]"
              >
                High Jewelry
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className="text-left px-3 py-2 text-xs uppercase tracking-wider text-neutral-200 hover:text-[#C5A880] rounded-lg hover:bg-[#14171A]"
              >
                Bridal Universes
              </button>
              <button
                onClick={() => handleNavClick('calculator')}
                className="text-left px-3 py-2 text-xs uppercase tracking-wider text-neutral-200 hover:text-[#C5A880] rounded-lg hover:bg-[#14171A]"
              >
                Bullion Calculator
              </button>
              <button
                onClick={() => handleNavClick('vip-visit')}
                className="text-left px-3 py-2 text-xs uppercase tracking-wider text-[#FFF3B0] font-semibold rounded-lg hover:bg-[#14171A]"
              >
                Private Salon
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/30 text-neutral-200 text-xs font-medium"
              >
                <KeyRound className="w-4 h-4 text-[#C5A880]" />
                Showroom Director (PIN: 1234)
              </button>
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold"
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
