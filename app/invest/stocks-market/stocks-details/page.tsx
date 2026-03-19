'use client'
import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../stocks'

function StocksDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const stockId = searchParams?.get('stockId') || 'aapl'
  const marketStock = MARKET.find(m => m.id === stockId) || MARKET[0]

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
            <h1 className="text-lg font-bold leading-none">{marketStock.name}</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Nasdaq: {marketStock.symbol}</p>
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
            <span className="text-4xl font-bold tracking-tight">${marketStock.price.toFixed(2)}</span>
            <span className={`${marketStock.up ? 'text-emerald-500' : 'text-rose-500'} font-bold mb-1.5 flex items-center text-sm`}>
              <span className="material-icons-round text-sm">{marketStock.up ? 'arrow_upward' : 'arrow_downward'}</span>
              {marketStock.change}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">Closed: May 24, 4:00 PM EDT</p>
        </section>

        {/* Chart */}
        <section className="mb-8">
          <div className="h-56 relative w-full mb-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d="M0 150 Q 50 140, 100 160 T 200 100 T 300 120 T 400 40" fill="none" stroke="#10b981" strokeWidth="3" />
              <path d="M0 150 Q 50 140, 100 160 T 200 100 T 300 120 T 400 40 V 200 H 0 Z" fill="url(#chartGradient)" />
            </svg>
          </div>
          <div className="flex justify-between items-center bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl">
            {['1D', '1W', '1M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-colors ${range === '1M' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Key Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Market Cap', value: '2.91T' },
              { label: 'P/E Ratio', value: '28.45' },
              { label: '52-Wk High/Low', value: '$199.62 / $164.08' },
              { label: 'Div. Yield', value: '0.51%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-sm font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">About</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            A leading technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.
          </p>
          <button className="mt-2 text-sm font-bold text-primary dark:text-accent">Show more</button>
        </section>

        {/* Top News */}
        {/* <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Top News</h2>
          <div className="space-y-4">
            {[
              {
                source: 'Bloomberg • 2h ago',
                title: 'Tech Giant Announces New AI Integration for Upcoming Product Line',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoMgra1moGxnomBmoNcDY_bD4vPo3ENG5V7J69DOEb5l7E3i3OTrvsQVhjoEOyUeEZX2n18XwTjE6pTrdH5d8EHYz7XhYVGdA1rOWpvzcO4ezqYIbIKtSeGfoBYDJiPiqLbwfVFyFfKoUvDUg-pEAeNdMf2MqJx4LhmAPCY8DTgDu1nL5tv-MmLfRTf6Ic4z__XjAzU8l_5AEl2IrHrmHaS0J42oyvcbOSC0KRogiwFhrr4q4mMJ-sB4LWfUjqXr4T1iSD2A7kEWoL',
              },
              {
                source: 'Reuters • 5h ago',
                title: 'Analysts Raise Price Target Following Strong Services Growth',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdsmQr5fyiIVfiAAil-Zcmz1vxjdFzRBsF8cWbT7DJRZIw-HP4h_FcTuGICzidMzVkcBC1LE6sHJ0kSBlwMwEKoVWRnTnF99rcvaAxGS5l1QFzQJVv26UaWydxfAqPgOhAF-rV23C_qQKge7WxHX4OCxv3jdJ4f43DqPSHjrZjFgLYNi8ANpWnDqbM9K1muxvPeYMz3o6QrddsXQyZ9zFN5fKVlnw1C9ZsRNVQmB4bRN6io1w2TD3iYZpc8oCjlE131tQtGx0MSi3Z',
              },
            ].map((news) => (
              <div key={news.source} className="flex gap-4 items-start">
                <div className="flex-1">
                  <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1">{news.source}</p>
                  <h3 className="text-sm font-bold leading-snug">{news.title}</h3>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0">
                  <img alt="News" className="w-full h-full object-cover" src={news.img} />
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* CTA */}
        <div className="mt-4">
          <button
            onClick={() => router.push(`/invest/stocks-market/amount?stockId=${stockId}`)}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Buy {marketStock.symbol}
          </button>
        </div>
      </main>
    </div>
  )
}

export default function StocksDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <StocksDetailsContent />
    </Suspense>
  )
}
