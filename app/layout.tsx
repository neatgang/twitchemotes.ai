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
import { getUserCredits } from '@/actions/get-user-credits'
import { getUser } from '@/actions/get-user'

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
  const isPro = await checkSubscription()
  const credits = await getUserCredits()

  if (userId) {
    const user = await getUser({ userId })
  } else {
    console.log("User ID is null, user might not be logged in.")
  }

  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
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
        <body className={`${inter.className} h-full`}>
            {/* <Navbar isPro={isPro} apiLimitCount={apiLimitCount} credits={credits} /> */}
            <ToasterProvider />
            <TooltipProvider>
              <ModalProvider />
              {children}
            </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}