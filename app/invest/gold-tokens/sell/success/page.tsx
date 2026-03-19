'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function GoldTokensSellSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amountStr = searchParams?.get('amount') || '0'
  const amount = parseFloat(amountStr)
  const proceeds = amount * 62.25

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex justify-end items-center shrink-0">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary dark:text-accent text-xl">share</span>
        </button>
      </header>

      <main className="px-6 flex-1 flex flex-col">
        {/* Success icon */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-accent/5">
            <span className="material-symbols-outlined text-accent text-5xl">check_circle</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-premium-teal dark:text-white mb-2">Sale Successful</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Your gold tokens have been sold and funds are being processed.
          </p>
        </div>

        {/* Receipt card */}
        <div className="mt-10 relative">
          <div className="glass-card rounded-3xl p-6 shadow-xl relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Total Received</p>
              <p className="text-3xl font-bold text-premium-teal dark:text-white">
                ${proceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg font-medium text-slate-400">USD</span>
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">Asset Sold</span>
                <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">{amount.toFixed(2)} g Gold Tokens</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">Date</span>
                <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">Oct 24, 2023</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">Transaction ID</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">GF-99283415</span>
                  <button onClick={() => navigator.clipboard.writeText('GF-99283415')}>
                    <span className="material-symbols-outlined text-xs text-slate-300 cursor-pointer">content_copy</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-slate-500">Status</span>
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Completed
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-1 left-4 right-4 h-4 bg-white/50 dark:bg-slate-800/50 rounded-b-2xl -z-10" />
        </div>

        {/* Actions */}
        <div className="mt-auto mb-8 space-y-4">
          <button onClick={() => router.push('/invest')} className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2">
            Go to Portfolio
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens')}
            className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold text-base active:opacity-60 transition-opacity"
          >
            Done
          </button>
        </div>
      </main>
    </div>
  )
}

export default function GoldTokensSellSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-premium-teal font-bold">Loading...</div></div>}>
      <GoldTokensSellSuccessContent />
    </Suspense>
  )
}
