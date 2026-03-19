'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'

function GoldTokensBuyReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, addTransaction, updateFiatAccountBalance } = useApp()
  const [loading, setLoading] = useState(false)

  const amountStr = searchParams?.get('amount') || '0'
  const accountId = searchParams?.get('accountId') || 'usd'
  const amount = parseFloat(amountStr)
  const cost = amount * 65.45

  const activeAccount = fiatAccounts?.find((a) => a.id === accountId) || { name: 'USD Account', currency: 'USD' }

  let currencySymbol = '$'
  if (accountId === 'eur') currencySymbol = '€'
  else if (accountId === 'gbp') currencySymbol = '£'
  else if (accountId === 'chf') currencySymbol = 'CHF '

  const handleConfirm = async () => {
    setLoading(true)
    try {
      // 1. Add Gold
      await addTransaction({
        id: Date.now().toString() + '-gold-buy',
        date: new Date().toISOString(),
        type: 'gold',
        description: 'Bought Gold Tokens',
        details: 'Market Purchase',
        amount: amount,
        currency: 'GOLD',
        value: amount * 62.25,
      })
      // 2. Subtract Fiat from total portfolio
      await addTransaction({
        id: Date.now().toString() + '-fiat-sub',
        date: new Date().toISOString(),
        type: 'fiat',
        description: 'Gold Purchase Cost',
        details: `${activeAccount.name}`,
        amount: -cost,
        currency: activeAccount.currency,
        value: -cost,
      })
      // 3. Subtract Fiat directly from specific wallet string balance
      await updateFiatAccountBalance(accountId, -cost)

      router.push(`/invest/gold-tokens/buy/success?amount=${amountStr}&accountId=${accountId}`)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shrink-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
        </button>
        <h1 className="font-display text-lg font-bold text-premium-teal dark:text-white">Review Purchase</h1>
        <div className="w-10" />
      </header>

      <main className="px-6 flex-1 flex flex-col">
        {/* Amount summary */}
        <div className="mt-8 mb-10 text-center bg-slate-50 dark:bg-slate-800/50 py-6 rounded-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">You are buying</p>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-premium-teal dark:text-white">{amountStr}</span>
              <span className="text-xl font-semibold text-accent">g</span>
            </div>
            <div className="mt-2 text-slate-500 dark:text-slate-400 font-medium text-lg">
              for <span className="text-premium-teal dark:text-white font-bold">{currencySymbol}{cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {accountId.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div className="glass-card rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm font-medium">Asset</span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent text-[12px] font-bold">database</span>
              </div>
              <span className="text-premium-teal dark:text-white font-semibold text-sm">Gold Token</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-5">
            <span className="text-slate-400 text-sm font-medium">Market Price</span>
            <span className="text-premium-teal dark:text-white font-semibold text-sm">$2,042.50 / oz</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-5">
            <span className="text-slate-400 text-sm font-medium">Payment Method</span>
            <span className="text-premium-teal dark:text-white font-semibold text-sm">{activeAccount.name}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-5">
            <span className="text-slate-400 text-sm font-medium">Transaction Fee</span>
            <span className="text-emerald-500 font-bold text-sm">$0.00</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-5">
            <span className="text-slate-400 text-sm font-bold">Total Cost</span>
            <span className="text-premium-teal dark:text-white font-bold text-lg leading-none">{currencySymbol}{cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="mt-auto mb-8 space-y-4">
          <div className="flex items-center gap-3 px-2 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <span className="material-symbols-outlined text-slate-400 text-lg">info</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Prices are locked for 60 seconds. Final settlement may vary slightly based on network conditions.
            </p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <span className="material-symbols-outlined text-accent text-xl">lock</span>
                Confirm Purchase
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function GoldTokensBuyReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <GoldTokensBuyReviewContent />
    </Suspense>
  )
}
