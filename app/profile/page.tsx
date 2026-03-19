'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/hooks/useApp'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useApp()

  if (loading || !user) {
    return (
      <div className="bg-background-light text-slate-900 font-sans antialiased min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold">Loading Profile...</div>
      </div>
    )
  }

  return (
    <>
      <div className="h-4 w-full"></div>
      <header className="px-6 py-4 flex items-center relative">
        <button onClick={() => router.back()} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-primary dark:text-accent active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-display text-2xl text-primary dark:text-white">Profile</h1>
      </header>
      <main className="px-6 pb-32" style={{ paddingBottom: '32px' }}>
        <section className="mt-6 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-accent/20 p-1 shadow-xl">
              <img alt={user.name} className="w-full h-full object-cover rounded-full" src={user.avatarUrl} />
            </div>
            {user.isPremium && (
              <div className="absolute bottom-1 right-1 bg-accent w-7 h-7 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                <span className="material-symbols-outlined text-white text-[16px] font-bold">verified</span>
              </div>
            )}
          </div>
          <h2 className="mt-4 font-display text-2xl text-primary dark:text-white">{user.name}</h2>
          {user.isPremium && (
            <div className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-premium-teal rounded-full">
              <span className="material-symbols-outlined text-accent text-[14px]">workspace_premium</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Premium Member</span>
            </div>
          )}
        </section>
        <section className="mt-10 space-y-2">
          <button className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">person</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Personal Information</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">security</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Security &amp; Biometrics</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">notifications</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Notification Settings</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">sync_alt</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Connected Exchanges</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
          <button onClick={() => router.push('/transactions')} className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">history</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Transaction History</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl settings-row transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-accent">contact_support</span>
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Help &amp; Support</span>
            <span className="material-symbols-outlined ml-auto text-slate-400">chevron_right</span>
          </button>
        </section>
        <button className="w-full mt-8 py-4 text-rose-500 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </main>
    </>
  )
}
