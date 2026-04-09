'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function SendFiatSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trxId, setTrxId] = useState('')

  useEffect(() => {
    setTrxId(`TRX-${Math.floor(1000000 + Math.random() * 9000000)}`)
  }, [])

  const rName    = searchParams?.get('rName') || 'Recipient'
  const rIban    = searchParams?.get('rIban') || ''
  const amount   = searchParams?.get('amount') || '0'
  const currency = searchParams?.get('currency') || 'USD'
  const symbol   = searchParams?.get('symbol') || '$'

  const amountNum = parseFloat(amount) || 0

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <button onClick={() => router.push('/')} className="text-slate-900 dark:text-slate-100 p-2">
          <span className="material-symbols-outlined text-primary">close</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-primary font-display">Transfer Details</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-6xl font-bold">check</span>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-primary mb-2">Transfer Successful</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">The funds are now available in the recipient&apos;s account.</p>
        </div>

        {/* Digital Receipt */}
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />

          {/* Amount */}
          <div className="text-center mb-8 pt-2">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Amount Sent</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-primary text-2xl font-bold">{symbol}</span>
              <span className="text-4xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
                {amountNum.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1 font-mono">{currency}</p>
          </div>

          {/* Metadata */}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Recipient</span>
              <div className="text-right">
                <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">{rName}</p>
                {rIban && <p className="text-slate-500 text-[10px] font-mono">{rIban.slice(0, 16)}... • GlobalFin</p>}
              </div>
            </div>
            <div className="border-t border-slate-200/60 dark:border-slate-700 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Date</span>
              <span className="text-slate-900 dark:text-slate-100 text-sm font-medium">
                {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Transaction ID</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-900 dark:text-slate-100 text-sm font-mono uppercase">{trxId}</span>
                <button onClick={() => navigator.clipboard.writeText(trxId)}>
                  <span className="material-symbols-outlined text-primary text-sm cursor-pointer">content_copy</span>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Security Badge */}
        <div className="mt-8 px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="material-symbols-outlined text-primary text-xs">verified_user</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Transaction Secured by GlobalFin</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10 space-y-3 bg-background-light dark:bg-background-dark">
        <button onClick={() => router.push('/')} className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2">
          <span>Done</span>
        </button>
        <button className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-primary font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">share</span>
          <span>Share Receipt</span>
        </button>
      </footer>
    </div>
  )
}

export default function SendFiatSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <SendFiatSuccessContent />
    </Suspense>
  )
}
