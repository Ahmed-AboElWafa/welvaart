'use client'
import { useRouter } from 'next/navigation'

export default function TransferPage() {
  const router = useRouter()

  return (
    <div className="bg-background-light min-h-screen">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <button
          onClick={() => router.push('/home')}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10 text-base">Transfer Assets</h2>
      </div>
      <main className="px-6">
        <p className="text-slate-500 mt-2 mb-8">Select the asset type you wish to send. Transfers within GlobalFin are instant and free.</p>
        <div className="space-y-4">
          <button onClick={() => router.push('/transfer/send-fiat/select-recipient')} className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 active:scale-[0.98] transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span className="material-icons-round text-2xl">payments</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Send Fiat</h3>
              <p className="text-sm text-slate-500">To Bank or GlobalFin account</p>
            </div>
            <span className="material-icons-round text-slate-400">chevron_right</span>
          </button>
          <button onClick={() => router.push('/transfer/send-crypto/recepient-network')} className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 active:scale-[0.98] transition-all">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <span className="material-icons-round text-2xl">currency_bitcoin</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Send Crypto</h3>
              <p className="text-sm text-slate-500">To any crypto wallet or address</p>
            </div>
            <span className="material-icons-round text-slate-400">chevron_right</span>
          </button>
          <button onClick={() => router.push('/transfer/send-gold/select-recipient')} className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 active:scale-[0.98] transition-all">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <span className="material-icons-round text-2xl">diamond</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Send Gold</h3>
              <p className="text-sm text-slate-500">Transfer gold tokens to another user</p>
            </div>
            <span className="material-icons-round text-slate-400">chevron_right</span>
          </button>
          <button onClick={() => router.push('/transfer/send-stocks/select-recipient')} className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 active:scale-[0.98] transition-all">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="material-icons-round text-2xl">show_chart</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Send Stocks</h3>
              <p className="text-sm text-slate-500">Transfer stock shares to another user</p>
            </div>
            <span className="material-icons-round text-slate-400">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  )
}
