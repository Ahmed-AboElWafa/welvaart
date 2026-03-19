'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/hooks/useApp'
import { CURRENCIES } from '../currencies'

function FiatConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, addFiatAccount } = useApp()
  const currencyCode = searchParams?.get('currency') || 'GBP'
  const currencyDetails = CURRENCIES[currencyCode] || CURRENCIES['GBP']

  const handleOpenAccount = async () => {
    if (!user) return;
    await addFiatAccount({
      id: currencyCode.toLowerCase(),
      name: `${currencyDetails.code} Account`,
      currency: currencyDetails.name,
      balance: `${currencyDetails.symbol}0.00`,
      flag: currencyDetails.flag,
      holder: user.name,
      swift: 'WELVAARTX',
      label: 'IBAN',
      accountId: `${currencyCode}55 0000 1111 2222 3333`,
    });
    router.push(`/fiat/success?currency=${currencyCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
          </button>
          <h1 className="font-display text-xl text-primary dark:text-white">Confirm Account</h1>
        </div>
        <span className="text-xs font-bold text-slate-400">Step 2 of 2</span>
      </header>

      <main className="flex-1 px-6">
        {/* Currency Card */}
        <section className="mt-4 glass-card rounded-3xl p-6 text-center shadow-lg border-t-4 border-t-accent">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-slate-100 mb-4 bg-slate-50">
            <img
              alt={`${currencyDetails.code} Flag`}
              className="w-full h-full object-cover"
              src={currencyDetails.flag}
            />
          </div>
          <h2 className="text-2xl font-display text-premium-teal dark:text-white mb-1">{currencyDetails.name}</h2>
          <p className="text-slate-500 text-sm font-medium">New {currencyDetails.code} Fiat Account</p>
        </section>

        {/* Feature List */}
        <section className="mt-8 space-y-4">
          {[
            { icon: 'bolt', color: 'bg-green-50 dark:bg-green-900/20 text-green-600', title: 'Instant Activation', desc: 'Your account will be ready immediately' },
            // { icon: 'payments', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', title: 'Zero Opening Fee', desc: 'No hidden costs to create this account' },
            { icon: 'badge', color: 'bg-amber-50 dark:bg-amber-900/20 text-accent', title: 'Personal IBAN/SWIFT Included', desc: 'Receive international transfers directly' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Confirmation Details */}
        <section className="mt-8 p-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
          <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">Confirmation Details</h4>
          <div className="space-y-3">
            {[
              { label: 'Legal Holder', value: user?.name || 'Loading...', className: 'font-medium text-slate-900 dark:text-white' },
              { label: 'Region', value: currencyDetails.region, className: 'font-medium text-slate-900 dark:text-white' },
              { label: 'Monthly Fee', value: 'Free', className: 'font-bold text-green-600' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center text-sm">
                <span className="text-slate-500">{row.label}</span>
                <span className={row.className}>{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-[11px] text-slate-400 leading-relaxed text-center px-4">
          By tapping "Open Account", you agree to the updated{' '}
          <Link href="#" className="text-primary dark:text-accent">Terms of Service</Link>{' '}
          and confirm your tax residency status.
        </p>
      </main>

      {/* Inline Footer */}
      <footer className="px-6 pt-6 pb-10 mt-4">
        <div className="flex items-center justify-center gap-2 mb-4 text-primary dark:text-accent">
          <span className="material-symbols-outlined text-lg">fingerprint</span>
          <span className="text-xs font-semibold">Biometric Authentication Required</span>
        </div>
        <button
          onClick={handleOpenAccount}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Open Account
          {/* <span className="material-symbols-outlined text-xl">arrow_forward</span> */}
        </button>
      </footer>
    </div>
  )
}

export default function FiatConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <FiatConfirmContent />
    </Suspense>
  )
}
