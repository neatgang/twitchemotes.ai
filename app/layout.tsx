import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmoteMaker.ai',
  description: 'Turn your prompt into an emote, perfect for Twitch Streamers, Discord Moderators, and others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <div className="h-full relative">
        {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <div className="text-white">
                <AiSidebar />
            </div>
        </div> */}
        {/* <main className="md:pl-72"> */}
            <Navbar />
            {children}
              {/* <Header /> */}
    </div>
    </body>
    </html>
  )
}