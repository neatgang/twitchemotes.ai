
import { db } from "@/lib/db";

export const getEmotesForSale = async () => {
  // const cacheKey = "emotes-for-sale";
  
  // // Try to get data from Redis cache
  // const cachedEmotes = await redis.get(cacheKey);
  
  // if (cachedEmotes) {
  //   console.log("Cache hit: Returning emotes from Redis");
  //   return { emotesForSale: JSON.parse(cachedEmotes as string) };
  // }

  // console.log("Cache miss: Fetching emotes from database");
  
  // If not in cache, fetch from database
  const emotesForSale = await db.emoteForSale.findMany({
    include: {
      emote: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Cache the result in Redis for 5 minutes (300 seconds)
  // await redis.set(cacheKey, JSON.stringify(emotesForSale), { ex: 300 });

  return { emotesForSale };
};