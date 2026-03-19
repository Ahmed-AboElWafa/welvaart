'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'

function SendFiatReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateFiatAccountBalance, addTransaction } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  const rName     = searchParams?.get('rName') || 'Recipient'
  const rIban     = searchParams?.get('rIban') || ''
  const rSwift    = searchParams?.get('rSwift') || ''
  const amount    = searchParams?.get('amount') || '0'
  const currency  = searchParams?.get('currency') || 'USD'
  const symbol    = searchParams?.get('symbol') || '$'
  const accountId = searchParams?.get('accountId') || ''
  const note      = searchParams?.get('note') || ''

  const amountNum = parseFloat(amount) || 0

  const handleConfirm = async () => {
    if (amountNum <= 0 || !accountId) return
    setIsProcessing(true)
    try {
      await updateFiatAccountBalance(accountId, -amountNum)
      await addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        type: 'fiat',
        description: `Sent to ${rName}`,
        details: rIban ? `${rSwift} • ${rIban.slice(0, 10)}...` : currency,
        amount: -amountNum,
        currency: currency,
        value: -amountNum,
      })
      router.push(
        `/transfer/send-fiat/success?rName=${encodeURIComponent(rName)}&rIban=${encodeURIComponent(rIban)}&amount=${amount}&currency=${currency}&symbol=${encodeURIComponent(symbol)}`
      )
    } catch (e) {
      console.error(e)
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button onClick={() => router.back()} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Fiat</h1>
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

      {/* Main Content */}
      <main className="flex-1 px-6 pt-8">
        {/* Amount Hero */}
        <div className="text-center mb-10">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Total amount to send</p>
          <h1 className="text-4xl font-bold text-primary">
            {symbol}{amountNum.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-slate-500 text-xl">{currency}</span>
          </h1>
          {note && (
            <p className="text-sm text-slate-500 mt-2 italic">&ldquo;{note}&rdquo;</p>
          )}
        </div>

        {/* Recipient Card */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4 shadow-sm bg-slate-50 dark:bg-slate-800">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Recipient Details</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 dark:text-white text-base truncate">{rName}</p>
              {rIban && <p className="text-sm text-slate-500 dark:text-slate-400 font-mono truncate">{rIban}</p>}
              {rSwift && <p className="text-xs text-slate-400 font-mono">{rSwift}</p>}
            </div>
            <div className="text-primary">
              <span className="material-symbols-outlined">verified</span>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl mb-4 shadow-sm bg-slate-50 dark:bg-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Source Wallet</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Fiat Wallet ({currency})</span>
              <span className="material-symbols-outlined text-sm text-primary opacity-80">account_balance_wallet</span>
            </div>
          </div>
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Transfer Fee</span>
            <span className="text-sm font-bold">Free</span>
          </div>
          <div className="p-5 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Estimated Arrival</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">Via SEPA Instant</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">Instant</span>
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="mt-6 flex items-start gap-3 px-2">
          <span className="material-symbols-outlined text-primary text-sm mt-0.5 opacity-80">shield_lock</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Your transaction is protected by Welvaart Secure encryption. By clicking confirm, you agree to our terms of service and transfer policies.</p>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="p-6 pb-10 space-y-3 dark:bg-background-dark border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-base">face</span>
          <p className="text-slate-500 text-xs font-medium">Biometric Authentication Required</p>
        </div>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Confirm Transfer'}
        </button>
        <button onClick={() => router.push('/transfer')} className="w-full dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-2 rounded-2xl transition-all flex items-center justify-center">
          Cancel Transfer
        </button>
      </footer>
    </div>
  )
}

export default function SendFiatReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <SendFiatReviewContent />
    </Suspense>
  )
}
