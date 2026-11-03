export type GoldPurity = '24K' | '22K' | '18K';

export interface GoldRates {
  k24: number; // 24K (99.9%) per gram in INR
  k22: number; // 22K BIS 916 per gram in INR
  k18: number; // 18K per gram in INR
  silver: number; // Fine Silver per gram in INR
  lastUpdated: string;
}

export interface JewelryItem {
  id: string;
  sku: string;
  title: string;
  category: 'Bridal Sets' | 'Necklaces & Haar' | 'Jhumkas & Earrings' | 'Bangles & Chur' | 'Solitaire Rings' | "Men's Royal Chains" | 'Gold Coins & Bullion';
  purity: GoldPurity;
  netWeightGrams: number;
  makingChargePercent: number;
  stoneValue: number;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
  huid?: string;
}

export interface PriceBreakdown {
  metalCost: number;
  makingCost: number;
  stoneValue: number;
  subtotal: number;
  gst: number;
  finalPrice: number;
  rateUsed: number;
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  experienceType: 'Bridal Vault VIP Lounge' | 'WhatsApp Live Video Shopping' | 'Old Gold Exchange Valuation' | 'Bespoke Custom Joaillerie';
  notes?: string;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
}

export interface ShowroomSettings {
  showroomName: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  huidCenterId: string;
  adminPin: string;
}
