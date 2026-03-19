'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/hooks/useApp'

/* ─── Gold price data per time range (XAU/USD, per gram ~$62–64) ─── */
const CHART_DATA: Record<string, number[]> = {
  '1D': [1983.60, 1983.68, 1983.74, 1983.80, 1983.86, 1983.91, 1983.96, 1984.00, 1984.04, 1984.08, 1984.12, 1984.16, 1984.19, 1984.22, 1984.25, 1984.28, 1984.30, 1984.32, 1984.34, 1984.35, 1984.36, 1984.37, 1984.38, 1984.40],
  '1W': [1981.00, 1981.18, 1981.35, 1981.52, 1981.68, 1981.84, 1981.99, 1982.13, 1982.27, 1982.40, 1982.52, 1982.64, 1982.75, 1982.86, 1982.96, 1983.05, 1983.14, 1983.22, 1983.29, 1983.36, 1983.43, 1983.49, 1983.55, 1984.40],
  '1M': [1975.00, 1975.60, 1976.18, 1976.74, 1977.28, 1977.80, 1978.30, 1978.78, 1979.24, 1979.68, 1980.10, 1980.50, 1980.88, 1981.24, 1981.58, 1981.90, 1982.20, 1982.48, 1982.74, 1982.98, 1983.20, 1983.40, 1983.58, 1984.40],
  '1Y': [1820.00, 1838.00, 1855.00, 1871.00, 1886.00, 1900.00, 1913.00, 1925.00, 1936.00, 1946.00, 1955.00, 1963.00, 1970.00, 1976.00, 1979.00, 1980.50, 1981.20, 1981.80, 1982.30, 1982.80, 1983.20, 1983.60, 1984.00, 1984.40],
  'ALL': [1200.00, 1320.00, 1420.00, 1510.00, 1590.00, 1660.00, 1720.00, 1772.00, 1816.00, 1852.00, 1880.00, 1902.00, 1920.00, 1935.00, 1948.00, 1958.00, 1966.00, 1972.00, 1976.50, 1979.50, 1981.50, 1982.80, 1983.70, 1984.40],
}

const TIME_LABELS: Record<string, string[]> = {
  '1D': ['9AM', '11AM', '1PM', '3PM'],
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '1M': ['W1', 'W2', 'W3', 'W4'],
  '1Y': ['Jan', 'Apr', 'Jul', 'Oct'],
  'ALL': ["'18", "'19", "'20", "'21", "'22", "'23", "'24"],
}

