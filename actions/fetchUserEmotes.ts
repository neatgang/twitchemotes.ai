import { db } from "../lib/db";

export const fetchUserEmotes = async (userId: string) => {
  return await db.emote.findMany({
    where: {
      userId: userId,
    },
    // include: {
    //   emoteForSale: true,
    // },
    orderBy: {
      createdAt: "desc",
    },
  });
};