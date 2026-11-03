import React, { useState } from 'react';
import { useJewelry } from '../context/JewelryContext';
import { calculateProductPrice, formatINR } from '../utils/pricing';
import { GoldPurity, JewelryItem } from '../types/jewelry';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  TrendingUp,
  PlusCircle,
  Package,
  CalendarCheck,
  Settings,
  RotateCcw,
  Sparkles,
  Check,
  Trash2,
  ToggleLeft,
  ToggleRight,
  MessageCircle,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    rates,
    updateRates,
    products,
    addProduct,
    deleteProduct,
    toggleStock,
    resetToDefaults,
    appointments,
    updateAppointmentStatus,
    settings,
    updateSettings,
    showToast
  } = useJewelry();

  const [enteredPin, setEnteredPin] = useState('');
  const [activeTab, setActiveTab] = useState<'rates' | 'add' | 'inventory' | 'appointments' | 'settings'>('rates');

  // Live Rate form state
  const [k24Rate, setK24Rate] = useState<number>(rates.k24);
  const [k22Rate, setK22Rate] = useState<number>(rates.k22);
  const [k18Rate, setK18Rate] = useState<number>(rates.k18);
  const [silverRate, setSilverRate] = useState<number>(rates.silver);

  // New Product form state
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('ARJ-' + Math.floor(100 + Math.random() * 900));
  const [category, setCategory] = useState<JewelryItem['category']>('Bridal Sets');
  const [purity, setPurity] = useState<GoldPurity>('22K');
  const [netWeight, setNetWeight] = useState<number>(22.5);
  const [makingCharge, setMakingCharge] = useState<number>(12);
  const [stoneValue, setStoneValue] = useState<number>(0);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85');
  const [description, setDescription] = useState('');

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(enteredPin);
    setEnteredPin('');
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateRates({
      k24: Number(k24Rate),
      k22: Number(k22Rate),
      k18: Number(k18Rate),
      silver: Number(silverRate)
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addProduct({
      sku: sku || 'ARJ-' + Math.floor(100 + Math.random() * 900),
      title,
      category,
      purity,
      netWeightGrams: Number(netWeight),
      makingChargePercent: Number(makingCharge),
      stoneValue: Number(stoneValue),
      image: image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      description: description || 'Exquisite royal creation handcrafted in pure hallmarked gold.',
      inStock: true,
      huid: `AU-${purity === '24K' ? '999' : purity === '22K' ? '916' : '750'}-${Math.floor(10000 + Math.random() * 90000)}-IN`
    });

    // Reset fields
    setTitle('');
    setDescription('');
    setSku('ARJ-' + Math.floor(100 + Math.random() * 900));
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsAdminOpen(false)}
        className="fixed inset-0 bg-[#02100C]/90 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#041A15] text-neutral-100 w-full max-w-5xl rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-[#02100C] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Aurelia Showroom Portal
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B112C] text-[#FFF3B0] font-mono font-bold">
                  PIN: 1234
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Live Gold Rate Broadcast Engine & Inventory Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1 rounded-lg bg-black/40 border border-white/10"
              >
                Log Out
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier or Portal Workspace */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-royal text-2xl font-bold text-white">Showroom Vault Authentication</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Enter your 4-digit Director PIN to access live bullion pricing, inventory edits, and VIP appointments.
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-md bg-[#07261F] border border-[#D4AF37]/30 text-[#FFF3B0] text-xs font-mono">
                Hint: Default Demo PIN is <strong>1234</strong>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN (1234)"
                className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 rounded-2xl bg-black/50 border border-[#D4AF37]/40 text-[#FFF3B0] focus:border-[#D4AF37] focus:outline-none"
                autoFocus
              />

              <button
                type="submit"
                className="btn-luxury-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-[#041A15]" />
                <span>Unlock Showroom Vault</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-[#D4AF37]/20 bg-[#07261F]/60 overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setActiveTab('rates')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === 'rates'
                    ? 'bg-[#D4AF37] text-[#041A15] shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-black/20'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>1-Click Live Gold Rates</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === 'inventory'
                    ? 'bg-[#D4AF37] text-[#041A15] shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-black/20'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Manage Inventory ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === 'add'
                    ? 'bg-[#D4AF37] text-[#041A15] shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-black/20'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Jewelry Item</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === 'appointments'
                    ? 'bg-[#D4AF37] text-[#041A15] shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-black/20'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>VIP Appointments ({appointments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#D4AF37] text-[#041A15] shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-black/20'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Showroom Info</span>
              </button>
            </div>

            {/* Scrollable Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              {/* TAB 1: 1-Click Live Gold Rates */}
              {activeTab === 'rates' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-royal font-bold text-base text-[#FFF3B0]">
                        Real-Time Instant Price Synchronizer
                      </h4>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Changing rates below and clicking "Broadcast Live Rates" will immediately recalculate prices on all {products.length} product cards, modal inspection receipts, the ticker, and calculators across the website with zero page refresh!
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveRates} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* 24K Rate */}
                      <div className="p-4 rounded-2xl bg-[#07261F] border border-[#D4AF37]/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-[#FFF3B0] uppercase tracking-wider">
                            24K Pure Gold (99.9%)
                          </label>
                          <span className="text-[10px] text-neutral-400">₹ per gram</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">₹</span>
                          <input
                            type="number"
                            required
                            min="1000"
                            max="30000"
                            value={k24Rate}
                            onChange={(e) => setK24Rate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white font-mono font-bold text-lg focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div className="text-[10px] text-neutral-400">Standard Bullion baseline for coins & bars</div>
                      </div>

                      {/* 22K Rate */}
                      <div className="p-4 rounded-2xl bg-[#07261F] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#FFF3B0] uppercase tracking-wider flex items-center gap-1">
                            <span>22K BIS 916 Hallmark</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#7B112C] text-white">Most Popular</span>
                          </label>
                          <span className="text-[10px] text-neutral-400">₹ per gram</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">₹</span>
                          <input
                            type="number"
                            required
                            min="1000"
                            max="30000"
                            value={k22Rate}
                            onChange={(e) => setK22Rate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-[#D4AF37] text-[#FFF3B0] font-mono font-extrabold text-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                          />
                        </div>
                        <div className="text-[10px] text-neutral-300">Powers all Rani Haar, Jhumkas, Bangles, and Malas</div>
                      </div>

                      {/* 18K Rate */}
                      <div className="p-4 rounded-2xl bg-[#07261F] border border-[#D4AF37]/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-[#FFF3B0] uppercase tracking-wider">
                            18K Rose & Diamond Gold
                          </label>
                          <span className="text-[10px] text-neutral-400">₹ per gram</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">₹</span>
                          <input
                            type="number"
                            required
                            min="1000"
                            max="30000"
                            value={k18Rate}
                            onChange={(e) => setK18Rate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white font-mono font-bold text-lg focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div className="text-[10px] text-neutral-400">Powers Diamond Solitaire Rings & Tennis Bracelets</div>
                      </div>

                      {/* Fine Silver */}
                      <div className="p-4 rounded-2xl bg-[#07261F] border border-[#D4AF37]/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-[#FFF3B0] uppercase tracking-wider">
                            Fine Silver (99.9% Purity)
                          </label>
                          <span className="text-[10px] text-neutral-400">₹ per gram</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">₹</span>
                          <input
                            type="number"
                            required
                            min="10"
                            max="2000"
                            value={silverRate}
                            onChange={(e) => setSilverRate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-white font-mono font-bold text-lg focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div className="text-[10px] text-neutral-400">Displayed in top bullion ticker bar</div>
                      </div>

                    </div>

                    <button
                      type="submit"
                      className="btn-luxury-gold w-full py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                    >
                      <Sparkles className="w-5 h-5 text-[#041A15]" />
                      <span>⚡ Save & Broadcast Live Bullion Rates Everywhere</span>
                    </button>

                  </form>

                  {/* Reset Demo Data Pill */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                    <span>Need to restore initial showroom showcase?</span>
                    <button
                      onClick={resetToDefaults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 hover:bg-red-950/60 text-neutral-300 hover:text-red-300 border border-white/10 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Factory Demo Data</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: Manage Inventory Table */}
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-royal text-xl font-bold text-white">Live Catalog Inventory</h4>
                      <p className="text-xs text-neutral-400">Showing {products.length} registered jewelry pieces</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#041A15] text-xs font-bold flex items-center gap-1.5 hover:bg-[#FFF3B0]"
                    >
                      <PlusCircle className="w-4 h-4" /> Add Item
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#D4AF37]/30 bg-[#07261F]/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#02100C] text-[#FFF3B0] uppercase text-[10px] tracking-wider border-b border-[#D4AF37]/30">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-4">SKU / Purity</th>
                          <th className="py-3 px-4">Net Weight</th>
                          <th className="py-3 px-4">Making %</th>
                          <th className="py-3 px-4">Live Price</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF37]/15">
                        {products.map((item) => {
                          const breakdown = calculateProductPrice(item, rates);
                          return (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-4 flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/30"
                                />
                                <div>
                                  <div className="font-semibold text-white line-clamp-1">{item.title}</div>
                                  <div className="text-[10px] text-neutral-400">{item.category}</div>
                                </div>
                              </td>
                              <td className="py-3 px-4 font-mono">
                                <div>{item.sku}</div>
                                <span className="text-[10px] text-[#D4AF37]">{item.purity} Gold</span>
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-white">
                                {item.netWeightGrams.toFixed(2)} g
                              </td>
                              <td className="py-3 px-4 font-mono text-neutral-300">
                                {item.makingChargePercent}%
                              </td>
                              <td className="py-3 px-4 font-mono font-extrabold text-[#FFF3B0]">
                                {formatINR(breakdown.finalPrice)}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => toggleStock(item.id)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                                    item.inStock
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                                      : 'bg-red-950 text-red-300 border border-red-700/60'
                                  }`}
                                >
                                  {item.inStock ? (
                                    <>
                                      <ToggleRight className="w-3.5 h-3.5 text-emerald-400" /> In Stock
                                    </>
                                  ) : (
                                    <>
                                      <ToggleLeft className="w-3.5 h-3.5 text-red-400" /> Sold Out
                                    </>
                                  )}
                                </button>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => deleteProduct(item.id)}
                                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 3: Add Jewelry Item Form */}
              {activeTab === 'add' && (
                <div className="max-w-2xl mx-auto space-y-5">
                  <div className="border-b border-[#D4AF37]/20 pb-3">
                    <h4 className="font-royal text-2xl font-bold text-white">Catalog New Masterwork</h4>
                    <p className="text-xs text-neutral-400">
                      Add a new bridal piece or coin. Real-time pricing formula will automatically activate based on weight and purity.
                    </p>
                  </div>

                  <form onSubmit={handleAddProduct} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Product Title *</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Royal Nizam Emerald Choker"
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">SKU Code</label>
                        <input
                          type="text"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="e.g. ARJ-205"
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-[#02100C] border border-[#D4AF37]/30 text-white text-xs outline-none"
                        >
                          <option value="Bridal Sets">Bridal Sets</option>
                          <option value="Necklaces & Haar">Necklaces & Haar</option>
                          <option value="Jhumkas & Earrings">Jhumkas & Earrings</option>
                          <option value="Bangles & Chur">Bangles & Chur</option>
                          <option value="Solitaire Rings">Solitaire Rings</option>
                          <option value="Men's Royal Chains">Men's Royal Chains</option>
                          <option value="Gold Coins & Bullion">Gold Coins & Bullion</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Gold Purity</label>
                        <select
                          value={purity}
                          onChange={(e) => setPurity(e.target.value as GoldPurity)}
                          className="w-full px-3 py-2 rounded-xl bg-[#02100C] border border-[#D4AF37]/30 text-white text-xs outline-none font-bold"
                        >
                          <option value="22K">22K BIS 916 Hallmark (Standard)</option>
                          <option value="18K">18K Rose/Diamond Gold</option>
                          <option value="24K">24K 99.9% Pure Investment Gold</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Net Weight (grams) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={netWeight}
                          onChange={(e) => setNetWeight(parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Making Charge (%) *</label>
                        <input
                          type="number"
                          step="0.5"
                          required
                          value={makingCharge}
                          onChange={(e) => setMakingCharge(parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Stone Value (₹)</label>
                        <input
                          type="number"
                          step="500"
                          value={stoneValue}
                          onChange={(e) => setStoneValue(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">High-Res Image URL</label>
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Royal Story / Craftsmanship Description</label>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the filigree, karigari, or bridal heirloom qualities..."
                        className="w-full p-3 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-luxury-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
                    >
                      <PlusCircle className="w-4 h-4 text-[#041A15]" />
                      <span>Publish Masterwork to Live Catalog</span>
                    </button>

                  </form>
                </div>
              )}

              {/* TAB 4: VIP Appointments Manager */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="border-b border-[#D4AF37]/20 pb-3">
                    <h4 className="font-royal text-xl font-bold text-white">VIP Bridal & Video Appointments</h4>
                    <p className="text-xs text-neutral-400">
                      Customer bookings received from the website VIP reservation system.
                    </p>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 text-xs">
                      No appointments booked yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-4 rounded-2xl bg-[#07261F] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{apt.customerName}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FFF3B0] font-semibold">
                                {apt.experienceType}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                apt.status === 'Confirmed' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-neutral-800 text-neutral-300'
                              }`}>
                                {apt.status}
                              </span>
                            </div>

                            <div className="text-xs text-neutral-300 font-mono flex flex-wrap items-center gap-3">
                              <span>📅 {apt.date}</span>
                              <span>⏰ {apt.timeSlot}</span>
                              <span>📞 {apt.phone}</span>
                            </div>

                            {apt.notes && (
                              <div className="text-[11px] text-neutral-400 italic">
                                Note: "{apt.notes}"
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => {
                                const cleanPhone = apt.phone.replace(/\D/g, '');
                                const msg = `Hello ${apt.customerName}, this is the Concierge at ${settings.showroomName}. We have confirmed your ${apt.experienceType} for ${apt.date} (${apt.timeSlot}). We look forward to welcoming you!`;
                                window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  apt.id,
                                  apt.status === 'Confirmed' ? 'Completed' : 'Confirmed'
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-neutral-300 text-xs border border-white/10"
                            >
                              {apt.status === 'Confirmed' ? 'Mark Completed' : 'Reopen'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: Showroom Info Settings */}
              {activeTab === 'settings' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div className="border-b border-[#D4AF37]/20 pb-3">
                    <h4 className="font-royal text-xl font-bold text-white">Showroom & WhatsApp Configuration</h4>
                    <p className="text-xs text-neutral-400">
                      Configure your flagship boutique address, inquiry phone number, and opening hours.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Showroom Title</label>
                      <input
                        type="text"
                        value={settings.showroomName}
                        onChange={(e) => updateSettings({ showroomName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">WhatsApp Inquiry Number (with country code, e.g. 919876543210)</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => updateSettings({ whatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Showroom Address</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => updateSettings({ address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Opening Hours</label>
                      <input
                        type="text"
                        value={settings.hours}
                        onChange={(e) => updateSettings({ hours: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#FFF3B0] mb-1">Director Admin PIN (Default: 1234)</label>
                      <input
                        type="password"
                        maxLength={6}
                        value={settings.adminPin}
                        onChange={(e) => updateSettings({ adminPin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white text-xs font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
