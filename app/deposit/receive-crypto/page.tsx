'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const WALLET_ADDRESS = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

export default function DepositReceiveCryptoPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark max-w-[430px] mx-auto">
      <div className="h-4 w-full"></div>
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <button
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10 text-base">Deposit Crypto</h2>
      </div>

      <main className="flex-1 flex flex-col px-5">
        {/* Asset Selection */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">
            Select Asset
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 shrink-0">
              <span className="material-symbols-outlined text-primary">currency_bitcoin</span>
            </div>
            <select className="w-full bg-transparent border-none focus:ring-0 text-base font-bold text-slate-900 dark:text-white py-0 outline-none">
              <option value="eth">Ethereum (ETH)</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="usdt">Tether (USDT)</option>
              <option value="sol">Solana (SOL)</option>
            </select>
          </div>
        </div>

        {/* Network Selection & Warning */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">
            Network
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3 shrink-0">
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">lan</span>
            </div>
            <select className="w-full bg-transparent border-none focus:ring-0 text-base font-bold text-slate-900 dark:text-white py-0 outline-none">
              <option value="eth">Ethereum Mainnet (ERC20)</option>
              <option value="bsc">BNB Smart Chain (BEP20)</option>
              <option value="poly">Polygon</option>
            </select>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="w-56 h-56 bg-white flex items-center justify-center overflow-hidden">
              <img
                alt="Wallet Address QR Code"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnKZ87c6uidX1oP8rQzfzm43qN-v1dRW8e5RW1JI2Zc0OL3xKZYtO3ftK7QU-xiZLRITEA3LfCsfcqJ3k7mTRhj0x8EMEfMy1WbhxC2XNibgIQLrLcX5cV6vdIMgFGogdvS1_v6dRhcK4ERm6Nhn6vO6ciVgE3W4v7W3Yl-HTuXsLxYmAifEzIowkSinKp4ZUCZR-saR4Aj_DcxgWO9ETGwqWG3COLlhmd6h8QKzQsYYvr2sI8mX-oMsIZKPdrsEArk9zr4AHEMIx7"
              />
            </div>
            {/* Logo overlay at QR center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-1">
              <div className="bg-primary w-full h-full rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">account_balance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="mt-8">
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wallet Address</span>
              <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold">ETH</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-mono break-all text-slate-900 dark:text-slate-100 leading-relaxed flex-1">
                {WALLET_ADDRESS}
              </p>
              <button
                onClick={handleCopy}
                className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-xl">
                  {copied ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Inline Footer */}
      <footer className="px-5 pb-10 pt-6 mt-4">
        <button className="w-full bg-primary hover:bg-premium-teal text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">share</span>
          Share Address
        </button>
      </footer>
    </div>
  )
}
