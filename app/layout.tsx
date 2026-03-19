import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'Welvaart',
  description: 'Premium Financial Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" 
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-background-light text-slate-900 font-sans antialiased`}>
        <div className="max-w-[430px] mx-auto min-h-screen relative overflow-x-hidden shadow-2xl">
          <AppProvider>
            {children}
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
