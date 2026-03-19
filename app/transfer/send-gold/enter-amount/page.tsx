'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']
const GOLD_PRICE_PER_GRAM = 62.25

function SendGoldEnterAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { portfolio, loading } = useApp()
  const [amount, setAmount] = useState('0')
  const [note, setNote] = useState('')

  const rName = searchParams?.get('name') || ''
  const rHandle = searchParams?.get('handle') || ''
  const rAvatar = searchParams?.get('avatar') || ''

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

  const usdValueNum = parseFloat(amount || '0') * GOLD_PRICE_PER_GRAM
  const usdValue = usdValueNum.toFixed(2)

  const goldGrams = portfolio ? (portfolio.gold / GOLD_PRICE_PER_GRAM).toFixed(0) : '0'
  const isInvalid = !portfolio || parseFloat(amount || '0') <= 0 || parseFloat(amount || '0') > parseFloat(goldGrams)

  return (
    <div className="w-full max-w-[430px] h-screen flex flex-col bg-background-light dark:bg-background-dark shadow-xl relative overflow-hidden mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Gold</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Progress Stepper */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 2 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Amount &amp; Note</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-2 rounded-xl p-5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-sm font-medium">Gold Token Balance</p>
            <span className="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold leading-tight dark:text-white">{goldGrams}g</p>
            <p className="text-primary text-sm font-medium">≈ ${portfolio?.gold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Amount Entry */}
      <main className="flex-1 flex flex-col px-4 overflow-y-auto">
        <div className="flex flex-col items-center py-6">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-[42px] font-extrabold tracking-tighter text-slate-800 dark:text-white">
                {amount}
              </span>
              <span className="text-2xl font-bold text-slate-400">g</span>
            </div>
            <div className="flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-primary/5 border border-primary/20">
              {/* <span className="material-symbols-outlined text-sm text-primary">swap_vert</span> */}
              <span className="text-primary font-bold text-sm">${usdValue}</span>
            </div>
          </div>
        </div>

        {/* Transfer Note */}
        <div className="mt-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Transfer Note
          </label>
          <div className="relative flex items-center">
            <input
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-4 px-5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-medium outline-none"
              placeholder="What's this for?"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <span className="material-symbols-outlined absolute right-4 text-slate-400">edit_note</span>
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="mt-auto pt-6 pb-2">
          <div className="grid grid-cols-3 gap-2">
            {KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className="h-14 flex items-center justify-center text-2xl font-bold rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
              >
                {key === 'backspace' ? (
                  <span className="material-symbols-outlined font-bold text-primary">backspace</span>
                ) : (
                  key
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="p-6 pb-10 bg-background-light dark:bg-background-dark">
        <button
          disabled={isInvalid || loading}
          onClick={() => router.push(`/transfer/send-gold/review?amount=${amount}&name=${encodeURIComponent(rName)}&handle=${encodeURIComponent(rHandle)}&avatar=${encodeURIComponent(rAvatar)}`)}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Review Transaction</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </footer>
    </div>
  )
}

export default function SendGoldEnterAmountPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <SendGoldEnterAmountContent />
    </Suspense>
  )
}
