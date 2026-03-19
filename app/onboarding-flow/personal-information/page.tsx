'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useApp } from '@/hooks/useApp'

const COUNTRY_CODES = [
  { code: 'AE', dial: '+971', label: '+971 UAE' },
  { code: 'SA', dial: '+966', label: '+966 KSA' },
  { code: 'US', dial: '+1', label: '+1 US' },
  { code: 'GB', dial: '+44', label: '+44 UK' },
  { code: 'CA', dial: '+1', label: '+1 CA' },
  { code: 'AU', dial: '+61', label: '+61 AU' },
  { code: 'DE', dial: '+49', label: '+49 DE' },
  { code: 'FR', dial: '+33', label: '+33 FR' },
  { code: 'IT', dial: '+39', label: '+39 IT' },
  { code: 'ES', dial: '+34', label: '+34 ES' },
  { code: 'NL', dial: '+31', label: '+31 NL' },
  { code: 'CH', dial: '+41', label: '+41 CH' },
  { code: 'SE', dial: '+46', label: '+46 SE' },
  { code: 'EG', dial: '+20', label: '+20 EG' },
  { code: 'IN', dial: '+91', label: '+91 IN' },
  { code: 'SG', dial: '+65', label: '+65 SG' },
]

const COUNTRIES = [
  'United Arab Emirates',
  'Saudi Arabia',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Egypt',
  'India',
  'Singapore',
]

const inputClass =
  'w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 px-4 text-base transition-all outline-none'

export default function PersonalInformationPage() {
  const router = useRouter()
  const { user, updateUser } = useApp()
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (user && user.name) {
      const parts = user.name.split(' ')
      setFirstName(parts[0] || '')
      setLastName(parts.slice(1).join(' ') || '')
    }
  }, [user])

  const handleContinue = async () => {
    if (!firstName.trim() || !lastName.trim()) return;
    if (user) {
      const newName = `${firstName} ${lastName}`.trim();
      await updateUser({ ...user, name: newName });
    }
    router.push('/onboarding-flow/identity-verification');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <div className="h-4 w-full"></div>

      {/* Top Navigation */}
      <header className="px-6 py-2 flex items-center shrink-0 z-40">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary dark:text-accent font-bold">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center font-display text-2xl font-bold text-primary dark:text-white mr-10">Personal Information</h1>
      </header>

      {/* Progress Indicator */}
      <div className="flex flex-col gap-3 px-6 pb-2">
        <div className="flex justify-between">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Account Setup</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Step 2 of 3</p>
        </div>
        <div className="rounded-full bg-primary/10 dark:bg-slate-800 h-2">
          <div className="h-2 rounded-full bg-primary transition-all duration-300" style={{ width: '66.6%' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        <div className="mb-8">
          <h2 className="text-primary dark:text-white text-3xl font-display font-bold tracking-tight mb-2">Tell us about yourself</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">Please provide your legal name and contact details so we can verify your identity.</p>
        </div>

        <form className="space-y-5">

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="first-name">First Name</label>
              <input 
                className={inputClass} 
                id="first-name" 
                placeholder="e.g. John" 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="last-name">Last Name</label>
              <input 
                className={inputClass} 
                id="last-name" 
                placeholder="e.g. Doe" 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="dob">Date of Birth</label>
            <input className={inputClass} id="dob" type="date" />
          </div>

          {/* Nationality */}
          <div className="flex flex-col gap-2">
            <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="nationality">Nationality</label>
            <div className="relative">
              <select
                className={`${inputClass} appearance-none pr-10`}
                id="nationality"
                defaultValue=""
              >
                <option value="" disabled>Select nationality</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xl">expand_more</span>
            </div>
          </div>

          {/* Country of Residence */}
          <div className="flex flex-col gap-2">
            <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="residence">Country of Residence</label>
            <div className="relative">
              <select
                className={`${inputClass} appearance-none pr-10`}
                id="residence"
                defaultValue=""
              >
                <option value="" disabled>Select country of residence</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xl">expand_more</span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-primary dark:text-slate-300 text-sm font-semibold px-1" htmlFor="phone">Phone Number</label>
            <div className="flex gap-2 items-stretch">
              {/* Country code selector — same h-14 as the other inputs */}
              <div className="relative shrink-0 w-32">
                <select className="w-full h-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none text-sm pl-3 pr-8 outline-none transition-all">
                  {COUNTRY_CODES.map(({ code, label }) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-lg">expand_more</span>
              </div>
              <input
                className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 w-10 px-4 text-base transition-all outline-none"
                id="phone"
                placeholder="55 000 0000"
                type="tel"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1 px-1">We&apos;ll send a verification code to this number.</p>
          </div>

          {/* Privacy notice */}
          <div className="p-4 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-2xl flex gap-3 mt-2">
            <span className="material-symbols-outlined text-primary dark:text-accent shrink-0">lock</span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your information is protected with bank-level encryption and will never be shared without your permission.
            </p>
          </div>
        </form>
      </main>

      {/* Fixed Bottom Action */}
      <footer className="px-6 pt-6 pb-10">
        <button
          onClick={handleContinue}
          disabled={!firstName.trim() || !lastName.trim()}
          className={`w-full font-bold text-lg h-14 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
            firstName.trim() && lastName.trim()
              ? 'bg-primary hover:bg-premium-teal text-white shadow-primary/20 active:scale-[0.98]'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-70'
          }`}
        >
          Continue
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </footer>
    </div>
  )
}
