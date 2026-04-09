'use client'
import { useRouter } from 'next/navigation'
import globalfinBg from './globalfin.jpg'

export default function OnboardingWelcomePage() {
  const router = useRouter()

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">

      {/* Visual / Hero Section */}
      <div className="flex-grow flex flex-col justify-center px-6 py-6">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center overflow-hidden rounded-2xl min-h-[250px] relative bg-slate-100 dark:bg-slate-900/50 shadow-inner"
          style={{ backgroundImage: `url(${globalfinBg.src})` }}
        >
        </div>
        {/* Typography */}
        <div className="mt-8 text-center">
          <h1 className="text-primary dark:text-white tracking-tight text-3xl font-display font-bold leading-tight mb-3">Welcome to GlobalFin</h1>
          <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed px-4">
            A global wealth platform combining crypto, banking, and multi-asset investing.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 px-6 pb-10">
        <button
          onClick={() => router.push('/onboarding-flow/create-account')}
          className="w-full h-14 rounded-2xl bg-primary text-white text-base font-bold tracking-wide transition-all hover:bg-premium-teal hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] flex items-center justify-center"
        >
          Create Account
        </button>
        <button
          onClick={() => router.push('/onboarding-flow/login')}
          className="w-full h-14 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent text-base font-bold tracking-wide transition-all hover:bg-primary/20 active:scale-[0.98] flex items-center justify-center"
        >
          Log In
        </button>
        <button className="mt-4 text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
          Use Demo Account
        </button>
      </div>
    </div>
  )
}
