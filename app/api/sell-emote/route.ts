import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const maxDuration = 300;

export async function POST(req: Request) {
    const body = await req.json();
    const { emoteId } = body;

    
    try {
    const emote = await db.emote.findUnique({
      where: { id: emoteId },
    });

    if (!emote) {
        return new NextResponse("No emote found", { status: 400 });
    }

    // add the emote to the EmotesForSale table
    const emoteForSale = await db.emoteForSale.create({
      data: {
        emoteId: emote.id,
        imageUrl: emote.imageUrl || '',
        prompt: emote.prompt || '',
      },
    });

    return NextResponse.json(emoteForSale);
  } catch (error) {
    console.log('[SAVE_EMOTE_ERROR]', error);
    return new NextResponse("Failed to create emote", { status: 500 });
  }
}