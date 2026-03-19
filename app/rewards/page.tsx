'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

export default function RewardsPage() {
  const router = useRouter()
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  return (
    <div className="bg-background-light min-h-screen relative">
      <div className="h-4 w-full"></div>
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-background-light/80 dark:bg-background-dark/80 ios-blur z-50">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Welvaart</p>
          <h1 className="text-2xl font-bold">Wealth Rewards</h1>
        </div>
      </header>
      <main className="px-6 pb-32">
        <section className="mt-4 p-6 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium opacity-80">Total Wealth Earned</p>
              <h2 className="text-3xl font-bold mt-1">$1,248.50</h2>
            </div>
            <div className="bg-white/20 p-2 rounded-xl">
              <span className="material-icons-round">auto_awesome</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="flex-1 bg-white/10 p-3 rounded-2xl">
              <p className="text-[10px] uppercase font-bold opacity-70">Gold</p>
              <p className="text-lg font-bold">4.2g</p>
            </div>
            <div className="flex-1 bg-white/10 p-3 rounded-2xl">
              <p className="text-[10px] uppercase font-bold opacity-70">Stocks</p>
              <p className="text-lg font-bold">12 Shares</p>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-icons-round text-accent">workspace_premium</span>
              Gold Rewards
            </h3>
            <a className="text-primary text-sm font-semibold" href="#">View All</a>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                <span className="material-icons-round text-accent">savings</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Next Gold Nugget</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Spend $150 more to unlock 0.1g</p>
              </div>
              <p className="font-bold text-primary">85%</p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '85%', background: 'linear-gradient(90deg, #D4A017, #F5C842)' }}></div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                  <span className="material-icons-round text-accent text-sm">stars</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Spending Milestone</p>
                  <p className="text-[11px] text-slate-400">Mar 10, 2026</p>
                </div>
              </div>
              <p className="text-sm font-bold text-accent">+0.25g Au</p>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-icons-round text-stock">trending_up</span>
              Stock Rewards
            </h3>
            <a className="text-primary text-sm font-semibold" href="#">Portfolio</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-xs">AAPL</div>
                <span className="text-xs font-bold">Apple Inc.</span>
              </div>
              <p className="text-2xl font-bold">$45.20</p>
              <p className="text-[10px] text-slate-500">Total earned value</p>
              <div className="absolute -bottom-2 -right-2 opacity-5 text-6xl material-icons-round">apple</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-blue-500">G</div>
                <span className="text-xs font-bold">Alphabet</span>
              </div>
              <p className="text-2xl font-bold">$12.10</p>
              <p className="text-[10px] text-slate-500">Total earned value</p>
              <div className="absolute -bottom-2 -right-2 opacity-5 text-6xl material-icons-round">language</div>
            </div>
          </div>
          <div className="mt-4 p-5 rounded-3xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-between">
            <div className="max-w-[70%]">
              <p className="font-bold text-sm">Boost Stock Rewards</p>
              <p className="text-xs opacity-70 mt-1">Upgrade to Premium to double your stock cashback on every trade.</p>
            </div>
            <button className="bg-primary text-white p-2 px-4 rounded-xl text-xs font-bold">Upgrade</button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
