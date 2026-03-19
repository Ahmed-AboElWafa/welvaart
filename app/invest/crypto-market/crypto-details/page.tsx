'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../crypto'

/* ─── Realistic price data per time range ─── */
const CHART_DATA: Record<string, number[]> = {
  '1D': [66140, 66142, 66143, 66144, 66145, 66146, 66147, 66148, 66149, 66150, 66151, 66152, 66153, 66154, 66155, 66156, 66157, 66158, 66159, 66160, 66161, 66162, 66163, 66200],
  '1W': [65980, 65984, 65988, 65992, 65996, 66000, 66004, 66008, 66012, 66016, 66020, 66024, 66028, 66032, 66036, 66040, 66044, 66048, 66052, 66056, 66060, 66064, 66068, 66200],
  '1M': [65600, 65617, 65633, 65649, 65664, 65679, 65693, 65707, 65720, 65733, 65745, 65757, 65768, 65779, 65790, 65800, 65810, 65820, 65829, 65838, 65847, 65856, 65864, 66200],
  '1Y': [28000, 30800, 33400, 35800, 38000, 40000, 41900, 43700, 45400, 47000, 48500, 49900, 51200, 52400, 53500, 54500, 55400, 56200, 57000, 57700, 58350, 58950, 59500, 66200],
  'ALL': [5000, 9000, 13500, 18500, 24000, 30000, 36500, 43000, 49500, 54000, 56500, 58000, 59200, 60200, 61000, 61700, 62300, 62800, 63250, 63650, 64000, 64400, 65000, 66200],
}

const TIME_LABELS: Record<string, string[]> = {
  '1D': ['9AM', '11AM', '1PM', '3PM'],
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '1M': ['W1', 'W2', 'W3', 'W4'],
  '1Y': ['Jan', 'Apr', 'Jul', 'Oct'],
  'ALL': ["'20", "'21", "'22", "'23", "'24"],
}

function buildPath(data: number[], w = 400, h = 160, pad = 10): { line: string; area: string } {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const xs = data.map((_, i) => (i / (data.length - 1)) * w)
  const ys = data.map(v => h - pad - ((v - min) / range) * (h - pad * 2))

  const pts = xs.map((x, i) => [x, ys[i]] as [number, number])

  // Smooth using cardinal spline-like control points
  let line = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, pts.length - 1)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    line += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  const area = `${line} L ${pts[pts.length - 1][0]},${h} L ${pts[0][0]},${h} Z`
  return { line, area }
}

function CryptoChart({ price, isUp }: { price: number; isUp: boolean }) {
  const [activeRange, setActiveRange] = useState('1W')
  const data = CHART_DATA[activeRange]
  const { line, area } = buildPath(data, 400, 160)

  const min = Math.min(...data)
  const max = Math.max(...data)
  const yLabels = [max, (max + min) / 2, min].map(v =>
    v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v.toFixed(0)}`
  )
  const timeLabels = TIME_LABELS[activeRange]
  const color = isUp ? '#10b981' : '#f43f5e'
  const lastX = 400
  const lastY = 160 - 10 - ((data[data.length - 1] - min) / (max - min || 1)) * (160 - 20)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
      {/* Chart SVG */}
      <div className="relative w-full" style={{ height: 180 }}>
        {/* Y-axis price labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 pr-2 z-10">
          {yLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-slate-400 font-medium leading-none">{l}</span>
          ))}
        </div>

        {/* SVG chart area */}
        <div className="absolute left-8 right-0 top-0 bottom-5 overflow-hidden rounded-xl">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160">
            <defs>
              <linearGradient id="cryptoAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0.15, 0.5, 0.85].map((pct, i) => (
              <line key={i} x1="0" x2="400" y1={160 * pct} y2={160 * pct}
                stroke="currentColor" strokeOpacity={0.07} strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Area fill */}
            <path d={area} fill={`url(#cryptoAreaGrad)`} />

            {/* Line */}
            <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Latest price dot */}
            <circle cx={lastX} cy={lastY} r="5" fill={color} />
            <circle cx={lastX} cy={lastY} r="9" fill={color} fillOpacity={0.2} />

            {/* Dotted vertical line at latest price */}
            <line x1={lastX} y1={lastY + 10} x2={lastX} y2="160"
              stroke={color} strokeOpacity={0.4} strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Price tooltip at latest point */}
        <div className="absolute right-1 z-20" style={{ top: Math.max(0, (lastY / 160) * 100 - 12) + '%' }}>
          <div className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg whitespace-nowrap"
            style={{ backgroundColor: color }}>
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* X-axis time labels */}
        <div className="absolute left-8 right-0 bottom-0 flex justify-between">
          {timeLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-slate-400 font-medium">{l}</span>
          ))}
        </div>
      </div>

      {/* Range selector */}
      <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mt-2">
        {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${range === activeRange
                ? 'bg-white dark:bg-slate-700 text-primary dark:text-accent shadow-sm'
                : 'text-slate-400'
              }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}

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
          <CryptoChart price={marketCrypto.price} isUp={marketCrypto.up} />
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
