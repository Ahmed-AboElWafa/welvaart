'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FiatOpenAccountPage() {
  const router = useRouter()

  return (
    <>
      <div className="h-4 w-full"></div>
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
          </button>
          <h1 className="font-display text-xl text-primary dark:text-white">Open Account</h1>
        </div>
        <span className="text-xs font-bold text-slate-400">Step 1 of 2</span>
      </header>
      <main className="px-6 pb-20">
        <div className="mt-2 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Select Currency</h2>
          <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-xl">
            <span className="material-symbols-outlined text-accent text-sm">bolt</span>
            <p className="text-xs text-primary dark:text-accent font-medium uppercase tracking-wide">New accounts are activated instantly</p>
          </div>
        </div>
        <div className="relative mb-8">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="search-input w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search currency..." type="text" />
        </div>
        <div className="space-y-3">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] ml-1 mb-4">Available Currencies</p>
          <button onClick={() => router.push('/fiat/confirm?currency=GBP')} className="w-full glass-card p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50">
                <img alt="GBP" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBStPuWTvSahRJQpTzttgSYlMsX6vfn_M07ONiEhXOYsnw-nrmCk9J3e_cp_rJhA3Ide11M3oVrrsOLD-tncc4ftQuoUV0e6SE1DepYxdpjuVWy6sgU4aVNdgLXxrtBB1r4r9EZINDdZa5FDEXeUSiCllJCFL39jkn6Za2jRFR-mJpuGHCRGjesFN_0gsorjYlsJd_l09JhRF2sAVonPzyVgKiQbXLoOogOUlIxO7fmlaKo_D_f8XoYlOGNWk1naW-2BGQXYqBbLFLd" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">British Pound</p>
                <p className="text-xs text-slate-500">United Kingdom</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary dark:text-accent">GBP</span>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </button>
          <button onClick={() => router.push('/fiat/confirm?currency=AED')} className="w-full glass-card p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50">
                <img alt="AED" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmKQYx3-Bi6PDFa9bBpV0fURACWaaNRoEtnPA2jv5lfPL9vYSE5kxmn5NR7tbN6fHcbuAO4o3Iv_opPnJke1sDOSQnoGM_7vtid4OWcS1HxE82v8CW7PMp7aiEy53YB--wmv503PlGREkG6D0CZjWuA5p7ACeg8cpxxnd-wMLQnbTGK7iISPHMdEKbaU4lNP6BWnNLfrNt87wTEdvAEH-pv53hoWOZkahDONy_d_ycydw2Rpt4df_sQUiDH43-ThxfT-g_r9aXh9va" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">UAE Dirham</p>
                <p className="text-xs text-slate-500">United Arab Emirates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary dark:text-accent">AED</span>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </button>
          <button onClick={() => router.push('/fiat/confirm?currency=CAD')} className="w-full glass-card p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50">
                <img alt="CAD" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWxan2EygZoeJrGD5JPj5v9eHxUa2d0Jyyopxls-kSVP-qsP_86w7JqajZIICJmoDIj3QucUJ2U5mfWo-3C0il6di7aEtojVpnkzLiP96ADuCek0xfP4bPYbhSq3ILDz2QtvlwjHQTzfWHtqZT7dJxOB7XsHebxir7q4wtYciuuIM6pqmVg1tcArC-hlCjLj5VnkPbgjBCARtK_uEFqorBQG_wZOtDxc9oZNkZ7AdG92uTiCtUAXH51Onauu7-xQZAqeifMXkKaWtD" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Canadian Dollar</p>
                <p className="text-xs text-slate-500">Canada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary dark:text-accent">CAD</span>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </button>
          <button onClick={() => router.push('/fiat/confirm?currency=CHF')} className="w-full glass-card p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50">
                <img alt="CHF" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPuUBFUA26iN3OTGb5_08anEz48Tf6qxflftY7BCXVTfKWAt_fxDAFCIwL6MggMSz9_YInl5_hdqPmrBnszgxI3EQSI6uo9l6WgrPBF6dbBcahUkiVQoouJhCvO2-IYIhCCqeugIg0X5B-Vf6s6un56dpeDp1qL5yogq5gy4S9z6q1W2vilTNuc0wVuwkLMBuCeaCJVzss_DYQSO4wcxVY2ONwNofIRZAQuZlLQ-dktwPB8GIi__zOBdT8bCC3Bruis1P4FCk1GDs" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Swiss Franc</p>
                <p className="text-xs text-slate-500">Switzerland</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary dark:text-accent">CHF</span>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </button>
          <button onClick={() => router.push('/fiat/confirm?currency=JPY')} className="w-full glass-card p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center bg-slate-50">
                <img alt="JPY" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE9xDoj25nKVbvve9IUlUY4UqnvsexC0DLGa7UqVkBCkIPtgJ0cRbghBe_gG8WDHnJE--zOELzI0jaMCVOABFs5lC42Tz_fDhYHBxRYbORtELgTXAgKhw2dDrPY8Z6Iqc9aQ274OnOkNdo0Lgk3c_XWz8KjDJzWxqxGvHNs_MZytXzNo07UcIROwpdY5BSqO7p6P8pvaKaXIo5RSc5nYix9nk-8YsatMv_gQO7qtqgGRbTPzzubUiuYHd1oUBT2mV7exB7jepARoXL" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Japanese Yen</p>
                <p className="text-xs text-slate-500">Japan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary dark:text-accent">JPY</span>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </button>
        </div>
      </main>
    </>
  )
}
