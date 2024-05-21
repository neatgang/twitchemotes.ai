import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

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
        credits: true,
      },
    });

    // Revalidate the cache for the specific user
    revalidateTag(`user-${userId}`);

    return user ? user.credits : 0;
  } catch (error) {
    console.log("[GET_USER_CREDITS] Error:", error);
    return 0;
  }
};