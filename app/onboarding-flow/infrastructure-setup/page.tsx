'use client'
import { useRouter } from 'next/navigation'

export default function InfrastructureSetupPage() {
  const router = useRouter()

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>
      {/* Top Navigation */}
      {/* <header className="px-6 py-2 flex items-center shrink-0 z-40">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-display text-2xl font-bold text-primary dark:text-white mr-10">Infrastructure Setup</h1>
      </header> */}

      {/* Main Heading */}
      <h2 className="text-primary dark:text-white tracking-tight text-[28px] font-display font-bold leading-tight px-6 text-left pb-3 pt-5">Setting up your financial rails</h2>

      {/* Vertical Stepper */}
      <div className="grid grid-cols-[40px_1fr] gap-x-2 px-6 mb-6">
        {/* Step 1: Complete */}
        <div className="flex flex-col items-center gap-1 pt-3">
          <div className="text-primary dark:text-accent">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div className="w-[2px] bg-primary/30 dark:bg-slate-700 h-8"></div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-slate-900 dark:text-white text-base font-semibold">Creating Account</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Complete</p>
        </div>

        {/* Step 2: Processing */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-[2px] bg-primary/30 dark:bg-slate-700 h-2"></div>
          <div className="text-primary dark:text-accent">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div className="w-[2px] bg-primary/30 dark:bg-slate-700 h-8 grow"></div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-slate-900 dark:text-white text-base font-semibold">Connecting Crypto Custody</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Complete</p>
        </div>

        {/* Step 3: Pending */}
        <div className="flex flex-col items-center gap-1 pb-3">
          <div className="w-[2px] bg-primary/30 dark:bg-slate-700 h-2"></div>
          <div className="text-primary dark:text-accent">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-slate-900 dark:text-white text-base font-medium">Connecting Banking Partner</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Complete</p>
        </div>
      </div>

      {/* Confirmation Card */}
      <div className="px-6">
        <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-lg border border-primary/10 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl">
              <span className="material-symbols-outlined text-primary dark:text-accent text-3xl">verified_user</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Account Setup Complete</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">All systems are operational</p>
            </div>
          </div>
          <div className="space-y-3 py-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Crypto Wallet</span>
              <span className="text-primary dark:text-accent text-xs font-bold bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 pb-2">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Banking Rail</span>
              <span className="text-primary dark:text-accent text-xs font-bold bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Account</span>
              <span className="text-primary dark:text-accent text-xs font-bold bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Online</span>
            </div>
          </div>
          <div className="w-full bg-slate-50 dark:bg-slate-900/30 rounded-xl p-3 mt-2">
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Your infrastructure is ready for high-volume transactions. You can now start managing assets and executing trades.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action */}
      <footer className="px-6 pt-6 pb-10 mt-auto">
        <button
          onClick={() => router.push('/home')}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Enter Dashboard
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </footer>
    </div>
  )
}
