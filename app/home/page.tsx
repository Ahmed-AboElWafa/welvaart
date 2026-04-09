'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { useApp } from '@/hooks/useApp'
import globalfinLogo from './globalfin-logo.jpg'

export default function HomePage() {
  const router = useRouter()
  const { user, portfolio, loading } = useApp()

  if (loading || !user || !portfolio) {
    return (
      <div className="bg-background-light text-slate-900 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading GlobalFin...</div>
      </div>
    )
  }

  return (
    <div className="bg-background-light text-slate-900 font-sans antialiased min-h-screen relative">
      <div className="h-4 w-full"></div>
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={globalfinLogo.src} alt="GlobalFin Logo" style={{ width: '160px', height: '50px' }} className="h-auto w-40 object-contain" />
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-icons-round text-xl text-slate-600 dark:text-slate-400">notifications_none</span>
          </button>
          <button onClick={() => router.push('/profile')} className="w-10 h-10 rounded-full bg-primary border-2 border-accent/30 overflow-hidden shadow-md active:scale-90 transition-transform">
            <img alt="User Profile" className="w-full h-full object-cover" src={user.avatarUrl} />
          </button>
        </div>
      </header>
      <main className="px-6 pb-32">
        <section className="mt-4 bg-primary rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/70 text-sm font-medium">Total Portfolio Value</p>
                <h2 className="text-4xl font-bold mt-1 tracking-tight">${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <p className="text-white/40 text-[10px] mt-1 font-medium">Updated 5 min ago</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-1 rounded-full font-bold whitespace-nowrap">+{portfolio.todayChange}% today</span>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={() => router.push('/transfer')} className="flex-1 bg-white text-primary py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-lg">sync_alt</span>Transfer
              </button>
              <button onClick={() => router.push('/convert')} className="shrink-0 w-11 h-11 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center active:scale-95 transition-transform shadow-md">
                <span className="material-symbols-outlined text-xl">currency_exchange</span>
              </button>
              <button onClick={() => router.push('/deposit')} className="flex-1 bg-primary/40 border border-white/20 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-lg">add_circle</span>Deposit
              </button>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-display text-xl text-slate-800">Portfolio</h3>
            <span className="material-symbols-outlined text-slate-400">pie_chart</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => router.push('/fiat')} className="interactive-card p-4 rounded-2xl flex flex-col gap-3 shadow-md text-left clickable-card">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">payments</span>
              </div>
              <div><p className="text-xs text-slate-500 font-medium">Fiat</p><p className="font-bold text-lg">${portfolio.fiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>
            </button>
            <button onClick={() => router.push('/invest/crypto-market')} className="glass-card p-4 rounded-2xl flex flex-col gap-3 shadow-md text-left clickable-card">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600">currency_bitcoin</span>
                </div>
                <span className="text-[10px] font-bold text-rose-500 flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_drop_down</span>-1.4%</span>
              </div>
              <div><p className="text-xs text-slate-500 font-medium">Crypto</p><p className="font-bold text-lg">${portfolio.crypto.toLocaleString()}</p></div>
            </button>
            <button onClick={() => router.push('/invest/stocks-market')} className="glass-card p-4 rounded-2xl flex flex-col gap-3 shadow-md text-left clickable-card">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600">show_chart</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+3.1%</span>
              </div>
              <div><p className="text-xs text-slate-500 font-medium">Stocks</p><p className="font-bold text-lg">${portfolio.stocks.toLocaleString()}</p></div>
            </button>
            <button onClick={() => router.push('/invest/gold-tokens')} className="glass-card p-4 rounded-2xl flex flex-col gap-3 shadow-md text-left clickable-card">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent font-bold">diamond</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+0.8%</span>
              </div>
              <div><p className="text-xs text-slate-500 font-medium">Gold Tokens</p><p className="font-bold text-lg">${portfolio.gold.toLocaleString()}</p></div>
            </button>
          </div>
        </section>
        <section className="mt-8">
          <h3 className="font-display text-xl text-slate-800 mb-4">Insights &amp; Opportunities</h3>
          <div className="space-y-4">
            <div className="p-5 glass-card rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                  </div>
                  <p className="font-semibold text-base">Performance Overview</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">+$2,873.23</p>
                <p className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+2.4%</p>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 italic">Your portfolio outpaced the market by 1.2% this week.</p>
            </div>
            <div className="p-5 glass-card rounded-3xl border-l-4 border-accent relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent">lightbulb</span>
                  </div>
                  <p className="font-semibold text-base">Smart Opportunity</p>
                </div>
                <button onClick={() => router.push('/invest/gold-tokens')} className="text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg active:scale-95">Explore</button>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Rebalance Gold Tokens</p>
                <p className="text-[11px] text-slate-500">Current market trends suggest a 5% increase in gold-backed assets could optimize your risk-adjusted returns.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
