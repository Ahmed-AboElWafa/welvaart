'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/hooks/useApp'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace']
const GOLD_PRICE_PER_GRAM = 65.45  // USD per gram

export default function GoldTokensBuyPage() {
  const router = useRouter()
  const { fiatAccounts, loading } = useApp()
  const [amount, setAmount] = useState('0')
  const [showSwitchAccounts, setShowSwitchAccounts] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState('usd')

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'))
    } else if (key === '.' && amount.includes('.')) {
      return
    } else if (amount === '0' && key !== '.') {
      setAmount(key)
    } else {
      setAmount(prev => prev + key)
    }
  }

  const amountNum     = parseFloat(amount) || 0
  const estimatedUSD  = (amountNum * GOLD_PRICE_PER_GRAM).toFixed(2)

  if (loading || !fiatAccounts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-pulse text-primary font-bold">Loading...</div>
      </div>
    )
  }

  const accountsList = fiatAccounts.map((a) => {
    let flag = '🌍'
    if (a.id === 'usd') flag = '🇺🇸'
    if (a.id === 'eur') flag = '🇪🇺'
    if (a.id === 'gbp') flag = '🇬🇧'
    if (a.id === 'chf') flag = '🇨🇭'
    let symbol = '$'
    if (a.balance.includes('€')) symbol = '€'
    else if (a.balance.includes('£')) symbol = '£'
    else if (a.balance.includes('CHF')) symbol = 'CHF'
    return {
      id: a.id,
      flag,
      name: a.name,
      subtitle: a.holder,
      balance: a.balance,
      symbol,
      currency: a.currency,
    }
  })

  // Ensure selected Account resolves properly
  const activeAccount = accountsList.find((a) => a.id === selectedAccount) || accountsList[0] || {
      id: 'null', flag: '🌍', name: 'No Accounts', subtitle: '', balance: '$0.00', symbol: '$', currency: 'USD'
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full" />

      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shrink-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-primary dark:text-accent">chevron_left</span>
        </button>
        <h1 className="font-display text-lg font-bold text-premium-teal dark:text-white">Buy Gold Tokens</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary dark:text-accent text-xl">info</span>
        </button>
      </header>

      <main className="px-6 flex-1 flex flex-col">
        {/* Price ticker */}
        <div className="mt-2 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Current Market Price</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold text-premium-teal dark:text-accent">$2,042.50 / oz</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span>
              0.38%
            </span>
          </div>
        </div>

        {/* Amount display — grams only */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-bold tracking-tight text-premium-teal dark:text-white">{amount}</span>
            <span className="text-2xl font-semibold text-slate-400">g</span>
          </div>

          {/* Info cards */}
          <div className="mt-10 w-full space-y-4">
            {/* Funding account */}
            <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary dark:text-accent text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Funding Account</p>
                  <p className="text-base font-bold text-premium-teal dark:text-white">
                    {activeAccount.balance} <span className="text-slate-400 font-medium text-xs">{activeAccount.name}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSwitchAccounts(true)}
                className="text-[10px] font-bold text-primary dark:text-accent uppercase tracking-wider bg-primary/5 dark:bg-accent/10 px-3 py-1.5 rounded-lg border border-primary/10 dark:border-accent/20 active:scale-95 transition-transform flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                Switch
              </button>
            </div>

            {/* Estimated cost */}
            <div className="glass-card rounded-2xl p-5 flex justify-between items-center shadow-sm border-l-4 border-l-accent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent text-xl">conversion_path</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Estimated Cost</p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-base font-bold text-premium-teal dark:text-white">
                      {activeAccount.symbol}{estimatedUSD}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">{activeAccount.currency}</span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">info</span>
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-auto pt-8 grid grid-cols-3 gap-y-1">
          {KEYS.map(key => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="h-14 flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-slate-200 rounded-xl active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
            >
              {key === 'backspace'
                ? <span className="material-symbols-outlined text-primary dark:text-accent">backspace</span>
                : key}
            </button>
          ))}
        </div>

        <div className="mt-6 mb-8">
          <button
            onClick={() => router.push(`/invest/gold-tokens/buy/review?amount=${amount}&accountId=${activeAccount.id}`)}
            disabled={amountNum <= 0 || activeAccount.id === 'null'}
            className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Review Purchase
            <span className="material-symbols-outlined text-accent">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Account Switcher Bottom Sheet */}
      {showSwitchAccounts && (
        <div className="fixed inset-0 z-50 flex justify-center items-end pointer-events-none">
          <div
            className="relative w-full max-w-[430px] h-full flex flex-col justify-end pointer-events-auto"
            onClick={() => setShowSwitchAccounts(false)}
          >
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
            <div
              className="relative bg-white dark:bg-slate-900 w-full max-h-[85vh] overflow-hidden flex flex-col rounded-t-3xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-premium-teal p-6 rounded-t-3xl">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
                <div className="flex justify-between items-center">
                  <h2 className="text-white text-lg font-bold">Select Funding Account</h2>
                  <button
                    onClick={() => setShowSwitchAccounts(false)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {accountsList.map(account => {
                  const isSelected = selectedAccount === account.id
                  return (
                    <button
                      key={account.id}
                      onClick={() => setSelectedAccount(account.id)}
                      className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-[0.99] ${isSelected ? 'border-accent bg-accent/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm bg-white">
                          {account.flag?.startsWith('http') ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={account.flag} alt={account.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">{account.flag || '💳'}</span>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-premium-teal dark:text-white">{account.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{account.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="text-[15px] font-bold text-premium-teal dark:text-white">{account.balance}</p>
                          <p className={`text-[10px] font-bold uppercase ${isSelected ? 'text-accent' : 'text-slate-400'}`}>
                            {isSelected ? 'Selected' : 'Available'}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="p-6 pt-2 pb-10">
                <button
                  onClick={() => setShowSwitchAccounts(false)}
                  className="w-full bg-premium-teal text-white py-4 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-all"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}