// import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { getApiLimitCount } from '@/lib/api-limit'

import { ModalProvider } from '@/components/ModalProvider'
import { ToasterProvider } from '@/components/ToasterProvider'
import { checkSubscription } from '../lib/subscription'
import { ConvexClientProvider } from '@/providers/canvas/convex-client-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmoteMaker.ai',
  description: 'Turn your prompt into an emote, perfect for Twitch Streamers, Discord Moderators, and others.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-full relative">
            <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
            <ToasterProvider />
            <ModalProvider />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}