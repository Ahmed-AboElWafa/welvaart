'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '@/hooks/useApp'
import { HUBS } from '../hubs'

function GoldTokensRedeemReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addTransaction } = useApp()
  const [loading, setLoading] = useState(false)

  const amountStr = searchParams?.get('amount') || '0'
  const locationId = searchParams?.get('location') || 'dubai'
  const amount = parseFloat(amountStr)
  const usdValue = amount * 62.25

  const hub = HUBS.find((h) => h.id === locationId) || HUBS[0]

  const handleConfirm = async () => {
    setLoading(true)
    await addTransaction({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: 'gold',
      description: 'Physical Gold Redemption',
      details: `${hub.name} Collection`,
      amount: -amount,
      currency: 'GOLD',
      value: -usdValue,
    })
    router.push(`/invest/gold-tokens/redeem/success?amount=${amountStr}&location=${locationId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
          </button>
          <h1 className="font-display text-lg text-primary dark:text-white">Redeem Physical Gold</h1>
          <div className="w-10" />
        </div>
        {/* Step indicators */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-1 rounded-full bg-primary" />
          <div className="flex-1 h-1 rounded-full bg-primary" />
          <div className="flex-1 h-1 rounded-full bg-accent" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step 3 of 3: Review</p>
      </header>

      <main className="px-6 flex-1 flex flex-col">
        {/* <section className="mt-2 mb-8">
          <h2 className="text-2xl font-bold mt-6 dark:text-white">Final Review</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Please confirm your redemption details below.
          </p>
        </section> */}

        <div className="space-y-4">
          {/* Summary card */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-accent text-3xl">workspace_premium</span>
              </div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Redemption Amount</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {amount.toFixed(2)} g
              </h3>
              <p className="text-primary dark:text-accent text-sm font-medium mt-1">≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">hub</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Redemption Hub</span>
                </div>
                <span className="text-sm font-bold dark:text-white">{hub.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">payments</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Redemption Fee</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{hub.fee}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">event</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Est. Processing</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{hub.processing}</span>
              </div>
            </div>
          </div>

          {/* Support note */}
          <div className="bg-primary/5 dark:bg-accent/5 border border-primary/10 dark:border-accent/10 rounded-2xl p-4 flex gap-4">
            <span className="material-symbols-outlined text-primary dark:text-accent">support_agent</span>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">Personal Logistics Support</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                After confirmation, a dedicated GlobalFin representative will contact you within 24 hours to coordinate
                secure physical collection or armored transport.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto mb-8 space-y-4">
          {/* Biometric note */}
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="material-symbols-outlined text-slate-400 text-lg">fingerprint</span>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest">
              Biometric Authentication Required
            </p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-premium-teal text-accent py-4 mt-6 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Confirm Redemption'}
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens')}
            className="w-full py-2 text-slate-500 dark:text-slate-400 font-bold text-base active:opacity-60 transition-opacity"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  )
}

export default function GoldTokensRedeemReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <GoldTokensRedeemReviewContent />
    </Suspense>
  )
}
