'use client'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { useApp } from '@/hooks/useApp'

export default function InvestPage() {
  const router = useRouter()
  const { user, portfolio, loading } = useApp()

  if (loading || !user || !portfolio) {
    return (
      <div className="bg-background-light text-slate-900 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Investment Hub...</div>
      </div>
    )
  }

  return (
    <div className="bg-background-light min-h-screen relative">
      <div className="h-6 w-full"></div>
      <header className="px-6 pt-2 pb-4 sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Welvaart</p>
            <h1 className="text-3xl font-bold">Investments</h1>
          </div>
        </div>
        <div className="relative group">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-slate-200/50 dark:bg-slate-800/50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-500" placeholder="Search crypto or stocks..." type="text" />
        </div>
      </header>
      <main className="px-6 pb-24">
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Portfolio</p>
              <h2 className="text-4xl font-bold tracking-tight">${(portfolio.totalValue - portfolio.fiat).toLocaleString('en-US', { maximumFractionDigits: 2 })}</h2>
            </div>
            <div className="flex items-center text-emerald-500 font-semibold mb-1">
              <span className="material-icons-round text-lg">trending_up</span>
              <span className="ml-1 text-sm">+2.4%</span>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-6 px-6">
            <div onClick={() => router.push('/invest/crypto-market')} className="min-w-[160px] flex-1 bg-primary p-4 rounded-3xl text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="material-icons-round opacity-80">currency_bitcoin</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Crypto</span>
              </div>
              <p className="text-xs opacity-80">Balance</p>
              <p className="text-lg font-bold">${portfolio.crypto.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div onClick={() => router.push('/invest/stocks-market')} className="min-w-[160px] flex-1 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-transform active:scale-95 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="material-icons-round text-primary">show_chart</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">Stocks</span>
              </div>
              <p className="text-xs text-slate-500">Balance</p>
              <p className="text-lg font-bold">${portfolio.stocks.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
            <div onClick={() => router.push('/invest/gold-tokens')} className="min-w-[160px] flex-1 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 transition-transform active:scale-95 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="material-icons-round text-amber-500">monetization_on</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">Gold</span>
              </div>
              <p className="text-xs text-slate-500">Balance</p>
              <p className="text-lg font-bold">${portfolio.gold.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Market Trends</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 no-scrollbar -mx-6 px-6">
            <div style={{ height: '120px' }} className="min-w-[140px] bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="material-icons-round text-orange-500 text-sm">currency_bitcoin</span>
                </div>
                <span className="font-bold text-sm">BTC</span>
              </div>
              <p className="text-sm font-bold mb-1">$64,120</p>
              <p className="text-[12px] text-emerald-500 mt-1 font-semibold">+1.8%</p>
            </div>
            <div style={{ height: '120px' }} className="min-w-[140px] bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="material-icons-round text-blue-500 text-sm">apple</span>
                </div>
                <span className="font-bold text-sm">AAPL</span>
              </div>
              <p className="text-sm font-bold mb-1">$189.43</p>
              <p className="text-[12px] text-rose-500 mt-1 font-semibold">-0.4%</p>
            </div>
            <div style={{ height: '120px' }} className="min-w-[140px] bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="material-icons-round text-indigo-500 text-sm">token</span>
                </div>
                <span className="font-bold text-sm">ETH</span>
              </div>
              <p className="text-sm font-bold mb-1">$3,420.15</p>
              <p className="text-[12px] text-emerald-500 mt-1 font-semibold">+4.2%</p>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight">Top News</h2>
            <button className="text-xs font-bold text-primary dark:text-accent">See All</button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4 transition-transform active:scale-[0.99]">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img alt="Crypto News" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHwsuvZLVeOArn9Vlzde18KV_Bb3_wOdYaj3aUSkGCSbUFLdaSlBwYsTJFMmwfOSKD26el3avIliC92RXminQ-AvT_Hvp7cvzQ_Q6PG8D9KLxmtC0g0XRYsfcS6KC7UpbuezZIw6PFi95X2_Zt_i47OM9ZXyeyQfB5CgXEIL9XgthlOfLy3eV-cL2njBzUPgNwIzMsUOgvYzjAKkYHIAl4exRnBDAx5-HzQUolA4W79BG7lMvqEuOnIATrYg9cRifQ-_tEYmpZShpL" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h3 className="text-sm font-bold leading-snug line-clamp-2">Global markets reach all-time highs as inflation pressures ease.</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary dark:text-accent">BLOOMBERG</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-[10px] text-slate-500 font-medium">1h ago</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4 transition-transform active:scale-[0.99]">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img alt="Crypto News" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeyt-mhI08CGcGGACnaUQk0MVPxvemVAvjKLQvaho7wbCi0IIBMIN542nMgdiEoJYxh06AGkwSkgBlpRl-bLg1egmKs6NcQLK1eOa7YueCmwTRfKA5tz9fw8V9yBC-TmgEGKfIR7tZGttmmCpiX_4kXM4T5djNFIyrQWGjCCTSre4RMMheYtQ6jNqeAOqjpqREs7b4dmX31m_UXZjpSYax_a9ElpUJJUBXe_IzFY9YZJUMMJkaFQs4dmzQIZuPz0UouSC4tRBDt1Qn" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h3 className="text-sm font-bold leading-snug line-clamp-2">Institutional interest in digital assets surges as regulatory clarity improves.</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary dark:text-accent">FINANCIAL TIMES</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-[10px] text-slate-500 font-medium">2h ago</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4 transition-transform active:scale-[0.99]">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img alt="Market News" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdzJDIPhlCRDhd7-FnnitM8yB1QlGa98t1KBrOZYZqHRiQS-577CzorJLEYFgxbBziHmSSxfwXnGIHjUt58R7qy4HFvAAO0ZAI60Ek5QYEcRBDdZ_orCZ4I27M5MR1oHkM-QqoKn11eiwAOdbZwukTDQLn5HwSit5YRrFkLHoVWBgWrYVOTDoV7VVn0uf7-0FIllcxqYOp5Gd1H-cBgmsveanVgo8T84E9qLMdhePdqr50IS1p5UHGOkInIydhws64lHanu1YjlEqI" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h3 className="text-sm font-bold leading-snug line-clamp-2">New ETF approvals expected to drive record volume in Q4 markets.</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary dark:text-accent">BLOOMBERG</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-[10px] text-slate-500 font-medium">5h ago</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pt-2 pb-2">
              <div className="min-w-[260px] bg-primary rounded-[1.5rem] p-4 text-white shadow-lg shadow-primary/20 flex flex-col justify-between h-32">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Flash Report</span>
                  <span className="w-1 h-1 rounded-full bg-accent"></span>
                </div>
                <h4 className="text-sm font-bold leading-tight">Global central banks maintain interest rates, sparking market rally.</h4>
                <p className="text-[10px] font-medium opacity-70 italic">Reuters • 15m ago</p>
              </div>
              <div className="min-w-[260px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] p-4 shadow-sm flex flex-col justify-between h-32">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-accent">Analysis</span>
                  <span className="w-1 h-1 rounded-full bg-primary/20 dark:bg-accent/20"></span>
                </div>
                <h4 className="text-sm font-bold leading-tight dark:text-slate-100">Why the upcoming Bitcoin halving differs from previous cycles.</h4>
                <p className="text-[10px] font-medium text-slate-500">Welvaart Insights • 1h ago</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Your Assets</h3>
            <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
              <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded-md text-xs font-semibold shadow-sm">All</button>
              <button className="px-3 py-1 text-xs font-semibold text-slate-500">Crypto</button>
              <button className="px-3 py-1 text-xs font-semibold text-slate-500">Stocks</button>
            </div>
          </div>
          <div className="space-y-4">
            <div onClick={() => router.push('/invest/crypto-market')} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 transition-transform active:scale-[0.98] cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <img alt="BTC" className="w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU2NdMYQiEur-X_7ZA3-WyBSdWI2vDVtYHeSGifLbbL9WImfhQiTx1n5GYLiB9e6j7ouTRLbufeJ0McjYVmiQQFXxslsXNyIL0Z9QzoTzX0DNZ0Eu9wub_OXhQOQK-NwkyWcz-8zr21XSu8ol4WLEGKB3JTwsT609EHDS78jsKMTtWk2hCDyIxh9to4j1JGXyAzXDGLYc8_wuNdymOfGxU2l4tA31oYmlpu2ZnVXvzgoF00yJ7Ec9nXrLZu7LEpNoZbC8C55Xh2tTz" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Bitcoin</p>
                <p className="text-xs text-slate-500">0.325 BTC</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$20,839.00</p>
                <p className="text-xs text-emerald-500 font-semibold">+1.25%</p>
              </div>
            </div>
            <div onClick={() => router.push('/invest/stocks-details')} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 transition-transform active:scale-[0.98] cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <div className="bg-black w-full h-full flex items-center justify-center text-white">
                  <span className="material-icons-round text-xl">electric_bolt</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold">Tesla Inc.</p>
                <p className="text-xs text-slate-500">12 Shares</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$2,076.48</p>
                <p className="text-xs text-rose-500 font-semibold">-2.10%</p>
              </div>
            </div>
            <div onClick={() => router.push('/invest/crypto-market')} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 transition-transform active:scale-[0.98] cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <img alt="ETH" className="w-7 h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOo8twZFCc8Sh_9bxT4z1plYaQJ9WpL0x8sveTySK-U5a7jEWvzhmBJSgxSQ29k192KRRH98ByjdcIvnuGbiheVUoM-DpftPOAW-0AI5jxwKZFzM7G2eacYNnQvmBmYpRBhU_u3mmVxbZQ1VhcoZJivrqz32F3cEMpAFVYE4N4qyqyu9SBGmX7WxtxtIRRTCSQ0S9Ss9RG9VLjZsb5kcJOWv0JsimsgDL9CfFdVjeOwNW5bp3RCf7Qj4bWnxgl-uTrv7e8W_MMzfb1" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Ethereum</p>
                <p className="text-xs text-slate-500">2.14 ETH</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$7,319.12</p>
                <p className="text-xs text-emerald-500 font-semibold">+3.80%</p>
              </div>
            </div>
            <div onClick={() => router.push('/invest/stocks-details')} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 transition-transform active:scale-[0.98] cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <div className="bg-blue-600 w-full h-full flex items-center justify-center text-white">
                  <span className="material-icons-round text-xl">computer</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold">Microsoft</p>
                <p className="text-xs text-slate-500">8 Shares</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$3,312.00</p>
                <p className="text-xs text-emerald-500 font-semibold">+0.75%</p>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <BottomNav />
    </div>
  )
}
