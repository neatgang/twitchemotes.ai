'use server'

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addEmoteToLibrary(emoteId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const emoteForSale = await db.emoteForSale.findUnique({
      where: { id: emoteId },
    });

    if (!emoteForSale) {
      throw new Error('Emote not found');
    }

    const newEmote = await db.emote.create({
      data: {
        prompt: emoteForSale.prompt,
        style: emoteForSale.style,
        imageUrl: emoteForSale.imageUrl,
        userId: userId,
      },
    });

    revalidatePath('/showcase');
    return { success: true, emote: newEmote };
  } catch (error) {
    console.error('Error adding emote to library:', error);
    return { success: false, error: 'Failed to add emote to library' };
  }
}