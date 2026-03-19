'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/hooks/useApp'

export default function DepositPage() {
  const router = useRouter()
  const { portfolio, loading } = useApp()

  if (loading || !portfolio) {
    return (
      <div className="bg-background-light text-slate-900 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Deposit...</div>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex h-screen max-w-[430px] mx-auto flex-col overflow-hidden bg-background-light border-x border-border-light">
        <div className="h-4 w-full"></div>
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={() => router.push('/')}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back_ios_new</span>
          </button>
          <h2 className="text-xl font-bold flex-1 text-center pr-10 text-base">Deposit Assets</h2>
        </div>
        <div className="px-6 py-4">
          <div className="bg-card-light border border-border-light p-6 rounded-xl shadow-sm">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Current Portfolio</p>
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
              <span className="text-emerald-400 text-sm font-medium">+{portfolio.todayChange}%</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-12">
          <h2 className="text-[20px] font-bold leading-tight tracking-tight px-2 pb-4 pt-4 text-primary">Choose deposit method</h2>
          <Link href="/deposit/bank-transfer" className="flex items-center gap-4 bg-white border border-border-light rounded-xl px-4 min-h-[88px] mb-3 hover:bg-slate-50 transition-all cursor-pointer group shadow-sm">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">account_balance</span>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-slate-900 text-base font-bold leading-tight">Bank Transfer</p>
              <p className="text-slate-500 text-sm font-medium leading-normal mt-1">Deposit via SEPA, IBAN or SWIFT</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
          </Link>
          <Link href="/deposit/receive-crypto" className="flex items-center gap-4 bg-white border border-border-light rounded-xl px-4 min-h-[88px] mb-3 hover:bg-slate-50 transition-all cursor-pointer group shadow-sm">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">currency_bitcoin</span>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-slate-900 text-base font-bold leading-tight">Deposit Crypto</p>
              <p className="text-slate-500 text-sm font-medium leading-normal mt-1">Transfer BTC, ETH, USDT from external wallet</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
          </Link>
          <div className="flex items-center gap-4 bg-white border border-border-light rounded-xl px-4 min-h-[88px] mb-3 hover:bg-slate-50 transition-all cursor-pointer group shadow-sm">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">auto_graph</span>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2">
                <p className="text-slate-900 text-base font-bold leading-tight">Deposit Gold / Stocks</p>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent-gold/20 text-accent-gold font-bold uppercase">Pro</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-normal mt-1">From external broker or partner account</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
          </div>
        </div>
      </div>
    </>
  )
}