function buildPath(data: number[], w = 400, h = 160, pad = 10, expand = 1): { line: string; area: string } {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const center = (min + max) / 2
  const halfRange = ((max - min) || 1) * expand / 2
  const expandedMin = center - halfRange
  const expandedMax = center + halfRange
  const range = expandedMax - expandedMin
  const xs = data.map((_, i) => (i / (data.length - 1)) * w)
  const ys = data.map(v => h - pad - ((v - expandedMin) / range) * (h - pad * 2))
  const pts = xs.map((x, i) => [x, ys[i]] as [number, number])

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

const GOLD_COLOR = '#D4AF37'

function GoldChart() {
  const [activeRange, setActiveRange] = useState('1D')
  const data = CHART_DATA[activeRange]
  const expand = activeRange === '1D' ? 12 : activeRange === '1W' ? 8 : activeRange === '1M' ? 5 : 1
  const { line, area } = buildPath(data, 400, 160, 10, expand)

  const min = Math.min(...data)
  const max = Math.max(...data)
  const yLabels = [max, (max + min) / 2, min].map(v => `$${v.toFixed(0)}`)
  const timeLabels = TIME_LABELS[activeRange]
  const lastX = 400
  const lastY = 160 - 10 - ((data[data.length - 1] - min) / (max - min || 1)) * (160 - 20)

  return (
    <div>
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
              <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD_COLOR} stopOpacity={0.35} />
                <stop offset="100%" stopColor={GOLD_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>

            {[0.15, 0.5, 0.85].map((pct, i) => (
              <line key={i} x1="0" x2="400" y1={160 * pct} y2={160 * pct}
                stroke="currentColor" strokeOpacity={0.07} strokeWidth="1" strokeDasharray="4 4" />
            ))}

            <path d={area} fill="url(#goldAreaGrad)" />
            <path d={line} fill="none" stroke={GOLD_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lastX} cy={lastY} r="5" fill={GOLD_COLOR} />
            <circle cx={lastX} cy={lastY} r="9" fill={GOLD_COLOR} fillOpacity={0.25} />
            <line x1={lastX} y1={lastY + 10} x2={lastX} y2="160"
              stroke={GOLD_COLOR} strokeOpacity={0.4} strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Price tooltip */}
        <div className="absolute right-1 z-20" style={{ top: Math.max(0, (lastY / 160) * 100 - 12) + '%' }}>
          <div className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg whitespace-nowrap"
            style={{ backgroundColor: GOLD_COLOR }}>
            $1,984.40
          </div>
        </div>

        {/* X-axis time labels */}
        <div className="absolute left-10 right-0 bottom-0 flex justify-between">
          {timeLabels.map((l, i) => (
            <span key={i} className="text-[9px] text-slate-400 font-medium">{l}</span>
          ))}
        </div>
      </div>

      {/* Range selector — lives here so it shares activeRange state */}
      <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl mt-3">
        {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${range === activeRange
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-accent'
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

export default function GoldTokensPage() {
  const router = useRouter()
  const { portfolio, loading } = useApp()

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Gold Tokens...</div>
      </div>
    )
  }

  const goldPricePerGram = 62.25;
  const goldGrams = (portfolio.gold / goldPricePerGram).toFixed(0);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/invest')}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
        </button>
        <h1 className="font-display text-lg font-bold text-primary dark:text-white">Gold Tokens</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary dark:text-accent">info</span>
        </button>
      </header>

      <main className="px-6 pb-32" style={{ paddingBottom: '32px' }}>
        {/* Balance Hero */}
        <section className="mt-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 shadow-inner ring-4 ring-accent/5">
            <span className="material-symbols-outlined text-accent text-5xl font-bold">diamond</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{goldGrams} g</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">${portfolio.gold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
        </section>

        {/* Price Chart */}
        <section className="mt-8 glass-card rounded-3xl p-5 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">XAU / USD</p>
              <p className="text-lg font-bold">
                $1,984.40{' '}
                <span className="text-emerald-500 text-xs ml-1 font-semibold">+0.42%</span>
              </p>
            </div>
          </div>

          <GoldChart />
        </section>

        {/* Action Buttons */}
        <section className="mt-6 flex gap-3">
          <button
            onClick={() => router.push('/invest/gold-tokens/buy')}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            Buy
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens/sell')}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-4 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-primary dark:text-accent">sell</span>
            Sell
          </button>
          <button
            onClick={() => router.push('/invest/gold-tokens/redeem/amount')}
            className="flex-1 bg-premium-teal text-accent py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            Redeem
          </button>
        </section>

        {/* About Section */}
        <section className="mt-8">
          <h3 className="font-display text-xl text-slate-800 dark:text-white mb-4">About Gold Tokens</h3>
          <div className="glass-card p-5 rounded-2xl mb-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-xl">token</span>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Asset Composition</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Each token is 100% backed by physical gold.{' '}
                  <span className="text-slate-900 dark:text-white font-semibold">
                    1 Token = 1 Gram of 24k LBMA-certified physical gold.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary dark:text-accent text-lg">assured_workload</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vault Location</p>
              </div>
              <p className="font-semibold text-sm">Dubai, United Arab Emirates</p>
              <p className="text-[9px] text-slate-500 mt-1">High-Security Facility</p>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-500 text-lg">verified</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Audit Status</p>
              </div>
              <p className="font-semibold text-sm">Verified Monthly</p>
              <p className="text-[9px] text-emerald-500 font-bold mt-1">Last audit: 2 days ago</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

