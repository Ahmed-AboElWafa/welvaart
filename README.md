# Welvaart — Next.js Interactive Prototype

A fully connected, interactive prototype of the Welvaart financial platform, converted from 50 Stitch-designed HTML pages into a working Next.js 14 application.

## 📱 App Structure

The app is designed as a mobile-first interface (max-width 430px) and includes:

### Main Tabs
| Route | Screen |
|-------|--------|
| `/` | Home Dashboard |
| `/cards` | Cards Management |
| `/invest` | Investment Hub |
| `/rewards` | Rewards Program |

### Transfer Flows
| Route | Screen |
|-------|--------|
| `/transfer` | Transfer Asset Selection |
| `/transfer/send-fiat/select-recipient` | Select Recipient |
| `/transfer/send-fiat/enter-amount` | Enter Amount |
| `/transfer/send-fiat/review` | Review Transfer |
| `/transfer/send-fiat/success` | Transfer Success |
| `/transfer/send-fiat/add-recipient` | Add New Recipient |
| `/transfer/send-crypto/select-asset` | Select Crypto Asset |
| `/transfer/send-crypto/recipient-network` | Recipient & Network |
| `/transfer/send-crypto/confirmation` | Final Confirmation |
| `/transfer/send-gold/select-recipient` | Gold Recipient |
| `/transfer/send-gold/enter-amount` | Gold Amount |
| `/transfer/send-gold/review` | Gold Review |
| `/transfer/send-stocks/select-asset` | Select Stock |
| `/transfer/send-stocks/recipient-shares` | Recipient & Shares |
| `/transfer/send-stocks/final-review` | Final Review |

### Deposit
| Route | Screen |
|-------|--------|
| `/deposit` | Deposit Options |
| `/deposit/bank-transfer` | Bank Transfer Details |
| `/deposit/receive-crypto` | Receive Crypto |

### Fiat Accounts
| Route | Screen |
|-------|--------|
| `/fiat` | Multi-Currency Accounts |
| `/fiat/open-account` | Select Currency |
| `/fiat/confirm` | Confirm Opening |
| `/fiat/success` | Account Created |

### Convert
| Route | Screen |
|-------|--------|
| `/convert` | Asset Conversion |
| `/convert/review` | Review Conversion |
| `/convert/success` | Conversion Success |

### Investment Hub
| Route | Screen |
|-------|--------|
| `/invest` | Investment Hub |
| `/invest/crypto-market` | Crypto Market |
| `/invest/crypto-details` | Crypto Asset Details |
| `/invest/stocks-market` | Stocks Market |
| `/invest/stocks-details` | Stock Details |
| `/invest/buy-asset` | Buy Asset |
| `/invest/review-order` | Review Order |
| `/invest/purchase-success` | Purchase Success |
| `/invest/gold-tokens` | Gold Tokens Hub |
| `/invest/gold-tokens/buy` | Buy Gold |
| `/invest/gold-tokens/buy/review` | Review Gold Purchase |
| `/invest/gold-tokens/buy/success` | Gold Purchase Success |
| `/invest/gold-tokens/sell` | Sell Gold |
| `/invest/gold-tokens/sell/review` | Review Gold Sale |
| `/invest/gold-tokens/sell/success` | Sale Success |
| `/invest/gold-tokens/redeem/amount` | Redeem - Choose Amount |
| `/invest/gold-tokens/redeem/location` | Redeem - Choose Location |
| `/invest/gold-tokens/redeem/review` | Redeem - Final Review |
| `/invest/gold-tokens/redeem/success` | Redemption Initiated |

### Other
| Route | Screen |
|-------|--------|
| `/transactions` | Transaction History |
| `/profile` | Profile & Settings |

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — faithful to original design tokens
- **Google Fonts** — Inter + Playfair Display
- **Material Symbols** — icon font

## 🎨 Design System

Original design tokens preserved:
- Primary: `#135D77` (Deep Teal)
- Accent: `#D4AF37` (Gold)
- Background Light: `#F8FAFC`
- Premium Teal: `#0A3B49`

## 📁 Project Structure

```
welvaart/
├── app/
│   ├── layout.tsx          # Root layout (fonts, global styles)
│   ├── globals.css         # Tailwind + custom classes
│   ├── page.tsx            # Home dashboard
│   ├── cards/
│   ├── invest/
│   ├── rewards/
│   ├── transfer/
│   ├── deposit/
│   ├── fiat/
│   ├── convert/
│   ├── transactions/
│   └── profile/
├── components/
│   ├── BottomNav.tsx       # Shared bottom navigation
│   └── BackButton.tsx      # Reusable back button
├── tailwind.config.js
├── next.config.js
└── package.json
```
# welvaart
