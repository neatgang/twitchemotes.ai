// import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { auth, ClerkProvider, currentUser, useUser } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { getApiLimitCount } from '@/lib/api-limit'

import { ModalProvider } from '@/components/ModalProvider'
import { ToasterProvider } from '@/components/ToasterProvider'
import { checkSubscription } from '../lib/subscription'
import { ConvexClientProvider } from '@/providers/canvas/convex-client-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import Head from 'next/head'
import Script from 'next/script'
import { getUserCredits } from '@/actions/get-user-credits'
import { db } from '@/lib/db'

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
    const { userId } = auth()
    // const { user } = useUser()
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const credits = await getUserCredits()

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
         <Script async src="//cdn.trackdesk.com/tracking.js" />
          <Script
          id="trackdesk-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
              trackdesk("emotemaker", "click");
            `,
          }}
        />
        </head>
        <body className={inter.className}>
          <div className="h-full relative">
          <Navbar isPro={isPro} apiLimitCount={apiLimitCount} credits={credits} />
            <ToasterProvider />
            <TooltipProvider>
            <ModalProvider />
              {children}
            </TooltipProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}