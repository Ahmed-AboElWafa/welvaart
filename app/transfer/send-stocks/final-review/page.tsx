'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/stocks-market/stocks'

function FinalReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addStockHolding, addTransaction, stockHoldings } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const stockId = searchParams?.get('stockId') || ''
  const symbol   = searchParams?.get('symbol') || ''
  const stockName = searchParams?.get('name') || ''
  const sharesStr = searchParams?.get('shares') || '0'
  const usdStr    = searchParams?.get('usd') || '0'
  const rName     = searchParams?.get('rName') || 'GlobalFin User'
  const rHandle   = searchParams?.get('rHandle') || '@username'
  const rAvatar   = searchParams?.get('rAvatar') || ''
  const priceStr  = searchParams?.get('price') || '0'

  const sharesNum = parseFloat(sharesStr) || 0
  const usdNum    = parseFloat(usdStr) || 0
  const price     = parseFloat(priceStr) || 0

  // Get icon from market
  const mc = MARKET.find(m => m.id === stockId)

  const handleConfirm = async () => {
    if (sharesNum <= 0) return
    setIsProcessing(true)
    try {
      // Deduct shares (negative additionalShares)
      await addStockHolding(stockId, -sharesNum, 0)

      // Log transaction
      await addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        type: 'stocks',
        description: `Sent ${symbol}`,
        details: `${sharesNum.toFixed(4)} ${symbol} → ${rHandle}`,
        amount: -sharesNum,
        currency: symbol,
        value: -usdNum
      })

      router.push(
        `/transfer/send-stocks/success?symbol=${symbol}&shares=${sharesNum}&usd=${usdNum.toFixed(2)}&rName=${encodeURIComponent(rName)}&rHandle=${encodeURIComponent(rHandle)}`
      )
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col dark:bg-background-dark overflow-hidden max-w-[430px] mx-auto shadow-2xl">
      <div className="h-4 w-full"></div>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Stocks</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Progress Stepper */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 3 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Confirmation</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full rounded-full" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {/* Recipient Profile */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            {rAvatar ? (
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 border-3 border-primary/10 shadow-md"
                style={{ backgroundImage: `url("${rAvatar}")` }}
                aria-label={rName}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-primary/10 border-3 border-primary/10 shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">person</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center mt-3 space-y-0.5">
            <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
              {rHandle}
            </p>
            <p className="text-slate-500 text-xs font-medium">{rName}</p>
          </div>
        </div>

        {/* Asset Summary */}
        <div className="flex p-4 mt-2">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div className={`w-20 h-20 ${mc?.iconBg || 'bg-primary/10'} rounded-full flex items-center justify-center`}>
                <span className={`material-icons-round ${mc?.iconColor || 'text-primary'} text-4xl`}>{mc?.icon || 'show_chart'}</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-primary text-2xl font-extrabold tracking-tight text-center">{stockName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-xs font-bold">{symbol}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <p className="text-slate-500 text-sm font-medium">{sharesNum.toFixed(4)} Shares</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Details */}
        <div className="px-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Recipient</span>
                <div className="text-right">
                  <p className="text-slate-900 dark:text-white text-sm font-bold">{rHandle}</p>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-wider">GlobalFin ID</p>
                </div>
              </div>
              <div className="border-t border-slate-200/60 dark:border-slate-700 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Asset</span>
                <span className="text-slate-900 dark:text-white text-sm font-bold">{sharesNum.toFixed(4)} {symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Estimated Value</span>
                <div className="text-right">
                  <p className="text-primary text-lg font-extrabold">${usdNum.toFixed(2)}</p>
                  <p className="text-slate-400 text-[10px]">At ${price}/share</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 pb-10 space-y-3 dark:bg-background-dark">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          <p className="text-slate-500 text-xs font-medium">Biometric Authentication Required</p>
        </div>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Confirm Share Transfer'}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-2 rounded-2xl transition-all flex items-center justify-center"
        >
          Cancel Transfer
        </button>
      </footer>
    </div>
  )
}

export default function SendStocksFinalReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <FinalReviewContent />
    </Suspense>
  )
}
