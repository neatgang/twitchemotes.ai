import { db } from "@/lib/db";

export const getEmotesForSale = async () => {
  try {
    const emotesForSale = await db.emoteForSale.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { emotesForSale };
  } catch (error) {
    console.log("[GET_EMOTES_FOR_SALE] Error:", error);
    return { emotesForSale: [] };
  }
};