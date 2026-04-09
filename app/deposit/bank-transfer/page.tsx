'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/hooks/useApp'

export default function DepositBankTransferPage() {
    const router = useRouter()
    const { user, fiatAccounts, loading } = useApp()
    
    const [active, setActive] = useState<string>('')

    useEffect(() => {
        if (fiatAccounts && fiatAccounts.length > 0 && !active) {
            setActive(fiatAccounts[0].name)
        }
    }, [fiatAccounts, active])
    const [copiedLabel, setCopiedLabel] = useState<string | null>(null)

    const handleCopy = (value: string, label: string) => {
        navigator.clipboard.writeText(value)
        setCopiedLabel(label)
        setTimeout(() => setCopiedLabel(null), 2000)
    }

    if (loading || !fiatAccounts || !user) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto items-center justify-center">
                <div className="animate-pulse text-primary font-bold">Loading Deposit Options...</div>
            </div>
        )
    }

    const activeAccount = fiatAccounts.find((a) => a.name === active) || fiatAccounts[0]
    
    const ACCOUNTS = fiatAccounts.map((a) => a.name)

    const FIELDS = [
        { icon: 'person', label: 'Beneficiary Name', value: user.name || 'Alex Sterling', mono: false },
        { icon: 'public', label: 'IBAN / Account No', value: activeAccount?.accountId || 'N/A', mono: true },
        { icon: 'account_balance', label: 'SWIFT / BIC', value: activeAccount?.swift || 'N/A', mono: true },
        { icon: 'location_on', label: 'Bank Address', value: 'GlobalFin Trust, 270 Park Ave, NY 10017, USA', mono: false },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
            <div className="h-4 w-full"></div>
            {/* Header */}
            <div className="flex items-center px-4 py-3 shrink-0">
                <button
                    onClick={() => router.back()}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-base">arrow_back_ios_new</span>
                </button>
                <h2 className="text-xl font-bold flex-1 text-center pr-10 text-base">Bank Transfer</h2>
            </div>

            <main className="flex-1 flex flex-col">
                {/* Account currency chips */}
                <div className="pt-6 pb-2">
                    <div className="flex overflow-x-auto gap-3 px-4 no-scrollbar">
                        {ACCOUNTS.map((acc) => (
                            <button
                                key={acc}
                                onClick={() => setActive(acc)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-full border text-sm font-semibold transition-all shrink-0 ${active === acc
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                    }`}
                            >
                                {acc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account details */}
                <div className="px-4 py-6">
                    <div className="flex items-center justify-between mb-5 px-1">
                        <h3 className="text-primary/70 text-xs font-bold uppercase tracking-widest">Personal Account Data</h3>
                        <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold border border-primary/20 uppercase">
                            Primary
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {FIELDS.map((field) => (
                            <div
                                key={field.label}
                                className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-4 justify-between shadow-sm"
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                                        <span className="material-symbols-outlined text-xl">{field.icon}</span>
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{field.label}</p>
                                        <p className={`text-slate-900 dark:text-white text-sm font-semibold truncate ${field.mono ? 'tracking-wide font-mono' : ''}`}>
                                            {field.value}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(field.value, field.label)}
                                    className="text-primary/60 hover:text-primary transition-colors p-2 active:scale-90 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {copiedLabel === field.label ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legal notice */}
                <div className="px-4 pb-4 mt-auto">
                    <div className="bg-primary/5 rounded-xl p-4 border border-dashed border-primary/30 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-xs italic">
                            Funds are processed through licensed partner institutions and held in segregated client accounts.
                        </p>
                    </div>
                </div>
            </main>

            {/* Inline Footer */}
            <footer className="px-6 pb-10 pt-4">
                <button className="w-full bg-primary hover:bg-premium-teal text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined">share</span>
                    Share Account Details
                </button>
            </footer>
        </div>
    )
}
