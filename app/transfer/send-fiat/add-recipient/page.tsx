'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const STORAGE_KEY = 'gf_fiat_recipients'

export default function SendFiatAddRecipientPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [country, setCountry] = useState('uk')
  const [iban, setIban] = useState('')
  const [swift, setSwift] = useState('')

  const COUNTRIES: Record<string, string> = {
    uk: 'United Kingdom', us: 'United States', de: 'Germany', ae: 'United Arab Emirates', sg: 'Singapore'
  }

  const canSave = name.trim().length > 0 && iban.trim().length > 0 && swift.trim().length > 0

  const handleSave = () => {
    if (!canSave) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const existing = raw ? JSON.parse(raw) : []
      const initials = name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
      const newEntry = { name: name.trim(), iban: iban.trim(), swift: swift.trim(), country: COUNTRIES[country] || country, initials }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newEntry]))
    } catch {}
    router.push('/transfer/send-fiat/select-recipient')
  }

  return (
    <div className="relative w-full max-w-[430px] min-h-screen flex flex-col bg-white dark:bg-background-dark mx-auto shadow-sm">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-background-dark p-4 justify-between border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => router.push('/transfer/send-fiat/select-recipient')}
          className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h2 className="font-display text-xl text-primary flex-1 text-center">Add New Recipient</h2>
        <div className="w-12" />
      </header>

      {/* Form Content */}
      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Beneficiary Name */}
        <div className="space-y-2">
          <label className="flex flex-col">
            <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-2 ml-1">Beneficiary Name</span>
            <input
              className="w-full rounded-2xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 h-14 px-4 text-base font-medium placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="Full legal name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p className="text-slate-500 text-[10px] px-1">Ensure name matches the bank records exactly to avoid delays.</p>
        </div>

        {/* Country Selection */}
        <div className="space-y-2">
          <label className="flex flex-col">
            <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold mb-2 ml-1">Country</span>
            <div className="relative group">
              <select
                className="w-full appearance-none rounded-2xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 h-14 px-4 text-base font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none pr-10"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="uk">United Kingdom</option>
                <option value="us">United States</option>
                <option value="de">Germany</option>
                <option value="ae">United Arab Emirates</option>
                <option value="sg">Singapore</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">expand_more</span>
            </div>
          </label>
        </div>

        {/* IBAN Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2 ml-1">
            <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold">IBAN</span>
            <button className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
              <span className="material-symbols-outlined text-sm">help</span>
              Where is my IBAN?
            </button>
          </div>
          <div className="relative group">
            <input
              className="w-full rounded-2xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 h-14 px-4 text-base font-medium uppercase tracking-widest placeholder:text-slate-400 placeholder:tracking-normal focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="GB00 0000 0000 0000 00"
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
            />
          </div>
        </div>

        {/* SWIFT/BIC Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2 ml-1">
            <span className="text-slate-800 dark:text-slate-200 text-sm font-semibold">SWIFT / BIC Code</span>
            <button className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
              <span className="material-symbols-outlined text-sm">help</span>
              What is SWIFT?
            </button>
          </div>
          <div className="relative group">
            <input
              className="w-full rounded-2xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 h-14 px-4 text-base font-medium uppercase tracking-wider placeholder:text-slate-400 placeholder:tracking-normal focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="ENTER 8 OR 11 CHARACTERS"
              type="text"
              value={swift}
              onChange={(e) => setSwift(e.target.value)}
            />
          </div>
        </div>
      </main>

      {/* Fixed Action Bottom Bar */}
      <footer className="p-6 bg-white dark:bg-background-dark sticky bottom-0">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Recipient
        </button>
      </footer>
    </div>
  )
}
