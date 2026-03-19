'use client'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  href?: string
  className?: string
}

export default function BackButton({ href, className = '' }: BackButtonProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
    </button>
  )
}
