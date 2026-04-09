'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'
import { CURRENCIES } from '../currencies'

function FiatSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useApp()
  const currencyCode = searchParams?.get('currency') || 'GBP'
  const currencyDetails = CURRENCIES[currencyCode] || CURRENCIES['GBP']

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-accent/10 rounded-full scale-150 blur-xl" />
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl border border-accent/20 relative z-10">
              <span className="material-symbols-outlined text-accent text-6xl">check_circle</span>
            </div>
          </div>
          <h1 className="font-display text-3xl text-primary dark:text-white mb-2">Success!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{currencyDetails.name} Account Active</p>
        </div>

        {/* Account Card */}
        <div className="w-full glass-card rounded-[32px] overflow-hidden shadow-2xl relative">
          <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    alt={`${currencyDetails.code} Flag`}
                    className="w-full h-full object-cover"
                    src={currencyDetails.flag}
                  />
                </div>
                <span className="font-bold text-slate-400 tracking-widest text-sm uppercase">GlobalFin</span>
              </div>
              <span className="material-symbols-outlined text-slate-300">contactless</span>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Account Holder</p>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">{user?.name || 'Alex Sterling'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Currency</p>
                  <p className="text-base font-semibold text-slate-800 dark:text-white">{currencyCode} ({currencyDetails.symbol})</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">Ready for use</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </main>

      {/* Inline Footer */}
      <footer className="px-6 pb-10 space-y-3">
        <button
          onClick={() => router.push('/fiat')}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">account_balance</span>
          View Account
        </button>
        <button onClick={() => router.push('/home')} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-primary font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
          Done
        </button>
      </footer>
    </div>
  )
}

export default function FiatSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <FiatSuccessContent />
    </Suspense>
  )
}
