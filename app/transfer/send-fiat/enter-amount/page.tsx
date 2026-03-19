'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo, Suspense } from 'react'
import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']

function SendFiatEnterAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fiatAccounts } = useApp()

  const rName  = searchParams?.get('rName') || 'Recipient'
  const rIban  = searchParams?.get('rIban') || ''
  const rSwift = searchParams?.get('rSwift') || ''
  const rHandle = searchParams?.get('rHandle') || rIban

  const [amount, setAmount] = useState('0')
  const [note, setNote] = useState('')
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const [showAccountPicker, setShowAccountPicker] = useState(false)

  // Parse a pre-formatted balance string like '$42,150.00' or '€9,380.00' → number
  const parseBalance = (balStr: string): number => {
    const cleaned = String(balStr).replace(/[^0-9.]/g, '')
    return parseFloat(cleaned) || 0
  }

  // Extract the leading currency symbol from the balance string (first non-digit char)
  const getSymbolFromBalance = (balStr: string): string => {
    const match = String(balStr).match(/^([^0-9]+)/)
    return match ? match[1].trim() : '$'
  }

  // Only show active accounts
  const activeAccounts = useMemo(() => (fiatAccounts || []).filter(a => a.balance !== undefined), [fiatAccounts])

  const selectedAccount = selectedAccountId
    ? activeAccounts.find(a => a.id === selectedAccountId)
    : activeAccounts[0]

  const handleKey = (key: string) => {
    if (key === 'backspace') setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
    else if (key === '.' && amount.includes('.')) return
    else if (amount === '0' && key !== '.') setAmount(key)
    else setAmount(prev => prev + key)
  }

  const amountNum = parseFloat(amount) || 0
  const availableBalance = parseBalance(selectedAccount?.balance || '0')
  const canProceed = amountNum > 0 && amountNum <= availableBalance && !!selectedAccount

  // Get currency symbol from the balance string itself
  const symbol = getSymbolFromBalance(selectedAccount?.balance || '$0')

  return (
    <div className="relative flex h-screen w-full flex-col max-w-[430px] mx-auto overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center dark:bg-background-dark px-4 py-4 justify-between">
        <button onClick={() => router.back()} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-primary text-lg font-bold leading-tight tracking-tight">Send Fiat</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50">
          <span className="material-symbols-outlined text-primary">help</span>
        </button>
      </header>

      {/* Recipient mini-badge */}
      <div className="px-6 pb-2 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm">person</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sending to <span className="text-primary font-bold">{rName}</span></p>
      </div>

      {/* Progress Stepper */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 2 of 3</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Enter Amount</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full" />
        </div>
      </div>

      {/* Account Selector */}
      <div className="px-6 py-2">
        <button onClick={() => setShowAccountPicker(true)} className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all active:scale-[0.98]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {selectedAccount?.flag ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selectedAccount.flag} alt={selectedAccount.name} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-primary text-lg">account_balance_wallet</span>
              )}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedAccount?.name || 'Select Account'}</p>
              <p className="text-xs text-slate-500">
                Balance: {symbol}{availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {selectedAccount?.currency}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <p className="text-xs font-bold">Change</p>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Amount Display */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-primary mr-1">{symbol}</span>
            <span className="text-6xl font-extrabold tracking-tighter text-slate-800 dark:text-white">{amount}</span>
          </div>
          <p className="text-sm font-medium text-slate-400 mt-4">
            Available Balance:{' '}
            <span className={`font-bold ${amountNum > availableBalance ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
              {symbol}{availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {selectedAccount?.currency}
            </span>
          </p>
        </div>

        {/* Note Field */}
        <div className="mt-12 w-full max-w-xs">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-primary/30 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">sticky_note_2</span>
            <input className="bg-transparent border-none p-0 text-sm w-full focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-primary/30 text-slate-900 dark:text-slate-100 outline-none" placeholder="Add a note (optional)" type="text" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
      </main>

      {/* Numeric Keypad */}
      <div className="dark:bg-background-dark pb-8 px-6">
        <div className="grid grid-cols-3 gap-y-4 gap-x-8 max-w-sm mx-auto mb-8">
          {KEYS.map((key) => (
            <button key={key} onClick={() => handleKey(key)} className="flex items-center justify-center h-16 text-2xl font-semibold rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors text-slate-900 dark:text-white">
              {key === 'backspace' ? <span className="material-symbols-outlined text-[28px] text-primary">backspace</span> : key}
            </button>
          ))}
        </div>
        <div className="flex px-2">
          <button
            onClick={() => selectedAccount && router.push(
              `/transfer/send-fiat/review?rName=${encodeURIComponent(rName)}&rIban=${encodeURIComponent(rIban)}&rSwift=${encodeURIComponent(rSwift)}&amount=${amount}&currency=${selectedAccount.currency}&symbol=${encodeURIComponent(symbol)}&accountId=${selectedAccount.id}&note=${encodeURIComponent(note)}`
            )}
            disabled={!canProceed}
            className="w-full bg-primary hover:bg-premium-teal text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Account Picker Bottom Sheet */}
      {showAccountPicker && (
        <div className="fixed inset-0 z-[80] flex flex-col justify-end" onClick={() => setShowAccountPicker(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
          <div className="relative z-10 w-full max-w-[430px] mx-auto bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl pt-4 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4" />
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="font-display text-lg font-bold text-primary dark:text-white">Source Account</h2>
              <button onClick={() => setShowAccountPicker(false)} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-sm">close</span>
              </button>
            </div>
            <div className="px-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {activeAccounts.map(acc => {
                const sym = getSymbolFromBalance(acc.balance || '$0')
                const bal = parseBalance(acc.balance || '0')
                return (
                  <button
                    key={acc.id}
                    onClick={() => { setSelectedAccountId(acc.id); setAmount('0'); setShowAccountPicker(false) }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${(selectedAccount?.id) === acc.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-primary/40'}`}
                  >
                    <div className="size-11 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center border border-slate-100 dark:border-slate-600 overflow-hidden shrink-0">
                      {acc.flag ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={acc.flag} alt={acc.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-primary text-lg">account_balance_wallet</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{acc.name}</p>
                      <p className="text-xs text-slate-500">{acc.currency}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{sym}{bal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    {(selectedAccount?.id) === acc.id && (
                      <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SendFiatEnterAmountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark"><div className="animate-pulse text-primary font-bold">Loading...</div></div>}>
      <SendFiatEnterAmountContent />
    </Suspense>
  )
}
