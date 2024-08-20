import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/models/sidebar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Model Training Interface',
  description: 'Train AI models with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className={`${inter.className} flex h-screen bg-[#1a1a1a] text-white`}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
  )
}