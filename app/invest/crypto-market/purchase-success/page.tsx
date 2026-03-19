'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../crypto'
import { useApp } from '@/hooks/useApp'

function CryptoSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts } = useApp()

  const cryptoId = searchParams?.get('cryptoId') || 'btc'
  const amountStr = searchParams?.get('amount') || '0'
  const accountId = searchParams?.get('accountId') || 'usd'

  const marketCrypto = MARKET.find(m => m.id === cryptoId) || MARKET[0]
  const cost = parseFloat(amountStr) || 0
  const cryptoAmount = cost / marketCrypto.price

  const activeAccount = fiatAccounts?.find((a) => a.id === accountId) || { id: 'usd', name: 'USD Account', currency: 'USD' }
  let currencySymbol = '$'
  if (activeAccount.id === 'eur') currencySymbol = '€'
  else if (activeAccount.id === 'gbp') currencySymbol = '£'
  else if (activeAccount.id === 'chf') currencySymbol = 'CHF '

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      <main className="flex-1 flex flex-col px-6">
        {/* Success Icon */}
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150" />
            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border-[3px] border-accent relative z-10">
              <span className="material-symbols-outlined text-accent text-5xl">check_circle</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Purchase Successful</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base">{marketCrypto.name} ({marketCrypto.symbol})</p>
        </div>

        {/* Receipt Card */}
        <div className="mt-10 relative">
          <div className="glass-card rounded-3xl p-6 shadow-xl relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-premium-teal dark:text-white">
                {currencySymbol}{cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg font-medium text-slate-400">{activeAccount.currency}</span>
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">{marketCrypto.symbol} Received</span>
                <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">{cryptoAmount.toFixed(6)} {marketCrypto.symbol}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">{marketCrypto.symbol} Price</span>
                <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">${marketCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">Date</span>
                <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">{today} • {time}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-sm text-slate-500">Transaction ID</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-premium-teal dark:text-slate-200">GF-{Math.floor(Math.random() * 10000)}-{marketCrypto.symbol}</span>
                  <button onClick={() => navigator.clipboard.writeText(`GF-${Math.floor(Math.random() * 10000)}-${marketCrypto.symbol}`)}>
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

        {/* Secured Badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-5 py-2.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            <span className="material-icons-round text-base">verified_user</span>
            <span className="text-xs font-bold uppercase tracking-wider">Secured via Welvaart</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto mb-8 space-y-4">
          <button
            onClick={() => router.push('/invest')}
            className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            View Portfolio
          </button>
          <button
            onClick={() => router.push('/invest/crypto-market')}
            className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold text-base active:opacity-60 transition-opacity"
          >
            Done
          </button>
        </div>
      </main>
    </div>
  )
}

export default function CryptoMarketPurchaseSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <CryptoSuccessContent />
    </Suspense>
  )
}
