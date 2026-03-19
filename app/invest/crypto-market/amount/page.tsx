'use client'
import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '../crypto'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function CryptoAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts } = useApp()

  const cryptoId = searchParams?.get('cryptoId') || 'btc'
  const marketCrypto = MARKET.find(m => m.id === cryptoId) || MARKET[0]

  const [amount, setAmount] = useState('0')
  const [isCryptoMode, setIsCryptoMode] = useState(false)   // false = USD, true = Asset

  const [accountId, setAccountId] = useState('usd')
  const [showAccPicker, setShowAccPicker] = useState(false)

  const activeAccount = fiatAccounts?.find((a) => a.id === accountId) || { id: 'usd', name: 'USD Account', currency: 'USD', balance: '$0.00', flag: '🇺🇸', symbol: '$' }
  const activeBalance = parseFloat(activeAccount.balance.replace(/د\.إ/g, '').replace(/[^0-9.]/g, '')) || 0
  let currencySymbol = '$'
  if (activeAccount.id === 'eur') currencySymbol = '€'
  else if (activeAccount.id === 'gbp') currencySymbol = '£'
  else if (activeAccount.id === 'chf') currencySymbol = 'CHF '

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
  const usdValue = isCryptoMode ? amountNum * marketCrypto.price : amountNum
  const cryptoValue = isCryptoMode ? amountNum : amountNum / marketCrypto.price

  const handleToggle = () => {
    // convert current amount to opposite unit
    const converted = isCryptoMode
      ? (amountNum * marketCrypto.price).toFixed(2)
      : (amountNum / marketCrypto.price).toFixed(6)
    setAmount(String(parseFloat(converted)))
    setIsCryptoMode(v => !v)
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
          <h1 className="text-lg font-bold">Buy {marketCrypto.name}</h1>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 1 of 2</div>
      </header>

      <main className="flex-1 flex flex-col px-6">

        <div className="flex flex-col items-center mt-6">
          <div className={`w-20 h-20 rounded-3xl ${marketCrypto.iconBg} border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 shadow-xl`}>
            {marketCrypto.icon === 'currency_bitcoin' ? (
              <span className="text-4xl font-black text-[#F7931A]">₿</span>
            ) : marketCrypto.icon === 'currency_franc' ? (
              <span className="text-4xl font-black text-emerald-500">◎</span>
            ) : (
              <span className={`material-icons-round text-4xl ${marketCrypto.iconColor}`}>{marketCrypto.icon}</span>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">{marketCrypto.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="text-xs font-black bg-primary/10 dark:bg-accent/20 px-2 py-0.5 rounded text-primary dark:text-accent tracking-widest">{marketCrypto.symbol}</span>
              <span className="text-xs font-semibold text-slate-400">${marketCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-6">
          <div className="flex items-center justify-center gap-2">
            {!isCryptoMode && <span className="text-3xl font-bold text-primary dark:text-accent">{currencySymbol}</span>}
            <span className="text-7xl font-bold tracking-tighter text-primary dark:text-white">{amount}</span>
            {isCryptoMode && <span className="text-2xl font-bold text-slate-400 mt-3">{marketCrypto.symbol}</span>}
          </div>

          {/* Equivalent + toggle */}
          <div className="mt-5 flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
              {isCryptoMode ? (
                <p className="text-sm font-semibold text-slate-500">
                  ≈ <span className="text-primary dark:text-white font-bold">{currencySymbol}{usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span> {activeAccount.currency}
                </p>
              ) : (
                <p className="text-sm font-semibold text-slate-500">
                  ≈ <span className="text-primary dark:text-white font-bold">{cryptoValue.toFixed(6)}</span> {marketCrypto.symbol}
                </p>
              )}
            </div>
            <button
              onClick={handleToggle}
              className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent flex items-center justify-center active:scale-95 transition-transform"
              title="Switch USD / BTC"
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

        <div className="mb-8 space-y-4">
          <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-accent text-xl">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Funding Account</p>
                <p className="text-base font-bold text-premium-teal dark:text-white">
                  {activeAccount.balance} <span className="text-slate-400 font-medium text-xs">{activeAccount.name}</span>
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
            onClick={() => router.push(`/invest/crypto-market/review-order?cryptoId=${cryptoId}&amount=${usdValue}&accountId=${activeAccount.id}`)}
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
              {fiatAccounts?.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => { setAccountId(acc.id); setShowAccPicker(false) }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${accountId === acc.id
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
                  {accountId === acc.id && (
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CryptoMarketAmountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <CryptoAmountContent />
    </Suspense>
  )
}
