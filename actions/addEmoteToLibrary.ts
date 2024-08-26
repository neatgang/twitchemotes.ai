'use server'

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface EmoteData {
  prompt?: string;
  imageUrl: string;
  style: string;
}

export async function addEmoteToLibrary(emoteData: EmoteData) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const newEmote = await db.emote.create({
      data: {
        prompt: emoteData.prompt,
        style: emoteData.style,
        imageUrl: emoteData.imageUrl,
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