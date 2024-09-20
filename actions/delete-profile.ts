'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteProfile() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const profile = await db.profile.findUnique({
    where: { userId: userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  await db.profile.delete({
    where: { userId: userId },
  });

  revalidatePath('/profile');
  return { message: "Profile deleted successfully" };
}