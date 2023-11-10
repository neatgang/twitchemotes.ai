// import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { ModalProvider } from '@/components/ModalProvider'
import { ToasterProvider } from '@/components/ToasterProvider'



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
        {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <div className="text-white">
                <AiSidebar />
            </div>
        </div> */}
        {/* <main className="md:pl-72"> */}
            <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
            <ToasterProvider />
          <ModalProvider />
            {children}
              {/* <Header /> */}
    </div>
    </body>
    </html>
    </ClerkProvider>
  )
}