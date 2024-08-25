import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/models/sidebar'
import { useUser } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Model Training Interface',
  description: 'Train AI models with ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  return (
    <div className={`${inter.className} flex h-screen bg-[#1a1a1a] text-white`}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}