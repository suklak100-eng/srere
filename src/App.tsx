import React from 'react';
import { JewelryProvider, useJewelry } from './context/JewelryContext';
import { TopTicker } from './components/TopTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { KarigariStudio } from './components/KarigariStudio';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CatalogSection } from './components/CatalogSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { BullionCalculatorSection } from './components/BullionCalculatorSection';
import { VIPAppointmentSection } from './components/VIPAppointmentSection';
import { Footer } from './components/Footer';
import { MagnifierModal } from './components/MagnifierModal';
import { AdminModal } from './components/AdminModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ToastNotification } from './components/ToastNotification';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainContent: React.FC = () => {
  const { setSelectedCategory, products, openMagnifier } = useJewelry();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleNavigate('catalog');
  };

  const handleInspectSku = (sku: string) => {
    const item = products.find((p) => p.sku === sku);
    if (item) openMagnifier(item);
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#E8E6E3] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#08090A] relative">
      
      {/* 1. Top Infinite Live Bullion Ticker */}
      <TopTicker />

      {/* 2. Sticky Glassmorphic Haute Joaillerie Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* 3. Showstopper 3D Flagship Hero Showcase */}
      <div id="hero">
        <HeroSection
          onExploreClick={() => handleNavigate('catalog')}
          onCalculatorClick={() => handleNavigate('calculator')}
          onInspectItem={handleInspectSku}
        />
      </div>

      {/* 4. Brand-New Interactive Karigari Studio & Hallmark Inspector */}
      <KarigariStudio onInspectOpen={() => handleInspectSku('ARJ-101')} />

      {/* 5. The High Jewelry Universes (Categories) */}
      <CategoryShowcase onCategorySelect={handleCategorySelect} />

      {/* 6. Smart Filterable Museum Showcase (12 Creations) */}
      <CatalogSection />

      {/* 7. Master Karigari & Craftsmanship Atelier */}
      <CraftsmanshipSection onExploreClick={() => handleNavigate('catalog')} />

      {/* 8. Swiss-Standard Bullion Calculator & 0% Trade-In Vault */}
      <BullionCalculatorSection />

      {/* 9. White-Glove VIP Bridal Salon & Video Shopping Concierge */}
      <VIPAppointmentSection />

      {/* 10. Royal Imperial Maison Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileBottomNav onNavigate={handleNavigate} />

      {/* Overlays & Modals */}
      <MagnifierModal onBookViewingClick={() => handleNavigate('vip-visit')} />
      <AdminModal />
      <WishlistDrawer />
      <ToastNotification />

    </div>
  );
};

export function App() {
  return (
    <JewelryProvider>
      <MainContent />
    </JewelryProvider>
  );
}

export default App;
