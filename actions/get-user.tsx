import { db } from "@/lib/db";
import { Emote } from "@prisma/client";

type UserProps = {
  userId: string;
  name?: string;  // Optional name field
  email?: string; // Optional email field
};

export const getUser = async ({ userId, name = 'Default Name', email = 'default@example.com' }: UserProps) => {
  try {
    console.log("Upserting user:", userId, name, email); // Debugging line
    const user = await db.user.upsert({
      where: { id: userId },
      update: { name, email },
      create: { id: userId, name, email },
    });
    console.log("Upsert result:", user); // Debugging line
    return user;
  } catch (error) {
    console.log("[GET_USER] Error:", error); // Log any errors
    return null; // Return null or appropriate error handling
  }
}