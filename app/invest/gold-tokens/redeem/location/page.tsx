'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HUBS } from '../hubs'

function GoldTokensRedeemLocationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams?.get('amount') || '0'
  const [selected, setSelected] = useState('dubai')

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
          <div className="flex-1 h-1 rounded-full bg-accent" />
          <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step 2 of 3: Select Hub</p>
      </header>

      <main className="px-6 flex-1 flex flex-col">
        <section className="mt-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">
            Where would you like to receive your gold?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Choose a high-security delivery hub for collection or regional dispatch.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          {HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelected(hub.id)}
              className={`w-full text-left glass-card p-5 rounded-3xl relative transition-all border-2 ${selected === hub.id
                ? 'border-accent bg-accent/5'
                : 'border-transparent'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${hub.iconBg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${hub.iconColor} text-2xl`}>{hub.icon}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected === hub.id
                  ? 'bg-accent border-accent'
                  : 'border-slate-300 dark:border-slate-600 bg-transparent'
                  }`}>
                  {selected === hub.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold dark:text-white">{hub.name}</h3>
                  {hub.popular && (
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{hub.address}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Processing Time</p>
                  <p className="text-sm font-semibold text-primary dark:text-accent">{hub.processing}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Storage Fee</p>
                  <p className="text-sm font-semibold dark:text-white">{hub.fee}</p>
                </div>
              </div>
            </button>
          ))}
        </section>

        <section className="mt-8 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-2xl flex items-start gap-3">
          <span className="material-symbols-outlined text-primary dark:text-accent text-xl mt-0.5">info</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Verification of your identity and physical address will be required upon arrival at the hub. Please ensure
            your <span className="text-primary dark:text-accent font-bold">KYC Tier 3</span> is active.
          </p>
        </section>
        <div className="mt-auto mb-8 space-y-4">
          <button
            onClick={() => router.push(`/invest/gold-tokens/redeem/review?amount=${amount}&location=${selected}`)}
            className="w-full bg-premium-teal text-accent py-4 mt-6 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Continue
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Fixed footer
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/90 dark:via-background-dark/90 to-transparent">
        <button
          onClick={() => router.push('/invest/gold-tokens/redeem/review')}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Continue
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div> */}
    </div>
  )
}

export default function GoldTokensRedeemLocationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <GoldTokensRedeemLocationContent />
    </Suspense>
  )
}
