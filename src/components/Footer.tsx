import React from 'react';
import { useJewelry } from '../context/JewelryContext';
import {
  Crown,
  ShieldCheck,
  Award,
  Scale,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, setIsAdminOpen } = useJewelry();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] text-neutral-300 border-t border-[#C5A880]/20 pt-16 pb-24 md:pb-16 relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Trust Hallmark Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
            <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">BIS 916 HUID</div>
              <div className="text-[10px] text-neutral-400">100% Govt Laser ID</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
            <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">IGI Diamonds</div>
              <div className="text-[10px] text-neutral-400">VVS-GH Conflict-Free</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
            <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">0% Deduction</div>
              <div className="text-[10px] text-neutral-400">Full Old Gold Credit</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
            <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">Live Bullion Sync</div>
              <div className="text-[10px] text-neutral-400">Transparent Pricing</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#9A7432] to-[#C5A880] text-[#08090A]">
                <Crown className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3B0] via-[#C5A880] to-[#DFBA73]">
                  AURELIA
                </span>
                <span className="text-[8px] tracking-[0.3em] text-[#C5A880] uppercase font-semibold -mt-1">
                  Royal Jewels • Est. 1998
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Curating magnificent Indian bridal trousseaus, heirloom antique polki necklaces, and investment gold coins. Honoring timeless heritage with absolute price transparency and uncompromised Karat purity.
            </p>

            <div className="text-[11px] font-mono text-neutral-500">
              BIS Hallmark Center License: <strong className="text-neutral-300">{settings.huidCenterId}</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#FFF3B0]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Royal Rani Haar & Chokers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Bridal Vault & Trousseau Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Meenakari Heritage Jhumkas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Solitaire Diamond Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  24K MMTC Investment Coins
                </button>
              </li>
            </ul>
          </div>

          {/* Bullion & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#FFF3B0]">
              Maison Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Live Gold Rate Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Old Gold 0% Deduction Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vip-visit')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Book Private VIP Bridal Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vip-visit')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  WhatsApp HD Video Call Shopping
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-[#FFF3B0] text-[#C5A880] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>⚡ Admin Portal (PIN: 1234)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Visit */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#FFF3B0]">
              Flagship Salon
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>{settings.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span className="font-mono">{settings.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const cleanPhone = settings.whatsapp.replace(/\D/g, '');
                  window.open(`https://wa.me/${cleanPhone}`, '_blank');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14171A] hover:bg-[#1F2329] text-[#FFF3B0] text-xs font-cinzel tracking-wider uppercase border border-[#C5A880]/40 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat with Concierge</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip with Scroll-to-Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} {settings.showroomName}. All Rights Reserved. Hallmarked under BIS Act 2016.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-neutral-400 hover:text-white underline text-xs"
            >
              Director Admin Login
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#0D0E11] border border-[#C5A880]/30 text-neutral-300 hover:text-white hover:border-[#C5A880] transition-all"
              aria-label="Scroll to top"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
