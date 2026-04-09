'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Method = 'globalfin' | null


const contacts = [
  {
    name: 'Alex Rivers',
    handle: '@arivers',
    online: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrWZQgCnk_006PE5t8we896zsVamO4poaryjCsPEWyPZQhr5i44BeCRt-jkh5HQ5g5ItgHLoXnTbRVtRcsi373qeHV3nE5IZ7P6R6R3VKa8zJw2mt_lJ_bYwoTGJewZOdnsyNhI8HxLmQxdqe1qMttUnGvesamL1DhnJTUxYKjSGwENzK1HbeFIf8qyboDUk2tQ9ixTic3pJUVC0O_J4Y3d5DNhG2Dgrw270bxeqLtD52sUnE7yZXnYNBfFXwoRCbL_4wfBFBdeUEA',
    alt: 'Profile photo of a smiling man with beard',
  },
  {
    name: 'Sarah Jenkins',
    handle: '@sjenkins_fin',
    online: false,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDRCN47deBKwxJErEfvEmy4o6R36Apvq2ffYs6rsnZyX3nOQw_FSDl1o1S3F-GSHJckUmKO5GAka1dGY0VIZwLIodIsyUZzeb-9EO0bQI0KfyK_auPu1M-W1YsAWvAGskG-9mKGvT_GHS6clCEbvXDLoeZu-fiP8PGaQwYC8-WovekBNRIXalT-tQiE36c4qsV1FU45ExlwpYbu0Znr3YfLV_EpawIDq4odzK6xZBtNP8TVDFMKz0BedTT8_qSABporz2J8lUin-QC',
    alt: 'Profile photo of a woman with long dark hair',
  },
  {
    name: 'Marcus Thorne',
    handle: '@m_thorne',
    online: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsULhFSR-LKjyN68j1FbJ_LxV7l-zRhWefwq8gLHVN5MvEyA3-1tHFqfOUt17KLffABQrsyTpxd1yrgfBA53iwMPRQllo-SvLJdbKsIfUQ9KQHvV4hmoMcs6zBEYnPOdyR1NqY8iYGQq6EB4SrYUZ3byxsC10--KJVNIbqi8JLzJEGSqH0NfWOsev9MjelZ5g1Hdi1onSTgQTCVQkzixNgyEu8V4hISHWxHb-6aPkx15fx3gjT_QFeQsbkoAb1d8b2mvO3-HZQJRRo',
    alt: 'Profile photo of a man wearing glasses',
  },
  {
    name: 'Elena Costa',
    handle: '@ecosta',
    online: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJZo5HW_-LeeoLruYJP5OEz6RF3GUWtJJq1hyVlZphXJpp_tsTWE3Oh1kjnpJLkoCJu99xdBErIHWMlmGQ9VMn2Isf5uheyECjGgjUTVsVRNqG9jmGmusCCfVU9jvY56RIx1rYX9cLpm3IjaTbe8C4HwMtMEYb3mEs_pDqkKJpBUguuje5xvoRY-G5J_V2hrnq2KKmnQOu7bGQkKJIc68c-jw6iwMNxX6brCMdk8t60-sNgawFeNTxw8dClfdYAdywKGgwP-xfyeOH',
    alt: 'Profile photo of a woman in a studio setting',
  },
]

export default function SendStocksSelectRecipientPage() {
  const router = useRouter()
  const [activeMethod, setActiveMethod] = useState<Method>(null)
  const [gfIdentifier, setGfIdentifier] = useState('')

  const handleMethodSelect = (method: Method) => {
    setActiveMethod(prev => prev === method ? null : method)
  }
  const canProceedGlobalFin = gfIdentifier.trim().length > 0

  return (
    <div className="relative flex min-h-screen w-full max-w-[430px] mx-auto flex-col bg-background-light dark:bg-background-dark overflow-x-hidden shadow-2xl">
      <div className="h-4 w-full"></div>
      {/* Header / TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Stocks</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Progress Stepper */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 1 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Select Recipient</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/3 rounded-full" />
        </div>
      </div>

      <main className="flex-1 px-4" style={{ paddingBottom: '32px' }}>
        {/* Asset Badge
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">token</span>
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Physical Gold (XAU)</span>
          </div>
        </div> */}

        {/* — GlobalFin User — */}
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
          <button
            onClick={() => handleMethodSelect('globalfin')}
            className={`flex items-center p-5 w-full text-left group transition-colors ${activeMethod === 'globalfin' ? 'bg-primary/5 border-primary' : 'bg-[#F8FAFC] hover:bg-slate-50'}`}
          >
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

          {/* Inline GlobalFin form */}
          {activeMethod === 'globalfin' && (
            <div className="px-5 pb-5 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 mb-3 font-medium">Enter the recipient&apos;s phone number or GlobalFin username</p>
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person_search</span>
                <input
                  value={gfIdentifier}
                  onChange={e => setGfIdentifier(e.target.value)}
                  placeholder="+1 555 000 0000 or @username"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-400"
                  type="text"
                />
              </div>
              <button
                onClick={() => router.push(`/transfer/send-stocks/recipient-shares?name=GlobalFin%20User&handle=${encodeURIComponent(gfIdentifier)}&avatar=`)}
                disabled={!canProceedGlobalFin}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          )}
        </div>

        {/* Frequent Contacts List */}
        <div className="flex flex-col gap-2">
          <h3 style={{ marginTop: '24px' }} className="text-primary text-base font-bold leading-tight tracking-tight mb-3 ml-1">
            Frequent Contacts
          </h3>
          {contacts.map((contact) => (
            <div
              key={contact.handle}
              onClick={() => router.push(`/transfer/send-stocks/recipient-shares?name=${encodeURIComponent(contact.name)}&handle=${encodeURIComponent(contact.handle)}&avatar=${encodeURIComponent(contact.avatar)}`)}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/30 cursor-pointer transition-all"
            >
              <div className="relative shrink-0">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 border-2 border-primary/20"
                  style={{ backgroundImage: `url("${contact.avatar}")` }}
                  aria-label={contact.alt}
                />
                <div
                  className={`absolute bottom-0 right-0 h-4 w-4 border-2 border-white rounded-full ${contact.online ? 'bg-primary' : 'bg-slate-400'
                    }`}
                />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-primary text-base font-bold leading-none mb-1">{contact.name}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{contact.handle}</p>
              </div>
              <div className="shrink-0">
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
