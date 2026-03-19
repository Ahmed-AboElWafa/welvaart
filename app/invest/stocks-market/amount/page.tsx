'use client'
import React, { useState, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../stocks'
import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function StocksMarketAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts, loading } = useApp()

  const stockId = searchParams?.get('stockId') || 'aapl'
  const marketStock = MARKET.find(m => m.id === stockId) || MARKET[0]

  const [amount, setAmount] = useState('0')
  const [isSharesMode, setIsSharesMode] = useState(false)   // false = USD, true = Shares
  const [account, setAccount] = useState(fiatAccounts?.[0] || { id: 'usd', label: 'USD Account', currency: 'USD', balance: '0', symbol: '$', flag: '🇺🇸' })
  const [showAccPicker, setShowAccPicker] = useState(false)

  // Ensure default account is set once fiatAccounts load
  useEffect(() => {
    if (fiatAccounts && fiatAccounts.length > 0) {
      setAccount(prev => fiatAccounts.find(a => a.id === prev.id) || fiatAccounts[0])
    }
  }, [fiatAccounts])

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && amount.includes('.')) {
      return
    } else if (amount === '0' && key !== '.') {
      setAmount(key)
    } else {
      setAmount(prev => prev + key)
    }
  }

  const amountNum = parseFloat(amount) || 0
  const usdValue = isSharesMode ? amountNum * marketStock.price : amountNum
  const sharesValue = isSharesMode ? amountNum : amountNum / marketStock.price

  const handleToggle = () => {
    const converted = isSharesMode
      ? (amountNum * marketStock.price).toFixed(2)
      : (amountNum / marketStock.price).toFixed(5)
    setAmount(String(parseFloat(converted)))
    setIsSharesMode(v => !v)
  }

  const parseBalance = (balStr: string) => parseFloat(balStr.replace(/د\.إ/g, '').replace(/[^0-9.-]+/g, '')) || 0;
  const activeBalance = account && account.balance ? parseBalance(account.balance) : 0;
  
  let currencySymbol = '$'
  if (account.id === 'eur') currencySymbol = '€'
  else if (account.id === 'gbp') currencySymbol = '£'
  else if (account.id === 'chf') currencySymbol = 'CHF '

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full" />

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-400">chevron_left</span>
          </button>
          <h1 className="text-lg font-bold">Buy Stock</h1>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 1 of 2</div>
      </header>

      <main className="flex-1 flex flex-col px-6">

        {/* Asset Badge */}
        <div className="flex flex-col items-center mt-6">
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 p-4 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 text-4xl">
            {marketStock.symbol.charAt(0)}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">{marketStock.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="text-xs font-black bg-primary/10 dark:bg-accent/20 px-2 py-0.5 rounded text-primary dark:text-accent tracking-widest">{marketStock.symbol}</span>
              <span className="text-xs font-semibold text-slate-400">${marketStock.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Amount Display */}
        <div className="flex-1 flex flex-col justify-center items-center py-6">
          <div className="flex items-center justify-center gap-2">
            {!isSharesMode && <span className="text-3xl font-bold text-primary dark:text-accent">{currencySymbol}</span>}
            <span className="text-7xl font-bold tracking-tighter text-primary dark:text-white">{amount}</span>
            {isSharesMode && <span className="text-2xl font-bold text-slate-400 mt-3">Shares</span>}
          </div>

          {/* Equivalent + toggle */}
          <div className="mt-5 flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
              {isSharesMode ? (
                <p className="text-sm font-semibold text-slate-500">
                  ≈ <span className="text-primary dark:text-white font-bold">{currencySymbol}{usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> {account.id.toUpperCase()}
                </p>
              ) : (
                <p className="text-sm font-semibold text-slate-500">
                  ≈ <span className="text-primary dark:text-white font-bold">{sharesValue.toFixed(5)}</span> shares
                </p>
              )}
            </div>
            <button
              onClick={handleToggle}
              className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent flex items-center justify-center active:scale-95 transition-transform"
              title="Switch USD / Shares"
            >
              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
            </button>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-y-1 mb-6">
          {KEYS.map(key => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="h-14 flex items-center justify-center text-2xl font-semibold rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors text-slate-800 dark:text-slate-100"
            >
              {key === 'backspace'
                ? <span className="material-icons-round text-2xl text-primary">backspace</span>
                : key}
            </button>
          ))}
        </div>

        {/* Buying Power + CTA */}
        <div className="mb-8 space-y-4">
          <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-accent text-xl">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Funding Account</p>
                <p className="text-base font-bold text-premium-teal dark:text-white">
                  {account.balance} <span className="text-slate-400 font-medium text-xs">{account.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAccPicker(true)}
              className="text-[10px] font-bold text-primary dark:text-accent uppercase tracking-wider bg-primary/5 dark:bg-accent/10 px-3 py-1.5 rounded-lg border border-primary/10 dark:border-accent/20 active:scale-95 transition-transform flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
              Switch
            </button>
          </div>

          <button
            onClick={() => router.push(`/invest/stocks-market/review-order?stockId=${stockId}&amount=${usdValue}&accountId=${account.id}`)}
            disabled={usdValue <= 0 || usdValue > activeBalance}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Review Buy Order
            <span className="material-icons-round text-lg">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* ── Account Picker Bottom Sheet ── */}
      {showAccPicker && (
        <div className="fixed inset-0 z-[80] flex flex-col justify-end" onClick={() => setShowAccPicker(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div
            className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-12"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="text-lg font-bold text-primary dark:text-white">Select Account</h2>
              <button onClick={() => setShowAccPicker(false)} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>
            <div className="px-4 space-y-3">
              {fiatAccounts?.map(acc => {
                let sym = '$'
                if (acc.id === 'eur') sym = '€'
                else if (acc.id === 'gbp') sym = '£'
                else if (acc.id === 'chf') sym = 'CHF '

                return (
                <button
                  key={acc.id}
                  onClick={() => { setAccount(acc); setShowAccPicker(false) }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${account.id === acc.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'
                    }`}
                >
                  <div className="size-12 rounded-2xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    {acc.flag?.startsWith('http') ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={acc.flag} alt={acc.name} className="w-full h-full object-cover" />
                    ) : (
                      acc.flag || '💳'
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{acc.name}</p>
                    <p className="text-xs text-slate-500">{acc.balance} available</p>
                  </div>
                  {account.id === acc.id && (
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                  )}
                </button>
              )})}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function StocksMarketAmountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <StocksMarketAmountContent />
    </Suspense>
  )
}
