'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']
const GOLD_SELL_PRICE = 62.25  // USD per gram

export default function GoldTokensSellPage() {
  const router = useRouter()
  const { portfolio, loading } = useApp()
  const [amount, setAmount] = useState('0')

  const maxGrams = portfolio ? Math.round(portfolio.gold / GOLD_SELL_PRICE) : 0


  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && amount.includes('.')) {
      return
    } else if (amount === '0' && key !== '.') {
      setAmount(key)
    } else {
      setAmount(prev => prev + key)
    }
  }

  const amountNum = parseFloat(amount) || 0
  const proceeds = (amountNum * GOLD_SELL_PRICE).toFixed(2)


  if (loading || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-pulse text-premium-teal font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full" />

      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shrink-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
        </button>
        <h1 className="font-display text-lg font-bold text-premium-teal dark:text-white">Sell Gold Tokens</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary dark:text-accent text-xl">info</span>
        </button>
      </header>

      <main className="px-6 flex-1 flex flex-col">
        {/* Price ticker */}
        <div className="mt-2 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Current Selling Price</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold text-premium-teal dark:text-accent">$1,984.32 / oz</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span>
              0.42%
            </span>
          </div>
        </div>

        {/* Amount display — grams only */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-bold tracking-tight text-premium-teal dark:text-white">{amount}</span>
            <span className="text-2xl font-semibold text-slate-400">g</span>
          </div>

          {/* Info cards */}
          <div className="mt-10 w-full space-y-4">
            {/* Gold token balance */}
            <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent text-xl">database</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Gold Token Balance</p>
                  <p className="text-base font-bold text-premium-teal dark:text-white">{maxGrams} g</p>
                </div>
              </div>
              <button
                onClick={() => setAmount(String(maxGrams))}
                className="text-xs font-bold text-primary dark:text-accent bg-primary/5 dark:bg-accent/10 px-3 py-2 rounded-lg uppercase tracking-wider active:opacity-70"
              >
                Sell Max
              </button>
            </div>

            {/* Estimated Proceeds */}
            <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Estimated Proceeds</p>
                  <p className="text-base font-bold text-premium-teal dark:text-white">
                    ${proceeds}{' '}
                    <span className="text-slate-400 font-medium text-xs">to USD Account</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-auto pt-8 grid grid-cols-3 gap-y-1">
          {KEYS.map(key => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="h-14 flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-slate-200 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
            >
              {key === 'backspace'
                ? <span className="material-symbols-outlined text-primary dark:text-accent">backspace</span>
                : key}
            </button>
          ))}
        </div>

        <div className="mt-6 mb-8">
          <button
            onClick={() => router.push(`/invest/gold-tokens/sell/review?amount=${amount}`)}
            disabled={amountNum <= 0}
            className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Review Sale
            <span className="material-symbols-outlined text-accent">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  )
}
