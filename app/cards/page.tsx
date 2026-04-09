'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { useApp } from '@/hooks/useApp'

// Card data for each tab
const CARDS = {
  usd: {
    gradient: 'from-[#0A3B49] via-[#135D77] to-[#0A3B49]',
    balance: '$42,150.00',
    holder: 'ALEX MARSHALL',
    last4: '4829',
    currency: 'USD Card',
    frozen: false,
  },
  eur: {
    gradient: 'from-[#1A1A2E] via-[#16213E] to-[#0F3460]',
    balance: '€9,380.00',
    holder: 'ALEX MARSHALL',
    last4: '2174',
    currency: 'EUR Card',
    frozen: false,
  },
}

type CardKey = 'usd' | 'eur'

export default function CardsPage() {
  const router = useRouter()
  const { user, fiatAccounts, frozenCards, toggleCardFreeze, loading } = useApp()
  const [activeCard, setActiveCard] = useState<CardKey>('usd')
  const [showDetails, setShowDetails] = useState(false)

  if (loading || !user || !fiatAccounts) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Cards...</div>
      </div>
    )
  }

  const usdAccount = fiatAccounts.find(a => a.id === 'usd')
  const eurAccount = fiatAccounts.find(a => a.id === 'eur')

  const CARDS_DYNAMIC = {
    usd: {
      ...CARDS.usd,
      balance: usdAccount?.balance || '$0.00',
      holder: user.name?.toUpperCase() || 'ALEX MARSHALL',
    },
    eur: {
      ...CARDS.eur,
      balance: eurAccount?.balance || '€0.00',
      holder: user.name?.toUpperCase() || 'ALEX MARSHALL',
    }
  }

  const card = CARDS_DYNAMIC[activeCard]
  const isFrozen = frozenCards[activeCard]

  const toggleFreeze = () => {
    toggleCardFreeze(activeCard)
  }

  return (
    <div className="bg-background-light min-h-screen relative">
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col">
        <div className="h-4 w-full"></div>
        <header className="px-6 py-4 flex items-center sticky top-0 bg-background-light/80 dark:bg-background-dark/80 ios-blur z-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">GlobalFin</p>
            <h1 className="text-3xl font-bold">Cards</h1>
          </div>
        </header>

        <main className="flex-1 px-6 pb-24 overflow-y-auto">
          <div className="mt-4 mb-8">

            {/* Card visual */}
            <div className={`bg-gradient-to-br ${card.gradient} w-full aspect-[1.58/1] rounded-2xl shadow-xl shadow-[#0A3B49]/40 p-6 relative overflow-hidden text-white flex flex-col justify-between group transition-all duration-300`}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

              {/* Freeze overlay */}
              {isFrozen && (
                <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center z-20 rounded-2xl backdrop-blur-sm">
                  <span className="material-icons-round text-white text-5xl mb-2">ac_unit</span>
                  <p className="text-white font-bold text-lg tracking-wide">Card Frozen</p>
                  <p className="text-white/60 text-xs mt-1">Tap &ldquo;Freeze Card&rdquo; to unfreeze</p>
                </div>
              )}

              <div className="flex justify-between items-start z-10">
                <div className="text-lg font-semibold tracking-wide italic">GlobalFin</div>
                <span className="material-icons-round text-3xl">contactless</span>
              </div>
              <div className="z-10">
                <div className="text-sm opacity-80 mb-1">Total Balance</div>
                <div className="text-3xl font-bold tracking-tight">{card.balance}</div>
              </div>
              <div className="flex justify-between items-end z-10">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Card Holder</p>
                  <p className="font-medium">{card.holder}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-mono">•••• {card.last4}</p>
                  <p className="text-xs opacity-70">{card.currency}</p>
                </div>
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex mt-6 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl">
              <button
                onClick={() => setActiveCard('usd')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${activeCard === 'usd' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-700/40'}`}
              >
                USD Card
              </button>
              <button
                onClick={() => setActiveCard('eur')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${activeCard === 'eur' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-700/40'}`}
              >
                EUR Card
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {/* Freeze */}
            <button onClick={toggleFreeze} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center group-active:scale-95 transition-all ${isFrozen ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-primary'}`}>
                <span className="material-icons-round">ac_unit</span>
              </div>
              <span className="text-xs font-medium opacity-80">{isFrozen ? 'Unfreeze' : 'Freeze Card'}</span>
            </button>

            {/* Order New */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary group-active:scale-95 transition-all">
                <span className="material-icons-round">add_card</span>
              </div>
              <span className="text-xs font-medium opacity-80">Order New</span>
            </button>

            {/* View Details */}
            <button onClick={() => setShowDetails(true)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary group-active:scale-95 transition-all">
                <span className="material-icons-round">visibility</span>
              </div>
              <span className="text-xs font-medium opacity-80">View Details</span>
            </button>
          </div>

          {/* Card History */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Card History</h2>
              <button className="text-primary text-sm font-semibold">See All</button>
            </div>
            <div className="space-y-4">
              {[
                { icon: 'shopping_bag', label: 'Apple Store', time: 'Today, 2:45 PM', amount: '-$1,299.00', status: 'Completed', positive: false },
                { icon: 'restaurant', label: 'The Green Bistro', time: 'Yesterday, 8:20 PM', amount: '-$42.50', status: 'Completed', positive: false },
                { icon: 'local_gas_station', label: 'Shell Fuel Station', time: 'Oct 24, 10:15 AM', amount: '-$65.00', status: 'Pending', positive: false },
                { icon: 'stars', label: 'Cashback Reward', time: 'Oct 22, 12:00 AM', amount: '+$12.40', status: 'Reward', positive: true },
              ].map(({ icon, label, time, amount, status, positive }) => (
                <div key={label} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <span className="material-icons-round">{icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${positive ? 'text-green-500' : ''}`}>{amount}</p>
                    <p className={`text-[10px] font-medium uppercase tracking-wider ${positive ? 'text-green-500' : status === 'Pending' ? 'text-slate-400' : 'text-green-500'}`}>{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <BottomNav />

      {/* ── View Details Bottom Sheet ── */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[80] flex flex-col justify-end"
          onClick={() => setShowDetails(false)}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div
            className="relative z-10 w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-12"
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-6">
              <h2 className="font-display text-lg font-bold text-primary dark:text-white">Card Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>
            <div className="px-6 space-y-5">
              {[
                { label: 'Card Number', value: `4174 3692 8472 ${card.last4}`, mono: true },
                { label: 'Card Holder', value: card.holder, mono: false },
                { label: 'Currency', value: activeCard.toUpperCase(), mono: false },
                { label: 'Expiry Date', value: '09 / 28', mono: true },
                { label: 'CVV', value: '648', mono: true },
                { label: 'Card Status', value: isFrozen ? '❄️ Frozen' : '✅ Active', mono: false },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
                  <p className={`text-sm font-bold text-slate-900 dark:text-white ${mono ? 'font-mono tracking-wider' : ''}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
