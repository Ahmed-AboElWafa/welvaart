'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateAccountPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>
      {/* Top App Bar */}
      <header className="px-6 py-2 flex items-center shrink-0 z-40">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-display text-2xl font-bold text-primary dark:text-white mr-10">Create Account</h1>
      </header>

      {/* Progress Indicator */}
      <div className="flex flex-col gap-3 px-6 pb-2">
        <div className="flex justify-between">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Account Setup</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Step 1 of 3</p>
        </div>
        <div className="rounded-full bg-primary/10 dark:bg-slate-800 h-2">
          <div className="h-2 rounded-full bg-primary transition-all duration-300" style={{ width: '33.33%' }}></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="px-6 pt-6 pb-3">
        <h2 className="text-primary dark:text-white tracking-tight text-[28px] font-display font-bold leading-tight">Join us</h2>
        <p className="text-slate-600 dark:text-slate-400 text-base mt-2">Enter your details to get started with your premium experience.</p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-4 px-6 py-3 mt-2 flex-1">
        {/* Email Input */}
        <label className="flex flex-col w-full">
          <p className="text-primary dark:text-slate-300 text-sm font-semibold pb-2">Email Address</p>
          <input
            className="w-full rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 px-4 text-base"
            placeholder="name@example.com"
            type="email"
          />
        </label>
        {/* Password Input */}
        <label className="flex flex-col w-full">
          <p className="text-primary dark:text-slate-300 text-sm font-semibold pb-2">Password</p>
          <div className="relative">
            <input
              className="w-full rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 px-4 pr-12 text-base"
              placeholder="Create a strong password"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </label>
        {/* Confirm Password Input */}
        <label className="flex flex-col w-full">
          <p className="text-primary dark:text-slate-300 text-sm font-semibold pb-2">Confirm Password</p>
          <div className="relative">
            <input
              className="w-full rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 px-4 pr-12 text-base"
              placeholder="Repeat your password"
              type={showConfirm ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <span className="material-symbols-outlined">{showConfirm ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 px-6 py-6">
        <button
          onClick={() => router.push('/onboarding-flow/personal-information')}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold h-14 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          Create Account
        </button>
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or continue with</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold h-14 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          Continue with Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold h-14 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.96.95-2.12 1.45-3.48 1.45-1.34 0-2.32-.41-3.23-.87-.89-.44-1.89-.92-3.1-.92-1.22 0-2.26.51-3.19.97-.88.44-1.78.88-2.98.88-1.55 0-2.8-.62-3.76-1.84C-4.31 16.29-2.58 9.5 3.05 9.5c1.47 0 2.51.68 3.38 1.24.71.46 1.15.75 1.76.75.56 0 1-.29 1.73-.76.88-.58 2.05-1.35 3.73-1.35 1.25 0 2.37.4 3.19 1.05.79.62 1.44 1.48 1.78 2.52-3.08 1.26-2.58 5.61.38 6.84-.57 1.45-1.25 2.76-1.95 3.49zM12.03 7.25c-.02-2.13 1.74-4.21 3.86-4.25.13 2.55-2.26 4.61-3.86 4.25z"></path>
          </svg>
          Continue with Apple
        </button>
      </div>

      {/* Footer */}
      <div className="px-8 pb-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
          By continuing you agree to the <a className="text-primary dark:text-accent font-medium hover:underline" href="#">Terms of Service</a> and <a className="text-primary dark:text-accent font-medium hover:underline" href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
