'use client'
import { useRouter } from 'next/navigation'
import { useApp } from '@/hooks/useApp'

export default function GoldTokensPage() {
  const router = useRouter()
  const { portfolio, loading } = useApp()

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Gold Tokens...</div>
      </div>
    )
  }

  const goldPricePerGram = 62.25;
  const goldGrams = (portfolio.gold / goldPricePerGram).toFixed(0);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/invest')}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
        </button>
        <h1 className="font-display text-lg font-bold text-primary dark:text-white">Gold Tokens</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary dark:text-accent">info</span>
        </button>
      </header>

      <main className="px-6 pb-32" style={{ paddingBottom: '32px' }}>
        {/* Balance Hero */}
        <section className="mt-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 shadow-inner ring-4 ring-accent/5">
            <span className="material-symbols-outlined text-accent text-5xl font-bold">diamond</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{goldGrams} g</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">${portfolio.gold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
        </section>

        {/* Price Chart */}
        <section className="mt-8 glass-card rounded-3xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">XAU / USD</p>
              <p className="text-lg font-bold">
                $1,984.32{' '}
                <span className="text-emerald-500 text-xs ml-1 font-semibold">+0.42%</span>
              </p>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg">
              <button className="px-3 py-1 text-[10px] font-bold rounded-md bg-white dark:bg-slate-800 shadow-sm text-primary">1D</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400">1W</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400">1M</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400">1Y</button>
            </div>
          </div>
          <div className="relative rounded-2xl mb-2 flex items-end px-2">
            <svg className="w-full h-full" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={1} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path
                d="M0,120 Q50,110 80,130 T150,90 T230,100 T300,40 T400,20"
                fill="none"
                stroke="#D4AF37"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M0,120 Q50,110 80,130 T150,90 T230,100 T300,40 T400,20 V150 H0 Z"
                fill="url(#goldGradient)"
                opacity="0.1"
              />
            </svg>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mt-6 flex gap-3">
          <button
            onClick={() => router.push('/invest/gold-tokens/buy')}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            Buy
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens/sell')}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-4 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-primary dark:text-accent">sell</span>
            Sell
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens/redeem/amount')}
            className="flex-1 bg-premium-teal text-accent py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            Redeem
          </button>
        </section>

        {/* About Section */}
        <section className="mt-8">
          <h3 className="font-display text-xl text-slate-800 dark:text-white mb-4">About Gold Tokens</h3>
          <div className="glass-card p-5 rounded-2xl mb-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-xl">token</span>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Asset Composition</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Each token is 100% backed by physical gold.{' '}
                  <span className="text-slate-900 dark:text-white font-semibold">
                    1 Token = 1 Gram of 24k LBMA-certified physical gold.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary dark:text-accent text-lg">assured_workload</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vault Location</p>
              </div>
              <p className="font-semibold text-sm">Dubai, United Arab Emirates</p>
              <p className="text-[9px] text-slate-500 mt-1">High-Security Facility</p>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-500 text-lg">verified</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Audit Status</p>
              </div>
              <p className="font-semibold text-sm">Verified Monthly</p>
              <p className="text-[9px] text-emerald-500 font-bold mt-1">Last audit: 2 days ago</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
