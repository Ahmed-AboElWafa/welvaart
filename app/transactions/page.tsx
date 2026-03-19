'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { useApp } from '@/hooks/useApp'

export default function TransactionsPage() {
    const router = useRouter()
    const { transactions, loading } = useApp()
    const [filter, setFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesFilter = filter === 'All' || t.type.toLowerCase() === filter.toLowerCase();
            const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 t.details.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [transactions, filter, searchQuery]);

    const groupedTransactions = useMemo(() => {
        const groups: { [key: string]: typeof transactions } = {};
        filteredTransactions.forEach(t => {
            const date = new Date(t.date);
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);

            let dateKey = '';
            if (date.toDateString() === today.toDateString()) {
                dateKey = 'Today';
            } else if (date.toDateString() === yesterday.toDateString()) {
                dateKey = 'Yesterday';
            } else {
                dateKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            }

            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(t);
        });
        return groups;
    }, [filteredTransactions]);

    if (loading) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary font-bold">Loading Transactions...</div>
            </div>
        )
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen relative">
            {/* Header */}
            <header className="px-6 py-4 flex flex-col gap-4 sticky top-6 bg-background-light dark:bg-background-dark z-40">
                <div className="flex items-center justify-between">
                    <h1 className="font-display text-2xl font-bold text-primary dark:text-white">Transactions</h1>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-accent">
                        <span className="material-symbols-outlined">download</span>
                    </button>
                </div>
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                        search
                    </span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 transition-all placeholder:text-slate-400 outline-none"
                        placeholder="Search transactions..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* Filter Chips */}
            <div className="px-6 pb-4 overflow-x-auto flex gap-2 sticky top-[156px] bg-background-light dark:bg-background-dark z-40 no-scrollbar">
                {['All', 'Fiat', 'Crypto', 'Gold', 'Stocks'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${filter === f
                            ? 'bg-primary text-white border-primary dark:bg-accent dark:text-primary dark:border-accent'
                            : 'bg-white text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Transaction List */}
            <main className="px-4 pb-32 space-y-6">
                {Object.keys(groupedTransactions).length === 0 ? (
                    <div className="text-center py-10 text-slate-400">No transactions found</div>
                ) : (
                    Object.entries(groupedTransactions).map(([date, items]) => (
                        <section key={date}>
                            <p className="px-2 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{date}</p>
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                                {items.map((t, idx) => (
                                    <button 
                                        key={t.id}
                                        className={`flex items-center justify-between p-4 w-full text-left bg-white dark:bg-slate-800/50 active:bg-slate-100 dark:active:bg-slate-700/50 transition-colors ${idx !== items.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                t.type === 'crypto' ? 'bg-primary/10 text-primary dark:text-accent' :
                                                t.type === 'gold' ? 'bg-accent/10 text-accent' :
                                                'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                            }`}>
                                                <span className="material-symbols-outlined text-xl">
                                                    {t.type === 'crypto' ? 'currency_bitcoin' : 
                                                     t.type === 'gold' ? 'workspace_premium' : 
                                                     t.type === 'stocks' ? 'trending_up' : 'payments'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{t.description}</p>
                                                <p className="text-[10px] text-slate-500">{t.details}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold text-sm ${t.value > 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                                                {t.value > 0 ? '+' : ''}{t.amount} {t.currency || ''}
                                            </p>
                                            <p className="text-[10px] text-slate-500">
                                                {t.value > 0 ? '' : '-'}${Math.abs(t.value).toFixed(2)}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </main>
            <BottomNav />
        </div>
    )
}
