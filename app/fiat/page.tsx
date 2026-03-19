'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { useApp } from '@/hooks/useApp'

export default function FiatPage() {
  const router = useRouter()
  const [expanded, setExpanded] = useState<string | null>(null)
  const { user, portfolio, fiatAccounts, loading } = useApp()

  if (loading || !portfolio || !fiatAccounts) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Fiat Accounts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark relative">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
        </button>
        <h1 className="font-display text-xl text-primary dark:text-white">Fiat Accounts</h1>
      </header>

      <main className="px-6 pb-32">
        {/* Total Balance Card */}
        <section className="mt-4 bg-premium-teal rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium">Total Fiat Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold mt-1 tracking-tight">${portfolio.fiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
              <span className="text-white/60 text-sm uppercase">USD</span>
            </div>
          </div>
        </section>

        {/* Accounts */}
        <section className="mt-8 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-display text-lg text-slate-800 dark:text-white">Active Currencies</h3>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{fiatAccounts.length} Accounts</span>
          </div>

          {fiatAccounts.map((acc) => (
            <div key={acc.id} className="glass-card rounded-2xl shadow-sm overflow-hidden">
              {/* Account row */}
              <button
                className="w-full p-5 flex items-center justify-between"
                onClick={() => setExpanded(expanded === acc.id ? null : acc.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50">
                    <img alt={acc.id.toUpperCase()} className="w-full h-full object-cover" src={acc.flag} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white">{acc.name}</p>
                    <p className="text-xs text-slate-500">{acc.currency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">{acc.balance}</p>
                  <span className="text-[10px] font-bold text-primary dark:text-accent uppercase tracking-wider flex items-center gap-1 ml-auto mt-1">
                    Details
                    <span className={`material-symbols-outlined text-xs transition-transform ${expanded === acc.id ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </span>
                </div>
              </button>

              {/* Expandable details */}
              {expanded === acc.id && (
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Account Holder</p>
                      <p className="text-sm font-medium dark:text-white">{user?.name || acc.holder}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">SWIFT/BIC</p>
                      <p className="text-sm font-medium dark:text-white">{acc.swift}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">{acc.label}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-mono font-medium dark:text-white">{acc.accountId}</p>
                        <button onClick={() => navigator.clipboard.writeText(acc.accountId)}>
                          <span className="material-symbols-outlined text-sm text-slate-400 cursor-pointer">content_copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Open New Account CTA */}
          <button
            onClick={() => router.push('/fiat/open-account')}
            className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-premium-teal/30 flex items-center justify-center gap-3 text-premium-teal font-bold hover:bg-premium-teal/5 transition-colors active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Open New Currency Account
          </button>
        </section>

        {/* Guarantee notice */}
        <section className="mt-8 flex items-start gap-3 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
          <span className="material-symbols-outlined text-slate-400">gpp_good</span>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Your fiat accounts are held at partner banks and are protected up to €100,000 by the Deposit Guarantee
            Scheme. Details provided here are for receiving funds via SEPA or SWIFT.
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
