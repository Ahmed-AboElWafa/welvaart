'use client'
import React, { Suspense, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/crypto-market/crypto'

function ConvertReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, cryptoHoldings, portfolio, updateFiatAccountBalance, addCryptoHolding, updatePortfolio, addTransaction } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const fromId = searchParams?.get('fromId') || 'usd'
  const toId = searchParams?.get('toId') || 'btc'
  const amountStr = searchParams?.get('amount') || '0'
  const amountNum = parseFloat(amountStr) || 0

  const AVAILABLE_ASSETS = useMemo(() => {
    const assets: any[] = []
    const fiatRates: Record<string, number> = { usd: 1, eur: 1.085, gbp: 1.27, chf: 1.12, aed: 0.272, cad: 0.741, jpy: 0.00667 }
    fiatAccounts?.forEach((acc) => {
      assets.push({
        id: acc.id, symbol: acc.currency === 'Euro' ? 'EUR' : acc.currency === 'British Pound' ? 'GBP' : acc.currency === 'Swiss Franc' ? 'CHF' : acc.currency === 'UAE Dirham' ? 'AED' : acc.currency === 'Canadian Dollar' ? 'CAD' : acc.currency === 'Japanese Yen' ? 'JPY' : 'USD', name: acc.name, type: 'Fiat', rateToUSD: fiatRates[acc.id] || 1, balance: parseFloat((acc.balance || '0').replace(/د\.إ/g, '').replace(/[^0-9.]/g, '')) || 0, icon: acc.flag, iconBg: 'bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden', iconColor: 'text-slate-900', isUrl: true
      })
    })

    const MARKET_MAP = MARKET.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as any)
    cryptoHoldings?.forEach((h) => {
      const mc = MARKET_MAP[h.id]
      if (mc) {
        assets.push({
          id: h.id, symbol: mc.symbol, name: mc.name, type: 'Crypto', rateToUSD: mc.price, balance: h.amount, icon: mc.icon, iconBg: mc.iconBg, iconColor: mc.iconColor, isUrl: false
        })
      }
    })

    assets.push({
      id: 'xau', symbol: 'XAU', name: 'Gold Token', type: 'Gold', rateToUSD: 62.5, balance: portfolio?.gold ? portfolio.gold / 62.5 : 0, icon: 'award_star', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-500', isUrl: false
    })
    return assets
  }, [fiatAccounts, cryptoHoldings, portfolio])

  const from = AVAILABLE_ASSETS.find(a => a.id === fromId) || AVAILABLE_ASSETS[0]
  const to = AVAILABLE_ASSETS.find(a => a.id === toId) || AVAILABLE_ASSETS[1]

  if (!from || !to) return null

  const amountInUSD = amountNum * from.rateToUSD
  const converted = amountInUSD / to.rateToUSD
  const rate = to.rateToUSD / from.rateToUSD

  const handleConfirm = async () => {
    setIsProcessing(true)
    try {
      // Deduct From
      if (from.type === 'Fiat') {
        await updateFiatAccountBalance(from.id, -amountNum)
      } else if (from.type === 'Crypto') {
        await addCryptoHolding(from.id, -amountNum, 0)
      } else if (from.type === 'Gold') {
        await updatePortfolio({ ...portfolio!, gold: portfolio!.gold - amountInUSD })
      }

      // Add To
      if (to.type === 'Fiat') {
        await updateFiatAccountBalance(to.id, converted)
      } else if (to.type === 'Crypto') {
        await addCryptoHolding(to.id, converted, amountInUSD)
      } else if (to.type === 'Gold') {
        await updatePortfolio({ ...portfolio!, gold: portfolio!.gold + amountInUSD })
      }

      // Log Transaction
      await addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        type: from.type === 'Crypto' || to.type === 'Crypto' ? 'crypto' : 'fiat',
        description: `Converted ${from.symbol} to ${to.symbol}`,
        details: `${amountNum} ${from.symbol} → ${converted.toFixed(5)} ${to.symbol}`,
        amount: -amountNum,
        currency: from.symbol,
        value: -amountInUSD
      })

      router.push(`/convert/success?fromId=${from.id}&toId=${to.id}&amount=${amountNum}&converted=${converted}`)
    } catch (error) {
      console.error(error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>
      <header className="px-6 py-4 flex items-center shrink-0 z-40">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-display text-xl font-bold text-primary dark:text-white mr-10">Review Conversion</h1>
      </header>
      <main className="flex-1 px-6 pt-4 overflow-y-auto">
        <div className="receipt-card rounded-[32px] overflow-hidden">
          <div className="bg-primary/5 dark:bg-premium-teal/40 px-8 py-8 text-center border-b border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 bg-white dark:bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-primary/20">
              <span className="material-symbols-outlined text-primary dark:text-accent text-3xl">swap_horiz</span>
            </div>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Conversion Summary</h2>
            <div className="flex items-center justify-center gap-2 text-primary dark:text-white">
              <span className="text-3xl font-bold">{converted < 0.000001 ? converted.toExponential(4) : parseFloat(converted.toFixed(4))}</span>
              <span className="text-xl font-medium">{to.symbol}</span>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sell</p>
                <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{parseFloat(amountNum.toFixed(6))} {from.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Buy</p>
                <p className="font-bold text-lg text-primary dark:text-accent">{parseFloat(converted.toFixed(6))} {to.symbol}</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Exchange Rate</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">1 {from.symbol} = {rate < 0.0001 ? rate.toExponential(4) : parseFloat(rate.toFixed(6))} {to.symbol}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Fees</span>
                <span className="text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Zero Internal Fees</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="font-bold text-slate-900 dark:text-white">Total Value</span>
                <span className="font-bold text-slate-900 dark:text-white text-lg">${amountInUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 bg-slate-100 dark:bg-slate-800/50 w-fit mx-auto px-4 py-2 rounded-full">
          <span className="material-symbols-outlined text-lg animate-pulse">timer</span>
          <span className="text-sm font-medium">Rate expires in <span className="text-primary dark:text-accent font-bold">12s</span></span>
        </div>
        <p className="mt-8 text-[11px] text-slate-400 text-center leading-relaxed px-4">
          By confirming, you agree to Welvaart's multi-asset exchange terms. Prices are locked until the timer expires.
        </p>
      </main>
      <footer className="px-6 pt-6 pb-10 mt-4">
        <div className="flex items-center justify-center gap-2 mb-4 text-primary dark:text-accent">
          <span className="material-symbols-outlined text-lg">fingerprint</span>
          <span className="text-xs font-semibold">Biometric Authentication Required</span>
        </div>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Confirm Conversion'}
          {!isProcessing && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
        </button>
      </footer>
    </div>
  )
}

export default function ConvertReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <ConvertReviewContent />
    </Suspense>
  )
}
