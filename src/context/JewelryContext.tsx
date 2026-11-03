import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoldRates, JewelryItem, Appointment, ShowroomSettings } from '../types/jewelry';
import { DEFAULT_GOLD_RATES, DEFAULT_PRODUCTS, DEFAULT_SHOWROOM_SETTINGS } from '../data/defaultProducts';

interface ToastData {
  id: string;
  type: 'success' | 'gold' | 'info';
  title: string;
  message: string;
}

interface JewelryContextType {
  // Rates
  rates: GoldRates;
  updateRates: (newRates: Partial<GoldRates>) => void;
  
  // Products
  products: JewelryItem[];
  addProduct: (product: Omit<JewelryItem, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<JewelryItem>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  resetToDefaults: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  // Magnifier Modal
  inspectedProduct: JewelryItem | null;
  openMagnifier: (product: JewelryItem) => void;
  closeMagnifier: () => void;
  
  // Admin Portal
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  
  // Showroom Settings
  settings: ShowroomSettings;
  updateSettings: (newSettings: Partial<ShowroomSettings>) => void;
  
  // Appointments
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: 'Confirmed' | 'Completed' | 'Pending') => void;
  
  // Filter state for cross-component coordination
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPurity: string;
  setSelectedPurity: (p: string) => void;
  selectedWeightRange: string;
  setSelectedWeightRange: (w: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  
  // Toast notifications
  toasts: ToastData[];
  showToast: (title: string, message: string, type?: 'success' | 'gold' | 'info') => void;
  removeToast: (id: string) => void;
}

const JewelryContext = createContext<JewelryContextType | undefined>(undefined);

const RATES_STORAGE_KEY = 'aurelia_gold_rates_v1';
const PRODUCTS_STORAGE_KEY = 'aurelia_products_v1';
const WISHLIST_STORAGE_KEY = 'aurelia_wishlist_v1';
const APPOINTMENTS_STORAGE_KEY = 'aurelia_appointments_v1';
const SETTINGS_STORAGE_KEY = 'aurelia_settings_v1';

export const JewelryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Live Bullion Rates
  const [rates, setRates] = useState<GoldRates>(() => {
    try {
      const saved = localStorage.getItem(RATES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_GOLD_RATES;
    } catch {
      return DEFAULT_GOLD_RATES;
    }
  });

  // Products
  const [products, setProducts] = useState<JewelryItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Showroom Settings
  const [settings, setSettings] = useState<ShowroomSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SHOWROOM_SETTINGS;
    } catch {
      return DEFAULT_SHOWROOM_SETTINGS;
    }
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'apt-demo-1',
          customerName: 'Ananya Singhania',
          phone: '+91 98200 11223',
          email: 'ananya@singhania.co',
          date: '2026-11-10',
          timeSlot: '4:00 PM - 5:30 PM',
          experienceType: 'Bridal Vault VIP Lounge',
          notes: 'Interested in Rani Haar and matching Satlada for December wedding.',
          createdAt: new Date().toISOString(),
          status: 'Confirmed'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modal states
  const [inspectedProduct, setInspectedProduct] = useState<JewelryItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Catalog Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPurity, setSelectedPurity] = useState<string>('All');
  const [selectedWeightRange, setSelectedWeightRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Toasts
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const showToast = (title: string, message: string, type: 'success' | 'gold' | 'info' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateRates = (newRates: Partial<GoldRates>) => {
    const updated: GoldRates = {
      ...rates,
      ...newRates,
      lastUpdated: `Live Showroom Rate • Updated at ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`
    };
    setRates(updated);
    showToast(
      'Live Bullion Rates Broadcasted!',
      'All product prices and calculator values across Aurelia Royal Jewels have recalculated in real-time.',
      'gold'
    );
  };

  const addProduct = (product: Omit<JewelryItem, 'id'>) => {
    const newProduct: JewelryItem = {
      ...product,
      id: 'prod-' + Date.now()
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Jewelry Added to Vault', `${product.title} is now live in showroom catalog.`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<JewelryItem>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Catalog Updated', 'Product details saved successfully.', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Item Archived', 'Product has been removed from active catalog.', 'info');
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = !item.inStock;
          showToast(
            'Inventory Status Changed',
            `${item.title} is now ${newStatus ? 'In Stock (Available)' : 'Marked as Sold Out'}.`,
            'info'
          );
          return { ...item, inStock: newStatus };
        }
        return item;
      })
    );
  };

  const resetToDefaults = () => {
    setRates(DEFAULT_GOLD_RATES);
    setProducts(DEFAULT_PRODUCTS);
    setSettings(DEFAULT_SHOWROOM_SETTINGS);
    setWishlist([]);
    showToast('Demo Reset Completed', 'Restored 12 authentic royal jewelry pieces and default live rates.', 'gold');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const targetItem = products.find((p) => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', `${targetItem?.title || 'Item'} removed from your royal selection.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Royal Wishlist', `${targetItem?.title || 'Item'} saved for your showroom visit.`, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openMagnifier = (product: JewelryItem) => {
    setInspectedProduct(product);
  };

  const closeMagnifier = () => {
    setInspectedProduct(null);
  };

  const loginAdmin = (pin: string) => {
    if (pin.trim() === settings.adminPin || pin.trim() === '1234') {
      setIsAdminAuthenticated(true);
      showToast('Admin Vault Unlocked', 'Welcome Showroom Director. Live bullion and catalog management enabled.', 'success');
      return true;
    }
    showToast('Authentication Failed', 'Invalid Security PIN. Default PIN is 1234.', 'info');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Admin Session Closed', 'You have securely logged out of the vault portal.', 'info');
  };

  const updateSettings = (newSettings: Partial<ShowroomSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Showroom Details Updated', 'Contact and address settings saved.', 'success');
  };

  const bookAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newApt: Appointment = {
      ...apt,
      id: 'apt-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setAppointments((prev) => [newApt, ...prev]);
    showToast(
      'VIP Experience Reserved!',
      `Dear ${apt.customerName}, your appointment for ${apt.date} has been confirmed. A VIP concierge will contact you on WhatsApp.`,
      'gold'
    );
  };

  const updateAppointmentStatus = (id: string, status: 'Confirmed' | 'Completed' | 'Pending') => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <JewelryContext.Provider
      value={{
        rates,
        updateRates,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaults,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        inspectedProduct,
        openMagnifier,
        closeMagnifier,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        settings,
        updateSettings,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedPurity,
        setSelectedPurity,
        selectedWeightRange,
        setSelectedWeightRange,
        sortBy,
        setSortBy,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </JewelryContext.Provider>
  );
};

export const useJewelry = () => {
  const context = useContext(JewelryContext);
  if (!context) {
    throw new Error('useJewelry must be used within a JewelryProvider');
  }
  return context;
};
