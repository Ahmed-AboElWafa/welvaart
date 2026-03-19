'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useApp } from '@/hooks/useApp'

import { MARKET } from './stocks'

const MARKET_PREVIEW = 4

export default function StocksMarketPage() {
  const router = useRouter()
  const [showAll, setShowAll] = useState(false)
  const { portfolio, stockHoldings, loading } = useApp()

  if (loading || !portfolio || !stockHoldings) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Stock Market...</div>
      </div>
    )
  }

  return (
    <>
      <div className="h-4 w-full" />

      {/* ── Header ── */}
      <header className="px-6 pt-2 pb-4 sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        {/* Title row — back btn | centred title | spacer */}
        <div className="flex items-center mb-6">
          <button
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0"
            onClick={() => router.push('/invest')}
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-400">chevron_left</span>
          </button>
          <h1 className="flex-1 text-center text-xl font-bold tracking-tight">Stock Hub</h1>
          <div className="w-10 shrink-0" />
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            className="w-full bg-slate-200/50 dark:bg-slate-800/50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500"
            placeholder="Search stocks..."
            type="text"
          />
        </div>
      </header>

      <main className="px-6 pb-12 space-y-10">

        {/* ── Section 1 : Stock Holdings ── */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-4">
            <h2 className="text-base font-bold tracking-tight">My Holdings</h2>
            <span className="text-xs font-semibold text-slate-400">
              Total: ${portfolio.stocks.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-3">
            {stockHoldings.map((h) => {
              const marketStock = MARKET.find(m => m.id === h.id)
              if (!marketStock) return null

              const currentVal = h.shares * marketStock.price
              const purchaseVal = h.shares * h.purchasePrice
              const pnl = currentVal - purchaseVal
              const pnlPct = ((marketStock.price - h.purchasePrice) / h.purchasePrice) * 100
              const positive = pnlPct >= 0

              return (
                <div
                  key={h.id}
                  onClick={() => router.push(`/invest/stocks-market/stocks-details?stockId=${h.id}`)}
                  className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full ${marketStock.iconBg} flex items-center justify-center shrink-0`}>
                    <span className={`material-icons-round ${marketStock.iconColor} text-xl`}>{marketStock.icon}</span>
                  </div>

                  {/* Name + shares */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{marketStock.name}</p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {h.shares % 1 === 0 ? h.shares : h.shares.toFixed(4)} shares
                    </p>
                  </div>

                  {/* Value + PnL */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">${currentVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <div className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${positive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'}`}>
                      <span className="material-symbols-outlined text-[13px]">{positive ? 'trending_up' : 'trending_down'}</span>
                      {positive ? '+' : ''}{pnlPct.toFixed(2)}% (${Math.abs(pnl).toFixed(2)})
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Section 2 : Discover & Buy ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold tracking-tight">Discover &amp; Buy</h2>
            <button
              onClick={() => setShowAll(v => !v)}
              className="text-xs font-bold text-primary dark:text-accent"
            >
              {showAll ? 'Show Less' : 'See All'}
            </button>
          </div>

          <div className="space-y-3">
            {(showAll ? MARKET : MARKET.slice(0, MARKET_PREVIEW)).map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-transform active:scale-[0.98]"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-full ${m.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-icons-round ${m.iconColor} text-xl`}>{m.icon}</span>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{m.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{m.symbol}</p>
                </div>

                {/* Price + change */}
                <div className="text-right shrink-0 mr-1">
                  <p className="text-sm font-bold">${m.price.toFixed(2)}</p>
                  <p className={`text-[11px] font-semibold ${m.up ? 'text-emerald-500' : 'text-rose-500'}`}>{m.change}</p>
                </div>

                {/* Buy CTA */}
                <button
                  onClick={() => router.push(`/invest/stocks-market/stocks-details?stockId=${m.id}`)}
                  className="shrink-0 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-primary/20 active:scale-95 transition-all"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
