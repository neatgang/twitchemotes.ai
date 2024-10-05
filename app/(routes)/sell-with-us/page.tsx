import { Metadata } from 'next'
import EmoteMarketplaceLanding from "@/components/landing/EmoteMarketplaceLanding"

export const metadata: Metadata = {
  title: 'AI Emote Marketplace - EmoteMaker.ai',
  description: 'Create and sell custom AI-generated emotes. Turn your creativity into cash with our easy-to-use platform.',
  keywords: ['AI Emotes', 'Marketplace', 'Twitch', 'Discord', 'YouTube', 'Streaming'],
  authors: [{ name: 'EmoteMaker.ai Team' }],
  creator: 'EmoteMaker.ai',
  publisher: 'EmoteMaker.ai',
  openGraph: {
    title: 'AI Emote Marketplace - EmoteMaker.ai',
    description: 'Create and sell custom AI-generated emotes. Turn your creativity into cash with our easy-to-use platform.',
    url: 'https://emotemaker.ai/marketplace',
    siteName: 'EmoteMaker.ai',
    images: [
      {
        url: 'https://emotemaker.ai/og-image-marketplace.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'AI Emote Marketplace by EmoteMaker.ai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Emote Marketplace - EmoteMaker.ai',
    description: 'Create and sell custom AI-generated emotes. Turn your creativity into cash with our easy-to-use platform.',
    creator: '@EmoteMakerAI', // Replace with your actual Twitter handle
    images: ['https://emotemaker.ai/twitter-image-marketplace.png'], // Replace with your actual Twitter image URL
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

export default function MarketplacePage() {
  return <EmoteMarketplaceLanding />
}