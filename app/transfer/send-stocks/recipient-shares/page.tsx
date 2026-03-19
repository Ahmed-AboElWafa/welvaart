'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'
import { MARKET } from '@/app/invest/stocks-market/stocks'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function RecipientSharesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { stockHoldings } = useApp()

  const rName = searchParams?.get('name') || 'Welvaart User'
  const rHandle = searchParams?.get('handle') || '@username'
  const rAvatar = searchParams?.get('avatar') || ''

  // Build dynamic stocks list from user's holdings + market data
  const STOCKS = useMemo(() => {
    if (!stockHoldings) return []
    const marketMap = MARKET.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as any)
    return stockHoldings.map(h => {
      const mc = marketMap[h.id]
      return {
        id: h.id,
        symbol: mc?.symbol || h.id.toUpperCase(),
        name: mc?.name || h.id.toUpperCase(),
        shares: h.shares,
        price: mc?.price || h.purchasePrice,
        change: mc?.change || '0%',
        positive: mc?.up ?? true,
        icon: mc?.icon || 'show_chart',
        iconBg: mc?.iconBg || 'bg-slate-100',
        iconColor: mc?.iconColor || 'text-slate-900',
        isIcon: true,
      }
    })
  }, [stockHoldings])

  const [shares, setShares] = useState('0')
  const [selectedStock, setSelectedStock] = useState<typeof STOCKS[0] | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [isUsdMode, setIsUsdMode] = useState(false)

  const stock = selectedStock || STOCKS[0]

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setShares((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && shares.includes('.')) {
      return
    } else if (shares === '0' && key !== '.') {
      setShares(key)
    } else {
      setShares((prev) => prev + key)
    }
  }

  const amountNum = parseFloat(shares) || 0
  const sharesQty = isUsdMode ? amountNum / (stock?.price || 1) : amountNum
  const usdValue = isUsdMode ? amountNum : amountNum * (stock?.price || 1)
  const newBalance = stock ? Math.max(0, stock.shares - sharesQty) : 0
  const newBalanceUSD = (newBalance * (stock?.price || 1)).toFixed(2)

  const handleSwitch = () => {
    if (!stock) return
    const converted = isUsdMode
      ? (amountNum / stock.price).toFixed(4)
      : (amountNum * stock.price).toFixed(2)
    setShares(String(parseFloat(converted)))
    setIsUsdMode((v) => !v)
  }

  const handleSelectStock = (s: typeof STOCKS[0]) => {
    setSelectedStock(s)
    setShares('0')
    setIsUsdMode(false)
    setShowPicker(false)
  }

  const canProceed = stock && sharesQty > 0 && sharesQty <= stock.shares

  if (STOCKS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <p className="text-slate-500 text-sm font-medium">You have no stock holdings to send.</p>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-[430px] mx-auto flex-col bg-background-light dark:bg-background-dark">
      <div className="h-4 w-full"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Stocks</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Recipient mini-badge */}
      {rHandle && (
        <div className="px-6 pb-2 flex items-center gap-2">
          {rAvatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={rAvatar} alt={rName} className="w-7 h-7 rounded-full border border-primary/20 object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">person</span>
            </div>
          )}
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sending to <span className="text-primary font-bold">{rHandle}</span></p>
        </div>
      )}

      {/* Progress Stepper */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 2 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Shares & Amount</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>

      {/* Stock selector */}
      <div className="px-6 py-2">
        <button
          onClick={() => setShowPicker(true)}
          className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-full ${stock?.iconBg || 'bg-slate-100'} flex items-center justify-center`}>
              <span className={`material-icons-round ${stock?.iconColor || 'text-slate-700'} text-xl`}>{stock?.icon}</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {stock?.name} ({stock?.symbol})
              </p>
              <p className="text-xs text-slate-500">
                {stock?.shares.toFixed(4)} shares available · ${stock?.price}/share
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <p className="text-xs font-bold">Choose Stock</p>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>
        </button>
      </div>

      {/* Amount Display */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-2">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-2">
            {isUsdMode && <span className="text-4xl font-extrabold text-slate-400">$</span>}
            <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{shares}</span>
            {!isUsdMode && <span className="text-3xl font-bold text-slate-400">Shares</span>}
            {isUsdMode && <span className="text-3xl font-bold text-slate-400">USD</span>}
          </div>
          <div className="flex items-center mt-2 gap-2 text-slate-500 dark:text-slate-400">
            {isUsdMode ? (
              <p className="text-lg font-medium">≈ {sharesQty.toFixed(4)} Shares</p>
            ) : (
              <p className="text-lg font-medium">≈ ${usdValue.toFixed(2)} USD</p>
            )}
            <button
              onClick={handleSwitch}
              className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="w-full mt-8 grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">Current Balance</p>
            <p className="font-extrabold text-xl text-slate-900 dark:text-white">{stock?.shares.toFixed(4)}</p>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Shares</p>
            <p className="text-[11px] text-slate-400 mt-1">
              ${((stock?.shares || 0) * (stock?.price || 0)).toFixed(2)} USD
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">New Balance</p>
            <p className={`font-extrabold text-xl ${newBalance <= 0 ? 'text-red-500' : 'text-primary'}`}>
              {newBalance.toFixed(4)}
            </p>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Shares</p>
            <p className="text-[11px] text-slate-400 mt-1">${newBalanceUSD} USD</p>
          </div>
        </div>
      </main>

      {/* Numpad */}
      <section className="px-8 pb-4">
        <div className="grid grid-cols-3 text-center">
          {KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="py-4 text-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors"
            >
              {key === 'backspace' ? (
                <span className="material-symbols-outlined">backspace</span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 pt-2 pb-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-base">face</span>
            <p className="text-slate-500 text-xs font-medium">Biometric Authentication Required</p>
          </div>
          <button
            onClick={() => stock && router.push(
              `/transfer/send-stocks/final-review?stockId=${stock.id}&symbol=${stock.symbol}&name=${encodeURIComponent(stock.name)}&shares=${sharesQty.toFixed(4)}&usd=${usdValue.toFixed(2)}&rName=${encodeURIComponent(rName)}&rHandle=${encodeURIComponent(rHandle)}&rAvatar=${encodeURIComponent(rAvatar)}&price=${stock.price}`
            )}
            disabled={!canProceed}
            className="w-full bg-primary hover:bg-premium-teal text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Review Transfer
          </button>
        </div>
      </footer>

      {/* Stock Picker Bottom Sheet */}
      {showPicker && (
        <div
          className="fixed inset-0 z-[80] flex flex-col justify-end"
          onClick={() => setShowPicker(false)}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div
            className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="font-display text-lg font-bold text-primary dark:text-white">Your Holdings</h2>
              <button
                onClick={() => setShowPicker(false)}
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>

            <div className="px-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {STOCKS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectStock(s)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${(selectedStock?.id || STOCKS[0]?.id) === s.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'
                    }`}
                >
                  <div className={`size-11 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
                    <span className={`material-icons-round ${s.iconColor} text-xl`}>{s.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.shares.toFixed(4)} shares available</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ${(s.shares * s.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </p>
                    <p className={`text-xs font-semibold ${s.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {s.change}
                    </p>
                  </div>
                  {(selectedStock?.id || STOCKS[0]?.id) === s.id && (
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SendStocksRecipientSharesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <RecipientSharesContent />
    </Suspense>
  )
}
