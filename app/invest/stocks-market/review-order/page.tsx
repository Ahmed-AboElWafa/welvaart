'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../stocks'
import { useApp } from '@/hooks/useApp'

function StocksMarketReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, addTransaction, updateFiatAccountBalance, addStockHolding } = useApp()
  const [loading, setLoading] = useState(false)

  const stockId = searchParams?.get('stockId') || 'aapl'
  const amountStr = searchParams?.get('amount') || '0'
  const accountId = searchParams?.get('accountId') || 'usd'

  const marketStock = MARKET.find(m => m.id === stockId) || MARKET[0]
  const cost = parseFloat(amountStr) || 0
  const shares = cost / marketStock.price

  const activeAccount = fiatAccounts?.find((a) => a.id === accountId) || { id: 'usd', name: 'USD Account', currency: 'USD', balance: '$0.00' }
  let currencySymbol = '$'
  if (activeAccount.id === 'eur') currencySymbol = '€'
  else if (activeAccount.id === 'gbp') currencySymbol = '£'
  else if (activeAccount.id === 'chf') currencySymbol = 'CHF '

  const handleConfirm = async () => {
    setLoading(true)
    try {
      // 1. Add Stock Holding & Portfolio Value
      await addTransaction({
        id: Date.now().toString() + '-stock-buy',
        date: new Date().toISOString(),
        type: 'stocks',
        description: `Bought ${marketStock.symbol}`,
        details: `${shares.toFixed(5)} Shares at ${currencySymbol}${marketStock.price}`,
        amount: shares,
        currency: 'STOCKS',
        value: cost,
      })
      await addStockHolding(stockId, shares, cost)

      // 2. Subtract Fiat
      await addTransaction({
        id: Date.now().toString() + '-fiat-sub',
        date: new Date().toISOString(),
        type: 'fiat',
        description: `Stock Purchase Cost`,
        details: `${activeAccount.name}`,
        amount: -cost,
        currency: activeAccount.currency,
        value: -cost,
      })
      await updateFiatAccountBalance(accountId, -cost)

      router.push(`/invest/stocks-market/purchase-success?stockId=${stockId}&amount=${amountStr}&accountId=${accountId}`)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-400">chevron_left</span>
          </button>
          <h1 className="text-lg font-bold">Review Order</h1>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 2 of 2</div>
      </header>

      <main className="flex-1 flex flex-col px-6">
        {/* Asset Badge */}
        <section className="mt-4 mb-8 text-center">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-3 shadow-sm text-3xl">
            {marketStock.symbol.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold">{marketStock.name}</h2>
          <p className="text-slate-500 text-sm">Buy Order Confirmation</p>
        </section>

        {/* Order Details */}
        <section className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
              <span className="text-slate-500 font-medium">Total Cost</span>
              <span className="text-2xl font-bold">{currencySymbol}{cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Estimated Shares</span>
                <span className="font-semibold">{shares.toFixed(5)} {marketStock.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Market Price</span>
                <span className="font-semibold">${marketStock.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Transaction Fee</span>
                <span className="font-semibold text-emerald-500">Free</span>
              </div>
            </div>
          </div>

          {/* Funding Source */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">Funding Source</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-accent">account_balance_wallet</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{activeAccount.name}</p>
                <p className="text-xs text-slate-500">Balance: {activeAccount.balance}</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 px-2 py-2">
            <span className="material-icons-round text-slate-400 text-lg">info</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              This order will be executed at the best available market price. Estimated shares may vary slightly based on price fluctuations at the time of execution.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-auto mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-base">face</span>
            <p className="text-slate-500 text-xs font-medium">Biometric Authentication Required</p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function StocksMarketReviewOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <StocksMarketReviewContent />
    </Suspense>
  )
}
