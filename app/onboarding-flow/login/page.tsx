'use client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="flex flex-col w-full px-6 py-6 flex-1">
        <div className="h-4 w-full"></div>
        {/* Top Navigation */}
        <div className="flex items-center mb-8">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors -ml-2">
            <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
            <input
              className="w-full h-14 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative flex items-center">
              <input
                className="w-full h-14 pl-4 pr-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="••••••••"
                type="password"
              />
              <button className="absolute right-4 text-slate-400 hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <a className="text-sm font-medium text-primary dark:text-accent hover:underline" href="#">Forgot Password?</a>
            </div>
          </div>
          {/* Primary Login Button */}
          <button
            onClick={() => router.push('/home')}
            type="button"
            className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-premium-teal transition-all active:scale-[0.98]"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background-light dark:bg-background-dark text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-4">
          <button className="flex items-center justify-center gap-3 w-full h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200 font-semibold">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 w-full h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200 font-semibold">
            <span className="material-symbols-outlined text-2xl">phone_iphone</span>
            Continue with Apple
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <button onClick={() => router.push('/onboarding-flow/create-account')} className="text-primary dark:text-accent font-bold hover:underline">Create one</button>
          </p>
        </div>
      </div>
    </div>
  )
}
