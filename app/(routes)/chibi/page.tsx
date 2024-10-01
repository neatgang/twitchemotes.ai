import { Metadata } from 'next'
import ChibiLanding from "@/components/landing/ChibiLanding"

export const metadata: Metadata = {
  title: 'Chibi Emotes - EmoteMaker.ai',
  description: 'Create adorable Chibi emotes with AI for your Twitch and Discord communities.',
  keywords: ['Chibi', 'Emotes', 'AI', 'Twitch', 'Discord', 'Streaming'],
  authors: [{ name: 'EmoteMaker.ai Team' }],
  creator: 'EmoteMaker.ai',
  publisher: 'EmoteMaker.ai',
  openGraph: {
    title: 'Chibi Emotes - EmoteMaker.ai',
    description: 'Create adorable Chibi emotes with AI for your Twitch and Discord communities.',
    url: 'https://emotemaker.ai/chibi',
    siteName: 'EmoteMaker.ai',
    images: [
      {
        url: 'https://emotemaker.ai/og-image-chibi.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Chibi Emotes by EmoteMaker.ai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chibi Emotes - EmoteMaker.ai',
    description: 'Create adorable Chibi emotes with AI for your Twitch and Discord communities.',
    creator: '@EmoteMakerAI', // Replace with your actual Twitter handle
    images: ['https://emotemaker.ai/twitter-image-chibi.png'], // Replace with your actual Twitter image URL
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ChibiPage() {
  return <ChibiLanding />
}