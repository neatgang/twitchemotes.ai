import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const maxDuration = 300;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { emoteId, style, model } = body;

        // First, fetch the original emote to get necessary information
        const originalEmote = await db.emote.findUnique({
            where: { id: emoteId },
        });

        if (!originalEmote) {
            return new NextResponse("Emote not found", { status: 404 });
        }

        const emoteForSale = await db.emoteForSale.create({
            data: {
                emoteId,
                imageUrl: originalEmote.imageUrl!, // Use non-null assertion as we know it exists
                prompt: originalEmote.prompt || '', // Provide a default empty string if prompt is null
                style,
                model,
                userId: originalEmote.userId!, // Use non-null assertion as we know it exists
                status: 'DRAFT', // Default status
                type: 'FREE', // Default type
                // price is optional, so we don't need to include it if not provided
            },
        });

        return NextResponse.json(emoteForSale);
    } catch (error) {
        console.error("[SELL_EMOTE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}