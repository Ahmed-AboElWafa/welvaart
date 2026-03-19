'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../crypto'

function CryptoDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const cryptoId = searchParams?.get('cryptoId') || 'btc'
  const marketCrypto = MARKET.find(m => m.id === cryptoId) || MARKET[0]

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-400">chevron_left</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-none">{marketCrypto.name}</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{marketCrypto.symbol} • Crypto</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-icons-round text-slate-600 dark:text-slate-400 text-xl">star_outline</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-icons-round text-slate-600 dark:text-slate-400 text-xl">ios_share</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 pb-6">
        {/* Price */}
        <section className="mt-4 mb-6">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold tracking-tight">${marketCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`font-bold mb-1.5 flex items-center text-sm ${marketCrypto.up ? 'text-emerald-500' : 'text-rose-500'}`}>
              <span className="material-icons-round text-sm">{marketCrypto.up ? 'arrow_upward' : 'arrow_downward'}</span>
              {marketCrypto.change}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">Last updated: 2 mins ago</p>
        </section>

        {/* Chart */}
        <section className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
            <div className="h-48 w-full relative overflow-hidden rounded-xl mb-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="cryptoGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M0 150 C 50 140, 80 170, 120 120 S 180 80, 240 100 S 320 40, 400 60" fill="none" stroke="var(--color-primary, #004d4d)" strokeWidth="3" />
                <path d="M0 150 C 50 140, 80 170, 120 120 S 180 80, 240 100 S 320 40, 400 60 V 200 H 0 Z" fill="url(#cryptoGrad)" />
                <circle cx="400" cy="60" r="4" fill="var(--color-primary, #004d4d)" />
              </svg>
              <div className="absolute left-1/2 top-1/4 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg mb-1">${(marketCrypto.price * 1.05).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className="w-0.5 h-20 bg-primary/20" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((range) => (
                <button
                  key={range}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${range === '1W' ? 'bg-white dark:bg-slate-700 text-primary dark:text-accent shadow-sm' : 'text-slate-400'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Market Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Market Cap', value: '$1.26T' },
              { label: '24h Volume', value: '$32.4B' },
              { label: 'Circulating Supply', value: '19.7M BTC' },
              { label: 'All-Time High', value: '$73,737.94', accent: true },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-sm font-bold ${stat.accent ? 'text-accent' : ''}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 24h Performance */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Performance (24h)</h2>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] text-slate-500 font-medium mb-1">Low</p>
                <p className="text-sm font-bold">$62,840.00</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-medium mb-1">High</p>
                <p className="text-sm font-bold">$64,890.00</p>
              </div>
            </div>
            <div className="relative h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="absolute h-full bg-primary dark:bg-accent left-0 w-[80%] rounded-full" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400">Low</span>
              <span className="text-[10px] text-emerald-500 font-bold">Current: ${marketCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-[10px] text-slate-400">High</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">About</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {marketCrypto.name} is a cryptocurrency on the Welvaart platform. Trade it seamlessly along with other supported decentralized assets.
          </p>
          <button className="mt-2 text-sm font-bold text-primary dark:text-accent">Show more</button>
        </section>

        {/* CTA */}
        <div className="mt-4">
          <button
            onClick={() => router.push(`/invest/crypto-market/amount?cryptoId=${marketCrypto.id}`)}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Buy {marketCrypto.name}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function CryptoDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <CryptoDetailsContent />
    </Suspense>
  )
}
