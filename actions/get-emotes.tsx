import { db } from "@/lib/db";
import { Emote } from "@prisma/client";

// Adjust the function parameter to expect only userId
export const getEmotes = async ({ userId }: { userId: string | null }) => {
  try {
    const emotes = await db.emote.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "asc",
      }
    });

    return emotes;
  } catch (error) {
    console.log("[GET_EMOTES] Error:", error);
    return [];
  }
}