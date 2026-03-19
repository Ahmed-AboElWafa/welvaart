'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

export default function GoldTokensRedeemAmountPage() {
  const router = useRouter()
  const { portfolio, loading } = useApp()
  const [amount, setAmount] = useState('0')

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && amount.includes('.')) {
      return
    } else if (amount === '0' && key !== '.') {
      setAmount(key)
    } else {
      setAmount((prev) => prev + key)
    }
  }

  const usdValue = (parseFloat(amount || '0') * 62.25).toFixed(2)

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-pulse text-primary font-bold">Loading...</div>
      </div>
    )
  }
  const goldPricePerGram = 62.25;
  const goldGrams = (portfolio.gold / goldPricePerGram).toFixed(0);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
          </button>
          <h1 className="font-display text-lg text-primary dark:text-white">Redeem Physical Gold</h1>
          <div className="w-10" />
        </div>
        {/* Step indicators */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-1 rounded-full bg-accent" />
          <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step 1 of 3: Select Amount</p>
      </header>

      <main className="flex-1 px-6 flex flex-col">
        {/* Amount Display */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Select Quantity
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold tracking-tight dark:text-white">{amount}</span>
            <span className="text-2xl font-semibold text-accent">g</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">≈ ${usdValue} USD</p>
        </div>

        {/* Info Cards */}
        <div className="mt-10 space-y-3">
          <div className="glass-card p-4 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-accent/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-accent">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Balance</p>
                <p className="font-semibold text-sm dark:text-white">{goldGrams} g</p>
              </div>
            </div>
            <button
              onClick={() => setAmount(goldGrams.toString())}
              className="text-xs font-bold text-primary dark:text-accent"
            >
              MAX
            </button>
          </div>
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">info</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Minimum Redemption</p>
              <p className="font-semibold text-sm dark:text-white">
                10.00 g <span className="text-[10px] font-normal text-slate-500 ml-1">(LBMA Standard)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Keypad */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-y-2 gap-x-4">
            {KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className="h-14 flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-slate-200 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
              >
                {key === 'backspace' ? (
                  <span className="material-symbols-outlined font-bold text-primary dark:text-accent">backspace</span>
                ) : (
                  key
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => router.push('/invest/gold-tokens/redeem/location?amount=' + amount)}
            className="w-full bg-premium-teal text-accent py-4 mt-6 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Continue
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  )
}
