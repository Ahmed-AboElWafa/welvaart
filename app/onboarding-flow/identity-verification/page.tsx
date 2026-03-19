'use client'
import { useRouter } from 'next/navigation'

export default function IdentityVerificationPage() {
  const router = useRouter()

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>
      {/* Top Navigation */}
      <header className="px-6 py-2 flex items-center shrink-0 z-40">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-display text-2xl font-bold text-primary dark:text-white mr-10">Identity Verification</h1>
      </header>

      {/* Progress Indicator */}
      <div className="flex flex-col gap-3 px-6 pb-2">
        <div className="flex justify-between">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Account Setup</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Step 3 of 3</p>
        </div>
        <div className="rounded-full bg-primary/10 dark:bg-slate-800 h-2">
          <div className="h-2 rounded-full bg-primary transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Header Content */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-primary dark:text-white tracking-tight text-[28px] font-display font-bold leading-tight pb-3">Verify your identity</h2>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">To keep your account secure and comply with regulations, we need to verify who you are. This process only takes a few minutes.</p>
      </div>

      {/* Verification Steps List */}
      <div className="flex flex-col px-6 mt-4 flex-1">
        {/* Step 1: Upload ID */}
        <div className="grid grid-cols-[48px_1fr] gap-x-4">
          <div className="flex flex-col items-center">
            <div className="flex w-10 h-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent">
              <span className="material-symbols-outlined text-[24px]">id_card</span>
            </div>
            <div className="w-[2px] bg-slate-200 dark:bg-slate-700 grow my-1"></div>
          </div>
          <div className="flex flex-col pb-8 pt-1">
            <p className="text-slate-900 dark:text-white text-lg font-semibold leading-tight">Upload ID</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Valid Passport or Driver&apos;s License</p>
          </div>
        </div>

        {/* Step 2: Selfie */}
        <div className="grid grid-cols-[48px_1fr] gap-x-4">
          <div className="flex flex-col items-center">
            <div className="flex w-10 h-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent">
              <span className="material-symbols-outlined text-[24px]">face</span>
            </div>
            <div className="w-[2px] bg-slate-200 dark:bg-slate-700 grow my-1"></div>
          </div>
          <div className="flex flex-col pb-8 pt-1">
            <p className="text-slate-900 dark:text-white text-lg font-semibold leading-tight">Selfie verification</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">A quick photo of yourself to match your ID</p>
          </div>
        </div>

        {/* Step 3: Address */}
        <div className="grid grid-cols-[48px_1fr] gap-x-4">
          <div className="flex flex-col items-center">
            <div className="flex w-10 h-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent">
              <span className="material-symbols-outlined text-[24px]">home_pin</span>
            </div>
          </div>
          <div className="flex flex-col pt-1">
            <p className="text-slate-900 dark:text-white text-lg font-semibold leading-tight">Confirm address</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Proof of residency or utility bill</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <footer className="px-6 pt-6 pb-10">
        <button
          onClick={() => router.push('/onboarding-flow/infrastructure-setup')}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Finish Verification
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4 px-8">
          Your data is encrypted and handled according to our Privacy Policy.
        </p>
      </footer>
    </div>
  )
}
