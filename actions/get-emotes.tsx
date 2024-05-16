import { db } from "@/lib/db";
import { Emote, User } from "@prisma/client";

type EmoteWithUser = Emote & {
  userId: User | null; // Extend Emote with user relation
};

export const getEmotes = async ({ userId }: EmoteWithUser) => {
  
    try {
      const emotes = await db.emote.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "asc",
        }
      });

      return emotes
    } catch (error) {
      console.log("[GET_EMOTES] Error:", error); // Log any errors
      return [];
    }
  }