import { db } from "@/lib/db";
import { Emote, User } from "@prisma/client";

type EmoteWithUser = Emote & {
  userId: string;
};

export const getUser = async ({ userId }: EmoteWithUser) => {
  try {
    let user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user does not exist, create a new one
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          // Add other fields as necessary
        },
      });
    }

    return user;
  } catch (error) {
    console.log("[GET_USER] Error:", error); // Log any errors
    return null; // Return null or appropriate error handling
  }
}