'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../crypto'
import { useApp } from '@/hooks/useApp'

function CryptoReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, addCryptoHolding, updateFiatAccountBalance, addTransaction } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const cryptoId = searchParams?.get('cryptoId') || 'btc'
  const amountStr = searchParams?.get('amount') || '0'
  const accountId = searchParams?.get('accountId') || 'usd'

  const marketCrypto = MARKET.find(m => m.id === cryptoId) || MARKET[0]
  const cost = parseFloat(amountStr) || 0
  const cryptoAmount = cost / marketCrypto.price

  const activeAccount = fiatAccounts?.find((a) => a.id === accountId) || { id: 'usd', name: 'USD Account', currency: 'USD', balance: '$0.00' }
  let currencySymbol = '$'
  if (activeAccount.id === 'eur') currencySymbol = '€'
  else if (activeAccount.id === 'gbp') currencySymbol = '£'
  else if (activeAccount.id === 'chf') currencySymbol = 'CHF '

  const handleConfirm = async () => {
    setIsProcessing(true)
    try {
      await updateFiatAccountBalance(activeAccount.id, -cost)
      await addCryptoHolding(cryptoId, cryptoAmount, cost)
      await addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        type: 'crypto',
        description: `Bought ${marketCrypto.name}`,
        details: `${cryptoAmount.toFixed(5)} ${marketCrypto.symbol}`,
        amount: -cost,
        currency: activeAccount.currency,
        value: cost
      })
      router.push(`/invest/crypto-market/purchase-success?cryptoId=${cryptoId}&amount=${cost}&accountId=${activeAccount.id}`)
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
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
          <div className={`w-16 h-16 ${marketCrypto.iconBg} rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center mx-auto mb-3 shadow-sm`}>
            {marketCrypto.icon === 'currency_bitcoin' ? (
              <span className="text-3xl font-black text-[#F7931A]">₿</span>
            ) : marketCrypto.icon === 'currency_franc' ? (
              <span className="text-3xl font-black text-emerald-500">◎</span>
            ) : (
              <span className={`material-icons-round text-3xl ${marketCrypto.iconColor}`}>{marketCrypto.icon}</span>
            )}
          </div>
          <h2 className="text-2xl font-bold">{marketCrypto.name}</h2>
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
                <span className="text-slate-500 text-sm">Estimated Amount</span>
                <span className="font-semibold">{cryptoAmount.toFixed(6)} {marketCrypto.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">{marketCrypto.symbol} Price</span>
                <span className="font-semibold">${marketCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Asset</span>
                <span className="font-semibold">{marketCrypto.name}</span>
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
              Crypto purchases are executed at the current market price. The {marketCrypto.symbol} amount you receive may vary slightly due to real-time price changes.
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
            disabled={isProcessing}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function CryptoMarketReviewOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <CryptoReviewContent />
    </Suspense>
  )
}
