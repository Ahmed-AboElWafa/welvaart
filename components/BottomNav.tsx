'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isCards = pathname.startsWith('/cards')
  const isInvest = pathname.startsWith('/invest')
  const isProfile = pathname.startsWith('/profile')
  const isRewards = pathname.startsWith('/rewards')

  return (
    <nav style={{ paddingBottom: '12px' }} className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto glass-card border-t border-slate-200 dark:border-slate-800 pb-8 pt-3 px-6 flex justify-between items-center z-[70]">
      <Link href="/home" className={`flex flex-col items-center gap-1 transition-colors ${isHome ? 'text-primary dark:text-accent active-tab' : 'text-slate-400 hover:text-primary'}`}>
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      <Link href="/cards" className={`flex flex-col items-center gap-1 transition-colors ${isCards ? 'text-primary dark:text-accent active-tab' : 'text-slate-400 hover:text-primary'}`}>
        <span className="material-symbols-outlined">credit_card</span>
        <span className="text-[10px] font-medium">Cards</span>
      </Link>
      <Link href="/invest" className={`flex flex-col items-center gap-1 transition-colors ${isInvest ? 'text-primary dark:text-accent active-tab' : 'text-slate-400 hover:text-primary'}`}>
        <span className="material-symbols-outlined">monitoring</span>
        <span className="text-[10px] font-medium">Invest</span>
      </Link>
      <Link href="/rewards" className={`flex flex-col items-center gap-1 transition-colors ${isRewards ? 'text-primary dark:text-accent active-tab' : 'text-slate-400 hover:text-primary'}`}>
        <span className="material-symbols-outlined">emoji_events</span>
        <span className="text-[10px] font-medium">Rewards</span>
      </Link>
    </nav>
  )
}
