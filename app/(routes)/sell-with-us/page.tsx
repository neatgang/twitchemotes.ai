import { Metadata } from 'next'
import EmoteMarketplaceLanding from "@/components/landing/EmoteMarketplaceLanding"

export const metadata: Metadata = {
  title: 'Sell AI Emotes - EmoteMaker.ai Marketplace',
  description: 'Create, sell, and monetize custom AI-generated emotes for Twitch, Discord, and YouTube. Earn 25% per sale on our easy-to-use platform.',
  keywords: ['AI Emotes', 'Emote Marketplace', 'Twitch Emotes', 'Discord Emotes', 'YouTube Emotes', 'Streaming', 'Content Creation', 'Monetize Emotes'],
  authors: [{ name: 'EmoteMaker.ai Team' }],
  creator: 'EmoteMaker.ai',
  publisher: 'EmoteMaker.ai',
  openGraph: {
    title: 'Sell AI Emotes - EmoteMaker.ai Marketplace',
    description: 'Monetize your creativity by selling custom AI-generated emotes on EmoteMaker.ai. Earn 25% per sale with minimal effort.',
    url: 'https://emotemaker.ai/marketplace',
    siteName: 'EmoteMaker.ai',
    images: [
      {
        url: 'https://emotemaker.ai/og-image-marketplace.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Sell AI Emotes - EmoteMaker.ai Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell AI Emotes - EmoteMaker.ai Marketplace',
    description: 'Create and sell custom AI-generated emotes on our marketplace. Earn 25% per sale with our streamlined platform.',
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
