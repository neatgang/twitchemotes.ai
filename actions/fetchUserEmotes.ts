import { db } from "../lib/db";
import { cache } from 'react'

export const fetchUserEmotes = cache(async (userId: string) => {
  const emotes = await db.emote.findMany({
    where: {
      userId: userId,
    },
    include: {
      emoteForSale: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return emotes;
});

// Set the revalidation period (e.g., 60 seconds)
export const revalidate = 120;