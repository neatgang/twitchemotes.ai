import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emotemaker.ai'

  // Fetch all emote IDs
  const emotes = await db.emoteForSale.findMany({
    select: { id: true, updatedAt: true },
  })

  const emoteUrls = emotes.map((emote) => ({
    url: `${baseUrl}/emote/${emote.id}`,
    lastModified: emote.updatedAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...emoteUrls,
    // Add other static routes here
  ]
}