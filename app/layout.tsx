import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Navbar from '@/components/Navbar'
import { getApiLimitCount } from '@/lib/api-limit'
import { ModalProvider } from '@/components/ModalProvider'
import { ToasterProvider } from '@/components/ToasterProvider'
import { checkSubscription } from '../lib/subscription'
import { TooltipProvider } from '@/components/ui/tooltip'
import Script from 'next/script'

import { getUser } from '@/actions/get-user'
import { Providers } from '@/components/providers'
import { getUserCredits } from '@/actions/get-user-credits'
import { Analytics } from "@vercel/analytics/react"

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
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription(userId)
  const credits = await getUserCredits()

  if (userId) {
    const user = await getUser({ userId })
  } else {
    console.log("User ID is null, user might not be logged in.")
  }

  const hasActiveSubscription = await checkSubscription(userId);

  return (
    <ClerkProvider>

      <html lang="en" className="h-full">
        <head>
        </head>
        <body className={`${inter.className} h-full`}>
            <Navbar isPro={isPro} apiLimitCount={apiLimitCount} credits={credits} hasActiveSubscription={hasActiveSubscription} />
            <ToasterProvider />
            <TooltipProvider>
              <ModalProvider />
              <Providers>
              {children}
              <Analytics />
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
              <Script src="https://r.wdfl.co/rw.js" data-rewardful="80664d" />
              <Script id="rewardful-queue">
                {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
              </Script>
              </Providers>
            </TooltipProvider>
        </body>
      </html>

    </ClerkProvider>
  )
}