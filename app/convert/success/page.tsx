'use client'
import React, { Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/crypto-market/crypto'

function ConvertSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, cryptoHoldings, portfolio } = useApp()

  const fromId = searchParams?.get('fromId') || 'usd'
  const toId = searchParams?.get('toId') || 'btc'
  const amountStr = searchParams?.get('amount') || '0'
  const convertedStr = searchParams?.get('converted') || '0'
  
  const amountNum = parseFloat(amountStr) || 0
  const convertedNum = parseFloat(convertedStr) || 0

  const AVAILABLE_ASSETS = useMemo(() => {
    const assets: any[] = []
    const fiatRates: Record<string, number> = { usd: 1, eur: 1.085, gbp: 1.27, chf: 1.12, aed: 0.272, cad: 0.741, jpy: 0.00667 }
    fiatAccounts?.forEach((acc) => {
      assets.push({ id: acc.id, symbol: acc.currency === 'Euro' ? 'EUR' : acc.currency === 'British Pound' ? 'GBP' : acc.currency === 'Swiss Franc' ? 'CHF' : acc.currency === 'UAE Dirham' ? 'AED' : acc.currency === 'Canadian Dollar' ? 'CAD' : acc.currency === 'Japanese Yen' ? 'JPY' : 'USD', name: acc.name, type: 'Fiat', rateToUSD: fiatRates[acc.id] || 1 })
    })

    const MARKET_MAP = MARKET.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as any)
    cryptoHoldings?.forEach((h) => {
      const mc = MARKET_MAP[h.id]
      if (mc) assets.push({ id: h.id, symbol: mc.symbol, name: mc.name, type: 'Crypto', rateToUSD: mc.price })
    })

    assets.push({ id: 'xau', symbol: 'XAU', name: 'Gold Token', type: 'Gold', rateToUSD: 62.5 })
    return assets
  }, [fiatAccounts, cryptoHoldings, portfolio])

  const from = AVAILABLE_ASSETS.find(a => a.id === fromId) || AVAILABLE_ASSETS[0]
  const to = AVAILABLE_ASSETS.find(a => a.id === toId) || AVAILABLE_ASSETS[1]
  
  if (!from || !to) return null

  const rate = to.rateToUSD / from.rateToUSD

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>
      <header className="px-6 pt-8 pb-4 flex flex-col items-center shrink-0 z-40">
        <div className="w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mb-6 border-2 border-accent">
          <span className="material-symbols-outlined text-accent text-5xl font-bold">check_circle</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-primary dark:text-white mb-2">Conversion Successful</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Your assets are now available in your wallet</p>
      </header>
      <main className="flex-1 px-6 pt-4 overflow-y-auto">
        <div className="receipt-card rounded-[32px] overflow-hidden">
          <div className="bg-primary/5 dark:bg-premium-teal/40 px-8 py-8 text-center border-b border-dashed border-slate-200 dark:border-slate-700">
            <h2 className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Transaction Receipt</h2>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-xs text-slate-400 font-medium">Received Amount</span>
              <div className="flex items-baseline gap-2 text-primary dark:text-white">
                <span className="text-3xl font-bold">{convertedNum < 0.000001 ? convertedNum.toExponential(4) : parseFloat(convertedNum.toFixed(6))}</span>
                <span className="text-xl font-medium">{to.symbol}</span>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Converted</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 text-right">{parseFloat(amountNum.toFixed(6))} {from.symbol}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Received</span>
                <span className="font-bold text-primary dark:text-accent text-right">{parseFloat(convertedNum.toFixed(6))} {to.symbol}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Exchange Rate</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-right">1 {from.symbol} = {rate < 0.0001 ? rate.toExponential(4) : parseFloat(rate.toFixed(6))} {to.symbol}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Total Fees</span>
                  <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-xs">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-2">
                  <span className="font-medium text-slate-400 uppercase tracking-wider">Transaction ID</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">GF-{Math.floor(1000000 + Math.random() * 9000000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-10 text-[11px] text-slate-400 text-center leading-relaxed px-10 italic">
          This digital receipt is a record of your successful transaction within the Welvaart multi-asset ecosystem.
        </p>
      </main>
      <div className="bg-white dark:bg-[#0D242B] border-t border-slate-100 dark:border-slate-800 px-6 pt-6 pb-10 shrink-0 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3">
          <button className="w-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/15 py-4 rounded-2xl text-primary dark:text-accent font-bold text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">share</span>
            <span>Share Receipt</span>
          </button>
          <button onClick={() => router.push('/')} className="w-full bg-premium-teal hover:bg-slate-900 py-4 rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ConvertSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <ConvertSuccessContent />
    </Suspense>
  )
}
