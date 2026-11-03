import React, { useRef } from 'react';
import { JewelryProvider, useJewelry } from './context/JewelryContext';
import { TopTicker } from './components/TopTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
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
  const { setSelectedCategory } = useJewelry();

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

  return (
    <div className="min-h-screen bg-[#08090A] text-[#E8E6E3] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#08090A] relative">
      
      {/* 1. Top Infinite Live Bullion Ticker */}
      <TopTicker />

      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* 3. Showstopper 3D Layered Hero Section */}
      <div id="hero">
        <HeroSection
          onExploreClick={() => handleNavigate('catalog')}
          onCalculatorClick={() => handleNavigate('calculator')}
        />
      </div>

      {/* 4. Interactive Arch "Shop By Category" Showcase */}
      <CategoryShowcase onCategorySelect={handleCategorySelect} />

      {/* 5. Smart Filterable Catalog with 12 Pre-Loaded Authentic Jewelry Items */}
      <CatalogSection />

      {/* 6. Master Karigari & Craftsmanship Section */}
      <CraftsmanshipSection onExploreClick={() => handleNavigate('catalog')} />

      {/* 7. Interactive Live Jewelry Cost & Old Gold Exchange Calculator */}
      <BullionCalculatorSection />

      {/* 8. VIP Showroom Appointment & Live Video Shopping Section */}
      <VIPAppointmentSection />

      {/* 9. Royal Imperial Footer */}
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

