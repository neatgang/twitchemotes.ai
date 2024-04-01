import { db } from "@/lib/db";
import { Emote, User } from "@prisma/client";

type EmoteWithUser = Emote & {
  user: User | null; // Extend Emote with user relation
};

export const getEmotes = async () => {
    try {
      const emotes = await db.emote.findMany({
        where: {
            prompt: {
                not: null
            }
        }
      });

      return emotes
    } catch (error) {
      console.log("[GET_EMOTES] Error:", error); // Log any errors
      return [];
    }
  }