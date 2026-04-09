'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/crypto-market/crypto'

function SendCryptoReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addCryptoHolding, addTransaction } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const cryptoId   = searchParams?.get('cryptoId') || ''
  const symbol     = searchParams?.get('symbol') || ''
  const cryptoName = searchParams?.get('cryptoName') || ''
  const qty        = searchParams?.get('qty') || '0'
  const usd        = searchParams?.get('usd') || '0'
  const gasFee     = searchParams?.get('gasFee') || '0'
  const totCrypto  = searchParams?.get('totCrypto') || '0'
  const rName      = searchParams?.get('rName') || 'GlobalFin User'
  const rHandle    = searchParams?.get('rHandle') || '@username'
  const rAvatar    = searchParams?.get('rAvatar') || ''

  const qtyNum  = parseFloat(qty) || 0
  const usdNum  = parseFloat(usd) || 0
  const gasNum  = parseFloat(gasFee) || 0
  const totNum  = parseFloat(totCrypto) || 0

  const mc = MARKET.find(m => m.id === cryptoId)

  const handleConfirm = async () => {
    if (qtyNum <= 0) return
    setIsProcessing(true)
    try {
      // Deduct crypto (negative amount)
      await addCryptoHolding(cryptoId, -totNum, 0)

      await addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        type: 'crypto',
        description: `Sent ${symbol}`,
        details: `${qtyNum.toFixed(6)} ${symbol} → ${rHandle}`,
        amount: -qtyNum,
        currency: symbol,
        value: -usdNum,
      })

      router.push(
        `/transfer/send-crypto/success?symbol=${symbol}&qty=${qty}&usd=${usd}&rName=${encodeURIComponent(rName)}&rHandle=${encodeURIComponent(rHandle)}`
      )
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
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

      {/* Progress Stepper */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 3 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Review & Confirm</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full rounded-full" />
        </div>
      </div>

      <main className="flex-1 flex flex-col px-4">
        {/* Recipient Profile */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            {rAvatar ? (
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 border-4 border-primary/10 shadow-lg"
                style={{ backgroundImage: `url("${rAvatar}")` }}
                aria-label={rName}
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-primary/10 border-4 border-primary/10 shadow-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-5xl">person</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center mt-4 space-y-1">
            <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">{rHandle}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col items-center mt-8 mb-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl py-8 px-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
          <div className="flex items-baseline gap-2">
            <h1 className="text-slate-800 dark:text-white tracking-tighter text-4xl font-extrabold">{qtyNum.toFixed(6)}</h1>
            <span className="text-primary text-2xl font-bold">{symbol}</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="material-symbols-outlined text-primary/60 text-lg">payments</span>
            <h2 className="text-slate-500 text-xl font-semibold tracking-tight">≈ ${usdNum.toFixed(2)} USD</h2>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="flex flex-col gap-4 px-2">
          <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">sync_alt</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">Transfer Type</span>
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-bold text-sm">Internal Transfer</span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">sell</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">Network Fee (Gas)</span>
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-bold text-sm">
              {gasNum > 0 ? `${gasNum} ${symbol}` : 'Free'}
            </span>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">schedule</span>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">Est. Arrival</span>
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-bold text-sm">Instant</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 flex flex-col gap-4 mt-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-slate-400 text-sm">face</span>
          <p className="text-slate-500 dark:text-slate-400 text-xs text-center">Biometric Authentication Required</p>
        </div>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Confirm & Send'}
        </button>
      </footer>
    </div>
  )
}

export default function SendCryptoReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <SendCryptoReviewContent />
    </Suspense>
  )
}
