# AURELIA ROYAL JEWELS (Haute Joaillerie & Live Bullion Vault)

An ultra-luxury, fully responsive Indian Royal Jewelry Showroom website, Live Bullion Pricing Engine, and Password-Protected Admin Portal inspired by **Tanishq Rivaah**, **Sabyasachi Jewelry**, and **Cartier**.

---

## 👑 Key Features & Architecture

### 1. Royal Editorial Color System & Keyframe Animation Engine
- **Imperial Emerald (`#041A15`) & Midnight Jade (`#07261F`)**: Deep hero vault, bullion calculator, and footer with radial champagne spotlights (`radial-gradient(ellipse at top, rgba(212, 175, 55, 0.22) 0%, rgba(4, 26, 21, 0.98) 75%)`).
- **Warm Pearl Alabaster (`#FAF6F0`) & Soft Champagne Silk (`#F3ECE1`)**: Main catalog showcase background.
- **Pure Ivory (`#FFFFFF`) Cards**: Subtle gold border (`rgba(212, 175, 55, 0.28)`) with dynamic hover lift.
- **Liquid Gold Accent (`#D4AF37`) & Foil Shimmer**: Smooth linear gradient animations across headings and CTAs.
- **Velvet Ruby Accent (`#7B112C`)**: Badges, HUID pills, and wishlist highlights.
- **Google Fonts**: `'Cormorant Garamond'` (serif) for imperial typography and `'Plus Jakarta Sans'` for clear numbers and specifications.

### 2. Live Dynamic Gold Pricing Engine
Reactive state persisted in `localStorage`. Every card and modal automatically computes:
$$\text{Metal Cost} = \text{Net Weight (g)} \times \text{Current Bullion Rate for Purity}$$
$$\text{Making Cost} = \text{Metal Cost} \times \left(\frac{\text{Making Charge \%}}{100}\right)$$
$$\text{Subtotal} = \text{Metal Cost} + \text{Making Cost} + \text{Stone Value}$$
$$\text{GST (3\%)} = \text{Subtotal} \times 0.03$$
$$\text{Live Showroom Price} = \text{Round}(\text{Subtotal} + \text{GST})$$

When rates are edited in the Admin Portal, all **12 pre-loaded masterworks**, modal breakdowns, hero previews, and calculators recalculate **instantaneously** with a celebratory gold toast notification.

### 3. Pre-Loaded Authentic Jewelry Catalog (12 Heirlooms)
1. **Royal Kundan Bridal Rani Haar** (22K, 46.50g, Making 14%, SKU ARJ-101)
2. **Meenakari Heritage Jhumka Earrings** (22K, 14.20g, Making 12%, SKU ARJ-102)
3. **Imperial Solitaire Diamond Engagement Ring** (18K, 5.80g, Making 15%, Stone ₹45,000, SKU ARJ-103)
4. **Bengal Traditional Nakshi Gold Bala Pair** (22K, 28.40g, Making 11%, SKU ARJ-104)
5. **Maharani Polki Choker Necklace** (22K, 34.10g, Making 14%, Stone ₹18,000, SKU ARJ-105)
6. **Rose Gold Diamond Infinity Bracelet** (18K, 9.60g, Making 13%, Stone ₹22,000, SKU ARJ-106)
7. **Temple Lakshmi Kasu Mala** (22K, 38.00g, Making 13%, SKU ARJ-107)
8. **Royal Filigree Gold Cocktail Ring** (22K, 7.40g, Making 10%, SKU ARJ-108)
9. **Classic Men's Cuban Sovereign Gold Chain** (22K, 22.50g, Making 9%, SKU ARJ-109)
10. **Bridal Satlada Seven-Layer Pearl & Gold Haar** (22K, 54.20g, Making 15%, SKU ARJ-110)
11. **Emerald Drop Chandbali Earrings** (22K, 16.80g, Making 12%, Stone ₹8,500, SKU ARJ-111)
12. **24K Lakshmi Sovereign Gold Coin** (24K, 10.00g, Making 4%, SKU ARJ-112)

### 4. Interactive Cursor Loupe Magnifier Modal (2.3x Zoom)
- Hovering over the jewelry photo in the inspection modal smoothly pans and zooms **2.3x** based on the cursor position (`transform-origin: X% Y%`).
- Shows the complete **Price Transparency Receipt** with an itemized breakdown and a 1-click **WhatsApp Inquiry** pre-filled with the exact SKU, weight, and live showroom estimate.

### 5. Interactive Bullion Calculator & Old Gold Exchange
- **Tab 1: New Ornament Cost Estimator**: Interactive sliders for weight (1g - 100g) and making charges (3% - 25%), instant itemized quotation with copy and WhatsApp actions.
- **Tab 2: Old Gold Exchange Calculator**: Computes **100% full market value at 0% melting deduction** and calculates savings against competitor deductions (3%–5%).

### 6. VIP Bridal Suite & Video Shopping Concierge
- Allows clients to reserve an in-showroom private bridal suite or book an HD WhatsApp Video shopping session.
- Submissions are stored in the Admin Portal and provide instant confirmation with a direct WhatsApp message link.

### 7. Password-Protected Admin Portal (Default PIN: `1234`)
- **1-Click Live Gold & Silver Rate Updater**: Updates 24K, 22K, 18K, and Silver rates globally in real time.
- **Add Jewelry Item Form**: Instantly adds custom designs to the live catalog.
- **Inventory Manager**: Toggle items between "In Stock" and "Sold Out", or delete items.
- **VIP Appointments Manager**: View and manage customer appointments with direct WhatsApp buttons.
- **Showroom Settings**: Update Showroom Name, Address, and Phone/WhatsApp numbers dynamically.
- **Reset to Factory Demo Data**: Restore default 12 items and live rates anytime.

### 8. Mobile Sticky Bottom Action Bar
- Fixed bottom bar on mobile screens with quick access to **Catalog**, **Gold Rate**, **Calculator**, and **WhatsApp Concierge**.

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Production build
npm run build
```

