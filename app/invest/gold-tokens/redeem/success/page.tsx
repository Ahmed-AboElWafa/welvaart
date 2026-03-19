'use client'
import React, { Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { HUBS } from '../hubs'

// Unique redemption reference (in production, this would come from the server)
const REDEMPTION_REF = 'GFR-2026-AU50-7X3K'
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(REDEMPTION_REF)}&color=0A3B49&bgcolor=FFFFFF&margin=10`

function GoldTokensRedeemSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qrRef = useRef<HTMLImageElement>(null)

  const amountStr = searchParams?.get('amount') || '0'
  const locationId = searchParams?.get('location') || 'dubai'
  const amount = parseFloat(amountStr)
  const usdValue = amount * 62.25

  const hub = HUBS.find((h) => h.id === locationId) || HUBS[0]

  const handleSaveQR = async () => {
    try {
      const response = await fetch(QR_URL)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Welvaart-Gold-QR-${REDEMPTION_REF}.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // Fallback: open in new tab
      window.open(QR_URL, '_blank')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      <main className="px-6 flex-1 flex flex-col">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse" />
            <span className="material-symbols-outlined text-accent text-6xl">check_circle</span>
          </div>
          <h1 className="font-display text-3xl text-primary dark:text-white mb-2">Redemption Initiated</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Your physical gold request is being processed
          </p>
        </div>

        {/* Request Summary */}
        <section className="w-full glass-card rounded-3xl p-6 mb-6">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4">Request Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Amount</span>
              <span className="text-sm font-bold dark:text-white">{amount.toFixed(2)} g</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">Estimated Value</span>
              <span className="text-sm font-bold dark:text-white">${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Selected Hub</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-accent text-sm">location_on</span>
                <span className="text-sm font-bold dark:text-white">{hub.name}</span>
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="w-full glass-card rounded-3xl p-6 mb-6 flex flex-col items-center">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 self-start">Collection QR Code</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 self-start mb-5">Ref: <span className="font-mono font-bold text-primary dark:text-accent">{REDEMPTION_REF}</span></p>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-4 shadow-inner border border-slate-100 dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={qrRef}
              src={QR_URL}
              alt="Gold Redemption QR Code"
              width={200}
              height={200}
              className="rounded-xl"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveQR}
            style={{ width: '180px' }}
            className="mt-5 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all hover:bg-premium-teal"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Save QR Code
          </button>
        </section>

        {/* Warning: Save QR Code */}
        <section className="w-full rounded-2xl p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 flex gap-3">
          <span className="material-symbols-outlined text-amber-500 shrink-0 mt-0.5">warning</span>
          <div>
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-1">Save your QR code now</p>
            <p className="text-xs text-amber-600 dark:text-amber-300 leading-relaxed">
              You must present this QR code at the collection hub to verify and receive your physical gold. Without it, collection cannot be completed.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section className="w-full glass-card rounded-3xl p-6 bg-premium-teal/5 border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary dark:text-accent">info</span>
            <h3 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wide">Next Steps</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A Welvaart representative will reach out via phone within{' '}
            <span className="font-bold text-primary dark:text-accent">24 hours</span> to coordinate your secure physical
            collection.
          </p>
        </section>
        <div className="mt-auto mb-8 space-y-4">
          <button
            onClick={() => router.push('/invest/gold-tokens')}
            className="w-full bg-premium-teal text-accent py-4 mt-6 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Done
          </button>
        </div>
      </main>
    </div>
  )
}

export default function GoldTokensRedeemSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <GoldTokensRedeemSuccessContent />
    </Suspense>
  )
}

