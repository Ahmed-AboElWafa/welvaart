'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MARKET } from '../stocks'

/* ─── Realistic stock price data per time range ─── */
const CHART_DATA: Record<string, number[]> = {
  '1D': [189.18, 189.19, 189.19, 189.20, 189.20, 189.20, 189.21, 189.21, 189.21, 189.22, 189.22, 189.22, 189.23, 189.23, 189.23, 189.24, 189.24, 189.24, 189.25, 189.25, 189.25, 189.26, 189.27, 189.30],
  '1W': [189.00, 189.01, 189.02, 189.03, 189.04, 189.05, 189.06, 189.07, 189.08, 189.09, 189.10, 189.11, 189.12, 189.13, 189.14, 189.15, 189.16, 189.17, 189.18, 189.19, 189.20, 189.21, 189.22, 189.30],
  '1M': [188.40, 188.43, 188.46, 188.49, 188.52, 188.55, 188.57, 188.60, 188.62, 188.65, 188.67, 188.70, 188.72, 188.75, 188.77, 188.80, 188.82, 188.85, 188.87, 188.90, 188.92, 188.95, 188.97, 189.30],
  '1Y': [142.00, 145.20, 148.30, 151.20, 153.90, 156.40, 158.70, 160.80, 162.70, 164.40, 165.90, 167.20, 168.35, 169.30, 170.10, 170.75, 171.25, 171.65, 171.95, 172.30, 172.80, 173.50, 174.45, 189.30],
  'ALL': [95.00, 102.00, 108.50, 114.50, 120.00, 125.00, 129.50, 133.50, 137.00, 140.00, 142.50, 144.50, 146.20, 147.60, 148.80, 149.80, 150.60, 151.30, 151.90, 152.40, 152.80, 153.10, 153.30, 189.30],
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

function StocksChart({ price, isUp }: { price: number; isUp: boolean }) {
  const [activeRange, setActiveRange] = useState('1M')
  const data = CHART_DATA[activeRange]
  const { line, area } = buildPath(data, 400, 160)

  const min = Math.min(...data)
  const max = Math.max(...data)
  const yLabels = [max, (max + min) / 2, min].map(v => `$${v.toFixed(2)}`)
  const timeLabels = TIME_LABELS[activeRange]
  const color = isUp ? '#10b981' : '#f43f5e'
  const lastX = 400
  const lastY = 160 - 10 - ((data[data.length - 1] - min) / (max - min || 1)) * (160 - 20)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-700 mb-4">
      {/* Chart area */}
      <div className="relative w-full" style={{ height: 180 }}>
        {/* Y-axis price labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 pr-2 z-10">
          {yLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-slate-400 font-medium leading-none">{l}</span>
          ))}
        </div>

        {/* SVG chart area */}
        <div className="absolute left-10 right-0 top-0 bottom-5 overflow-hidden rounded-xl">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160">
            <defs>
              <linearGradient id="stockAreaGrad" x1="0" y1="0" x2="0" y2="1">
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
            <path d={area} fill="url(#stockAreaGrad)" />

            {/* Line */}
            <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Latest price dot + pulse ring */}
            <circle cx={lastX} cy={lastY} r="5" fill={color} />
            <circle cx={lastX} cy={lastY} r="9" fill={color} fillOpacity={0.2} />

            {/* Dotted vertical tether to axis */}
            <line x1={lastX} y1={lastY + 10} x2={lastX} y2="160"
              stroke={color} strokeOpacity={0.4} strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Price tooltip at latest point */}
        <div className="absolute right-1 z-20" style={{ top: Math.max(0, (lastY / 160) * 100 - 12) + '%' }}>
          <div className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg whitespace-nowrap"
            style={{ backgroundColor: color }}>
            ${price.toFixed(2)}
          </div>
        </div>

        {/* X-axis time labels */}
        <div className="absolute left-10 right-0 bottom-0 flex justify-between">
          {timeLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-slate-400 font-medium">{l}</span>
          ))}
        </div>
      </div>

      {/* Range selector */}
      <div className="flex justify-between items-center bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl mt-2">
        {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${range === activeRange
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500'
              }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}

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
          <StocksChart price={marketStock.price} isUp={marketStock.up} />
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
