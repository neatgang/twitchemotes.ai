import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { User } from "@prisma/client";


export const getUserCredits = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  try {


    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        credits: true, // Assuming 'credits' is a field in the User model
      }
    });

    return user ? user.credits : 0; // Return credits or 0 if user not found
  } catch (error) {
    console.log("[GET_USER_CREDITS] Error:", error);
    return 0; // Return 0 in case of error
  }
}