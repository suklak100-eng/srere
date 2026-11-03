import { GoldRates, GoldPurity, JewelryItem, PriceBreakdown } from '../types/jewelry';

export function getRateForPurity(purity: GoldPurity, rates: GoldRates): number {
  switch (purity) {
    case '24K':
      return rates.k24;
    case '22K':
      return rates.k22;
    case '18K':
      return rates.k18;
    default:
      return rates.k22;
  }
}

export function calculateProductPrice(item: JewelryItem, rates: GoldRates): PriceBreakdown {
  const rate = getRateForPurity(item.purity, rates);
  const metalCost = item.netWeightGrams * rate;
  const makingCost = metalCost * (item.makingChargePercent / 100);
  const stoneValue = item.stoneValue || 0;
  const subtotal = metalCost + makingCost + stoneValue;
  const gst = subtotal * 0.03;
  const finalPrice = Math.round(subtotal + gst);

  return {
    metalCost: Math.round(metalCost),
    makingCost: Math.round(makingCost),
    stoneValue: Math.round(stoneValue),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    finalPrice,
    rateUsed: rate
  };
}

export function calculateCustomOrnamentPrice(
  purity: GoldPurity,
  weightGrams: number,
  makingChargePercent: number,
  stoneValue: number,
  rates: GoldRates
): PriceBreakdown {
  const rate = getRateForPurity(purity, rates);
  const metalCost = weightGrams * rate;
  const makingCost = metalCost * (makingChargePercent / 100);
  const stone = Number(stoneValue) || 0;
  const subtotal = metalCost + makingCost + stone;
  const gst = subtotal * 0.03;
  const finalPrice = Math.round(subtotal + gst);

  return {
    metalCost: Math.round(metalCost),
    makingCost: Math.round(makingCost),
    stoneValue: Math.round(stone),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    finalPrice,
    rateUsed: rate
  };
}

export function calculateOldGoldExchange(
  weightGrams: number,
  purity: GoldPurity,
  rates: GoldRates
): {
  marketRate: number;
  grossValue: number;
  aureliaExchangeCredit: number; // 100% full value (0% deduction)
  typicalCompetitorDeduction: number; // Competitors deduct 3% to 5% melting/testing loss
  customerSavings: number;
} {
  const rate = getRateForPurity(purity, rates);
  const grossValue = Math.round(weightGrams * rate);
  const aureliaExchangeCredit = grossValue;
  const typicalCompetitorDeduction = Math.round(grossValue * 0.04); // 4% typical industry loss
  const customerSavings = typicalCompetitorDeduction;

  return {
    marketRate: rate,
    grossValue,
    aureliaExchangeCredit,
    typicalCompetitorDeduction,
    customerSavings
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppInquiryUrl(
  phone: string,
  item: JewelryItem,
  breakdown: PriceBreakdown
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const message = `*👑 INQUIRY FROM AURELIA ROYAL JEWELS WEBSITE*
  
*Item:* ${item.title}
*SKU:* ${item.sku}
*Purity:* ${item.purity} BIS 916 Hallmarked
*Net Weight:* ${item.netWeightGrams.toFixed(2)} grams
*Today's Showroom Estimate:* ${formatINR(breakdown.finalPrice)}
(Gold: ${formatINR(breakdown.metalCost)} + Making ${item.makingChargePercent}% + 3% GST)

_Hello Aurelia Concierge, I would like to reserve/inspect this piece at the showroom or request a live video showing. Please guide me with availability._`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateCalculatorWhatsAppUrl(
  phone: string,
  purity: GoldPurity,
  weight: number,
  making: number,
  stone: number,
  breakdown: PriceBreakdown
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const message = `*✨ CUSTOM ORNAMENT QUOTATION - AURELIA ROYAL JEWELS*
  
*Selected Purity:* ${purity} Gold
*Estimated Weight:* ${weight.toFixed(2)} g
*Making Charges:* ${making}%
*Stone/Gems:* ${formatINR(stone)}
*Live Bullion Rate:* ${formatINR(breakdown.rateUsed)}/g
---------------------------
*Live Showroom Estimate:* ${formatINR(breakdown.finalPrice)}
(Includes 3% GST and BIS 916 Hallmark guarantee)

_Please book an appointment with a Senior Bridal Consultant._`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
