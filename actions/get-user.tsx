import { db } from "@/lib/db";
import { Emote } from "@prisma/client";

type UserProps = {
  userId: string;
  name?: string;  // Optional name field
  email?: string; // Optional email field
};

export const getUser = async ({ userId, name = 'Default Name', email = 'default@example.com' }: UserProps) => {
  try {
    // Use upsert to either update an existing user or create a new one
    const user = await db.user.upsert({
      where: {
        id: userId,
      },
      update: {
        name: name,
        email: email,
      },
      create: {
        id: userId,
        name: name,
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.log("[GET_USER] Error:", error); // Log any errors
    return null; // Return null or appropriate error handling
  }
}