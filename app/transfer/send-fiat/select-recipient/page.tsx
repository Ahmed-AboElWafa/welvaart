'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type Method = 'globalfin' | 'bank' | null

interface SavedRecipient {
  name: string
  iban: string
  swift: string
  country: string
  initials: string
}

const STORAGE_KEY = 'gf_fiat_recipients'

export default function SendFiatSelectRecipientPage() {
  const router = useRouter()
  const [activeMethod, setActiveMethod] = useState<Method>(null)

  // GlobalFin User form state
  const [gfIdentifier, setGfIdentifier] = useState('')

  // Bank Account form state
  const [bankName, setBankName] = useState('')
  const [bankCountry, setBankCountry] = useState('')
  const [bankIban, setBankIban] = useState('')
  const [bankSwift, setBankSwift] = useState('')

  // Custom saved recipients
  const [savedRecipients, setSavedRecipients] = useState<SavedRecipient[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSavedRecipients(JSON.parse(raw))
    } catch {}
  }, [])

  const handleMethodSelect = (method: Method) => {
    setActiveMethod(prev => prev === method ? null : method)
  }

  const canProceedGlobalFin = gfIdentifier.trim().length > 0
  const canProceedBank = bankName.trim().length > 0 && bankCountry.trim().length > 0 && bankIban.trim().length > 0 && bankSwift.trim().length > 0

  const goToAmount = (rName: string, rIban: string, rSwift: string, rHandle: string) => {
    router.push(
      `/transfer/send-fiat/enter-amount?rName=${encodeURIComponent(rName)}&rIban=${encodeURIComponent(rIban)}&rSwift=${encodeURIComponent(rSwift)}&rHandle=${encodeURIComponent(rHandle)}`
    )
  }

  const RECENT = [
    { name: 'Alex Rivera', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSf_dv3r-LnnS7cnvbdPDc2WfuNFYb0kcd4fupeSVB58O3kMGadlMgBflO-6UzPtICvFP3FyQjB1gS1nJbRUJuyz5Pn27BwTXw6x0ffxqPcPHXsn6iwRT4qSgYo3L6MLV_F9EfOCjt2fOrPs7c48s4qlzbpT6vzfpcSOh0uIkcR1BvFaQOctm-cnNn4vAaW9xV0p3z98v-EHnYkENYcCG5piDAlHQ1O29vlSY5nHqa9cUd8D-ekMzfiXvyj6HA28iSOH5WlU2j_cbG', iban: 'GB29 NWBK 6016 1331 9268 19', swift: 'NWBKGB2L' },
    { name: 'Sarah J.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkDQt82wqlcWfP6HnA53mhpKCR1ibxKuqkuP52-JjaF2WCw5XGGHigYC1A501Si8bJJivvg7oeD1i67gLd_vB_S7yczpfxvJ67k9g9tXCxJf-tr-1d-wPu7GFMNlye7VBYUD-3PJB18QdTFBuxs-mmgLzSpk6pEFqbP_rK2iDAXYT7z2Me3da_EcBM2KreDtom5UA7Qt3S9xXRIVFM5XwqD0oHbPN_jEL4VVThAcXbz2G4_wgdWW_CYshpKTgshktMB5HtQKwY59Qo', iban: 'DE89 3704 0044 0532 0130 00', swift: 'COBADEFFXXX' },
    { name: 'Marcus V.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcJvSjqqlDsjZWZdsJa5WJ4fa76Lb7Lh_HXxp7U2dwGnQjeIhpmhhOs6WTCFrdxLabUPMwycjIWvvQCRsq3gjMdcgS54RPWs9Kk6AfcmBK8QV5qNnI0sFlTbraJG_FChddapQT2utNHwArIwJUPhv53giLajD4PtCvFQU1mOGZX9zeqn9IFBPI9Lnthxa78UKtWHY0bmEIvxR2PveLhZN_5ekw4IFUBlNeG301pBQQluijC741T2s225zsRoHJuYs67XdlZ9a1GxWc', iban: 'FR76 3000 6000 0112 3456 7890 189', swift: 'BNPAFRPPXXX' },
  ]

  return (
    <>
      <div className="h-4 w-full"></div>
      <header className="bg-background-light dark:bg-background-dark sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/transfer')} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Fiat</h1>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 1 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Select Recipient</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/3 rounded-full" />
        </div>
      </div>

      <main className="flex-1 px-4 py-6 space-y-8 overflow-y-auto pb-16">
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Transfer Methods</h3>
          <div className="grid grid-cols-1 gap-3">

            {/* GlobalFin User */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
              <button onClick={() => handleMethodSelect('globalfin')} className={`flex items-center p-5 w-full text-left group transition-colors ${activeMethod === 'globalfin' ? 'bg-primary/5 border-primary' : 'bg-[#F8FAFC] dark:bg-slate-800 hover:bg-slate-50'}`}>
                <div className={`size-12 rounded-lg flex items-center justify-center mr-4 transition-all group-hover:scale-105 ${activeMethod === 'globalfin' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-white text-base">To GlobalFin User</p>
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold uppercase">Instant</span>
                  </div>
                  <p className="text-xs text-slate-500">Send via phone or username</p>
                </div>
                <span className={`material-symbols-outlined ml-3 text-slate-400 transition-transform duration-200 ${activeMethod === 'globalfin' ? 'rotate-90 text-primary' : ''}`}>chevron_right</span>
              </button>
              {activeMethod === 'globalfin' && (
                <div className="px-5 pb-5 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-3 font-medium">Enter the recipient&apos;s phone number or GlobalFin username</p>
                  <div className="relative mb-4">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person_search</span>
                    <input value={gfIdentifier} onChange={e => setGfIdentifier(e.target.value)} placeholder="+1 555 000 0000 or @username" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400" type="text" />
                  </div>
                  <button
                    onClick={() => goToAmount('GlobalFin User', gfIdentifier, '', gfIdentifier)}
                    disabled={!canProceedGlobalFin}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bank Account */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
              <button onClick={() => handleMethodSelect('bank')} className={`flex items-center p-5 w-full text-left group transition-colors ${activeMethod === 'bank' ? 'bg-primary/5' : 'bg-[#F8FAFC] dark:bg-slate-800 hover:bg-slate-50'}`}>
                <div className={`size-12 rounded-lg flex items-center justify-center mr-4 transition-all group-hover:scale-105 ${activeMethod === 'bank' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-base">To Bank Account</p>
                  <p className="text-xs text-slate-500">SWIFT, SEPA, and local transfers</p>
                </div>
                <span className={`material-symbols-outlined ml-3 text-slate-400 transition-transform duration-200 ${activeMethod === 'bank' ? 'rotate-90 text-primary' : ''}`}>chevron_right</span>
              </button>
              {activeMethod === 'bank' && (
                <div className="px-5 pb-5 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <p className="text-xs text-slate-500 font-medium mb-1">Enter beneficiary details</p>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Beneficiary Name</label>
                    <input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Full name or company name" className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Country</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">public</span>
                      <input value={bankCountry} onChange={e => setBankCountry(e.target.value)} placeholder="e.g. United States" className="w-full pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">IBAN / Account Number</label>
                    <input value={bankIban} onChange={e => setBankIban(e.target.value.toUpperCase())} placeholder="e.g. GB29 NWBK 6016 1331 9268 19" className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400 placeholder:font-sans uppercase tracking-wider" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">SWIFT / BIC Code</label>
                    <input value={bankSwift} onChange={e => setBankSwift(e.target.value.toUpperCase())} placeholder="e.g. NWBKGB2L" className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400 placeholder:font-sans uppercase tracking-widest" />
                  </div>
                  <button
                    onClick={() => goToAmount(bankName, bankIban, bankSwift, bankIban)}
                    disabled={!canProceedBank}
                    className="w-full mt-1 py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recent Recipients */}
        <section className="space-y-4">
          <div className="flex justify-between items-center ml-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Recipients</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {RECENT.map(({ name, img, iban, swift }) => (
              <div key={name} onClick={() => goToAmount(name, iban, swift, iban)} className="flex flex-col items-center space-y-2 shrink-0 w-20 cursor-pointer">
                <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-transparent hover:border-primary transition-all relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={name} className="w-full h-full object-cover" src={img} />
                </div>
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-center truncate w-full">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Recipients (from add-recipient) */}
        {savedRecipients.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Saved Recipients</h3>
            <div className="space-y-2">
              {savedRecipients.map((r, i) => (
                <button
                  key={i}
                  onClick={() => goToAmount(r.name, r.iban, r.swift, r.iban)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40 active:scale-[0.98] transition-all text-left"
                >
                  <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{r.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{r.name}</p>
                    <p className="text-xs text-slate-500 font-mono truncate">{r.iban}</p>
                    {r.country && <p className="text-[10px] text-slate-400">{r.country}</p>}
                  </div>
                  <span className="material-symbols-outlined text-primary text-lg shrink-0">chevron_right</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <button
          onClick={() => router.push('/transfer/send-fiat/add-recipient')}
          className="w-full py-4 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800/50 rounded-xl text-slate-500 hover:text-primary hover:border-primary transition-all font-bold text-sm"
        >
          <span className="material-symbols-outlined text-primary">person_add</span>
          <span className="font-bold">Add New Recipient</span>
        </button>
      </main>
    </>
  )
}
