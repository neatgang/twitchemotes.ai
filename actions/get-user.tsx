import { db } from "@/lib/db";
import { Emote } from "@prisma/client";

type UserProps = {
  userId: string;
  name?: string;  // Optional name field
  email?: string; // Optional email field
};

export const getUser = async ({ userId, name = 'Default Name', email = 'default@example.com' }: UserProps) => {
  try {
    let user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user does not exist, create a new one with additional fields
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          name: name,  // Use provided name or default
          email: email // Use provided email or default
        },
      });
    }

    return user;
  } catch (error) {
    console.log("[GET_USER] Error:", error); // Log any errors
    return null; // Return null or appropriate error handling
  }
}