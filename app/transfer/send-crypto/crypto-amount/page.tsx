'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/crypto-market/crypto'

const GAS_FEES: Record<string, number> = {
  btc: 0.000008, eth: 0.00042, sol: 0.000025,
  usdt: 0, usdc: 0
}
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function CryptoAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cryptoHoldings } = useApp()

  const rName   = searchParams?.get('name') || 'GlobalFin User'
  const rHandle = searchParams?.get('handle') || '@username'
  const rAvatar = searchParams?.get('avatar') || ''

  // Build dynamic crypto list from user's holdings + market data
  const CRYPTOS = useMemo(() => {
    if (!cryptoHoldings) return []
    const marketMap = MARKET.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as any)
    return cryptoHoldings.map(h => {
      const mc = marketMap[h.id]
      return {
        id: h.id,
        symbol: mc?.symbol || h.id.toUpperCase(),
        name: mc?.name || h.id.toUpperCase(),
        balance: h.amount,
        rate: mc?.price || h.purchasePrice,
        icon: mc?.icon || 'currency_bitcoin',
        iconBg: mc?.iconBg || 'bg-primary/10',
        iconColor: mc?.iconColor || 'text-primary',
        gasFee: GAS_FEES[h.id] ?? 0,
      }
    })
  }, [cryptoHoldings])

  const [amount, setAmount] = useState('0')
  const [selectedCrypto, setSelectedCrypto] = useState<typeof CRYPTOS[0] | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [isUsdMode, setIsUsdMode] = useState(false)

  const crypto = selectedCrypto || CRYPTOS[0]

  const handleKey = (key: string) => {
    if (key === 'backspace') setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
    else if (key === '.' && amount.includes('.')) return
    else if (amount === '0' && key !== '.') setAmount(key)
    else setAmount(prev => prev + key)
  }

  const amountNum = parseFloat(amount) || 0
  const cryptoQty = isUsdMode ? amountNum / (crypto?.rate || 1) : amountNum
  const usdValue  = isUsdMode ? amountNum : amountNum * (crypto?.rate || 1)
  const gasFee = crypto?.gasFee || 0
  const totalCrypto = (cryptoQty + gasFee).toFixed(6)
  const gasFeeUsd = (gasFee * (crypto?.rate || 1)).toFixed(4)

  const handleSwitch = () => {
    if (!crypto) return
    const converted = isUsdMode
      ? (amountNum / crypto.rate).toFixed(6)
      : (amountNum * crypto.rate).toFixed(2)
    setAmount(String(parseFloat(converted)))
    setIsUsdMode(v => !v)
  }

  const handleSelectCrypto = (c: typeof CRYPTOS[0]) => {
    setSelectedCrypto(c)
    setAmount('0')
    setIsUsdMode(false)
    setShowPicker(false)
  }

  const canProceed = crypto && cryptoQty > 0 && cryptoQty <= crypto.balance

  if (CRYPTOS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <p className="text-slate-500 text-sm font-medium">You have no crypto holdings to send.</p>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[430px] mx-auto flex-col bg-background-light dark:bg-background-dark">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button onClick={() => router.back()} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Crypto</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Recipient mini-badge */}
      <div className="px-6 pb-2 flex items-center gap-2">
        {rAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={rAvatar} alt={rName} className="w-7 h-7 rounded-full border border-primary/20 object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-sm">person</span>
          </div>
        )}
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sending to <span className="text-primary font-bold">{rHandle}</span></p>
      </div>

      {/* Progress Stepper */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 2 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Select Crypto & Amount</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>

      {/* Asset Header */}
      <div className="px-6 py-2">
        <button onClick={() => setShowPicker(true)} className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all active:scale-[0.98]">
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-full ${crypto?.iconBg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${crypto?.iconColor} text-xl`}>{crypto?.icon}</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 dark:text-white">{crypto?.name} ({crypto?.symbol})</p>
              <p className="text-xs text-slate-500">Balance: {crypto?.balance.toFixed(6)} {crypto?.symbol}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <p className="text-xs font-bold">Choose Crypto</p>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>
        </button>
      </div>

      {/* Amount Display */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-2">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-2">
            {isUsdMode && <span className="text-4xl font-extrabold text-slate-400">$</span>}
            <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{amount}</span>
            {!isUsdMode && <span className="text-3xl font-bold text-slate-400">{crypto?.symbol}</span>}
            {isUsdMode && <span className="text-3xl font-bold text-slate-400">USD</span>}
          </div>
          <div className="flex items-center mt-2 gap-2 text-slate-500 dark:text-slate-400">
            {isUsdMode ? (
              <p className="text-lg font-medium">≈ {cryptoQty.toFixed(6)} {crypto?.symbol}</p>
            ) : (
              <p className="text-lg font-medium">≈ ${usdValue.toFixed(2)} USD</p>
            )}
            <button onClick={handleSwitch} className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            </button>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="w-full mt-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <span>Network Fee (Gas)</span>
              <span className="material-symbols-outlined text-[14px]">help</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {gasFee > 0 ? `${gasFee} ${crypto?.symbol} ($${gasFeeUsd})` : 'Free'}
            </p>
          </div>
          <div className="h-[1px] bg-slate-200/60 dark:bg-slate-700 w-full" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-medium">Total Deduction</span>
            <p className="text-xl font-extrabold text-primary">{totalCrypto} {crypto?.symbol}</p>
          </div>
        </div>
      </main>

      {/* Numpad */}
      <section className="px-8 pb-4">
        <div className="grid grid-cols-3 text-center">
          {KEYS.map(key => (
            <button key={key} onClick={() => handleKey(key)} className="py-4 text-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors">
              {key === 'backspace' ? <span className="material-symbols-outlined">backspace</span> : key}
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 pt-2 pb-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-base">face</span>
            <p className="text-slate-500 text-xs font-medium">Biometric Authentication Required</p>
          </div>
          <button
            onClick={() => crypto && router.push(
              `/transfer/send-crypto/review?cryptoId=${crypto.id}&symbol=${crypto.symbol}&cryptoName=${encodeURIComponent(crypto.name)}&qty=${cryptoQty.toFixed(6)}&usd=${usdValue.toFixed(2)}&gasFee=${gasFee}&totCrypto=${totalCrypto}&rName=${encodeURIComponent(rName)}&rHandle=${encodeURIComponent(rHandle)}&rAvatar=${encodeURIComponent(rAvatar)}`
            )}
            disabled={!canProceed}
            className="w-full bg-primary hover:bg-premium-teal text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Review
          </button>
        </div>
      </footer>

      {/* Crypto Picker Bottom Sheet */}
      {showPicker && (
        <div className="fixed inset-0 z-[80] flex flex-col justify-end" onClick={() => setShowPicker(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="font-display text-lg font-bold text-primary dark:text-white">Your Holdings</h2>
              <button onClick={() => setShowPicker(false)} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>
            <div className="px-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {CRYPTOS.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCrypto(c)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${(selectedCrypto?.id || CRYPTOS[0]?.id) === c.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'}`}
                >
                  <div className={`size-11 rounded-full ${c.iconBg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${c.iconColor} text-xl`}>{c.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.balance.toFixed(6)} {c.symbol} available</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">${(c.balance * c.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-slate-400">${c.rate.toLocaleString()}/{c.symbol}</p>
                  </div>
                  {(selectedCrypto?.id || CRYPTOS[0]?.id) === c.id && (
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

export default function SendCryptoAmountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <CryptoAmountContent />
    </Suspense>
  )
}
