import React, { useState } from 'react';
import { useJewelry } from '../context/JewelryContext';
import {
  calculateCustomOrnamentPrice,
  calculateOldGoldExchange,
  formatINR,
  generateCalculatorWhatsAppUrl,
  getRateForPurity
} from '../utils/pricing';
import { GoldPurity } from '../types/jewelry';
import {
  Calculator,
  RefreshCw,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  MessageCircle
} from 'lucide-react';

export const BullionCalculatorSection: React.FC = () => {
  const { rates, settings, showToast } = useJewelry();

  const [activeTab, setActiveTab] = useState<'estimator' | 'exchange'>('estimator');

  // Tab 1: Estimator State
  const [calcPurity, setCalcPurity] = useState<GoldPurity>('22K');
  const [calcWeight, setCalcWeight] = useState<number>(25.0);
  const [calcMaking, setCalcMaking] = useState<number>(12);
  const [calcStone, setCalcStone] = useState<number>(0);

  // Tab 2: Exchange State
  const [exchWeight, setExchWeight] = useState<number>(20.0);
  const [exchPurity, setExchPurity] = useState<GoldPurity>('22K');

  // Computations
  const estimateBreakdown = calculateCustomOrnamentPrice(
    calcPurity,
    calcWeight,
    calcMaking,
    calcStone,
    rates
  );

  const exchangeResult = calculateOldGoldExchange(exchWeight, exchPurity, rates);

  const handleCopyQuote = () => {
    const text = `AURELIA ROYAL JEWELS - Live Gold Estimate
Purity: ${calcPurity} Gold (${formatINR(estimateBreakdown.rateUsed)}/g)
Weight: ${calcWeight.toFixed(2)} g
Making Charge: ${calcMaking}% (${formatINR(estimateBreakdown.makingCost)})
Stone / Gem Value: ${formatINR(calcStone)}
3% GST: ${formatINR(estimateBreakdown.gst)}
--------------------------------
Total Live Showroom Price: ${formatINR(estimateBreakdown.finalPrice)}`;

    navigator.clipboard.writeText(text);
    showToast('Quote Copied', 'Quotation copied to clipboard. Share with your family or jeweler.', 'gold');
  };

  const handleWhatsAppQuote = () => {
    const url = generateCalculatorWhatsAppUrl(
      settings.whatsapp,
      calcPurity,
      calcWeight,
      calcMaking,
      calcStone,
      estimateBreakdown
    );
    window.open(url, '_blank');
  };

  const handleWhatsAppExchange = () => {
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const msg = `*✨ OLD GOLD EXCHANGE INQUIRY - 0% DEDUCTION GUARANTEE*
  
*Old Gold Weight:* ${exchWeight.toFixed(2)} grams
*Gold Purity:* ${exchPurity}
*Today's Market Rate:* ${formatINR(exchangeResult.marketRate)}/g
*Aurelia 100% Exchange Credit:* ${formatINR(exchangeResult.aureliaExchangeCredit)}
*Customer Net Advantage vs Typical Jeweler:* +${formatINR(exchangeResult.customerSavings)} Saved!

_Hello Aurelia Concierge, I would like to schedule a Karatmeter spectrometer verification at the showroom to exchange my old gold ornaments for new bridal pieces._`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 bg-[#08090A] relative overflow-hidden border-t border-[#C5A880]/15">
      
      {/* Background Lighting & Depth */}
      <div className="absolute inset-0 champagne-glow-hero pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-950/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-cinzel font-semibold uppercase tracking-[0.25em]">
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Interactive Bullion Vault</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-light text-white tracking-tight">
            Live Gold Price & 0% Exchange Engine
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto my-3" />
          <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-lg mx-auto leading-relaxed">
            Whether designing a bespoke bridal trousseau or trading ancestral heirloom gold, compute exact live valuations powered by current second-by-second bullion benchmarks.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-[#0D0E11] border border-[#C5A880]/35 shadow-xl mt-8">
            <button
              onClick={() => setActiveTab('estimator')}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'estimator'
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#DFBA73] text-[#08090A] shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Ornament Estimator</span>
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'exchange'
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#DFBA73] text-[#08090A] shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Old Gold Exchange (0% Loss)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: New Ornament Cost Estimator */}
        {activeTab === 'estimator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls Box */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0D0E11]/90 border border-[#C5A880]/30 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-cinzel text-lg sm:text-xl font-medium text-white flex items-center gap-2">
                  <span>Custom Jewelry Parameters</span>
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Rate: {formatINR(estimateBreakdown.rateUsed)}/g
                </span>
              </div>

              {/* Purity Selector */}
              <div>
                <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-2.5">
                  1. Select Gold Karat Purity
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['22K', '18K', '24K'] as GoldPurity[]).map((p) => {
                    const active = calcPurity === p;
                    const rate = getRateForPurity(p, rates);
                    return (
                      <button
                        key={p}
                        onClick={() => setCalcPurity(p)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          active
                            ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-[0_0_15px_rgba(197,168,128,0.3)]'
                            : 'bg-[#14171A] border-white/10 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <div className="font-cinzel font-bold text-base text-[#FFF3B0]">{p} Gold</div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{formatINR(rate)}/g</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider">
                    2. Net Gold Weight in Grams
                  </label>
                  <div className="flex items-center gap-1 bg-[#14171A] px-3 py-1 rounded-lg border border-[#C5A880]/30">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="200"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-16 bg-transparent text-right font-mono font-bold text-[#FFF3B0] text-sm focus:outline-none"
                    />
                    <span className="text-xs text-neutral-400">g</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A880] h-2 bg-[#14171A] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>1g (Solitaire/Ring)</span>
                  <span>25g (Necklace)</span>
                  <span>50g (Kada/Chur)</span>
                  <span>100g (Heavy Bridal)</span>
                </div>
              </div>

              {/* Making Charge Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider">
                    3. Craftsmanship & Karigari Charges (%)
                  </label>
                  <span className="font-mono font-bold text-[#FFF3B0] bg-[#14171A] px-3 py-1 rounded-lg border border-[#C5A880]/30 text-sm">
                    {calcMaking}%
                  </span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={calcMaking}
                  onChange={(e) => setCalcMaking(parseInt(e.target.value))}
                  className="w-full accent-[#C5A880] h-2 bg-[#14171A] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>3% (Bullion Coins)</span>
                  <span>10% (Machine Chains)</span>
                  <span>14% (Handcrafted Temple)</span>
                  <span>25% (Intricate Kundan)</span>
                </div>
              </div>

              {/* Optional Stone / Diamond Value */}
              <div>
                <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-2">
                  4. Precious Solitaire or Gemstone Estimate (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">₹</span>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={calcStone}
                    onChange={(e) => setCalcStone(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Enter diamond or emerald estimate (e.g. 25000)"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white font-mono text-sm focus:border-[#C5A880] outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Right Itemized Receipt Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0D0E11] border border-[#C5A880]/40 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">Live Showroom Receipt</h3>
                </div>
                <span className="text-[9px] font-cinzel font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#6E1024] text-white">
                  {calcPurity} BIS 916
                </span>
              </div>

              {/* Itemized Lines */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>
                    Pure Metal Cost ({calcWeight.toFixed(2)}g × {formatINR(estimateBreakdown.rateUsed)}):
                  </span>
                  <span className="font-mono font-bold text-white">
                    {formatINR(estimateBreakdown.metalCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span>Craftsmanship / Karigari Cost ({calcMaking}%):</span>
                  <span className="font-mono font-bold text-white">
                    {formatINR(estimateBreakdown.makingCost)}
                  </span>
                </div>

                {calcStone > 0 && (
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Precious Stones / Gems:</span>
                    <span className="font-mono font-bold text-white">
                      {formatINR(calcStone)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-400 pt-2 border-t border-dashed border-neutral-800">
                  <span>Taxable Subtotal:</span>
                  <span className="font-mono font-semibold text-neutral-200">
                    {formatINR(estimateBreakdown.subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span>Statutory GST (3% on Metal & Craft):</span>
                  <span className="font-mono font-bold text-white">
                    {formatINR(estimateBreakdown.gst)}
                  </span>
                </div>
              </div>

              {/* Grand Total Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08090A] border border-[#C5A880]/50 text-white shadow-xl space-y-1">
                <div className="text-[9px] sm:text-[10px] uppercase font-cinzel tracking-widest text-[#C5A880] font-semibold">
                  Estimated Showroom Total
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FFF3B0]">
                  {formatINR(estimateBreakdown.finalPrice)}
                </div>
                <div className="text-[10px] text-neutral-400 flex items-center justify-between pt-1">
                  <span>Includes BIS Hallmark Certificate</span>
                  <span className="text-emerald-400">● Live Bullion Sync</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quotation to Concierge WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyQuote}
                  className="w-full py-2.5 px-4 rounded-full bg-[#14171A] hover:bg-[#1F2329] border border-[#C5A880]/30 text-neutral-200 text-xs font-cinzel tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Copy Itemized Quote</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Old Gold Exchange Value Calculator */}
        {activeTab === 'exchange' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Input Box */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0D0E11]/90 border border-[#C5A880]/30 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-cinzel text-lg sm:text-xl font-medium text-white flex items-center gap-2">
                  <span>Existing Gold Parameters</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 0% Melting Loss
                </span>
              </div>

              {/* Existing Gold Purity */}
              <div>
                <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-2.5">
                  1. Purity of Your Old Ornaments
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['22K', '18K', '24K'] as GoldPurity[]).map((p) => {
                    const active = exchPurity === p;
                    const rate = getRateForPurity(p, rates);
                    return (
                      <button
                        key={p}
                        onClick={() => setExchPurity(p)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          active
                            ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-[0_0_15px_rgba(197,168,128,0.3)]'
                            : 'bg-[#14171A] border-white/10 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <div className="font-cinzel font-bold text-base text-[#FFF3B0]">{p}</div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{formatINR(rate)}/g</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Existing Gold Weight */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider">
                    2. Estimated Gross Weight of Old Gold
                  </label>
                  <div className="flex items-center gap-1 bg-[#14171A] px-3 py-1 rounded-lg border border-[#C5A880]/30">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="500"
                      value={exchWeight}
                      onChange={(e) => setExchWeight(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-16 bg-transparent text-right font-mono font-bold text-[#FFF3B0] text-sm focus:outline-none"
                    />
                    <span className="text-xs text-neutral-400">g</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  value={exchWeight}
                  onChange={(e) => setExchWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A880] h-2 bg-[#14171A] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>1g</span>
                  <span>20g</span>
                  <span>50g</span>
                  <span>100g</span>
                </div>
              </div>

              {/* Karatmeter Guarantee Info */}
              <div className="p-4 rounded-2xl bg-[#14171A] border border-[#C5A880]/20 flex items-start gap-3 text-xs text-neutral-300">
                <Scale className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-cinzel font-semibold text-[#FFF3B0]">German Spectrometer Karatmeter Testing</div>
                  <div className="mt-0.5 text-neutral-400 leading-relaxed text-[11px]">
                    Bring your old jewelry to our salon. We test the exact metallurgical purity in front of your eyes in under 60 seconds without scratching or damaging the metal.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Comparison Box: Aurelia 0% vs Market Loss */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0D0E11] border border-[#C5A880]/40 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">Exchange Comparison</h3>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  100% Value
                </span>
              </div>

              {/* Aurelia Full Credit Card */}
              <div className="p-4 rounded-2xl bg-[#08090A] border border-[#C5A880] text-white shadow-lg space-y-1">
                <div className="text-[9px] uppercase font-cinzel tracking-wider text-[#C5A880] font-semibold flex items-center justify-between">
                  <span>Aurelia Royal Jewels Credit</span>
                  <span className="text-emerald-400 font-bold">0% Deduction</span>
                </div>
                <div className="font-mono text-3xl font-extrabold text-[#FFF3B0]">
                  {formatINR(exchangeResult.aureliaExchangeCredit)}
                </div>
                <div className="text-[11px] text-neutral-400">
                  Full 100% bullion rate credit towards any new high jewelry bridal creation.
                </div>
              </div>

              {/* Typical Other Jeweler Card */}
              <div className="p-4 rounded-2xl bg-[#14171A] border border-white/10 text-neutral-300 space-y-1">
                <div className="text-[9px] uppercase font-cinzel tracking-wider text-neutral-400 font-semibold flex items-center justify-between">
                  <span>Typical Other Jewelers (3-5% Loss)</span>
                  <span className="text-red-400 font-semibold">-4% Melting Loss</span>
                </div>
                <div className="font-mono text-2xl font-bold text-neutral-500 line-through">
                  {formatINR(exchangeResult.grossValue - exchangeResult.typicalCompetitorDeduction)}
                </div>
                <div className="text-[11px] text-neutral-400">
                  Competitors deduct up to <strong>{formatINR(exchangeResult.typicalCompetitorDeduction)}</strong> for "melting loss".
                </div>
              </div>

              {/* Customer Net Savings Highlight */}
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-300 block">Your Aurelia Advantage:</span>
                  <span className="text-[11px] text-emerald-400">Extra money staying in your pocket</span>
                </div>
                <span className="font-mono text-lg font-extrabold text-emerald-300">
                  +{formatINR(exchangeResult.customerSavings)}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={handleWhatsAppExchange}
                className="w-full py-3.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Free Karatmeter Exchange Slot</span>
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
