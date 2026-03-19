'use client'
import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'

import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/crypto-market/crypto'

// ── All convertible assets ────────────────────────────────────────
const FALLBACK_ASSETS = [
  { id: 'usd', symbol: 'USD', name: 'US Dollar', type: 'Fiat', rateToUSD: 1, balance: 52430, icon: 'payments', iconBg: 'bg-primary', iconColor: 'text-white' },
  { id: 'eur', symbol: 'EUR', name: 'Euro', type: 'Fiat', rateToUSD: 1.085, balance: 9380, icon: 'euro', iconBg: 'bg-indigo-600', iconColor: 'text-white' },
]

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function fmtBalance(asset: any) {
  if (asset.type === 'Fiat') {
    const prefix = asset.id === 'eur' ? '€' : asset.id === 'gbp' ? '£' : asset.id === 'aed' ? 'د.إ ' : asset.id === 'jpy' ? '¥' : '$'
    return `${prefix}${asset.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `${asset.balance} ${asset.symbol}`
}

export default function ConvertPage() {
  const router = useRouter()
  const { fiatAccounts, cryptoHoldings, portfolio } = useApp()

  const AVAILABLE_ASSETS = useMemo(() => {
    const assets: any[] = []

    const fiatRates: Record<string, number> = { usd: 1, eur: 1.085, gbp: 1.27, chf: 1.12, aed: 0.272, cad: 0.741, jpy: 0.00667 }
    fiatAccounts?.forEach((acc) => {
      assets.push({
        id: acc.id,
        symbol: acc.currency === 'Euro' ? 'EUR' : acc.currency === 'British Pound' ? 'GBP' : acc.currency === 'Swiss Franc' ? 'CHF' : acc.currency === 'UAE Dirham' ? 'AED' : acc.currency === 'Canadian Dollar' ? 'CAD' : acc.currency === 'Japanese Yen' ? 'JPY' : 'USD',
        name: acc.name,
        type: 'Fiat',
        rateToUSD: fiatRates[acc.id] || 1,
        balance: parseFloat((acc.balance || '0').replace(/د\.إ/g, '').replace(/[^0-9.]/g, '')) || 0,
        icon: acc.flag,
        iconBg: 'bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden',
        iconColor: 'text-slate-900 dark:text-white',
        isUrl: true
      })
    })

    const MARKET_MAP = MARKET.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as any)
    cryptoHoldings?.forEach((h) => {
      const mc = MARKET_MAP[h.id]
      if (mc) {
        assets.push({
          id: h.id,
          symbol: mc.symbol,
          name: mc.name,
          type: 'Crypto',
          rateToUSD: mc.price,
          balance: h.amount,
          icon: mc.icon,
          iconBg: mc.iconBg,
          iconColor: mc.iconColor,
          isUrl: false
        })
      }
    })

    assets.push({
      id: 'xau',
      symbol: 'XAU',
      name: 'Gold Token',
      type: 'Gold',
      rateToUSD: 62.5,
      balance: portfolio?.gold ? portfolio.gold / 62.5 : 0,
      icon: 'award_star',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
      isUrl: false
    })

    return assets.length > 0 ? assets : FALLBACK_ASSETS
  }, [fiatAccounts, cryptoHoldings, portfolio])

  const [fromId, setFromId] = useState('usd')
  const [toId, setToId] = useState('btc')
  const [amount, setAmount] = useState('0')
  const [picker, setPicker] = useState<'from' | 'to' | null>(null)

  const from = AVAILABLE_ASSETS.find(a => a.id === fromId) || AVAILABLE_ASSETS[0]
  const to = AVAILABLE_ASSETS.find(a => a.id === toId) || AVAILABLE_ASSETS[1] || AVAILABLE_ASSETS[0]

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && amount.includes('.')) {
      return
    } else if (amount === '0' && key !== '.') {
      setAmount(key)
    } else {
      setAmount(prev => prev + key)
    }
  }

  const amountNum = parseFloat(amount) || 0
  const amountInUSD = amountNum * from.rateToUSD
  const converted = amountInUSD / to.rateToUSD
  const rate = to.rateToUSD / from.rateToUSD

  const handleSwap = () => {
    setFromId(to.id)
    setToId(from.id)
    // convert current amount to the new "from" denomination
    const newAmt = converted
    if (newAmt === 0) setAmount('0')
    else setAmount(parseFloat(newAmt.toFixed(6)).toString())
  }

  const handlePickAsset = (asset: any) => {
    if (picker === 'from') {
      if (asset.id === to.id) setToId(from.id)
      setFromId(asset.id)
    } else {
      if (asset.id === from.id) setFromId(to.id)
      setToId(asset.id)
    }
    setAmount('0')
    setPicker(null)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col max-w-[430px] mx-auto">
      <div className="h-4 w-full" />

      {/* Header */}
      <header className="flex items-center px-4 py-3 shrink-0">
        <button
          onClick={() => router.push('/home')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-10">Convert Assets</h1>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-4 overflow-y-auto">

        {/* ── From / To cards ── */}
        <div className="relative flex flex-col gap-1">

          {/* FROM card */}
          <div className="bg-white dark:bg-slate-800 rounded-[28px] border border-slate-100 dark:border-slate-700 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From</span>
              <span className="text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full font-medium">
                Bal: {fmtBalance(from)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setPicker('from')}
                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-600 active:scale-95 transition-transform"
              >
                <div className={`size-9 rounded-full ${from.iconBg} flex items-center justify-center shrink-0`}>
                  {from.isUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={from.icon} alt={from.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className={`material-symbols-outlined ${from.iconColor} text-[18px]`}>{from.icon}</span>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm leading-none">{from.symbol}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{from.type}</p>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
              </button>

              {/* Large amount display */}
              <p className="text-4xl font-extrabold text-primary dark:text-white tracking-tight text-right truncate max-w-[160px]">
                {amountNum === 0 ? '0' : parseFloat(amountNum.toFixed(6)).toString()}
              </p>
            </div>
          </div>

          {/* Swap button — centred between cards */}
          <div className="flex justify-center items-center z-10 -my-1">
            <button
              onClick={handleSwap}
              className="size-12 rounded-full bg-white dark:bg-slate-800 border-[3px] border-primary dark:border-accent flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-primary dark:text-accent text-2xl font-bold">swap_vert</span>
            </button>
          </div>

          {/* TO card */}
          <div className="bg-white dark:bg-slate-800 rounded-[28px] border border-slate-100 dark:border-slate-700 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">To</span>
              <span className="text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full font-medium">
                Bal: {fmtBalance(to)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setPicker('to')}
                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-600 active:scale-95 transition-transform"
              >
                <div className={`size-9 rounded-full ${to.iconBg} flex items-center justify-center shrink-0`}>
                  {to.isUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={to.icon} alt={to.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className={`material-symbols-outlined ${to.iconColor} text-[18px]`}>{to.icon}</span>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm leading-none">{to.symbol}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{to.type}</p>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
              </button>

              <div className="text-right">
                <p className="text-4xl font-extrabold text-emerald-500 tracking-tight truncate max-w-[160px]">
                  {converted === 0 ? '0' : parseFloat(converted.toFixed(6)).toString()}
                </p>
                <p className="text-xs text-slate-400 mt-1">≈ ${amountInUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rate info strip ── */}
        <div className="mt-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-5 py-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-base">monitoring</span>
              <span>Rate</span>
            </div>
            <span className="font-semibold text-primary dark:text-accent text-xs">
              1 {from.symbol} = {rate < 0.0001 ? rate.toExponential(4) : rate.toLocaleString('en-US', { maximumFractionDigits: 6 })} {to.symbol}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Fee</span>
            </div>
            <span className="text-emerald-500 font-bold text-[11px] bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">Zero Internal Fees</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>Arrival</span>
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">Instant</span>
          </div>
        </div>

        {/* ── Numpad ── */}
        <div className="mt-4 px-2">
          <div className="grid grid-cols-3 text-center">
            {KEYS.map(key => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className="py-3.5 text-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center justify-center transition-colors active:scale-95"
              >
                {key === 'backspace'
                  ? <span className="material-symbols-outlined text-xl">backspace</span>
                  : key}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="px-6 pt-4 pb-10">
        <button
          onClick={() => router.push(`/convert/review?fromId=${from.id}&toId=${to.id}&amount=${amountNum}`)}
          disabled={amountNum <= 0 || amountNum > from.balance}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Preview Conversion
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </footer>

      {/* ── Asset Picker Bottom Sheet ── */}
      {picker && (
        <div
          className="fixed inset-0 z-[80] flex flex-col justify-end"
          onClick={() => setPicker(null)}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div
            className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="text-lg font-bold text-primary dark:text-white">
                Select {picker === 'from' ? 'From' : 'To'} Asset
              </h2>
              <button
                onClick={() => setPicker(null)}
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>

            {/* Group by type */}
            {(['Fiat', 'Crypto', 'Gold'] as const).map(type => {
              const group = AVAILABLE_ASSETS.filter((a: any) => a.type === type)
              return (
                <div key={type} className="px-4 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">{type}</p>
                  <div className="space-y-2">
                    {group.map((asset: any) => {
                      const active = picker === 'from' ? asset.id === from.id : asset.id === to.id
                      return (
                        <button
                          key={asset.id}
                          onClick={() => handlePickAsset(asset)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${active
                            ? 'border-primary bg-primary/5'
                            : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'
                            }`}
                        >
                          <div className={`size-10 rounded-full ${asset.iconBg} flex items-center justify-center shrink-0`}>
                            {asset.isUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={asset.icon} alt={asset.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className={`material-symbols-outlined ${asset.iconColor} text-[18px]`}>{asset.icon}</span>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{asset.name}</p>
                            <p className="text-xs text-slate-500">{fmtBalance(asset)}</p>
                          </div>
                          <p className="text-xs font-bold text-slate-500 shrink-0">{asset.symbol}</p>
                          {active && (
                            <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
