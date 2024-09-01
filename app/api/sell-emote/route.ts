import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";

export const maxDuration = 300;

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { emoteId, style, model } = body;

        // Check if the user has set up their username
        const profile = await db.profile.findUnique({
            where: { userId },
        });

        if (!profile?.name) {
            return new NextResponse("Please set up your username in your profile before listing an emote.", { status: 400 });
        }

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
                userId,
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